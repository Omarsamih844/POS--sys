<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categorie_imprimantes', function (Blueprint $table) {
            $table->id('id_categorie_imprimante');

            $table->unsignedBigInteger('id_categorie')->nullable();
            $table->foreign('id_categorie')->references('id_categorie')->on('categories')->onDelete('set null')->onUpdate('cascade');

            $table->unsignedBigInteger('id_imprimante')->nullable();
            $table->foreign('id_imprimante')->references('id_imprimante')->on('imprimantes')->onDelete('set null')->onUpdate('cascade');

            $table->string('type_imprimante')->nullable();

            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorie_imprimantes');
    }
};
