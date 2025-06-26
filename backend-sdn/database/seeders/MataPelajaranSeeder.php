<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MataPelajaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mapel = [
            'Matematika',
            'Bahasa Indonesia',
            'Bahasa Inggris',
            'Ilmu Pengetahuan Alam (IPA)',
            'Ilmu Pengetahuan Sosial (IPS)',
            'Pendidikan Pancasila dan Kewarganegaraan (PPKn)',
            'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
            'Seni Budaya dan Prakarya (SBdP)',
            'Agama Islam',
            'Muatan Lokal Bahasa Daerah',
            'Muatan Lokal Komputer',
            'Muatan Lokal Pramuka',
            'Tematik Terpadu',
            'Kegiatan Literasi',
            'Kegiatan Ekstrakurikuler',
        ];

        foreach ($mapel as $nama) {
            DB::table('mata_pelajaran')->insert([
                'nama_mapel' => $nama,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
