<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExpertController extends Controller
{
    public function profile(Request $request)
{
    $user = $request->user()->load('expertProfile');

    return response()->json($user, 200);
}

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'expert') {
        return response()->json(['message' => 'Unauthorized. Only experts can perform this action.'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'location' => 'sometimes|string',
            'major' => 'sometimes|string',
            'description' => 'sometimes|string',
            'service_id' => 'sometimes|exists:services,id', 
        ]);

        // Update core User fields
        $user->update($request->only(['name', 'phone', 'location']));

        // Update or Create Expert Profile fields
        $user->expertProfile()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only(['major', 'description', 'service_id'])
        );

        return response()->json([
            'message' => 'Expert profile updated successfully',
            'user' => $user->load('expertProfile')
        ]);
    }
}
