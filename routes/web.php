<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth; // <--- PASTIKAN BARIS INI ADA
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;

// 1. HALAMAN PUBLIK
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/smart-finance', [FinanceController::class, 'index'])->name('finance.index');

// 2. ROUTE YANG MEMERLUKAN LOGIN (AUTH)
// ... (Bagian atas tetap sama)

// 2. ROUTE YANG MEMERLUKAN LOGIN (AUTH)
Route::middleware(['auth', 'verified'])->group(function () {

    // --- DASHBOARD UTAMA (Pintu Masuk) ---
    // User dan Admin akan masuk ke sini dulu, lalu dipisah oleh Controller
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // --- FITUR PINJAMAN USER ---
    Route::prefix('loans')->name('loans.')->group(function () {
        Route::get('/', [LoanController::class, 'index'])->name('index');
        Route::post('/apply', [LoanController::class, 'store'])->name('store');
    });

    // --- MANAJEMEN PROFIL ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // ... dst
});

// 3. ROUTE KHUSUS ADMIN
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::post('/loans/{loan}/verify', [AdminDashboardController::class, 'verify'])->name('loans.verify');
    Route::get('/sdgs-report', [AdminDashboardController::class, 'sdgsReport'])->name('sdgs.report');

    // Users management
    Route::get('/users', [AdminDashboardController::class, 'users'])->name('users.index');
    Route::get('/users/{user}', [AdminDashboardController::class, 'userDetail'])->name('users.show');
    Route::put('/loans/{loan}', [AdminDashboardController::class, 'updateLoan'])->name('loans.update');
    Route::delete('/loans/{loan}', [AdminDashboardController::class, 'deleteLoan'])->name('loans.delete');
});

require __DIR__ . '/auth.php';
