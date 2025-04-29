<?php
namespace Database\Seeders;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'first_name' => 'MOHAMMED',
                'last_name' => 'DAHMANI',
                'email' => 'simo@email.com',
                'email_verified_at' => Carbon::now()->format('y:m:d H:i:s'),
                'password' => Hash::make('azerty123456'),
                'id_role' => 2
            ]
        ]);
    }
}