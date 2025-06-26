<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrioritasPengumuman extends Model
{
    protected $table = 'prioritas_pengumuman';
    protected $fillable = ['level'];
}
