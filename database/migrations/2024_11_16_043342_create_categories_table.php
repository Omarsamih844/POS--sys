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
        Schema::create('categories', function (Blueprint $table) {
            $table->id('id_categorie');
            $table->string('libelle_categorie')->unique();
            $table->integer('abrege_classement_categorie')->nullable();
            $table->boolean('exclure_categorie_chiffre_affaires')->default(false);
            $table->string('image_categorie')->nullable();
            $table->string('couleur_categorie')->nullable();
            $table->boolean('categorie_est_activee')->default(false);
            $table->unsignedBigInteger('id_mesure')->nullable();
            $table->foreign('id_mesure')->references('id_mesure')->on('mesures')->onDelete('set null')->onUpdate('cascade');

            $table->unsignedBigInteger('id_taxe')->nullable();
            $table->foreign('id_taxe')->references('id_taxe')->on('taxes')->onDelete('set null')->onUpdate('cascade');

            $table->unsignedBigInteger('sous_categories_associees_categories')->nullable();
            $table->foreign('sous_categories_associees_categories')->references('id_categorie')->on('categories')->onDelete('set null')->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
