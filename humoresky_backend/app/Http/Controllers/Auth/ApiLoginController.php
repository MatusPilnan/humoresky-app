<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ApiLoginController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function apiLogin(Request $request)
    {
        $login = $request->input('login');
        $password = $request->input('password');
        if (Auth::attempt(['email' => $login, 'password' => $password]) || Auth::attempt(['name' => $login, 'password' => $password])) {
            $token = Auth::user()->api_token;
            return response()->json(['api_token' => $token], 200, ["Cotent-Type" => 'application/json']);
        }
        return response('Prihlasovanie zlyhalo', 401);
    }
}
