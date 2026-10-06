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
  { title: 'Suur Munamägi', image: 'estonia-suur-munamagi.jpg', answer: 'Estonia', fact: 'Suur Munamägi ("Big Egg Mountain"): at 318 m, the highest point in the Baltics' },
  { title: 'Alexander Nevsky Cathedral, Tallinn', image: 'estonia-tallinn-cathedral.jpg', answer: 'Estonia', fact: 'Alexander Nevsky Cathedral, a Russian Orthodox church in Tallinn Old Town' },
  { title: 'Mannavaht', image: 'estonia-mannavaht.jpg', answer: 'Estonia', fact: 'Mannavaht: semolina whipped with berry juice until it turns pink and fluffy' },
  { title: 'Song Festival', image: 'estonia-song-festival.jpg', answer: 'Estonia', fact: 'The Song Festival in Tallinn: tens of thousands sing together. Mass singing helped win independence in the "Singing Revolution"' },

  // Sweden
  { title: 'Swedish meatballs', image: 'sweden-meatballs.jpg', answer: 'Sweden', fact: 'Köttbullar: meatballs with mash and lingonberries' },
  { title: 'Visby town wall', image: 'sweden-visby-wall.jpg', answer: 'Sweden', fact: 'The medieval town wall of Visby, on the island of Gotland' },
  { title: 'Midsummer', image: 'sweden-midsummer.jpg', answer: 'Sweden', fact: 'Midsummer: flower crowns and dancing around the maypole' },
  { title: 'Julbock (straw Christmas goat)', image: 'sweden-halmbocken.jpg', answer: 'Sweden', fact: 'The julbock, a straw Christmas goat. The giant one in Gävle is famous for being set on fire' },
  { title: 'Cinnamon buns', image: 'sweden-cinnamon-buns.jpg', answer: 'Sweden', fact: 'Kanelbullar: cinnamon buns, a staple of fika. Sweden even has a Cinnamon Bun Day (4 October)' },

  // Spain
  { title: 'La Tomatina', image: 'spain-la-tomatina.jpg', answer: 'Spain', fact: 'La Tomatina in Buñol: a giant tomato fight every August' },
  // (brainstorm ideas, delete if unwanted)
  { title: 'Castells (human towers)', image: 'placeholder.svg', answer: 'Spain' },
  { title: 'Churros with chocolate', image: 'placeholder.svg', answer: 'Spain' },

  // Greece (brainstorm ideas, delete if unwanted)
  { title: 'Meteora monasteries', image: 'placeholder.svg', answer: 'Greece' },
  { title: 'Evzones guards', image: 'greece-evzones.jpg', answer: 'Greece', fact: 'Evzones: the presidential guard at the Tomb of the Unknown Soldier in Athens, in pom-pom shoes (tsarouchia)' },
];
