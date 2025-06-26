import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Twitter, Globe, Edit2, Trash2, Plus, Save, X, Eye, EyeOff } from 'lucide-react';

const MediaSosial = () => {
  const [mediaSosial, setMediaSosial] = useState([
    {
      id: 1,
      platform: 'Facebook',
      username: 'SDN.KarangPatri01',
      url: 'https://facebook.com/sdn.karangpatri01',
      icon: 'Facebook',
      aktif: true,
      pengikut: 1250,
      terakhirPost: '2 hari lalu'
    },
    {
      id: 2,
      platform: 'Instagram',
      username: '@sdn_karangpatri01',
      url: 'https://instagram.com/sdn_karangpatri01',
      icon: 'Instagram',
      aktif: true,
      pengikut: 890,
      terakhirPost: '1 hari lalu'
    },
    {
      id: 3,
      platform: 'YouTube',
      username: 'SDN Karang Patri 01',
      url: 'https://youtube.com/@sdnkarangpatri01',
      icon: 'Youtube',
      aktif: true,
      pengikut: 320,
      terakhirPost: '1 minggu lalu'
    },
    {
      id: 4,
      platform: 'Website',
      username: 'Website Resmi',
      url: 'https://sdnkarangpatri01.sch.id',
      icon: 'Globe',
      aktif: true,
      pengikut: null,
      terakhirPost: '3 hari lalu'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    platform: '',
    username: '',
    url: '',
    aktif: true
  });

  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');

  const platformOptions = [
    { value: 'Facebook', label: 'Facebook', icon: Facebook },
    { value: 'Instagram', label: 'Instagram', icon: Instagram },
    { value: 'Youtube', label: 'YouTube', icon: Youtube },
    { value: 'Twitter', label: 'Twitter', icon: Twitter },
    { value: 'Globe', label: 'Website', icon: Globe }
  ];

  const getIcon = (iconName) => {
    const icons = {
      Facebook,
      Instagram,
      Youtube,
      Twitter,
      Globe
    };
    const IconComponent = icons[iconName] || Globe;
    return <IconComponent className="w-5 h-5" />;
  };

  const getPlatformColor = (platform) => {
    const colors = {
      Facebook: 'text-blue-600 bg-blue-50',
      Instagram: 'text-pink-600 bg-pink-50',
      Youtube: 'text-red-600 bg-red-50',
      Twitter: 'text-sky-600 bg-sky-50',
      Globe: 'text-green-600 bg-green-50'
    };
    return colors[platform] || 'text-gray-600 bg-gray-50';
  };

  const handleSubmit = () => {    
    if (editingId) {
      setMediaSosial(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, icon: formData.platform }
          : item
      ));
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        icon: formData.platform,
        pengikut: 0,
        terakhirPost: 'Baru ditambah'
      };
      setMediaSosial(prev => [...prev, newItem]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ platform: '', username: '', url: '', aktif: true });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      platform: item.platform,
      username: item.username,
      url: item.url,
      aktif: item.aktif
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus media sosial ini?')) {
      setMediaSosial(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setMediaSosial(prev => prev.map(item =>
      item.id === id ? { ...item, aktif: !item.aktif } : item
    ));
  };

  const filteredData = mediaSosial.filter(item => {
    const matchesFilter = filter === 'semua' || 
                         (filter === 'aktif' && item.aktif) || 
                         (filter === 'nonaktif' && !item.aktif);
    const matchesSearch = item.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.username.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola Media Sosial</h1>
            <p className="text-gray-600">Kelola akun media sosial sekolah SDN Karang Patri 01</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Tambah Media Sosial
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Platform</p>
              <p className="text-2xl font-bold text-gray-900">{mediaSosial.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Platform Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {mediaSosial.filter(item => item.aktif).length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pengikut</p>
              <p className="text-2xl font-bold text-purple-600">
                {mediaSosial.reduce((sum, item) => sum + (item.pengikut || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Instagram className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Platform Terpopuler</p>
              <p className="text-lg font-bold text-blue-600">Facebook</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Facebook className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['semua', 'aktif', 'nonaktif'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Cari platform atau username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Media Sosial List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Media Sosial</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Platform</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Username</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">URL</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Pengikut</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Terakhir Post</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getPlatformColor(item.platform)}`}>
                        {getIcon(item.icon)}
                      </div>
                      <span className="font-medium text-gray-900">{item.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.username}</td>
                  <td className="px-6 py-4">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline max-w-xs truncate block"
                    >
                      {item.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.pengikut ? item.pengikut.toLocaleString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.terakhirPost}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        item.aktif
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.aktif ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {item.aktif ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Media Sosial' : 'Tambah Media Sosial'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Pilih Platform</option>
                  {platformOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="aktif"
                  checked={formData.aktif}
                  onChange={(e) => setFormData({...formData, aktif: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="aktif" className="ml-2 text-sm text-gray-700">
                  Aktif
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {editingId ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSosial;