# Margub's portfolio — working notes for Claude

Personal portfolio and living CV for **Syed Margub Elahi** (preferred name Margub), Dhaka, Bangladesh.
The owner has no engineering background: explain essentials in plain language, make routine technical
decisions yourself, and ask only when a missing fact changes the result.

## Architecture

- Vite + React 19 + TypeScript. Single static page, no router, no backend, no runtime services.
- `npm run build` writes a static site to `dist/`. Any static host works (Cloudflare Pages, Netlify, GitHub Pages).
- Dependencies are deliberately minimal: React, two self-hosted fonts. Motion is CSS plus `IntersectionObserver`.
- `vite.config.ts` writes `<title>`, description, Open Graph tags and Person JSON-LD into `index.html`
  at build time, from **published** content only.

```
src/
  content/        ← all words, links, dates and media references live here
    types.ts      ← the shape of every record (read this first)
    profile.ts    ← name, hero text, about, contact links, CV file, portrait
    projects.ts   ← projects, media, case studies
    experience.ts  education.ts  credentials.ts  publications.ts  capabilities.ts
    index.ts      ← applies visibility + ordering; components import only from here
  components/     ← one file per section, plus ui.tsx (shared bits) and PreviewVideo.tsx
  styles/         ← tokens.css (colours, type, motion), base.css, sections.css
  hooks.ts  format.ts
public/media/<project-id>/   ← real screenshots and clips
scripts/capture-media.mjs    ← captures real screenshots/clips of a live site
scripts/check-site.mjs       ← end-to-end checks (npm test)
```

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (once). |
| `npm run dev` | Local dev server at http://localhost:5173. Add `?drafts` to the URL to see drafts. |
| `npm run build` | Type-check and build the static site into `dist/`. |
| `npm run preview` | Serve the built site at http://localhost:4173. |
| `npm test` | Build must exist. Runs about 30 browser checks, driven by the content files, at phone/tablet/desktop sizes; screenshots go to `test-results/`. |
| `npm run capture -- <id> <https://site> [/path ...]` | Saves real desktop/mobile screenshots, posters and muted clips to `public/media/<id>/`. Prints the `startAt` value for each clip. In Git Bash, prefix with `MSYS_NO_PATHCONV=1` so `/path` is not rewritten. |

## Content rules (never break these)

- Never invent testimonials, metrics, credentials, screenshots, features, URLs or meanings of names (e.g. BCGO).
- Inspect any supplied website or material before describing it. Record the check date in `link.checked`.
- A project link is `status: 'live'` only after it has been opened and shows the owner's project.
  Otherwise `unverified`: shown as text, never linked; the capsule jumps to the in-page entry.
- Mark features `completed`, `planned` or `not-built`. Separate personal contribution (`contribution`)
  from help by others or tools (`collaboration`).
- `lessons` must come from Margub. Leave empty until supplied (empty parts of a case study are hidden).
- Do not publish grades, financial details, date of birth or family information.
- No skill percentages or proficiency scores.
- Contact links and CV download appear only when real details/files exist. No fake contact form.
- Uncertain records stay `visibility: 'draft'`. Drafts never render in production or in metadata.
  Note: draft text is still inside the JavaScript bundle, so never put private material in content files.

## Design rules

- Palette (in `styles/tokens.css`): warm off-white `--paper`, deep navy `--ink`, royal blue `--royal`,
  restrained `--lavender` and `--mint` accents. Each project picks `accent: 'royal' | 'lavender' | 'mint'`.
- Type: Sora (display, `--font-display`) and Inter (body), self-hosted via Fontsource.
- Shapes: rounded media frames (`--radius-lg`), pill buttons and links, soft shadows (`--shadow-*`).
- Layouts vary per section (collage, typographic panel, numbered list, dark timeline, pill rows). Avoid
  repetitive card grids, clutter and neon.
- Monogram "ME" stands in for logo/portrait until `profile.portrait` is set.
- Motion: one easing family (`--ease-out`), durations `--dur-fast/med/slow`. Reveals via `<Reveal>`.
  No scroll hijacking, no audio, no parallax tied to scroll.
- Video: always muted, poster first, lazy-loaded, plays only while visible, pauses offscreen, never
  autoplays under reduced motion, has a visible Play/Pause button. Use `<PreviewVideo>`.
- Accessibility: semantic landmarks, one `h1`, visible focus, skip link, keyboard tabs (arrow keys),
  `aria-expanded` on toggles, external links say "(opens in a new tab)" and use `rel="noopener noreferrer"`.

## Update workflow

When Margub supplies a new website, app, image, clip, certificate, achievement, article or description:

1. Inspect it (open the site, read the document, view the image). Note facts and what is still unknown.
2. Find any existing record for it and update that record — never create a duplicate id.
3. Choose the section: project → `projects.ts`; job → `experience.ts`; degree → `education.ts`;
   certificate/training/seminar/conference/activity/volunteering/award → `credentials.ts`
   (set `type` and honest `involvement`); article/research → `publications.ts`; contact/CV/portrait → `profile.ts`.
4. Write a concise, accurate title and supporting copy. For a live site, run `npm run capture` for real media.
5. If only a title is supplied, add a `draft` record and list the missing facts back to Margub.
6. Keep the design system; reuse existing components rather than adding new styles.
7. Run `npm run build` and `npm test`, look at the screenshots, then summarise what changed.
8. Remind Margub that the live site changes only after rebuilding and redeploying. The deployed site
   does not read these conversations.

## Private notes

Decisions, sources on Margub's computer and open items live in `PRIVATE_NOTES.md`, which is git-ignored
because this repository is public. Read it first when it exists. Never commit private paths, excluded CV
claims or personal details.
