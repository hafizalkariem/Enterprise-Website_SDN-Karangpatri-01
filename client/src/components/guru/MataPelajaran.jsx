import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  BookOpen, 
  Clock, 
  Users,
  Filter,
  Download,
  Eye
} from 'lucide-react';

const MataPelajaran = () => {
  const [mataPelajaran, setMataPelajaran] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMapel, setCurrentMapel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMapel, setSelectedMapel] = useState(null);

  // Data dummy untuk mata pelajaran
  const dummyData = [
    {
      id: 1,
      nama: 'Matematika',
      kelas: '6A',
      tingkat: 6,
      jumlahSiswa: 28,
      jamPerMinggu: 6,
      hari: ['Senin', 'Rabu', 'Jumat'],
      waktu: '07:30 - 09:00',
      semester: 'Ganjil',
      tahunAjaran: '2024/2025',
      deskripsi: 'Mata pelajaran matematika untuk kelas 6 mencakup operasi hitung, geometri, dan statistik dasar',
      materi: ['Bilangan Bulat', 'Pecahan', 'Geometri', 'Pengukuran', 'Statistik'],
      status: 'Aktif'
    },
    {
      id: 2,
      nama: 'Bahasa Indonesia',
      kelas: '6A',
      tingkat: 6,
      jumlahSiswa: 28,
      jamPerMinggu: 8,
      hari: ['Selasa', 'Kamis'],
      waktu: '09:15 - 10:45',
      semester: 'Ganjil',
      tahunAjaran: '2024/2025',
      deskripsi: 'Pembelajaran bahasa Indonesia dengan fokus pada membaca, menulis, dan berbicara',
      materi: ['Membaca Pemahaman', 'Menulis Karangan', 'Tata Bahasa', 'Sastra', 'Berbicara'],
      status: 'Aktif'
    },
    {
      id: 3,
      nama: 'IPA',
      kelas: '6B',
      tingkat: 6,
      jumlahSiswa: 26,
      jamPerMinggu: 5,
      hari: ['Senin', 'Kamis'],
      waktu: '10:45 - 12:15',
      semester: 'Ganjil',
      tahunAjaran: '2024/2025',
      deskripsi: 'Ilmu Pengetahuan Alam untuk mengembangkan pemahaman tentang alam sekitar',
      materi: ['Makhluk Hidup', 'Energi dan Perubahannya', 'Bumi dan Alam Semesta'],
      status: 'Aktif'
    }
  ];

  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    tingkat: '',
    jumlahSiswa: '',
    jamPerMinggu: '',
    hari: [],
    waktu: '',
    semester: 'Ganjil',
    tahunAjaran: '2024/2025',
    deskripsi: '',
    materi: [],
    status: 'Aktif'
  });

  const kelasOptions = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];
  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  useEffect(() => {
    setMataPelajaran(dummyData);
    setFilteredData(dummyData);
  }, []);

  useEffect(() => {
    let filtered = mataPelajaran.filter(mapel =>
      mapel.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapel.kelas.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterKelas) {
      filtered = filtered.filter(mapel => mapel.kelas === filterKelas);
    }

    setFilteredData(filtered);
  }, [searchTerm, filterKelas, mataPelajaran]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      setMataPelajaran(prev => prev.map(mapel => 
        mapel.id === currentMapel.id ? { ...formData, id: currentMapel.id } : mapel
      ));
    } else {
      const newMapel = {
        ...formData,
        id: Date.now(),
        jumlahSiswa: parseInt(formData.jumlahSiswa),
        jamPerMinggu: parseInt(formData.jamPerMinggu),
        tingkat: parseInt(formData.tingkat)
      };
      setMataPelajaran(prev => [...prev, newMapel]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      kelas: '',
      tingkat: '',
      jumlahSiswa: '',
      jamPerMinggu: '',
      hari: [],
      waktu: '',
      semester: 'Ganjil',
      tahunAjaran: '2024/2025',
      deskripsi: '',
      materi: [],
      status: 'Aktif'
    });
    setShowModal(false);
    setEditMode(false);
    setCurrentMapel(null);
  };

  const handleEdit = (mapel) => {
    setCurrentMapel(mapel);
    setFormData(mapel);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) {
      setMataPelajaran(prev => prev.filter(mapel => mapel.id !== id));
    }
  };

  const handleDetail = (mapel) => {
    setSelectedMapel(mapel);
    setShowDetail(true);
  };

  const handleArrayInput = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-blue-600" />
              Manajemen Mata Pelajaran
            </h1>
            <p className="text-gray-600 mt-1">Kelola data mata pelajaran yang Anda ampu</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Mata Pelajaran
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Mata Pelajaran</p>
                <p className="text-2xl font-bold text-gray-800">{mataPelajaran.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Siswa</p>
                <p className="text-2xl font-bold text-gray-800">
                  {mataPelajaran.reduce((sum, mapel) => sum + mapel.jumlahSiswa, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Jam/Minggu</p>
                <p className="text-2xl font-bold text-gray-800">
                  {mataPelajaran.reduce((sum, mapel) => sum + mapel.jamPerMinggu, 0)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kelas Aktif</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(mataPelajaran.map(mapel => mapel.kelas)).size}
                </p>
              </div>
              <Filter className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari mata pelajaran..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Kelas</option>
                {kelasOptions.map(kelas => (
                  <option key={kelas} value={kelas}>{kelas}</option>
                ))}
              </select>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mata Pelajaran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Siswa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jam/Minggu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jadwal
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
              {filteredData.map((mapel) => (
                <tr key={mapel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{mapel.nama}</div>
                        <div className="text-sm text-gray-500">Tingkat {mapel.tingkat}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                      {mapel.kelas}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      {mapel.jumlahSiswa}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      {mapel.jamPerMinggu} jam
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{mapel.hari.join(', ')}</div>
                      <div className="text-gray-500">{mapel.waktu}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      mapel.status === 'Aktif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {mapel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDetail(mapel)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(mapel)}
                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(mapel.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
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
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editMode ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Mata Pelajaran
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kelas
                  </label>
                  <select
                    required
                    value={formData.kelas}
                    onChange={(e) => setFormData(prev => ({ ...prev, kelas: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Pilih Kelas</option>
                    {kelasOptions.map(kelas => (
                      <option key={kelas} value={kelas}>{kelas}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tingkat
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="6"
                    value={formData.tingkat}
                    onChange={(e) => setFormData(prev => ({ ...prev, tingkat: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jumlah Siswa
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.jumlahSiswa}
                    onChange={(e) => setFormData(prev => ({ ...prev, jumlahSiswa: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jam per Minggu
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.jamPerMinggu}
                    onChange={(e) => setFormData(prev => ({ ...prev, jamPerMinggu: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hari (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hari.join(', ')}
                    onChange={(e) => handleArrayInput('hari', e.target.value)}
                    placeholder="Senin, Rabu, Jumat"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waktu
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.waktu}
                    onChange={(e) => setFormData(prev => ({ ...prev, waktu: e.target.value }))}
                    placeholder="07:30 - 09:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Ganjil">Ganjil</option>
                    <option value="Genap">Genap</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tahun Ajaran
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tahunAjaran}
                    onChange={(e) => setFormData(prev => ({ ...prev, tahunAjaran: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Deskripsi mata pelajaran..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Materi Pembelajaran (pisahkan dengan koma)
                </label>
                <textarea
                  value={formData.materi.join(', ')}
                  onChange={(e) => handleArrayInput('materi', e.target.value)}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bilangan Bulat, Pecahan, Geometri"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editMode ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {showDetail && selectedMapel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Detail Mata Pelajaran</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Informasi Dasar</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Nama:</strong> {selectedMapel.nama}</div>
                    <div><strong>Kelas:</strong> {selectedMapel.kelas}</div>
                    <div><strong>Tingkat:</strong> {selectedMapel.tingkat}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedMapel.status === 'Aktif' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedMapel.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Jadwal & Durasi</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Hari:</strong> {selectedMapel.hari.join(', ')}</div>
                    <div><strong>Waktu:</strong> {selectedMapel.waktu}</div>
                    <div><strong>Jam/Minggu:</strong> {selectedMapel.jamPerMinggu} jam</div>
                    <div><strong>Semester:</strong> {selectedMapel.semester}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Deskripsi</h3>
                <p className="text-sm text-gray-600">{selectedMapel.deskripsi}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Materi Pembelajaran</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMapel.materi.map((materi, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {materi}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Siswa</h3>
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{selectedMapel.jumlahSiswa}</div>
                      <div className="text-sm text-gray-600">Total Siswa</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Tahun Ajaran</h3>
                  <div className="flex items-center">
                    <Clock className="w-8 h-8 text-green-500 mr-3" />
                    <div>
                      <div className="text-lg font-bold text-gray-800">{selectedMapel.tahunAjaran}</div>
                      <div className="text-sm text-gray-600">Semester {selectedMapel.semester}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setShowDetail(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    setShowDetail(false);
                    handleEdit(selectedMapel);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterKelas ? 'Tidak ada data yang sesuai' : 'Belum ada mata pelajaran'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || filterKelas 
              ? 'Coba ubah kata kunci pencarian atau filter yang digunakan'
              : 'Mulai dengan menambahkan mata pelajaran pertama Anda'
            }
          </p>
          {!searchTerm && !filterKelas && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Tambah Mata Pelajaran
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MataPelajaran;