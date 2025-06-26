import React, { useState } from "react";
import {
  Mail,
  MapPin,
  GraduationCap,
  Edit3,
  Camera,
  Phone,
  Calendar,
  User
} from "lucide-react";

const ProfilSiswaCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  if (!user) return null;

  const initials = user.nama
    ? user.nama.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header Profile */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white relative">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl font-bold">
                {initials}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-lg hover:shadow-xl transition-shadow">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.nama || "Nama Tidak Diketahui"}</h2>
              <p className="text-sm text-blue-100">NIS: {user.nis || "-"}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
          >
            <Edit3 size={16} />
            <span className="text-sm font-medium">Edit</span>
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Pribadi</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail size={18} className="text-gray-400" />
              <span className="text-gray-800 font-medium">{user.email || "-"}</span>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-500">No. Telepon</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Phone size={18} className="text-gray-400" />
              <span className="text-gray-800 font-medium">{user.phone || "-"}</span>
            </div>
          </div>

          {/* Kelas */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-500">Kelas</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <GraduationCap size={18} className="text-gray-400" />
              <span className="text-gray-800 font-medium">{user.kelas || "-"}</span>
            </div>
          </div>

          {/* Tanggal Lahir */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-500">Tanggal Lahir</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Calendar size={18} className="text-gray-400" />
              <span className="text-gray-800 font-medium">{user.birthDate || "-"}</span>
            </div>
          </div>

          {/* Alamat */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-500">Alamat</label>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <MapPin size={18} className="text-gray-400 mt-0.5" />
              <span className="text-gray-800 font-medium">{user.alamat || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilSiswaCard;
