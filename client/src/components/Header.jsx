import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rawRoles = JSON.parse(localStorage.getItem("roles") || "[]");
    const normalizedRoles = rawRoles.map((r) => r.toLowerCase());
    console.log("🔥 DEBUG roles from localStorage:", rawRoles);
    console.log("✅ Normalized roles:", normalizedRoles);
  
    const userName = localStorage.getItem("name");
    const userPhoto = localStorage.getItem("photo");
  
    setIsLoggedIn(!!token);
    setRoles(normalizedRoles); // ⬅️ ini bagian penting
    setName(userName || "Pengguna");
    setPhoto(userPhoto || "/images/default-user.png");
  }, []);
  
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };
  const [roles, setRoles] = useState([]);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  
  const menuItems = ['Beranda', 'Tentang', 'Program', 'Galeri', 'Fasilitas', 'Kontak'];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">SDN Karangpatri 01</h1>
              <p className="text-sm text-gray-600">Sekolah Dasar Negeri</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              
            ))}

            {isLoggedIn && (
              
  <div>
    {roles.includes("siswa") && (
      <Link to="/dashboard-siswa" className="relative group hover:text-blue-600 font-medium transition">
        Dashboard Siswa
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
      </Link>
    )}
    {roles.includes("guru") && (
      <Link to="/dashboard-guru" className="relative group hover:text-blue-600 font-medium transition">
        Dashboard Guru
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
      </Link>
    )}
    {roles.includes("admin") && (
      <Link to="/dashboard-admin" className="relative group hover:text-blue-600 font-medium transition">
        Dashboard Admin
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
      </Link>
    )}
  </div>
)}


          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
  {isLoggedIn ? (
    <>
      <div className="flex items-center space-x-2">
        <img
          src={photo}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border border-gray-300"
        />
        <span className="text-sm text-gray-700 font-medium">{name}</span>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
        Login
      </Link>
      <Link to="/register" className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
        Daftar
      </Link>
    </>
  )}
</div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              {isLoggedIn && (
  <>
    {roles.includes("siswa") && (
      <Link
        to="/dashboard-siswa"
        onClick={() => setIsMenuOpen(false)}
        className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        Dashboard Siswa
        
      </Link>
    )}
    {roles.includes("guru") && (
      <Link
        to="/dashboard-guru"
        onClick={() => setIsMenuOpen(false)}
        className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        Dashboard Guru
      </Link>
    )}
    {roles.includes("admin") && (
      <Link
        to="/dashboard-admin"
        onClick={() => setIsMenuOpen(false)}
        className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        Dashboard Admin
      </Link>
    )}
  </>
)}


              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Daftar
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
