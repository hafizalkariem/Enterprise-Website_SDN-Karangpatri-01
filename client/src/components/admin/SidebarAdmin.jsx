import { NavLink } from "react-router-dom";
import { 
  FileText, 
  Share2, 
  ImageIcon, 
  Building2, 
  Archive, 
  FileEdit, 
  Package, 
  Wallet,
  GraduationCap,
  Home,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  {
    title: "Dashboard",
    items: [
      { 
        label: "Beranda", 
        path: "/dashboard-admin", 
        icon: Home,
        description: "Overview sistem"
      }
    ],
  },
  {
    title: "Konten & Publikasi",
    items: [
      { 
        label: "Manajemen Konten", 
        path: "/dashboard-admin/konten", 
        icon: FileText,
        description: "Kelola artikel & berita"
      },
      { 
        label: "Media Sosial", 
        path: "/dashboard-admin/media", 
        icon: Share2,
        description: "Integrasi sosial media"
      },
      { 
        label: "Galeri", 
        path: "/dashboard-admin/galeri", 
        icon: ImageIcon,
        description: "Foto & video kegiatan"
      },
      { 
        label: "Fasilitas", 
        path: "/dashboard-admin/fasilitas", 
        icon: Building2,
        description: "Info fasilitas sekolah"
      },
    ],
  },
  {
    title: "Data & Dokumen",
    items: [
      { 
        label: "Arsip Dokumen", 
        path: "/dashboard-admin/arsip", 
        icon: Archive,
        description: "Penyimpanan dokumen"
      },
      { 
        label: "Pembuatan Dokumen", 
        path: "/admin/pembuatan-dokumen", 
        icon: FileEdit,
        description: "Template & generator"
      },
    ],
  },
  {
    title: "Operasional",
    items: [
      { 
        label: "Inventaris", 
        path: "/dashboard-admin/inventaris", 
        icon: Package,
        description: "Barang & aset sekolah"
      },
      { 
        label: "Tabungan & Keuangan", 
        path: "/dashboard-admin/tabungan", 
        icon: Wallet,
        description: "Manajemen keuangan"
      },
    ],
  },
];

export default function SidebarAdmin() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl fixed border-r border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-slate-400">SDN Karangpatri 01</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-6">
        {menuItems.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-slate-400 text-xs uppercase font-semibold tracking-wider px-3 mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <li key={i}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `group flex items-center px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg transform scale-105"
                            : "text-slate-300 hover:bg-slate-700 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Background Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 transform transition-transform duration-300 ${
                            isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                          }`}></div>
                          
                          {/* Content */}
                          <div className="flex items-center space-x-3 relative z-10 flex-1">
                            <div className={`p-1.5 rounded-lg transition-colors ${
                              isActive ? 'bg-white/20' : 'bg-slate-700 group-hover:bg-slate-600'
                            }`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                              }`}>
                                {item.label}
                              </p>
                              <p className={`text-xs truncate transition-colors ${
                                isActive ? 'text-blue-100' : 'text-slate-500 group-hover:text-slate-400'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${
                              isActive ? 'text-white rotate-90' : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1'
                            }`} />
                          </div>
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-3 text-center">
          <p className="text-xs text-slate-400">© 2025 SDN Karangpatri 01</p>
          <p className="text-xs text-slate-500 mt-1">Admin Dashboard v1.0</p>
        </div>
      </div>
    </aside>
  );
}