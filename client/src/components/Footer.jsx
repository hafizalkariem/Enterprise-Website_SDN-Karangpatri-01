import React from 'react';
import { ChevronRight, Users, Award, BookOpen, Star, MapPin, Phone, Mail, Menu, X, GraduationCap, Heart, Target, Lightbulb } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">SDN Karangpatri 01</h3>
                <p className="text-gray-400 text-sm">Sekolah Dasar Negeri</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Memberikan pendidikan berkualitas dengan pendekatan modern dan nilai-nilai karakter yang kuat.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              {['Beranda', 'Tentang', 'Program','Galeri', 'Fasilitas', 'Kontak'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Jam Operasional</h4>
            <div className="space-y-2 text-gray-400">
              <p>Senin - Jumat: 07:00 - 15:00</p>
              <p>Sabtu: 07:00 - 12:00</p>
              <p>Minggu: Tutup</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 SDN Karangpatri 01. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer