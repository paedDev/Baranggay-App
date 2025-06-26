<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:55'],
            'middle_name' => ['nullable', 'string', 'max:55'],
            'last_name' => ['required', 'string', 'max:55'],
            'email' => ['email', 'required'],
            'contact_number' => ['string', 'required', 'regex:/^[0-9+\-\s()]+$/'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'string', 'in:Male,Female'],
            'civil_status' => ['required', 'string', 'in:Single,Married,Widowed,Divorced'],
            'purok' => ['required', 'string'],
            'house_address' => ['required', 'string'],
            'occupation' => ['required_if:registration_type,resident', 'string'],

            'password' => ['required', 'confirmed', Password::min(8)],
            'registration_type' => ['required', 'string', 'in:resident,staff']

        ];
    }
}
