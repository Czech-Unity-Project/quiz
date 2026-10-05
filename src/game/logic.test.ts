import { describe, expect, it } from 'vitest';
import { buildRound, messageFor, shuffle } from './logic';
import type { Question } from '../data/questions';
import type { Country } from '../config';

const q = (answer: Country, n: number): Question => ({ image: `${answer}-${n}.jpg`, answer });
const pool = (perCountry: number): Question[] =>
  (['Estonia', 'Sweden', 'Spain', 'Greece'] as const).flatMap((c) =>
    Array.from({ length: perCountry }, (_, i) => q(c, i)),
  );

/** Deterministic RNG (mulberry32) so shuffles are reproducible. */
function seeded(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const countBy = (qs: Question[]) =>
  qs.reduce<Record<string, number>>((acc, x) => ({ ...acc, [x.answer]: (acc[x.answer] ?? 0) + 1 }), {});

describe('shuffle', () => {
  it('keeps every element and does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const out = shuffle(input, seeded(1));
    expect(input).toEqual([1, 2, 3, 4, 5, 6]);
    expect([...out].sort()).toEqual(input);
  });
});

describe('buildRound', () => {
  it('picks 12 unique questions, exactly 3 per country, from a large pool', () => {
    const round = buildRound(pool(5), 12, seeded(42));
    expect(round).toHaveLength(12);
    expect(new Set(round).size).toBe(12);
    expect(countBy(round)).toEqual({ Estonia: 3, Sweden: 3, Spain: 3, Greece: 3 });
  });

  it('is deterministic for the same seed and varies across seeds', () => {
    const a = buildRound(pool(5), 12, seeded(7)).map((x) => x.image);
    const b = buildRound(pool(5), 12, seeded(7)).map((x) => x.image);
    const c = buildRound(pool(5), 12, seeded(8)).map((x) => x.image);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });

  it('fills up from other countries when one country is short', () => {
    const uneven = [...pool(4).filter((x) => x.answer !== 'Greece'), q('Greece', 0)];
    const round = buildRound(uneven, 12, seeded(3));
    expect(round).toHaveLength(12);
    expect(new Set(round).size).toBe(12);
    expect(countBy(round).Greece).toBe(1);
  });

  it('uses the whole pool when it is smaller than the round size', () => {
    const round = buildRound(pool(1), 12, seeded(3));
    expect(round).toHaveLength(4);
  });
});

describe('messageFor', () => {
  it.each([
    [12, 12, 'perfect'],
    [11, 12, 'great'],
    [9, 12, 'great'],
    [8, 12, 'good'],
    [5, 12, 'good'],
    [4, 12, 'low'],
    [0, 12, 'low'],
  ])('%i / %i is %s', (score, total, tier) => {
    expect(messageFor(score, total).tier).toBe(tier);
  });
});
