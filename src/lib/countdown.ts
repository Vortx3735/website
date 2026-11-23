// Logic for the homepage countdown. No Astro imports here so the page script can share it with the build.
export type CountdownEvent = { name: string; eyebrow: string; when: string; ts: number; hours: number };
export type CountdownView = { mode: 'count' | 'now' | 'none'; eyebrow: string; heading: string; when: string; sec: number };

/** Minutes between a time zone and UTC at a given moment. */
function offsetMs(ts: number, zone: string): number {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).formatToParts(new Date(ts)).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(ts / 1000) * 1000;
}

/** Turn a date from a note into a moment in time. Accepts "2027-01-09 12:00" (read in the zone given) or a full date with an offset like 2027-01-09T12:00:00-05:00. */
export function parseWhen(value: unknown, zone: string): number {
  if (value instanceof Date) value = value.toISOString().slice(0, 10) + ' 00:00';
  const s = String(value ?? '').trim();
  if (/(Z|[+-]\d\d:?\d\d)$/i.test(s) && s.length > 10) return Date.parse(s);
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ]+(\d{1,2}):(\d{2}))?/);
  if (!m) return NaN;
  const wall = Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 0), +(m[5] ?? 0));
  let ts = wall - offsetMs(wall, zone);
  ts = wall - offsetMs(ts, zone);
  return ts;
}

/** "Saturday, January 9, 2027, at 12:00 PM CST" in the event's own zone. */
export function whenLabel(ts: number, zone: string): string {
  const d = new Date(ts);
  const day = d.toLocaleDateString('en-US', { timeZone: zone, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { timeZone: zone, hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
  return `${day}, at ${time}`;
}

const fill = (line: string, v: Record<string, string>) => line.replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m);

/** What the countdown should show right now. */
export function view(events: CountdownEvent[], now: number, tx: { heading: string; current_eyebrow: string }): CountdownView {
  const live = events.filter((e) => e.ts <= now && now < e.ts + e.hours * 3600000).pop();
  if (live) return { mode: 'now', eyebrow: tx.current_eyebrow, heading: live.name, when: live.when, sec: 0 };
  const next = events.find((e) => e.ts > now);
  if (next) return { mode: 'count', eyebrow: next.eyebrow, heading: fill(tx.heading, { name: next.name }), when: next.when, sec: Math.floor((next.ts - now) / 1000) };
  return { mode: 'none', eyebrow: '', heading: '', when: '', sec: 0 };
}
