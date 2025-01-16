<?php

namespace App\Http\Controllers;

use App\Models\ModelBerita;
use Illuminate\Http\Request;

class ModelBeritaController extends Controller
{
    public function index()
    {
        $beritas = ModelBerita::all();
        return view('berita.index', compact('beritas'));
    }

    public function create()
    {
        return view('berita.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'cover' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image
        ]);

        $coverPath = null;

        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public'); // Save to 'storage/app/public/covers'
        }

        ModelBerita::create([
            'title' => $request->title,
            'content' => $request->content,
            'cover' => $coverPath,
        ]);

        return redirect()->route('berita.index')->with('success', 'Berita created successfully.');
    }


    public function edit($id)
    {
        $berita = ModelBerita::findOrFail($id);
        return view('berita.edit', compact('berita'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $berita = ModelBerita::findOrFail($id);

        if ($request->hasFile('cover')) {
            // Delete the old cover file if it exists
            if ($berita->cover) {
                \Storage::disk('public')->delete($berita->cover);
            }
            $coverPath = $request->file('cover')->store('covers', 'public');
            $berita->cover = $coverPath;
        }

        $berita->title = $request->title;
        $berita->content = $request->content;
        $berita->save();

        return redirect()->route('berita.index')->with('success', 'Berita updated successfully.');
    }


    public function destroy($id)
    {
        $berita = ModelBerita::findOrFail($id);

        if ($berita->cover) {
            \Storage::disk('public')->delete($berita->cover);
        }

        $berita->delete();

        return redirect()->route('berita.index')->with('success', 'Berita deleted successfully.');
    }


    public function getAllBerita()
    {
        $berita = ModelBerita::get();
        return response()->json($berita);
    }

}

