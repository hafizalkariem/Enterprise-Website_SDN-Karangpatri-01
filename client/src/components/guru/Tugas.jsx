import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Calendar, Clock, Users, BookOpen, FileText, CheckCircle, XCircle } from 'lucide-react';

const Tugas = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'tugas' atau 'quiz'
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Data dummy tugas dan quiz
  const [tugasList, setTugasList] = useState([
    {
      id: 1,
      judul: 'Membaca Cerita Pendek',
      tipe: 'tugas',
      mataPelajaran: 'Bahasa Indonesia',
      kelas: '5A',
      deskripsi: 'Baca cerita "Budi dan Siti" kemudian tulis ringkasan dalam 150 kata',
      tanggalBuat: '2024-06-08',
      deadline: '2024-06-15',
      status: 'aktif',
      submitted: 22,
      total: 28
    },
    {
      id: 2,
      judul: 'Quiz Perkalian',
      tipe: 'quiz',
      mataPelajaran: 'Matematika',
      kelas: '4B',
      deskripsi: 'Quiz tentang perkalian 1-10',
      tanggalBuat: '2024-06-07',
      deadline: '2024-06-12',
      status: 'aktif',
      submitted: 18,
      total: 25,
      soal: [
        { pertanyaan: '5 x 7 = ?', jawaban: '35' },
        { pertanyaan: '8 x 6 = ?', jawaban: '48' }
      ]
    },
    {
      id: 3,
      judul: 'Tugas IPA - Sistem Tata Surya',
      tipe: 'tugas',
      mataPelajaran: 'IPA',
      kelas: '6A',
      deskripsi: 'Buat poster tentang planet-planet dalam tata surya',
      tanggalBuat: '2024-06-05',
      deadline: '2024-06-10',
      status: 'selesai',
      submitted: 30,
      total: 30
    }
  ]);

  const [formData, setFormData] = useState({
    judul: '',
    tipe: 'tugas',
    mataPelajaran: '',
    kelas: '',
    deskripsi: '',
    deadline: '',
    soal: []
  });

  const [soalQuiz, setSoalQuiz] = useState([{ pertanyaan: '', jawaban: '' }]);

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData({
        judul: item.judul,
        tipe: item.tipe,
        mataPelajaran: item.mataPelajaran,
        kelas: item.kelas,
        deskripsi: item.deskripsi,
        deadline: item.deadline,
        soal: item.soal || []
      });
      if (item.tipe === 'quiz' && item.soal) {
        setSoalQuiz(item.soal);
      }
    } else {
      setFormData({
        judul: '',
        tipe: type,
        mataPelajaran: '',
        kelas: '',
        deskripsi: '',
        deadline: '',
        soal: []
      });
      setSoalQuiz([{ pertanyaan: '', jawaban: '' }]);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      judul: '',
      tipe: 'tugas',
      mataPelajaran: '',
      kelas: '',
      deskripsi: '',
      deadline: '',
      soal: []
    });
    setSoalQuiz([{ pertanyaan: '', jawaban: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      ...formData,
      tanggalBuat: editingItem ? editingItem.tanggalBuat : new Date().toISOString().split('T')[0],
      status: 'aktif',
      submitted: editingItem ? editingItem.submitted : 0,
      total: editingItem ? editingItem.total : 30,
      soal: formData.tipe === 'quiz' ? soalQuiz : undefined
    };

    if (editingItem) {
      setTugasList(tugasList.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      setTugasList([...tugasList, newItem]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      setTugasList(tugasList.filter(item => item.id !== id));
    }
  };

  const addSoal = () => {
    setSoalQuiz([...soalQuiz, { pertanyaan: '', jawaban: '' }]);
  };

  const removeSoal = (index) => {
    setSoalQuiz(soalQuiz.filter((_, i) => i !== index));
  };

  const updateSoal = (index, field, value) => {
    const updated = soalQuiz.map((soal, i) => 
      i === index ? { ...soal, [field]: value } : soal
    );
    setSoalQuiz(updated);
  };

  const filteredItems = tugasList.filter(item => {
    const matchesTab = activeTab === 'semua' || item.tipe === activeTab;
    const matchesSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.mataPelajaran.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'selesai': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Tugas & Quiz</h1>
            <p className="text-gray-600">Kelola tugas dan quiz untuk siswa</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleOpenModal('tugas')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Buat Tugas
            </button>
            <button
              onClick={() => handleOpenModal('quiz')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Buat Quiz
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Tugas</p>
                <p className="text-2xl font-bold text-blue-800">{tugasList.filter(item => item.tipe === 'tugas').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <BookOpen className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-green-600 text-sm font-medium">Total Quiz</p>
                <p className="text-2xl font-bold text-green-800">{tugasList.filter(item => item.tipe === 'quiz').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-yellow-600 text-sm font-medium">Aktif</p>
                <p className="text-2xl font-bold text-yellow-800">{tugasList.filter(item => item.status === 'aktif').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <CheckCircle className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-purple-600 text-sm font-medium">Selesai</p>
                <p className="text-2xl font-bold text-purple-800">{tugasList.filter(item => item.status === 'selesai').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Tabs */}
          <div className="flex gap-2">
            {['semua', 'tugas', 'quiz'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari tugas atau quiz..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-sm">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada tugas atau quiz</h3>
            <p className="text-gray-500">Mulai dengan membuat tugas atau quiz pertama Anda</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredItems.map(item => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{item.judul}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.tipe === 'tugas' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.tipe.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.deskripsi}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen size={16} />
                        <span>{item.mataPelajaran}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>Kelas {item.kelas}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>Deadline: {new Date(item.deadline).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle size={16} />
                        <span>{item.submitted}/{item.total} siswa</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {/* Handle view detail */}}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleOpenModal(item.tipe, item)}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingItem ? 'Edit' : 'Buat'} {modalType === 'tugas' ? 'Tugas' : 'Quiz'}
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.judul}
                  onChange={(e) => setFormData({...formData, judul: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.mataPelajaran}
                    onChange={(e) => setFormData({...formData, mataPelajaran: e.target.value})}
                  >
                    <option value="">Pilih Mata Pelajaran</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="IPA">IPA</option>
                    <option value="IPS">IPS</option>
                    <option value="PKN">PKN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.kelas}
                    onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                  >
                    <option value="">Pilih Kelas</option>
                    <option value="1A">1A</option>
                    <option value="1B">1B</option>
                    <option value="2A">2A</option>
                    <option value="2B">2B</option>
                    <option value="3A">3A</option>
                    <option value="3B">3B</option>
                    <option value="4A">4A</option>
                    <option value="4B">4B</option>
                    <option value="5A">5A</option>
                    <option value="5B">5B</option>
                    <option value="6A">6A</option>
                    <option value="6B">6B</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                />
              </div>

              {modalType === 'quiz' && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Soal Quiz</label>
                    <button
                      type="button"
                      onClick={addSoal}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <Plus size={14} />
                      Tambah Soal
                    </button>
                  </div>
                  {soalQuiz.map((soal, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Soal {index + 1}</span>
                        {soalQuiz.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSoal(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Pertanyaan"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={soal.pertanyaan}
                        onChange={(e) => updateSoal(index, 'pertanyaan', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Jawaban"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={soal.jawaban}
                        onChange={(e) => updateSoal(index, 'jawaban', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? 'Update' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tugas;