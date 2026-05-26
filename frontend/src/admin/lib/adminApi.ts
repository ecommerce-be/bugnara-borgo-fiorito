import { useAuthStore } from '../store/authStore';

/**
 * API client for admin endpoints.
 *
 * Differences from the public api client (src/lib/api.ts):
 *  - Automatically attaches Authorization: Bearer <token> from the auth store
 *  - On 401 response, clears the session (auto-logout)
 *  - Reads token from Zustand store, not localStorage directly
 */

export class AdminApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    message: string,
    public readonly fieldErrors?: Record<string, string>
  ) {
    super(message);
    this.name = 'AdminApiError';
  }
}

async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('/api') ? path : `/api${path}`;
  const token = useAuthStore.getState().token;

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  // Auto-logout on 401
  if (response.status === 401) {
    useAuthStore.getState().clear();
    throw new AdminApiError(401, url, 'Sessione scaduta');
  }

  if (!response.ok) {
    let message = response.statusText;
    let fieldErrors: Record<string, string> | undefined;
    try {
      const body = await response.json();
      message = body.message ?? message;
      fieldErrors = body.fieldErrors;
    } catch {
      // body might not be JSON, ignore
    }
    throw new AdminApiError(response.status, url, message, fieldErrors);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const adminApi = {
  get:    <T>(path: string) => adminRequest<T>(path, { method: 'GET' }),
  post:   <T>(path: string, body?: unknown) =>
    adminRequest<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put:    <T>(path: string, body: unknown) =>
    adminRequest<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch:  <T>(path: string, body?: unknown) =>
    adminRequest<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => adminRequest<T>(path, { method: 'DELETE' }),
};

/**
 * Login is special: no token yet, no auto-logout logic.
 */
export async function publicLogin(username: string, password: string) {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    let message = 'Credenziali non valide';
    try {
      const body = await response.json();
      message = body.message ?? message;
    } catch { /* ignore */ }
    throw new AdminApiError(response.status, '/api/v1/auth/login', message);
  }

  return await response.json() as {
    accessToken: string;
    tokenType: string;
    expiresInMs: number;
    user: {
      id: number;
      username: string;
      displayName: string;
      role: 'ADMIN' | 'EDITOR';
    };
  };
}
