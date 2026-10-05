import type { Country } from '../config';

export interface Question {
  /** File name inside `public/photos/`, e.g. 'tallinn-old-town.jpg'. */
  image: string;
  /** The correct country. */
  answer: Country;
  /** Optional line shown after answering, e.g. 'Tallinn Old Town'. */
  fact?: string;
  /** Optional photo credit, listed on the result screen (needed for Wikimedia/CC photos). */
  credit?: string;
}

/*
 * HOW TO ADD YOUR QUESTIONS
 * 1. Put the photo in `public/photos/` (jpg/png/webp, ideally ~1200px wide and under ~300 KB).
 * 2. Add an entry below: { image: 'my-photo.jpg', answer: 'Spain', fact: 'Sagrada Família, Barcelona' }
 * 3. Delete the placeholder entries.
 *
 * Each game picks ROUND_SIZE questions (see src/config.ts), balanced across the four
 * countries as far as the pool allows. More questions per country = more variety on replays.
 */
export const QUESTIONS: Question[] = [
  { image: 'placeholder.svg', answer: 'Estonia', fact: 'Placeholder: Estonia #1' },
  { image: 'placeholder.svg', answer: 'Estonia', fact: 'Placeholder: Estonia #2' },
  { image: 'placeholder.svg', answer: 'Estonia', fact: 'Placeholder: Estonia #3' },
  { image: 'placeholder.svg', answer: 'Estonia', fact: 'Placeholder: Estonia #4' },
  { image: 'placeholder.svg', answer: 'Sweden', fact: 'Placeholder: Sweden #1' },
  { image: 'placeholder.svg', answer: 'Sweden', fact: 'Placeholder: Sweden #2' },
  { image: 'placeholder.svg', answer: 'Sweden', fact: 'Placeholder: Sweden #3' },
  { image: 'placeholder.svg', answer: 'Sweden', fact: 'Placeholder: Sweden #4' },
  { image: 'placeholder.svg', answer: 'Spain', fact: 'Placeholder: Spain #1' },
  { image: 'placeholder.svg', answer: 'Spain', fact: 'Placeholder: Spain #2' },
  { image: 'placeholder.svg', answer: 'Spain', fact: 'Placeholder: Spain #3' },
  { image: 'placeholder.svg', answer: 'Spain', fact: 'Placeholder: Spain #4' },
  { image: 'placeholder.svg', answer: 'Greece', fact: 'Placeholder: Greece #1' },
  { image: 'placeholder.svg', answer: 'Greece', fact: 'Placeholder: Greece #2' },
  { image: 'placeholder.svg', answer: 'Greece', fact: 'Placeholder: Greece #3' },
  { image: 'placeholder.svg', answer: 'Greece', fact: 'Placeholder: Greece #4' },
];
