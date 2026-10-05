# Country Trivia Minigame — Design

**Date:** 2026-10-05
**Status:** Draft, awaiting review
**Branch:** `design`

## 1. Goal

A short, good-looking picture trivia game people open on their phones through a link or QR code. Each question shows a photo, and the player guesses which of four countries it belongs to: **Estonia, Sweden, Spain, Greece**. It must be **free to host**, **trivial to deploy**, and buildable on a tight deadline.

### Non-goals (YAGNI)

- No leaderboard, accounts, or backend. The score is shown only to the player.
- No multiple languages. The UI is English only.
- No admin UI. Questions are edited in a single data file.

## 2. Player flow

```
Rules screen ──Start──▶ Question 1..12 ──▶ Result screen ──Play again──▶ Rules screen
```

1. **Rules screen**: title, a 3–4 bullet rules list ("12 pictures", "pick the country", "10 seconds each", "1 point per correct answer"), and a **Start** button.
2. **Question screen** (×12):
   - Progress indicator ("Question 4 / 12") and current score.
   - One photo, which takes most of the screen.
   - A 10-second countdown bar that shrinks visibly.
   - Four large buttons: Estonia, Sweden, Spain, Greece, always in the same order so players learn the positions. Each has a small flag emoji.
   - **On answer:** the timer stops, all buttons lock, the picked button turns green or red, and the correct one is always highlighted green. An optional one-line fact appears ("Tallinn Old Town"). A **Next** button appears.
   - **On timeout:** treated as wrong. The correct answer is highlighted, a "Time's up!" label is shown, and **Next** appears.
3. **Result screen**: big score "9 / 12", a farewell message chosen by score band, a **Play again** button, and a collapsible "Photo credits" list.

| Score  | Message (draft)                                  |
|--------|--------------------------------------------------|
| 12     | "Perfect! You're a true European explorer."      |
| 9–11   | "Great job! You really know your way around."    |
| 5–8    | "Not bad! A few more trips and you'll ace it."   |
| 0–4    | "Thanks for playing — time to plan a holiday!"   |

## 3. Content

- **Pool:** about 20 questions, 5 per country, in `src/data/questions.ts`.
- **Per game:** pick **3 per country** at random (12 total) and shuffle the order. Each game is balanced and replays differ.
- **Entry shape:**
  ```ts
  type Country = 'Estonia' | 'Sweden' | 'Spain' | 'Greece';
  interface Question {
    id: string;
    image: string;      // path under /public/images, e.g. 'images/ee-tallinn.jpg'
    answer: Country;
    fact?: string;      // shown after answering
    credit: string;     // "Photo: Author, CC BY-SA 4.0, Wikimedia Commons"
  }
  ```
- **Images:** free-licence photos from Wikimedia Commons (landmarks, landscapes, food, architecture). Avoid photos that give the answer away, such as visible flags or signs in the local language, unless meant as easy questions. Store them locally in `public/images/`, resized to about 1200px wide and under 200 KB each so phones load them fast. Credits are listed on the result screen to meet CC BY / BY-SA terms. They can be replaced later with your own photos by swapping files and editing `questions.ts`.
- **Preloading:** when a question shows, preload the next image so it appears instantly.

## 4. Tech stack

| Concern    | Choice                         | Why                                                       |
|------------|--------------------------------|-----------------------------------------------------------|
| Framework  | **React 19 + TypeScript**      | Familiar, and components keep each screen small           |
| Build      | **Vite**                       | Zero-config, fast, outputs plain static files             |
| Styling    | **Tailwind CSS v4**            | Nice look with little CSS, mobile-first utilities         |
| Animation  | **Framer Motion** (`motion`)   | Screen transitions, button feedback, and timer bar in a few lines |
| Tests      | **Vitest**                     | Unit tests for game logic, same config as Vite            |

No router and no state library: one `useReducer` holds the whole game state.

## 5. Architecture

```
src/
  main.tsx                 # React entry
  App.tsx                  # picks the screen from game state, wraps in <AnimatePresence>
  game/
    logic.ts               # pure functions: buildRound, scoreFor, messageFor
    reducer.ts             # game state machine (useReducer)
    logic.test.ts          # Vitest unit tests
    reducer.test.ts
  data/
    questions.ts           # question pool + Country type
  components/
    RulesScreen.tsx
    QuestionScreen.tsx     # photo, options, feedback, Next
    TimerBar.tsx           # 10s countdown, calls onTimeout
    AnswerButton.tsx       # idle / correct / wrong / disabled states
    ResultScreen.tsx       # score, farewell, credits, play again
public/
  images/                  # question photos
.github/workflows/deploy.yml
vite.config.ts             # base: '/cup-minigame/'
```

### Game state machine (`reducer.ts`)

```ts
type Phase = 'rules' | 'question' | 'feedback' | 'result';
interface GameState {
  phase: Phase;
  round: Question[];        // the 12 picked questions
  index: number;            // current question
  score: number;
  picked: Country | null;   // null + phase 'feedback' = timed out
}
type Action =
  | { type: 'START' }                     // rules → question (builds new round)
  | { type: 'ANSWER'; country: Country }  // question → feedback
  | { type: 'TIMEOUT' }                   // question → feedback (wrong)
  | { type: 'NEXT' }                      // feedback → question | result
  | { type: 'RESTART' };                  // result → rules
```

- Actions that don't fit the current phase are ignored, such as a double tap on an answer or an `ANSWER` arriving after a `TIMEOUT`. This handles the race between the timer and the tap.
- `buildRound(pool, rng = Math.random)` takes an injectable RNG so tests are deterministic.

### Timer

`TimerBar` gets a `key` per question index so it restarts on each question. It animates width from 100% to 0% over 10s with Framer Motion and dispatches `TIMEOUT` when done. It stops when the phase leaves `question`. The bar turns orange and then red in the last 3 seconds.

## 6. Look & feel

- Mobile-first, centred column with a max width of about 480px, so it also looks fine on desktop.
- A soft gradient background, the photo in a rounded card with a shadow, and big pill-shaped answer buttons in a 2×2 grid.
- Motion: screens slide/fade between each other, buttons scale slightly on tap, the correct answer pulses, and a short confetti burst plays on a perfect score (`canvas-confetti`, about 3 KB).
- Large tap targets (≥ 48px), readable contrast, and `prefers-reduced-motion` respected (animations off).

## 7. Deployment (free, push-to-deploy)

**Host:** **GitHub Pages**. It's free, the code and site live in one place, and no extra accounts are needed.

**One-time setup (≈5 min):**
1. Create a GitHub repo `cup-minigame` and push `main`.
2. Repo **Settings → Pages → Source: "GitHub Actions"**.
3. In `vite.config.ts`, set `base: '/cup-minigame/'` to match the repo name.

**Every deploy:** `git push` to `main`. The workflow `.github/workflows/deploy.yml` runs:
`checkout → setup-node → npm ci → npm test → npm run build → upload-pages-artifact (dist/) → deploy-pages`.
The site is live at `https://<github-user>.github.io/cup-minigame/` within about 1 minute. A failing test blocks the deploy.

**QR code:** generate one for the Pages URL and commit it as `qr.png` for printing. The README links to it.

**Fallback:** if GitHub Pages is blocked for an org/private repo, import the repo into **Vercel** or **Netlify** (free tier, auto-detects Vite, no workflow needed). Set `base: '/'` in that case.

## 8. Testing

- **Unit (Vitest):**
  - `buildRound` returns 12 unique questions, exactly 3 per country, shuffled, and deterministic with a seeded RNG.
  - Reducer: the full happy path, a timeout counting as wrong, `ANSWER` ignored after `TIMEOUT`, double answers ignored, `NEXT` on the last question going to `result`, and `RESTART` resetting the score.
  - `messageFor` score bands, including the edges 0, 4, 5, 8, 9, 11, 12.
- **Manual checklist before sharing:** play through on a real phone (iOS Safari plus Android Chrome), let one question time out, check that all 20 images load on the deployed URL (base path!), replay twice, and check that credits show.

## 9. Risks

| Risk                                   | Mitigation                                             |
|----------------------------------------|--------------------------------------------------------|
| Images 404 on Pages (wrong base path)  | Reference images via `import.meta.env.BASE_URL`; checked in the manual checklist |
| Large photos load slowly on mobile data | Resize to ≤ 200 KB; preload the next image          |
| Licence attribution forgotten          | `credit` is a required field and is rendered on the result screen |
| Deadline                               | The logic is small. Polish (confetti, facts) is optional and can be cut last |
