import React from "react";
import { ArrowRightCircle } from "lucide-react";

const kelasDummy = [
  {
    id: 1,
    nama_kelas: "6A",
    jumlah_siswa: 32,
    tahun_ajaran: "2024/2025",
  },
  {
    id: 2,
    nama_kelas: "6B",
    jumlah_siswa: 30,
    tahun_ajaran: "2024/2025",
  },
  {
    id: 3,
    nama_kelas: "5A",
    jumlah_siswa: 28,
    tahun_ajaran: "2024/2025",
  },
];

const KelasYangDiampu = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Kelas yang Diampu</h2>
      <div className="space-y-4">
        {kelasDummy.map((kelas) => (
          <div
            key={kelas.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-indigo-700">{kelas.nama_kelas}</h3>
              <p className="text-sm text-gray-600">
                {kelas.jumlah_siswa} siswa | Tahun Ajaran {kelas.tahun_ajaran}
              </p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium">
              Detail <ArrowRightCircle size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KelasYangDiampu;
