import React from "react";
import { BookOpen, CalendarDays, Megaphone } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Nilai Matematika",
      description: "Mendapat nilai 90 pada ujian tengah semester",
      time: "2 hari yang lalu",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: <CalendarDays className="w-5 h-5" />,
      title: "Kehadiran",
      description: "Hadir tepat waktu hari ini",
      time: "Hari ini",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: <Megaphone className="w-5 h-5" />,
      title: "Pengumuman Baru",
      description: "Libur sekolah minggu depan",
      time: "1 hari yang lalu",
      color: "text-purple-600 bg-purple-100"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Aktivitas Terbaru</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <div className={`p-2 rounded-lg ${activity.color}`}>
              {activity.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{activity.title}</h4>
              <p className="text-gray-600 text-sm">{activity.description}</p>
              <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;