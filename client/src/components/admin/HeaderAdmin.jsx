import { Bell, Search, User, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function HeaderAdmin() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg flex items-center justify-between px-6 fixed left-64 top-0 z-20 border-b border-slate-700">
      {/* Title Section */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Dashboard Admin
        </h1>
        <div className="hidden md:block w-px h-6 bg-slate-600"></div>
        <span className="hidden md:inline-block text-sm text-slate-300 font-medium">
          SDN Karangpatri 01
        </span>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari menu, data, atau dokumen..."
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              3
            </span>
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg transition-colors"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-slate-300">Administrator</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-30">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-800">Selamat datang!</p>
                <p className="text-xs text-slate-500">admin@sdnkarangpatri01.sch.id</p>
              </div>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Pengaturan</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}