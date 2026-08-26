// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import { validarEnlaces } from './integraciones/validar-ciclo.mjs';

export default defineConfig({
  site: 'https://www.servimedicalgroup.com',
  output: 'static',

  /* Las URLs del mapa de rutas no llevan barra final. `format: 'file'` más
     `cleanUrls` en Vercel las sirve tal cual, sin un salto de redirección. */
  build: { format: 'file' },
  trailingSlash: 'never',

  /* El 301 real lo hace Vercel (vercel.json). Esta entrada existe para que
     la redirección también funcione en `dev` y en `preview`. */
  redirects: {
    '/productos/trazabilidad': '/trazabilidad',
  },

  compressHTML: true,
  devToolbar: { enabled: false },

  integrations: [
    preact(),
    validarEnlaces(),
    sitemap({ filter: (p) => !p.includes('/404') && !p.includes('/productos/trazabilidad') }),
  ],

  vite: { plugins: [tailwindcss()] },
});
