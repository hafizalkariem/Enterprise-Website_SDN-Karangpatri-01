<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateNilaiTable extends Migration
{
    public function up()
    {
        Schema::table('nilai', function (Blueprint $table) {
            // Cek dan drop kolom mapel lama (string)
            if (Schema::hasColumn('nilai', 'mapel')) {
                $table->dropColumn('mapel');
            }

            // Tambahkan mapel_id hanya jika belum ada
            if (!Schema::hasColumn('nilai', 'mapel_id')) {
                $table->unsignedBigInteger('mapel_id')->nullable()->after('siswa_id');
                $table->foreign('mapel_id')->references('id')->on('mata_pelajaran')->onDelete('cascade');
            }

            // Tambahkan jenis_nilai jika belum ada
            if (!Schema::hasColumn('nilai', 'jenis_nilai')) {
                $table->string('jenis_nilai')->after('mapel_id');
            }

            // Tambahkan keterangan jika belum ada
            if (!Schema::hasColumn('nilai', 'keterangan')) {
                $table->string('keterangan')->nullable()->after('jenis_nilai');
            }

            // Pastikan timestamps ada
            if (!Schema::hasColumns('nilai', ['created_at', 'updated_at'])) {
                $table->timestamps();
            }
        });
    }

    public function down()
    {
        Schema::table('nilai', function (Blueprint $table) {
            if (Schema::hasColumn('nilai', 'mapel_id')) {
                $table->dropForeign(['mapel_id']);
                $table->dropColumn('mapel_id');
            }

            if (Schema::hasColumn('nilai', 'jenis_nilai')) {
                $table->dropColumn('jenis_nilai');
            }

            if (Schema::hasColumn('nilai', 'keterangan')) {
                $table->dropColumn('keterangan');
            }

            if (Schema::hasColumns('nilai', ['created_at', 'updated_at'])) {
                $table->dropTimestamps();
            }
        });
    }
}
