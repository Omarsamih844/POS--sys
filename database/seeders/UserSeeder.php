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
                'first_name' => 'OMAR',
                'last_name' => 'SAMIH',
                'email' => 'omar.samih@email.com',
                'email_verified_at' => Carbon::now()->format('y:m:d H:i:s'),
                'password' => Hash::make('azerty123456'),
                'id_role' => 2
            ],
            [
                'first_name' => 'OTHMANE',
                'last_name' => 'KIADE',
                'email' => 'othmane.kiade@email.com',
                'email_verified_at' => Carbon::now()->format('y:m:d H:i:s'),
                'password' => Hash::make('azerty123456'),
                'id_role' => 2
            ],
            [
                'first_name' => 'WAHBI',
                'last_name' => 'ALI',
                'email' => 'wahbi.ali@email.com',
                'email_verified_at' => Carbon::now()->format('y:m:d H:i:s'),
                'password' => Hash::make('azerty123456'),
                'id_role' => 2
            ]
        ]);
    }
}