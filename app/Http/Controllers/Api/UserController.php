<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Get the authenticated user
     */
    public function currentUser(Request $request)
    {
        Log::info('Fetching authenticated user');
        
        if ($request->user()) {
            return response()->json($request->user());
        }
        
        return response()->json(['message' => 'Unauthenticated'], 401);
    }
    
    /**
     * Get all users for login dropdown
     */
    public function index()
    {
        try {
            // Log that we're accessing this endpoint
            Log::info('Fetching users for dropdown from UserController');
            
            // Get all users from database
            $users = User::select('id', 'first_name', 'last_name', 'email')
                ->orderBy('first_name')
                ->get();
                
            // Log how many users were found
            Log::info('Found ' . $users->count() . ' users');
            
            // Add debugging information in non-production environments
            if (app()->environment() !== 'production') {
                Log::debug('User data: ' . json_encode($users));
            }
            
            // Return the users as JSON
            return response()->json($users);
        } catch (\Exception $e) {
            // Log any errors
            Log::error('Error fetching users: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            // Return error message
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Failed to retrieve users from database'
            ], 500);
        }
    }
}
