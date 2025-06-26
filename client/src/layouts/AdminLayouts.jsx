import SidebarAdmin from "../components/admin/SidebarAdmin";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Memuat Dashboard...</p>
          <p className="text-slate-400 text-sm mt-2">SDN Karangpatri 01</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main content wrapper */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <HeaderAdmin />

        {/* Page Content */}
        <main className="flex-1 mt-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 min-h-[calc(100vh-4rem)] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb would go here */}
              <div className="mb-6">
                <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 inline-flex items-center space-x-2 shadow-sm">
                  <span className="text-slate-500 text-sm">Admin</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-700 text-sm font-medium">Dashboard</span>
                </div>
              </div>

              {/* Page Content */}
              <div className="animate-fadeIn">
                <Outlet />
              </div>
            </div>
          </div>

          {/* Floating Action Button (Optional) */}
          <div className="fixed bottom-6 right-6 z-20">
            <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group">
              <span className="text-2xl group-hover:rotate-45 transition-transform">+</span>
            </button>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}