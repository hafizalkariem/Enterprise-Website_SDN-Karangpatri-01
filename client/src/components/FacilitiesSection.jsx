import React, { useState } from 'react';
import { 
  Monitor, 
  BookOpen, 
  FlaskConical, 
  Gamepad2, 
  Music, 
  Utensils, 
  TreePine,
  Car,
  Wifi,
  Shield,
  Heart,
  Users
} from 'lucide-react';

const FacilitiesSection = ({ facilities }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Animation styles
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
  `;
  
  // Inject styles into head
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = animationStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Default facilities data jika tidak ada props
  const defaultFacilities = [
    {
      id: 1,
      name: "Laboratorium Komputer",
      description: "Ruang komputer dengan 30 unit PC dan akses internet untuk pembelajaran teknologi",
      icon: "Monitor",
      category: "akademik",
      features: ["30 Unit Komputer", "Akses Internet", "Software Pembelajaran", "AC"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      name: "Perpustakaan",
      description: "Perpustakaan dengan koleksi buku lengkap dan area baca yang nyaman",
      icon: "BookOpen",
      category: "akademik",
      features: ["5000+ Koleksi Buku", "Reading Corner", "Digital Library", "Ruang Tenang"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      name: "Laboratorium Sains",
      description: "Lab sains lengkap untuk eksperimen dan praktikum siswa",
      icon: "FlaskConical",
      category: "akademik",
      features: ["Alat Lab Lengkap", "Mikroskop", "Kit Eksperimen", "Safety Equipment"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      name: "Lapangan Olahraga",
      description: "Lapangan serbaguna untuk berbagai aktivitas olahraga dan upacara",
      icon: "Gamepad2",
      category: "olahraga",
      features: ["Lapangan Basket", "Lapangan Voli", "Track Lari", "Tribune"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      name: "Ruang Seni & Musik",
      description: "Studio seni dan musik untuk mengembangkan kreativitas siswa",
      icon: "Music",
      category: "seni",
      features: ["Alat Musik", "Easel Lukis", "Sound System", "Panggung Mini"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      name: "Kantin Sekolah",
      description: "Kantin bersih dengan makanan sehat dan bergizi untuk siswa",
      icon: "Utensils",
      category: "penunjang",
      features: ["Makanan Sehat", "Harga Terjangkau", "Area Makan Nyaman", "Menu Bergizi"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 7,
      name: "Taman Sekolah",
      description: "Area hijau untuk pembelajaran alam dan refreshing siswa",
      icon: "TreePine",
      category: "penunjang",
      features: ["Tanaman Edukatif", "Gazebo", "Jalur Setapak", "Area Bermain"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 8,
      name: "Parkir Kendaraan",
      description: "Area parkir yang aman dan tertata untuk kendaraan siswa dan guru",
      icon: "Car",
      category: "penunjang",
      features: ["Area Luas", "Keamanan 24 Jam", "Atap Teduh", "CCTV"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 9,
      name: "WiFi Sekolah",
      description: "Akses internet gratis di seluruh area sekolah untuk mendukung pembelajaran",
      icon: "Wifi",
      category: "teknologi",
      features: ["High Speed", "Coverage Luas", "Aman & Terkontrol", "24/7 Access"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 10,
      name: "Sistem Keamanan",
      description: "Sistem keamanan terintegrasi untuk menjaga keselamatan siswa",
      icon: "Shield",
      category: "keamanan",
      features: ["CCTV 24 Jam", "Security Guard", "Access Control", "Emergency System"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 11,
      name: "UKS (Unit Kesehatan Sekolah)",
      description: "Fasilitas kesehatan untuk perawatan dasar dan pemeriksaan siswa",
      icon: "Heart",
      category: "kesehatan",
      features: ["Dokter Jaga", "Obat-obatan Lengkap", "Tempat Tidur", "Peralatan Medis"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 12,
      name: "Aula Serbaguna",
      description: "Ruang besar untuk acara sekolah, pertemuan, dan kegiatan besar lainnya",
      icon: "Users",
      category: "penunjang",
      features: ["Kapasitas 500 Orang", "Sound System", "Proyektor", "AC"],
      image: "/api/placeholder/400/250"
    }
  ];

  const facilitiesData = facilities || defaultFacilities;

  // Icon component mapping
  const IconComponent = ({ iconName, className }) => {
    const iconMap = {
      Monitor, BookOpen, FlaskConical, Gamepad2, Music, Utensils, 
      TreePine, Car, Wifi, Shield, Heart, Users
    };
    
    const Icon = iconMap[iconName] || Monitor;
    return <Icon className={className} />;
  };

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'Semua Fasilitas', count: facilitiesData.length },
    { id: 'akademik', name: 'Akademik', count: facilitiesData.filter(f => f.category === 'akademik').length },
    { id: 'olahraga', name: 'Olahraga', count: facilitiesData.filter(f => f.category === 'olahraga').length },
    { id: 'seni', name: 'Seni & Budaya', count: facilitiesData.filter(f => f.category === 'seni').length },
    { id: 'penunjang', name: 'Penunjang', count: facilitiesData.filter(f => f.category === 'penunjang').length },
    { id: 'teknologi', name: 'Teknologi', count: facilitiesData.filter(f => f.category === 'teknologi').length },
    { id: 'keamanan', name: 'Keamanan', count: facilitiesData.filter(f => f.category === 'keamanan').length },
    { id: 'kesehatan', name: 'Kesehatan', count: facilitiesData.filter(f => f.category === 'kesehatan').length }
  ];

  // Filter facilities based on active category
  const filteredFacilities = activeCategory === 'all' 
    ? facilitiesData 
    : facilitiesData.filter(facility => facility.category === activeCategory);

  return (
    <section id="fasilitas" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-blue-600 rounded-full mr-3"></div>
            <h2 className="text-4xl font-bold text-gray-900">Fasilitas Sekolah</h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full ml-3"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fasilitas lengkap dan modern untuk mendukung proses pembelajaran yang optimal 
            dan pengembangan potensi siswa secara maksimal
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {category.name}
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility, index) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2 fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Facility Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconComponent 
                    iconName={facility.icon} 
                    className="w-20 h-20 text-blue-600 group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/80 text-blue-600 text-xs font-medium rounded-full backdrop-blur-sm">
                    {facility.category.charAt(0).toUpperCase() + facility.category.slice(1)}
                  </span>
                </div>
              </div>

              {/* Facility Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {facility.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {facility.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1">
                    Fitur Unggulan:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {facility.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md ">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">12+</h4>
              <p className="text-gray-600">Fasilitas Utama</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">24/7</h4>
              <p className="text-gray-600">Keamanan</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">100%</h4>
              <p className="text-gray-600">Coverage WiFi</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">A+</h4>
              <p className="text-gray-600">Rating Fasilitas</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ingin Melihat Fasilitas Secara Langsung?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Kunjungi sekolah kami dan lihat sendiri fasilitas modern yang mendukung 
              pembelajaran optimal untuk putra-putri Anda
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Jadwalkan Kunjungan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;