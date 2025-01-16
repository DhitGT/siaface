<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelBerita extends Model
{
    use HasFactory;


    protected $fillable = ['title', 'content', 'cover'];
}
