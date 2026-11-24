import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { photoUrl, run, searchUrl } from '../../scripts/fetch-photos';

const jobs = [{ id: 'apple', name: 'Apples', photoQuery: 'red apples' }, { id: 'rice', name: 'Rice' }];
const api = (photos: unknown[] = [{ url: 'https://pexels.test/p/1', photographer: 'Ann', src: { original: 'https://img.test/1.jpeg' } }]) =>
  vi.fn(async (url: string | URL | Request) => {
    const u = String(url);
    if (u.startsWith('https://api.pexels.com/v1/search')) return new Response(JSON.stringify({ photos }), { status: 200 });
    return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
  });

describe('photo downloader (mocked network)', () => {
  it('builds the documented Pexels request and saves <id>.jpg with credits', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'photos-'));
    const f = api();
    const calls = f.mock.calls as unknown as unknown[][];
    const r = await run({ key: 'KEY', jobs, outDir: dir, fetchImpl: f as unknown as typeof fetch, log: () => {}, delayMs: 0 });
    expect(r).toEqual({ ok: 2, skipped: 0, failed: [] });
    expect(calls[0][0]).toBe(searchUrl('red apples'));
    expect((calls[0][1] as RequestInit).headers).toEqual({ Authorization: 'KEY' });
    expect(calls[2][0]).toBe(searchUrl('Rice')); // falls back to the product name
    expect(calls[1][0]).toBe(photoUrl('https://img.test/1.jpeg'));
    expect(readFileSync(join(dir, 'apple.jpg'))).toEqual(Buffer.from([1, 2, 3]));
    expect(readFileSync(join(dir, 'CREDITS.md'), 'utf8')).toContain('Ann');
  });
  it('skips existing photos unless forced', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'photos-'));
    writeFileSync(join(dir, 'apple.png'), 'mine');
    const f = api();
    const r = await run({ key: 'K', jobs, outDir: dir, fetchImpl: f as unknown as typeof fetch, log: () => {}, delayMs: 0 });
    expect(r.skipped).toBe(1);
    expect(r.ok).toBe(1);
    expect(existsSync(join(dir, 'apple.jpg'))).toBe(false);
  });
  it('stops with a clear message on a bad key and reports empty searches', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'photos-'));
    const logs: string[] = [];
    const bad = vi.fn(async () => new Response('no', { status: 401 }));
    await run({ key: 'x', jobs, outDir: dir, fetchImpl: bad as unknown as typeof fetch, log: (m) => logs.push(m), delayMs: 0 });
    expect(bad).toHaveBeenCalledTimes(1);
    expect(logs.join()).toContain('rejected the API key');
    const none = await run({ key: 'x', jobs: [jobs[0]], outDir: dir, fetchImpl: api([]) as unknown as typeof fetch, log: () => {}, delayMs: 0 });
    expect(none.failed[0]).toContain('apple');
  });
});
