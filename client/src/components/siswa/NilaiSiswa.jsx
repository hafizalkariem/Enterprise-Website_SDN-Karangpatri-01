import React, { useState,useEffect } from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';

const NilaiSiswa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [selectedMapel, setSelectedMapel] = useState('semua');
  const [nilaiData, setNilaiData] = useState([]);
  const token = localStorage.getItem('token');

  // Data dummy nilai siswa
  useEffect(() => {
    const fetchNilai = async () => {
      try {
        console.log("FETCHING NILAI...");
        console.log("Token:", token); // 1. Cek token
        const queryParams = new URLSearchParams();
    if (selectedSemester !== 'semua') {
      queryParams.append('semester', selectedSemester);
    }
    queryParams.append('tahun_ajaran', '2025');
        const res = await fetch(`http://localhost:8000/api/nilai?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Status Response:", res.status); // 2. Cek status response
        
        if (!res.ok) {
          throw new Error(`Gagal memuat data nilai. Status: ${res.status}`);
        }
  
        const data = await res.json();
        console.log("DATA DARI API:", data); // 3. Lihat isi data
  
        setNilaiData(data); // 4. Simpan ke state
      } catch (error) {
        console.error("ERROR FETCH NILAI:", error.message);
      }
    };
  
    fetchNilai();
  }, [selectedSemester, selectedMapel]);
  

  const mapelList = ['semua', ...new Set(nilaiData.map(item => item.mapel))];

  const filteredData = nilaiData.filter(item => {
    const matchSearch =
      item.mapel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.guru || "").toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchSemester =
      selectedSemester === 'semua' || item.semester === parseInt(selectedSemester);

      console.log("selectedSemester:", selectedSemester, typeof selectedSemester);
console.log("item.semester:", item.semester, typeof item.semester);

  
    const matchMapel =
      selectedMapel === 'semua' || item.mapel === selectedMapel;
  
    return matchSearch && matchSemester && matchMapel;
  });
  
  console.log("filteredData:", filteredData);


  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': case 'A-': return 'text-green-600 bg-green-50';
      case 'B+': case 'B': case 'B-': return 'text-blue-600 bg-blue-50';
      case 'C+': case 'C': case 'C-': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-red-600 bg-red-50';
    }
  };

  const calculateGPA = () => {
    if (filteredData.length === 0) return 0;
    const total = filteredData.reduce((sum, item) => sum + item.nilai_akhir, 0);
    return (total / filteredData.length).toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nilai Akademik</h2>
            <p className="text-gray-600 mt-1">Lihat dan pantau nilai akademik Anda</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={16} />
              Unduh Rapor
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="text-blue-600 text-sm font-medium">Total Mata Pelajaran</div>
            <div className="text-2xl font-bold text-blue-700">{filteredData.length}</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="text-green-600 text-sm font-medium">Rata-rata Nilai</div>
            <div className="text-2xl font-bold text-green-700">{calculateGPA()}</div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="text-purple-600 text-sm font-medium">Mata Pelajaran Lulus</div>
            <div className="text-2xl font-bold text-purple-700">
              {filteredData.filter(item => item.keterangan === 'Lulus').length}
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
            <div className="text-yellow-600 text-sm font-medium">Semester Aktif</div>
            <div className="text-2xl font-bold text-yellow-700">{selectedSemester}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Cari mata pelajaran atau guru..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="semua">Semua Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedMapel}
              onChange={(e) => setSelectedMapel(e.target.value)}
            >
              {mapelList.map(mapel => (
                <option key={mapel} value={mapel}>
                  {mapel === 'semua' ? 'Semua Mata Pelajaran' : mapel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mata Pelajaran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guru
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tugas
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                UTS
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                UAS
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nilai Akhir
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.mapel}</div>
                  <div className="text-sm text-gray-500">Semester {item.semester}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {item.guru}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                  {item.tugas}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                  {item.uts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                  {item.uas}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="font-semibold text-gray-900">{Math.round(item.nilai_akhir)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(item.grade)}`}>
                    {item.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.keterangan === 'Lulus' 
                      ? 'text-green-800 bg-green-100' 
                      : 'text-red-800 bg-red-100'
                  }`}>
                    {item.keterangan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors p-1">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data nilai</h3>
          <p className="text-gray-500">Tidak ada data nilai yang cocok dengan filter yang dipilih.</p>
        </div>
      )}

      {/* Footer */}
      {filteredData.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Menampilkan {filteredData.length} mata pelajaran</span>
            <span>Rata-rata keseluruhan: <strong className="text-gray-900">{calculateGPA()}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NilaiSiswa;