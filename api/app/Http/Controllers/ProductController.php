<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'code' => 'required|unique:products',
            'brand' => 'nullable',
        ]);

        return Product::create($validated);
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'code' => 'required|unique:products,code,' . $id,
            'brand' => 'nullable',
        ]);

        $product->update($validated);

        return $product;
    }

    public function destroy($id)
    {
        return Product::destroy($id);
    }
}
