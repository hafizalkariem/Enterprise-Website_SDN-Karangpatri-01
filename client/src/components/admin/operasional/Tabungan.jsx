import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Download, Upload, Filter, X, Save, DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';

const Tabungan = () => {
  const [tabunganData, setTabunganData] = useState([
    {
      id: 1,
      nis: '2021001',
      nama: 'Ahmad Fadli',
      kelas: '6A',
      saldo: 125000,
      setoran_terakhir: '2024-06-10',
      jumlah_setoran: 5,
      status: 'aktif'
    },
    {
      id: 2,
      nis: '2021002',
      nama: 'Siti Nurhaliza',
      kelas: '5B',
      saldo: 89000,
      setoran_terakhir: '2024-06-08',
      jumlah_setoran: 3,
      status: 'aktif'
    },
    {
      id: 3,
      nis: '2021003',
      nama: 'Budi Santoso',
      kelas: '4A',
      saldo: 45000,
      setoran_terakhir: '2024-05-28',
      jumlah_setoran: 2,
      status: 'tidak_aktif'
    }
  ]);

  const [riwayatTransaksi] = useState([
    { id: 1, nis: '2021001', nama: 'Ahmad Fadli', tipe: 'setor', jumlah: 25000, tanggal: '2024-06-10', keterangan: 'Setoran rutin' },
    { id: 2, nis: '2021002', nama: 'Siti Nurhaliza', tipe: 'tarik', jumlah: 15000, tanggal: '2024-06-08', keterangan: 'Beli buku' },
    { id: 3, nis: '2021001', nama: 'Ahmad Fadli', tipe: 'setor', jumlah: 50000, tanggal: '2024-06-05', keterangan: 'Setoran awal bulan' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showTransaksiModal, setShowTransaksiModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedTabungan, setSelectedTabungan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    nis: '',
    nama: '',
    kelas: '',
    saldo: 0,
    status: 'aktif'
  });

  const [transaksiData, setTransaksiData] = useState({
    tipe: 'setor',
    jumlah: '',
    keterangan: ''
  });

  const kelasList = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];

  // Filter dan search data
  const filteredData = tabunganData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.nis.includes(searchTerm);
    const matchKelas = filterKelas === '' || item.kelas === filterKelas;
    const matchStatus = filterStatus === '' || item.status === filterStatus;
    
    return matchSearch && matchKelas && matchStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Statistics
  const totalSiswa = tabunganData.length;
  const totalSaldo = tabunganData.reduce((sum, item) => sum + item.saldo, 0);
  const siswaAktif = tabunganData.filter(item => item.status === 'aktif').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      const newId = Math.max(...tabunganData.map(item => item.id)) + 1;
      const newTabungan = {
        ...formData,
        id: newId,
        saldo: parseInt(formData.saldo) || 0,
        setoran_terakhir: new Date().toISOString().split('T')[0],
        jumlah_setoran: formData.saldo > 0 ? 1 : 0
      };
      setTabunganData([...tabunganData, newTabungan]);
    } else if (modalType === 'edit') {
      setTabunganData(tabunganData.map(item => 
        item.id === selectedTabungan.id 
          ? { ...item, ...formData, saldo: parseInt(formData.saldo) || 0 }
          : item
      ));
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleTransaksi = (e) => {
    e.preventDefault();
    
    const jumlah = parseInt(transaksiData.jumlah);
    const updatedTabungan = tabunganData.map(item => {
      if (item.id === selectedTabungan.id) {
        const newSaldo = transaksiData.tipe === 'setor' 
          ? item.saldo + jumlah 
          : item.saldo - jumlah;
        
        if (transaksiData.tipe === 'tarik' && newSaldo < 0) {
          alert('Saldo tidak mencukupi!');
          return item;
        }
        
        return {
          ...item,
          saldo: newSaldo,
          setoran_terakhir: new Date().toISOString().split('T')[0],
          jumlah_setoran: transaksiData.tipe === 'setor' ? item.jumlah_setoran + 1 : item.jumlah_setoran
        };
      }
      return item;
    });
    
    setTabunganData(updatedTabungan);
    setShowTransaksiModal(false);
    setTransaksiData({ tipe: 'setor', jumlah: '', keterangan: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data tabungan ini?')) {
      setTabunganData(tabunganData.filter(item => item.id !== id));
    }
  };

  const openModal = (type, tabungan = null) => {
    setModalType(type);
    setSelectedTabungan(tabungan);
    
    if (type === 'add') {
      resetForm();
    } else if (type === 'edit' && tabungan) {
      setFormData({
        nis: tabungan.nis,
        nama: tabungan.nama,
        kelas: tabungan.kelas,
        saldo: tabungan.saldo,
        status: tabungan.status
      });
    }
    
    setShowModal(true);
  };

  const openTransaksiModal = (tabungan) => {
    setSelectedTabungan(tabungan);
    setShowTransaksiModal(true);
  };

  const openDetailModal = (tabungan) => {
    setSelectedTabungan(tabungan);
    setShowDetailModal(true);
  };

  const resetForm = () => {
    setFormData({
      nis: '',
      nama: '',
      kelas: '',
      saldo: 0,
      status: 'aktif'
    });
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "NIS,Nama,Kelas,Saldo,Setoran Terakhir,Jumlah Setoran,Status\n" +
      tabunganData.map(row => 
        `${row.nis},${row.nama},${row.kelas},${row.saldo},${row.setoran_terakhir},${row.jumlah_setoran},${row.status}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_tabungan_siswa.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Tabungan Siswa</h1>
        <p className="text-gray-600">SDN Karangpatri 01 - Kelola tabungan siswa dengan mudah</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Siswa</p>
              <p className="text-2xl font-bold text-gray-900">{totalSiswa}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Saldo</p>
              <p className="text-2xl font-bold text-gray-900">{formatRupiah(totalSaldo)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Siswa Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{siswaAktif}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rata-rata Saldo</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatRupiah(totalSiswa > 0 ? totalSaldo / totalSiswa : 0)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari nama atau NIS..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
            >
              <option value="">Semua Kelas</option>
              {kelasList.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="tidak_aktif">Tidak Aktif</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => openModal('add')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Tabungan
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setoran Terakhir</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Setoran</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                      <div className="text-sm text-gray-500">NIS: {item.nis}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.kelas}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600">{formatRupiah(item.saldo)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.setoran_terakhir}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.jumlah_setoran}x</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'aktif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openDetailModal(item)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openTransaksiModal(item)}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                        title="Transaksi"
                      >
                        <DollarSign className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal('edit', item)}
                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
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
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredData.length)} dari {filteredData.length} data
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalType === 'add' ? 'Tambah Tabungan Baru' : 'Edit Tabungan'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIS</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.nis}
                    onChange={(e) => setFormData({...formData, nis: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Siswa</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.kelas}
                    onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                  >
                    <option value="">Pilih Kelas</option>
                    {kelasList.map(kelas => (
                      <option key={kelas} value={kelas}>{kelas}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {modalType === 'add' ? 'Saldo Awal' : 'Saldo'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.saldo}
                    onChange={(e) => setFormData({...formData, saldo: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="aktif">Aktif</option>
                    <option value="tidak_aktif">Tidak Aktif</option>
                  </select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {modalType === 'add' ? 'Simpan' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Transaksi */}
      {showTransaksiModal && selectedTabungan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Transaksi Tabungan</h3>
                <button
                  onClick={() => setShowTransaksiModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Siswa:</p>
                <p className="font-semibold">{selectedTabungan.nama}</p>
                <p className="text-sm text-gray-600">Saldo saat ini: <span className="font-semibold text-green-600">{formatRupiah(selectedTabungan.saldo)}</span></p>
              </div>
              
              <form onSubmit={handleTransaksi} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Transaksi</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={transaksiData.tipe}
                    onChange={(e) => setTransaksiData({...transaksiData, tipe: e.target.value})}
                  >
                    <option value="setor">Setor</option>
                    <option value="tarik">Tarik</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={transaksiData.jumlah}
                    onChange={(e) => setTransaksiData({...transaksiData, jumlah: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    value={transaksiData.keterangan}
                    onChange={(e) => setTransaksiData({...transaksiData, keterangan: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTransaksiModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      transaksiData.tipe === 'setor' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    {transaksiData.tipe === 'setor' ? 'Setor' : 'Tarik'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {showDetailModal && selectedTabungan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Detail Tabungan Siswa</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Info Siswa */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nama Siswa</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedTabungan.nama}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">NIS</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedTabungan.nis}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Kelas</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedTabungan.kelas}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedTabungan.status === 'aktif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedTabungan.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistik Tabungan */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Saldo Saat Ini</p>
                  <p className="text-2xl font-bold text-green-600">{formatRupiah(selectedTabungan.saldo)}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Setoran</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedTabungan.jumlah_setoran}x</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Setoran Terakhir</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedTabungan.setoran_terakhir}</p>
                </div>
              </div>

              {/* Riwayat Transaksi */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Riwayat Transaksi</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    {riwayatTransaksi
                      .filter(transaksi => transaksi.nis === selectedTabungan.nis)
                      .map((transaksi) => (
                        <div key={transaksi.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              transaksi.tipe === 'setor' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {transaksi.tipe === 'setor' ? 'Setoran' : 'Penarikan'}
                              </p>
                              <p className="text-sm text-gray-600">{transaksi.keterangan}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              transaksi.tipe === 'setor' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaksi.tipe === 'setor' ? '+' : '-'}{formatRupiah(transaksi.jumlah)}
                            </p>
                            <p className="text-sm text-gray-600">{transaksi.tanggal}</p>
                          </div>
                        </div>
                      ))
                    }
                    {riwayatTransaksi.filter(transaksi => transaksi.nis === selectedTabungan.nis).length === 0 && (
                      <div className="p-8 text-center text-gray-500">
                        <p>Belum ada riwayat transaksi</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    openTransaksiModal(selectedTabungan);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  Transaksi Baru
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    openModal('edit', selectedTabungan);
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabungan;