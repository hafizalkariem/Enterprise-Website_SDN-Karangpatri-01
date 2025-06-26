import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import AboutSection from '../components/AboutSection';
import ProgramsSection from '../components/ProgramsSection';
import GalerySection from '../components/GallerySection';
import FacilitiesSection from '../components/FacilitiesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import '../styles/HomePage.css';

const HomePage = () => {
  // State untuk loading page
  const [isLoading, setIsLoading] = useState(true);
  
  // // State untuk theme (jika diperlukan di masa depan)
  // const [theme, setTheme] = useState('light');
  
  // State untuk contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Data untuk Hero Section slides
  const heroSlides = [
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

  // Data untuk statistik sekolah
  const schoolStats = [
    { 
      icon: "Users", 
      number: "500+", 
      label: "Siswa Aktif", 
      color: "from-blue-500 to-blue-600" 
    },
    { 
      icon: "Award", 
      number: "25+", 
      label: "Guru Profesional", 
      color: "from-green-500 to-green-600" 
    },
    { 
      icon: "BookOpen", 
      number: "15+", 
      label: "Program Unggulan", 
      color: "from-purple-500 to-purple-600" 
    },
    { 
      icon: "Star", 
      number: "A", 
      label: "Akreditasi", 
      color: "from-orange-500 to-orange-600" 
    }
  ];

  // Data untuk nilai-nilai sekolah
  const schoolValues = [
    {
      icon: "Heart",
      title: "Karakter",
      description: "Membentuk kepribadian yang berakhlak mulia dan berbudi pekerti luhur"
    },
    {
      icon: "Target",
      title: "Prestasi",
      description: "Mengembangkan potensi akademik dan non-akademik setiap siswa"
    },
    {
      icon: "Lightbulb",
      title: "Inovasi",
      description: "Menerapkan metode pembelajaran modern dan kreatif"
    }
  ];

  // Data untuk program unggulan
  const schoolPrograms = [
    {
      title: "Program Literasi",
      description: "Meningkatkan kemampuan membaca, menulis, dan berpikir kritis siswa",
      features: ["Perpustakaan Digital", "Reading Corner", "Lomba Karya Tulis"],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Program STEM",
      description: "Pembelajaran sains, teknologi, engineering, dan matematika yang terintegrasi",
      features: ["Lab Komputer", "Eksperimen Sains", "Robotik Sederhana"],
      color: "from-green-500 to-green-600"
    },
    {
      title: "Program Karakter",
      description: "Pembentukan akhlak mulia dan kepribadian yang kuat",
      features: ["Pendidikan Agama", "Budi Pekerti", "Kegiatan Sosial"],
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Program Ekstrakurikuler",
      description: "Pengembangan bakat dan minat siswa di berbagai bidang",
      features: ["Olahraga", "Seni & Budaya", "Pramuka"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  // Data kontak sekolah
  const contactInfo = {
    address: {
      street: "Jl. Pendidikan No. 123",
      district: "Karangpatri, Kec. Balong",
      city: "Kabupaten Ponorogo, Jawa Timur"
    },
    phone: "(0352) 123-4567",
    email: "info@sdnkarangpatri01.sch.id",
    operatingHours: {
      weekdays: "Senin - Jumat: 07:00 - 15:00",
      saturday: "Sabtu: 07:00 - 12:00",
      sunday: "Minggu: Tutup"
    }
  };

  // Data navigasi
  const navigationItems = ['Beranda', 'Tentang', 'Program','Galeri', 'Fasilitas', 'Kontak'];

  // Effect untuk loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Effect untuk scroll to top saat component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler untuk smooth scroll ke section tertentu
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handler untuk contact form
  const handleContactFormChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handler untuk submit contact form
  const handleContactFormSubmit = () => {
    // Validasi form
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }

    // Simulasi pengiriman form
    console.log('Form submitted:', contactForm);
    alert('Terima kasih! Pesan Anda telah dikirim. Tim kami akan segera menghubungi Anda.');
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  // Handler untuk pendaftaran siswa baru
  const handleEnrollment = () => {
    alert('Anda akan diarahkan ke halaman pendaftaran siswa baru!');
    // Di implementasi nyata, ini akan redirect ke halaman pendaftaran
    // window.location.href = '/pendaftaran';
  };

  // Loading component
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading SDN Karangpatri 01...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Component */}
      <Header 
        navigationItems={navigationItems}
        onNavigate={handleScrollToSection}
      />

      {/* Hero Section Component */}
      <HeroSection 
        slides={heroSlides}
        onEnrollClick={handleEnrollment}
        schoolStats={schoolStats}
      />

      {/* Stats Section Component */}
      <StatsSection 
        stats={schoolStats}
      />

      {/* About Section Component */}
      <AboutSection 
        values={schoolValues}
      />

      {/* Programs Section Component */}
      <ProgramsSection 
        programs={schoolPrograms}
      />

      <GalerySection />
      <FacilitiesSection />


      {/* Contact Section Component */}
      <ContactSection 
        contactInfo={contactInfo}
        contactForm={contactForm}
        onFormChange={handleContactFormChange}
        onFormSubmit={handleContactFormSubmit}
      />

      {/* Footer Component */}
      <Footer 
        navigationItems={navigationItems}
        contactInfo={contactInfo}
        onNavigate={handleScrollToSection}
      />

      
      
    </div>
  );
};

export default HomePage;