<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index()
    {
        return Log::with(['person', 'area'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'person_id' => 'required|exists:persons,id',
            'area_id' => 'required|exists:areas,id',
            'log_date' => 'required|date',
        ]);

        return Log::create($validated);
    }

    public function show($id)
    {
        return Log::with(['person', 'area'])->findOrFail($id);
    }

    public function destroy($id)
    {
        return Log::destroy($id);
    }
}
