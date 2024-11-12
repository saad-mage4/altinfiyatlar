<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use Illuminate\Support\Collection;
use Illuminate\Http\{Request, RedirectResponse};
use Illuminate\Support\Facades\{Auth, DB, Redirect};

class ArticlesController extends Controller
{
    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function saveArticle(Request $request): RedirectResponse
    {

        $request->validate([
            'banner.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        /* Checking if exist already */
        $articleSave = Articles::where('id', $request->id)->first();

        if (!$articleSave) {
            /* Image model initializing */
            $articleSave = new Articles();
            $articleSave->author_id = Auth::id();
        }

        if ($request->has('title')) {
            $articleSave->title = $request->title;
        }

        if ($request->has('description')) {
            $articleSave->description = $request->description;
        }

        /* Setting the images to their respective columns */
        if ($request->hasFile('banner')) {
            $logoHeader = $request->file('banner');
            $logoHeaderName = time() . '_' . $logoHeader->getClientOriginalName();
            $logoHeader->move(public_path('images'), $logoHeaderName);
            $articleSave->banner = 'images/' . $logoHeaderName;
        }

        /* Saving the articles */
        $articleSave->save();

        return Redirect::route('Articles')->with('success', 'Article saved successfully!');
    }

    /**
     * @param Request $request
     * @return string
     */
    public function updateArticles(Request $request): string
    {
        $msg = '';
        if ($request->has('status')) {
            Articles::where('id', '=', $request->id)->update(['status' => $request->status]);
            $status = $request->status == 1 ? 'Activated' : 'Deactivated';
            $msg = "Article $status";
        }

        if ($request->hasFile('banner')) {
            $banner = $request->file('banner');
            $bannerName = time() . '_' . $banner->getClientOriginalName();
            $banner->move(public_path('images'), $bannerName);
            Articles::where('id', '=', $request->id)->update(['banner' => 'images/' . $bannerName]);
            $msg = "Banner updated";
        }

        if ($request->has('title') || $request->has('description')) {
            Articles::where('id', '=', $request->id)->update([
                'title' => $request->title,
                'description' => $request->description,
            ]);
            $msg = "Article updated successfully!";
        }

        return $msg;
    }

    /**
     * @return Collection
     */
    public function getArticlesAdmin(): Collection
    {
        return DB::table('articles')->get();
    }

    /**
     * @return Collection
     */
    public function getArticles(): Collection
    {
        return DB::table('articles')->where('status', 'active')->orderBy('created_at', 'desc')->get();
    }

    public function getArticleDetails($id)
    {
        $article = DB::table('articles')->find($id);
        return response()->json($article);
    }
}