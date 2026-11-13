import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarEntries } from 'starlight-obsidian';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Where the site lives. The deploy workflow passes these from GitHub Pages:
// while there is no custom domain the site is at vortx3735.github.io/website/,
// and once vortx3735.org is set in Settings > Pages it moves to the root.
// Locally (npm run dev/preview) the site is always at the root.
const SITE = process.env.SITE_ORIGIN || 'https://vortx3735.org';
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');

// Pages and Markdown link to /about/, /docs/ and so on. When the site sits under
// a sub-path, add that prefix to every root-relative link after the build.
function prefixLinks(base) {
  const fix = (html) => html.replace(/(\s(?:href|src|poster|action)=["'])\/(?!\/)/g, (m, a, off, str) =>
      str.startsWith(base + '/', off + a.length) ? m : `${a}${base}/`)
    .replace(/(content=["']\d+;\s*url=)\/(?!\/)/gi, `$1${base}/`)
    .replace(/(\ssrcset=["'])([^"']*)/g, (m, a, v) => a + v.split(',').map((p) => p.trim().startsWith('/') && !p.trim().startsWith(base + '/') && !p.trim().startsWith('//') ? ' ' + base + p.trim() : p).join(','));
  return {
    name: 'prefix-links',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (!base) return;
        const walk = async (d) => {
          for (const e of await readdir(d, { withFileTypes: true })) {
            const p = join(d, e.name);
            if (e.isDirectory()) await walk(p);
            else if (p.endsWith('.html')) await writeFile(p, fix(await readFile(p, 'utf8')));
          }
        };
        await walk(fileURLToPath(dir));
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  base: BASE || '/',
  trailingSlash: 'always',
  // Old WordPress pages that were empty. They redirect so old links keep working.
  redirects: {
    '/media/': '/',
    '/newsletters/': '/',
    '/social-media/': '/',
  },
  integrations: [
    starlight({
      title: 'VorTX Programming',
      logo: { src: './public/images/logotype-white.png', replacesTitle: true },
      customCss: ['./src/styles/docs.css'],
      disable404Route: true,
      plugins: [
        // /content is one Obsidian vault. Its docs/ folder becomes the pages at /docs/.
        starlightObsidian({ vault: './content', root: 'docs', output: 'docs' }),
      ],
      sidebar: [
        { label: 'Back to vortx3735.org', link: '/' },
        { label: 'Programming notes', items: [obsidianSidebarEntries] },
      ],
    }),
    prefixLinks(BASE),
  ],
});
