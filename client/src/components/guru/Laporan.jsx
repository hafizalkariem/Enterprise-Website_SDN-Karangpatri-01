import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Download, 
  Eye,
  Filter,
  Search,
  ChevronDown,
  BarChart3,
  PieChart,
  FileBarChart
} from 'lucide-react';

const Laporan = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester1');
  const [selectedClass, setSelectedClass] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Data dummy untuk contoh
  const laporanData = {
    overview: [
      {
        title: 'Laporan Kehadiran Siswa',
        description: 'Laporan kehadiran siswa per kelas dan periode',
        icon: Users,
        color: 'bg-blue-500',
        count: '95%',
        trend: '+2%'
      },
      {
        title: 'Laporan Nilai Akademik',
        description: 'Ringkasan nilai siswa semua mata pelajaran',
        icon: BookOpen,
        color: 'bg-green-500',
        count: '87.5',
        trend: '+1.2'
      },
      {
        title: 'Laporan Prestasi',
        description: 'Pencapaian dan prestasi siswa',
        icon: TrendingUp,
        color: 'bg-purple-500',
        count: '24',
        trend: '+5'
      },
      {
        title: 'Laporan Aktivitas',
        description: 'Aktivitas pembelajaran dan ekstrakurikuler',
        icon: Calendar,
        color: 'bg-orange-500',
        count: '156',
        trend: '+12'
      }
    ],
    detailed: [
      {
        id: 1,
        nama: 'Laporan Bulanan Kelas X-A',
        jenis: 'Kehadiran',
        tanggal: '2024-01-15',
        status: 'Selesai',
        ukuran: '2.3 MB'
      },
      {
        id: 2,
        nama: 'Analisis Nilai Semester 1',
        jenis: 'Akademik',
        tanggal: '2024-01-10',
        status: 'Selesai',
        ukuran: '4.1 MB'
      },
      {
        id: 3,
        nama: 'Laporan Ekstrakurikuler',
        jenis: 'Aktivitas',
        tanggal: '2024-01-08',
        status: 'Proses',
        ukuran: '1.8 MB'
      },
      {
        id: 4,
        nama: 'Rekapitulasi Prestasi Siswa',
        jenis: 'Prestasi',
        tanggal: '2024-01-05',
        status: 'Selesai',
        ukuran: '3.2 MB'
      }
    ]
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'Selesai': 'bg-green-100 text-green-800',
      'Proses': 'bg-yellow-100 text-yellow-800',
      'Menunggu': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Laporan</h1>
        <p className="text-gray-600">Kelola dan unduh berbagai laporan akademik</p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          
          <div className="relative">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="semester1">Semester 1</option>
              <option value="semester2">Semester 2</option>
              <option value="tahun">Tahun Ajaran</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Kelas</option>
              <option value="x-a">Kelas X-A</option>
              <option value="x-b">Kelas X-B</option>
              <option value="xi-a">Kelas XI-A</option>
              <option value="xi-b">Kelas XI-B</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari laporan..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Ringkasan
              </div>
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'detailed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Laporan Detail
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {laporanData.overview.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">{item.trend}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="text-2xl font-bold text-gray-900">{item.count}</div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Buat Laporan Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Users className="w-6 h-6 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Laporan Kehadiran</div>
                  <div className="text-sm text-gray-500">Buat laporan kehadiran siswa</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <BookOpen className="w-6 h-6 text-green-500" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Laporan Nilai</div>
                  <div className="text-sm text-gray-500">Buat laporan nilai akademik</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <PieChart className="w-6 h-6 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Laporan Analisis</div>
                  <div className="text-sm text-gray-500">Buat laporan analisis data</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'detailed' && (
        <div className="bg-white rounded-lg shadow-sm">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Daftar Laporan</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <FileBarChart className="w-4 h-4" />
                Buat Laporan
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Nama Laporan</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Jenis</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Tanggal</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Ukuran</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {laporanData.detailed.map((laporan) => (
                  <tr key={laporan.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{laporan.nama}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{laporan.jenis}</td>
                    <td className="py-4 px-6 text-gray-600">{laporan.tanggal}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={laporan.status} />
                    </td>
                    <td className="py-4 px-6 text-gray-600">{laporan.ukuran}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Menampilkan 1-4 dari 4 laporan
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                  Sebelumnya
                </button>
                <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Laporan;