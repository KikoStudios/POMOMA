export class KVError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly operation: string
  ) {
    super(message);
    this.name = 'KVError';
  }

  static isKVError(error: unknown): error is KVError {
    return error instanceof KVError;
  }
}

export function handleKVError(error: unknown, operation: string): never {
  if (error instanceof Error) {
    throw new KVError(error.message, 'KV_ERROR', operation);
  }
  throw new KVError('Unknown KV error', 'UNKNOWN_ERROR', operation);
} 