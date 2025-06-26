import React from "react";
import { Award, Clock, TrendingUp } from "lucide-react";

const StatsCards = ({ stats }) => {
  const getPeringkatSubtitle = () => {
    if (!stats?.peringkat_kelas) return "dari - siswa";

    // Jika formatnya "5 / 30"
    const total = stats.peringkat_kelas.split('/')[1]?.trim();
    return `dari ${total || '-'} siswa`;
  };

  const statCards = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Nilai Rata-rata",
      value: stats?.nilai_rata ?? '-',
      subtitle: "Semester ini",
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Kehadiran",
      value: stats?.kehadiran_persen ?? '-',
      subtitle: "Bulan ini",
      color: "from-blue-500 to-cyan-600",
      textColor: "text-blue-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Peringkat Kelas",
      value: stats?.peringkat_kelas ?? '-',
      subtitle: getPeringkatSubtitle(),
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              <p className="text-gray-400 text-xs mt-1">{stat.subtitle}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
