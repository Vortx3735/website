import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarEntries } from 'starlight-obsidian';

export default defineConfig({
  site: 'https://vortx3735.org',
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
  ],
});
