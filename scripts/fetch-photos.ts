/**
 * Downloads one real photo per product from Pexels (free licence, no attribution required)
 * into src/assets/products/<product-id>.jpg. Products that already have a photo are skipped,
 * so you can replace any photo with your own by using the same file name.
 *
 *   npm run photos            (asks for your free Pexels API key)
 *   npm run photos -- --force (re-download everything)
 *
 * Get a free key in 1 minute: https://www.pexels.com/api/
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { products as catalogue } from '../src/data/products';

export interface PhotoJob { id: string; name: string; photoQuery?: string }
interface PexelsPhoto { alt?: string; url: string; photographer: string; src: { original: string } }

export interface RunOptions {
  key: string;
  jobs: PhotoJob[];
  outDir: string;
  force?: boolean;
  fetchImpl?: typeof fetch;
  log?: (msg: string) => void;
  delayMs?: number;
}

export const photoUrl = (original: string) => `${original}?auto=compress&cs=tinysrgb&fit=crop&w=720&h=576`;
export const searchUrl = (q: string) => `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=5&orientation=landscape`;

export async function run({ key, jobs, outDir, force = false, fetchImpl = fetch, log = console.log, delayMs = 350 }: RunOptions) {
  mkdirSync(outDir, { recursive: true });
  const have = new Set(readdirSync(outDir).map((f) => f.replace(/\.[^.]+$/, '')));
  const credits: string[] = [];
  let ok = 0, skipped = 0;
  const failed: string[] = [];

  for (const job of jobs) {
    if (!force && have.has(job.id)) { skipped++; continue; }
    const query = job.photoQuery ?? job.name;
    try {
      const res = await fetchImpl(searchUrl(query), { headers: { Authorization: key } });
      if (res.status === 401 || res.status === 403) throw new Error('Pexels rejected the API key. Check you copied it correctly.');
      if (res.status === 429) throw new Error('Pexels rate limit reached. Wait an hour and run `npm run photos` again; finished photos are kept.');
      if (!res.ok) throw new Error(`Pexels answered ${res.status}`);
      const data = (await res.json()) as { photos?: PexelsPhoto[] };
      const pick = data.photos?.[0];
      if (!pick) { failed.push(`${job.id} (no result for "${query}")`); log(`  - ${job.name}: nothing found for "${query}"`); continue; }
      const img = await fetchImpl(photoUrl(pick.src.original));
      if (!img.ok) throw new Error(`Image download answered ${img.status}`);
      writeFileSync(join(outDir, `${job.id}.jpg`), Buffer.from(await img.arrayBuffer()));
      credits.push(`- ${job.name}: photo by ${pick.photographer} on Pexels — ${pick.url}`);
      ok++; log(`  ✓ ${job.name}`);
    } catch (e) {
      const msg = (e as Error).message;
      if (/API key|rate limit/.test(msg)) { log(`\n${msg}`); break; }
      failed.push(`${job.id} (${msg})`); log(`  ✗ ${job.name}: ${msg}`);
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }
  if (credits.length) writeFileSync(join(outDir, 'CREDITS.md'), `# Photo credits\n\nPhotos from Pexels (free to use).\n\n${credits.join('\n')}\n`, { flag: existsSync(join(outDir, 'CREDITS.md')) ? 'a' : 'w' });
  return { ok, skipped, failed };
}

async function main() {
  const ci = process.argv.includes('--ci');
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  let key = process.env.PEXELS_API_KEY?.trim() ?? '';
  if (!key && ci) { console.log('[photos] No PEXELS_API_KEY set: skipping photo download.'); return; }
  if (!key) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    key = (await rl.question('Paste your free Pexels API key (get one at https://www.pexels.com/api/): ')).trim();
    rl.close();
  }
  if (!key) { console.log('No key given. Nothing downloaded.'); return; }
  console.log(`Downloading photos for ${catalogue.length} products...\n`);
  const r = await run({ key, jobs: catalogue, outDir: join(root, 'src/assets/products'), force: process.argv.includes('--force') });
  console.log(`\nDone: ${r.ok} downloaded, ${r.skipped} already had a photo, ${r.failed.length} failed.`);
  if (r.failed.length) console.log('Add these by hand (file name = product id, .jpg):\n  ' + r.failed.join('\n  '));
  console.log('\nOpen the site (npm run dev) and look through the photos. To swap one, replace its file in src/assets/products/ keeping the same name.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  // In --ci mode (used by the build) a failure must never stop the website from deploying.
  main().catch((e) => { console.log('[photos] Skipped: ' + (e as Error).message); if (!process.argv.includes('--ci')) process.exitCode = 1; });
}
