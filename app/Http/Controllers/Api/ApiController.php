<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    // ============================================================
    // AUTH
    // ============================================================

    // POST /api/login
    public function login(Request $request)
    {
        $request->validate([
            'login'    => 'required|string',
            'password' => 'required|string',
        ]);

        $loginField = $request->login;
        $fieldType  = preg_match('/^\d{16}$/', $loginField) ? 'nik' : 'email';

        $user = User::where($fieldType, $loginField)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'NIK/Email atau password salah.',
            ], 401);
        }

        // Hapus token lama, buat token baru
        $user->tokens()->delete();
        $token = $user->createToken('smart-finance-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil.',
            'token'   => $token,
            'user'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'nik'   => $user->nik,
                'role'  => $user->role,
            ],
        ]);
    }

    // POST /api/logout
    public function logout(Request $request)
    {
        $request->user()->currentToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil.',
        ]);
    }

    // GET /api/me
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data'    => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'nik'        => $user->nik,
                'role'       => $user->role,
                'created_at' => $user->created_at->format('d M Y'),
            ],
        ]);
    }

    // ============================================================
    // STATS
    // ============================================================

    // GET /api/stats
    public function stats(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data'    => [
                'total_pinjaman' => Loan::where('user_id', $user->id)->count(),
                'total_amount'   => Loan::where('user_id', $user->id)->sum('amount'),
                'total_aktif'    => Loan::where('user_id', $user->id)->where('status', 'aktif')->count(),
                'total_pending'  => Loan::where('user_id', $user->id)->where('status', 'pending')->count(),
                'total_lunas'    => Loan::where('user_id', $user->id)->where('payment_status', 'lunas')->count(),
            ],
        ]);
    }

    // ============================================================
    // LOANS
    // ============================================================

    // GET /api/loans
    public function loans(Request $request)
    {
        $loans = Loan::where('user_id', $request->user()->id)
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

        return response()->json([
            'success' => true,
            'total'   => $loans->count(),
            'data'    => $loans,
        ]);
    }

    // GET /api/loans/{id}
    public function loanDetail(Request $request, $id)
    {
        $loan = Loan::where('user_id', $request->user()->id)
            ->find($id);

        if (!$loan) {
            return response()->json([
                'success' => false,
                'message' => 'Pinjaman tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => [
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
            ],
        ]);
    }

    // POST /api/loans
    public function storeLoan(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:500000|max:100000000',
            'tenor'  => 'required|integer|min:1|max:60',
        ]);

        $skorAI = rand(40, 95);
        $bunga  = $skorAI > 70 ? 2 : ($skorAI >= 51 ? 2.5 : 3);

        $loan = Loan::create([
            'user_id'     => $request->user()->id,
            'amount'      => $request->amount,
            'tenor'       => $request->tenor,
            'bunga'       => $bunga,
            'skor_kredit' => $skorAI,
            'status'      => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengajuan pinjaman berhasil dikirim.',
            'data'    => [
                'id'          => $loan->id,
                'amount'      => $loan->amount,
                'tenor'       => $loan->tenor,
                'skor_kredit' => $loan->skor_kredit,
                'status'      => $loan->status,
            ],
        ], 201);
    }

    // POST /api/loans/{id}/pay
    public function payLoan(Request $request, $id)
    {
        $loan = Loan::where('user_id', $request->user()->id)->find($id);

        if (!$loan) {
            return response()->json([
                'success' => false,
                'message' => 'Pinjaman tidak ditemukan.',
            ], 404);
        }

        if ($loan->payment_status === 'lunas') {
            return response()->json([
                'success' => false,
                'message' => 'Pinjaman ini sudah lunas.',
            ], 400);
        }

        $loan->update(['payment_status' => 'lunas']);

        return response()->json([
            'success' => true,
            'message' => 'Pembayaran berhasil dikonfirmasi.',
            'data'    => [
                'id'             => $loan->id,
                'payment_status' => 'lunas',
            ],
        ]);
    }

    // ============================================================
    // ADMIN ONLY
    // ============================================================

    // GET /api/admin/users
    public function adminUsers(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak. Hanya admin yang bisa mengakses endpoint ini.',
            ], 403);
        }

        $users = User::with('loans')
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id'             => $user->id,
                    'name'           => $user->name,
                    'email'          => $user->email,
                    'nik'            => $user->nik,
                    'role'           => $user->role,
                    'total_pinjaman' => $user->loans->count(),
                    'total_amount'   => $user->loans->sum('amount'),
                    'created_at'     => $user->created_at->format('d M Y'),
                ];
            });

        return response()->json([
            'success' => true,
            'total'   => $users->count(),
            'data'    => $users,
        ]);
    }

    // GET /api/admin/stats
    public function adminStats(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak.',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data'    => [
                'total_users'      => User::where('role', 'user')->count(),
                'total_pinjaman'   => Loan::count(),
                'total_pending'    => Loan::where('status', 'pending')->count(),
                'total_aktif'      => Loan::where('status', 'aktif')->count(),
                'total_lunas'      => Loan::where('payment_status', 'lunas')->count(),
                'total_dana'       => Loan::sum('amount'),
            ],
        ]);
    }
}
