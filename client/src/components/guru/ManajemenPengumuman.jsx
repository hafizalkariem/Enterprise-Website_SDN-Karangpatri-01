import React, { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Users,
  AlertCircle,
  X,
  Save,
  ChevronDown,
  Pin,
  PinOff,
  Send,
  Clock,
  Target
} from 'lucide-react';

const ManajemenPengumuman = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedPengumuman, setSelectedPengumuman] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterKategori, setFilterKategori] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    kategori: 'umum',
    prioritas: 'normal',
    targetAudience: 'semua',
    tanggalMulai: '',
    tanggalBerakhir: '',
    isPinned: false,
    status: 'draft'
  });

  // Data dummy pengumuman
  const [pengumumanList, setPengumumanList] = useState([
    {
      id: 1,
      judul: 'Libur Semester Ganjil 2024',
      konten: 'Libur semester ganjil akan dimulai pada tanggal 15 Januari 2024 hingga 5 Februari 2024. Kegiatan pembelajaran akan dimulai kembali pada tanggal 6 Februari 2024.',
      kategori: 'akademik',
      prioritas: 'tinggi',
      targetAudience: 'semua',
      tanggalMulai: '2024-01-10',
      tanggalBerakhir: '2024-02-05',
      tanggalDibuat: '2024-01-08',
      isPinned: true,
      status: 'aktif',
      dibacaOleh: 245,
      totalTarget: 280
    },
    {
      id: 2,
      judul: 'Pendaftaran Ekstrakurikuler Semester Genap',
      konten: 'Pendaftaran ekstrakurikuler untuk semester genap telah dibuka. Siswa dapat mendaftar melalui website sekolah atau datang langsung ke ruang BK.',
      kategori: 'ekstrakurikuler',
      prioritas: 'normal',
      targetAudience: 'siswa',
      tanggalMulai: '2024-01-15',
      tanggalBerakhir: '2024-01-30',
      tanggalDibuat: '2024-01-12',
      isPinned: false,
      status: 'aktif',
      dibacaOleh: 156,
      totalTarget: 280
    },
    {
      id: 3,
      judul: 'Rapat Koordinasi Guru',
      konten: 'Rapat koordinasi guru akan dilaksanakan pada hari Jumat, 19 Januari 2024 pukul 13.00 WIB di ruang aula. Harap hadir tepat waktu.',
      kategori: 'internal',
      prioritas: 'tinggi',
      targetAudience: 'guru',
      tanggalMulai: '2024-01-17',
      tanggalBerakhir: '2024-01-19',
      tanggalDibuat: '2024-01-15',
      isPinned: true,
      status: 'aktif',
      dibacaOleh: 28,
      totalTarget: 35
    },
    {
      id: 4,
      judul: 'Perbaikan Sistem E-Learning',
      konten: 'Sistem e-learning akan mengalami maintenance pada tanggal 20 Januari 2024 pukul 01.00 - 05.00 WIB. Mohon maaf atas ketidaknyamanannya.',
      kategori: 'teknis',
      prioritas: 'normal',
      targetAudience: 'semua',
      tanggalMulai: '2024-01-18',
      tanggalBerakhir: '2024-01-21',
      tanggalDibuat: '2024-01-16',
      isPinned: false,
      status: 'draft',
      dibacaOleh: 0,
      totalTarget: 315
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      judul: '',
      konten: '',
      kategori: 'umum',
      prioritas: 'normal',
      targetAudience: 'semua',
      tanggalMulai: '',
      tanggalBerakhir: '',
      isPinned: false,
      status: 'draft'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'create') {
      const newPengumuman = {
        id: Date.now(),
        ...formData,
        tanggalDibuat: new Date().toISOString().split('T')[0],
        dibacaOleh: 0,
        totalTarget: formData.targetAudience === 'semua' ? 315 : 
                    formData.targetAudience === 'siswa' ? 280 : 35
      };
      setPengumumanList(prev => [newPengumuman, ...prev]);
    } else if (modalMode === 'edit') {
      setPengumumanList(prev => prev.map(item => 
        item.id === selectedPengumuman.id ? { ...item, ...formData } : item
      ));
    }
    
    setShowModal(false);
    resetForm();
    setSelectedPengumuman(null);
  };

  const handleEdit = (pengumuman) => {
    setSelectedPengumuman(pengumuman);
    setFormData({
      judul: pengumuman.judul,
      konten: pengumuman.konten,
      kategori: pengumuman.kategori,
      prioritas: pengumuman.prioritas,
      targetAudience: pengumuman.targetAudience,
      tanggalMulai: pengumuman.tanggalMulai,
      tanggalBerakhir: pengumuman.tanggalBerakhir,
      isPinned: pengumuman.isPinned,
      status: pengumuman.status
    });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleView = (pengumuman) => {
    setSelectedPengumuman(pengumuman);
    setModalMode('view');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      setPengumumanList(prev => prev.filter(item => item.id !== id));
    }
  };

  const togglePin = (id) => {
    setPengumumanList(prev => prev.map(item => 
      item.id === id ? { ...item, isPinned: !item.isPinned } : item
    ));
  };

  const toggleStatus = (id) => {
    setPengumumanList(prev => prev.map(item => 
      item.id === id ? { 
        ...item, 
        status: item.status === 'aktif' ? 'nonaktif' : 'aktif' 
      } : item
    ));
  };

  // Filter pengumuman
  const filteredPengumuman = pengumumanList.filter(item => {
    const matchSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.konten.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchKategori = filterKategori === 'all' || item.kategori === filterKategori;
    
    return matchSearch && matchStatus && matchKategori;
  });

  const getStatusBadge = (status) => {
    const config = {
      'aktif': 'bg-green-100 text-green-800',
      'draft': 'bg-yellow-100 text-yellow-800',
      'nonaktif': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${config[status]}`;
  };

  const getPrioritasBadge = (prioritas) => {
    const config = {
      'tinggi': 'bg-red-100 text-red-800',
      'normal': 'bg-blue-100 text-blue-800',
      'rendah': 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${config[prioritas]}`;
  };

  const getKategoriBadge = (kategori) => {
    const config = {
      'akademik': 'bg-purple-100 text-purple-800',
      'ekstrakurikuler': 'bg-orange-100 text-orange-800',
      'internal': 'bg-indigo-100 text-indigo-800',
      'teknis': 'bg-cyan-100 text-cyan-800',
      'umum': 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${config[kategori]}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengumuman</h1>
            <p className="text-gray-600">Kelola pengumuman sekolah dan informasi penting</p>
          </div>
          <button
            onClick={() => {
              setModalMode('create');
              setShowModal(true);
              resetForm();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Buat Pengumuman
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pengumuman</p>
              <p className="text-2xl font-bold text-gray-900">{pengumumanList.length}</p>
            </div>
            <Megaphone className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {pengumumanList.filter(p => p.status === 'aktif').length}
              </p>
            </div>
            <Send className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pengumumanList.filter(p => p.status === 'draft').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Prioritas Tinggi</p>
              <p className="text-2xl font-bold text-red-600">
                {pengumumanList.filter(p => p.prioritas === 'tinggi').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="draft">Draft</option>
              <option value="nonaktif">Non-aktif</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select 
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Kategori</option>
              <option value="akademik">Akademik</option>
              <option value="ekstrakurikuler">Ekstrakurikuler</option>
              <option value="internal">Internal</option>
              <option value="teknis">Teknis</option>
              <option value="umum">Umum</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pengumuman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Pengumuman List */}
      <div className="space-y-4">
        {filteredPengumuman.map((pengumuman) => (
          <div key={pengumuman.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {pengumuman.isPinned && (
                    <Pin className="w-4 h-4 text-orange-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{pengumuman.judul}</h3>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">{pengumuman.konten}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={getStatusBadge(pengumuman.status)}>
                    {pengumuman.status.charAt(0).toUpperCase() + pengumuman.status.slice(1)}
                  </span>
                  <span className={getKategoriBadge(pengumuman.kategori)}>
                    {pengumuman.kategori.charAt(0).toUpperCase() + pengumuman.kategori.slice(1)}
                  </span>
                  <span className={getPrioritasBadge(pengumuman.prioritas)}>
                    Prioritas {pengumuman.prioritas.charAt(0).toUpperCase() + pengumuman.prioritas.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Dibuat: {pengumuman.tanggalDibuat}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Dibaca: {pengumuman.dibacaOleh}/{pengumuman.totalTarget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>Target: {pengumuman.targetAudience}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => togglePin(pengumuman.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    pengumuman.isPinned 
                      ? 'text-orange-600 bg-orange-50 hover:bg-orange-100' 
                      : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  title={pengumuman.isPinned ? 'Unpin' : 'Pin'}
                >
                  {pengumuman.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => handleView(pengumuman)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Lihat Detail"
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleEdit(pengumuman)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => toggleStatus(pengumuman.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    pengumuman.status === 'aktif'
                      ? 'text-red-600 bg-red-50 hover:bg-red-100'
                      : 'text-green-600 bg-green-50 hover:bg-green-100'
                  }`}
                  title={pengumuman.status === 'aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                >
                  <Send className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDelete(pengumuman.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(pengumuman.dibacaOleh / pengumuman.totalTarget) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
        
        {filteredPengumuman.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pengumuman</h3>
            <p className="text-gray-500">Belum ada pengumuman yang sesuai dengan filter yang dipilih.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {modalMode === 'create' && 'Buat Pengumuman Baru'}
                  {modalMode === 'edit' && 'Edit Pengumuman'}
                  {modalMode === 'view' && 'Detail Pengumuman'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                    setSelectedPengumuman(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Pengumuman *
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  placeholder="Masukkan judul pengumuman"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konten Pengumuman *
                </label>
                <textarea
                  name="konten"
                  value={formData.konten}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  placeholder="Masukkan isi pengumuman"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  >
                    <option value="umum">Umum</option>
                    <option value="akademik">Akademik</option>
                    <option value="ekstrakurikuler">Ekstrakurikuler</option>
                    <option value="internal">Internal</option>
                    <option value="teknis">Teknis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioritas
                  </label>
                  <select
                    name="prioritas"
                    value={formData.prioritas}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  >
                    <option value="rendah">Rendah</option>
                    <option value="normal">Normal</option>
                    <option value="tinggi">Tinggi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <select
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                >
                  <option value="semua">Semua</option>
                  <option value="siswa">Siswa</option>
                  <option value="guru">Guru</option>
                  <option value="staff">Staff</option>
                  <option value="orangtua">Orang Tua</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    name="tanggalMulai"
                    value={formData.tanggalMulai}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Berakhir
                  </label>
                  <input
                    type="date"
                    name="tanggalBerakhir"
                    value={formData.tanggalBerakhir}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  >
                    <option value="draft">Draft</option>
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Non-aktif</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPinned"
                      checked={formData.isPinned}
                      onChange={handleInputChange}
                      disabled={modalMode === 'view'}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pin pengumuman</span>
                  </label>
                </div>
              </div>

              {modalMode !== 'view' && (
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                      setSelectedPengumuman(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {modalMode === 'create' ? 'Buat Pengumuman' : 'Simpan Perubahan'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenPengumuman;