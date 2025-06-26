<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelasSeeder extends Seeder
{
    public function run(): void
    {
        $kelasList = [
            '1A',
            '1B',
            '2A',
            '2B',
            '3A',
            '3B',
            '4A',
            '4B',
            '5A',
            '5B',
            '6A',
            '6B',
        ];

        foreach ($kelasList as $nama) {
            DB::table('kelas')->insert([
                'nama_kelas' => $nama,
                'tahun_ajaran_id' => 2,
                'wali_kelas_id' => 1, // Ganti sesuai ID wali kelas yang valid

            ]);
        }
    }
}
