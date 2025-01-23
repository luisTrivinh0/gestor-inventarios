<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    // Define os campos que podem ser preenchidos
    protected $fillable = [
        'name',
        'entry_point',
        'exit_point',
    ];

    /**
     * Relacionamento: Uma área pode ter vários logs.
     */
    public function logs()
    {
        return $this->hasMany(Log::class, 'area_id');
    }
}
