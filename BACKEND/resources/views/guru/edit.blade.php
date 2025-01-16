@extends('layouts.app')

@section('content')
<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <h1 class="text-2xl font-bold mb-6">Edit Guru</h1>

    <form action="/guru/{{ $guru->id }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" name="name" id="name" value="{{ $guru->name }}" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2">
        </div>

        <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Image (Leave blank to keep the current image):</label>
            <input type="file" name="image" id="image" class="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2">
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">Update</button>
    </form>
</div>
@endsection