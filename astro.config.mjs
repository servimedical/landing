// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { validarEnlaces } from './integraciones/validar-ciclo.mjs';
import { validarRedirecciones } from './integraciones/redirecciones.mjs';

export default defineConfig({
  site: 'https://www.servimedicalgroup.com',
  output: 'static',

  /* Las URLs del mapa de rutas no llevan barra final. `format: 'file'` más
     `cleanUrls` en Vercel las sirve tal cual, sin un salto de redirección. */
  build: { format: 'file' },
  trailingSlash: 'never',

  compressHTML: true,
  devToolbar: { enabled: false },

  integrations: [
    validarEnlaces(),
    validarRedirecciones(),
    sitemap({ filter: (p) => !p.includes('/404') }),
  ],

  vite: { plugins: [tailwindcss()] },
});
