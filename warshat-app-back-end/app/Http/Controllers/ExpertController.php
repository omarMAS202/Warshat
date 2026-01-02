<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExpertController extends Controller
{
    public function profile(Request $request)
    {
        return response()->json($request->user(), 200)->load('expertProfile');
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'location' => 'sometimes|string',
            'major' => 'sometimes|string',
            'description' => 'sometimes|string',
        ]);

        // Update core User fields
        $user->update($request->only(['name', 'phone', 'location']));

        // Update or Create Expert Profile fields
        $user->expertProfile()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only(['major', 'description'])
        );

        return response()->json([
            'message' => 'Expert profile updated successfully',
            'user' => $user->load('expertProfile')
        ]);
    }
}
