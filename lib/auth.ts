import { useEffect, useState } from 'react';

const AUTH_KEY = 'estudio_biblico_admin_session';

export const ADMIN_CREDENTIALS = {
  username: 'kbbarbosa',
  password: 'Qwer1234',
};

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function loginAdmin(user: string, pass: string): boolean {
  if (user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, 'true');
    }
    return true;
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = '/admin/login';
  }
}

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return { authenticated };
}
