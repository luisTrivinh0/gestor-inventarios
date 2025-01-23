<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function index()
    {
        return Area::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'entry_point' => 'required',
            'exit_point' => 'required',
        ]);

        return Area::create($validated);
    }

    public function show($id)
    {
        return Area::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $area = Area::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required',
            'entry_point' => 'required',
            'exit_point' => 'required',
        ]);

        $area->update($validated);

        return $area;
    }

    public function destroy($id)
    {
        return Area::destroy($id);
    }
}
