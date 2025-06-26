import React, { useEffect, useState } from 'react';
import SidebarGuru from '../components/guru/SidebarGuru';
import HeaderGuru from '../components/guru/HeaderGuru';
import axios from 'axios';

const GuruLayout = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuruData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/guru/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile(res.data.profile || {});
        setStats(res.data.stats || {});
      } catch (err) {
        // Handle error (misal redirect ke login)
      } finally {
        setLoading(false);
      }
    };
    fetchGuruData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarGuru />
      <main className="flex-1 p-6 overflow-auto">
        <HeaderGuru
          user={profile}
          jumlahSiswa={stats.jumlah_siswa}
          jumlahKelas={stats.jumlah_kelas}
          mapel={stats.mapel}
          nip={stats.nip}
        />
        {children}
      </main>
    </div>
  );
};

export default GuruLayout;