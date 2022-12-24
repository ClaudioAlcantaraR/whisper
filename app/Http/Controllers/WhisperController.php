<?php

namespace App\Http\Controllers;

use App\Models\Whisper;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhisperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Whispers/Index', [
            'whispers' => Whisper::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
        $request->user()->whispers()->create($validated);

        return redirect(route('whispers.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Whisper  $whisper
     * @return \Illuminate\Http\Response
     */
    public function show(Whisper $whisper)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Whisper  $whisper
     * @return \Illuminate\Http\Response
     */
    public function edit(Whisper $whisper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Whisper  $whisper
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Whisper $whisper)
    {
        $this->authorize('update', $whisper);
 
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
 
        $whisper->update($validated);
 
        return redirect(route('whispers.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Whisper  $whisper
     * @return \Illuminate\Http\Response
     */
    public function destroy(Whisper $whisper)
    {
        $this->authorize('delete', $whisper);
        $whisper->delete();
        return redirect(route('whispers.index'));
    }
}
