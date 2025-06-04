<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Order;
use App\Models\Table;
use App\Models\Product;
use App\Models\Category;

class SyncController extends Controller
{
    /**
     * Sync orders from client to server
     */
    public function syncOrders(Request $request)
    {
        try {
            $orders = $request->all();
            
            if (!is_array($orders)) {
                $orders = [$orders];
            }
            
            $results = [];
            
            foreach ($orders as $orderData) {
                // Check if order already exists
                $existingOrder = Order::where('id', $orderData['id'])->first();
                
                if ($existingOrder) {
                    // Update existing order
                    $existingOrder->update($orderData);
                    $results[] = [
                        'id' => $existingOrder->id,
                        'status' => 'updated',
                        'success' => true
                    ];
                } else {
                    // Create new order
                    $newOrder = Order::create($orderData);
                    $results[] = [
                        'id' => $newOrder->id,
                        'status' => 'created',
                        'success' => true
                    ];
                }
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Orders synced successfully',
                'results' => $results
            ]);
        } catch (\Exception $e) {
            Log::error('Error syncing orders: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error syncing orders: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get initial data for offline use
     */
    public function getInitialData()
    {
        try {
            // Get categories with products
            $categories = Category::with('products')->get();
            
            // Get tables
            $tables = Table::all();
            
            // Get recent orders (limit to last 50)
            $orders = Order::latest()->take(50)->get();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'categories' => $categories,
                    'tables' => $tables,
                    'orders' => $orders
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting initial data: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error getting initial data: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Sync tables from client to server
     */
    public function syncTables(Request $request)
    {
        try {
            $tables = $request->all();
            
            if (!is_array($tables)) {
                $tables = [$tables];
            }
            
            $results = [];
            
            foreach ($tables as $tableData) {
                // Check if table already exists
                $existingTable = Table::where('id', $tableData['id'])->first();
                
                if ($existingTable) {
                    // Update existing table
                    $existingTable->update($tableData);
                    $results[] = [
                        'id' => $existingTable->id,
                        'status' => 'updated',
                        'success' => true
                    ];
                } else {
                    // Create new table
                    $newTable = Table::create($tableData);
                    $results[] = [
                        'id' => $newTable->id,
                        'status' => 'created',
                        'success' => true
                    ];
                }
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Tables synced successfully',
                'results' => $results
            ]);
        } catch (\Exception $e) {
            Log::error('Error syncing tables: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error syncing tables: ' . $e->getMessage()
            ], 500);
        }
    }
} 