<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *z
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'middle_name' => fake()->optional(0.7)->lastName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'contact_number' => fake()->numerify('09#########'), // Philippine mobile format
            'birth_date' => fake()->dateTimeBetween('-80 years', '-18 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(['Male', 'Female']),
            'civil_status' => fake()->randomElement(['Single', 'Married', 'Widowed', 'Divorced']),
            'purok' => fake()->randomElement([
                'Purok 1',
                'Purok 2',
                'Purok 3',
                'Purok 4',
                'Purok 5',
                'Purok 6',
                'Purok 7',
                'Purok 8',
                'Purok 9',
                'Purok 10'
            ]),
            'house_address' => fake()->address(),
            'occupation' => fake()->randomElement([
                'Teacher',
                'Programmer',
                'IT Manager',
                'Farmer',
                'Driver',
                'Nurse',
                'Engineer',
                'Business Owner',
                'Student',
                'Retired'
            ]),
            'registration_type' => fake()->randomElement(['resident', 'staff']),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
