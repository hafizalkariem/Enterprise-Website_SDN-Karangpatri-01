<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuruMapelSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('guru_mapel')->insert([
            [
                'guru_id' => 1,
                'mapel_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'guru_id' => 1,
                'mapel_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'guru_id' => 14,
                'mapel_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
