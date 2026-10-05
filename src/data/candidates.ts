import type { Question } from './questions';

/*
 * ALL CANDIDATE QUESTIONS, shown on the showcase page (/showcase/) for colleagues to pick from.
 * The game does NOT use this file; it uses src/data/questions.ts.
 *
 * Same format as questions.ts, so choosing a question = copy its line over there.
 * Photos go in `public/photos/` (shared with the game).
 * `title` is what the showcase displays; the game shows `fact` after answering.
 */
export const CANDIDATES: Question[] = [
  // Estonia
  { title: 'Mannavaht', image: 'placeholder.svg', answer: 'Estonia', fact: 'Mannavaht: whipped semolina with berry juice' },
  { title: 'Suur Munamägi, the highest point in the Baltics (318 m)', image: 'placeholder.svg', answer: 'Estonia' },
  { title: 'Tallinn Old Town', image: 'placeholder.svg', answer: 'Estonia', fact: 'Tallinn Old Town' },

  // Sweden
  { title: 'Midsummer maypole', image: 'placeholder.svg', answer: 'Sweden', fact: 'Dancing around the maypole at Midsummer' },

  // Spain (brainstorm ideas, delete if unwanted)
  { title: 'Castells (human towers)', image: 'placeholder.svg', answer: 'Spain' },
  { title: 'Churros with chocolate', image: 'placeholder.svg', answer: 'Spain' },

  // Greece (brainstorm ideas, delete if unwanted)
  { title: 'Meteora monasteries', image: 'placeholder.svg', answer: 'Greece' },
  { title: 'Evzones guards', image: 'placeholder.svg', answer: 'Greece' },
];
