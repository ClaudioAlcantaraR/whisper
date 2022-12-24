<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Whisper extends Model
{
    use HasFactory;

    public function user()
    {
        // Un whisper pertenece a un usuario
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'message',
    ];
}
