import { describe, expect, it } from 'vitest';
import { COUNTRIES, ROUND_SIZE } from '../config';
import { QUESTIONS } from './questions';

// Every file in public/photos/, so a typo in an image name fails the tests instead of showing a broken photo.
const photos = Object.keys(import.meta.glob('../../public/photos/*', { query: '?url', eager: true })).map((p) =>
  p.split('/').pop(),
);

// Indexes i where question i and i+1 share a value.
const repeats = (values: unknown[]) => values.slice(1).flatMap((v, i) => (v === values[i] ? [i] : []));

describe('game questions', () => {
  it(`has exactly ${ROUND_SIZE} questions, 3 per country`, () => {
    expect(QUESTIONS).toHaveLength(ROUND_SIZE);
    for (const c of COUNTRIES) expect(QUESTIONS.filter((q) => q.answer === c), c).toHaveLength(ROUND_SIZE / COUNTRIES.length);
  });

  it('has the same country twice in a row exactly once, and never three in a row', () => {
    expect(repeats(QUESTIONS.map((q) => q.answer))).toHaveLength(1);
  });

  it('never has the same category twice in a row', () => {
    expect(QUESTIONS.every((q) => q.category)).toBe(true);
    expect(repeats(QUESTIONS.map((q) => q.category))).toEqual([]);
  });

  it('gives every question a short prompt', () => {
    for (const q of QUESTIONS) expect(q.prompt?.trim(), q.image).toBeTruthy();
  });

  it('only uses photos that exist in public/photos/', () => {
    for (const q of QUESTIONS) expect(photos, q.image).toContain(q.image);
  });
});
