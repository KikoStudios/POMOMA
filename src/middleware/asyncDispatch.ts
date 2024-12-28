import { Dispatch } from 'react';
import { GameAction, GameState } from '../types';

export const createAsyncDispatch = (
  dispatch: Dispatch<GameAction>,
  getState: () => GameState
) => {
  return async (action: GameAction) => {
    try {
      if ('payload' in action && action.payload instanceof Promise) {
        const result = await action.payload;
        dispatch({ ...action, payload: result });
      } else {
        dispatch(action);
      }
    } catch (error) {
      console.error('Error in async dispatch:', error);
    }
  };
}; 