// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Public site URL — overridden by CF Pages env in CI. Default must match
// the production domain so the sitemap and canonical URLs are correct
// even when PUBLIC_SITE_URL isn't injected at build time.
const SITE = process.env.PUBLIC_SITE_URL || 'https://tejaskaranagrawal.com';

// Static output. Runtime endpoints we need (contact form) are served by
// Cloudflare Pages Functions directly out of `/functions/`, not via an Astro
// adapter — this keeps the build Node-free and the output a plain static dir.
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false, nesting: true }),
    mdx(),
    icon({
      // Tabler icon set is what Astrowind widgets reference by default.
      // Limit to actually-used icons later via `include` once we know the set.
      iconDir: 'src/icons',
    }),
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('/thanks'),
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    ssr: {
      external: ['@resvg/resvg-js'],
    },
  },
});
