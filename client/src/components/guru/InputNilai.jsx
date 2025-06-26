import React, { useState, useEffect } from 'react';
import { Save, Search, Filter, BookOpen, Users, Award, Calculator, Download, Upload, Eye, Edit, Trash2, Plus } from 'lucide-react';

const InputNilai = () => {
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedMataPelajaran, setSelectedMataPelajaran] = useState('');
  const [selectedJenisNilai, setSelectedJenisNilai] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [siswaData, setSiswaData] = useState([]);
  const [nilaiData, setNilaiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'view'
  const [selectedNilai, setSelectedNilai] = useState(null);

  // Data dummy
  const kelasOptions = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];
  const mataPelajaranOptions = [
    'Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 
    'Bahasa Inggris', 'PKN', 'Agama', 'Seni Budaya', 
    'Penjas', 'Muatan Lokal'
  ];
  const jenisNilaiOptions = [
    'Ulangan Harian', 'UTS', 'UAS', 'Tugas', 'Praktik', 'Sikap'
  ];

  // Data dummy siswa
  useEffect(() => {
    if (selectedKelas) {
      const dummySiswa = [
        { id: 1, nisn: '0123456789', nama: 'Ahmad Fauzi', kelas: selectedKelas },
        { id: 2, nisn: '0123456790', nama: 'Siti Nurhaliza', kelas: selectedKelas },
        { id: 3, nisn: '0123456791', nama: 'Bayu Pratama', kelas: selectedKelas },
        { id: 4, nisn: '0123456792', nama: 'Dewi Lestari', kelas: selectedKelas },
        { id: 5, nisn: '0123456793', nama: 'Rizki Ramadhan', kelas: selectedKelas },
        { id: 6, nisn: '0123456794', nama: 'Maya Sari', kelas: selectedKelas },
        { id: 7, nisn: '0123456795', nama: 'Andi Wijaya', kelas: selectedKelas },
        { id: 8, nisn: '0123456796', nama: 'Putri Indah', kelas: selectedKelas }
      ];
      setSiswaData(dummySiswa);
    }
  }, [selectedKelas]);

  // Data dummy nilai yang sudah ada
  useEffect(() => {
    const dummyNilai = [
      {
        id: 1,
        siswaId: 1,
        siswaName: 'Ahmad Fauzi',
        nisn: '0123456789',
        kelas: '6A',
        mataPelajaran: 'Matematika',
        jenisNilai: 'Ulangan Harian',
        semester: '1',
        nilai: 85,
        tanggalInput: '2025-01-15',
        keterangan: 'Materi Pecahan'
      },
      {
        id: 2,
        siswaId: 2,
        siswaName: 'Siti Nurhaliza',
        nisn: '0123456790',
        kelas: '6A',
        mataPelajaran: 'Matematika',
        jenisNilai: 'Ulangan Harian',
        semester: '1',
        nilai: 92,
        tanggalInput: '2025-01-15',
        keterangan: 'Materi Pecahan'
      },
      {
        id: 3,
        siswaId: 1,
        siswaName: 'Ahmad Fauzi',
        nisn: '0123456789',
        kelas: '6A',
        mataPelajaran: 'Bahasa Indonesia',
        jenisNilai: 'UTS',
        semester: '1',
        nilai: 78,
        tanggalInput: '2025-01-10',
        keterangan: 'Ujian Tengah Semester'
      }
    ];
    setNilaiData(dummyNilai);
  }, []);

  const handleNilaiChange = (siswaId, nilai) => {
    setSiswaData(prev => prev.map(siswa => 
      siswa.id === siswaId ? {...siswa, inputNilai: nilai} : siswa
    ));
  };

  const handleSimpanNilai = async () => {
    if (!selectedKelas || !selectedMataPelajaran || !selectedJenisNilai) {
      alert('Pilih kelas, mata pelajaran, dan jenis nilai terlebih dahulu!');
      return;
    }

    setIsLoading(true);
    
    // Simulasi proses penyimpanan
    setTimeout(() => {
      const nilaiYangDiinput = siswaData
        .filter(siswa => siswa.inputNilai && siswa.inputNilai !== '')
        .map(siswa => ({
          id: Date.now() + siswa.id,
          siswaId: siswa.id,
          siswaName: siswa.nama,
          nisn: siswa.nisn,
          kelas: selectedKelas,
          mataPelajaran: selectedMataPelajaran,
          jenisNilai: selectedJenisNilai,
          semester: selectedSemester,
          nilai: parseInt(siswa.inputNilai),
          tanggalInput: new Date().toISOString().split('T')[0],
          keterangan: document.getElementById('keterangan')?.value || ''
        }));

      setNilaiData(prev => [...prev, ...nilaiYangDiinput]);
      
      // Reset form
      setSiswaData(prev => prev.map(siswa => ({...siswa, inputNilai: ''})));
      document.getElementById('keterangan').value = '';
      
      setIsLoading(false);
      alert('Nilai berhasil disimpan!');
    }, 1000);
  };

  const handleEdit = (nilai) => {
    setSelectedNilai(nilai);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus nilai ini?')) {
      setNilaiData(prev => prev.filter(nilai => nilai.id !== id));
      alert('Nilai berhasil dihapus!');
    }
  };

  const handleImportNilai = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Import file: ${file.name} (Fitur akan diimplementasi)`);
      }
    };
    input.click();
  };

  const handleExportNilai = () => {
    const filteredNilai = nilaiData.filter(nilai => 
      (!selectedKelas || nilai.kelas === selectedKelas) &&
      (!selectedMataPelajaran || nilai.mataPelajaran === selectedMataPelajaran) &&
      (!selectedJenisNilai || nilai.jenisNilai === selectedJenisNilai)
    );

    const csvContent = [
      ['NISN', 'Nama', 'Kelas', 'Mata Pelajaran', 'Jenis Nilai', 'Semester', 'Nilai', 'Tanggal Input', 'Keterangan'],
      ...filteredNilai.map(nilai => [
        nilai.nisn,
        nilai.siswaName,
        nilai.kelas,
        nilai.mataPelajaran,
        nilai.jenisNilai,
        nilai.semester,
        nilai.nilai,
        nilai.tanggalInput,
        nilai.keterangan
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nilai_${selectedKelas}_${selectedMataPelajaran}.csv`;
    a.click();
  };

  const getStatistikNilai = () => {
    const filteredNilai = nilaiData.filter(nilai => 
      (!selectedKelas || nilai.kelas === selectedKelas) &&
      (!selectedMataPelajaran || nilai.mataPelajaran === selectedMataPelajaran)
    );

    if (filteredNilai.length === 0) return { total: 0, rataRata: 0, tertinggi: 0, terendah: 0 };

    const nilaiArray = filteredNilai.map(n => n.nilai);
    return {
      total: filteredNilai.length,
      rataRata: (nilaiArray.reduce((sum, n) => sum + n, 0) / nilaiArray.length).toFixed(1),
      tertinggi: Math.max(...nilaiArray),
      terendah: Math.min(...nilaiArray)
    };
  };

  const statistik = getStatistikNilai();

  const filteredNilaiData = nilaiData.filter(nilai =>
    nilai.siswaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nilai.nisn.includes(searchTerm) ||
    nilai.mataPelajaran.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Input Nilai</h1>
        <p className="text-gray-600">Kelola dan input nilai siswa SDN Karangpatri 01</p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Nilai</p>
              <p className="text-2xl font-bold text-gray-800">{statistik.total}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rata-rata</p>
              <p className="text-2xl font-bold text-gray-800">{statistik.rataRata}</p>
            </div>
            <Calculator className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nilai Tertinggi</p>
              <p className="text-2xl font-bold text-gray-800">{statistik.tertinggi}</p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nilai Terendah</p>
              <p className="text-2xl font-bold text-gray-800">{statistik.terendah}</p>
            </div>
            <Users className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Form Input Nilai */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Form Input Nilai</h2>
        
        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
            >
              <option value="">Pilih Kelas</option>
              {kelasOptions.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedMataPelajaran}
              onChange={(e) => setSelectedMataPelajaran(e.target.value)}
            >
              <option value="">Pilih Mata Pelajaran</option>
              {mataPelajaranOptions.map(mapel => (
                <option key={mapel} value={mapel}>{mapel}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Nilai</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedJenisNilai}
              onChange={(e) => setSelectedJenisNilai(e.target.value)}
            >
              <option value="">Pilih Jenis Nilai</option>
              {jenisNilaiOptions.map(jenis => (
                <option key={jenis} value={jenis}>{jenis}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan (Opsional)</label>
          <input
            id="keterangan"
            type="text"
            placeholder="Contoh: Materi Pecahan, Ujian Tengah Semester, dll"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tabel Input Nilai */}
        {selectedKelas && selectedMataPelajaran && selectedJenisNilai && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">NISN</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nama Siswa</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nilai (0-100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {siswaData.map((siswa, index) => (
                  <tr key={siswa.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{siswa.nisn}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{siswa.nama}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={siswa.inputNilai || ''}
                        onChange={(e) => handleNilaiChange(siswa.id, e.target.value)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0-100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSimpanNilai}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {isLoading ? 'Menyimpan...' : 'Simpan Nilai'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Riwayat Nilai */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">Riwayat Nilai</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, NISN, mapel..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleImportNilai}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Upload className="h-4 w-4" />
                Import
              </button>
              <button
                onClick={handleExportNilai}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NISN</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mata Pelajaran</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis Nilai</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nilai</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNilaiData.map((nilai, index) => (
                <tr key={nilai.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{nilai.nisn}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{nilai.siswaName}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {nilai.kelas}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{nilai.mataPelajaran}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {nilai.jenisNilai}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-sm font-bold rounded-full ${
                      nilai.nilai >= 90 ? 'bg-green-100 text-green-800' :
                      nilai.nilai >= 80 ? 'bg-blue-100 text-blue-800' :
                      nilai.nilai >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {nilai.nilai}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{nilai.tanggalInput}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(nilai)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(nilai.id)}
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

          {filteredNilaiData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Belum ada data nilai yang diinput.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Edit Nilai */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Nilai</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Siswa</label>
                <input
                  type="text"
                  value={selectedNilai?.siswaName || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
                <input
                  type="text"
                  value={selectedNilai?.mataPelajaran || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nilai</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={selectedNilai?.nilai || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                <input
                  type="text"
                  defaultValue={selectedNilai?.keterangan || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  // Implementasi update nilai
                  setShowModal(false);
                  alert('Nilai berhasil diupdate!');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputNilai;