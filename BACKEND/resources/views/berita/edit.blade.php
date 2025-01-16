@extends('layouts.app')

@section('content')
<div>
    <h1>Edit Berita</h1>
    <form action="{{ route('berita.update', $berita->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div>
            <label for="title">Title</label>
            <input type="text" name="title" id="title" value="{{ $berita->title }}" required>
        </div>
        <div>
            <label for="content">Content</label>
            <textarea name="content" id="content" required>{{ $berita->content }}</textarea>
        </div>
        <div>
            <label for="cover">Cover</label>
            <input type="file" name="cover" id="cover" accept="image/*">
            @if ($berita->cover)
                <img src="{{ asset('storage/' . $berita->cover) }}" alt="Cover Image" style="max-width: 200px;">
            @endif
        </div>
        <button type="submit">Update</button>
    </form>

</div>
@endsection
