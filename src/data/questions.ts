import type { Country } from '../config';

/** Kind of photo; used to keep the order varied (no two of the same kind in a row). */
export type Category = 'food' | 'place' | 'nature' | 'tradition' | 'history';

export interface Question {
  /** What the photo shows, e.g. 'Tallinn Old Town'. Shown on the showcase page; the game doesn't show it. */
  title?: string;
  /** A few words shown under the photo before answering, e.g. 'Typical food'. Must not give away the country. */
  prompt?: string;
  /** File name inside `public/photos/`, e.g. 'tallinn-old-town.jpg'. */
  image: string;
  /** The correct country. */
  answer: Country;
  /** Optional line shown after answering, e.g. 'Tallinn Old Town'. */
  fact?: string;
  /** Optional photo credit, listed on the result screen (needed for Wikimedia/CC photos). */
  credit?: string;
  category?: Category;
  /**
   * How the photo fills the frame, which is tall and narrow on phones.
   * 'cover' (default) fills the frame and crops the sides; 'contain' shows the whole photo
   * with a blurred copy behind it. Use 'contain' for wide photos whose edges matter (panoramas).
   */
  fit?: 'cover' | 'contain';
  /** Which part to keep when cropping (CSS object-position), e.g. 'right' or '80% center'. Default: centre. */
  focus?: string;
}

/*
 * THE QUESTIONS IN THE GAME, played in exactly this order (SHUFFLE_QUESTIONS = false in src/config.ts).
 * Pick them from the showcase (src/data/candidates.ts): copy a line here and add a `prompt` and a `category`.
 *
 * The order follows these rules, checked by src/data/questions.test.ts (`npm test`):
 * - 3 questions per country
 * - exactly one place where the same country comes twice in a row (no three in a row)
 * - never the same category twice in a row
 */
export const QUESTIONS: Question[] = [
  { title: 'Swedish meatballs', prompt: 'Typical food', image: 'sweden-meatballs.jpg', answer: 'Sweden', category: 'food', fact: 'Köttbullar: meatballs with mash and lingonberries' },
  { title: 'Las Fallas', prompt: 'Spring festivity', image: 'spain-fallas.jpg', answer: 'Spain', category: 'tradition', fact: 'Las Fallas in Valencia: giant satirical papier-mâché figures (fallas) are built every year and burned in a huge celebration at the end' },
  { title: 'Meteora monasteries', prompt: 'Monastery', image: 'greece-meteora.jpg', focus: '82% center', answer: 'Greece', category: 'place', fact: 'Meteora: monasteries built from the 14th century on top of giant rock pillars. Monks were once hauled up in nets on ropes' },
  { title: 'Paparajotes', prompt: 'Regional dessert', image: 'spain-paparajotes.jpg', fit: 'contain', answer: 'Spain', category: 'food', fact: 'Paparajotes: a traditional dessert from Murcia. A fresh lemon tree leaf is coated in batter, fried and dusted with sugar and cinnamon (the leaf isn\'t eaten)' },
  { title: 'Suur Munamägi', prompt: 'Highest peak (318 m)', image: 'estonia-suur-munamagi.jpg', answer: 'Estonia', category: 'nature', fact: 'Suur Munamägi ("Big Egg Mountain"): at 318 m, the highest point in the Baltics' },
  { title: 'Midsummer', prompt: 'Summer celebration', image: 'sweden-midsummer.jpg', answer: 'Sweden', category: 'tradition', fact: 'Midsummer: flower crowns and dancing around the maypole' },
  { title: 'Alexander Nevsky Cathedral, Tallinn', prompt: 'The capital', image: 'estonia-tallinn-cathedral.jpg', answer: 'Estonia', category: 'place', fact: 'Alexander Nevsky Cathedral, a Russian Orthodox church in Tallinn Old Town' },
  { title: 'Kouloura vines, Santorini', prompt: 'Unusual vine weaving', image: 'greece-kouloura-vines.jpg', answer: 'Greece', category: 'nature', fact: 'Kouloures: on Santorini, vines are woven into baskets to protect the grapes from strong winds and keep humidity inside in the volcanic soil' },
  { title: 'Antikythera mechanism', prompt: 'First analog computer', image: 'greece-antikythera-mechanism.jpg', answer: 'Greece', category: 'history', fact: 'The world\'s first analog computer, dated 150–100 BC, discovered off the island of Antikythera' },
  { title: 'Julbock (straw Christmas goat)', prompt: 'Goat statue burning', image: 'sweden-halmbocken.jpg', answer: 'Sweden', category: 'tradition', fact: 'The julbock, a straw Christmas goat. The giant one in Gävle is famous for being set on fire' },
  { title: 'Cathedral of Santiago de Compostela', prompt: 'Pilgrimage destination', image: 'spain-santiago-cathedral.jpg', answer: 'Spain', category: 'place', fact: 'The Cathedral of Santiago de Compostela, where hundreds of thousands of pilgrims finish the Camino de Santiago every year' },
  { title: 'Song Festival', prompt: 'Singing Festival', image: 'estonia-song-festival.jpg', fit: 'contain', answer: 'Estonia', category: 'tradition', fact: 'The Song Festival in Tallinn: tens of thousands sing together. Mass singing helped win independence in the "Singing Revolution"' },
];
