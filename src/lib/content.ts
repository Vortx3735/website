import { getCollection, getEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

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

// Gallery photos live in content/gallery/<section>/ (on-the-field, in-the-shop, outreach), not in an assets folder.
const galleryImages = import.meta.glob<{ default: ImageMetadata }>(
  '/content/gallery/*/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG}',
  { eager: true },
);

/** Photos saved in one gallery section folder (e.g. 'on-the-field'), in file-name order. With no section, every gallery photo. */
export function galleryPhotos(section?: string): ImageMetadata[] {
  const prefix = section ? `/content/gallery/${section}/` : '/content/gallery/';
  return Object.keys(galleryImages).filter((k) => k.startsWith(prefix)).sort().map((k) => galleryImages[k].default);
}

export async function settings() {
  const all = await getCollection('settings');
  return all[0].data;
}

/** The wording note for a page, from content/site-text/<id>.md. */
export async function text(id: string): Promise<Record<string, any>> {
  const entry = await getEntry('site-text', id);
  if (!entry) throw new Error(`Missing content/site-text/${id}.md`);
  return entry.data;
}

/** Fill {year}, {name} and similar markers in a line of text. */
export function fill(line: string, values: Record<string, string>) {
  return line.replace(/\{(\w+)\}/g, (m, k) => values[k] ?? m);
}

export async function robots() {
  return (await getCollection('robots')).sort((a, b) => b.data.year.localeCompare(a.data.year));
}

export type RobotPhotos = { name: string; year: string; imgs: ImageMetadata[]; full: string[] };

/** A robot's photos, plus a larger copy of each for the expanded view. */
export async function robotPhotos(r: { name: string; year: string; photos: string[] }): Promise<RobotPhotos> {
  const imgs = r.photos.map((p) => photo('robots', p)).filter((i): i is ImageMetadata => i !== null);
  const full = await Promise.all(imgs.map(async (i) => (await getImage({ src: i, width: 1800 })).src));
  return { name: r.name, year: r.year, imgs, full };
}

/** A line like "Name (detail)" for an award. */
export function awardLine(raw: string) {
  const a = parseAward(raw);
  return a.detail ? `${a.name} (${a.detail})` : a.name;
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

/** An award line in a robot note: "Name (detail) [Tier]". The detail and the [Tier] are both optional. */
export function parseAward(raw: string) {
  const tier = raw.match(/\s*\[([^\]]+)\]\s*$/)?.[1] ?? null;
  const rest = raw.replace(/\s*\[[^\]]+\]\s*$/, '');
  const m = rest.match(/^(.*?)\s*\((.*)\)$/);
  return { name: m ? m[1] : rest, detail: m ? m[2] : null, tier };
}
