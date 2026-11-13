// One-time move of photos, logos, the time-lapse video and the sponsor PDF from the
// old WordPress site into this repo. Run from the repo root: npm run fetch-media
// Files that already exist are skipped, so it is safe to run again.
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname } from 'node:path';

const WP = 'https://vortx3735.org/wp-content/uploads/';
const files = [
  ['2026/03/IMG_0715-scaled.jpg', 'content/robots/assets/IMG_0715-scaled.jpg'],
  ['2025/04/IMG_8956-scaled.jpg', 'content/robots/assets/IMG_8956-scaled.jpg'],
  ['2024/08/DSC_9026.jpg', 'content/robots/assets/DSC_9026.jpg'],
  ['2024/08/DSC_9082.jpg', 'content/robots/assets/DSC_9082.jpg'],
  ['2024/08/IMG_0473-2.jpg', 'content/robots/assets/IMG_0473-2.jpg'],
  ['2024/08/IMG_0726-2.jpg', 'content/robots/assets/IMG_0726-2.jpg'],
  ['2024/08/P4013442-scaled.jpg', 'content/robots/assets/P4013442-scaled.jpg'],
  ['2024/08/P4013378-scaled.jpg', 'content/robots/assets/P4013378-scaled.jpg'],
  ['2024/08/P4013255-scaled.jpg', 'content/robots/assets/P4013255-scaled.jpg'],
  ['2024/08/P1011315-scaled.jpg', 'content/robots/assets/P1011315-scaled.jpg'],
  ['2024/08/image.jpg', 'content/robots/assets/image.jpg'],
  ['2024/08/image1.jpg', 'content/robots/assets/image1.jpg'],
  ['2024/08/IMG_4719-scaled.jpg', 'content/robots/assets/IMG_4719-scaled.jpg'],
  ['2024/08/IMG_6528-scaled.jpg', 'content/robots/assets/IMG_6528-scaled.jpg'],
  ['2024/08/IMG_6550-scaled.jpg', 'content/robots/assets/IMG_6550-scaled.jpg'],
  ['2024/08/IMG_6518-scaled.jpg', 'content/robots/assets/IMG_6518-scaled.jpg'],
  ['2024/08/5D3_3459-scaled.jpg', 'content/robots/assets/5D3_3459-scaled.jpg'],
  ['2024/08/IMG_3236-scaled.jpg', 'content/robots/assets/IMG_3236-scaled.jpg'],
  ['2024/08/IMG_4752-scaled.jpg', 'content/robots/assets/IMG_4752-scaled.jpg'],
  ['2024/08/IMG_3291-scaled.jpg', 'content/robots/assets/IMG_3291-scaled.jpg'],
  ['2024/08/IMG_3248-scaled.jpg', 'content/robots/assets/IMG_3248-scaled.jpg'],
  ['2024/08/IMG_3330-scaled.jpg', 'content/robots/assets/IMG_3330-scaled.jpg'],
  ['2024/08/hubCityRegional2017_132-scaled.jpg', 'content/robots/assets/hubCityRegional2017_132-scaled.jpg'],
  ['2024/08/hubCityRegional2017_155-scaled.jpg', 'content/robots/assets/hubCityRegional2017_155-scaled.jpg'],
  ['2024/08/unnamed-scaled.jpg', 'content/robots/assets/unnamed-scaled.jpg'],
  ['2024/08/IMG_8263-scaled.jpg', 'content/robots/assets/IMG_8263-scaled.jpg'],
  ['2024/08/IMG_7551-scaled.jpg', 'content/robots/assets/IMG_7551-scaled.jpg'],
  ['2024/08/HRR2k16-5213-scaled.jpg', 'content/robots/assets/HRR2k16-5213-scaled.jpg'],
  ['2024/08/HRR2k16-5190-scaled.jpg', 'content/robots/assets/HRR2k16-5190-scaled.jpg'],
  ['2024/08/IMG_7482.jpg', 'content/robots/assets/IMG_7482.jpg'],
  ['2024/08/IMG_8396.jpg', 'content/robots/assets/IMG_8396.jpg'],
  ['2024/08/IMG_8337.jpg', 'content/robots/assets/IMG_8337.jpg'],
  ['2024/08/IMG_4867-scaled.jpg', 'content/robots/assets/IMG_4867-scaled.jpg'],
  ['2024/08/IMG_4871-scaled.jpg', 'content/robots/assets/IMG_4871-scaled.jpg'],
  ['2024/08/IMG_0148-1.jpg', 'content/robots/assets/IMG_0148-1.jpg'],
  ['2024/08/IMG_0182-1.jpg', 'content/robots/assets/IMG_0182-1.jpg'],
  ['2024/08/Robot-without-upgrade.jpg', 'content/robots/assets/Robot-without-upgrade.jpg'],
  ['2024/08/HPIM3924.jpg', 'content/robots/assets/HPIM3924.jpg'],
  ['2024/08/HPIM3930.jpg', 'content/robots/assets/HPIM3930.jpg'],
  ['2024/08/HPIM3927-1.jpg', 'content/robots/assets/HPIM3927-1.jpg'],
  ['2024/08/HPIM3511.jpg', 'content/robots/assets/HPIM3511.jpg'],
  ['2025/04/Klein_ISD_Logo-300x185.png', 'content/sponsors/assets/Klein_ISD_Logo-300x185.png'],
  ['2025/04/Boeing_full_logo.svg.png', 'content/sponsors/assets/Boeing_full_logo.svg.png'],
  ['2025/04/Rockwell_Automation_logo_2019.svg.png', 'content/sponsors/assets/Rockwell_Automation_logo_2019.svg.png'],
  ['2025/04/Linde_plc_logo-300x150.png', 'content/sponsors/assets/Linde_plc_logo-300x150.png'],
  ['2025/04/GHF_Logo_DarkBackground-300x290.png', 'content/sponsors/assets/GHF_Logo_DarkBackground-300x290.png'],
  ['2025/04/twc-logo-open-graph-300x300.png', 'content/sponsors/assets/twc-logo-open-graph-300x300.png'],
  ['2025/04/Champion_Logo_1200x675.png', 'content/sponsors/assets/Champion_Logo_1200x675.png'],
  ['2025/04/IsolidsLogo.png', 'content/sponsors/assets/IsolidsLogo.png'],
  ['2025/04/Tada-Logo-2.png', 'content/sponsors/assets/Tada-Logo-2.png'],
  ['2025/04/Ex-Nihilo1.png', 'content/sponsors/assets/Ex-Nihilo1.png'],
  ['2025/04/Klein-Bots-Logo-300x300.png', 'content/sponsors/assets/Klein-Bots-Logo-300x300.png'],
  ['2025/04/f8507bc9-81d2-4c17-bd83-bc47ef9b4b25.jpeg', 'content/sponsors/assets/f8507bc9-81d2-4c17-bd83-bc47ef9b4b25.jpeg'],
  ['2022/11/2018BuildSeason_Week4_Timelapse2.mp4', 'public/media/build-season-timelapse.mp4'],
  ['2026/10/2026-2027-VorTX-Sponsorship-Packet.pdf', 'public/files/2026-2027-VorTX-Sponsorship-Packet.pdf'],
];

let ok = 0, skipped = 0, failed = 0;
for (const [src, out] of files) {
  try { await access(out); skipped++; continue; } catch {}
  try {
    const res = await fetch(WP + src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    ok++; console.log('saved', out);
  } catch (e) { failed++; console.error('FAILED', src, e.message); }
}
console.log(`\n${ok} downloaded, ${skipped} already there, ${failed} failed`);
