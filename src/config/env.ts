/**
 * Environment configuration with type safety
 */
export const ENV = {
  KV: {
    url: import.meta.env.VITE_KV_REST_API_URL,
    token: import.meta.env.VITE_KV_REST_API_TOKEN,
    isConfigured(): boolean {
      return !!(this.url && this.token);
    }
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
} as const;

/**
 * Validates required environment variables
 * @throws Error if required variables are missing
 */
export function validateEnv(): void {
  if (!ENV.KV.url) {
    throw new Error('VITE_KV_REST_API_URL is required');
  }
  if (!ENV.KV.token) {
    throw new Error('VITE_KV_REST_API_TOKEN is required');
  }
}

// Validate environment variables in development
if (ENV.isDevelopment) {
  validateEnv();
} 