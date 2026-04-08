<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(): Response|RedirectResponse
    {
        $user = Auth::user();
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        $loans = Loan::where('user_id', $user->id)
            ->latest()
            ->get();
        return Inertia::render('Dashboard', [
            'contributions' => $loans->map(function ($loan) {
                return [
                    'id'           => $loan->id,
                    'program_name' => 'Pinjaman Mikro Modal Usaha',
                    'sdg_type'     => 'SDG 8',
                    'amount'       => $loan->amount,
                    'status'       => $loan->status,
                ];
            }),
            'stats' => [
                'total_asset'  => (int) $loans->where('status', 'aktif')->sum('amount'),
                'total_donasi' => (int) ($loans->where('status', 'aktif')->sum('amount') * 0.01),
                'loan_count'   => $loans->count(),
            ]
        ]);
    }
}
