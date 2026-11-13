import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Everything people edit lives in the /content folder at the top of the repo.
// Open that folder as an Obsidian vault, or edit the files on GitHub.

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    lead: z.string().optional(),
    description: z.string().optional(),
    button_label: z.string().optional(),
    button_link: z.string().optional(),
  }).passthrough(),
});

const robots = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/robots' }),
  schema: z.object({
    year: z.coerce.string(),
    name: z.string(),
    game: z.string(),
    awards: z.array(z.string()).nullish().transform((a) => a ?? []),
    photos: z.array(z.string()).nullish().transform((a) => a ?? []),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/sponsors' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().nullish(),
    website: z.string().nullish(),
    order: z.coerce.number().default(99),
    hidden: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().nullish(),
    summary: z.string().nullish(),
    cover: z.string().nullish(),
    draft: z.boolean().default(false),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: 'settings.md', base: './content' }),
  schema: z.object({
    team_name: z.string(),
    address_line_1: z.string(),
    address_line_2: z.string(),
    address_line_3: z.string(),
    join_form_link: z.string(),
    sponsor_packet_link: z.string(),
    brand_guide_link: z.string(),
    calendar_embed_link: z.string().nullish(),
    contact_form_link: z.string().nullish(),
  }),
});

// The programming notes (content/docs) are turned into Starlight pages at build time.
const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

export const collections = { pages, robots, sponsors, blog, settings, docs };
