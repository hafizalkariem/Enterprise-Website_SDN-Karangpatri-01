import React from "react";
import { BookOpen, CalendarDays, Megaphone } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Lihat Nilai",
      description: "Cek nilai terbaru",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: <CalendarDays className="w-6 h-6" />,
      title: "Absensi",
      description: "Riwayat kehadiran",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 hover:bg-green-100"
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Pengumuman",
      description: "Info terbaru sekolah",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`p-4 rounded-xl ${action.bgColor} transition-all duration-200 text-left group`}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${action.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">{action.title}</h4>
            <p className="text-gray-600 text-sm">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;