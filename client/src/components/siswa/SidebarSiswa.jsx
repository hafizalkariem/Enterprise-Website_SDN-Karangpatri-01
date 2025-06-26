import React from "react";
import {
  User, BookOpen, CalendarDays, Megaphone, LogOut, GraduationCap, Settings
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarSiswa = ({ isMobileOpen = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Path saat ini
  const currentPath = location.pathname;

  const activeClass = "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105";

  const menuItems = [
    { id: "profil", label: "Profil", icon: <User size={18} />, path: "/dashboard-siswa" },
    { id: "nilai", label: "Nilai", icon: <BookOpen size={18} />, path: "/dashboard-siswa/nilai" },
    { id: "kehadiran", label: "Kehadiran", icon: <CalendarDays size={18} />, path: "/dashboard-siswa/kehadiran" },
    { id: "pengumuman", label: "Pengumuman", icon: <Megaphone size={18} />, path: "/dashboard-siswa/pengumuman" },
    { id: "settings", label: "Pengaturan", icon: <Settings size={18} />, path: "/dashboard-siswa/settings" },
  ];

  return (
    <aside className={`
      w-72 min-h-screen bg-white border-r shadow-xl 
      fixed lg:static top-0 left-0 z-40 transition-transform duration-300
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0
    `}>
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Dashboard Siswa</h2>
            <p className="text-blue-100 text-sm">SDN Karangpatri 01</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-200
                ${isActive ? activeClass : "hover:bg-blue-50 text-gray-700"}
              `}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Logout */}
        <div className="pt-4 mt-4 border-t">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all duration-200 w-full">
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarSiswa;
