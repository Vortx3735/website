import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vortx3735.org',
  trailingSlash: 'always',
  // Old WordPress pages that were empty. They redirect so old links keep working.
  redirects: {
    '/media/': '/',
    '/newsletters/': '/',
    '/social-media/': '/',
  },
});
