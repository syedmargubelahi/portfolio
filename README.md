# Syed Margub Elahi — Portfolio & CV

A static portfolio site: projects with real previews, about, experience, education, and space for
credentials, writing and contact details.

## Set up (once)

1. Install Node.js 20 or newer from https://nodejs.org.
2. In this folder, run:

   ```
   npm install
   ```

## See it on your computer

```
npm run dev
```

Open http://localhost:5173. Add `?drafts` to the address (http://localhost:5173/?drafts) to see draft entries.

## Change the content

Everything you would want to edit is in `src/content/`:

- `profile.ts` — headline, introduction, about text, contact links, CV file, portrait
- `projects.ts` — projects, links, screenshots, clips, case studies
- `experience.ts`, `education.ts` — your CV
- `credentials.ts` — certificates, training, seminars, conferences, activities, volunteering, awards
- `publications.ts` — articles and research

Set `visibility: 'published'` to show a record, `'draft'` to hide it. Empty sections hide themselves
and their menu link. Put images, clips and your CV PDF in `public/`.

The easiest way is to send the new material to Claude and ask for the update — see `CLAUDE.md`.

## Check before publishing

```
npm run build
npm test
```

`npm test` checks phone, tablet and desktop layouts, links, menus, video controls and reduced-motion
behaviour, and saves screenshots to `test-results/`.

## Publish

The build output is the `dist/` folder: plain files, no server code. Free options:

- **Cloudflare Pages** or **Netlify**: connect the Git repository, build command `npm run build`,
  output folder `dist`. Or drag the `dist` folder into Netlify's dashboard.
- **GitHub Pages**: upload `dist/` with a Pages workflow.

After publishing, set `siteUrl` in `src/content/profile.ts` to the public address and rebuild; this adds
canonical and social-sharing URL tags.

**Every content change needs a rebuild and redeploy** before visitors see it. With a connected Git
repository, pushing the change triggers that automatically.
