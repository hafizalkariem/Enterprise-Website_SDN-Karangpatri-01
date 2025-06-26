import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  User,
  Bell,
  Award,
  Clock,
  PlusCircle,
  GraduationCap,
  CalendarDays,
  Megaphone,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from "react-router-dom";


const SidebarGuru = ({ activeMenu = 'dashboard', onMenuChange }) => {
  const [active, setActive] = useState(activeMenu);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  // Data guru dummy
  const guruData = {
    nama: 'Ibu Sari Dewi',
    nip: '196512151990032001',
    mapel: 'Matematika',
    kelas: 'X-A, X-B, XI-A',
    sekolah: 'SDN Karangpatri 01'
  };

  // Menu items untuk guru
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={18} />,
      href: '/dashboard-guru'
    },
    {
      id: 'siswa',
      label: 'Data Siswa',
      icon: <Users size={18} />,
      href: '/dashboard-guru/siswa',
      badge: '156'
    },
    {
      id: 'nilai',
      label: 'Input Nilai',
      icon: <BookOpen size={18} />,
      href: '/dashboard-guru/nilai',
      badge: 'New'
    },
    {
      id: 'mata-pelajaran',
      label: 'Mata Pelajaran',
      icon: <ClipboardList size={18} />,
      href: '/dashboard-guru/mata-pelajaran'
    },
    {
      id: 'jadwal',
      label: 'Jadwal',
      icon: <CalendarDays size={18} />,
      href: '/dashboard-guru/jadwal'
    },
    {
      id: 'absensi',
      label: 'Absensi',
      icon: <Calendar size={18} />,
      href: '/dashboard-guru/absensi'
    },
    {
      id: 'tugas',
      label: 'Tugas & Quiz',
      icon: <FileText size={18} />,
      href: '/dashboard-guru/tugas',
      badge: '12'
    },
    {
      id: 'laporan',
      label: 'Laporan',
      icon: <BarChart3 size={18} />,
      href: '/dashboard-guru/laporan'
    },
    {
      id: 'komunikasi',
      label: 'Komunikasi',
      icon: <MessageSquare size={18} />,
      href: '/dashboard-guru/komunikasi',
      badge: '5'
    },
    {
      id: 'pengumuman',
      label: 'Pengumuman',
      icon: <Megaphone size={18} />,
      href: '/dashboard-guru/pengumuman'
    },
    {
      id: 'pengaturan',
      label: 'Pengaturan',
      icon: <Settings size={18} />,
      href: '/dashboard-guru/pengaturan'
    }
  ];
  

  const quickActions = [
    {
      id: 'tambah-tugas',
      label: 'Tambah Tugas',
      icon: <PlusCircle size={16} />,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'input-nilai',
      label: 'Input Nilai',
      icon: <Award size={16} />,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'absen-hari-ini',
      label: 'Absen Hari Ini',
      icon: <Clock size={16} />,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const handleMenuClick = (menuId) => {
    setActive(menuId);
    if (onMenuChange) {
      onMenuChange(menuId);
    }
  };

  return (
    <aside className="w-72 min-h-screen bg-white border-r shadow-xl">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Dashboard Guru</h2>
            <p className="text-sm text-indigo-200">{guruData.sekolah}</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b border-gray-100">
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{guruData.nama}</p>
              <p className="text-xs text-gray-500">{guruData.mapel}</p>
            </div>
          </div>
          {isProfileOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        
        {isProfileOpen && (
          <div className="mt-3 p-3 bg-gray-50 rounded-xl">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">NIP:</span>
                <span className="text-gray-900 font-medium">{guruData.nip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kelas:</span>
                <span className="text-gray-900 font-medium">{guruData.kelas}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-100">
        <div 
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => setShowQuickActions(!showQuickActions)}
        >
          <h3 className="text-sm font-semibold text-gray-700">Quick Actions</h3>
          {showQuickActions ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        
        {showQuickActions && (
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors ${action.color}`}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2 flex-1">
      

{menuItems.map((item) => {
  const isActive = location.pathname === item.href;

  return (
    <Link
      key={item.id}
      to={item.href}
      onClick={() => handleMenuClick(item.id)}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left transition-all ${
        isActive
          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
          : 'hover:bg-indigo-50 text-gray-700'
      }`}
    >
      <div className="flex items-center gap-3">
        {item.icon}
        <span className="font-medium">{item.label}</span>
      </div>
      {item.badge && (
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
          isActive 
            ? 'bg-white bg-opacity-20 text-white'
            : item.badge === 'New' 
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
        }`}>
          {item.badge}
        </span>
      )}
    </Link>
  );
})}

      </nav>

      {/* Notifications */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
          <div className="flex items-start space-x-2">
            <Bell size={16} className="text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Pengingat</p>
              <p className="text-xs text-yellow-700 mt-1">
                5 tugas belum dinilai dan 3 absensi hari ini belum diinput.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition w-full">
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarGuru;