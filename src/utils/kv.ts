import { createClient } from '@vercel/kv';
import { GameState } from '../types';
import { ENV } from '../config/env';
import { kvConfig } from '../config/kv.config';
import { handleKVError } from './kvError';

// Export the client so it can be used by kvTest
export const kvClient = createClient(kvConfig);

/**
 * Retrieves a game state from Vercel KV
 * @param gameCode - The unique game identifier
 * @returns Promise<GameState | null>
 */
export async function getGameState(gameCode: string): Promise<GameState | null> {
  try {
    if (!ENV.KV.isConfigured()) {
      throw new Error('KV environment variables not configured');
    }

    const state = await kvClient.get<GameState>(`game_${gameCode.toUpperCase()}`);
    return state;
  } catch (error) {
    if (error instanceof Error && error.message.includes('not configured')) {
      throw error;
    }
    handleKVError(error, 'getGameState');
  }
}

/**
 * Saves a game state to Vercel KV
 * @param gameCode - The unique game identifier
 * @param state - The game state to save
 */
export async function setGameState(gameCode: string, state: GameState): Promise<void> {
  try {
    if (!ENV.KV.isConfigured()) {
      throw new Error('KV environment variables not configured');
    }

    // Set expiration to 24 hours from now (in seconds)
    const expirationSeconds = 24 * 60 * 60;
    await kvClient.set(`game_${gameCode.toUpperCase()}`, state, { ex: expirationSeconds });
  } catch (error) {
    handleKVError(error, 'setGameState');
  }
}

/**
 * Deletes a game state from Vercel KV
 * @param gameCode - The unique game identifier
 */
export async function deleteGameState(gameCode: string): Promise<void> {
  try {
    if (!ENV.KV.isConfigured()) {
      throw new Error('KV environment variables not configured');
    }

    await kvClient.del(`game_${gameCode.toUpperCase()}`);
  } catch (error) {
    handleKVError(error, 'deleteGameState');
  }
}

/**
 * Checks if KV is properly configured
 * @returns boolean indicating if KV configuration is present
 */
export function isKVConfigured(): boolean {
  return !!(ENV.KV.url && ENV.KV.token);
}

/**
 * Gets all active games
 * @returns Promise<string[]> Array of game codes
 */
export async function getActiveGames(): Promise<string[]> {
  try {
    if (!ENV.KV.isConfigured()) {
      throw new Error('KV environment variables not configured');
    }

    const keys = await kvClient.keys('game_*');
    return keys.map(key => key.replace('game_', ''));
  } catch (error) {
    handleKVError(error, 'getActiveGames');
  }
} 