<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Inventory;
use App\Models\Product;

class InventoryController extends Controller
{
    public function index()
    {
        $inventories = Inventory::with('user')->get();
        return response()->json($inventories);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'responsible' => 'required|exists:users,id',
        ]);

        // Cria o arquivo JSON vazio para o inventário
        $path = 'inventories/inventory_' . uniqid() . '.json';
        Storage::disk('local')->put($path, json_encode([]));

        // Cria o registro no banco
        $inventory = Inventory::create([
            'responsible' => $validated['responsible'],
            'path' => $path,
        ]);

        return response()->json($inventory, 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'code' => 'required|exists:products,code',
            'quantity' => 'required|integer|min:1',
        ]);

        $inventory = Inventory::findOrFail($id);

        // Lê o arquivo JSON do inventário
        $items = json_decode(Storage::disk('local')->get($inventory->path), true);

        // Atualiza ou adiciona o item no inventário
        $index = array_search($validated['code'], array_column($items, 'code'));
        if ($index !== false) {
            $items[$index]['quantity'] += $validated['quantity'];
        } else {
            $items[] = [
                'code' => $validated['code'],
                'quantity' => $validated['quantity'],
            ];
        }

        // Atualiza o arquivo JSON
        Storage::disk('local')->put($inventory->path, json_encode($items));

        return response()->json(['message' => 'Item adicionado ao inventário com sucesso.']);
    }

    public function show($id)
    {
        $inventory = Inventory::findOrFail($id);

        // Lê o arquivo JSON
        $items = json_decode(Storage::disk('local')->get($inventory->path), true);

        return response()->json([
            'inventory' => $inventory,
            'items' => $items,
        ]);
    }

    public function destroy($id)
    {
        $inventory = Inventory::findOrFail($id);

        // Remove o arquivo JSON
        Storage::disk('local')->delete($inventory->path);

        // Remove o inventário
        $inventory->delete();

        return response()->json(['message' => 'Inventário excluído.']);
    }
}
