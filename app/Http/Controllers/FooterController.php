<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFooterRequest;
use App\Models\Footer;
use Inertia\Inertia;

use function Pest\Laravel\json;

class FooterController extends Controller
{
    public function index()
    {
        $footer = Footer::first();
        return Inertia::render('admin/Footer', ['footer' => $footer]);
    }

    public function getdata()
    {
        $footer = Footer::first();
        return response()->json($footer);
    }

    public function store(StoreFooterRequest $request)
    {
        /* Checking if exist already */
        $footer = Footer::first();

        if (!$footer) {
            /* footer model initializing */
            $footer = new Footer();
        }

        $footer->email = $request->email;
        $footer->phone = $request->phone;
        $footer->address = $request->address;
        $footer->image_title = $request->image_title;
        $footer->copyright = $request->copyright;
        $footer->save();
        if ($request->card_image || $request->hasFile('card_image')) {
            $card_image = $request->file('card_image');
            $card_image_Name = time() . '_' . $card_image->getClientOriginalName();
            $card_image->move(public_path('images'), $card_image_Name);
            $footer->payment_image = 'images/' . $card_image_Name;
            $footer->save();
        }
        $notification = trans('admin_validation.Update Successfully');
        // $notification = array('messege' => $notification, 'alert-type' => 'success');
        // return Redirect::route('footer')->with('success', $notification);
        return redirect()->back()->with($notification);
    }
}