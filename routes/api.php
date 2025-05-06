<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\TestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Get authenticated user (requires authentication)
Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'currentUser']);

// Get all users for login dropdown - this is publicly accessible
Route::get('/users', [UserController::class, 'index']); 

// Test route for debugging
Route::get('/test-users', [TestController::class, 'testUsers']); 