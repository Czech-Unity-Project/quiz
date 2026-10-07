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
  { title: 'Castells (human towers)', image: 'spain-castells.jpg', answer: 'Spain', fact: 'Castells: Catalan human towers up to ten levels high, topped by a child who climbs up and waves. On UNESCO\'s heritage list', credit: 'Photo: Jen Rose Smith' },
  { title: 'Churros with chocolate', image: 'placeholder.svg', answer: 'Spain' },
  { title: 'Paparajotes', image: 'spain-paparajotes.jpg', answer: 'Spain', fact: 'Paparajotes: a traditional dessert from Murcia. A fresh lemon tree leaf is coated in batter, fried and dusted with sugar and cinnamon (the leaf isn\'t eaten)' },
  { title: 'Cathedral of Santiago de Compostela', image: 'spain-santiago-cathedral.jpg', answer: 'Spain', fact: 'The Cathedral of Santiago de Compostela, where hundreds of thousands of pilgrims finish the Camino de Santiago every year' },
  { title: 'Baldness', image: 'spain-bald.jpg', answer: 'Spain', fact: 'According to some surveys, Spain has the highest share of bald men of any country' },
  { title: 'Las Fallas', image: 'spain-fallas.jpg', answer: 'Spain', fact: 'Las Fallas in Valencia: giant satirical papier-mâché figures (fallas) are built every year and burned in a huge celebration at the end' },

  // Greece (brainstorm ideas, delete if unwanted)
  { title: 'Meteora monasteries', image: 'greece-meteora.jpg', answer: 'Greece', fact: 'Meteora: monasteries built from the 14th century on top of giant rock pillars. Monks were once hauled up in nets on ropes' },
  { title: 'Evzones guards', image: 'greece-evzones.jpg', answer: 'Greece', fact: 'Evzones: the presidential guard at the Tomb of the Unknown Soldier in Athens, in pom-pom shoes (tsarouchia)' },
  { title: 'Christmas boat', image: 'greece-christmas-boat.jpg', answer: 'Greece', fact: 'Traditionally, Greeks decorate a sailing boat instead of a Christmas tree. It symbolizes a new sail in life and love for the sea' },
  { title: 'Olympic flame lighting ceremony', image: 'greece-olympic-flame.jpg', answer: 'Greece', fact: 'The Olympic flame is lit only in ancient Olympia before each Olympic Games: a circular mirror collects the sun\'s rays and lights the fire naturally' },
  { title: 'Kouloura vines, Santorini', image: 'greece-kouloura-vines.jpg', answer: 'Greece', fact: 'Kouloures: on Santorini, vines are woven into baskets to protect the grapes from strong winds and keep humidity inside in the volcanic soil' },
  { title: 'Antikythera mechanism', image: 'greece-antikythera-mechanism.jpg', answer: 'Greece', fact: 'The world\'s first analog computer, dated 150–100 BC, discovered off the island of Antikythera' },
];
