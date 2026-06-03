<?php
use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Route;

// ===========================
// PUBLIC ROUTES (tanpa login)
// ===========================
Route::post('/login',    [ApiController::class, 'login']);

// ===========================
// PROTECTED ROUTES (butuh token)
// ===========================
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [ApiController::class, 'logout']);
    Route::get('/me',      [ApiController::class, 'me']);

    // Stats user
    Route::get('/stats',   [ApiController::class, 'stats']);

    // Loans
    Route::get('/loans',          [ApiController::class, 'loans']);
    Route::get('/loans/{id}',     [ApiController::class, 'loanDetail']);
    Route::post('/loans',         [ApiController::class, 'storeLoan']);
    Route::post('/loans/{id}/pay',[ApiController::class, 'payLoan']);

    // Admin only
    Route::get('/admin/users',    [ApiController::class, 'adminUsers']);
    Route::get('/admin/stats',    [ApiController::class, 'adminStats']);
});
