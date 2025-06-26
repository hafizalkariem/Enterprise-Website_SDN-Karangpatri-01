<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TargetPengumuman extends Model
{
    protected $table = 'target_pengumuman';
    protected $fillable = ['pengumuman_id', 'role_id'];
}
