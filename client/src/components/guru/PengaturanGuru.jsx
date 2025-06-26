import React, { useState } from 'react';
import { User, Lock, Bell, Eye, EyeOff, Save, Camera, Mail, Phone, MapPin, Calendar, Shield, Monitor, Volume2, Smartphone } from 'lucide-react';

const Pengaturan = () => {
  const [activeTab, setActiveTab] = useState('profil');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    nama: 'Budi Santoso',
    nip: '196501011990031001',
    email: 'budi.santoso@adnkarangpatri01.sch.id',
    telepon: '081234567890',
    alamat: 'Jl. Pendidikan No. 123, Karang Patri',
    tanggalLahir: '1965-01-01',
    jabatan: 'Guru Matematika',
    kelasWali: 'X-A'
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifikasi: true,
    pushNotifikasi: true,
    notifikasiTugas: true,
    notifikasiNilai: true,
    notifikasiKehadiran: true,
    notifikasiPengumuman: true
  });

  const [preferences, setPreferences] = useState({
    tema: 'light',
    bahasa: 'id',
    timezone: 'WIB',
    formatTanggal: 'DD/MM/YYYY',
    autoLogout: '30'
  });

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    alert('Profil berhasil disimpan!');
  };

  const handleChangePassword = () => {
    alert('Password berhasil diubah!');
  };

  const tabs = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'keamanan', label: 'Keamanan', icon: Lock },
    { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
    { id: 'preferensi', label: 'Preferensi', icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pengaturan</h1>
          <p className="text-gray-600">Kelola profil dan preferensi akun Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profil Tab */}
              {activeTab === 'profil' && (
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-400" />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Profil Guru</h2>
                      <p className="text-gray-600">Perbarui informasi profil Anda</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={profileData.nama}
                        onChange={(e) => handleProfileChange('nama', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIP
                      </label>
                      <input
                        type="text"
                        value={profileData.nip}
                        onChange={(e) => handleProfileChange('nip', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        value={profileData.telepon}
                        onChange={(e) => handleProfileChange('telepon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Alamat
                      </label>
                      <textarea
                        value={profileData.alamat}
                        onChange={(e) => handleProfileChange('alamat', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={profileData.tanggalLahir}
                        onChange={(e) => handleProfileChange('tanggalLahir', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jabatan
                      </label>
                      <input
                        type="text"
                        value={profileData.jabatan}
                        onChange={(e) => handleProfileChange('jabatan', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kelas Wali
                      </label>
                      <select
                        value={profileData.kelasWali}
                        onChange={(e) => handleProfileChange('kelasWali', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Pilih Kelas</option>
                        <option value="X-A">X-A</option>
                        <option value="X-B">X-B</option>
                        <option value="XI-A">XI-A</option>
                        <option value="XI-B">XI-B</option>
                        <option value="XII-A">XII-A</option>
                        <option value="XII-B">XII-B</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Simpan Profil</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Keamanan Tab */}
              {activeTab === 'keamanan' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Keamanan Akun</h2>
                    <p className="text-gray-600">Kelola password dan pengaturan keamanan</p>
                  </div>

                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-4">Ubah Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Saat Ini
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Baru
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Konfirmasi Password Baru
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handleChangePassword}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                          <span>Ubah Password</span>
                        </button>
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-4">Pengaturan Keamanan</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-600">Tambahkan lapisan keamanan ekstra</p>
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Aktifkan
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">Login Alerts</p>
                            <p className="text-sm text-gray-600">Notifikasi saat ada login dari perangkat baru</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifikasi Tab */}
              {activeTab === 'notifikasi' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Pengaturan Notifikasi</h2>
                    <p className="text-gray-600">Kelola notifikasi yang ingin Anda terima</p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Notifikasi Email
                      </h3>
                      <div className="space-y-4">
                        {Object.entries({
                          emailNotifikasi: 'Email Notifikasi Umum',
                          notifikasiTugas: 'Notifikasi Tugas Baru',
                          notifikasiNilai: 'Update Nilai Siswa',
                          notifikasiKehadiran: 'Laporan Kehadiran',
                          notifikasiPengumuman: 'Pengumuman Sekolah'
                        }).map(([key, label]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-gray-700">{label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications[key]}
                                onChange={() => handleNotificationChange(key)}
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Smartphone className="h-5 w-5 mr-2" />
                        Push Notification
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700">Push Notification</p>
                          <p className="text-sm text-gray-600">Terima notifikasi langsung di perangkat</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.pushNotifikasi}
                            onChange={() => handleNotificationChange('pushNotifikasi')}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferensi Tab */}
              {activeTab === 'preferensi' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Preferensi Sistem</h2>
                    <p className="text-gray-600">Sesuaikan tampilan dan pengaturan sistem</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tema Tampilan
                        </label>
                        <select
                          value={preferences.tema}
                          onChange={(e) => handlePreferenceChange('tema', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="light">Terang</option>
                          <option value="dark">Gelap</option>
                          <option value="auto">Otomatis</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bahasa
                        </label>
                        <select
                          value={preferences.bahasa}
                          onChange={(e) => handlePreferenceChange('bahasa', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="id">Bahasa Indonesia</option>
                          <option value="en">English</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zona Waktu
                        </label>
                        <select
                          value={preferences.timezone}
                          onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="WIB">WIB (UTC+7)</option>
                          <option value="WITA">WITA (UTC+8)</option>
                          <option value="WIT">WIT (UTC+9)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Format Tanggal
                        </label>
                        <select
                          value={preferences.formatTanggal}
                          onChange={(e) => handlePreferenceChange('formatTanggal', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Auto Logout (menit)
                        </label>
                        <select
                          value={preferences.autoLogout}
                          onChange={(e) => handlePreferenceChange('autoLogout', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="15">15 menit</option>
                          <option value="30">30 menit</option>
                          <option value="60">1 jam</option>
                          <option value="120">2 jam</option>
                          <option value="0">Tidak pernah</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => alert('Preferensi berhasil disimpan!')}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Simpan Preferensi</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;