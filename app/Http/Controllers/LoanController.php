<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function index()
    {
        return Inertia::render('Loans/Index', [
            'loans' => Loan::where('user_id', Auth::id())
                ->latest()
                ->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Loans/Apply');
    }

    public function monitoring()
    {
        $loans = Loan::where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($loan) {
                return [
                    'id'             => $loan->id,
                    'program_name'   => 'Pinjaman Mikro Modal Usaha',
                    'sdg_type'       => 'SDG 8',
                    'amount'         => $loan->amount,
                    'tenor'          => $loan->tenor,
                    'status'         => $loan->status,
                    'skor_kredit'    => $loan->skor_kredit,
                    'payment_status' => $loan->payment_status,
                    'ktp_path'       => $loan->ktp_path
                        ? asset('storage/' . $loan->ktp_path)
                        : null,
                    'created_at'     => $loan->created_at->format('d M Y'),
                ];
            });

        return Inertia::render('Loans/Monitoring', [
            'loans' => $loans,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:500000',
            'tenor'  => 'required|integer|min:1',
            'ktp'    => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $skorAI = rand(40, 95);
        $bunga = $skorAI > 70 ? 2 : ($skorAI >= 51 ? 2.5 : 3);

        $ktpPath = null;
        if ($request->hasFile('ktp')) {
            $ktpPath = $request->file('ktp')->store('ktp_documents', 'public');
        }

        Loan::create([
            'user_id'        => Auth::id(),
            'amount'         => $request->amount,
            'tenor'          => $request->tenor,
            'bunga'          => $bunga,
            'skor_kredit'    => $skorAI,
            'status'         => 'pending',
            'ktp_path'       => $ktpPath,
            'payment_status' => 'belum_lunas',
        ]);

        return redirect()
            ->route('dashboard')
            ->with('message', 'Pengajuan berhasil dikirim!');
    }

    public function pay(Loan $loan)
    {
        abort_unless($loan->user_id === Auth::id(), 403);

        // Wajib disetujui admin dulu (asumsi approved = "aktif")
        abort_unless($loan->status === 'aktif', 403);

        // Kalau sudah lunas, tidak perlu update lagi
        if ($loan->payment_status === 'lunas') {
            return back()->with('message', 'Pembayaran sudah lunas.');
        }

        $loan->update([
            'payment_status' => 'lunas',
        ]);

        return back()->with('message', 'Pembayaran berhasil dikonfirmasi!');
    }
}
