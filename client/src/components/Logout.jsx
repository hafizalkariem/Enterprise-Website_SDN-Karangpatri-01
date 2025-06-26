// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Hapus token
    localStorage.removeItem("token");

    // 2. Tampilkan alert dan redirect
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
      <p>Sedang logout... 👋</p>
    </div>
  );
};

export default Logout;
