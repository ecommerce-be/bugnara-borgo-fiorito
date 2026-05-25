/**
 * Centralized API client.
 *
 * Why this file exists:
 * - One place to handle base URL, headers, errors, retries.
 * - Strongly-typed responses thanks to TypeScript generics.
 * - In dev, requests to /api/* are proxied by Vite to localhost:8080
 *   (see vite.config.ts). In prod, the React app and Spring will
 *   be served from the same origin, so relative URLs just work.
 */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('/api') ? path : `/api${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new ApiError(response.status, url, body || response.statusText);
  }

  // 204 No Content has no body
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  get:  <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put:  <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
