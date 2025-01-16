<?php
namespace App\Http\Controllers;

use App\Models\ModelGuru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    /**
     * Display a listing of the gurus.
     */
    public function index()
    {
        $gurus = ModelGuru::all();
        return view('guru.index', compact('gurus'));
    }

    /**
     * Show the form for creating a new guru.
     */
    public function create()
    {
        return view('guru.create');
    }

    /**
     * Store a newly created guru in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle file upload and store it in the storage directory
        $imageName = time().'.'.$request->image->extension();
        $request->image->storeAs('guru', $imageName, 'public'); // Store in storage/app/guru

        ModelGuru::create([
            'name' => $request->name,
            'image' => $imageName,
        ]);

        return redirect('/guru')->with('success', 'Guru created successfully!');
    }

    /**
     * Show the form for editing the specified guru.
     */
    public function edit($id)
    {
        $guru = ModelGuru::findOrFail($id);
        return view('guru.edit', compact('guru'));
    }

    /**
     * Update the specified guru in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $guru = ModelGuru::findOrFail($id);
        
        // Update image if new image is uploaded
        if ($request->hasFile('image')) {
            // Delete old image from storage
            if (file_exists(storage_path('app/public/guru/'.$guru->image))) {
                unlink(storage_path('app/public/guru/'.$guru->image));
            }

            // Upload new image to storage
            $imageName = time().'.'.$request->image->extension();
            $request->image->storeAs('guru', $imageName, 'public'); // Store in storage/app/guru
            $guru->image = $imageName;
        }

        $guru->name = $request->name;
        $guru->save();

        return redirect('/guru')->with('success', 'Guru updated successfully!');
    }

    /**
     * Remove the specified guru from storage.
     */
    public function destroy($id)
    {
        $guru = ModelGuru::findOrFail($id);

        // Delete image file from storage
        if (file_exists(storage_path('app/public/guru/'.$guru->image))) {
            unlink(storage_path('app/public/guru/'.$guru->image));
        }

        $guru->delete();

        return redirect('/guru')->with('success', 'Guru deleted successfully!');
    }

    public function getGuruList()
    {
        $guru = ModelGuru::get();
        return response()->json($guru);
    }
}
