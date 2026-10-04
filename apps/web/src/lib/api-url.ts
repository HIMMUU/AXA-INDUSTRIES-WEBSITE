export class ApiUrlConfigurationError extends Error {
  constructor() {
    super('NEXT_PUBLIC_API_URL is required in production before storefront API requests can be made.');
    this.name = 'ApiUrlConfigurationError';
  }
}

export function getApiBaseUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, '');
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:4000/api';
  }

  throw new ApiUrlConfigurationError();
}
