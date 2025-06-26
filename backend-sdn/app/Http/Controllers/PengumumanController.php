<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use App\Models\KategoriPengumuman;
use App\Models\PrioritasPengumuman;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PengumumanController extends Controller
{
    /**
     * Get all pengumuman with filtering and search
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();

        $query = Pengumuman::with(['kategori', 'prioritas', 'pembuat', 'dibacaOleh'])
            ->where(function ($q) use ($user) {
                // Show pengumuman that targets user's role or has no specific target
                $q->whereHas('targetRoles', function ($roleQuery) use ($user) {
                    $roleQuery->whereIn('role_id', $user->roles->pluck('id'));
                })->orWhereDoesntHave('targetRoles');
            })
            ->orderBy('is_pinned', 'desc')
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('judul', 'like', '%' . $searchTerm . '%')
                    ->orWhere('konten', 'like', '%' . $searchTerm . '%');
            });
        }

        // Category filter
        if ($request->has('kategori') && $request->kategori !== 'semua') {
            $query->whereHas('kategori', function ($q) use ($request) {
                $q->where('nama', $request->kategori);
            });
        }

        $pengumuman = $query->get();

        // Transform data to match frontend expectations
        $transformedData = $pengumuman->map(function ($item) use ($user) {
            // Check if user has read this pengumuman
            $dibaca = $item->dibacaOleh->contains('id', $user->id);

            // Map prioritas level to frontend format
            $prioritasMap = [
                'Tinggi' => 'tinggi',
                'Sedang' => 'sedang',
                'Rendah' => 'rendah'
            ];

            return [
                'id' => $item->id,
                'judul' => $item->judul,
                'kategori' => strtolower($item->kategori->nama ?? 'umum'),
                'prioritas' => $prioritasMap[$item->prioritas->level ?? 'Sedang'] ?? 'sedang',
                'konten' => $item->konten,
                'tanggal_dibuat' => Carbon::parse($item->created_at)->toISOString(),
                'tanggal_berlaku' => $item->tanggal_mulai ? Carbon::parse($item->tanggal_mulai)->toISOString() : null,
                'dibuat_oleh' => $item->pembuat->name ?? 'Admin',
                'status' => $item->status ?? 'aktif',
                'dibaca' => $dibaca,
                'lampiran' => $item->lampiran
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $transformedData
        ]);
    }

    /**
     * Get all categories for filter dropdown
     */
    public function getCategories(): JsonResponse
    {
        $categories = KategoriPengumuman::select('id', 'nama')
            ->orderBy('nama')
            ->get();

        // Transform to match frontend expectations
        $transformedCategories = $categories->map(function ($kategori) {
            return [
                'value' => strtolower($kategori->nama),
                'label' => ucfirst($kategori->nama),
                'id' => $kategori->id
            ];
        });

        // Add "semua" option at the beginning
        $allCategories = collect([
            [
                'value' => 'semua',
                'label' => 'Semua Kategori',
                'id' => null
            ]
        ])->merge($transformedCategories);

        return response()->json([
            'success' => true,
            'data' => $allCategories
        ]);
    }

    /**
     * Get single pengumuman detail
     */
    public function show($id): JsonResponse
    {
        $user = Auth::user();
        $pengumuman = Pengumuman::with(['kategori', 'prioritas', 'pembuat', 'dibacaOleh'])->find($id);

        if (!$pengumuman) {
            return response()->json([
                'success' => false,
                'message' => 'Pengumuman tidak ditemukan'
            ], 404);
        }

        // Check if user has read this pengumuman
        $dibaca = $pengumuman->dibacaOleh->contains('id', $user->id);

        // Map prioritas level to frontend format
        $prioritasMap = [
            'Tinggi' => 'tinggi',
            'Sedang' => 'sedang',
            'Rendah' => 'rendah'
        ];

        $transformedData = [
            'id' => $pengumuman->id,
            'judul' => $pengumuman->judul,
            'kategori' => strtolower($pengumuman->kategori->nama ?? 'umum'),
            'prioritas' => $prioritasMap[$pengumuman->prioritas->level ?? 'Sedang'] ?? 'sedang',
            'konten' => $pengumuman->konten,
            'tanggal_dibuat' => $pengumuman->created_at->toISOString(),
            'tanggal_berlaku' => $pengumuman->tanggal_mulai ? $pengumuman->tanggal_mulai->toISOString() : null,
            'dibuat_oleh' => $pengumuman->pembuat->name ?? 'Admin',
            'status' => $pengumuman->status ?? 'aktif',
            'dibaca' => $dibaca,
            'lampiran' => $pengumuman->lampiran
        ];

        return response()->json([
            'success' => true,
            'data' => $transformedData
        ]);
    }

    /**
     * Mark pengumuman as read
     */
    public function markAsRead($id): JsonResponse
    {
        $user = Auth::user();
        $pengumuman = Pengumuman::find($id);

        if (!$pengumuman) {
            return response()->json([
                'success' => false,
                'message' => 'Pengumuman tidak ditemukan'
            ], 404);
        }

        // Check if already read
        if (!$pengumuman->dibacaOleh->contains('id', $user->id)) {
            // Mark as read
            $pengumuman->dibacaOleh()->attach($user->id, [
                'dibaca_pada' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Pengumuman telah ditandai sebagai dibaca'
        ]);
    }
}
