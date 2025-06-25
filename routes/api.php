<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return view('welcome');
});

Route::post("/login", [AuthController::class, 'login']);
Route::post("/signup", [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {});
