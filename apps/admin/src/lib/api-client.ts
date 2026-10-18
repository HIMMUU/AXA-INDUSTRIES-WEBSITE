const PRODUCTION_API_URL = 'https://axa-industries-website-api.vercel.app/api';

export function getApiBaseUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://localhost:4000/api';
  }
  return PRODUCTION_API_URL;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('axa_access_token');
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('axa_access_token');
    localStorage.removeItem('axa_refresh_token');
    const isAuthPath = [
      '/login',
      '/forgot-password',
      '/reset-password',
      '/unauthorized'
    ].some((path) => window.location.pathname.startsWith(path));
    if (!isAuthPath && !endpoint.includes('/auth/')) {
      window.location.href = '/login';
    }
  }

  return res;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message?: string; data?: T; [key: string]: any }> {
  const res = await apiFetch(endpoint, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.error || 'An error occurred');
  }

  return data;
}
