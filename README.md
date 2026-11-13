# vortx3735.org

The FRC Team 3735 VorTX website, built with [Astro](https://astro.build) as a static site.
It replaces the old WordPress site. Nothing here is live yet.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer.

```sh
npm install
npm run fetch-media   # first time only: downloads photos, logos, the time-lapse and the sponsor PDF from the old site
npm run dev           # opens the site at http://localhost:4321
```

## Making changes

**You don't need to code.** Everything on the site is a Markdown file in **`content/`**.
Read [`content/Start here.md`](content/Start%20here.md) for the step-by-step guide.

Two ways to edit:

1. **On github.com:** open a file in `content/`, click the pencil, edit, and choose
   "Create a new branch and start a pull request". A mentor reviews and merges it.
2. **In Obsidian:** clone this repo with GitHub Desktop, open the `content/` folder as a vault,
   edit, then commit and push from GitHub Desktop.

| To change | Edit |
|---|---|
| Homepage text | `content/pages/home.md` |
| About, Mission, History, FAQ, Leadership, Mentors, Join, Support | `content/pages/*.md` (one per page) |
| Robots and each season's awards | `content/robots/*.md` (one per season) |
| Sponsors and their logos | `content/sponsors/*.md` (one per sponsor) |
| Blog posts (`draft: true` hides a post) | `content/blog/*.md` |
| Address, join form, sponsor packet, calendar, contact form | `content/settings.md` |
| Programming notes at `/docs/` | `content/docs/` |

Put images in the `assets/` folder next to the file that uses them. Obsidian does this for you.
A new Markdown file in `content/pages/` becomes a new page at `/<file-name>/`.

**Photos of students:** only add photos of students who are covered by a media release.

## Brand rules

From the 2026 brand guide. Colors and fonts are set once in `src/styles/global.css`; use those variables.

- Colors: Navy `#00334C`, Green `#7FC241`, White, Black, Dark grey `#787878`, Light grey `#BCBCBC`, Pastel azure `#9BCEE1`, Dark azure `#012131`, Light yellow `#F0EBD9`. No other colors.
- Body text: Montserrat. Headlines: Franklin Gothic Heavy (Libre Franklin on the web until a webfont license is decided). Arial is not a brand font.
- White logotype on dark backgrounds only.

## Still to do before launch

- [ ] Run `npm run fetch-media` and commit the photos (check media releases first)
- [ ] Pick a contact form service (e.g. Formspree) and set `contact_form_link` in `content/settings.md`
- [ ] Paste the Google Calendar embed URL into `calendar_embed_link` in `content/settings.md`
- [ ] Choose hosting. GitHub Pages on a free org needs this repo public; then set the repo variable `PAGES_ENABLED` to `true`
- [ ] Archive the old VorTXObsidian repo and point its old URL at `/docs/`
- [ ] Point vortx3735.org at the new host (mentor sign-off required)
