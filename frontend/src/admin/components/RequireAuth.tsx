import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthStore } from '../store/authStore';

/**
 * Wrap any route that should be available only to authenticated admins.
 *
 * If not logged in, redirects to /admin/login while remembering where
 * the user was trying to go (so we can send them back after login).
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
