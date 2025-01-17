<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('absens', function (Blueprint $table) {
            $table->text('keterangan'); // Optional, you can make it nullable in case no image is provided
        });
    }
    
    public function down()
    {
        Schema::table('absens', function (Blueprint $table) {
            $table->dropColumn('keterangan');
        });
    }
};
