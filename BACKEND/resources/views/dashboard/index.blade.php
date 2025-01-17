@extends('layouts.app')
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Absen</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">
    @section('content')
    <div class="container mx-auto my-5 p-5 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Dashboard - Absen</h1>
        <form method="GET" action="{{ route('dashboard') }}" class="mb-3">
            <div class="flex space-x-4">
                <div class="flex-1">
                    <input type="date" name="date" value="{{ $dateFilter }}"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">Filter</button>
                </div>
            </div>
        </form>
        <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
                <tr class="bg-gray-200">
                    <th class="py-2 px-4 border-b">#</th>
                    <th class="py-2 px-4 border-b">Image</th>
                    <th class="py-2 px-4 border-b">Name</th>
                    <th class="py-2 px-4 border-b">Keterangan</th>
                    <th class="py-2 px-4 border-b">Entry Hour</th>
                    <th class="py-2 px-4 border-b">Date</th>
                    <th class="py-2 px-4 border-b">Action</th> <!-- Added Action column -->
                </tr>
            </thead>
            <tbody>
                @forelse ($absens as $absen)
                    <tr class="hover:bg-gray-100">
                        <form action="{{ route('updateKeterangan', $absen->id) }}" method="POST" class="inline">
                        <td class="py-2 px-4 border-b">
                            {{ $loop->iteration }}
                        </td>
                        <td class="py-2 px-4 h-8 border-b">
                            <img class="h-20" src="{{ asset('storage/' . $absen->absent_image) }}" alt="Absent Image">
                        </td>
                        <td class="py-2 px-4 border-b">
                            {{ $absen->name }}
                        </td>
                        <td class="py-2 px-4 border-b">
                            <!-- Editable Keterangan -->
                            
                                @csrf
                                @method('PUT')
                                <select name="keterangan" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="Hadir" {{ $absen->keterangan == 'Hadir' ? 'selected' : '' }}>Hadir</option>
                                    <option value="Telat" {{ $absen->keterangan == 'Telat' ? 'selected' : '' }}>Telat</option>
                                    <option value="Izin Dinas Luar" {{ $absen->keterangan == 'Izin Dinas Luar' ? 'selected' : '' }}>Izin Dinas Luar</option>
                                    <option value="Izin Sakit" {{ $absen->keterangan == 'Izin Sakit' ? 'selected' : '' }}>Izin Sakit</option>
                                    <option value="Izin Pulang Cepat" {{ $absen->keterangan == 'Izin Pulang Cepat' ? 'selected' : '' }}>Izin Pulang Cepat</option>
                                </select>
                       
                        </td>

                                <td class="py-2 px-4 border-b">
                                    {{ $absen->entry_hour }}
                                </td>
                                <td class="py-2 px-4 border-b">
                                    {{ $absen->date }}
                                </td>
                                <td class="py-2 px-4 border-b">
                                    <!-- Submit button for the keterangan edit form -->
                                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">Save</button>
                                </td>
                            </form>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center py-4">No attendance records found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    @endsection
</body>

</html>
