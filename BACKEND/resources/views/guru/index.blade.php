@extends('layouts.app')

@section('content')
<div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Guru List</h1>

    <a href="/guru/create" class="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">Create New Guru</a>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @foreach ($gurus as $guru)
            <div class="bg-white rounded-lg shadow-md p-4">
                <h3 class="text-xl font-semibold mb-2">{{ $guru->name }}</h3>
                <img src="{{ asset('storage/guru/'.$guru->image) }}" alt="Image" class="w-full h-32 object-cover rounded-md mb-4">
                <div class="flex justify-between items-center">
                    <a href="/guru/{{ $guru->id }}/edit" class="text-blue-600 hover:underline">Edit</a>
                    <form action="/guru/{{ $guru->id }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:underline">Delete</button>
                    </form>
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection