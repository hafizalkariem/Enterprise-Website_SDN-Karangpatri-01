<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengumumanDibaca extends Model
{
    protected $table = 'pengumuman_dibaca';
    protected $fillable = ['pengumuman_id', 'user_id', 'dibaca_pada'];
}
