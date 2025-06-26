import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:8000/api/siswa/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser({ ...res.data.user, ...res.data.siswa }))
      .catch((err) => console.error("❌ Gagal ambil data user:", err));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
