import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Save,
  X
} from 'lucide-react';

const Absensi = () => {
  const [selectedKelas, setSelectedKelas] = useState('4A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [absensiData, setAbsensiData] = useState({});

  // Data siswa per kelas
  const siswaData = {
    '4A': [
      { id: 1, nama: 'Ahmad Fajar Pratama', nisn: '0051234567', jenisKelamin: 'L' },
      { id: 2, nama: 'Siti Nurhaliza', nisn: '0051234568', jenisKelamin: 'P' },
      { id: 3, nama: 'Muhammad Rizki Andika', nisn: '0051234569', jenisKelamin: 'L' },
      { id: 4, nama: 'Dewi Sartika Putri', nisn: '0051234570', jenisKelamin: 'P' },
      { id: 5, nama: 'Budi Santoso', nisn: '0051234571', jenisKelamin: 'L' },
      { id: 6, nama: 'Aisyah Maharani', nisn: '0051234572', jenisKelamin: 'P' },
      { id: 7, nama: 'Dimas Prakoso', nisn: '0051234573', jenisKelamin: 'L' },
      { id: 8, nama: 'Fitri Handayani', nisn: '0051234574', jenisKelamin: 'P' },
      { id: 9, nama: 'Galang Ramadan', nisn: '0051234575', jenisKelamin: 'L' },
      { id: 10, nama: 'Hana Safitri', nisn: '0051234576', jenisKelamin: 'P' }
    ],
    '4B': [
      { id: 11, nama: 'Irfan Maulana', nisn: '0051234577', jenisKelamin: 'L' },
      { id: 12, nama: 'Jasmine Putri', nisn: '0051234578', jenisKelamin: 'P' },
      { id: 13, nama: 'Kevin Alexander', nisn: '0051234579', jenisKelamin: 'L' },
      { id: 14, nama: 'Laila Sari', nisn: '0051234580', jenisKelamin: 'P' },
      { id: 15, nama: 'Mario Teguh', nisn: '0051234581', jenisKelamin: 'L' }
    ],
    '5A': [
      { id: 16, nama: 'Nanda Pratiwi', nisn: '0051234582', jenisKelamin: 'P' },
      { id: 17, nama: 'Omar Khayyam', nisn: '0051234583', jenisKelamin: 'L' },
      { id: 18, nama: 'Putri Ayu Lestari', nisn: '0051234584', jenisKelamin: 'P' },
      { id: 19, nama: 'Qadri Rahman', nisn: '0051234585', jenisKelamin: 'L' },
      { id: 20, nama: 'Rani Mulyani', nisn: '0051234586', jenisKelamin: 'P' }
    ],
    '5B': [
      { id: 21, nama: 'Surya Wijaya', nisn: '0051234587', jenisKelamin: 'L' },
      { id: 22, nama: 'Tina Kartika', nisn: '0051234588', jenisKelamin: 'P' },
      { id: 23, nama: 'Umar Farouk', nisn: '0051234589', jenisKelamin: 'L' },
      { id: 24, nama: 'Vera Susanti', nisn: '0051234590', jenisKelamin: 'P' },
      { id: 25, nama: 'Wawan Setiawan', nisn: '0051234591', jenisKelamin: 'L' }
    ]
  };

  const kelasList = ['4A', '4B', '5A', '5B'];

  // Initialize absensi data
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const initialData = {};
    
    kelasList.forEach(kelas => {
      if (!initialData[kelas]) initialData[kelas] = {};
      if (!initialData[kelas][today]) {
        initialData[kelas][today] = {};
        siswaData[kelas].forEach(siswa => {
          initialData[kelas][today][siswa.id] = {
            status: 'hadir',
            keterangan: ''
          };
        });
      }
    });
    
    setAbsensiData(initialData);
  }, []);

  // Get current class students
  const currentSiswa = siswaData[selectedKelas] || [];
  
  // Filter students based on search
  const filteredSiswa = currentSiswa.filter(siswa =>
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    siswa.nisn.includes(searchTerm)
  );

  // Get absensi for selected date and class
  const currentAbsensi = absensiData[selectedKelas]?.[selectedDate] || {};

  // Update absensi status
  const updateAbsensi = (siswaId, status, keterangan = '') => {
    const newData = { ...absensiData };
    if (!newData[selectedKelas]) newData[selectedKelas] = {};
    if (!newData[selectedKelas][selectedDate]) newData[selectedKelas][selectedDate] = {};
    
    newData[selectedKelas][selectedDate][siswaId] = {
      status,
      keterangan
    };
    
    setAbsensiData(newData);
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalSiswa = currentSiswa.length;
    let hadir = 0, sakit = 0, izin = 0, alpha = 0;
    
    currentSiswa.forEach(siswa => {
      const status = currentAbsensi[siswa.id]?.status || 'hadir';
      switch(status) {
        case 'hadir': hadir++; break;
        case 'sakit': sakit++; break;
        case 'izin': izin++; break;
        case 'alpha': alpha++; break;
      }
    });
    
    return { totalSiswa, hadir, sakit, izin, alpha };
  };

  const stats = calculateStats();

  // Status options
  const statusOptions = [
    { value: 'hadir', label: 'Hadir', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle },
    { value: 'sakit', label: 'Sakit', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: AlertCircle },
    { value: 'izin', label: 'Izin', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: AlertCircle },
    { value: 'alpha', label: 'Alpha', color: 'text-red-600', bgColor: 'bg-red-50', icon: XCircle }
  ];

  const getStatusConfig = (status) => {
    return statusOptions.find(opt => opt.value === status) || statusOptions[0];
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Absensi Siswa</h1>
        <p className="text-gray-600">Kelola kehadiran siswa harian</p>
      </div>

      {/* Filter dan Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Pilih Kelas */}
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Kelas:</span>
              <select
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {kelasList.map(kelas => (
                  <option key={kelas} value={kelas}>{kelas}</option>
                ))}
              </select>
            </div>

            {/* Pilih Tanggal */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Tanggal:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Search dan Actions */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                editMode 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {editMode ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            </button>
            <button className="px-3 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Siswa</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalSiswa}</p>
            </div>
            <Users className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hadir</p>
              <p className="text-2xl font-bold text-green-600">{stats.hadir}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sakit</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.sakit}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Izin</p>
              <p className="text-2xl font-bold text-blue-600">{stats.izin}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Alpha</p>
              <p className="text-2xl font-bold text-red-600">{stats.alpha}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Daftar Absensi */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Daftar Absensi Kelas {selectedKelas} - {new Date(selectedDate).toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
        </div>

        <div className="p-4">
          {filteredSiswa.length > 0 ? (
            <div className="space-y-3">
              {filteredSiswa.map((siswa, index) => {
                const absensi = currentAbsensi[siswa.id] || { status: 'hadir', keterangan: '' };
                const statusConfig = getStatusConfig(absensi.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div key={siswa.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{siswa.nama}</h3>
                        <p className="text-sm text-gray-500">NISN: {siswa.nisn}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        siswa.jenisKelamin === 'L' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                      }`}>
                        <span className="text-xs font-semibold">{siswa.jenisKelamin}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {editMode ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={absensi.status}
                            onChange={(e) => updateAbsensi(siswa.id, e.target.value, absensi.keterangan)}
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {statusOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {absensi.status !== 'hadir' && (
                            <input
                              type="text"
                              placeholder="Keterangan..."
                              value={absensi.keterangan}
                              onChange={(e) => updateAbsensi(siswa.id, absensi.status, e.target.value)}
                              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.bgColor}`}>
                            <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                            <span className={`text-sm font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                          {absensi.keterangan && (
                            <span className="text-sm text-gray-500 italic">
                              "{absensi.keterangan}"
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Tidak Ada Siswa</h3>
              <p>Tidak ada siswa yang sesuai dengan pencarian</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Absensi;