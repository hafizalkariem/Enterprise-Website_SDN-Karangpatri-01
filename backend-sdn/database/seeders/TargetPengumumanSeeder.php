<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\TargetPengumuman;

class TargetPengumumanSeeder extends Seeder
{
    public function run()
    {
        TargetPengumuman::create([
            'pengumuman_id' => 1,
            'role_id' => 3, // Misal role 3 adalah siswa
        ]);
    }
}
