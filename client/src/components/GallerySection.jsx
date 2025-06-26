import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Eye, Calendar, Tag } from 'lucide-react';

const GalerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Data galeri foto
  const galleryData = [
    {
      id: 1,
      title: "Upacara Bendera Hari Senin",
      category: "kegiatan-rutin",
      date: "2025-05-15",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      description: "Kegiatan upacara bendera yang dilaksanakan setiap hari Senin untuk menanamkan nilai kedisiplinan dan nasionalisme."
    },
    {
      id: 2,
      title: "Lomba Sains Tingkat Kabupaten",
      category: "prestasi",
      date: "2025-04-20",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
      description: "Siswa kelas VI berhasil meraih juara 2 dalam lomba sains tingkat kabupaten."
    },
    {
      id: 3,
      title: "Kegiatan Belajar di Kelas",
      category: "pembelajaran",
      date: "2025-05-10",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
      description: "Suasana pembelajaran aktif di kelas dengan metode diskusi kelompok."
    },
    {
      id: 4,
      title: "Festival Seni dan Budaya",
      category: "ekstrakurikuler",
      date: "2025-03-25",
      image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=600&fit=crop",
      description: "Penampilan tari tradisional siswa dalam acara festival seni dan budaya sekolah."
    },
    {
      id: 5,
      title: "Praktikum IPA di Laboratorium",
      category: "pembelajaran",
      date: "2025-05-08",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
      description: "Siswa melakukan eksperimen sains sederhana di laboratorium sekolah."
    },
    {
      id: 6,
      title: "Piala Juara Olimpiade Matematika",
      category: "prestasi",
      date: "2025-04-15",
      image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&h=600&fit=crop",
      description: "Piala juara 1 olimpiade matematika tingkat kecamatan yang diraih siswa kelas V."
    },
    {
      id: 7,
      title: "Kegiatan Pramuka",
      category: "ekstrakurikuler",
      date: "2025-05-05",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop",
      description: "Kegiatan pramuka rutin setiap hari Sabtu untuk mengembangkan karakter dan kemandirian siswa."
    },
    {
      id: 8,
      title: "Perpustakaan Digital",
      category: "fasilitas",
      date: "2025-05-01",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      description: "Fasilitas perpustakaan digital yang mendukung program literasi sekolah."
    },
    {
      id: 9,
      title: "Olahraga Senam Pagi",
      category: "kegiatan-rutin",
      date: "2025-05-12",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      description: "Kegiatan senam pagi bersama untuk menjaga kesehatan dan kebugaran siswa."
    },
    {
      id: 10,
      title: "Ruang Kelas Modern",
      category: "fasilitas",
      date: "2025-04-30",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
      description: "Ruang kelas yang dilengkapi dengan fasilitas modern untuk menunjang proses pembelajaran."
    },
    {
      id: 11,
      title: "Kompetisi Robotika Sederhana",
      category: "prestasi",
      date: "2025-04-10",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      description: "Tim robotika sekolah berhasil meraih juara 3 dalam kompetisi robotika tingkat provinsi."
    },
    {
      id: 12,
      title: "Kegiatan Membaca Bersama",
      category: "pembelajaran",
      date: "2025-05-07",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      description: "Program literasi dengan kegiatan membaca bersama di reading corner sekolah."
    }
  ];

  // Kategori filter
  const categories = [
    { id: 'semua', label: 'Semua Foto', icon: Camera },
    { id: 'pembelajaran', label: 'Pembelajaran', icon: Eye },
    { id: 'prestasi', label: 'Prestasi', icon: Tag },
    { id: 'ekstrakurikuler', label: 'Ekstrakurikuler', icon: Calendar },
    { id: 'kegiatan-rutin', label: 'Kegiatan Rutin', icon: Calendar },
    { id: 'fasilitas', label: 'Fasilitas', icon: Eye }
  ];

  // Filter gambar berdasarkan kategori
  const filteredImages = selectedCategory === 'semua' 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Format tanggal
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Handler untuk membuka modal gambar
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  // Handler untuk menutup modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Handler navigasi gambar di modal
  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Galeri...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="galeri" className="min-h-screen bg-gray-50 scroll-mt-10">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Galeri SDN Karangpatri 01
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan prestasi sekolah yang membanggakan
          </p>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                <IconComponent size={18} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openImageModal(image)}
                    className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 p-3 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300"
                  >
                    <Eye className="text-blue-600" size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {image.description}
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  {formatDate(image.date)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Camera className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-gray-500 text-lg">
              Tidak ada foto untuk kategori ini
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors"
            >
              <ChevronRight className="text-white" size={24} />
            </button>

            {/* Image */}
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />

            {/* Image Info */}
            <div className="bg-white bg-opacity-90 p-6 rounded-b-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {selectedImage.description}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                {formatDate(selectedImage.date)}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default GalerySection;