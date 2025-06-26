import React from 'react';
import { ChevronRight, Users, Award, BookOpen, Star, MapPin, Phone, Mail, Menu, X, GraduationCap, Heart, Target, Lightbulb } from 'lucide-react';
export default function FiturUtama() {
    const fitur = [
      { judul: "Lihat Nilai", ikon: "📝" },
      { judul: "Profil Guru", ikon: "👨‍🏫" },
      { judul: "Blog Sekolah", ikon: "📸" },
      { judul: "Pengumuman", ikon: "📢" },
    ];
  
    return (
      <section className="py-16 bg-blue-50 text-center px-4 scroll-mt-10">
        <h3 className="text-2xl font-semibold text-blue-700 mb-10">Fitur Utama</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {fitur.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <div className="text-4xl mb-2">{item.ikon}</div>
              <p className="font-medium text-gray-800">{item.judul}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  