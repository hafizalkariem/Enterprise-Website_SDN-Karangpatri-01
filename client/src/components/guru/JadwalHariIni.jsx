import React from "react";
import { Clock, Calendar } from "lucide-react";

const jadwalDummy = [
  {
    jam: "07.30 - 08.15",
    kelas: "6A",
    mapel: "Matematika",
  },
  {
    jam: "08.30 - 09.15",
    kelas: "6B",
    mapel: "Matematika",
  },
  {
    jam: "10.00 - 10.45",
    kelas: "5A",
    mapel: "Matematika",
  },
];

const JadwalHariIni = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4 text-indigo-600">
        <Calendar size={20} />
        <h2 className="text-lg font-bold">Jadwal Hari Ini</h2>
      </div>

      <ul className="space-y-4">
        {jadwalDummy.map((item, index) => (
          <li
            key={index}
            className="p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
          >
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Clock size={16} />
              {item.jam}
            </p>
            <p className="text-base font-semibold text-gray-800">
              {item.mapel} - {item.kelas}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JadwalHariIni;
