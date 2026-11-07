import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { profile } from './src/content/profile.ts';
import { projects } from './src/content/projects.ts';
import { experience } from './src/content/experience.ts';
import { education } from './src/content/education.ts';
import { publications } from './src/content/publications.ts';
import { credentials } from './src/content/credentials.ts';
import { capabilities } from './src/content/capabilities.ts';

// Writes the page title, description, social tags, structured data and a
// plain-text CV into index.html at build time, from published content only.
// Drafts never reach search metadata.
//
// The plain-text CV sits inside <noscript>. Applicant tracking systems (ATS),
// link previews and some search tools read a page without running JavaScript;
// they get the whole CV as simple, well-ordered HTML instead of an empty page.
// Link-preview card in public/. Give each new version a new file name (e.g. the date), so Facebook,
// LinkedIn and WhatsApp treat it as a new image instead of showing their saved copy of the old one.
const OG_IMAGE = 'og-card-2026-11-07b.jpg';

function contentMeta(): Plugin {
  const published = <T extends { visibility: string; order: number }>(items: T[]) =>
    items.filter((i) => i.visibility === 'published').sort((a, b) => a.order - b.order);
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = (v?: string) => {
    if (!v) return '';
    if (v === 'present') return 'Present';
    const [y, m] = v.split('-');
    return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
  };
  const range = (a: string | undefined, b: string) => (a ? `${date(a)} – ${date(b)}` : date(b));

  const jobs = published(experience);
  const current = jobs.filter((e) => e.end === 'present');
  const schools = published(education);
  const papers = published(publications);
  const creds = published(credentials);
  const skills = published(capabilities);
  const live = published(projects).filter((p) => p.link?.status === 'live');

  const title = `${profile.name} — ${profile.tagline}`;
  const description = profile.shortBio;
  const url = profile.siteUrl?.replace(/\/$/, '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.preferredName,
    description,
    jobTitle: current.map((e) => e.role),
    worksFor: [...new Set(current.map((e) => e.organization))].map((name) => ({ '@type': 'Organization', name })),
    address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
    ...(url ? { url } : {}),
    alumniOf: [...new Set(schools.map((e) => e.institution))].map((name) => ({ '@type': 'EducationalOrganization', name })),
    knowsAbout: skills.filter((g) => g.id !== 'languages').flatMap((g) => g.items),
    knowsLanguage: ['Bengali', 'English', 'Japanese'],
    sameAs: [...profile.contact.filter((c) => /^https?:/.test(c.href)).map((c) => c.href), ...live.map((p) => p.link!.url)],
  };

  const li = (s: string) => `<li>${escape(s)}</li>`;
  const cv = [
    `<article style="font-family: system-ui, sans-serif; max-width: 760px; margin: 0 auto; padding: 24px; line-height: 1.5">`,
    `<h1>${escape(profile.name)}</h1>`,
    `<p><strong>${escape(profile.titles.join(' | '))}</strong><br>${escape(profile.location)}</p>`,
    `<h2>Professional summary</h2><p>${escape(profile.heroIntro)}</p>`,
    ...(profile.strengths?.length ? [`<h2>Key strengths</h2><ul>${profile.strengths.map((s) => li(`${s.title}: ${s.text}`)).join('')}</ul>`] : []),
    `<h2>Work experience</h2>`,
    ...jobs.map(
      (j) =>
        `<h3>${escape(j.role)}, ${escape(j.organization)}</h3><p>${escape(range(j.start, j.end))}${j.location ? ` · ${escape(j.location)}` : ''}${j.employment ? ` · ${j.employment}` : ''}</p>` +
        (j.summary ? `<p>${escape(j.summary)}</p>` : '') +
        (j.highlights?.length ? `<ul>${j.highlights.map(li).join('')}</ul>` : ''),
    ),
    `<h2>Education</h2><ul>${schools.map((e) => li(`${e.qualification}, ${e.institution} (${range(e.start, e.end)})${e.note ? `. ${e.note}` : ''}`)).join('')}</ul>`,
    ...(papers.length
      ? [`<h2>Publications</h2><ul>${papers.map((p) => li(`${p.authors ? `${p.authors}. ` : ''}“${p.title}”. ${p.outlet}, ${date(p.date)}${p.citation ? `, ${p.citation}` : ''}.`)).join('')}</ul>`]
      : []),
    ...(live.length ? [`<h2>Projects</h2><ul>${live.map((p) => li(`${p.name}: ${p.tagline} ${p.link!.url}`)).join('')}</ul>`] : []),
    `<h2>Skills</h2>${skills.map((g) => `<p><strong>${escape(g.title)}:</strong> ${escape(g.items.join(', '))}</p>`).join('')}`,
    ...(creds.length
      ? [`<h2>Training, conferences and awards</h2><ul>${creds.map((c) => li(`${c.title}, ${c.issuer}${c.date ? ` (${date(c.date)})` : ''}`)).join('')}</ul>`]
      : []),
    `<h2>Contact</h2><ul>${profile.contact.map((c) => `<li><a href="${escape(c.href)}">${escape(c.label)}: ${escape(c.display)}</a></li>`).join('')}</ul>`,
    `<p><em>Turn on JavaScript to see the full interactive portfolio.</em></p>`,
    `</article>`,
  ].join('\n');

  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta name="author" content="${escape(profile.name)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(profile.name)} — Portfolio" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(url
      ? [
          `<link rel="canonical" href="${url}/" />`,
          `<meta property="og:url" content="${url}/" />`,
          `<meta property="og:image" content="${url}/${OG_IMAGE}" />`,
          `<meta property="og:image:secure_url" content="${url}/${OG_IMAGE}" />`,
          `<meta property="og:image:type" content="image/jpeg" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${escape(`${profile.name} — ${profile.tagline}`)}" />`,
          `<meta name="twitter:image" content="${url}/${OG_IMAGE}" />`,
        ]
      : []),
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ];

  return {
    name: 'content-meta',
    transformIndexHtml: (html) =>
      html.replace('<!-- content-meta -->', tags.join('\n    ')).replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n${cv}\n</noscript>`),
  };
}

// BASE_PATH is set by the GitHub Pages workflow ('/portfolio/'). Locally the site runs at '/'.
export default defineConfig({
  base: (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.BASE_PATH ?? '/',
  plugins: [react(), contentMeta()],
  build: { target: 'es2022' },
});
