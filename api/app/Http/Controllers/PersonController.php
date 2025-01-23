<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PersonController extends Controller
{
    public function index()
    {
        return Person::all();
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'document' => 'required|unique:persons',
        ]);

        // Cria o usuário se has_login for true
        // if (isset($validated['has_login'])) {
        //     $user = User::create([
        //         'name' => $validated['name'],
        //         'email' => $validated['email'],
        //         'password' => Hash::make($validated['password']),
        //     ]);
        //     $validated['id_user'] = $user->id;
        // }

        return Person::create($validated);
    }

    public function show($id)
    {
        return Person::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required',
            'document' => 'required|unique:persons,document,' . $id,
        ]);

        // Atualiza ou cria o usuário se has_login for true
        // if (isset($validated['has_login'])) {
        //     if (!$person->id_user) {
        //         $user = User::create([
        //             'name' => $validated['name'],
        //             'email' => $validated['email'],
        //             'password' => Hash::make($validated['password']),
        //         ]);
        //         $validated['id_user'] = $user->id;
        //     } else {
        //         $user = User::findOrFail($person->id_user);
        //         $user->update([
        //             'name' => $validated['name'],
        //             'email' => $validated['email'],
        //             'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
        //         ]);
        //     }
        // }

        $person->update($validated);

        return $person;
    }
 
    public function destroy($id)
    {
        return Person::destroy($id);
    }
}

