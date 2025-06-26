<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guru;
use App\Models\Siswa;

class GuruController extends Controller
{
    /**
     * Dashboard Guru - Mengembalikan data statistik dan profil guru.
     */
    public function dashboard(Request $request)
    {
        $user = auth()->user();
        $guru = Guru::where('user_id', $user->id)->first();

        if (!$guru) {
            return response()->json(['message' => 'Guru tidak ditemukan'], 404);
        }

        // Ambil kelas yang diampu guru (pastikan relasi exists di model Guru)
        $kelasDiampu = $guru->kelas()->get(); // many-to-many

        // Jumlah kelas yang diampu
        $jumlahKelas = $kelasDiampu->count();

        // Jumlah siswa dari semua kelas yang diampu
        $kelasIds = $kelasDiampu->pluck('id')->toArray();
        $jumlahSiswa = Siswa::whereIn('kelas_id', $kelasIds)->count();

        // Mata pelajaran yang diampu (bisa lebih dari satu)
        $mapelList = $guru->mapel()->pluck('nama_mapel')->toArray();
        $mapel = count($mapelList) > 0 ? implode(', ', $mapelList) : '-';

        // NIP
        $nip = $guru->nip ?? '-';

        // Data profil guru
        $profile = [
            'name' => $guru->nama_lengkap,
            'nip' => $nip,
            'mapel' => $mapel,
        ];

        // Data statistik
        $stats = [
            'jumlah_kelas' => $jumlahKelas,
            'jumlah_siswa' => $jumlahSiswa,
            'mapel' => $mapel,
            'nip' => $nip,
        ];

        return response()->json([
            'profile' => $profile,
            'stats' => $stats,
        ]);
    }

    /**
     * Endpoint untuk mengambil daftar kelas yang diampu guru.
     */
    public function kelasDiampu(Request $request)
    {
        $user = auth()->user();
        $guru = Guru::where('user_id', $user->id)->first();

        if (!$guru) {
            return response()->json(['message' => 'Guru tidak ditemukan'], 404);
        }

        $kelas = $guru->kelas()->get();

        return response()->json($kelas);
    }

    /**
     * Endpoint untuk mengambil daftar siswa dari kelas yang diampu guru.
     */
    public function siswaDiampu(Request $request)
    {
        $user = auth()->user();
        $guru = Guru::where('user_id', $user->id)->first();

        if (!$guru) {
            return response()->json(['message' => 'Guru tidak ditemukan'], 404);
        }

        $kelasIds = $guru->kelas()->pluck('id')->toArray();
        $siswa = Siswa::whereIn('kelas_id', $kelasIds)->get();

        return response()->json($siswa);
    }
}
