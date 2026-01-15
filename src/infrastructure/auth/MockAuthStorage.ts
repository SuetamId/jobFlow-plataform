import { AuthStoragePort } from '@/core/auth/application/ports/AuthStoragePort';

const AUTH_TOKEN_KEY = 'job_portal_auth_token';

export class MockAuthStorage implements AuthStoragePort {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export const mockAuthStorage = new MockAuthStorage();
