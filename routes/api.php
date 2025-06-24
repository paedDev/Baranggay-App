<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return view('welcome');
});

Route::post("/register", [AuthController::class, 'login']);
Route::post("/login", [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {});
