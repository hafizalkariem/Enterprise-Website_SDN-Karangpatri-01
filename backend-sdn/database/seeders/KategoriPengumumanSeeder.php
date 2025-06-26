<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class KategoriPengumumanSeeder extends Seeder
{
    public function run()
    {
        DB::table('kategori_pengumuman')->insert([
            ['nama' => 'Umum', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Akademik', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Ekstrakurikuler', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Teknis', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
