export const COUNTRIES = ['Estonia', 'Sweden', 'Spain', 'Greece'] as const;
export type Country = (typeof COUNTRIES)[number];

/** Questions per game. */
export const ROUND_SIZE = 12;

/** Seconds per question before it counts as wrong. */
export const TIME_LIMIT_SECONDS = 10;
