<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Gate;

use App\Http\Requests\StoreFooterSocialLinksRequest;
use App\Models\FooterSocialLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FooterSocialLinkController extends Controller
{
    public function index()
    {
        $links = FooterSocialLink::all();
        return Inertia::render('admin/FooterSocialLink', ['footersociallink' => $links]);
    }

    public function getdata()
    {
        $links = FooterSocialLink::all();
        return response()->json($links);
    }

    public function store(Request $request)
    {
        $rules = [
            'icon' => 'required', //|image|mimes:jpeg,png,jpg,gif|max:2048
            'link' => 'required',
        ];
        $customMessages = [
            'icon.required' => trans('Icon is required'), //image
            'link.required' => trans('Link is required'),
        ];

        $request->validate($rules, $customMessages);
        $link = new FooterSocialLink();
        $link->link = $request->link;
        $link->icon = $request->icon;
        $link->save();

        // if ($request->hasFile('icon')) {
        //     $card_image = $request->file('icon');
        //     $card_image_Name = time() . '_' . $card_image->getClientOriginalName();
        //     $card_image->move(public_path('images'), $card_image_Name);
        //     $link->icon = 'images/' . $card_image_Name;
        //     $link->save();
        // }

        $notification = trans('Create Successfully');
        // $notification = array('messege' => $notification, 'alert-type' => 'success');
        return redirect()->back()->with($notification);
    }

    public function update(Request $request, $id)
    {
        $link = FooterSocialLink::find($id);
        $link->link = $request->link;
        $link->icon = $request->icon;
        // if ($request->hasFile('icon')) {
        //     $card_image = $request->file('icon');
        //     $card_image_Name = time() . '_' . $card_image->getClientOriginalName();
        //     $card_image->move(public_path('images'), $card_image_Name);
        //     $link->icon = 'images/' . $card_image_Name;
        // }

        $link->update();

        $notification = trans('Update Successfully');
        return redirect()->back()->with($notification);
    }

    public function destroy($id)
    {
        $link = FooterSocialLink::find($id);
        $link->delete();
        $notification = trans('Delete Successfully');
        return redirect()->back()->with($notification);
    }
}
