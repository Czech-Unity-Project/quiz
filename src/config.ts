export const COUNTRIES = ['Estonia', 'Sweden', 'Spain', 'Greece'] as const;
export type Country = (typeof COUNTRIES)[number];

/** Questions per game. */
export const ROUND_SIZE = 12;

/**
 * false: play QUESTIONS in the exact order of src/data/questions.ts (a hand-picked order).
 * true: pick ROUND_SIZE at random, balanced across countries, in shuffled order.
 */
export const SHUFFLE_QUESTIONS = false;

/** Linked on the result screen. */
export const INSTAGRAM = { handle: 'czechunityproject', url: 'https://www.instagram.com/czechunityproject/' };

/** Seconds per question before it counts as wrong. */
export const TIME_LIMIT_SECONDS = 10;
