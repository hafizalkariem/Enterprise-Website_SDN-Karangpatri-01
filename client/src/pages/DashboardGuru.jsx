import React, { useState } from "react";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  Award, 
  TrendingUp,
  ChevronRight,
  Bell,
  MapPin,
  Star,
  Activity
} from "lucide-react";

const DashboardGuru = () => {
  

  const [stats] = useState([
    { 
      title: "Total Kelas", 
      value: "8", 
      icon: BookOpen, 
      color: "bg-blue-500",
      trend: "+2 dari bulan lalu",
      trendUp: true
    },
    { 
      title: "Total Siswa", 
      value: "247", 
      icon: Users, 
      color: "bg-emerald-500",
      trend: "+15 siswa baru",
      trendUp: true
    },
    { 
      title: "Jadwal Hari Ini", 
      value: "5", 
      icon: Calendar, 
      color: "bg-purple-500",
      trend: "2 jam tersisa",
      trendUp: false
    },
    { 
      title: "Tugas Pending", 
      value: "12", 
      icon: Clock, 
      color: "bg-orange-500",
      trend: "Deadline besok",
      trendUp: false
    }
  ]);

  const [kelasData] = useState([
    { 
      nama: "VII-A", 
      siswa: 32, 
      jadwal: "08:00 - 09:30", 
      ruang: "R.301",
      status: "active",
      progress: 85
    },
    { 
      nama: "VII-B", 
      siswa: 31, 
      jadwal: "09:45 - 11:15", 
      ruang: "R.302",
      status: "upcoming",
      progress: 78
    },
    { 
      nama: "VIII-A", 
      siswa: 30, 
      jadwal: "13:00 - 14:30", 
      ruang: "R.301",
      status: "completed",
      progress: 92
    },
    { 
      nama: "VIII-B", 
      siswa: 29, 
      jadwal: "14:45 - 16:15", 
      ruang: "R.303",
      status: "upcoming",
      progress: 67
    }
  ]);

  const [jadwalHariIni] = useState([
    {
      waktu: "08:00",
      kelas: "VII-A",
      materi: "Aljabar Linear",
      ruang: "R.301",
      status: "completed"
    },
    {
      waktu: "09:45",
      kelas: "VII-B", 
      materi: "Geometri Dasar",
      ruang: "R.302",
      status: "active"
    },
    {
      waktu: "13:00",
      kelas: "VIII-A",
      materi: "Statistika",
      ruang: "R.301",
      status: "upcoming"
    },
    {
      waktu: "14:45",
      kelas: "VIII-B",
      materi: "Trigonometri",
      ruang: "R.303",
      status: "upcoming"
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Sedang Berlangsung';
      case 'upcoming': return 'Akan Datang';
      case 'completed': return 'Selesai';
      default: return 'Unknown';
    }
  };

  return (
    
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-3">
                    {stat.trendUp ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <Activity className="w-4 h-4 text-orange-500 mr-1" />
                    )}
                    <span className={`text-xs ${stat.trendUp ? 'text-green-600' : 'text-orange-600'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`${stat.color} p-4 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kelas yang Diampu */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-500" />
                  Kelas yang Diampu
                </h2>
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  Lihat Semua
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="space-y-4">
                {kelasData.map((kelas, index) => (
                  <div key={index} className="group bg-gradient-to-r from-white to-blue-50/50 rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:border-blue-300">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{kelas.nama}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(kelas.status)}`}>
                            {getStatusText(kelas.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-blue-500" />
                            {kelas.siswa} siswa
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-green-500" />
                            {kelas.jadwal}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                            {kelas.ruang}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Progress Materi</span>
                          <span className="text-sm font-medium text-gray-900">{kelas.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${kelas.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Jadwal Hari Ini */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                  Jadwal Hari Ini
                </h2>
              </div>
              
              <div className="space-y-4">
                {jadwalHariIni.map((jadwal, index) => (
                  <div key={index} className="group relative bg-gradient-to-r from-white to-purple-50/50 rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                          jadwal.status === 'active' ? 'bg-green-500' :
                          jadwal.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}>
                          {jadwal.waktu.split(':')[0]}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{jadwal.kelas}</h3>
                          <span className={`w-3 h-3 rounded-full ${
                            jadwal.status === 'active' ? 'bg-green-500 animate-pulse' :
                            jadwal.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-400'
                          }`}></span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{jadwal.materi}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {jadwal.waktu}
                          <MapPin className="w-3 h-3 ml-3 mr-1" />
                          {jadwal.ruang}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg">
                  Lihat Jadwal Lengkap
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Pencapaian Bulan Ini</h3>
              <p className="text-blue-100 mb-4">Terus tingkatkan kualitas pembelajaran!</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-300" />
                  <span className="font-medium">95% Kehadiran</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-300" />
                  <span className="font-medium">4.8 Rating Siswa</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-yellow-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

const Trophy = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C13.1 2 14 2.9 14 4V5.5C14 6.3 13.3 7 12.5 7H11.5C10.7 7 10 6.3 10 5.5V4C10 2.9 10.9 2 12 2ZM21 9V7C21 5.9 20.1 5 19 5H17V7C17 8.7 15.7 10 14 10H10C8.3 10 7 8.7 7 7V5H5C3.9 5 3 5.9 3 7V9C3 11.2 4.8 13 7 13H8.1C8.5 13.6 9.1 14.1 9.8 14.4L9 18H7V20H17V18H15L14.2 14.4C14.9 14.1 15.5 13.6 15.9 13H17C19.2 13 21 11.2 21 9Z"/>
  </svg>
);

export default DashboardGuru;