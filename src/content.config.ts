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
    // One entry per event where we won something. Mark an event we won outright with `won: true`.
    events: z.array(z.object({
      name: z.string(),
      level: z.string().nullish(),
      won: z.boolean().default(false),
      awards: z.array(z.string()),
    })).nullish().transform((a) => a ?? []),
    photos: z.array(z.string()).nullish().transform((a) => a ?? []),
    // Optional spec sheet shown for the newest robot: drivetrain, scoring, intake, weight.
    specs: z.record(z.string()).nullish(),
    // Optional photo for the tribute section (newest robot only).
    tribute_photo: z.string().nullish(),
    // Shown under the robot's name: a short line about it, and (for the newest robot) a dedication on the home page.
    tagline: z.string().nullish(),
    dedication: z.string().nullish(),
    // A tribute section on the Robots page. It only shows when a heading is set.
    tribute_heading: z.string().nullish(),
    tribute_alt: z.string().nullish(),
  }).transform((d) => ({
    ...d,
    // Every award from every event, each name once, for the robot cards and the home page.
    awards: [...new Set(d.events.flatMap((e) => e.awards))],
  })),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/sponsors' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().nullish(),
    website: z.string().nullish(),
    order: z.coerce.number().default(99),
    tier: z.enum(['primary', 'supporting']).default('supporting'),
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
    // The Google Form shown on the Join us page (the viewform link with ?embedded=true).
    join_form_embed: z.string().nullish(),
    sponsor_packet_link: z.string(),
    brand_guide_link: z.string(),
    // Where the team's scouting app and strategy board live. Leave empty until they are online; the buttons on Resources show "coming soon" meanwhile.
    scout_app_link: z.string().nullish(),
    strat_board_link: z.string().nullish(),
    calendar_embed_link: z.string().nullish(),
    contact_form_link: z.string().nullish(),
    calendar_add_link: z.string().nullish(),
    email: z.string().default('vortx3735inc@gmail.com'),
    instagram_link: z.string().nullish(),
    youtube_link: z.string().nullish(),
    facebook_link: z.string().nullish(),
    x_link: z.string().nullish(),
    // Countdown on the homepage. kickoff_iso is the exact moment (with time zone); kickoff_label is the text shown under it.
    kickoff_iso: z.string().nullish(),
    kickoff_label: z.string().nullish(),
  }),
});

// Wording for the site's headings, buttons, tabs and footer: one note per page in content/site-text.
const siteText = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/site-text' }),
  schema: z.object({}).passthrough(),
});

// The programming notes (content/docs) are turned into Starlight pages at build time.
const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

export const collections = { pages, robots, sponsors, blog, settings, docs, 'site-text': siteText };
