// Downloads the photos, logos, video and PDFs this site uses from the old
// WordPress site into public/. Run once from the repo root: npm run fetch-media
// Files that already exist are skipped, so it is safe to run again.
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname } from 'node:path';
import robots from '../src/data/robots.json' with { type: 'json' };
import sponsors from '../src/data/sponsors.json' with { type: 'json' };

const WP = 'https://vortx3735.org/wp-content/uploads/';
const jobs = [
  ...robots.flatMap((r) => r.photos.map((p) => [WP + p, `public/images/wp/${p}`])),
  ...sponsors.map((s) => [WP + s.logo, `public/images/wp/${s.logo}`]),
  [WP + '2022/11/2018BuildSeason_Week4_Timelapse2.mp4', 'public/media/build-season-timelapse.mp4'],
  [WP + '2026/10/2026-2027-VorTX-Sponsorship-Packet.pdf', 'public/files/2026-2027-VorTX-Sponsorship-Packet.pdf'],
];

let ok = 0, skipped = 0, failed = 0;
for (const [url, out] of jobs) {
  try { await access(out); skipped++; continue; } catch {}
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    ok++; console.log('saved', out);
  } catch (e) { failed++; console.error('FAILED', url, e.message); }
}
console.log(`\n${ok} downloaded, ${skipped} already there, ${failed} failed`);
