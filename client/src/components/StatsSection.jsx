import React from 'react';
import { ChevronRight, Users, Award, BookOpen, Star, MapPin, Phone, Mail, Menu, X, GraduationCap, Heart, Target, Lightbulb } from 'lucide-react';


const StatsSection = () => {
    const stats = [
      { icon: Users, number: "500+", label: "Siswa Aktif", color: "from-blue-500 to-blue-600" },
      { icon: Award, number: "25+", label: "Guru Profesional", color: "from-green-500 to-green-600" },
      { icon: BookOpen, number: "15+", label: "Program Unggulan", color: "from-purple-500 to-purple-600" },
      { icon: Star, number: "A", label: "Akreditasi", color: "from-orange-500 to-orange-600" }
    ];
  
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default StatsSection