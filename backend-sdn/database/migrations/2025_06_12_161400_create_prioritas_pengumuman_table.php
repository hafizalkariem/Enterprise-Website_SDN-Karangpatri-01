<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrioritasPengumumanTable extends Migration
{
    public function up()
    {
        Schema::create('prioritas_pengumuman', function (Blueprint $table) {
            $table->id();
            $table->string('level');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('prioritas_pengumuman');
    }
}
