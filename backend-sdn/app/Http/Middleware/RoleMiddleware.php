<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        // Jika user belum login
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Ambil daftar role user
        $userRoles = $user->roles->pluck('name')->map(fn($r) => strtolower($r))->toArray();

        // Cek apakah salah satu role cocok
        foreach ($roles as $role) {
            if (in_array(strtolower($role), $userRoles)) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Forbidden (role denied)'], 403);
    }
}
