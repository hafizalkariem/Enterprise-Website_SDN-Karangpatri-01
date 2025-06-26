import React, { useState, useRef } from 'react';
import { 
  Search, 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Filter, 
  Calendar,
  User,
  FolderOpen,
  Plus,
  X
} from 'lucide-react';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Kurikulum Merdeka 2024',
      category: 'Kurikulum',
      type: 'PDF',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'Kepala Sekolah',
      status: 'Aktif',
      description: 'Dokumen kurikulum merdeka untuk tahun ajaran 2024'
    },
    {
      id: 2,
      name: 'Data Siswa Kelas 1-6',
      category: 'Data Siswa',
      type: 'Excel',
      size: '1.8 MB',
      uploadDate: '2024-01-20',
      uploadedBy: 'Tata Usaha',
      status: 'Aktif',
      description: 'Database lengkap siswa semua kelas'
    },
    {
      id: 3,
      name: 'Rencana Anggaran 2024',
      category: 'Keuangan',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Bendahara',
      status: 'Aktif',
      description: 'Rencana anggaran pendapatan dan belanja sekolah'
    },
    {
      id: 4,
      name: 'Laporan Kegiatan Semester 1',
      category: 'Laporan',
      type: 'Word',
      size: '1.5 MB',
      uploadDate: '2024-01-05',
      uploadedBy: 'Wakil Kepala Sekolah',
      status: 'Arsip',
      description: 'Laporan kegiatan pembelajaran semester 1'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ['Semua', 'Kurikulum', 'Data Siswa', 'Keuangan', 'Laporan', 'Surat Menyurat', 'Inventaris'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const newDoc = {
        id: documents.length + Math.random(),
        name: file.name,
        category: 'Belum dikategorikan',
        type: file.type.split('/')[1]?.toUpperCase() || 'Unknown',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: 'Admin',
        status: 'Pending',
        description: 'Dokumen baru yang perlu dikategorikan'
      };
      setDocuments(prev => [...prev, newDoc]);
    });
    setShowUploadModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const handleViewDetail = (doc) => {
    setSelectedDocument(doc);
    setShowDetailModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif': return 'bg-green-100 text-green-800';
      case 'Arsip': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'word': return '📝';
      case 'excel': return '📊';
      case 'image': return '🖼️';
      default: return '📄';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Arsip & Dokumen</h1>
        <p className="text-gray-600">SDN Karangpatri 01 - Kelola semua dokumen dan arsip sekolah</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Dokumen</p>
              <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Dokumen Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {documents.filter(d => d.status === 'Aktif').length}
              </p>
            </div>
            <FolderOpen className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Perlu Review</p>
              <p className="text-2xl font-bold text-yellow-600">
                {documents.filter(d => d.status === 'Pending').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Arsip</p>
              <p className="text-2xl font-bold text-gray-600">
                {documents.filter(d => d.status === 'Arsip').length}
              </p>
            </div>
            <User className="h-8 w-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari dokumen..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Upload Dokumen
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dokumen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Upload
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getTypeIcon(doc.type)}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">{doc.type} • {doc.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.uploadDate).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploadedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetail(doc)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Lihat Detail"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-900"
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Dokumen Baru</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori Dokumen
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Masukkan deskripsi dokumen..."
                />
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Drag & drop file atau</p>
                <button
                  onClick={handleUpload}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Pilih File
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Maksimal 10MB. Format: PDF, DOC, XLS, PNG, JPG
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detail Dokumen</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Dokumen</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDocument.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kategori</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDocument.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipe File</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDocument.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ukuran</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDocument.size}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Upload</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedDocument.uploadDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Diupload Oleh</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDocument.uploadedBy}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <p className="mt-1 text-sm text-gray-900">{selectedDocument.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedDocument.status)}`}>
                  {selectedDocument.status}
                </span>
              </div>
              
              <div className="flex gap-2 pt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
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

export default DocumentManagement;