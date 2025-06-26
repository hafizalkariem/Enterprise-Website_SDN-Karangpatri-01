import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Image, 
  Calendar, 
  Eye, 
  Edit2, 
  Trash2, 
  Download, 
  Search, 
  Filter,
  X,
  Save,
  Camera,
  Users,
  Heart,
  Share2,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  MoreHorizontal
} from 'lucide-react';

const Galeri = () => {
  const [albums, setAlbums] = useState([
    {
      id: 1,
      judul: 'Upacara Bendera Senin',
      deskripsi: 'Kegiatan upacara bendera rutin setiap hari Senin',
      tanggal: '2024-12-02',
      kategori: 'Kegiatan Rutin',
      jumlahFoto: 12,
      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
      status: 'aktif',
      views: 245,
      likes: 18
    },
    {
      id: 2,
      judul: 'Lomba Merdeka 17 Agustus',
      deskripsi: 'Berbagai perlombaan dalam rangka HUT RI ke-79',
      tanggal: '2024-08-17',
      kategori: 'Event Khusus',
      jumlahFoto: 35,
      thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
      status: 'aktif',
      views: 892,
      likes: 67
    },
    {
      id: 3,
      judul: 'Kunjungan Museum',
      deskripsi: 'Field trip kelas 5 ke Museum Nasional Jakarta',
      tanggal: '2024-11-15',
      kategori: 'Kegiatan Pembelajaran',
      jumlahFoto: 28,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      status: 'aktif',
      views: 456,
      likes: 34
    },
    {
      id: 4,
      judul: 'Penanaman Pohon',
      deskripsi: 'Program peduli lingkungan dengan menanam pohon di area sekolah',
      tanggal: '2024-10-25',
      kategori: 'Lingkungan',
      jumlahFoto: 19,
      thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      status: 'aktif',
      views: 321,
      likes: 28
    },
    {
      id: 5,
      judul: 'Pentas Seni Akhir Tahun',
      deskripsi: 'Pertunjukan seni dari siswa-siswi SDN Karang Patri 01',
      tanggal: '2024-12-20',
      kategori: 'Seni & Budaya',
      jumlahFoto: 42,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      status: 'draft',
      views: 0,
      likes: 0
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    tanggal: '',
    kategori: '',
    status: 'aktif'
  });

  const [uploadData, setUploadData] = useState({
    albumId: null,
    files: [],
    progress: 0
  });

  const categories = [
    'Kegiatan Rutin',
    'Event Khusus', 
    'Kegiatan Pembelajaran',
    'Lingkungan',
    'Seni & Budaya',
    'Olahraga',
    'Akademik'
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop'
  ];

  const handleSubmit = () => {
    if (editingId) {
      setAlbums(prev => prev.map(album => 
        album.id === editingId 
          ? { 
              ...album, 
              ...formData,
              thumbnail: sampleImages[Math.floor(Math.random() * sampleImages.length)]
            }
          : album
      ));
    } else {
      const newAlbum = {
        id: Date.now(),
        ...formData,
        jumlahFoto: 0,
        thumbnail: sampleImages[Math.floor(Math.random() * sampleImages.length)],
        views: 0,
        likes: 0
      };
      setAlbums(prev => [...prev, newAlbum]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      judul: '',
      deskripsi: '',
      tanggal: '',
      kategori: '',
      status: 'aktif'
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (album) => {
    setFormData({
      judul: album.judul,
      deskripsi: album.deskripsi,
      tanggal: album.tanggal,
      kategori: album.kategori,
      status: album.status
    });
    setEditingId(album.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus album ini?')) {
      setAlbums(prev => prev.filter(album => album.id !== id));
    }
  };

  const handleUpload = (albumId) => {
    setUploadData({ ...uploadData, albumId });
    setShowUpload(true);
  };

  const handleFileUpload = (files) => {
    setUploadData({ ...uploadData, files: Array.from(files) });
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadData(prev => ({ ...prev, progress }));
      if (progress >= 100) {
        clearInterval(interval);
        // Update album foto count
        setAlbums(prev => prev.map(album => 
          album.id === uploadData.albumId 
            ? { ...album, jumlahFoto: album.jumlahFoto + files.length }
            : album
        ));
        setTimeout(() => {
          setShowUpload(false);
          setUploadData({ albumId: null, files: [], progress: 0 });
        }, 1000);
      }
    }, 200);
  };

  const filteredAlbums = albums.filter(album => {
    const matchesCategory = selectedCategory === 'semua' || album.kategori === selectedCategory;
    const matchesSearch = album.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         album.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPhotos = albums.reduce((sum, album) => sum + album.jumlahFoto, 0);
  const totalViews = albums.reduce((sum, album) => sum + album.views, 0);
  const totalLikes = albums.reduce((sum, album) => sum + album.likes, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Galeri Sekolah</h1>
            <p className="text-gray-600">Kelola koleksi foto dan dokumentasi kegiatan SDN Karang Patri 01</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Buat Album Baru
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Album</p>
              <p className="text-2xl font-bold text-gray-900">{albums.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Image className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Foto</p>
              <p className="text-2xl font-bold text-green-600">{totalPhotos}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-purple-600">{totalViews.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Likes</p>
              <p className="text-2xl font-bold text-red-600">{totalLikes}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('semua')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'semua'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari album..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Albums Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlbums.map((album) => (
            <div key={album.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img 
                  src={album.thumbnail} 
                  alt={album.judul}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button
                      onClick={() => setSelectedImage(album.thumbnail)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUpload(album.id)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    album.status === 'aktif' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {album.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">{album.judul}</h3>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => handleEdit(album)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(album.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{album.deskripsi}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(album.tanggal).toLocaleDateString('id-ID')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {album.jumlahFoto} foto
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {album.kategori}
                  </span>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {album.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {album.likes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Album</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Foto</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Likes</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAlbums.map((album) => (
                  <tr key={album.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={album.thumbnail} 
                          alt={album.judul}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{album.judul}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{album.deskripsi}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {album.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(album.tanggal).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{album.jumlahFoto}</td>
                    <td className="px-6 py-4 text-gray-600">{album.views}</td>
                    <td className="px-6 py-4 text-gray-600">{album.likes}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        album.status === 'aktif' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {album.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpload(album.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(album)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(album.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Album Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Album' : 'Buat Album Baru'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Album</label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => setFormData({...formData, judul: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan judul album"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Deskripsi album"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                <input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="aktif">Aktif</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {editingId ? 'Update' : 'Simpan'}
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photos Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Upload Foto</h3>
              <button
                onClick={() => setShowUpload(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Upload Foto</p>
                  <p className="text-sm text-gray-500">Klik untuk memilih foto atau drag & drop</p>
                  <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF hingga 10MB</p>
                </label>
              </div>

              {uploadData.files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">File yang dipilih:</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {uploadData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600 truncate">{file.name}</span>
                        <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadData.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Upload Progress</span>
                    <span>{uploadData.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadData.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => uploadData.files.length > 0 && handleFileUpload(uploadData.files)}
                  disabled={uploadData.files.length === 0 || uploadData.progress > 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  {uploadData.progress > 0 ? 'Uploading...' : 'Upload Foto'}
                </button>
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAlbums.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada album</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== 'semua' 
              ? 'Tidak ada album yang sesuai dengan filter'
              : 'Mulai dengan membuat album baru untuk dokumentasi kegiatan sekolah'
            }
          </p>
          {!searchTerm && selectedCategory === 'semua' && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Plus className="w-5 h-5" />
              Buat Album Pertama
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Galeri;