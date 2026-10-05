import type { Country } from '../config';
import type { Question } from '../data/questions';

export type Phase = 'rules' | 'question' | 'feedback' | 'result';

export interface GameState {
  phase: Phase;
  round: Question[];
  index: number;
  score: number;
  /** What the player tapped; null in feedback means the timer ran out. */
  picked: Country | null;
}

export type Action =
  | { type: 'START'; round: Question[] }
  | { type: 'ANSWER'; country: Country }
  | { type: 'TIMEOUT' }
  | { type: 'NEXT' }
  | { type: 'RESTART' };

export const initialState: GameState = { phase: 'rules', round: [], index: 0, score: 0, picked: null };

/** Actions that don't fit the current phase are ignored (double taps, tap-vs-timeout races). */
export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START':
      return { ...initialState, phase: 'question', round: action.round };
    case 'ANSWER': {
      if (state.phase !== 'question') return state;
      const correct = state.round[state.index].answer === action.country;
      return { ...state, phase: 'feedback', picked: action.country, score: state.score + (correct ? 1 : 0) };
    }
    case 'TIMEOUT':
      if (state.phase !== 'question') return state;
      return { ...state, phase: 'feedback', picked: null };
    case 'NEXT': {
      if (state.phase !== 'feedback') return state;
      const last = state.index >= state.round.length - 1;
      return last ? { ...state, phase: 'result' } : { ...state, phase: 'question', index: state.index + 1, picked: null };
    }
    case 'RESTART':
      return initialState;
  }
}
