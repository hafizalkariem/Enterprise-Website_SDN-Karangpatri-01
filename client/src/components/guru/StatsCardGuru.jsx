import React from "react";
import { Users, ClipboardList, BookOpen } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Jumlah Kelas",
    value: 3,
    icon: <BookOpen size={28} />,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    title: "Jumlah Siswa",
    value: 92,
    icon: <Users size={28} />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "Nilai Diinput",
    value: 217,
    icon: <ClipboardList size={28} />,
    color: "from-yellow-500 to-orange-500",
  },
];

const StatsCardGuru = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
          >
            {item.icon}
          </div>
          <div>
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCardGuru;
