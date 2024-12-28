import { kvClient } from './kv';

export async function testKVConnection(): Promise<boolean> {
  try {
    await kvClient.ping();
    return true;
  } catch (error) {
    console.error('KV connection test failed:', error);
    return false;
  }
} 