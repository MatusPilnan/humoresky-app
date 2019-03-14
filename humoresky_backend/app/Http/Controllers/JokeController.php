<?php

namespace App\Http\Controllers;

use App\Joke;
use Illuminate\Http\Request;

class JokeController extends Controller
{
    /**
     * Display a listing of the jokes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (isset($request->user_id))
            $jokes = Joke::all()->where('user_id', '==', Auth::id())->orderBy('created_at', 'desc')->paginate(10);
        else
            $jokes = Joke::all()->orderBy('created_at', 'desc')->paginate(10);

        return response($jokes->toJson(), 200, ['Content-Type' => 'application/json']);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $joke = new Joke;

        $joke->nazov = $request->nazov;
        $joke->popis = $request->popis;
        $joke->telo = $request->telo;
        $joke->obrazok = $request->obrazok; //bude treba porobic
        $joke->user_id = Auth::id(); //neni som si isty tymto, asi zle

        $joke->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Joke  $joke
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $joke = Joke::find($request->query('joke'));
        if (is_null($joke)) {
            return response()->json(['message' => 'Vtip nenajdeny.'], 404);
        }
        return response($joke->toJson(), 200, ['Content-Type' => 'application/json']);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Joke  $joke
     * @return \Illuminate\Http\Response
     */
    public function edit(Joke $joke)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Joke  $joke
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Joke $joke)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Joke  $joke
     * @return \Illuminate\Http\Response
     */
    public function destroy(Joke $joke)
    {
        //
    }

    public function rate(Request $request)
    {
        if (auth()->user())
        {
            $overene = $request->validate([
                'rating' => 'required|numeric|min:1|max:5'
            ]);

            return response()->json(['message' => 'Ohodnotene'], 200);
        }

        return response()->json(['message' => 'Neprihlaseny!'], 401);
    }
}
