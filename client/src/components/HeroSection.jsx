// Hero Section Component
import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Award, BookOpen, Star, MapPin, Phone, Mail, Menu, X, GraduationCap, Heart, Target, Lightbulb } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Membangun Generasi Cerdas & Berakhlak",
      subtitle: "SDN Karangpatri 01",
      description: "Memberikan pendidikan berkualitas dengan pendekatan modern dan nilai-nilai karakter yang kuat"
    },
    {
      title: "Fasilitas Lengkap & Modern",
      subtitle: "Lingkungan Belajar Terbaik",
      description: "Didukung fasilitas pembelajaran yang memadai untuk mengoptimalkan potensi setiap siswa"
    },
    {
      title: "Guru Profesional & Berpengalaman",
      subtitle: "Tim Pengajar Terbaik",
      description: "Tenaga pendidik yang kompeten dan berdedikasi untuk masa depan anak-anak Indonesia"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id ="beranda"className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium animate-bounce">
                <Star className="w-4 h-4 mr-2" />
                Sekolah Unggulan
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                <span className="block">{slides[currentSlide].title}</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {slides[currentSlide].subtitle}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl">
                {slides[currentSlide].description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Daftar Sekarang
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Tahun Ajaran 2025/2026</h3>
                  <p className="text-gray-600">Pendaftaran Dibuka</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600 font-medium">Siswa Aktif</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">25+</div>
                  <div className="text-gray-600 font-medium">Guru Profesional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection
