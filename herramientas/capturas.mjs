/**
 * Capturas de control de calidad.
 *
 *   npm run capturas antes
 *   npm run capturas despues
 *
 * Fotografía las mismas páginas a los mismos tres anchos antes y después de
 * una ronda de cambios, para poder compararlas lado a lado. No levanta el
 * servidor: espera encontrarlo en marcha, porque arrancarlo desde aquí
 * dejaría un proceso huérfano si el guion falla a mitad.
 */
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const carpeta = process.argv[2];

if (!carpeta || !['antes', 'despues'].includes(carpeta)) {
  console.log('\nFalta decir cuándo: `npm run capturas antes` o `npm run capturas despues`.\n');
  process.exit(1);
}

/* Los anchos son los tres puntos donde el sitio cambia de forma: teléfono,
   tableta y escritorio. No son tres tamaños cualquiera. */
const ANCHOS = [
  { nombre: '375', ancho: 375, alto: 812 },
  { nombre: '768', ancho: 768, alto: 1024 },
  { nombre: '1440', ancho: 1440, alto: 900 },
];

/* `abrir` nombra un elemento que hay que desplegar antes de fotografiar; sin
   eso el mega menú nunca sale en las capturas. */
const PAGINAS = [
  { nombre: 'home', url: '/' },
  { nombre: 'lineas', url: '/lineas' },
  { nombre: 'linea', url: '/lineas/autoclaves' },
  { nombre: 'producto', url: '/marcas/tuttnauer/autoclaves' },
  { nombre: 'marcas', url: '/marcas' },
  { nombre: 'servicios', url: '/servicios' },
  { nombre: 'menu-lineas', url: '/', abrir: 'panel-lineas' },
  { nombre: 'menu-marcas', url: '/', abrir: 'panel-marcas' },
];

const destino = join(process.cwd(), 'qa', carpeta);
rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });

const navegador = await chromium.launch();
let hechas = 0;
const fallos = [];

for (const p of PAGINAS) {
  for (const a of ANCHOS) {
    /* El mega menú es de escritorio: en teléfono y tableta no existe y la
       captura saldría idéntica a la home. */
    if (p.abrir && a.ancho < 1000) continue;

    const ctx = await navegador.newContext({
      viewport: { width: a.ancho, height: a.alto },
      deviceScaleFactor: 2,
    });
    const pag = await ctx.newPage();
    try {
      const r = await pag.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 20000 });
      if (!r || !r.ok()) throw new Error(`HTTP ${r ? r.status() : 'sin respuesta'}`);

      if (p.abrir) {
        const disparador = pag.locator(`[aria-controls="${p.abrir}"]`).first();
        if (await disparador.count()) {
          await disparador.hover();
          await pag.waitForTimeout(400);
        } else {
          fallos.push(`${p.nombre}: no se encontró el disparador «${p.abrir}»`);
        }
      }

      /* Las animaciones de entrada dejarían elementos a medio opacar. */
      await pag.addStyleTag({
        content: '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important}',
      });
      await pag.waitForTimeout(250);

      await pag.screenshot({
        path: join(destino, `${p.nombre}-${a.nombre}.png`),
        fullPage: !p.abrir,
      });
      hechas++;
    } catch (e) {
      fallos.push(`${p.nombre} @ ${a.nombre}: ${e.message}`);
    }
    await ctx.close();
  }
}

await navegador.close();

console.log(`\n${hechas} captura(s) en qa/${carpeta}`);
if (fallos.length) {
  console.log('\nNo salieron:');
  for (const f of fallos) console.log(`  · ${f}`);
}
console.log('');
