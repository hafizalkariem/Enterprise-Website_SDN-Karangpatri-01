<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Guru Siti', 'email' => 'siti@guru.com'],
            ['name' => 'Guru Ahmad', 'email' => 'ahmad@guru.com'],
            ['name' => 'Guru Dewi', 'email' => 'dewi@guru.com'],
            ['name' => 'Guru Rina', 'email' => 'rina@guru.com'],
            ['name' => 'Guru Bayu', 'email' => 'bayu@guru.com'],
            ['name' => 'Guru Maya', 'email' => 'maya@guru.com'],
            ['name' => 'Guru Putri', 'email' => 'putri@guru.com'],
            ['name' => 'Guru Andi', 'email' => 'andi@guru.com'],
            ['name' => 'Guru Tini', 'email' => 'tini@guru.com'],
            ['name' => 'Guru Rahmat', 'email' => 'rahmat@guru.com'],
            ['name' => 'Guru Jawa', 'email' => 'jawa@guru.com'],
        ];

        foreach ($users as $index => $user) {
            DB::table('users')->insert([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password123'), // default password
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
