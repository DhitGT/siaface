@extends('layouts.app')

@section('content')
<div>
    <h1>Create Berita</h1>
    <form action="{{ route('berita.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div>
            <label for="title">Title</label>
            <input type="text" name="title" id="title" required>
        </div>
        <div>
            <label for="content">Content</label>
            <textarea name="content" id="content" required></textarea>
        </div>
        <div>
            <label for="cover">Cover</label>
            <input type="file" name="cover" id="cover" accept="image/*" required>
        </div>
        <button type="submit">Save</button>
    </form>

</div>
@endsection
