<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Kehadiran;
use App\Models\Siswa;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        try {
            $user = auth()->user();

            if (!$user) {
                return response()->json(['message' => 'User tidak terautentikasi.'], 401);
            }

            $siswa = $user->siswa;

            if (!$siswa) {
                return response()->json([
                    'message' => 'Data siswa tidak ditemukan.',
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                    ],
                    'siswa' => null,
                    'stats' => null,
                    'recent_activity' => []
                ], 404);
            }

            $kelas = $siswa->kelas;
            $semester = $request->input('semester', 1);
            $tahunAjaran = $request->input('tahun_ajaran', date('Y'));

            // Hitung nilai rata-rata berdasarkan semester dan tahun ajaran
            $nilaiAkhirList = DB::table('nilai')
                ->join('mata_pelajaran', 'nilai.mapel_id', '=', 'mata_pelajaran.id')
                ->select(
                    'nilai.mapel_id',
                    DB::raw('AVG(nilai) as nilai_akhir')
                )
                ->where('nilai.siswa_id', $siswa->id)
                ->where('nilai.semester', $semester)
                ->where('nilai.tahun_ajaran', $tahunAjaran)
                ->groupBy('nilai.mapel_id')
                ->pluck('nilai_akhir');

            $nilaiRata = $nilaiAkhirList->count() > 0
                ? round($nilaiAkhirList->avg(), 2)
                : 0;

            // Hitung persentase kehadiran bulan ini
            $bulanIni = now()->format('m');
            $tahunIni = now()->format('Y');

            $totalKehadiran = \App\Models\Kehadiran::where('siswa_id', $siswa->id)
                ->whereMonth('tanggal', $bulanIni)
                ->whereYear('tanggal', $tahunIni)
                ->count();

            $jumlahHadir = \App\Models\Kehadiran::where('siswa_id', $siswa->id)
                ->where('status', 'hadir')
                ->whereMonth('tanggal', $bulanIni)
                ->whereYear('tanggal', $tahunIni)
                ->count();

            $kehadiranPersen = $totalKehadiran > 0
                ? round(($jumlahHadir / $totalKehadiran) * 100, 2) . '%'
                : '0%';

            // Hitung peringkat kelas berdasarkan semester & tahun ajaran
            $peringkat = 0;
            $totalSiswa = 0;

            if ($kelas) {
                $siswaKelas = $kelas->siswa;

                $rankingList = $siswaKelas->map(function ($s) use ($semester, $tahunAjaran) {
                    $avg = \App\Models\Nilai::where('siswa_id', $s->id)
                        ->where('semester', $semester)
                        ->where('tahun_ajaran', $tahunAjaran)
                        ->avg('nilai') ?? 0;

                    return [
                        'id' => $s->id,
                        'rata' => $avg
                    ];
                })->sortByDesc('rata')->values();

                $peringkat = $rankingList->search(fn($s) => $s['id'] === $siswa->id) + 1;
                $totalSiswa = $rankingList->count();
            }

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'siswa' => [
                    'nama' => $siswa->nama,
                    'nis' => $siswa->nis,
                    'nisn' => $siswa->nisn,
                    'jenis_kelamin' => $siswa->jenis_kelamin,
                    'kelas' => $kelas?->nama_kelas,
                    'alamat' => $siswa->alamat,
                    'phone' => $siswa->phone,
                    'birthDate' => $siswa->tanggal_lahir,
                    'foto' => $siswa->foto,
                ],
                'stats' => [
                    'nilai_rata' => $nilaiRata,
                    'kehadiran_persen' => $kehadiranPersen,
                    'peringkat_kelas' => "$peringkat / $totalSiswa",
                ],
                'recent_activity' => [
                    ['title' => 'Nilai Matematika', 'description' => 'Dapat nilai 90', 'time' => '2 hari lalu'],
                    ['title' => 'Kehadiran', 'description' => 'Hadir tepat waktu', 'time' => 'Hari ini'],
                    ['title' => 'Pengumuman Baru', 'description' => 'Libur minggu depan', 'time' => '1 hari lalu'],
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Error di SiswaController: ' . $e->getMessage());
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getNilaiAkademik(Request $request)
    {
        $siswa = \App\Models\Siswa::where('user_id', auth()->id())->first();
        $siswaId = $siswa?->id ?? null;

        $semester = $request->input('semester');
        $tahunAjaran = $request->input('tahun_ajaran');

        $nilai = DB::table('nilai')
            ->join('mata_pelajaran', 'nilai.mapel_id', '=', 'mata_pelajaran.id')
            ->leftJoin('guru_mapel', 'mata_pelajaran.id', '=', 'guru_mapel.mapel_id')
            ->leftJoin('guru', 'guru_mapel.guru_id', '=', 'guru.id')
            ->select(
                'mata_pelajaran.nama_mapel as mapel',
                'guru.nama_lengkap as guru',
                'nilai.mapel_id',
                'nilai.semester',
                DB::raw("MAX(CASE WHEN jenis_nilai = 'Tugas' THEN nilai ELSE NULL END) as tugas"),
                DB::raw("MAX(CASE WHEN jenis_nilai = 'UTS' THEN nilai ELSE NULL END) as uts"),
                DB::raw("MAX(CASE WHEN jenis_nilai = 'UAS' THEN nilai ELSE NULL END) as uas"),
                DB::raw("AVG(nilai) as nilai_akhir")
            )
            ->where('nilai.siswa_id', $siswaId)
            ->when($semester, fn($q) => $q->where('nilai.semester', $semester))
            ->when($tahunAjaran, fn($q) => $q->where('nilai.tahun_ajaran', $tahunAjaran))
            ->groupBy('nilai.mapel_id', 'nilai.semester', 'mata_pelajaran.nama_mapel', 'guru.nama_lengkap')
            ->get();

        $data = $nilai->map(function ($item) {
            $item->grade = $this->hitungGrade($item->nilai_akhir);
            $item->keterangan = $item->nilai_akhir >= 75 ? 'Lulus' : 'Tidak Lulus';
            return $item;
        });

        return response()->json($data);
    }

    private function hitungGrade($nilai)
    {
        return match (true) {
            $nilai >= 90 => 'A',
            $nilai >= 85 => 'A-',
            $nilai >= 80 => 'B+',
            $nilai >= 75 => 'B',
            $nilai >= 70 => 'C+',
            $nilai >= 65 => 'C',
            default => 'D',
        };
    }

    public function kehadiran(Request $request)
    {
        $userId = auth()->id();

        // Ambil siswa berdasarkan user_id
        $siswa = Siswa::where('user_id', $userId)->first();

        if (!$siswa) {
            return response()->json(['message' => 'Data siswa tidak ditemukan'], 404);
        }

        $bulan = (int) $request->query('bulan');
        $tahun = (int) $request->query('tahun');

        $query = Kehadiran::where('siswa_id', $siswa->id);

        if (!is_null($bulan) && !is_null($tahun)) {
            $query->whereMonth('tanggal', $bulan + 1)
                ->whereYear('tanggal', $tahun);
        }

        $data = $query->orderBy('tanggal')->get();

        return response()->json($data);
    }
}
