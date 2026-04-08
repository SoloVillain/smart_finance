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
            'loans' => Loan::where('user_id', Auth::id())->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:500000',
            'tenor' => 'required|integer|min:1',
        ]);

        // 1. SIMULASI ANALISIS AI (Sesuai Alur Tahap 2)
        // Kita simulasikan skor acak antara 40-95
        $skorAI = rand(40, 95);

        if ($skorAI > 70) {
            $bunga = 2; // 2%
            $metodeSkor = 'AI-BigData';
        } elseif ($skorAI >= 51) {
            $bunga = 2.5; // 2.5%
            $metodeSkor = 'AI-BigData';
        } else {
            $bunga = 3; // 3%
            $metodeSkor = 'Manual Review';
        }

        // 3. REGISTRASI PINJAMAN KE DATABASE
        Loan::create([
            'user_id'     => Auth::id(),
            'amount'      => $request->amount,
            'tenor'       => $request->tenor,
            'bunga'       => $bunga,
            'skor_kredit' => $skorAI, // Menyimpan hasil Analisis AI
            'status'      => 'pending', // Status awal sesuai alur "Evaluasi"
        ]);

        // Kirim notifikasi sukses ke frontend
        return redirect()->route('dashboard')->with('message', 'Pengajuan berhasil dikirim dan sedang dianalisis oleh AI.');
    }
}
