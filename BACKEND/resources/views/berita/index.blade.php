@extends('layouts.app')

@section('content')
<div>
    <h1>Berita List</h1>
    <a href="{{ route('berita.create') }}">Create New Berita</a>
    @if (session('success'))
        <p>
            {{ session('success') }}
        </p>
    @endif
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Cover</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($beritas as $berita)
                <tr>
                    <td>
                        {{ $berita->title }}
                    </td>
                    <td>
                        {{ $berita->content }}
                    </td>
                    <td>
                        @if ($berita->cover)
                            <img src="{{ 'storage/' . $berita->cover }}" alt="Cover Image" style="max-width: 100px;">
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('berita.edit', $berita->id) }}">Edit</a>
                        <form action="{{ route('berita.destroy', $berita->id) }}" method="POST"
                            style="display:inline-block;">
                            @csrf
                            @method                            ('DELETE')
                            <!-- Corrected this line -->
                            <button type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</div>
@endsection
