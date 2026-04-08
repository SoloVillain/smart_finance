<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Loan;
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

    // NAMA FUNGSI: verify
    public function verify(Request $request, \App\Models\Loan $loan)
    {
        // Validasi: Jika 'action' kosong, Laravel akan mengirim error balik ke React
        $request->validate([
            'action' => 'required|in:approve,reject'
        ]);

        $statusBaru = ($request->action === 'approve') ? 'aktif' : 'ditolak';

        // Update status
        $loan->update([
            'status' => $statusBaru
        ]);

        // Berikan respons balik agar Inertia tahu proses selesai
        return redirect()->back()->with('success', 'Status berhasil diperbarui');
    }
}
