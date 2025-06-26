import React, { useState } from "react";
import {
  Bell,
  User,
  Search,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Award,
  MessageCircle,
  ChevronDown,
  Settings,
  LogOut,
  Plus,
  BarChart3
} from "lucide-react";

const HeaderGuru = ({
  title = "Dashboard Guru",
  user = {},
  jumlahSiswa = 0,
  jumlahKelas = 0,
  mapel = "Matematika",
  nip = "NIP: 196512151990032001"
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Data notifikasi dummy (bisa diganti dengan data dari props/API)
  const notifications = [
    {
      id: 1,
      type: 'tugas',
      message: '15 tugas baru perlu dinilai dari kelas X-A',
      time: '5 menit lalu',
      read: false
    },
    {
      id: 2,
      type: 'absensi',
      message: 'Absensi kelas XI-B belum diinput hari ini',
      time: '1 jam lalu',
      read: false
    },
    {
      id: 3,
      type: 'pesan',
      message: 'Pesan baru dari orang tua siswa Ahmad',
      time: '2 jam lalu',
      read: true
    }
  ];

  // Quick actions menu
  const quickActions = [
    {
      id: 'input-nilai',
      label: 'Input Nilai',
      icon: Award,
      color: 'text-green-600',
      bg: 'bg-green-50 hover:bg-green-100'
    },
    {
      id: 'buat-tugas',
      label: 'Buat Tugas',
      icon: Plus,
      color: 'text-blue-600',
      bg: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      id: 'absensi',
      label: 'Input Absensi',
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      id: 'laporan',
      label: 'Lihat Laporan',
      icon: BarChart3,
      color: 'text-orange-600',
      bg: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  const getCurrentTime = () => {
    return new Date().toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
        </div>

        <div className="relative z-10">
          {/* Top Row - Quick Stats & Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{getCurrentTime()}</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">{jumlahSiswa} Siswa</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">{jumlahKelas} Kelas</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Quick Actions */}
              <div className="relative">
                <button
                  onClick={() => setShowQuickMenu(!showQuickMenu)}
                  className="flex items-center gap-1 px-3 py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Aksi Cepat</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showQuickMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-lg z-20">
                    {quickActions.map(action => (
                      <button
                        key={action.id}
                        className={`flex items-center gap-2 w-full px-4 py-2 ${action.bg} ${action.color} text-left transition`}
                        onClick={() => setShowQuickMenu(false)}
                      >
                        <action.icon className="w-4 h-4" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-lg z-20">
                    <div className="p-4 border-b font-semibold text-gray-700">Notifikasi</div>
                    <ul>
                      {notifications.map(n => (
                        <li key={n.id} className={`px-4 py-3 border-b last:border-b-0 ${n.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                          <div className="flex items-center gap-2">
                            {n.type === 'tugas' && <Award className="w-4 h-4 text-green-500" />}
                            {n.type === 'absensi' && <Calendar className="w-4 h-4 text-purple-500" />}
                            {n.type === 'pesan' && <MessageCircle className="w-4 h-4 text-blue-500" />}
                            <span className="font-medium">{n.message}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.name || user?.nama_lengkap || "Guru"}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-lg z-20">
                    <div className="p-4 border-b">
                      <div className="font-semibold">{user?.name || "Guru"}</div>
                      <div className="text-xs text-gray-500">{mapel}</div>
                      <div className="text-xs text-gray-400">{nip}</div>
                    </div>
                    <button className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 transition">
                      <Settings className="w-4 h-4" />
                      Pengaturan
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 transition">
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Header Content */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-indigo-100 text-lg">
                Selamat mengajar, <span className="font-semibold">{user?.name || "Guru"}</span> 👨‍🏫
              </p>
              <p className="text-indigo-200 text-sm mt-1">
                {mapel} • {nip}
              </p>
            </div>
            {/* Bisa tambahkan gambar profil atau ilustrasi di sini jika ingin */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderGuru;