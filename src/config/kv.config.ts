import { KVConfig } from '@vercel/kv';
import { ENV } from './env';

export const kvConfig: KVConfig = {
  url: ENV.KV.url,
  token: ENV.KV.token,
  automaticDeserialization: true,
  connectionTimeout: 5000, // 5 seconds
  operationTimeout: 5000, // 5 seconds
  maxRetriesPerRequest: 3,
}; 