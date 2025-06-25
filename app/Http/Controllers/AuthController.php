<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(SignUpRequest $request)
    {
        $attributes = $request->validated();

        $user = User::create([
            'first_name' => $attributes['first_name'],
            'middle_name' => $attributes['middle_name'],
            'last_name' => $attributes['last_name'],
            'email' => $attributes['email'],
            'contact_number' => $attributes['contact_number'],
            'birth_date' => $attributes['birth_date'],
            'gender' => $attributes['gender'],
            'civil_status' => $attributes['civil_status'],
            'purok' => $attributes['purok'],
            'house_address' => $attributes['house_address'],
            'occupation' => $attributes['occupation'],
            'registration_type' => $attributes['registration_type'],
            'password' => Hash::make($attributes['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function login(LoginRequest $request)
    {
        //login information first
        $credentialsAttributes = $request->validated();

        if (!Auth::attempt($credentialsAttributes)) {
            return response([
                'message' => 'Provided credentials are incorrect',

            ]);
        };
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete;
        return response()->json([
            'message' => 'Logout successfully'
        ]);
    }
}
