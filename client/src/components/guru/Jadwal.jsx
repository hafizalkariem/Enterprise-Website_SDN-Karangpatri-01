import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const Jadwal = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const [filterKelas, setFilterKelas] = useState('semua');

  // Data jadwal mengajar
  const jadwalData = [
    {
      id: 1,
      hari: 'Senin',
      waktu: '07:30 - 09:00',
      mataPelajaran: 'Matematika',
      kelas: '4A',
      ruangan: 'Ruang 4A',
      jumlahSiswa: 28,
      materi: 'Operasi Hitung Campuran'
    },
    {
      id: 2,
      hari: 'Senin',
      waktu: '09:30 - 11:00',
      mataPelajaran: 'Matematika',
      kelas: '4B',
      ruangan: 'Ruang 4B',
      jumlahSiswa: 26,
      materi: 'Pecahan Sederhana'
    },
    {
      id: 3,
      hari: 'Selasa',
      waktu: '07:30 - 09:00',
      mataPelajaran: 'Matematika',
      kelas: '5A',
      ruangan: 'Ruang 5A',
      jumlahSiswa: 30,
      materi: 'Volume Bangun Ruang'
    },
    {
      id: 4,
      hari: 'Selasa',
      waktu: '10:00 - 11:30',
      mataPelajaran: 'Matematika',
      kelas: '4A',
      ruangan: 'Ruang 4A',
      jumlahSiswa: 28,
      materi: 'Bangun Datar'
    },
    {
      id: 5,
      hari: 'Rabu',
      waktu: '08:00 - 09:30',
      mataPelajaran: 'Matematika',
      kelas: '4B',
      ruangan: 'Ruang 4B',
      jumlahSiswa: 26,
      materi: 'Pengukuran Waktu'
    },
    {
      id: 6,
      hari: 'Rabu',
      waktu: '10:00 - 11:30',
      mataPelajaran: 'Matematika',
      kelas: '5B',
      ruangan: 'Ruang 5B',
      jumlahSiswa: 29,
      materi: 'Statistika Dasar'
    },
    {
      id: 7,
      hari: 'Kamis',
      waktu: '07:30 - 09:00',
      mataPelajaran: 'Matematika',
      kelas: '5A',
      ruangan: 'Ruang 5A',
      jumlahSiswa: 30,
      materi: 'Koordinat Kartesius'
    },
    {
      id: 8,
      hari: 'Jumat',
      waktu: '07:30 - 09:00',
      mataPelajaran: 'Matematika',
      kelas: '4A',
      ruangan: 'Ruang 4A',
      jumlahSiswa: 28,
      materi: 'Ulangan Harian'
    }
  ];

  const hariInWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const kelasList = ['semua', '4A', '4B', '5A', '5B'];

  // Filter jadwal berdasarkan hari dan kelas
  const filteredJadwal = jadwalData.filter(jadwal => {
    const dayMatch = selectedDay === '' || jadwal.hari === selectedDay;
    const kelasMatch = filterKelas === 'semua' || jadwal.kelas === filterKelas;
    return dayMatch && kelasMatch;
  });

  // Fungsi untuk mendapatkan jadwal berdasarkan hari
  const getJadwalByHari = (hari) => {
    return jadwalData.filter(jadwal => 
      jadwal.hari === hari && 
      (filterKelas === 'semua' || jadwal.kelas === filterKelas)
    );
  };

  // Komponen Card Jadwal
  const JadwalCard = ({ jadwal }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="font-semibold text-gray-800">{jadwal.mataPelajaran}</span>
        </div>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {jadwal.kelas}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{jadwal.waktu}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{jadwal.ruangan}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span>{jadwal.jumlahSiswa} Siswa</span>
        </div>
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <span>{jadwal.materi}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Jadwal Mengajar</h1>
        <p className="text-gray-600">Kelola dan lihat jadwal mengajar Anda</p>
      </div>

      {/* Filter dan Navigasi */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Filter Kelas */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter Kelas:</span>
            </div>
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {kelasList.map(kelas => (
                <option key={kelas} value={kelas}>
                  {kelas === 'semua' ? 'Semua Kelas' : `Kelas ${kelas}`}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Hari */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Pilih Hari:</span>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Hari</option>
              {hariInWeek.map(hari => (
                <option key={hari} value={hari}>{hari}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Jam Mengajar</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kelas Diampu</p>
              <p className="text-2xl font-bold text-green-600">4</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hari Mengajar</p>
              <p className="text-2xl font-bold text-purple-600">5</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Siswa</p>
              <p className="text-2xl font-bold text-orange-600">113</p>
            </div>
            <BookOpen className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tampilan Jadwal */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedDay ? `Jadwal Hari ${selectedDay}` : 'Jadwal Mingguan'}
          </h2>
        </div>

        {selectedDay === '' ? (
          // Tampilan Mingguan
          <div className="p-4">
            <div className="grid gap-6">
              {hariInWeek.map(hari => {
                const jadwalHari = getJadwalByHari(hari);
                return (
                  <div key={hari}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                      {hari}
                      <span className="ml-2 text-sm text-gray-500">
                        ({jadwalHari.length} mata pelajaran)
                      </span>
                    </h3>
                    {jadwalHari.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {jadwalHari.map(jadwal => (
                          <JadwalCard key={jadwal.id} jadwal={jadwal} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Tidak ada jadwal mengajar</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Tampilan Harian
          <div className="p-4">
            {filteredJadwal.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJadwal.map(jadwal => (
                  <JadwalCard key={jadwal.id} jadwal={jadwal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Tidak Ada Jadwal</h3>
                <p>Tidak ada jadwal mengajar untuk filter yang dipilih</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jadwal;