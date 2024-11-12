<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFooterRequest extends FormRequest
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
    public function rules()
    {
        return [
            'email' => 'required',
            'phone' => 'required|max:20',
            'address' => 'required',
            'image_title' => 'required',
            'copyright' => 'required',
            'card_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => trans('Email is required'),
            'phone.required' => trans('Phone is required'),
            'address.required' => trans('Address is required'),
            'image_title.required' => trans('Image title is required'),
            'copyright.required' => trans('Copyright is required'),
            'card_image.image' => trans('Image must be a file of type: jpeg, png, jpg, gif'),
        ];
    }
}