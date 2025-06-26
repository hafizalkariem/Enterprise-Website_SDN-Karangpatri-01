<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NilaiSeeder extends Seeder
{
    public function run(): void
    {
        $data = [];

        // 3 mapel x 3 jenis nilai (Tugas, UTS, UAS)
        $mapel = [1, 2, 3]; // ID mapel yang ada di tabel mata_pelajaran
        $jenis = ['Tugas', 'UTS', 'UAS'];

        foreach ($mapel as $mapel_id) {
            foreach ($jenis as $jenis_nilai) {
                $data[] = [
                    'siswa_id' => 1, // pastikan ini ID siswa yang valid
                    'mapel_id' => $mapel_id,
                    'jenis_nilai' => $jenis_nilai,
                    'nilai' => rand(70, 95),
                    'tanggal_input' => Carbon::now()->subDays(rand(1, 10)),
                    'semester' => 1,
                    'tahun_ajaran' => 2025,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('nilai')->insert($data);
    }
}
