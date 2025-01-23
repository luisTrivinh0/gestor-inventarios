<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'responsible',
        'path',
    ];

    // Relacionamento com o usuário responsável
    public function user()
    {
        return $this->belongsTo(User::class, 'responsible');
    }
}