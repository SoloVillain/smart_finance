<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        return inertia('Welcome', [
            'theme' => 'Smart Finance for Smart Goals',
            'team' => ['Almira Callista Trixie Amadea', 'Viki Nur Pradana'] // Data Kelompok
        ]);
    }
}
