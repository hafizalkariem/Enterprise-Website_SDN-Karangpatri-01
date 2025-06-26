import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  FileText,
  Image,
  Bell
} from 'lucide-react';

const ManajemenContent = () => {
  const [activeTab, setActiveTab] = useState('artikel');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data - dalam implementasi nyata, ini akan dari API
  const [contentData, setContentData] = useState({
    artikel: [
      {
        id: 1,
        judul: 'Prestasi Siswa SDN Karangpatri 01 di Olimpiade Matematika',
        kategori: 'Prestasi',
        penulis: 'Budi Santoso',
        tanggal: '2024-06-05',
        status: 'published',
        views: 245
      },
      {
        id: 2,
        judul: 'Kegiatan Ekstrakurikuler Pramuka Semester Genap',
        kategori: 'Kegiatan',
        penulis: 'Siti Nurhaliza',
        tanggal: '2024-06-03',
        status: 'draft',
        views: 0
      },
      {
        id: 3,
        judul: 'Program Literasi Digital untuk Siswa Kelas 4-6',
        kategori: 'Program',
        penulis: 'Ahmad Wijaya',
        tanggal: '2024-06-01',
        status: 'published',
        views: 189
      }
    ],
    pengumuman: [
      {
        id: 1,
        judul: 'Libur Semester Genap Tahun Ajaran 2023/2024',
        prioritas: 'tinggi',
        tanggal: '2024-06-10',
        status: 'published',
        views: 567
      },
      {
        id: 2,
        judul: 'Pembayaran SPP Bulan Juni 2024',
        prioritas: 'sedang',
        tanggal: '2024-06-08',
        status: 'published',
        views: 234
      }
    ],
    galeri: [
      {
        id: 1,
        judul: 'Upacara Bendera Hari Senin',
        kategori: 'Kegiatan Rutin',
        tanggal: '2024-06-03',
        jumlahFoto: 12,
        status: 'published'
      },
      {
        id: 2,
        judul: 'Lomba Kebersihan Kelas',
        kategori: 'Kompetisi',
        tanggal: '2024-05-28',
        jumlahFoto: 8,
        status: 'published'
      }
    ]
  });

  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    konten: '',
    status: 'draft'
  });

  const tabs = [
    { id: 'artikel', label: 'Artikel', icon: FileText },
    { id: 'pengumuman', label: 'Pengumuman', icon: Bell },
    { id: 'galeri', label: 'Galeri', icon: Image }
  ];

  const handleAddContent = () => {
    setModalType('add');
    setSelectedItem(null);
    setFormData({ judul: '', kategori: '', konten: '', status: 'draft' });
    setShowModal(true);
  };

  const handleEditContent = (item) => {
    setModalType('edit');
    setSelectedItem(item);
    setFormData({
      judul: item.judul,
      kategori: item.kategori || item.prioritas,
      konten: item.konten || '',
      status: item.status
    });
    setShowModal(true);
  };

  const handleViewContent = (item) => {
    setModalType('view');
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDeleteContent = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus konten ini?')) {
      setContentData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(item => item.id !== id)
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.judul.trim()) {
      alert('Judul harus diisi');
      return;
    }
    
    if (modalType === 'add') {
      const newItem = {
        id: Date.now(),
        ...formData,
        penulis: 'Admin',
        tanggal: new Date().toISOString().split('T')[0],
        views: 0
      };
      setContentData(prev => ({
        ...prev,
        [activeTab]: [newItem, ...prev[activeTab]]
      }));
    } else if (modalType === 'edit') {
      setContentData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(item => 
          item.id === selectedItem.id ? { ...item, ...formData } : item
        )
      }));
    }
    setShowModal(false);
  };

  const filteredData = contentData[activeTab].filter(item => {
    const matchesSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'semua' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', text: 'Dipublikasi' },
      draft: { color: 'bg-yellow-100 text-yellow-800', text: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-800', text: 'Arsip' }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      tinggi: { color: 'bg-red-100 text-red-800', text: 'Tinggi' },
      sedang: { color: 'bg-yellow-100 text-yellow-800', text: 'Sedang' },
      rendah: { color: 'bg-blue-100 text-blue-800', text: 'Rendah' }
    };
    const config = priorityConfig[priority] || priorityConfig.sedang;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Konten</h1>
          <p className="text-gray-600">Kelola artikel, pengumuman, dan galeri website SDN Karangpatri 01</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Cari konten..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="semua">Semua Status</option>
                <option value="published">Dipublikasi</option>
                <option value="draft">Draft</option>
                <option value="archived">Arsip</option>
              </select>
            </div>
            <button
              onClick={handleAddContent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus size={16} />
              <span>Tambah {activeTab === 'artikel' ? 'Artikel' : activeTab === 'pengumuman' ? 'Pengumuman' : 'Galeri'}</span>
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Judul
                  </th>
                  {activeTab === 'artikel' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Penulis
                      </th>
                    </>
                  )}
                  {activeTab === 'pengumuman' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prioritas
                    </th>
                  )}
                  {activeTab === 'galeri' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jumlah Foto
                      </th>
                    </>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {activeTab !== 'galeri' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.judul}</div>
                    </td>
                    {activeTab === 'artikel' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.kategori}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <User size={14} className="mr-1" />
                            {item.penulis}
                          </div>
                        </td>
                      </>
                    )}
                    {activeTab === 'pengumuman' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPriorityBadge(item.prioritas)}
                      </td>
                    )}
                    {activeTab === 'galeri' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.kategori}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.jumlahFoto} foto</div>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(item.tanggal).toLocaleDateString('id-ID')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    {activeTab !== 'galeri' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.views}</div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewContent(item)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Lihat"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditContent(item)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteContent(item.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg mb-2">Tidak ada data</div>
              <p className="text-gray-400">Belum ada konten yang sesuai dengan filter Anda</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {modalType === 'add' && `Tambah ${activeTab === 'artikel' ? 'Artikel' : activeTab === 'pengumuman' ? 'Pengumuman' : 'Galeri'}`}
                  {modalType === 'edit' && `Edit ${activeTab === 'artikel' ? 'Artikel' : activeTab === 'pengumuman' ? 'Pengumuman' : 'Galeri'}`}
                  {modalType === 'view' && `Detail ${activeTab === 'artikel' ? 'Artikel' : activeTab === 'pengumuman' ? 'Pengumuman' : 'Galeri'}`}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {modalType === 'view' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <p className="text-gray-900">{selectedItem?.judul}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activeTab === 'artikel' ? 'Kategori' : activeTab === 'pengumuman' ? 'Prioritas' : 'Kategori'}
                    </label>
                    <p className="text-gray-900">{selectedItem?.kategori || selectedItem?.prioritas}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                    <p className="text-gray-900">{new Date(selectedItem?.tanggal).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div>{getStatusBadge(selectedItem?.status)}</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <input
                      type="text"
                      value={formData.judul}
                      onChange={(e) => setFormData({...formData, judul: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activeTab === 'artikel' ? 'Kategori' : activeTab === 'pengumuman' ? 'Prioritas' : 'Kategori'}
                    </label>
                    {activeTab === 'pengumuman' ? (
                      <select
                        value={formData.kategori}
                        onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Pilih Prioritas</option>
                        <option value="tinggi">Tinggi</option>
                        <option value="sedang">Sedang</option>
                        <option value="rendah">Rendah</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formData.kategori}
                        onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    )}
                  </div>
                  {activeTab !== 'galeri' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
                      <textarea
                        value={formData.konten}
                        onChange={(e) => setFormData({...formData, konten: e.target.value})}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Dipublikasi</option>
                      <option value="archived">Arsip</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {modalType === 'add' ? 'Tambah' : 'Simpan'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManajemenContent;