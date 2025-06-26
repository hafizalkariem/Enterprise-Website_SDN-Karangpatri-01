import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus, Download, Users, BookOpen, Award, Calendar } from 'lucide-react';

const DataSiswa = () => {
  const [siswaData, setSiswaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view', 'edit', 'add'
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  // Data dummy siswa
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        nisn: '0123456789',
        nama: 'Ahmad Fauzi',
        kelas: '6A',
        jenisKelamin: 'Laki-laki',
        tanggalLahir: '2012-05-15',
        alamat: 'Jl. Merdeka No. 123, Karangpatri',
        namaOrtu: 'Budi Santoso',
        noTelpOrtu: '081234567890',
        email: 'ahmad.fauzi@email.com',
        status: 'Aktif',
        nilaiRataRata: 85.5,
        kehadiran: 95
      },
      {
        id: 2,
        nisn: '0123456790',
        nama: 'Siti Nurhaliza',
        kelas: '6A',
        jenisKelamin: 'Perempuan',
        tanggalLahir: '2012-08-22',
        alamat: 'Jl. Diponegoro No. 45, Karangpatri',
        namaOrtu: 'Sari Dewi',
        noTelpOrtu: '081234567891',
        email: 'siti.nurhaliza@email.com',
        status: 'Aktif',
        nilaiRataRata: 92.0,
        kehadiran: 98
      },
      {
        id: 3,
        nisn: '0123456791',
        nama: 'Bayu Pratama',
        kelas: '5B',
        jenisKelamin: 'Laki-laki',
        tanggalLahir: '2013-03-10',
        alamat: 'Jl. Sudirman No. 67, Karangpatri',
        namaOrtu: 'Eko Prasetyo',
        noTelpOrtu: '081234567892',
        email: 'bayu.pratama@email.com',
        status: 'Aktif',
        nilaiRataRata: 78.5,
        kehadiran: 92
      },
      {
        id: 4,
        nisn: '0123456792',
        nama: 'Dewi Lestari',
        kelas: '5B',
        jenisKelamin: 'Perempuan',
        tanggalLahir: '2013-11-05',
        alamat: 'Jl. Gatot Subroto No. 89, Karangpatri',
        namaOrtu: 'Wati Sari',
        noTelpOrtu: '081234567893',
        email: 'dewi.lestari@email.com',
        status: 'Aktif',
        nilaiRataRata: 88.0,
        kehadiran: 96
      },
      {
        id: 5,
        nisn: '0123456793',
        nama: 'Rizki Ramadhan',
        kelas: '4A',
        jenisKelamin: 'Laki-laki',
        tanggalLahir: '2014-07-18',
        alamat: 'Jl. Ahmad Yani No. 12, Karangpatri',
        namaOrtu: 'Agus Hermawan',
        noTelpOrtu: '081234567894',
        email: 'rizki.ramadhan@email.com',
        status: 'Aktif',
        nilaiRataRata: 81.5,
        kehadiran: 94
      }
    ];
    setSiswaData(dummyData);
    setFilteredData(dummyData);
  }, []);

  // Filter dan pencarian
  useEffect(() => {
    let filtered = siswaData;

    if (searchTerm) {
      filtered = filtered.filter(siswa =>
        siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        siswa.nisn.includes(searchTerm) ||
        siswa.kelas.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterKelas) {
      filtered = filtered.filter(siswa => siswa.kelas === filterKelas);
    }

    setFilteredData(filtered);
  }, [searchTerm, filterKelas, siswaData]);

  const handleView = (siswa) => {
    setSelectedSiswa(siswa);
    setModalType('view');
    setShowModal(true);
  };

  const handleEdit = (siswa) => {
    setSelectedSiswa(siswa);
    setModalType('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedSiswa(null);
    setModalType('add');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      setSiswaData(siswaData.filter(siswa => siswa.id !== id));
    }
  };

  const exportData = () => {
    const csvContent = [
      ['NISN', 'Nama', 'Kelas', 'Jenis Kelamin', 'Tanggal Lahir', 'Alamat', 'Nama Ortu', 'No Telp Ortu', 'Email', 'Status', 'Nilai Rata-rata', 'Kehadiran'],
      ...filteredData.map(siswa => [
        siswa.nisn,
        siswa.nama,
        siswa.kelas,
        siswa.jenisKelamin,
        siswa.tanggalLahir,
        siswa.alamat,
        siswa.namaOrtu,
        siswa.noTelpOrtu,
        siswa.email,
        siswa.status,
        siswa.nilaiRataRata,
        siswa.kehadiran + '%'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data_siswa.csv';
    a.click();
  };

  const getKelasList = () => {
    const kelas = [...new Set(siswaData.map(siswa => siswa.kelas))];
    return kelas.sort();
  };

  const getStatistik = () => {
    const totalSiswa = siswaData.length;
    const siswaAktif = siswaData.filter(s => s.status === 'Aktif').length;
    const rataRataNilai = siswaData.reduce((sum, s) => sum + s.nilaiRataRata, 0) / totalSiswa;
    const rataRataKehadiran = siswaData.reduce((sum, s) => sum + s.kehadiran, 0) / totalSiswa;

    return {
      totalSiswa,
      siswaAktif,
      rataRataNilai: rataRataNilai.toFixed(1),
      rataRataKehadiran: rataRataKehadiran.toFixed(1)
    };
  };

  const statistik = getStatistik();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Siswa</h1>
        <p className="text-gray-600">Kelola data siswa SDN Karangpatri 01</p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Siswa</p>
              <p className="text-2xl font-bold text-gray-800">{statistik.totalSiswa}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Siswa Aktif</p>
              <p className="text-2xl font-bold text-gray-800">{statistik.siswaAktif}</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rata-rata Nilai</p>
              <p className="text-2xl font-bold text-gray-800">{statistik.rataRataNilai}</p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rata-rata Kehadiran</p>
              <p className="text-2xl font-bold text-gray-800">{statistik.rataRataKehadiran}%</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filter dan Search */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, NISN, atau kelas..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
              >
                <option value="">Semua Kelas</option>
                {getKelasList().map(kelas => (
                  <option key={kelas} value={kelas}>{kelas}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Tambah Siswa
            </button>
          </div>
        </div>
      </div>

      {/* Tabel Data Siswa */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NISN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Rata-rata</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kehadiran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((siswa, index) => (
                <tr key={siswa.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{siswa.nisn}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{siswa.nama}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {siswa.kelas}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{siswa.jenisKelamin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      siswa.nilaiRataRata >= 90 ? 'bg-green-100 text-green-800' :
                      siswa.nilaiRataRata >= 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {siswa.nilaiRataRata}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      siswa.kehadiran >= 95 ? 'bg-green-100 text-green-800' :
                      siswa.kehadiran >= 90 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {siswa.kehadiran}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      siswa.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {siswa.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(siswa)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Lihat Detail"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(siswa)}
                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(siswa.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada data siswa yang ditemukan.</p>
          </div>
        )}
      </div>

      {/* Modal untuk View/Edit/Add */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {modalType === 'view' ? 'Detail Siswa' : 
                 modalType === 'edit' ? 'Edit Siswa' : 'Tambah Siswa Baru'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.nisn || ''}
                  disabled={modalType === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.nama || ''}
                  disabled={modalType === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.kelas || ''}
                  disabled={modalType === 'view'}
                >
                  <option value="">Pilih Kelas</option>
                  <option value="1A">1A</option>
                  <option value="1B">1B</option>
                  <option value="2A">2A</option>
                  <option value="2B">2B</option>
                  <option value="3A">3A</option>
                  <option value="3B">3B</option>
                  <option value="4A">4A</option>
                  <option value="4B">4B</option>
                  <option value="5A">5A</option>
                  <option value="5B">5B</option>
                  <option value="6A">6A</option>
                  <option value="6B">6B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.jenisKelamin || ''}
                  disabled={modalType === 'view'}
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.tanggalLahir || ''}
                  disabled={modalType === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.email || ''}
                  disabled={modalType === 'view'}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.alamat || ''}
                  disabled={modalType === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Orang Tua</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.namaOrtu || ''}
                  disabled={modalType === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Telp Orang Tua</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedSiswa?.noTelpOrtu || ''}
                  disabled={modalType === 'view'}
                />
              </div>

              {modalType === 'view' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nilai Rata-rata</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      value={selectedSiswa?.nilaiRataRata || ''}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kehadiran</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      value={`${selectedSiswa?.kehadiran || ''}%`}
                      disabled
                    />
                  </div>
                </>
              )}
            </div>

            {modalType !== 'view' && (
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    // Di sini implementasi save/update logic
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {modalType === 'edit' ? 'Simpan Perubahan' : 'Tambah Siswa'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSiswa;