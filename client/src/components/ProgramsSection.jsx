import React from 'react';
import { ChevronRight, Users, Award, BookOpen, Star, MapPin, Phone, Mail, Menu, X, GraduationCap, Heart, Target, Lightbulb } from 'lucide-react';


const ProgramsSection = () => {
    const programs = [
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
  
    return (
      <section id="program" className="py-20 bg-white scroll-mt-10 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Program <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Unggulan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Berbagai program inovatif yang dirancang untuk mengoptimalkan potensi dan mengembangkan karakter siswa
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-xl flex items-center justify-center mb-4`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <ul className="space-y-2">
                    {program.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default ProgramsSection