import React from 'react';
import { ChevronRight, Users, Award, BookOpen, Star, MapPin, Phone, Mail, Menu, X, GraduationCap, Heart, Target, Lightbulb } from 'lucide-react';

const ContactSection = () => {
    return (
      <section id="kontak" className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white scroll-mt-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Dapatkan informasi lebih lanjut tentang pendaftaran dan program kami
            </p>
          </div>
  
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Alamat</h3>
                    <p className="text-blue-100">
                      Jl. Pendidikan No. 123<br />
                      Karangpatri, Kec. Balong<br />
                      Kabupaten Ponorogo, Jawa Timur
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Telepon</h3>
                    <p className="text-blue-100">(0352) 123-4567</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-blue-100">info@sdnkarangpatri01.sch.id</p>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subjek"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <textarea
                  rows="4"
                  placeholder="Pesan Anda"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                ></textarea>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => alert('Pesan akan dikirim!')}
                >
                  Kirim Pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default ContactSection;