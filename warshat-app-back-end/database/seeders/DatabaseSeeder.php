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
            'location' => 'دمشق'
        ]);

        // 2. Create Sections and their Services
        $sections = [
            [
                'name' => 'كهرباء ',
                'description' => 'يحتوي قسم الكهرباء على كل شيء يتعلق بالأمور الكهربائية مثل: صيانة الأعطال، تمديد الأسلاك، وتركيب الإضاءة والأجهزة.',
                'services' => [
                    ['name' => 'كهرباء منزلية', 'description' => 'حلول سريعة وجذرية لجميع مشاكل التماس الكهربائي، انقطاع التيار، وضعف الجهد في المنزل.'],
                    ['name' => 'ادوات كهربائية', 'description' => 'إصلاح وصيانة جميع الأجهزة والأدوات الكهربائية المنزلية بدقة عالية مع تشخيص سريع للأعطال.']
                ]
            ],
            [
                'name' => 'سباكة',
                'description' => 'إصلاح التسريبات، تركيب الأدوات الصحية، صيانة شبكات المياه، ومعالجة انسداد الصرف.',
                'services' => [
                    ['name' => 'تركيب أدوات صحية', 'description' => 'تركيب وتغيير المغاسل والخلاطات باحترافية.'],
                    ['name' => 'إصلاح تسريبات', 'description' => 'كشف وإصلاح تسريبات المياه تحت الأرض وفي الجدران.']
                ]
            ],
        ];

        foreach ($sections as $sectionData) {
            $services = $sectionData['services'];
            unset($sectionData['services']);

            $section = Section::create($sectionData);

            foreach ($services as $serviceData) {
                    // إنشاء الخدمة
                    $service = Service::create([
                        'section_id' => $section->id,
                        'name' => $serviceData['name'],
                        'description' => $serviceData['description']
                    ]);
            }

        // 3. Create Experts with Profiles

        $expertUser = User::create([
                    'name' => 'الخبير لخدمة ' . $service->name,
                    'email' => 'expert_service_' . $service->id . '@example.com',
                    'password' => Hash::make('password'),
                    'role' => 'expert',
                    'phone' => '05' . rand(10000000, 99999999),
                    'location' => 'دمشق'
                ]);

                ExpertProfile::create([
                    'user_id' => $expertUser->id,
                    'service_id' => $service->id, // هذا الحقل هو المسؤول عن ظهور الخبير في مصفوفة الخدمة
                    'major' => 'متخصص ' . $service->name,
                    'description' => 'خبير فني يمتلك مهارات عالية في مجال ' . $service->name,
                    'image' => null,
                    'is_active' => true
                ]);
        }
    }
}