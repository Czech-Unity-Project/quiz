import { COUNTRIES } from '../config';
import type { Question } from '../data/questions';

export type Rng = () => number;

/** Fisher–Yates shuffle; returns a new array. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Picks `size` questions balanced across countries (size / 4 each). If a country
 * has too few questions, the gap is filled from the others. Order is shuffled.
 */
export function buildRound(pool: readonly Question[], size: number, rng: Rng = Math.random): Question[] {
  const perCountry = Math.floor(size / COUNTRIES.length);
  const picked: Question[] = [];
  const leftovers: Question[] = [];
  for (const country of COUNTRIES) {
    const ofCountry = shuffle(pool.filter((q) => q.answer === country), rng);
    picked.push(...ofCountry.slice(0, perCountry));
    leftovers.push(...ofCountry.slice(perCountry));
  }
  picked.push(...shuffle(leftovers, rng).slice(0, size - picked.length));
  return shuffle(picked, rng);
}

export type Tier = 'perfect' | 'great' | 'good' | 'low';

export function messageFor(score: number, total: number): { tier: Tier; text: string } {
  const ratio = total === 0 ? 0 : score / total;
  if (score === total && total > 0) return { tier: 'perfect', text: "Perfect! You're a true European explorer." };
  if (ratio >= 0.75) return { tier: 'great', text: 'Great job! You really know your way around.' };
  if (ratio >= 0.4) return { tier: 'good', text: "Not bad! A few more trips and you'll ace it." };
  return { tier: 'low', text: 'Thanks for playing. Time to plan a holiday!' };
}
