<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Person;
use App\Models\Area;
use App\Models\Product;

class CSVImportController extends Controller
{
    public function import(Request $request, $type)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $file = $request->file('file');
        $rows = array_map('str_getcsv', file($file->getRealPath()));
        $header = array_map('trim', $rows[0]);
        unset($rows[0]);

        $model = match ($type) {
            'person' => Person::class,
            'area' => Area::class,
            'product' => Product::class,
            default => null,
        };

        if (!$model) {
            return response()->json(['error' => 'Tipo de importação inválido.'], 400);
        }

        foreach ($rows as $row) {
            $data = array_combine($header, $row);
            $model::create($data);
        }

        return response()->json(['message' => 'Dados importados com sucesso.'], 200);
    }

}
