<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Pengumuman;

class PengumumanSeeder extends Seeder
{
    public function run()
    {
        Pengumuman::create([
            'judul' => 'Libur Akhir Semester',
            'konten' => 'Sekolah akan libur mulai tanggal 20 Juni hingga 5 Juli 2025.',
            'kategori_id' => 1,
            'prioritas_id' => 2,
            'tanggal_mulai' => '2025-06-20',
            'tanggal_berakhir' => '2025-07-05',
            'dibuat_oleh' => 1, // ID user pembuat
            'status' => 'aktif',
            'is_pinned' => true,
            'lampiran' => null,
        ]);
    }
}
