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
     * Usage:
     *   ->middleware('role:admin')
     *   ->middleware('role:admin,editor')
     *   ->middleware('role:admin|editor')
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Build normalized list of roles (supports comma or pipe separators)
        $roleList = [];
        foreach ($roles as $r) {
            foreach (preg_split('/[|,]/', $r) as $p) {
                $p = trim($p);
                if ($p !== '') $roleList[] = $p;
            }
        }

        if (empty($roleList)) {
            return $next($request);
        }

        // 1) If model provides hasRole()
        if (method_exists($user, 'hasRole')) {
            foreach ($roleList as $role) {
                if ($user->hasRole($role)) {
                    return $next($request);
                }
            }
        }

        // 2) If user has a 'role' attribute (string)
        if (isset($user->role)) {
            foreach ($roleList as $role) {
                if ((string)$user->role === $role) {
                    return $next($request);
                }
            }
        }

        // 3) If user has roles relation (collection with 'name' field)
        if (isset($user->roles) && is_iterable($user->roles)) {
            foreach ($user->roles as $r) {
                foreach ($roleList as $role) {
                    if (isset($r->name) && $r->name === $role) {
                        return $next($request);
                    }
                }
            }
        }

        return response()->json(['message' => 'Forbidden.'], 403);
    }
}
