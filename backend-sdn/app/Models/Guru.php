<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Guru extends Model
{
    protected $table = 'guru';

    protected $fillable = [
        'user_id',
        'nip',
        'nama_lengkap',
        'mata_pelajaran_id',
        'no_hp',
        'alamat',
    ];

    // Relasi many-to-many ke mata pelajaran
    public function mapel(): BelongsToMany
    {
        return $this->belongsToMany(MataPelajaran::class, 'guru_mapel', 'guru_id', 'mapel_id');
    }
    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class, 'guru_kelas', 'guru_id', 'kelas_id');
    }
}
