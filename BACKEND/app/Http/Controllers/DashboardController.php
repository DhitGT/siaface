<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Absen;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $dateFilter = $request->query('date', now()->toDateString());
        $absens = Absen::get();

        return view('dashboard.index', compact('absens', 'dateFilter'));
    }

    public function getAttendanceByCurrentTime()
    {
        // Get the current date and time
        $now = Carbon::now();
        $currentDate = $now->toDateString(); // Format YYYY-MM-DD
        $currentTime = $now->toTimeString(); // Format HH:MM:SS

        // Query the database
        $attendanceRecords = DB::table('absens')
            ->select('name')
            ->whereDate('date', $currentDate) // Match the current date
            // ->whereTime('entry_hour', '<=', $currentTime) // Entry hours before or equal to now
            ->get();

        // Return the response
        return response()->json(

            $attendanceRecords,
        );
    }
    public function getExitAttendanceByCurrentTime()
    {
        // Get the current date and time
        $now = Carbon::now();
        $currentDate = $now->toDateString(); // Format YYYY-MM-DD
        $currentTime = $now->toTimeString(); // Format HH:MM:SS

        // Query the database
        $attendanceRecords = DB::table('absens')
            ->select('name')
            ->whereNotNull('exit_hour') // Match the current date
            ->whereDate('date', $currentDate)  // Entry hours before or equal to now
            ->get();

        // Return the response
        return response()->json(

            $attendanceRecords,
        );
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'flag' => 'required|in:masuk,keluar',
                'image' => 'nullable|string', // Allow image to be optional
                'keterangan' => 'nullable|string', // Allow image to be optional
                'suhu' => 'nullable|string', // Allow image to be optional
            ]);
    
            $currentDate = Carbon::now()->toDateString(); // Current date
            $currentTime = Carbon::now()->setTimezone('Asia/Jakarta')->toTimeString(); // Current time
    
            // Handle the image if provided
            $imagePath = null;
            if ($request->has('image') && !empty($request->input('image'))) {
                // Get the base64 string of the image
                $imageData = $request->input('image');
    
                // Remove the base64 header (data:image/jpeg;base64,)
                $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
                $imageData = str_replace(' ', '+', $imageData);
    
                // Decode the base64 string to raw image data
                $image = base64_decode($imageData);
    
                // Create a unique filename for the image
                $imageName = 'attendance_' . time() . '.jpg';
    
                // Store the image in the public/attendance_images directory
                $path = storage_path('app/public/attendance_images/' . $imageName);
    
                // Ensure the directory exists
                if (!file_exists(storage_path('app/public/attendance_images'))) {
                    mkdir(storage_path('app/public/attendance_images'), 0777, true);
                }
    
                // Save the image to the directory
                file_put_contents($path, $image);
    
                // Set the image path to be saved in the database
                $imagePath = 'attendance_images/' . $imageName; // Relative path for storage
            }
    
            // Process attendance based on 'masuk' or 'keluar' flag
            if ($validatedData['flag'] === 'masuk') {
                // Handle 'masuk'
                $validatedData['date'] = $currentDate;
                $validatedData['entry_hour'] = $currentTime;
                $validatedData['absent_image'] =  $imagePath; // Save the image path
                
                
    
                Absen::create($validatedData); // Create a new record
    
                return response()->json([
                    'success' => true,
                    'message' => 'Attendance record for "Masuk" added successfully!',
                ]);
            } elseif ($validatedData['flag'] === 'keluar') {
                // Handle 'keluar'
                $absen = Absen::where('name', $validatedData['name'])
                    ->where('date', $currentDate)
                    ->first();
    
                if ($absen) {
                    $absen->update([
                        'exit_hour' => $currentTime,
                        'absent_image' => $imagePath, // Update the image path if necessary
                        'suhu' => $validatedData['suhu'], // Update the image path if necessary
                    ]);
    
                    return response()->json([
                        'success' => true,
                        'message' => 'Attendance record for "Keluar" updated successfully!',
                    ]);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'No "Masuk" record found for today to update "Keluar".',
                    ]);
                }
            }
        } catch (\Exception $e) {
            // Log the error for debugging
            // \Log::error('Error handling attendance record: ' . $e->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'Failed to handle attendance record. Please try again.',
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function updateKeterangan(Request $request, $id)
    {
        // Validate the keterangan field
        $request->validate([
            'keterangan' => 'required|string|max:255',
        ]);

        // Find the Absen record by ID
        $absen = Absen::findOrFail($id);

        // Update the keterangan field
        $absen->update([
            'keterangan' => $request->input('keterangan'),
        ]);

        // Redirect back to the dashboard with a success message
        return redirect()->route('dashboard')->with('success', 'Keterangan updated successfully!');
    }

    public function get3DaysSuhu(Request $request)
    {
        try {
            // Get the current date and the past 3 consecutive days
            $currentDate = Carbon::now()->toDateString();
            $dates = [
                $currentDate, // today
                Carbon::parse($currentDate)->subDay(1)->toDateString(), // yesterday
                Carbon::parse($currentDate)->subDay(2)->toDateString(), // two days ago
            ];

            // Query the Absen model for records on the last 3 consecutive days with suhu > 37.5
            $results = Absen::whereIn('date', $dates)
                ->where('suhu', '>', 37.5)
                ->get()
                ->groupBy('name'); // Group results by teacher name

            // Filter only those teachers who have suhu > 37.5 for all 3 days
            $filteredResults = [];
            foreach ($results as $name => $absens) {
                if ($absens->count() === 3) {
                    // All three days must be present for the teacher
                    $filteredResults[] = [
                        'name' => $name,
                        'dates' => $absens->pluck('date'), // Dates where suhu was > 37.5
                        'suhu' => $absens->pluck('suhu') // The suhu values for each of those dates
                    ];
                }
            }

            // Return the filtered results
            return response()->json(
$filteredResults
            );
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve the data.',
                'error' => $e->getMessage(),
            ]);
        }
    }

}
