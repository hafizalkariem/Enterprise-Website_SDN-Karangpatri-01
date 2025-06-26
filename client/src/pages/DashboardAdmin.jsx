import { 
    Package, 
    FileText, 
    ImageIcon, 
    TrendingUp, 
    Users, 
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    Activity,
    Award,
    BookOpen,
    School
  } from 'lucide-react';
  
  export default function DashboardAdmin() {
    const currentTime = new Date().toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const currentDate = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    const stats = [
      {
        title: "Total Inventaris",
        value: "120",
        change: "+5.2%",
        icon: Package,
        color: "from-blue-600 to-blue-700",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700"
      },
      {
        title: "Dokumen Aktif",
        value: "85",
        change: "+12.3%",
        icon: FileText,
        color: "from-emerald-600 to-emerald-700",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700"
      },
      {
        title: "Galeri Foto",
        value: "156",
        change: "+8.1%",
        icon: ImageIcon,
        color: "from-purple-600 to-purple-700",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700"
      },
      {
        title: "Siswa Aktif",
        value: "245",
        change: "+2.4%",
        icon: Users,
        color: "from-orange-600 to-orange-700",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700"
      }
    ];
  
    const activities = [
      {
        title: "Dokumen baru ditambahkan",
        time: "2 menit yang lalu",
        icon: FileText,
        color: "text-blue-600"
      },
      {
        title: "Galeri foto diperbarui",
        time: "15 menit yang lalu",
        icon: ImageIcon,
        color: "text-purple-600"
      },
      {
        title: "Inventaris barang baru",
        time: "1 jam yang lalu",
        icon: Package,
        color: "text-emerald-600"
      },
      {
        title: "Konten website dipublish",
        time: "3 jam yang lalu",
        icon: CheckCircle,
        color: "text-green-600"
      }
    ];
  
    const quickActions = [
      {
        title: "Tambah Konten",
        description: "Buat artikel atau berita baru",
        icon: FileText,
        color: "from-blue-500 to-blue-600",
        path: "/admin/konten"
      },
      {
        title: "Upload Galeri",
        description: "Tambah foto kegiatan sekolah",
        icon: ImageIcon,
        color: "from-purple-500 to-purple-600",
        path: "/admin/galeri"
      },
      {
        title: "Kelola Inventaris",
        description: "Update data barang sekolah",
        icon: Package,
        color: "from-emerald-500 to-emerald-600",
        path: "/admin/inventaris"
      },
      {
        title: "Arsip Dokumen",
        description: "Organisir dokumen penting",
        icon: BookOpen,
        color: "from-orange-500 to-orange-600",
        path: "/admin/arsip-dokumen"
      }
    ];
  
    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Selamat Datang, Admin! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Kelola sistem SDN Karangpatri 01 dengan mudah dan efisien
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-blue-100 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-semibold">{currentTime}</span>
                </div>
                <p className="text-blue-200 text-sm">{currentDate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Activity className="w-8 h-8 text-blue-200" />
                  <div>
                    <p className="text-blue-100 text-sm">Status Sistem</p>
                    <p className="text-white font-semibold">Aktif & Stabil</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <School className="w-8 h-8 text-emerald-200" />
                  <div>
                    <p className="text-blue-100 text-sm">Tahun Ajaran</p>
                    <p className="text-white font-semibold">2024/2025</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-200" />
                  <div>
                    <p className="text-blue-100 text-sm">Versi Sistem</p>
                    <p className="text-white font-semibold">v1.0.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
  
        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full mr-3"></div>
              Aksi Cepat
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-all group hover:shadow-md text-left"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-1">{action.title}</h4>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
  
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
              Aktivitas Terbaru
            </h3>
            <div className="space-y-4">
              {activities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className={`p-2 rounded-lg bg-slate-100 ${activity.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Lihat Semua Aktivitas →
            </button>
          </div>
        </div>
  
        {/* System Information */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full mr-3"></div>
            Informasi Sistem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4">
              <h4 className="font-semibold text-slate-700 mb-3">Teknologi</h4>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Frontend:</span>
                  <span className="font-medium">React 18</span>
                </div>
                <div className="flex justify-between">
                  <span>Backend:</span>
                  <span className="font-medium">Laravel 12</span>
                </div>
                <div className="flex justify-between">
                  <span>Database:</span>
                  <span className="font-medium">MySQL</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <h4 className="font-semibold text-slate-700 mb-3">Performance</h4>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="font-medium text-green-600">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span>Load Time:</span>
                  <span className="font-medium">1.2s</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-green-600">Optimal</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4">
              <h4 className="font-semibold text-slate-700 mb-3">Update Terakhir</h4>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Versi:</span>
                  <span className="font-medium">v1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal:</span>
                  <span className="font-medium">Juni 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Fitur Baru:</span>
                  <span className="font-medium text-blue-600">12</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700">Sistem Berjalan Normal</h4>
                <p className="text-sm text-slate-600">Semua layanan aktif dan berfungsi dengan baik. Tidak ada masalah yang terdeteksi.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Note */}
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">
            Dashboard ini dirancang khusus untuk SDN Karangpatri 01
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Dikembangkan dengan ❤️ untuk kemajuan pendidikan
          </p>
        </div>
      </div>
    );
  }