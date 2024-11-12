<?php

namespace App\Http\Controllers;

use App\Models\Images;
use Illuminate\Http\{Request, RedirectResponse};
use Illuminate\Support\Facades\{DB, Redirect};


class ImageController extends Controller
{
    public function SaveImages(Request $request): RedirectResponse
    {
        $request->validate([
            'logo_header.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'logo_footer.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'centerBanner.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'LeftBanner.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'RightBanner.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bottomBanner.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        /* Checking if exist already */
        $imgSave = Images::first();

        if (!$imgSave) {
            /* Image model initializing */
            $imgSave = new Images();
        }

        if ($request->has('siteTitle')) {
            $imgSave->site_title = $request->siteTitle;
        }
        // dd($request);
        /* Setting the images to their respective columns */
        if ($request->hasFile('logo_header')) {
            $logoHeader = $request->file('logo_header');
            $logoHeaderName = time() . '_' . $logoHeader->getClientOriginalName();
            $logoHeader->move(public_path('images'), $logoHeaderName);
            $imgSave->logo_header = 'images/' . $logoHeaderName;
        }

        if ($request->hasFile('logo_footer')) {
            $logoFooter = $request->file('logo_footer');
            $logoFooterName = time() . '_' . $logoFooter->getClientOriginalName();
            $logoFooter->move(public_path('images'), $logoFooterName);
            $imgSave->logo_footer = 'images/' . $logoFooterName;
        }

        if ($request->hasFile('centerBanner')) {
            $centerBannerFile = $request->file('centerBanner');
            $centerImgName = time() . '_' . $centerBannerFile->getClientOriginalName();
            $centerBannerFile->move(public_path('images'), $centerImgName);
            $imgSave->home_center = 'images/' . $centerImgName;
        }

        if ($request->hasFile('leftBanner')) {
            $leftBannerFile = $request->file('leftBanner');
            $leftBannerName = time() . '_' . $leftBannerFile->getClientOriginalName();
            $leftBannerFile->move(public_path('images'), $leftBannerName);
            $imgSave->home_left = 'images/' . $leftBannerName;
        }

        if ($request->hasFile('rightBanner')) {
            $rightBannerFile = $request->file('rightBanner');
            $rightBannerName = time() . '_' . $rightBannerFile->getClientOriginalName();
            $rightBannerFile->move(public_path('images'), $rightBannerName);
            $imgSave->home_right = 'images/' . $rightBannerName;
        }

        if ($request->hasFile('bottomBanner')) {
            $bottomBannerFile = $request->file('bottomBanner');
            $bottomBannerName = time() . '_' . $bottomBannerFile->getClientOriginalName();
            $bottomBannerFile->move(public_path('images'), $bottomBannerName);
            $imgSave->bottom_img = 'images/' . $bottomBannerName;
        }

        /* Saving the images */
        $imgSave->save();

        return Redirect::route('updateImages')->with('success', 'Images saved successfully!');
    }

    public function getImages()
    {
        return DB::table('images')->first();
    }
}
