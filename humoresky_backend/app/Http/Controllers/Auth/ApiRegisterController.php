<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

class ApiRegisterController extends RegisterController
{
    public function register(Request $r)
    {
        $errors = $this->validator($r->all())->errors();

        if(count($errors))
        {
            return response(['errors' => $errors], 400);
        }

        event(new Registered($user = $this->create($r->all())));

        $this->guard()->login($user);

        return response()->json(['message' => 'Uspesne zapojeny', 'api_token' => $user->api_token]);
    }
}
