// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.servimedicalgroup.com',
  output: 'static',
  build: { format: 'directory' },
  compressHTML: true,
  devToolbar: { enabled: false },
  integrations: [sitemap({ i18n: undefined, filter: (p) => !p.includes('/404') })],
});
