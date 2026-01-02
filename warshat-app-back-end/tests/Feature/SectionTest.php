<?php

namespace Tests\Feature;

use App\Models\Section;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_view_sections()
    {
        $response = $this->getJson('/api/sections');

        $response->assertStatus(401);
    }

    public function test_non_client_user_gets_forbidden()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->getJson('/api/sections');

        $response->assertStatus(403);
    }

    public function test_client_user_can_view_sections_index()
    {
        $user = User::factory()->create(['role' => 'client']);
        $token = $user->createToken('test')->plainTextToken;

        // create some sections
        Section::create(['name' => 'Hair', 'image' => null, 'description' => 'Hair services']);
        Section::create(['name' => 'Nails', 'image' => null, 'description' => 'Nail services']);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->getJson('/api/sections');

        $response->assertStatus(200)
                 ->assertJsonCount(2);
    }

    public function test_client_user_can_view_specific_section_with_services()
    {
        $user = User::factory()->create(['role' => 'client']);
        $token = $user->createToken('test')->plainTextToken;

        $section = Section::create(['name' => 'Spa', 'image' => null, 'description' => 'Spa services']);

        Service::create(['section_id' => $section->id, 'name' => 'Massage', 'image' => null, 'description' => 'Relaxing massage']);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->getJson('/api/sections/' . $section->id);

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'name', 'image', 'description', 'services']);
    }
}
