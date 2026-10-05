import { describe, expect, it } from 'vitest';
import { gameReducer, initialState, type GameState } from './reducer';
import type { Question } from '../data/questions';

const round: Question[] = [
  { image: 'a.jpg', answer: 'Estonia' },
  { image: 'b.jpg', answer: 'Spain' },
];
const started = (): GameState => gameReducer(initialState, { type: 'START', round });

describe('gameReducer', () => {
  it('starts on the rules screen and START moves to the first question', () => {
    expect(initialState.phase).toBe('rules');
    const s = started();
    expect(s).toMatchObject({ phase: 'question', index: 0, score: 0, picked: null, round });
  });

  it('a correct answer scores a point and shows feedback', () => {
    const s = gameReducer(started(), { type: 'ANSWER', country: 'Estonia' });
    expect(s).toMatchObject({ phase: 'feedback', score: 1, picked: 'Estonia' });
  });

  it('a wrong answer shows feedback without scoring', () => {
    const s = gameReducer(started(), { type: 'ANSWER', country: 'Greece' });
    expect(s).toMatchObject({ phase: 'feedback', score: 0, picked: 'Greece' });
  });

  it('TIMEOUT counts as wrong with no pick', () => {
    const s = gameReducer(started(), { type: 'TIMEOUT' });
    expect(s).toMatchObject({ phase: 'feedback', score: 0, picked: null });
  });

  it('ignores a second answer and an answer after timeout', () => {
    const once = gameReducer(started(), { type: 'ANSWER', country: 'Estonia' });
    expect(gameReducer(once, { type: 'ANSWER', country: 'Estonia' })).toBe(once);
    const timedOut = gameReducer(started(), { type: 'TIMEOUT' });
    expect(gameReducer(timedOut, { type: 'ANSWER', country: 'Estonia' })).toBe(timedOut);
    expect(gameReducer(once, { type: 'TIMEOUT' })).toBe(once);
  });

  it('NEXT goes to the next question, then to the result after the last one', () => {
    let s = gameReducer(started(), { type: 'ANSWER', country: 'Estonia' });
    s = gameReducer(s, { type: 'NEXT' });
    expect(s).toMatchObject({ phase: 'question', index: 1, picked: null, score: 1 });
    s = gameReducer(s, { type: 'ANSWER', country: 'Spain' });
    s = gameReducer(s, { type: 'NEXT' });
    expect(s).toMatchObject({ phase: 'result', score: 2 });
  });

  it('NEXT is ignored while a question is still open', () => {
    const s = started();
    expect(gameReducer(s, { type: 'NEXT' })).toBe(s);
  });

  it('RESTART returns to the rules screen with a clean score', () => {
    let s = gameReducer(started(), { type: 'ANSWER', country: 'Estonia' });
    s = gameReducer(s, { type: 'RESTART' });
    expect(s).toEqual(initialState);
  });
});
