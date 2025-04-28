<?php

namespace Database\Seeders;

use App\Models\Produit;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete existing records
        Produit::truncate();

        Produit::insert([
            [
                'code_produit_automatique' => 'code_produit_1',
                'libelle_produit' => 'Coca Cola',
                'image_produit' => 'produits/produit1.jpg',
                'code_barre_produit' => '111111111',
                'id_categorie' => 1,
                'produit_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_2',
                'libelle_produit' => 'BURGER BACON',
                'image_produit' => 'produits/produit2.jpg',
                'code_barre_produit' => '222222222',
                'id_categorie' => 1,
                'produit_est_actif' => 0,
                'created_at' => Carbon::now()->addSeconds(1)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(1)->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_3',
                'libelle_produit' => 'ICE TEA',
                'image_produit' => 'produits/produit3.jpg',
                'code_barre_produit' => '333333333',
                'id_categorie' => 2,
                'produit_est_actif' => 0,
                'created_at' => Carbon::now()->addSeconds(2)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(2)->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_4',
                'libelle_produit' => 'BROWNIE',
                'image_produit' => 'produits/produit4.jpg',
                'code_barre_produit' => '444444444',
                'id_categorie' => 2,
                'produit_est_actif' => 1,
                'created_at' => Carbon::now()->addSeconds(3)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(3)->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_5',
                'libelle_produit' => 'BURGER CHICKEN',
                'image_produit' => 'produits/produit5.jpg',
                'code_barre_produit' => '555555555',
                'id_categorie' => 3,
                'produit_est_actif' => 1,
                'created_at' => Carbon::now()->addSeconds(4)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(4)->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_6',
                'libelle_produit' => 'PIZZA MARGHERITA',
                'image_produit' => 'produits/produit6.jpg',
                'code_barre_produit' => '666666666',
                'id_categorie' => 1,
                'produit_est_actif' => 1,
                'created_at' => Carbon::now()->addSeconds(5)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(5)->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_7',
                'libelle_produit' => 'SALADE CESAR',
                'image_produit' => 'produits/produit7.jpg',
                'code_barre_produit' => '777777777',
                'id_categorie' => 2,
                'produit_est_actif' => 1,
                'created_at' => Carbon::now()->addSeconds(6)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(6)->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_8',
                'libelle_produit' => 'FRIES',
                'image_produit' => 'produits/produit8.jpg',
                'code_barre_produit' => '888888888',
                'id_categorie' => 1,
                'produit_est_actif' => 1,
                'created_at' => Carbon::now()->addSeconds(7)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(7)->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_9',
                'libelle_produit' => 'CHEESECAKE',
                'image_produit' => 'produits/produit9.jpg',
                'code_barre_produit' => '999999999',
                'id_categorie' => 2,
                'produit_est_actif' => 1,
                'created_at' => Carbon::now()->addSeconds(8)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(8)->format('Y-m-d H:i:s')
            ],
            [
                'code_produit_automatique' => 'code_produit_10',
                'libelle_produit' => 'SPRITE',
                'image_produit' => 'produits/produit10.jpg',
                'code_barre_produit' => '101010101',
                'id_categorie' => 1,
                'produit_est_actif' => 1,
                'created_at' => Carbon::now()->addSeconds(9)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->addSeconds(9)->format('Y-m-d H:i:s')
            ]
        ]);
    }
}
