# Sources and licences

External resources actually used to build this site.

## Runtime dependencies (shipped to visitors)

| Package | Version | Licence | Use |
| --- | --- | --- | --- |
| react, react-dom | 19.3.1 | MIT | UI rendering |
| @fontsource-variable/sora | 5.3.0 | SIL Open Font License 1.1 (font), MIT (package) | Display typeface, self-hosted |
| @fontsource-variable/inter | 5.3.0 | SIL Open Font License 1.1 (font), MIT (package) | Body typeface, self-hosted |

Fonts are bundled with the site, so visitors' browsers make no requests to Google Fonts or other third parties.

## Build and test tools (not shipped)

| Package | Version | Licence | Use |
| --- | --- | --- | --- |
| vite | 8.3.6 | MIT | Dev server and static build |
| @vitejs/plugin-react | 6.2.1 | MIT | React support for Vite |
| typescript | 7.0.2 | Apache-2.0 | Type checking |
| @types/react, @types/react-dom | 19.3.0 | MIT | Type definitions |
| playwright | 1.64.1 | Apache-2.0 | Media capture and end-to-end checks |

Playwright's FFmpeg build was downloaded from Playwright's official CDN (`npx playwright install ffmpeg`)
to record clips. Browser checks ran in the locally installed Microsoft Edge through Playwright.

## Project material

| Source | What was used | Rights |
| --- | --- | --- |
| https://getdeadlinedesk.com and https://getdeadlinedesk.com/demo (checked 2026-11-05) | Screenshots and screen recordings in `public/media/deadlinedesk/`; page text informed the description | Owner's own project. The demo page states its data is synthetic sample data. |
| Owner's local DeadlineDesk project (README, KNOWN_ISSUES, deployment config, git history) | Feature list, completed vs not-built status, live domain, tools | Owner's own project. |
| https://deadlinedesk.com (checked 2026-11-05) | Only to confirm it is a domain-for-sale page; nothing reproduced | — |
| https://postdori.com (checked 2026-11-05) | Screenshots and recording in `public/media/postdori/`; homepage text informed the description | Owner's own project. |
| https://syedmargubelahi.github.io/careermap/ (checked 2026-11-05) | Screenshots and recording in `public/media/bcgo-careermap/`; page text (Bangla and English) informed the description | Owner's own project. |
| Owner's CV files on this computer, newest `CV-of-Syed-Margub-Elahi 2025.pdf` | Experience, education, credentials, publications, skills, languages, contact email and LinkedIn | Owner's own material. Private details not published. |
| Owner's CV photo | Portrait in About | Owner's own photo. |
| https://api.crossref.org (queried 2026-11-06) | Verified titles, authors, journals and DOIs of the three papers | Crossref metadata, CC0. |
| https://postdory.com (checked 2026-11-05) | DNS lookup failed; superseded by postdori.com | — |

No third-party code was copied into this repository. Icons are simple hand-written SVG paths.
