<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Category;
use App\Models\Commande;
use App\Models\CommandeProduit;
use App\Models\Order;
use App\Models\Product;
use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PosController extends Controller
{
    public function index()
    {
        // Map the Categorie model to match the expected format in the frontend
        $categories = Categorie::where('categorie_est_activee', true)
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id_categorie,
                    'name' => $category->libelle_categorie,
                    'color' => $category->couleur_categorie ?? '#3B82F6',
                    'description' => '', // Not available in the current model
                ];
            });

        // Map the Produit model to match the expected format in the frontend
        $products = Produit::where('produit_est_actif', true)
            ->with('categorie')
            ->get()
            ->map(function ($produit) {
                // Get the price from the first active prix_mode_vente if available
                $price = $produit->prixModeVentes()
                    ->where('prix_mode_vente_est_actif', true)
                    ->first()
                    ?->prix_vente ?? 0;

                return [
                    'id' => $produit->id_produit,
                    'name' => $produit->libelle_produit,
                    'description' => '',
                    'price' => $price,
                    'image' => $produit->image_produit,
                    'category_id' => $produit->id_categorie,
                    'is_available' => $produit->produit_est_actif,
                ];
            });

        return Inertia::render('Pos/Index', [
            'categories' => $categories,
            'products' => $products
        ]);
    }

    public function storeOrder(Request $request)
    {
        $request->validate([
            'items' => ['required', 'array'],
            'items.*.product_id' => ['required', 'exists:produits,id_produit'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'type' => ['required', 'in:eat_in,takeaway'],
            'table_number' => ['required_if:type,eat_in'],
            'subtotal' => ['required', 'numeric', 'min:0'],
            'tax' => ['required', 'numeric', 'min:0'],
            'total' => ['required', 'numeric', 'min:0'],
        ]);

        // Create a new commande
        $commande = Commande::create([
            'numero_commande' => 'CMD-' . date('YmdHis'),
            'montant_total_ttc' => $request->total,
            'id_mode_vente' => $request->type == 'eat_in' ? 1 : 2, // Assuming 1=eat_in, 2=takeaway
            'id_statut_commande' => 1, // Assuming 1 = pending status
        ]);

        // Add products to the commande
        foreach ($request->items as $item) {
            $produit = Produit::find($item['product_id']);
            
            // Get the price from the first active prix_mode_vente if available
            $price = $produit->prixModeVentes()
                ->where('prix_mode_vente_est_actif', true)
                ->first()
                ?->prix_vente ?? 0;
            
            // Get the tax rate from the categorie's taxe
            $taxRate = $produit->categorie->taxe ? $produit->categorie->taxe->taux_taxe : 0;
            
            // Create the pivot record manually
            CommandeProduit::create([
                'id_commande' => $commande->id_commande,
                'id_produit' => $item['product_id'],
                'quantite_produit_commande' => $item['quantity'],
                'prix_commande_produit' => $price,
                'tva_commande_produit' => $taxRate,
                'total_ttc_commande_produit' => $price * $item['quantity'],
                'date_commande_produit' => now()->format('Y-m-d'),
                'heure_commande_produit' => now()->format('H:i:s'),
                'note_information_commande_produit' => $request->notes ?? null,
            ]);
        }

        return redirect()->back()->with('success', 'Commande créée avec succès!');
    }
}