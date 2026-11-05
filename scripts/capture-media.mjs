// Captures real screenshots and short muted preview clips of a live project
// website with Playwright. Output goes to public/media/<project>/.
//
//   npm run capture -- deadlinedesk https://getdeadlinedesk.com /demo
//
// The first path is captured as the "home" set, any further paths as extra
// screenshots and clips. Re-run whenever the live site changes.
import { chromium } from 'playwright';
import { mkdir, rm, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const [slug, base, ...extraPaths] = process.argv.slice(2);
if (!slug || !base) {
  console.error('Usage: npm run capture -- <slug> <https://site> [/extra-path ...]');
  process.exit(1);
}

const outDir = path.resolve('public/media', slug);
const tmpDir = path.join(os.tmpdir(), `capture-${slug}-${Date.now()}`);
await mkdir(outDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

// Falls back to the installed Edge or Chrome when Playwright's own Chromium is missing.
const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'msedge' })).catch(() => chromium.launch({ channel: 'chrome' }));

async function settle(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  // Close cookie or consent banners only by declining, if one exists.
  for (const label of ['Reject', 'Decline', 'Only necessary', 'Necessary only']) {
    const b = page.getByRole('button', { name: new RegExp(label, 'i') }).first();
    if (await b.isVisible().catch(() => false)) await b.click().catch(() => {});
  }
  await page.waitForTimeout(800);
}

async function stills(name, url) {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(url, { waitUntil: 'domcontentloaded' });
  await settle(desktop);
  await desktop.screenshot({ path: path.join(outDir, `${name}-desktop.jpg`), type: 'jpeg', quality: 82 });
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobile.goto(url, { waitUntil: 'domcontentloaded' });
  await settle(mobile);
  await mobile.screenshot({ path: path.join(outDir, `${name}-mobile.jpg`), type: 'jpeg', quality: 80 });
  await mobile.close();
}

async function clip(name, url) {
  const size = { width: 1280, height: 800 };
  const ctx = await browser.newContext({ viewport: size, recordVideo: { dir: tmpDir, size } });
  const page = await ctx.newPage();
  const started = Date.now();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await settle(page);
  const trimFrom = (Date.now() - started) / 1000;
  await page.screenshot({ path: path.join(outDir, `${name}-poster.jpg`), type: 'jpeg', quality: 80 });
  await page.waitForTimeout(1200);
  // Slow, even scroll: about ten seconds of real page content.
  for (let i = 0; i < 45; i++) {
    await page.mouse.wheel(0, 34);
    await page.waitForTimeout(110);
  }
  await page.waitForTimeout(1500);
  const video = page.video();
  await ctx.close();
  const raw = await video.path();
  const final = path.join(outDir, `${name}-preview.webm`);
  await rm(final, { force: true });
  await rename(raw, final);
  // The first seconds show the page loading. Put this number in the media
  // record's startAt so the player skips them.
  console.log(`clip ${name}: set startAt to ${Math.ceil(trimFrom * 10) / 10}`);
}

const pages = [['home', base], ...extraPaths.map((p) => [p.replace(/\W+/g, '') || 'page', new URL(p, base).href])];
for (const [name, url] of pages) {
  await stills(name, url);
  await clip(name, url);
}

await browser.close();
await rm(tmpDir, { recursive: true, force: true });
console.log('Saved to', outDir, (await readdir(outDir)).join(', '));
