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
        return response()->json(['joke' => $joke], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Joke  $joke
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $joke = Joke::find($request->query('joke'));

        $joke->nazov = $request->nazov;
        $joke->popis = $request->popis;
        $joke->telo = $request->telo;
        $joke->obrazok = $request->obrazok; //bude treba porobic
        $joke->user_id = Auth::id(); //neni som si isty tymto, asi zle

        $joke->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Joke  $joke
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $joke = Joke::find($request->query('joke'));

        $joke->delete();
    }

    public function rate(Request $request)
    {
        if (auth()->user())
        {
            $overene = $request->validate([
                'rating' => 'required|numeric|min:1|max:5',
                'joke' => 'required|numeric|min:0'
            ]);
            $joke = Joke::find($overene['joke']);
            if (is_null($joke)) {
                return response()->json(['message' => 'Vtip nenajdeny'], 404);
            }

            $temp = $joke->hodnotenie * $joke->pocet_hodnoteni;
            $joke->pocet_hodnoteni++;
            $joke->hodnotenie = ($temp + $overene['rating']) / $joke->pocet_hodnoteni;
            $joke->save();

            return response()->json(['message' => 'Ohodnotene', 'rating' => $joke->hodnotenie], 200);
        }

        return response()->json(['message' => 'Neprihlaseny!'], 401);
    }
}
