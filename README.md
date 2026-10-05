# Guess the Country

A quick picture quiz for phones: each photo is from **Estonia, Sweden, Spain or Greece**, and the player picks which. Rules screen, 12 timed questions, then the score.

Built with React + TypeScript + Vite. It's a plain static site, so hosting is free.

## Add your questions

1. Copy the photos into `public/photos/`. JPG, PNG or WebP all work; about 1200px wide and under ~300 KB each loads fast on phones.
2. Edit [`src/data/questions.ts`](src/data/questions.ts), one line per photo:
   ```ts
   { image: 'tallinn.jpg', answer: 'Estonia', fact: 'Tallinn Old Town' },
   { image: 'oia.jpg', answer: 'Greece', credit: 'Photo: Jane Doe, CC BY-SA 4.0, Wikimedia Commons' },
   ```
   `fact` (shown after answering) and `credit` (listed on the result screen) are optional.
3. Delete the `placeholder.svg` entries.

Each game draws 12 questions, 3 per country, so have at least 3 per country. More gives variety on replays. The number of questions and the time limit are in [`src/config.ts`](src/config.ts).

## Run locally

```bash
npm install
npm run dev
```

`npm test` runs the logic tests. `npm run build` outputs the site to `dist/`.

## Deploy (GitHub Pages, free)

One-time setup:

1. Create a GitHub repo and push this project's `main` branch to it.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

After that, every push to `main` (including merging a pull request) runs the tests, builds, and publishes to **https://czech-unity-project.github.io/quiz/** in about a minute. A failing test stops the deploy. Pull requests into `main` run the same tests and build as a check, without deploying. Make a QR code from that URL for people to scan.

**Alternative:** import the repo on [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/) (free tiers). They detect Vite automatically: build command `npm run build`, output folder `dist`.

## Design

- [Design doc](docs/superpowers/specs/2026-10-05-country-trivia-design.md)
- [Style options mockup](docs/design/style-options.html): open it in a browser to compare all 10 styles. The game uses **6 · Matte mustard**.
