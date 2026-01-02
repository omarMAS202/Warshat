<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Section;
use App\Models\Service;
use App\Models\ExpertProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default Users for Testing
        // Admin
        User::create([
            'name' => 'System Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '0000000000',
            'location' => 'Main Office'
        ]);

        // Client
        User::create([
            'name' => 'John Client',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
            'role' => 'client',
            'phone' => '1234567890',
            'location' => 'Downtown'
        ]);

        // 2. Create Sections and their Services
        $sections = [
            [
                'name' => 'House Works',
                'description' => 'Professional help for your home maintenance and organization.',
                'services' => [
                    ['name' => 'Moving', 'description' => 'Help with packing and transporting furniture.'],
                    ['name' => 'Cleaning', 'description' => 'Deep cleaning services for apartments and houses.'],
                    ['name' => 'Gardening', 'description' => 'Lawn mowing and garden maintenance.']
                ]
            ],
            [
                'name' => 'Repair',
                'description' => 'Technical support and fixing for appliances and systems.',
                'services' => [
                    ['name' => 'Fix electronic devices', 'description' => 'Repairing phones, laptops, and TVs.'],
                    ['name' => 'Plumbing', 'description' => 'Fixing leaks and installing pipes.'],
                    ['name' => 'Electricity', 'description' => 'Wiring and electrical repairs.']
                ]
            ],
        ];

        foreach ($sections as $sectionData) {
            $services = $sectionData['services'];
            unset($sectionData['services']);

            $section = Section::create($sectionData);

            foreach ($services as $serviceData) {
                $serviceData['section_id'] = $section->id;
                Service::create($serviceData);
            }
        }

        // 3. Create Experts with Profiles
        $experts = [
            [
                'name' => 'Ahmed Repairman',
                'email' => 'expert1@example.com',
                'major' => 'Electronics Engineer',
                'description' => 'I have 10 years of experience in fixing all kinds of digital devices.'
            ],
            [
                'name' => 'Sara Mover',
                'email' => 'expert2@example.com',
                'major' => 'Logistics Specialist',
                'description' => 'Expert in home organization and heavy furniture moving.'
            ]
        ];

        foreach ($experts as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'role' => 'expert',
                'phone' => '555000' . rand(10, 99),
                'location' => 'City Center'
            ]);

            ExpertProfile::create([
                'user_id' => $user->id,
                'major' => $data['major'],
                'description' => $data['description']
            ]);
        }
    }
}