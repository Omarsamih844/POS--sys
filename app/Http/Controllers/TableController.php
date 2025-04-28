<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
    /**
     * Display a listing of the tables.
     */
    public function index()
    {
        $tables = Table::all();
        return Inertia::render('Tables/Index', [
            'tables' => $tables
        ]);
    }

    /**
     * Update the status of a specific table.
     */
    public function updateStatus(Request $request, Table $table)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:available,occupied,reserved'
        ]);

        $table->update($validated);

        return response()->json([
            'message' => 'Table status updated successfully',
            'table' => $table
        ]);
    }
} 