import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { profile } from './src/content/profile.ts';
import { projects } from './src/content/projects.ts';
import { experience } from './src/content/experience.ts';
import { education } from './src/content/education.ts';

// Writes the page title, description, social tags and structured data into
// index.html at build time, from published content only. Drafts never reach
// search metadata.
function contentMeta(): Plugin {
  const published = <T extends { visibility: string }>(items: T[]) => items.filter((i) => i.visibility === 'published');
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  const title = `${profile.name} — Portfolio & CV`;
  const description = profile.shortBio;
  const url = profile.siteUrl?.replace(/\/$/, '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.preferredName,
    description,
    address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
    ...(url ? { url } : {}),
    worksFor: published(experience).map((e) => ({ '@type': 'Organization', name: e.organization })),
    jobTitle: published(experience).map((e) => e.role),
    alumniOf: [...new Set(published(education).map((e) => e.institution))].map((name) => ({
      '@type': 'EducationalOrganization',
      name,
    })),
    sameAs: [
      ...profile.contact.filter((c) => /^https?:/.test(c.href)).map((c) => c.href),
      ...published(projects)
        .filter((p) => p.link?.status === 'live')
        .map((p) => p.link!.url),
    ],
  };

  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(url
      ? [
          `<link rel="canonical" href="${url}/" />`,
          `<meta property="og:url" content="${url}/" />`,
          `<meta property="og:image" content="${url}/og-image.png" />`,
        ]
      : []),
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ];

  return {
    name: 'content-meta',
    transformIndexHtml: (html) => html.replace('<!-- content-meta -->', tags.join('\n    ')),
  };
}

// BASE_PATH is set by the GitHub Pages workflow ('/portfolio/'). Locally the site runs at '/'.
export default defineConfig({
  base: (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.BASE_PATH ?? '/',
  plugins: [react(), contentMeta()],
  build: { target: 'es2022' },
});
