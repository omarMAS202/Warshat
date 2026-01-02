<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ExpertController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- CLIENT ROUTES ---
    Route::middleware('role:client')->group(function () {
        // Profile Management
        Route::get('/client/profile', [ClientController::class, 'profile']);
        Route::put('/client/profile', [ClientController::class, 'updateProfile']);

        // Expert Directory (for clients to view)
        Route::get('/experts', [ClientController::class, 'indexExperts']);
        Route::get('/experts/{id}', [ClientController::class, 'showExpert']);

        // Content
        Route::get('/sections', [SectionController::class, 'index']);
        Route::get('/sections/{section}', [SectionController::class, 'show']);
    });

    // --- EXPERT ROUTES ---
    Route::middleware('role:expert')->group(function () {
        Route::get('/expert/profile', [ExpertController::class, 'profile']);
        Route::put('/expert/profile', [ExpertController::class, 'updateProfile']);
    });
});