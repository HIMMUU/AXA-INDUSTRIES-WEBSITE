const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message?: string; data?: T; [key: string]: any }> {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  // Attach JWT Bearer token automatically if present in browser localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('axa_access_token');
    if (token && !options.headers?.hasOwnProperty('Authorization')) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    credentials: 'include'
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  try {
    const res = await fetch(url, config);
    const data = await res.json();

    if (res.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('axa_access_token');
      localStorage.removeItem('axa_refresh_token');
      const isAuthPath = ['/login', '/forgot-password', '/reset-password', '/unauthorized'].some((p) =>
        window.location.pathname.startsWith(p)
      );
      if (!isAuthPath && !endpoint.includes('/auth/')) {
        window.location.href = '/login';
      }
    }

    if (!res.ok) {
      throw new Error(data.message || data.error || 'An error occurred');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network request failed');
  }
}
