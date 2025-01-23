<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    // Define os campos que podem ser preenchidos
    protected $fillable = [
        'person_id',
        'area_id',
        'log_date',
    ];

    /**
     * Relacionamento: Um log pertence a uma pessoa.
     */
    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id');
    }

    /**
     * Relacionamento: Um log pertence a uma área.
     */
    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id');
    }
}
