<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;


class PrioritasPengumumanSeeder extends Seeder
{
    public function run()
    {
        DB::table('prioritas_pengumuman')->insert([
            ['level' => 'rendah', 'created_at' => now(), 'updated_at' => now()],
            ['level' => 'normal', 'created_at' => now(), 'updated_at' => now()],
            ['level' => 'tinggi', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
