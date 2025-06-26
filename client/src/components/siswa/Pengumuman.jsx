import React, { useState, useEffect } from "react";
import { 
  Megaphone, 
  Calendar, 
  Clock, 
  User,
  Eye,
  Pin,
  AlertCircle,
  Info,
  CheckCircle,
  Bell,
  Search,
  Filter,
  ChevronDown,
  BookOpen,
  Users,
  School,
  Loader2,
  X,
  Download,
  FileText
} from "lucide-react";

const Pengumuman = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [selectedPengumuman, setSelectedPengumuman] = useState(null);
  const [pengumumanData, setPengumumanData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - adjust according to your Laravel app URL
  const API_BASE_URL = 'http://localhost:8000/api';

  // Get auth token from localStorage or context
  const getAuthToken = () => {
    // Try multiple possible token storage keys
    return localStorage.getItem('auth_token') || 
           localStorage.getItem('token') || 
           localStorage.getItem('access_token') ||
           localStorage.getItem('sanctum_token') ||
           '';
  };

  // Get CSRF token if needed
  // const getCSRFToken = () => {
  //   const meta = document.querySelector('meta[name="csrf-token"]');
  //   return meta ? meta.getAttribute('content') : '';
  // };

  // API call helper with enhanced error handling
  const apiCall = async (endpoint, options = {}) => {
    const token = getAuthToken();
    // const csrfToken = getCSRFToken();
    
    console.log('Making API call to:', `${API_BASE_URL}${endpoint}`);
    console.log('Using token:', token ? 'Token present' : 'No token found');
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };

    // Add authorization header if token exists
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Add CSRF token if available
    // if (csrfToken) {
    //   defaultHeaders['X-CSRF-TOKEN'] = csrfToken;
    // }

    const defaultOptions = {
      headers: defaultHeaders,
      // credentials: 'include' // Include cookies for session-based auth
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers
        }
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized - redirect to login or show login modal
          console.error('Unauthorized access - token may be expired or invalid');
          
          // Optional: Clear invalid token
          localStorage.removeItem('auth_token');
          localStorage.removeItem('token');
          localStorage.removeItem('access_token');
          localStorage.removeItem('sanctum_token');
          
          // Optional: Redirect to login
          // window.location.href = '/login';
          
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  // Fetch pengumuman data with better error handling
  const fetchPengumuman = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory !== 'semua') params.append('kategori', selectedCategory);
      
      const queryString = params.toString();
      const endpoint = `/pengumuman${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiCall(endpoint);
      
      if (response.success) {
        setPengumumanData(response.data);
      } else {
        setError('Gagal memuat data pengumuman');
      }
    } catch (err) {
      console.error('Error fetching pengumuman:', err);
      
      if (err.message.includes('Unauthorized')) {
        setError('Sesi Anda telah berakhir. Silakan login kembali.');
      } else {
        setError('Error memuat pengumuman: ' + err.message);
      }
      
      // Set empty data on error
      setPengumumanData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories with fallback
  const fetchCategories = async () => {
    try {
      const response = await apiCall('/pengumuman/categories');
      
      if (response.success) {
        // Map categories to match the expected format
        const mappedCategories = response.data.map(cat => ({
          value: cat.value,
          label: cat.label,
          icon: getCategoryIcon(cat.value)
        }));
        setCategories(mappedCategories);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback to default categories when API fails
      setCategories([
        { value: "semua", label: "Semua Kategori", icon: <Megaphone size={16} /> },
        { value: "akademik", label: "Akademik", icon: <BookOpen size={16} /> },
        { value: "acara", label: "Acara", icon: <Users size={16} /> },
        { value: "libur", label: "Libur", icon: <Calendar size={16} /> },
        { value: "ujian", label: "Ujian", icon: <School size={16} /> }
      ]);
      
      // Show user-friendly error for auth issues
      if (err.message.includes('Unauthorized')) {
        setError('Sesi Anda telah berakhir. Silakan login kembali.');
      }
    }
  };

  // Get category icon
  const getCategoryIcon = (categoryValue) => {
    const iconMap = {
      semua: <Megaphone size={16} />,
      akademik: <BookOpen size={16} />,
      acara: <Users size={16} />,
      libur: <Calendar size={16} />,
      ujian: <School size={16} />,
      lomba: <CheckCircle size={16} />,
      jadwal: <Clock size={16} />
    };
    return iconMap[categoryValue] || <Info size={16} />;
  };

  // Mark pengumuman as read
  const markAsRead = async (pengumumanId) => {
    try {
      await apiCall(`/pengumuman/${pengumumanId}/mark-read`, {
        method: 'POST'
      });
      
      // Update local state
      setPengumumanData(prev => 
        prev.map(item => 
          item.id === pengumumanId 
            ? { ...item, dibaca: true }
            : item
        )
      );
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
    fetchPengumuman();
  }, []);

  // Refetch when search term or category changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchPengumuman();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCategory]);

  // Filter pengumuman (now done on backend but keeping for immediate response)
  const filteredPengumuman = pengumumanData;

  const getPriorityBadge = (prioritas) => {
    const priorityConfig = {
      tinggi: { 
        bg: "bg-red-100", 
        text: "text-red-800", 
        icon: <AlertCircle size={14} />,
        label: "Penting"
      },
      sedang: { 
        bg: "bg-yellow-100", 
        text: "text-yellow-800", 
        icon: <Info size={14} />,
        label: "Sedang"
      },
      rendah: { 
        bg: "bg-green-100", 
        text: "text-green-800", 
        icon: <CheckCircle size={14} />,
        label: "Biasa"
      }
    };

    const config = priorityConfig[prioritas] || priorityConfig.sedang;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const getCategoryBadge = (kategori) => {
    const categoryConfig = {
      akademik: { bg: "bg-blue-100", text: "text-blue-800", label: "Akademik" },
      acara: { bg: "bg-purple-100", text: "text-purple-800", label: "Acara" },
      libur: { bg: "bg-green-100", text: "text-green-800", label: "Libur" },
      ujian: { bg: "bg-orange-100", text: "text-orange-800", label: "Ujian" },
      lomba: { bg: "bg-pink-100", text: "text-pink-800", label: "Lomba" },
      jadwal: { bg: "bg-indigo-100", text: "text-indigo-800", label: "Jadwal" },
      umum: { bg: "bg-gray-100", text: "text-gray-800", label: "Umum" }
    };

    const config = categoryConfig[kategori] || categoryConfig.umum;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTanggalSingkat = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleReadPengumuman = (pengumuman) => {
    setSelectedPengumuman(pengumuman);
    if (!pengumuman.dibaca) {
      markAsRead(pengumuman.id);
    }
  };

  const pengumumanBelumDibaca = pengumumanData.filter(item => !item.dibaca).length;

  // Detail Modal Component
  const DetailModal = ({ pengumuman, onClose }) => {
    if (!pengumuman) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                pengumuman.prioritas === 'tinggi' ? 'bg-red-100 text-red-600' :
                pengumuman.prioritas === 'sedang' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                <Megaphone size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{pengumuman.judul}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {getPriorityBadge(pengumuman.prioritas)}
                  {getCategoryBadge(pengumuman.kategori)}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} />
                <span>Dibuat oleh: {pengumuman.dibuat_oleh}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>Dibuat: {formatTanggalSingkat(pengumuman.tanggal_dibuat)}</span>
              </div>
              {pengumuman.tanggal_berlaku && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Berlaku: {formatTanggalSingkat(pengumuman.tanggal_berlaku)}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Isi Pengumuman</h3>
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {pengumuman.konten}
                </div>
              </div>
            </div>

            {/* Attachments */}
            {pengumuman.lampiran && pengumuman.lampiran.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Lampiran</h3>
                <div className="space-y-2">
                  {pengumuman.lampiran.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" size={20} />
                        <div>
                          <p className="font-medium text-gray-900">{file.nama || `Lampiran ${index + 1}`}</p>
                          <p className="text-sm text-gray-500">{file.ukuran || 'Unknown size'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => window.open(file.url, '_blank')}
                        className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Download size={16} />
                        <span className="text-sm">Unduh</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-blue-600" size={20} />
                <span className="text-blue-800 font-medium">
                  {pengumuman.dibaca ? 'Sudah dibaca' : 'Belum dibaca'}
                </span>
              </div>
              <span className="text-sm text-blue-600">
                {formatTanggal(pengumuman.tanggal_dibuat)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-blue-600 mb-4" size={48} />
          <p className="text-gray-600">Memuat pengumuman...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <p className="text-red-600 text-lg font-medium">Error</p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Megaphone className="text-blue-600" size={28} />
            Pengumuman Sekolah
          </h1>
          <p className="text-gray-600 mt-1">
            Informasi terbaru dan penting dari sekolah
            {pengumumanBelumDibaca > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                <Bell size={12} />
                {pengumumanBelumDibaca} belum dibaca
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari pengumuman..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Pengumuman List */}
      <div className="space-y-4">
        {filteredPengumuman.length === 0 ? (
          <div className="text-center py-12">
            <Megaphone className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 text-lg">Tidak ada pengumuman ditemukan</p>
          </div>
        ) : (
          filteredPengumuman.map((pengumuman) => (
            <div
              key={pengumuman.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer ${
                !pengumuman.dibaca 
                  ? 'border-l-blue-500 bg-blue-50/30' 
                  : pengumuman.status === 'selesai' 
                    ? 'border-l-gray-400 bg-gray-50/50' 
                    : 'border-l-green-500'
              }`}
              onClick={() => handleReadPengumuman(pengumuman)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {!pengumuman.dibaca && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                      <h3 className={`text-lg font-semibold ${!pengumuman.dibaca ? 'text-gray-900' : 'text-gray-700'} truncate`}>
                        {pengumuman.judul}
                      </h3>
                      {pengumuman.prioritas === 'tinggi' && (
                        <Pin className="text-red-500 flex-shrink-0" size={16} />
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {pengumuman.konten}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {getPriorityBadge(pengumuman.prioritas)}
                      {getCategoryBadge(pengumuman.kategori)}
                      {pengumuman.lampiran && pengumuman.lampiran.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          <BookOpen size={12} />
                          Lampiran
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {pengumuman.dibuat_oleh}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatTanggalSingkat(pengumuman.tanggal_dibuat)}
                      </div>
                      {pengumuman.tanggal_berlaku && (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          Berlaku: {formatTanggalSingkat(pengumuman.tanggal_berlaku)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Eye className="text-gray-400" size={20} />
                    {pengumuman.status === 'selesai' && (
                      <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                        Selesai
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedPengumuman && (
        <DetailModal
          pengumuman={selectedPengumuman}
          onClose={() => setSelectedPengumuman(null)}
        />
      )}
    </div>
  );
};

export default Pengumuman;