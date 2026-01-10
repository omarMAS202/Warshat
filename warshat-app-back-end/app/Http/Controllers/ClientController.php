<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    public function profile(Request $request)
    {
        return response()->json($request->user(), 200);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'location' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'password' => 'sometimes|string|min:6|confirmed',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ], 200);
    }

    public function indexExperts(Request $request)
    {
        $query = User::where('role', 'expert')->with('expertProfile');

        if ($request->has('service_id')) {
            $serviceId = $request->input('service_id');
            
            // Filter users where their expertProfile has the matching service_id
            $query->whereHas('expertProfile', function ($q) use ($serviceId) {
                $q->where('service_id', $serviceId);
            });
        }

        $experts = $query->get();

        return response()->json($experts, 200);
    }

    public function showExpert($id)
    {
        $expert = User::where('role', 'expert')->with('expertProfile')->find($id);
        // Check if the user being requested is actually an expert
        if (!$expert) {
            return response()->json(['message' => 'Expert not found.'], 404);
        }

        return response()->json($expert, 200);
    }
}
