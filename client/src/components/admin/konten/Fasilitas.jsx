import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Eye, MapPin, Users, Calendar, CheckCircle, XCircle } from 'lucide-react';

const Fasilitas = () => {
  const [fasilitas, setFasilitas] = useState([
    {
      id: 1,
      nama: 'Ruang Kelas 1A',
      kategori: 'Ruang Kelas',
      kapasitas: 30,
      kondisi: 'Baik',
      lokasi: 'Lantai 1, Gedung Utama',
      deskripsi: 'Ruang kelas untuk siswa kelas 1A dengan fasilitas lengkap',
      tanggalPemeliharaan: '2024-12-15',
      status: 'Aktif',
      foto: '/api/placeholder/300/200'
    },
    {
      id: 2,
      nama: 'Perpustakaan',
      kategori: 'Fasilitas Umum',
      kapasitas: 50,
      kondisi: 'Sangat Baik',
      lokasi: 'Lantai 2, Gedung Utama',
      deskripsi: 'Perpustakaan sekolah dengan koleksi buku yang lengkap',
      tanggalPemeliharaan: '2024-11-20',
      status: 'Aktif',
      foto: '/api/placeholder/300/200'
    },
    {
      id: 3,
      nama: 'Laboratorium Komputer',
      kategori: 'Laboratorium',
      kapasitas: 25,
      kondisi: 'Baik',
      lokasi: 'Lantai 2, Gedung B',
      deskripsi: 'Lab komputer dengan 25 unit PC untuk pembelajaran TIK',
      tanggalPemeliharaan: '2024-10-10',
      status: 'Maintenance',
      foto: '/api/placeholder/300/200'
    },
    {
      id: 4,
      nama: 'Lapangan Olahraga',
      kategori: 'Fasilitas Olahraga',
      kapasitas: 100,
      kondisi: 'Cukup',
      lokasi: 'Area Belakang Sekolah',
      deskripsi: 'Lapangan serbaguna untuk kegiatan olahraga dan upacara',
      tanggalPemeliharaan: '2024-09-05',
      status: 'Aktif',
      foto: '/api/placeholder/300/200'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedFasilitas, setSelectedFasilitas] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    kapasitas: '',
    kondisi: '',
    lokasi: '',
    deskripsi: '',
    tanggalPemeliharaan: '',
    status: 'Aktif'
  });

  const kategoriOptions = ['Ruang Kelas', 'Fasilitas Umum', 'Laboratorium', 'Fasilitas Olahraga', 'Kantor', 'Lainnya'];
  const kondisiOptions = ['Sangat Baik', 'Baik', 'Cukup', 'Perlu Perbaikan', 'Rusak'];
  const statusOptions = ['Aktif', 'Maintenance', 'Tidak Aktif'];

  // Filter dan search fasilitas
  const filteredFasilitas = fasilitas.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = filterKategori === '' || item.kategori === filterKategori;
    const matchStatus = filterStatus === '' || item.status === filterStatus;
    
    return matchSearch && matchKategori && matchStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFasilitas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFasilitas.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      const newFasilitas = {
        id: Date.now(),
        ...formData,
        kapasitas: parseInt(formData.kapasitas),
        foto: '/api/placeholder/300/200'
      };
      setFasilitas(prev => [...prev, newFasilitas]);
    } else {
      setFasilitas(prev => prev.map(item => 
        item.id === selectedFasilitas.id ? 
        { ...item, ...formData, kapasitas: parseInt(formData.kapasitas) } : 
        item
      ));
    }
    
    handleCloseModal();
  };

  const handleEdit = (item) => {
    setSelectedFasilitas(item);
    setFormData({
      nama: item.nama,
      kategori: item.kategori,
      kapasitas: item.kapasitas.toString(),
      kondisi: item.kondisi,
      lokasi: item.lokasi,
      deskripsi: item.deskripsi,
      tanggalPemeliharaan: item.tanggalPemeliharaan,
      status: item.status
    });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus fasilitas ini?')) {
      setFasilitas(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleDetail = (item) => {
    setSelectedFasilitas(item);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowDetailModal(false);
    setSelectedFasilitas(null);
    setFormData({
      nama: '',
      kategori: '',
      kapasitas: '',
      kondisi: '',
      lokasi: '',
      deskripsi: '',
      tanggalPemeliharaan: '',
      status: 'Aktif'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Aktif': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      'Maintenance': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Calendar },
      'Tidak Aktif': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig['Aktif'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  const getKondisiColor = (kondisi) => {
    const colors = {
      'Sangat Baik': 'text-green-600',
      'Baik': 'text-blue-600',
      'Cukup': 'text-yellow-600',
      'Perlu Perbaikan': 'text-orange-600',
      'Rusak': 'text-red-600'
    };
    return colors[kondisi] || 'text-gray-600';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Manajemen Fasilitas</h1>
        <p className="text-gray-600">Kelola data fasilitas SDN Karang Patri 01</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Fasilitas</p>
              <p className="text-2xl font-bold text-gray-900">{fasilitas.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fasilitas Aktif</p>
              <p className="text-2xl font-bold text-gray-900">
                {fasilitas.filter(f => f.status === 'Aktif').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {fasilitas.filter(f => f.status === 'Maintenance').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Kapasitas Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {fasilitas.reduce((sum, f) => sum + f.kapasitas, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari fasilitas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {kategoriOptions.map(kategori => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Semua Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <button
            onClick={() => {
              setModalMode('add');
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Fasilitas
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fasilitas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kapasitas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kondisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.lokasi}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      {item.kapasitas} orang
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getKondisiColor(item.kondisi)}`}>
                      {item.kondisi}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDetail(item)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        title="Hapus"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span> sampai{' '}
                  <span className="font-medium">{Math.min(indexOfLastItem, filteredFasilitas.length)}</span> dari{' '}
                  <span className="font-medium">{filteredFasilitas.length}</span> hasil
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {modalMode === 'add' ? 'Tambah Fasilitas Baru' : 'Edit Fasilitas'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Fasilitas *
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {kategoriOptions.map(kategori => (
                        <option key={kategori} value={kategori}>{kategori}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kapasitas *
                    </label>
                    <input
                      type="number"
                      name="kapasitas"
                      value={formData.kapasitas}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kondisi *
                    </label>
                    <select
                      name="kondisi"
                      value={formData.kondisi}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Pilih Kondisi</option>
                      {kondisiOptions.map(kondisi => (
                        <option key={kondisi} value={kondisi}>{kondisi}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi *
                  </label>
                  <input
                    type="text"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Lantai 1, Gedung Utama"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Pemeliharaan Terakhir
                  </label>
                  <input
                    type="date"
                    name="tanggalPemeliharaan"
                    value={formData.tanggalPemeliharaan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Deskripsi lengkap fasilitas..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {modalMode === 'add' ? 'Tambah' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedFasilitas && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Detail Fasilitas</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Nama Fasilitas</label>
                    <p className="text-lg font-medium text-gray-900">{selectedFasilitas.nama}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Kategori</label>
                    <span className="inline-block px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                      {selectedFasilitas.kategori}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Kapasitas</label>
                    <p className="text-lg font-medium text-gray-900">{selectedFasilitas.kapasitas} orang</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Kondisi</label>
                    <p className={`text-lg font-medium ${getKondisiColor(selectedFasilitas.kondisi)}`}>
                      {selectedFasilitas.kondisi}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedFasilitas.status)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Lokasi</label>
                  <p className="text-gray-900 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedFasilitas.lokasi}
                  </p>
                </div>

                {selectedFasilitas.tanggalPemeliharaan && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Tanggal Pemeliharaan Terakhir</label>
                    <p className="text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(selectedFasilitas.tanggalPemeliharaan).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {selectedFasilitas.deskripsi && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Deskripsi</label>
                    <p className="text-gray-900 mt-1">{selectedFasilitas.deskripsi}</p>
                  </div>
                )}

                {/* Foto Fasilitas */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Foto Fasilitas</label>
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img 
                      src={selectedFasilitas.foto} 
                      alt={selectedFasilitas.nama}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%236b7280">No Image</text></svg>';
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEdit(selectedFasilitas);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Fasilitas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredFasilitas.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada fasilitas ditemukan</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterKategori || filterStatus 
              ? 'Coba ubah filter pencarian Anda' 
              : 'Mulai dengan menambahkan fasilitas pertama'
            }
          </p>
          {!searchTerm && !filterKategori && !filterStatus && (
            <button
              onClick={() => {
                setModalMode('add');
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Fasilitas Pertama
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Fasilitas;