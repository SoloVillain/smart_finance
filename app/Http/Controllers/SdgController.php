<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use Inertia\Inertia;

class SdgController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'contributions' => Contribution::all(),
            'team' => ['Almira Callista Trixie Amadea', 'Viki Nur Pradana']
        ]);
    }
}
