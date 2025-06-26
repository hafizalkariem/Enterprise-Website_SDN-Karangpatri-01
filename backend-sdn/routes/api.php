<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\GuruController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/login', function () {
    return response()->json(['message' => 'Redirected to login.'], 401);
})->name('login');

Route::middleware(['auth:sanctum'])->get('/siswa/dashboard', [SiswaController::class, 'index']);
Route::middleware('auth:sanctum')->get('/nilai', [SiswaController::class, 'getNilaiAkademik']);
Route::middleware('auth:sanctum')->get('/siswa/kehadiran', [SiswaController::class, 'kehadiran']);
Route::middleware('auth:sanctum')->get('/siswa/pengumuman', [SiswaController::class, 'pengumuman']);
Route::middleware('auth:sanctum')->get('/guru/dashboard', [GuruController::class, 'dashboard']);

Route::middleware(['auth:sanctum'])->group(function () {

    // Pengumuman routes
    Route::prefix('pengumuman')->group(function () {

        // Get all pengumuman with filtering and search
        // GET /api/pengumuman?search=keyword&kategori=akademik
        Route::get('/', [PengumumanController::class, 'index'])
            ->name('api.pengumuman.index');

        // Get all categories for filter dropdown
        // GET /api/pengumuman/categories
        Route::get('/categories', [PengumumanController::class, 'getCategories'])
            ->name('api.pengumuman.categories');

        // Get single pengumuman detail
        // GET /api/pengumuman/{id}
        Route::get('/{id}', [PengumumanController::class, 'show'])
            ->name('api.pengumuman.show')
            ->where('id', '[0-9]+');

        // Mark pengumuman as read
        // POST /api/pengumuman/{id}/mark-read
        Route::post('/{id}/mark-read', [PengumumanController::class, 'markAsRead'])
            ->name('api.pengumuman.mark-read')
            ->where('id', '[0-9]+');
    });
});
