<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengumumanTable extends Migration
{
    public function up()
    {
        Schema::create('pengumuman', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('konten');
            $table->foreignId('kategori_id')->constrained('kategori_pengumuman')->onDelete('cascade');
            $table->foreignId('prioritas_id')->constrained('prioritas_pengumuman')->onDelete('cascade');
            $table->date('tanggal_mulai')->nullable();
            $table->date('tanggal_berakhir')->nullable();
            $table->foreignId('dibuat_oleh')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['draft', 'aktif', 'nonaktif'])->default('draft');
            $table->boolean('is_pinned')->default(false);
            $table->string('lampiran')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pengumuman');
    }
}
