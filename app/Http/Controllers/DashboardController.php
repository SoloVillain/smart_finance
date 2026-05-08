<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DashboardController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        $user = Auth::user();

        // redirect admin
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        // stats sesuai instruksi
        $stats = [
            'total_donasi' => Loan::where('user_id', $user->id)
                ->where('status', 'aktif')
                ->sum('amount'),

            'loan_count' => Loan::where('user_id', $user->id)
                ->where('status', 'aktif')
                ->count(),

            'total_asset' => Loan::where('user_id', $user->id)
                ->sum('amount'),
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
        ]);
    }
}
