<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AttendanceController extends Controller
{
    public function saveImage(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'image' => 'required|string',
            'timestamp' => 'required|string',
        ]);

        // Get the base64-encoded image
        $imageData = $request->input('image');
        
        // Remove the base64 header (data:image/jpeg;base64,) if present
        $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
        $imageData = str_replace(' ', '+', $imageData); // Sometimes there are spaces in base64 encoding

        // Decode the base64 string
        $image = base64_decode($imageData);

        // Create a unique filename based on the timestamp or any unique identifier
        $filename = 'attendance_' . time() . '.jpg';

        // Save the image in the public storage folder
        $path = storage_path('app/public/attendance_images/' . $filename);

        // Ensure the directory exists
        if (!file_exists(storage_path('app/public/attendance_images'))) {
            mkdir(storage_path('app/public/attendance_images'), 0777, true);
        }

        // Save the image to the file
        file_put_contents($path, $image);

        // Return a response (success or failure)
        return response()->json(['message' => 'Image saved successfully', 'filename' => $filename]);
    }
}
