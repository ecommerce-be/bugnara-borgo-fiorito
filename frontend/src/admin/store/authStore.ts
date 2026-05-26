import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth state for the admin area.
 *
 * Persisted to localStorage so the user stays logged in across reloads.
 * Token expiry is checked client-side as a courtesy; the real source of
 * truth is the backend (which rejects expired tokens with 401, triggering
 * an auto-logout via the API interceptor).
 */

export interface AdminUserInfo {
  id: number;
  username: string;
  displayName: string;
  role: 'ADMIN' | 'EDITOR';
}

interface AuthState {
  token: string | null;
  user: AdminUserInfo | null;
  expiresAt: number | null;  // epoch ms

  isAuthenticated: () => boolean;
  setSession: (token: string, expiresInMs: number, user: AdminUserInfo) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      expiresAt: null,

      isAuthenticated: () => {
        const { token, expiresAt } = get();
        if (!token || !expiresAt) return false;
        return Date.now() < expiresAt;
      },

      setSession: (token, expiresInMs, user) => {
        set({
          token,
          user,
          expiresAt: Date.now() + expiresInMs,
        });
      },

      clear: () => set({ token: null, user: null, expiresAt: null }),
    }),
    {
      name: 'bugnara-admin-auth',
    }
  )
);
