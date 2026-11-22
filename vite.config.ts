import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { store } from './src/config/store';
import { buildRobots, buildSeoHead, buildSitemap, configWarnings, resolveSiteUrl } from './src/lib/seo';

/** Fills the <head> (title, Open Graph, JSON-LD), robots.txt and sitemap.xml from src/config/store.ts. */
function storeSeo(): Plugin {
  const env = { ...process.env, ...loadEnv('production', process.cwd(), '') } as Record<string, string | undefined>;
  const url = resolveSiteUrl(store, env);
  return {
    name: 'store-seo',
    transformIndexHtml: { order: 'pre', handler: (html) => html.replace('<!--SEO_HEAD-->', buildSeoHead(store, url)) },
    buildStart() {
      configWarnings(store, env).forEach((w: string) => this.warn(`[store setup] ${w}`));
      let hasPhoto = false;
      try { hasPhoto = readdirSync('src/assets/store').some((f) => /^storefront\.(jpe?g|png|webp|avif)$/i.test(f)); } catch { /* none */ }
      if (!hasPhoto) this.warn('[store setup] No storefront photo found. Save it as src/assets/store/storefront.jpg');
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots(url) });
      if (url) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(url) });
    },
  };
}

export default defineConfig({ plugins: [react(), storeSeo()], build: { target: 'es2020' } });
