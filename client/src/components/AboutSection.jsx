import React from 'react';
import { ChevronRight, Users, Award, BookOpen, Star, MapPin, Phone, Mail, Menu, X, GraduationCap, Heart, Target, Lightbulb } from 'lucide-react';


const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Karakter",
      description: "Membentuk kepribadian yang berakhlak mulia dan berbudi pekerti luhur"
    },
    {
      icon: Target,
      title: "Prestasi",
      description: "Mengembangkan potensi akademik dan non-akademik setiap siswa"
    },
    {
      icon: Lightbulb,
      title: "Inovasi",
      description: "Menerapkan metode pembelajaran modern dan kreatif"
    }
  ];

  return (
    <section id="tentang" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen scroll-mt-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Tentang <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SDN Karangpatri 01</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sekolah Dasar Negeri yang berkomitmen memberikan pendidikan berkualitas dengan pendekatan holistik, 
            mengintegrasikan nilai-nilai akademik dan karakter untuk membentuk generasi unggul.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Visi & Misi Kami</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Visi</h4>
                  <p className="text-gray-600">
                    Menjadi sekolah dasar unggul yang menghasilkan lulusan berkarakter, cerdas, dan berprestasi.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h4 className="text-lg font-semibold text-purple-600 mb-2">Misi</h4>
                  <p className="text-gray-600">
                    Menyelenggarakan pendidikan yang berkualitas, inovatif, dan berkarakter untuk membentuk 
                    generasi yang cerdas, kreatif, dan berakhlak mulia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Nilai-Nilai Kami</h3>
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
