import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // <- ini penting
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from './components/Logout'; // pastikan path-nya sesuai
import DashboardSiswa from './pages/DashboardSiswa';
import SiswaLayout from "./layouts/SiswaLayout";
import NilaiSiswa from './components/siswa/NilaiSiswa';
import Kehadiran from "./components/siswa/Kehadiran";
import Pengumuman from "./components/siswa/Pengumuman";
import GuruLayout from "./layouts/GuruLayout";
import DashboardGuru from "./pages/DashboardGuru";
import DataSiswa from "./components/guru/DataSiswa";
import InputNilai from "./components/guru/InputNilai";
import MataPelajaran from "./components/guru/MataPelajaran";
import Jadwal from "./components/guru/Jadwal";
import Absensi from "./components/guru/Absensi";
import Tugas from "./components/guru/Tugas";
import Laporan from "./components/guru/Laporan";
import ManajemenPengumuman from "./components/guru/ManajemenPengumuman";
import Pengaturan from "./components/guru/PengaturanGuru";
import AdminLayout from "./layouts/AdminLayouts";
import DashboardAdmin from "./pages/DashboardAdmin";
import ManajemenContent from "./components/admin/konten/ManajemenContent";
import MediaSosial from "./components/admin/konten/MediaSosial";
import Galeri from "./components/admin/konten/Galeri";
import Fasilitas from "./components/admin/konten/Fasilitas";
import DocumentManagement from "./components/admin/dokumen/DocumentManagement";
import InventoryManagement from "./components/admin/operasional/InventoryManagement";
import Tabungan from "./components/admin/operasional/Tabungan";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard-siswa" element={<DashboardSiswa />} />
      <Route path="/dashboard-siswa/nilai" element={<SiswaLayout title="Nilai Siswa"><NilaiSiswa /></SiswaLayout>} />
      <Route path="/dashboard-siswa/kehadiran" element={<SiswaLayout title="Kehadiran"><Kehadiran /></SiswaLayout>} />
      <Route path="/dashboard-siswa/Pengumuman" element={<SiswaLayout title="Pengumuman"><Pengumuman /></SiswaLayout>} />
      <Route path="/dashboard-guru" element={<GuruLayout><DashboardGuru /></GuruLayout>} />
      <Route path="/dashboard-guru/siswa" element={<GuruLayout><DataSiswa /></GuruLayout>} />
      <Route path="/dashboard-guru/nilai" element={<GuruLayout><InputNilai /></GuruLayout>} />
      <Route path="/dashboard-guru/mata-pelajaran" element={<GuruLayout><MataPelajaran /></GuruLayout>} />
      <Route path="/dashboard-guru/jadwal" element={<GuruLayout><Jadwal /></GuruLayout>} />
      <Route path="/dashboard-guru/absensi" element={<GuruLayout><Absensi /></GuruLayout>} />
      <Route path="/dashboard-guru/tugas" element={<GuruLayout><Tugas /></GuruLayout>} />
      <Route path="/dashboard-guru/laporan" element={<GuruLayout><Laporan /></GuruLayout>} />
      <Route path="/dashboard-guru/pengumuman" element={<GuruLayout><ManajemenPengumuman /></GuruLayout>} />
      <Route path="/dashboard-guru/pengaturan" element={<GuruLayout><Pengaturan /></GuruLayout>} />
      <Route path="/dashboard-admin" element={<AdminLayout />}>
        <Route index element={<DashboardAdmin />} />
        <Route path="konten" element={<ManajemenContent />} />
        <Route path="media" element={<MediaSosial />} />
        <Route path="galeri" element={<Galeri />} />
        <Route path="fasilitas" element={<Fasilitas />} />
        <Route path="arsip" element={<DocumentManagement />} />
        <Route path="inventaris" element={<InventoryManagement />} />
        <Route path="tabungan" element={<Tabungan />} />
      </Route>

    </Routes>
  );
};

export default App;
