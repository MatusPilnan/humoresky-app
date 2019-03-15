<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/vtip', 'JokeController@show');
Route::get('/vtipy', 'JokeController@index');

Route::post('/login', 'Auth\ApiLoginController@apiLogin');
Route::post('/register', 'Auth\ApiRegisterController@register');

Route::middleware('auth:api')->post('/vtip/hodnotenie', 'JokeController@rate');
