<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuruSeeder extends Seeder
{
    public function run(): void
    {
        $gurus = [
            ['user_id' => 15, 'nip' => '198012312000121001', 'nama_lengkap' => 'Siti Nurhaliza', 'mata_pelajaran_id' => 1, 'no_hp' => '081234567890', 'alamat' => 'Kp. Baru, Cikarang'],
            ['user_id' => 16, 'nip' => '197905102001121002', 'nama_lengkap' => 'Ahmad Fauzi', 'mata_pelajaran_id' => 2, 'no_hp' => '081298765432', 'alamat' => 'Kp. Rawa Mekar, Tambun'],
            ['user_id' => 17, 'nip' => '198503052002121003', 'nama_lengkap' => 'Dewi Kartika', 'mata_pelajaran_id' => 3, 'no_hp' => '081387654321', 'alamat' => 'Kp. Gabus, Babelan'],
            ['user_id' => 18, 'nip' => '198705072005121004', 'nama_lengkap' => 'Rina Marlina', 'mata_pelajaran_id' => 4, 'no_hp' => '082112345678', 'alamat' => 'Cibitung, Bekasi'],
            ['user_id' => 19, 'nip' => '197912122006121005', 'nama_lengkap' => 'Bayu Prasetyo', 'mata_pelajaran_id' => 5, 'no_hp' => '081298123456', 'alamat' => 'Tambelang, Bekasi'],
            ['user_id' => 20, 'nip' => '198811012003121006', 'nama_lengkap' => 'Maya Sari', 'mata_pelajaran_id' => 6, 'no_hp' => '085298312345', 'alamat' => 'Setu, Bekasi'],
            ['user_id' => 21, 'nip' => '198305212004121007', 'nama_lengkap' => 'Putri Aisyah', 'mata_pelajaran_id' => 7, 'no_hp' => '089876543210', 'alamat' => 'Pondok Ungu, Bekasi'],
            ['user_id' => 22, 'nip' => '197812312005121008', 'nama_lengkap' => 'Andi Wijaya', 'mata_pelajaran_id' => 8, 'no_hp' => '081233445566', 'alamat' => 'Cikarang Barat, Bekasi'],
            ['user_id' => 23, 'nip' => '198402282007121009', 'nama_lengkap' => 'Tini Susanti', 'mata_pelajaran_id' => 9, 'no_hp' => '082134567899', 'alamat' => 'Cibitung, Bekasi'],
            ['user_id' => 24, 'nip' => '198909302008121010', 'nama_lengkap' => 'Rahmat Hidayat', 'mata_pelajaran_id' => 10, 'no_hp' => '083845612345', 'alamat' => 'Kranji, Bekasi'],
        ];

        foreach ($gurus as $guru) {
            DB::table('guru')->insert(array_merge($guru, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
