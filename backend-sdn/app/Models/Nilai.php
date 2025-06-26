<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Nilai extends Model
{
    use HasFactory;

    protected $table = 'nilai'; // ⬅️ Ini penting kalau kamu pakai nama tunggal
    protected $fillable = ['siswa_id', 'mapel', 'nilai', 'semester', 'tahun_ajaran'];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
