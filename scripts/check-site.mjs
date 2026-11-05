// End-to-end checks against the production build. Run `npm run build` first.
//
//   npm test
//
// Starts `vite preview`, opens the site in Chromium at phone, tablet and
// desktop sizes, checks layout, links, navigation, media controls, reduced
// motion and hidden sections, and saves screenshots to test-results/.
import { chromium } from 'playwright';
import { preview } from 'vite';
import { mkdir } from 'node:fs/promises';
import { projects } from '../src/content/projects.ts';
import { profile } from '../src/content/profile.ts';
import { credentials } from '../src/content/credentials.ts';
import { publications } from '../src/content/publications.ts';

// Expectations come from the content itself, so the checks stay valid as projects change.
const drafts = projects.filter((p) => p.visibility === 'draft');
const published = projects.filter((p) => p.visibility === 'published');
const unverified = published.filter((p) => p.link && p.link.status !== 'live');

const server = await preview({ preview: { port: 4174, strictPort: true }, logLevel: 'silent' });
// Set BASE_PATH=/portfolio/ to test the GitHub Pages build.
const base = 'http://localhost:4174' + (process.env.BASE_PATH ?? '/');
await mkdir('test-results', { recursive: true });

const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'msedge' })).catch(() => chromium.launch({ channel: 'chrome' }));
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const sizes = [
  { name: 'mobile', width: 375, height: 812, isMobile: true, hasTouch: true },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

for (const size of sizes) {
  const { name, ...viewport } = size;
  const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, hasTouch: viewport.hasTouch });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`${name}: no horizontal scroll`, overflow <= 0, `${overflow}px extra`);

  await page.screenshot({ path: `test-results/${name}-hero.png` });
  // Scroll through so every reveal runs, then capture the whole page.
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `test-results/${name}-full.png`, fullPage: true });
  check(`${name}: no console errors`, errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// Structure, links and content rules (desktop).
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });

  const navIds = await page.$$eval('#site-nav a', (as) => as.map((a) => a.getAttribute('href')));
  const missing = [];
  for (const href of navIds) if (!(await page.$(href))) missing.push(href);
  check('nav links point at sections that exist', missing.length === 0, navIds.join(' '));
  const pub = (items) => items.some((i) => i.visibility === 'published');
  const expectContact = profile.contact.length > 0 || Boolean(profile.cvFile);
  check('Contact link shown only when contact details exist', navIds.includes('#contact') === expectContact);
  check('sections render only when they have published content',
    Boolean(await page.$('#contact')) === expectContact &&
    Boolean(await page.$('#credentials')) === pub(credentials) &&
    Boolean(await page.$('#writing')) === pub(publications));
  const phoneShown = /\+?880\s?1\d{3}/.test(await page.evaluate(() => document.body.innerText));
  check('no phone number on the page', !phoneShown);

  const external = await page.$$eval('a[target="_blank"]', (as) =>
    as.map((a) => ({ href: a.href, rel: a.rel, label: a.getAttribute('aria-label') ?? '' })),
  );
  const unsafe = external.filter((a) => !a.rel.includes('noopener') || !a.rel.includes('noreferrer') || !/new tab/.test(a.label));
  check('external links are safe and labelled', external.length > 0 && unsafe.length === 0, `${external.length} links`);
  check('only verified project URLs are linked', unverified.every((p) => external.every((a) => a.href !== new URL(p.link.url).href)));
  const liveUrls = published.filter((p) => p.link?.status === 'live').map((p) => new URL(p.link.url).href);
  check('every live project URL is linked', liveUrls.every((u) => external.some((a) => a.href === u)), liveUrls.join(' '));

  const text = await page.evaluate(() => document.body.innerText);
  check('published projects are shown', published.every((p) => text.includes(p.name)));
  check('draft projects are not shown', drafts.every((p) => !text.includes(p.name)), drafts.map((p) => p.name).join(', ') || 'no drafts');
  const meta = await page.content();
  check('draft projects are not in metadata', drafts.every((p) => !meta.includes(p.name)));

  const noAlt = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.hasAttribute('alt')).length);
  check('every image has alt text', noAlt === 0);
  const h1 = await page.$$eval('h1', (h) => h.length);
  check('exactly one h1', h1 === 1);

  // Hero clip plays when visible and pauses offscreen.
  await page.waitForTimeout(1500);
  const heroPlaying = await page.$eval('.hero video', (v) => !v.paused);
  check('hero preview plays while visible', heroPlaying);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  const heroPausedOff = await page.$eval('.hero video', (v) => v.paused);
  check('hero preview pauses offscreen', heroPausedOff);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);

  // Pause button is respected.
  await page.click('.hero .video-toggle');
  await page.waitForTimeout(300);
  const pausedByUser = await page.$eval('.hero video', (v) => v.paused);
  const label = await page.getAttribute('.hero .video-toggle', 'aria-label');
  check('pause button pauses the clip', pausedByUser && /^Play/.test(label ?? ''), label ?? '');

  // Media tabs switch clips and support arrow keys.
  const tab = page.getByRole('tab', { name: 'Homepage' });
  await tab.click();
  check('media tab selects clip', (await tab.getAttribute('aria-selected')) === 'true');
  await page.keyboard.press('ArrowRight');
  const selected = await page.getByRole('tab', { name: 'Demo workspace' }).getAttribute('aria-selected');
  check('media tabs respond to arrow keys', selected === 'true');

  // Case study toggles in place.
  const btn = page.getByRole('button', { name: 'View Case Study' });
  await btn.click();
  const expanded = await page.getByRole('button', { name: 'Hide Case Study' }).getAttribute('aria-expanded');
  const panelVisible = await page.getByRole('region', { name: 'DeadlineDesk case study' }).isVisible();
  check('case study opens and reports aria-expanded', expanded === 'true' && panelVisible);
  await page.getByRole('region', { name: 'DeadlineDesk case study' }).screenshot({ path: 'test-results/case-study.png' });

  // A project whose site is not live jumps to its entry instead of a broken link.
  for (const p of unverified) {
    const href = await page.getAttribute(`a.capsule-link[href="#work-${p.id}"]`, 'href');
    check(`${p.name}: unverified capsule links in-page`, href === `#work-${p.id}`);
  }

  // Every project's clip plays when scrolled into view.
  for (const p of published.filter((p) => p.media.some((m) => m.kind === 'video'))) {
    await page.locator(`#work-${p.id} video`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const playing = await page.$eval(`#work-${p.id} video`, (v) => !v.paused && v.readyState >= 2);
    check(`${p.name}: preview clip loads and plays in view`, playing);
  }
  await page.evaluate(() => window.scrollTo(0, 0));

  // Keyboard: first Tab reaches the skip link.
  await page.goto(base);
  await page.keyboard.press('Tab');
  const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim());
  check('first Tab focuses "Skip to content"', firstFocus === 'Skip to content', firstFocus ?? '');
  await ctx.close();
}

// Mobile menu.
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  const navHidden = !(await page.locator('#site-nav').isVisible());
  await page.click('.menu-toggle');
  const open = (await page.getAttribute('.menu-toggle', 'aria-expanded')) === 'true' && (await page.locator('#site-nav').isVisible());
  await page.screenshot({ path: 'test-results/mobile-menu.png' });
  await page.click('#site-nav a[href="#about"]');
  await page.waitForTimeout(900);
  const closed = (await page.getAttribute('.menu-toggle', 'aria-expanded')) === 'false';
  check('mobile menu hidden, opens, and closes after choosing a link', navHidden && open && closed);
  await ctx.close();
}

// Reduced motion: nothing autoplays, content is visible at once.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const anyPlaying = await page.$$eval('video', (vs) => vs.some((v) => !v.paused));
  check('reduced motion: no clip autoplays', !anyPlaying);
  const hidden = await page.$$eval('.reveal', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
  check('reduced motion: revealed content is visible immediately', hidden === 0, `${hidden} hidden`);
  await page.click('.hero .video-toggle');
  await page.waitForTimeout(600);
  check('reduced motion: Play button still works', await page.$eval('.hero video', (v) => !v.paused));
  await ctx.close();
}

// Without JavaScript the page still explains who this is.
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(base);
  check('no-JS fallback text present', (await page.textContent('noscript'))?.includes('Syed Margub Elahi') ?? false);
  await ctx.close();
}

await browser.close();
await server.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed. Screenshots in test-results/.`);
process.exit(failed.length ? 1 : 0);
