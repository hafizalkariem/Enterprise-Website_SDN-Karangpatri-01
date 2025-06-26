import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.email || !form.password) {
      alert("Email dan password wajib diisi!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("photo", data.user.photo || "/images/default-user.png");
      
        // Multi-role: simpan sebagai JSON string
        localStorage.setItem("roles", JSON.stringify(data.user.roles));
        console.log("Roles at login:", data.user.roles);

      
        Swal.fire({
          title: 'Login Berhasil!',
          text: 'Selamat datang kembali!',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          didClose: () => {
            navigate("/");
          }
        });
      }
      
      
      
    } catch (err) {
      console.error("Login error:", err);
      alert("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
      <div className="bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Login Siswa
          </h2>
          <p className="text-gray-600 mt-2">Silakan masuk ke akun Anda</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 font-semibold text-sm">
              Email / NIS
            </label>
            <div className="relative">
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={form.email}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-transparent focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="nis12345 atau email@contoh.com"
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700 font-semibold text-sm">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={form.password}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-transparent focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="••••••••••••"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              Ingat saya
            </label>
            <a href="#" className="text-blue-600 hover:text-purple-600 font-medium transition-colors">
              Lupa kata sandi?
            </a>
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <span className="flex items-center justify-center">
              Masuk
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </span>
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors">
  Daftar sekarang
</Link>

          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-lg"></div>
    </div>
  );
};

export default Login;