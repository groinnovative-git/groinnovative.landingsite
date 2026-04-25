/**
 * Sitemap Generator — runs at build time (zero dependencies)
 *
 * Usage:  node scripts/generate-sitemap.mjs
 * Hook:   called automatically before `vite build` via package.json
 *
 * To add a new page, add one object to the `routes` array below.
 *
 * The BASE_URL is read from the .env file (VITE_SITE_URL) so that
 * sitemap URLs always match the canonical domain.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─── Read VITE_SITE_URL from .env ───────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env');

let BASE_URL = 'https://groinnovative.com'; // fallback

try {
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/^VITE_SITE_URL\s*=\s*(.+)$/m);
    if (match) {
        BASE_URL = match[1].trim().replace(/\/+$/, '');
    }
} catch {
    console.warn('⚠  .env not found, using fallback BASE_URL:', BASE_URL);
}

// ─── Routes ─────────────────────────────────────────────────────
const routes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/services', changefreq: 'weekly', priority: '0.9' },
    { path: '/contact', changefreq: 'monthly', priority: '0.7' },
];

// ─── Generator ──────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const urls = routes
    .map(
        (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');

writeFileSync(outPath, sitemap, 'utf-8');
console.log(`✅  sitemap.xml generated → ${outPath}`);
console.log(`    BASE_URL: ${BASE_URL}`);
