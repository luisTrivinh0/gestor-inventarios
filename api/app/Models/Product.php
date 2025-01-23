<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Define os campos que podem ser preenchidos
    protected $fillable = [
        'name',
        'description',
        'code',
        'brand',
    ];
}
