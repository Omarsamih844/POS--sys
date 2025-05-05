<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\TableController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('pos.index');
});

// Make POS page accessible without authentication
Route::get('/pos', [PosController::class, 'index'])->name('pos.index');

// Protected routes that require authentication server-side
Route::middleware(['auth', 'verified'])->group(function () {
    // Redirect dashboard to POS
    Route::get('/dashboard', function () {
        return redirect()->route('pos.index');
    })->name('dashboard');

    Route::post('/pos/orders', [PosController::class, 'storeOrder'])->name('pos.orders.store');
    
    // Tables management routes
    Route::get('/tables', [TableController::class, 'index'])->name('tables.index');
    Route::patch('/tables/{table}/status', [TableController::class, 'updateStatus'])->name('tables.update.status');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';
