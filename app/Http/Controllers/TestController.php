<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TestController extends Controller
{
    /**
     * Test endpoint to check if we can get all users
     */
    public function testUsers()
    {
        try {
            // Log access to this test endpoint
            Log::info('Test endpoint: Fetching users');
            
            // Get all users from database
            $users = User::select('id', 'first_name', 'last_name', 'email')
                ->orderBy('first_name')
                ->get();
                
            // Log how many users were found
            Log::info('Found ' . $users->count() . ' users');
            
            // Return detailed response for debugging
            return response()->json([
                'success' => true,
                'user_count' => $users->count(),
                'users' => $users,
                'message' => 'Users fetched successfully'
            ]);
            
        } catch (\Exception $e) {
            // Log any errors
            Log::error('Error in test users endpoint: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            // Return error with details
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'message' => 'Failed to retrieve users from database'
            ], 500);
        }
    }
}
