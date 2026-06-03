<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_pending'    => Loan::where('status', 'pending')->count(),
            'total_aktif'      => Loan::where('status', 'aktif')->count(),
            'total_sdg_impact' => Loan::where('status', 'aktif')->sum('amount'),
        ];
        $pendingLoans = Loan::with('user')
            ->where('status', 'pending')
            ->latest()
            ->get();
        return Inertia::render('Admin/Dashboard', [
            'pendingLoans' => $pendingLoans,
            'stats'        => $stats
        ]);
    }

    public function verify(Request $request, Loan $loan)
    {
        $request->validate([
            'action' => 'required|in:approve,reject'
        ]);
        $statusBaru = ($request->action === 'approve') ? 'aktif' : 'ditolak';
        $loan->update(['status' => $statusBaru]);
        return redirect()->back()->with('success', 'Status berhasil diperbarui');
    }

    public function users()
    {
        $users = User::withCount('loans')
            ->with(['loans' => function ($q) {
                $q->latest()->take(1);
            }])
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id'         => $user->id,
                    'name'       => $user->name,
                    'email'      => $user->email,
                    'created_at' => $user->created_at->format('d M Y'),
                    'loans_count' => $user->loans_count,
                    'total_pinjaman' => $user->loans->sum('amount'),
                ];
            });

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'stats' => [
                'total_users'  => User::count(),
                'active_loans' => Loan::where('status', 'aktif')->count(),
                'total_dana'   => Loan::where('status', 'aktif')->sum('amount'),
            ]
        ]);
    }

    public function userDetail(User $user)
    {
        $loans = $user->loans()
            ->latest()
            ->get()
            ->map(function ($loan) {
                return [
                    'id'             => $loan->id,
                    'program_name'   => 'Pinjaman Mikro Modal Usaha',
                    'sdg_type'       => 'SDG 8',
                    'amount'         => $loan->amount,
                    'tenor'          => $loan->tenor,
                    'bunga'          => $loan->bunga,
                    'skor_kredit'    => $loan->skor_kredit,
                    'status'         => $loan->status,
                    'payment_status' => $loan->payment_status ?? 'belum_lunas',
                    'ktp_path'       => $loan->ktp_path ? asset('storage/' . $loan->ktp_path) : null,
                    'created_at'     => $loan->created_at->format('d M Y'),
                ];
            });

        $stats = [
            'total_pinjaman' => $user->loans()->count(),
            'total_amount'   => $user->loans()->sum('amount'),
            'aktif'          => $user->loans()->where('status', 'aktif')->count(),
            'pending'        => $user->loans()->where('status', 'pending')->count(),
        ];

        return Inertia::render('Admin/UserDetail', [
            'user'  => $user,
            'loans' => $loans,
            'stats' => $stats,
        ]);
    }

    public function updateLoan(Request $request, Loan $loan)
    {
        $request->validate([
            'amount' => 'required|numeric|min:500000',
            'tenor'  => 'required|numeric|min:1',
            'status' => 'required|in:pending,aktif,ditolak',
        ]);

        $loan->update([
            'amount' => $request->amount,
            'tenor'  => $request->tenor,
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Loan berhasil diupdate');
    }

    public function deleteLoan(Loan $loan)
    {
        $loan->delete();
        return redirect()->back()->with('success', 'Loan berhasil dihapus');
    }
}
