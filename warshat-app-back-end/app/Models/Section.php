<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = ['name', 'image', 'description'];

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
