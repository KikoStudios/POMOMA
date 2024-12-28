import { kv } from '@vercel/kv'

// Make sure you're checking if the environment variables exist
if (!import.meta.env.VITE_KV_REST_API_URL || !import.meta.env.VITE_KV_REST_API_TOKEN) {
  throw new Error('Missing KV environment variables')
}

export const kvStore = kv 