<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\CSVImportController;

Route::get('persons', [PersonController::class, 'index']);
Route::post('persons', [PersonController::class, 'store']);
Route::get('persons/{id}', [PersonController::class, 'show']);
Route::put('persons/{id}', [PersonController::class, 'update']);
Route::delete('persons/{id}', [PersonController::class, 'destroy']);

Route::get('areas', [AreaController::class, 'index']);
Route::post('areas', [AreaController::class, 'store']);
Route::get('areas/{id}', [AreaController::class, 'show']);
Route::put('areas/{id}', [AreaController::class, 'update']);
Route::delete('areas/{id}', [AreaController::class, 'destroy']);

Route::get('products', [ProductController::class, 'index']);
Route::post('products', [ProductController::class, 'store']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::put('products/{id}', [ProductController::class, 'update']);
Route::delete('products/{id}', [ProductController::class, 'destroy']);

Route::get('logs', [LogController::class, 'index']);
Route::post('logs', [LogController::class, 'store']);
Route::get('logs/{id}', [LogController::class, 'show']);
Route::delete('logs/{id}', [LogController::class, 'destroy']);

Route::get('inventories', [InventoryController::class, 'index']);
Route::post('inventories', [InventoryController::class, 'store']);
Route::put('inventories/{id}', [InventoryController::class, 'update']);
Route::get('inventories/{id}', [InventoryController::class, 'show']);
Route::delete('inventories/{id}', [InventoryController::class, 'destroy']);


Route::post('import/{type}', [CSVImportController::class, 'import']);