<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    protected $table = 'pengumuman';
    protected $fillable = [
        'judul',
        'konten',
        'kategori_id',
        'prioritas_id',
        'tanggal_mulai',
        'tanggal_berakhir',
        'dibuat_oleh',
        'status',
        'is_pinned',
        'lampiran'
    ];

    public function kategori()
    {
        return $this->belongsTo(KategoriPengumuman::class, 'kategori_id');
    }
    public function prioritas()
    {
        return $this->belongsTo(PrioritasPengumuman::class, 'prioritas_id');
    }
    public function pembuat()
    {
        return $this->belongsTo(User::class, 'dibuat_oleh');
    }
    public function targetRoles()
    {
        return $this->belongsToMany(Role::class, 'target_pengumuman', 'pengumuman_id', 'role_id');
    }
    public function dibacaOleh()
    {
        return $this->belongsToMany(User::class, 'pengumuman_dibaca', 'pengumuman_id', 'user_id')->withTimestamps();
    }
}
