<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['section_id', 'name', 'image', 'description'];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }
}
