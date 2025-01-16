@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Edit Berita</h1>
    <form action="{{ route('berita.update', $berita->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        
        <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" value="{{ $berita->title }}" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2">
        </div>
        
        <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
            <textarea name="content" id="content" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2">{{ $berita->content }}</textarea>
        </div>
        
        <div class="mb-4">
            <label for="cover" class="block text-sm font-medium text-gray-700">Cover</label>
            <input type="file" name="cover" id="cover" accept="image/*" class="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2">
            @if ($berita->cover)
                <img src="{{ asset('storage/' . $berita->cover) }}" alt="Cover Image" class="mt-2 max-w-xs rounded-md shadow-md">
            @endif
        </div>
        
        <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">Update</button>
    </form>
</div>
@endsection