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
        Schema::create('produits', function (Blueprint $table) {
            $table->id('id_produit');     
            $table->string('code_produit_automatique')->unique();
            $table->string('libelle_produit')->nullable();
            $table->string('image_produit')->nullable();
            $table->string('code_barre_produit')->nullable();
            $table->boolean('produit_est_actif')->default(1);

            $table->unsignedBigInteger('id_categorie');
            $table->foreign('id_categorie')->references('id_categorie')->on('categories')->onDelete('restrict')->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
