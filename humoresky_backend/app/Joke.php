<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Joke extends Model
{
    public function user()
    {
        return $this->belongsTo(User);
    }
}
