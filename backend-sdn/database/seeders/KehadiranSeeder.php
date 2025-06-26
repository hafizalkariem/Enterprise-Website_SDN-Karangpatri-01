<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KehadiranSeeder extends Seeder
{
    public function run(): void
    {
        $siswaId = 1; // pastikan ini ID siswa yang valid
        $tanggalAwal = Carbon::now()->startOfMonth(); // tanggal 1 bulan sekarang
        $jumlahHari = 10;

        $statusList = ['hadir', 'sakit', 'izin', 'alpa'];

        for ($i = 0; $i < $jumlahHari; $i++) {
            $tanggal = $tanggalAwal->copy()->addDays($i);
            $status = $statusList[array_rand($statusList)];

            DB::table('kehadiran')->insert([
                'siswa_id'   => $siswaId,
                'tanggal'    => $tanggal->toDateString(),
                'status'     => $status,
                'jam_masuk'  => $status === 'hadir' ? '07:15:00' : null,
                'jam_keluar' => $status === 'hadir' ? '12:30:00' : null,
                'keterangan' => in_array($status, ['sakit', 'izin'])
                    ? ($status === 'sakit' ? 'Demam' : 'Acara keluarga')
                    : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
