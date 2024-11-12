<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FooterLink;
use App\Models\Footer;
use Inertia\Inertia;

class FooterLinkController extends Controller
{
    public function index()
    {
        $links = FooterLink::where('column', 1)->get();
        $column = 1;
        $title = trans('First Column Link');
        $footer = Footer::first();
        $columnTitle = $footer->first_column ?? $title;
        return Inertia::render('admin/FooterLink', [
            'footer_link' => [
                'links' => $links,
                'column' => $column,
                'title' => $title,
                'columnTitle' => $columnTitle
            ]
        ]);
    }

    public function getdata()
    {
        $column1Links = FooterLink::where('column', 1)->get();
        $column2Links = FooterLink::where('column', 2)->get();
        $column3Links = FooterLink::where('column', 3)->get();

        return response()->json([
            'column1Links' => $column1Links,
            'column2Links' => $column2Links,
            'column3Links' => $column3Links,
        ]);
    }

    public function secondColFooterLink()
    {
        $links = FooterLink::where('column', 2)->get();
        $column = 2;
        $title = trans('Second Column Link');
        $footer = Footer::first();
        $columnTitle = $footer->second_column ?? $title;
        return Inertia::render('admin/SecondColumnLink', [
            'footer_link' => [
                'links' => $links,
                'column' => $column,
                'title' => $title,
                'columnTitle' => $columnTitle
            ]
        ]);
        // return view('admin.footer_link', compact('links', 'column', 'title', 'columnTitle'));
    }

    public function thirdColFooterLink()
    {
        $links = FooterLink::where('column', 3)->get();
        $column = 3;
        $title = trans('Third Column Link');
        $footer = Footer::first();
        $columnTitle = $footer->third_column ?? $title;
        // return view('admin.footer_link', compact('links', 'column', 'title', 'columnTitle'));
        return Inertia::render('admin/ThirdColumnLink', [
            'footer_link' => [
                'links' => $links,
                'column' => $column,
                'title' => $title,
                'columnTitle' => $columnTitle
            ]
        ]);
    }



    public function store(Request $request)
    {
        $rules = [
            'link' => 'required',
            'name' => 'required',
        ];
        $customMessages = [
            'link.required' => trans('admin_validation.Link is required'),
            'name.required' => trans('admin_validation.Name is required'),
        ];
        $request->validate($rules, $customMessages);

        $link = new FooterLink();
        $link->link = $request->link;
        $link->title = $request->name;
        $link->column = $request->column;
        $link->save();

        $notification = trans('Create Successfully');
        // $notification = array('messege' => $notification, 'alert-type' => 'success');
        return redirect()->back()->with($notification);
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'name' => 'required',
            'link' => 'required',
        ];
        $customMessages = [
            'link.required' => trans('admin_validation.Link is required'),
            'name.required' => trans('admin_validation.Name is required'),
        ];
        $request->validate($rules, $customMessages);

        $link = FooterLink::find($id);
        $link->link = $request->link;
        $link->title = $request->name;
        $link->save();

        $notification = trans('Update Successfully');
        // $notification = array('messege' => $notification, 'alert-type' => 'success');
        return redirect()->back()->with($notification);
    }

    public function destroy($id)
    {
        $link = FooterLink::find($id);
        $link->delete();
        $notification = trans('admin_validation.Delete Successfully');
        // $notification = array('messege' => $notification, 'alert-type' => 'success');
        return redirect()->back()->with($notification);
    }

    public function updateColTitle(Request $request, $id)
    {
        $rules = [
            'title' => 'required'
        ];
        $customMessages = [
            'title.required' => trans('admin_validation.Title is required'),
        ];
        $request->validate($rules, $customMessages);
        $footer = Footer::first();
        if ($id == 1) {
            $footer->first_column = $request->title;
            $footer->save();
        } else if ($id == 2) {
            $footer->second_column = $request->title;
            $footer->save();
        } else if ($id == 3) {
            $footer->third_column = $request->title;
            $footer->save();
        }
        $notification = trans('Update Successfully');
        // $notification = array('messege' => $notification, 'alert-type' => 'success');
        return redirect()->back()->with($notification);
    }
}
