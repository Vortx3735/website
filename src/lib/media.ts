import { existsSync } from 'node:fs';

// Photos and logos live in public/images/wp/<year>/<month>/<file>, the same
// path they had on WordPress. Run `npm run fetch-media` to download them.
// Until a file is there, pages show a navy placeholder instead of a broken image.
export function wp(path: string | undefined): string | null {
  if (!path) return null;
  return existsSync(`public/images/wp/${path}`) ? `/images/wp/${path}` : null;
}
export function local(path: string): string | null {
  return existsSync(`public${path}`) ? path : null;
}
