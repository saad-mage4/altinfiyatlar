<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\{Request, RedirectResponse};
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\{Auth, DB, Hash, Redirect};

class UserController extends Controller
{
    /**
     * @return Collection
     */
    public function getUsers(): Collection
    {
        return DB::table('users')->whereNot('user_role', 'admin')->get();
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function saveUser(Request $request): RedirectResponse
    {
        User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(request('name')),
            'user_role' => request('role'),
        ]);

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarName = time() . '_' . $avatar->getClientOriginalName();
            $avatar->move(public_path('images'), $avatarName);
            User::where('email', '=', request('email'))->update(['avatar' => 'images/' . $avatarName]);
        }

        return Redirect::route('Users')->with('success', 'User saved successfully!');
    }


    /**
     * @param Request $request
     * @return string
     */
    public function updateUsers(Request $request): string
    {
        $msg = "";

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $AvatarName = time() . '_' . $avatar->getClientOriginalName();
            $avatar->move(public_path('images'), $AvatarName);
            User::where('id', '=', $request->id)->update(['avatar' => 'images/' . $AvatarName]);
            $msg = "Avatar Updated";
        }

        if (
            $request->has('name') ||
            $request->has('email') ||
            $request->has('user_role')
        ) {
            User::where('id', '=', $request->id)->update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'user_role' => $request->input('user_role'),
                'password' => Hash::make($request->input('name')),
            ]);
            $msg = "User updated successfully!";
        }
        return $msg;
    }
}