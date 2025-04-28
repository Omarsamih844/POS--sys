<?php

namespace Database\Seeders;

use App\Models\PrixModeVente;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrixModeVenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete existing records
        PrixModeVente::truncate();

        PrixModeVente::insert([
            [
                'id_produit' => 1,
                'id_mode_vente' => 2,
                'prix_vente' => 10.00,
                'prix_mode_vente_est_actif' => 0,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 1,
                'id_mode_vente' => 1,
                'prix_vente' => 12.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 2,
                'id_mode_vente' => 2,
                'prix_vente' => 50.00,
                'prix_mode_vente_est_actif' => 0,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 2,
                'id_mode_vente' => 1,
                'prix_vente' => 52.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 3,
                'id_mode_vente' => 2,
                'prix_vente' => 20.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 3,
                'id_mode_vente' => 1,
                'prix_vente' => 22.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 4,
                'id_mode_vente' => 2,
                'prix_vente' => 33.00,
                'prix_mode_vente_est_actif' => 0,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 4,
                'id_mode_vente' => 1,
                'prix_vente' => 35.00,
                'prix_mode_vente_est_actif' => 0,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 5,
                'id_mode_vente' => 2,
                'prix_vente' => 13.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 5,
                'id_mode_vente' => 1,
                'prix_vente' => 15.00,
                'prix_mode_vente_est_actif' => 0,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 6,
                'id_mode_vente' => 1,
                'prix_vente' => 45.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 6,
                'id_mode_vente' => 2,
                'prix_vente' => 42.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 7,
                'id_mode_vente' => 1,
                'prix_vente' => 35.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 7,
                'id_mode_vente' => 2,
                'prix_vente' => 32.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 8,
                'id_mode_vente' => 1,
                'prix_vente' => 25.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 8,
                'id_mode_vente' => 2,
                'prix_vente' => 22.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 9,
                'id_mode_vente' => 1,
                'prix_vente' => 28.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 9,
                'id_mode_vente' => 2,
                'prix_vente' => 25.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 10,
                'id_mode_vente' => 1,
                'prix_vente' => 12.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'id_produit' => 10,
                'id_mode_vente' => 2,
                'prix_vente' => 10.00,
                'prix_mode_vente_est_actif' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);
    }
}
