import React, { useState,useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download
} from "lucide-react";

const Kehadiran = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [kehadiranData, setKehadiranData] = useState([]);
  const token = localStorage.getItem('token'); // atau ambil dari context
  console.log("Selected Month:", selectedMonth);
  console.log("Selected Year:", selectedYear);
  
  useEffect(() => {
    const fetchKehadiran = async () => {
      try {
        console.log("Fetching kehadiran...");
        const res = await fetch(`http://localhost:8000/api/siswa/kehadiran?bulan=${selectedMonth}&tahun=${selectedYear}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Gagal fetch");
        const data = await res.json();
        console.log("DATA:", data);
        setKehadiranData(data);
      } catch (error) {
        console.error("Error fetch kehadiran:", error);
      }
    };

    fetchKehadiran();
  }, [selectedMonth, selectedYear]);

  // Statistik kehadiran
  const totalHari = kehadiranData.length;
  const hadir = kehadiranData.filter(item => item.status === "hadir").length;
  const sakit = kehadiranData.filter(item => item.status === "sakit").length;
  const izin = kehadiranData.filter(item => item.status === "izin").length;
  const alpa = kehadiranData.filter(item => item.status === "alpa").length;
  const persentaseKehadiran = Math.round((hadir / totalHari) * 100);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      hadir: { 
        bg: "bg-green-100", 
        text: "text-green-800", 
        icon: <CheckCircle size={14} />,
        label: "Hadir"
      },
      sakit: { 
        bg: "bg-yellow-100", 
        text: "text-yellow-800", 
        icon: <AlertCircle size={14} />,
        label: "Sakit"
      },
      izin: { 
        bg: "bg-blue-100", 
        text: "text-blue-800", 
        icon: <Clock size={14} />,
        label: "Izin"
      },
      alpa: { 
        bg: "bg-red-100", 
        text: "text-red-800", 
        icon: <XCircle size={14} />,
        label: "Alpa"
      }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 2023; y <= currentYear + 1; y++) {
    years.push(y);
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="text-blue-600" size={28} />
            Data Kehadiran
          </h1>
          <p className="text-gray-600 mt-1">Pantau kehadiran dan statistik bulanan</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          
          <select 
  value={selectedYear}
  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
>
  {years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hari</p>
              <p className="text-2xl font-bold text-gray-900">{totalHari}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hadir</p>
              <p className="text-2xl font-bold text-green-600">{hadir}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sakit</p>
              <p className="text-2xl font-bold text-yellow-600">{sakit}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Izin</p>
              <p className="text-2xl font-bold text-blue-600">{izin}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alpa</p>
              <p className="text-2xl font-bold text-red-600">{alpa}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle size={20} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Persentase Kehadiran */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Persentase Kehadiran</h3>
            <p className="text-blue-700">Bulan {months[selectedMonth]} {selectedYear}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{persentaseKehadiran}%</div>
            <div className="w-32 bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${persentaseKehadiran}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Kehadiran */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Riwayat Kehadiran</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jam Masuk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jam Keluar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kehadiranData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatTanggal(item.tanggal)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.jam_masuk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.jam_keluar}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.keterangan || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Kehadiran;