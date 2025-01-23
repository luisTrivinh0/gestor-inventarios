<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Person extends Authenticatable
{
    use HasFactory;

    protected $table = "persons";

    protected $fillable = [
        'name',
        'document',
        'has_login',
        'notification_token',
        'id_user',
    ];

    /**
     * Relacionamento com a tabela users.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
