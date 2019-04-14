<?php

namespace App\Http\Controllers;

use Auth;
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
        error_log('rob nieco');
        if (auth()->user())
        {
            error_log('Whaddup');
            $jokes = Joke::where('user_id', '==', Auth::id())->orderBy('created_at', 'desc')->paginate(10);
            return response($jokes->toJson(), 200, ['Content-Type' => 'application/json']);
        } 
        /*else {
            error_log('napicu');
            $jokes = Joke::orderBy('created_at', 'desc')->paginate(10);
        }   

        return response($jokes->toJson(), 200, ['Content-Type' => 'application/json']);*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (auth()->user())
        {
            $overene = $request->validate([
                'nazov' => 'required',
                'popis' => 'nullable',
                'telo' => 'required_without:obrazok',
                'obrazok' => 'required_without:telo'
            ]);

            $joke = new Joke;

            $joke->nazov = $request->nazov;
            $joke->popis = $request->popis;
            $joke->telo = $request->telo;
            $joke->obrazok = $request->obrazok;
            $joke->user_id = Auth::id();
    
            $joke->save();

            return response()->json(['message' => 'Ulozene'], 200);
        }

        return response()->json(['message' => 'Neprihlaseny!'], 401);
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
        if (auth()->user())
        {
            $overene = $request->validate([
                'joke' => 'required|numeric|min:0',
                'nazov' => 'required',
                'popis' => 'nullable',
                'telo' => 'required_without:obrazok',
                'obrazok' => 'required_without:telo|image'
            ]);
            $joke = Joke::find($overene['joke']);
            if (is_null($joke)) {
                return response()->json(['message' => 'Vtip nenajdeny'], 404);
            }

            $joke->nazov = $request->nazov;
            $joke->popis = $request->popis;
            $joke->telo = $request->telo;
            $joke->obrazok = $request->obrazok;
            $joke->user_id = Auth::id();
    
            $joke->save();

            return response()->json(['message' => 'Upravene'], 200);
        }

        return response()->json(['message' => 'Neprihlaseny!'], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Joke  $joke
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        if (auth()->user())
        {
            $overene = $request->validate([
                'joke' => 'required|numeric|min:0'
            ]);
            $joke = Joke::find($overene['joke']);
            if (is_null($joke)) {
                return response()->json(['message' => 'Vtip nenajdeny'], 404);
            }

            $joke->delete();

            return response()->json(['message' => 'Vymazane'], 200);
        }

        return response()->json(['message' => 'Neprihlaseny!'], 401);
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
