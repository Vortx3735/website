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

Make a branch, edit, open a pull request. The build check must pass before merging.

Most edits are in **`src/data/`** and don't need any code:

| To change | Edit |
|---|---|
| Robots (one entry per season, newest first) | `src/data/robots.json` |
| Awards | `src/data/awards.json` |
| Sponsors and their logos | `src/data/sponsors.json` |
| Student leads, mentors, coaches | `src/data/people.json` |
| Join form link, sponsor PDF, calendar, contact form, hero video | `src/data/site.json` |

Page text lives in `src/pages/<page>.astro`. Each page's URL matches its file name.

### Photos

Put images in `public/images/`. Robot photos and sponsor logos use the same paths they
had on WordPress (`public/images/wp/2024/08/DSC_9026.jpg`), so the `photos` and `logo`
fields in `src/data/` are paths under `public/images/wp/`.

**Photos of students:** only add photos of students who are covered by a media release.

## Brand rules

From the 2026 brand guide. Colors and fonts are set once in `src/styles/global.css`; use those variables.

- Colors: Navy `#00334C`, Green `#7FC241`, White, Black, Dark grey `#787878`, Light grey `#BCBCBC`, Pastel azure `#9BCEE1`, Dark azure `#012131`, Light yellow `#F0EBD9`. No other colors.
- Body text: Montserrat. Headlines: Franklin Gothic Heavy (Libre Franklin on the web until a webfont license is decided). Arial is not a brand font.
- White logotype on dark backgrounds only.

## Still to do before launch

- [ ] Run `npm run fetch-media` and commit the photos (check media releases first)
- [ ] Pick a contact form service (e.g. Formspree) and set `contactFormAction` in `src/data/site.json`
- [ ] Paste the Google Calendar embed URL into `calendarEmbedUrl`
- [ ] Choose hosting (GitHub Pages, Netlify or Cloudflare Pages) and add a deploy workflow
- [ ] Point vortx3735.org at the new host (mentor sign-off required)
