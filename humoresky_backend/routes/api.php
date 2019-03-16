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

//zobrazovanie a v indexovanie vtipu
Route::get('/vtip', 'JokeController@show');
Route::get('/vtipy', 'JokeController@index');

//prihlasovanie
Route::post('/login', 'Auth\ApiLoginController@apiLogin');
Route::post('/register', 'Auth\ApiRegisterController@register');

//manipulacia s vtipmi
Route::middleware('auth:api')->post('/vtip/uloz', 'JokeController@store');
Route::middleware('auth:api')->post('/vtip/uprav', 'JokeController@update');
Route::middleware('auth:api')->delete('/vtip/vymaz', 'JokeController@delete');
Route::middleware('auth:api')->post('/vtip/hodnotenie', 'JokeController@rate');
