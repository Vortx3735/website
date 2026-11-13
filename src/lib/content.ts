import { getCollection, getEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

// Every image saved in an `assets` folder inside /content, keyed by its path.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/content/**/assets/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG}',
  { eager: true },
);

/** Turn a photo property like "assets/robot.jpg" from a note in content/<folder>/ into an image, or null if the file isn't there yet. */
export function photo(folder: string, path: string | null | undefined): ImageMetadata | null {
  if (!path) return null;
  const clean = path.replace(/^\.\//, '').replace(/^!?\[\[|\]\]$/g, '');
  const name = clean.split('/').pop()!;
  return (
    images[`/content/${folder}/${clean}`]?.default ??
    images[`/content/${folder}/assets/${name}`]?.default ??
    null
  );
}

export async function settings() {
  const all = await getCollection('settings');
  return all[0].data;
}

export async function robots() {
  return (await getCollection('robots')).sort((a, b) => b.data.year.localeCompare(a.data.year));
}

export async function sponsors() {
  return (await getCollection('sponsors')).filter((s) => !s.data.hidden).sort((a, b) => a.data.order - b.data.order);
}

export async function posts() {
  return (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function page(id: string) {
  const p = await getEntry('pages', id);
  if (!p) throw new Error(`Missing content/pages/${id}.md`);
  return p;
}
