import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi frontend
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Semua field wajib diisi!");
      return;
    }
  
    if (form.password !== form.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.confirmPassword
        })
        
      });
  
      const data = await response.json();

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Anda akan diarahkan...',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          didClose: () => navigate('/login')
        });
      } else {
        Swal.fire({
          title: 'Gagal!',
          text: data.message || 'Terjadi kesalahan.',
          icon: 'error'
        });
      }
      

      
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Terjadi kesalahan saat mendaftar");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Daftar Siswa Baru
          </h2>
          <p className="text-gray-600 mt-2">Buat akun baru untuk memulai</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-sm">
              Nama Lengkap
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-transparent focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-sm">
              Email / NIS
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-transparent focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="email@contoh.com atau NIS12345"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-sm">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={form.password}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-transparent focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-sm">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={form.confirmPassword}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-transparent focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="••••••••••••"
              />
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              Saya setuju dengan{" "}
              <a href="#" className="text-purple-600 hover:text-pink-600 font-medium transition-colors ml-1">
                syarat dan ketentuan
              </a>
            </label>
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200"
          >
            <span className="flex items-center justify-center">
              Daftar Sekarang
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-purple-600 hover:text-pink-600 font-semibold transition-colors">
  Masuk di sini
</Link>

          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-300/20 rounded-full blur-lg"></div>
    </div>
  );
};

export default Register;