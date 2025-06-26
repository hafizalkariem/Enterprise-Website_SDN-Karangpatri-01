import React, { useState } from "react";
import SidebarSiswa from "../components/siswa/SidebarSiswa";
import HeaderSiswa from "../components/siswa/HeaderSiswa";
import { Menu } from "lucide-react";

const SiswaLayout = ({ children, title = "Dashboard" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data user dummy
  const user = {
    name: "Ahmad Rizki Pratama",
    email: "ahmad.rizki@gmail.com",
    kelas: "6A",
    alamat: "Jl. Pendidikan No. 123, Karangpatri, Balikpapan",
    phone: "081234567890",
    birthDate: "15 Januari 2012",
    nis: "20240001"
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50 overflow-x-auto relative">
      {/* Hamburger for mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <SidebarSiswa
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <HeaderSiswa user={user} title={title} />
        {children}
      </main>
    </div>
  );
};

export default SiswaLayout;
