import React, { useState, useEffect } from "react";
import SidebarSiswa from "../components/siswa/SidebarSiswa";
import HeaderSiswa from "../components/siswa/HeaderSiswa";
import StatsCards from "../components/siswa/StatsCards";
import QuickActions from "../components/siswa/QuickActions";
import ProfilSiswaCard from "../components/siswa/ProfileSiswaCard";
import RecentActivity from "../components/siswa/RecentActivity";
import { Menu } from "lucide-react";
import axios from 'axios';

const DashboardSiswa = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/siswa/dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => {
      console.log("✅ Data dari API:", res.data); 
      setUser(res.data);
    }).catch(err => {
      console.error("❌ Gagal ambil data siswa:", err.response?.data || err.message);
    });
  }, []);

  // Loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <p className="text-gray-600 text-lg font-medium">Memuat dashboard siswa...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50 overflow-x-auto relative">
      
      {/* Tombol hamburger di mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <SidebarSiswa isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <HeaderSiswa
          title="Dashboard Siswa"
          user={{ name: user?.siswa?.nama || "Siswa" }}
        />

        {/* Stats Cards */}
        <StatsCards stats={user.stats} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
          <ProfilSiswaCard user={{ ...user.siswa, email: user.user.email }} />

          </div>
          <div className="lg:col-span-1">
            <RecentActivity aktivitas={user.recent_activity} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSiswa;
