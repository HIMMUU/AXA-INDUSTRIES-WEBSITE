const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message?: string; data?: T; [key: string]: any }> {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    credentials: 'include' // Send & store HTTP-only cookies
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  try {
    const res = await fetch(url, config);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || 'An error occurred');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network request failed');
  }
}
