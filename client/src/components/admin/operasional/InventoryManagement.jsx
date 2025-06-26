import React, { useState, useRef } from 'react';
import { 
  Search, 
  Plus, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Eye, 
  Edit, 
  Trash2, 
  Filter, 
  Download,
  Upload,
  X,
  Calendar,
  MapPin,
  User,
  Tag,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Laptop,
  Book,
  Wrench,
  Users,
  Home,
  Zap
} from 'lucide-react';

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: 'Laptop Dell Inspiron 15',
      category: 'Elektronik',
      code: 'ELK-001',
      quantity: 5,
      condition: 'Baik',
      location: 'Lab Komputer',
      purchaseDate: '2023-08-15',
      purchasePrice: 8500000,
      supplier: 'PT. Teknologi Maju',
      warranty: '2025-08-15',
      status: 'Aktif',
      lastMaintenance: '2024-01-10',
      assignedTo: 'Guru TIK',
      description: 'Laptop untuk pembelajaran komputer siswa'
    },
    {
      id: 2,
      name: 'Meja Belajar Kayu',
      category: 'Furniture',
      code: 'FUR-002',
      quantity: 180,
      condition: 'Baik',
      location: 'Kelas 1-6',
      purchaseDate: '2023-06-20',
      purchasePrice: 450000,
      supplier: 'CV. Furniture Jaya',
      warranty: '-',
      status: 'Aktif',
      lastMaintenance: '2023-12-15',
      assignedTo: 'Wali Kelas',
      description: 'Meja belajar untuk siswa semua kelas'
    },
    {
      id: 3,
      name: 'Proyektor Epson EB-X41',
      category: 'Elektronik',
      code: 'ELK-003',
      quantity: 3,
      condition: 'Perlu Perbaikan',
      location: 'Ruang Multimedia',
      purchaseDate: '2022-09-10',
      purchasePrice: 4200000,
      supplier: 'Toko Elektronik Mandiri',
      warranty: '2024-09-10',
      status: 'Maintenance',
      lastMaintenance: '2024-01-15',
      assignedTo: 'Tim IT',
      description: 'Proyektor untuk presentasi pembelajaran'
    },
    {
      id: 4,
      name: 'Buku Paket Matematika Kelas 4',
      category: 'Buku',
      code: 'BUK-004',
      quantity: 120,
      condition: 'Baik',
      location: 'Perpustakaan',
      purchaseDate: '2023-07-01',
      purchasePrice: 85000,
      supplier: 'Penerbit Erlangga',
      warranty: '-',
      status: 'Aktif',
      lastMaintenance: '-',
      assignedTo: 'Pustakawan',
      description: 'Buku pelajaran matematika untuk siswa kelas 4'
    },
    {
      id: 5,
      name: 'AC Split 1.5 PK',
      category: 'Elektronik',
      code: 'ELK-005',
      quantity: 8,
      condition: 'Baik',
      location: 'Ruang Kelas',
      purchaseDate: '2023-05-12',
      purchasePrice: 3200000,
      supplier: 'PT. Sejuk Dingin',
      warranty: '2026-05-12',
      status: 'Aktif',
      lastMaintenance: '2024-01-20',
      assignedTo: 'Teknisi',
      description: 'AC untuk kenyamanan ruang kelas'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedCondition, setSelectedCondition] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  const categories = ['Semua', 'Elektronik', 'Furniture', 'Buku', 'Alat Tulis', 'Olahraga', 'Kebersihan'];
  const conditions = ['Semua', 'Baik', 'Perlu Perbaikan', 'Rusak'];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesCondition = selectedCondition === 'Semua' || item.condition === selectedCondition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Baik': return 'bg-green-100 text-green-800 border-green-200';
      case 'Perlu Perbaikan': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rusak': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Nonaktif': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Elektronik': return <Laptop className="h-5 w-5" />;
      case 'Furniture': return <Home className="h-5 w-5" />;
      case 'Buku': return <Book className="h-5 w-5" />;
      case 'Alat Tulis': return <Edit className="h-5 w-5" />;
      case 'Olahraga': return <Users className="h-5 w-5" />;
      case 'Kebersihan': return <Wrench className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);
  const needMaintenance = inventoryItems.filter(item => item.condition === 'Perlu Perbaikan').length;
  const activeItems = inventoryItems.filter(item => item.status === 'Aktif').length;

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini dari inventaris?')) {
      setInventoryItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Header with Gradient */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">📦 Inventaris Sekolah</h1>
              <p className="text-blue-100 text-lg">SDN Karangpatri 01 - Kelola aset dan inventaris sekolah</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <Package className="h-16 w-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Barang</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{totalItems.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm font-medium">+12% dari bulan lalu</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Nilai</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                Rp {(totalValue / 1000000).toFixed(1)}M
              </p>
              <div className="flex items-center mt-2">
                <BarChart3 className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-blue-500 text-sm font-medium">Asset value</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Barang Aktif</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{activeItems}</p>
              <div className="flex items-center mt-2">
                <CheckCircle className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-purple-500 text-sm font-medium">Siap digunakan</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Perlu Maintenance</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{needMaintenance}</p>
              <div className="flex items-center mt-2">
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-orange-500 text-sm font-medium">Butuh perhatian</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Modern Action Bar */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari barang inventaris..."
                className="pl-12 pr-4 py-3 w-80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <select
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
              >
                <PieChart className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
            </div>
            
            <button className="bg-gray-100 text-gray-600 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Tambah Barang
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-xl">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.code}</span>
                      <h3 className="font-semibold text-gray-900 text-sm mt-1 line-clamp-2">{item.name}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Jumlah</span>
                    <span className="font-semibold text-gray-900">{item.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Kondisi</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getConditionColor(item.condition)}`}>
                      {item.condition}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Lokasi</span>
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Nilai</span>
                    <span className="text-sm font-semibold text-green-600">
                      Rp {(item.purchasePrice / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleViewDetail(item)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    Detail
                  </button>
                  <button className="bg-green-50 text-green-600 p-2 rounded-xl hover:bg-green-100 transition-colors">
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Barang
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kondisi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Lokasi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-xl mr-4">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getConditionColor(item.condition)}`}>
                        {item.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50"
                          title="Lihat Detail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Tambah Barang Inventaris</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Barang *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Laptop Dell Inspiron"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kode Barang *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: ELK-001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah *
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kondisi *
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {conditions.slice(1).map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lokasi *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Lab Komputer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Pembelian
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga Pembelian
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Supplier
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama supplier"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Garansi Berakhir
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama penanggung jawab"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Aktif">Aktif</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Deskripsi detail barang..."
                />
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Upload foto barang (opsional)</p>
                <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                  Pilih File
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Format: JPG, PNG. Maksimal 5MB
                </p>
              </div>
              
              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg"
                >
                  Simpan Barang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    {getCategoryIcon(selectedItem.category)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h3>
                    <p className="text-gray-500 mt-1">Kode: {selectedItem.code}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Informasi Dasar
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kategori:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
                          {selectedItem.category}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Jumlah:</span>
                        <span className="font-semibold text-gray-900">{selectedItem.quantity} unit</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kondisi:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getConditionColor(selectedItem.condition)}`}>
                          {selectedItem.condition}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Lokasi & Penanggungjawab
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lokasi:</span>
                        <span className="font-semibold text-gray-900">{selectedItem.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Penanggung Jawab:</span>
                        <span className="font-semibold text-gray-900">{selectedItem.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Informasi Pembelian
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tanggal Pembelian:</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(selectedItem.purchaseDate).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Harga Satuan:</span>
                        <span className="font-semibold text-green-600">
                          Rp {selectedItem.purchasePrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Nilai:</span>
                        <span className="font-bold text-green-600">
                          Rp {(selectedItem.purchasePrice * selectedItem.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Supplier:</span>
                        <span className="font-semibold text-gray-900">{selectedItem.supplier}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-orange-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Maintenance & Garansi
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Garansi Berakhir:</span>
                        <span className="font-semibold text-gray-900">
                          {selectedItem.warranty !== '-' ? new Date(selectedItem.warranty).toLocaleDateString('id-ID') : 'Tidak ada'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Maintenance Terakhir:</span>
                        <span className="font-semibold text-gray-900">
                          {selectedItem.lastMaintenance !== '-' ? new Date(selectedItem.lastMaintenance).toLocaleDateString('id-ID') : 'Belum pernah'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Deskripsi
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">Foto Barang</h4>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Package className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Foto tidak tersedia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-8 border-t border-gray-100 mt-8">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Barang
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Detail
                </button>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-medium flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Schedule Maintenance
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium ml-auto"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;