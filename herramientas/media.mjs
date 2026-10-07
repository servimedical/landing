/**
 * Revisa qué foto y qué brochure falta por producto.
 *
 *   npm run media
 *
 * Mismo patrón que `npm run logos`: no descarga nada ni inventa nada. Los
 * archivos los pone una persona, en public/productos/{marca}-{linea}/.
 *
 * La plantilla resuelve en build qué existe: con foto, el hero va a dos
 * columnas; sin foto, a una, con la franja de datos a lo ancho. Nunca queda
 * un hueco ni un marcador de posición.
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { productos, idProducto } from '../src/datos/productos.ts';
import { marcaPorSlug } from '../src/datos/marcas.ts';

const RAIZ = new URL('../public/productos/', import.meta.url);
const ANCHO_MINIMO = 1600; // la foto principal se sirve a 4:3, 1600×1200

const carpetaDe = (p) => `${p.marca}-${p.slug}`;
const ruta = (p, archivo) => new URL(`${carpetaDe(p)}/${archivo}`, RAIZ);

const sinFoto = [];
const sinBrochure = [];
const listos = [];
const avisos = [];

for (const p of productos) {
  const nombre = `${p.nombre} — ${marcaPorSlug(p.marca).nombre}`;
  const dir = new URL(`${carpetaDe(p)}/`, RAIZ);
  const hay = existsSync(dir) ? readdirSync(dir) : [];

  const foto = hay.find((f) => /^foto\.(webp|jpg|png)$/i.test(f));
  const brochure = hay.find((f) => /^brochure\.pdf$/i.test(f));
  const galeria = hay.filter((f) => /^galeria-\d\.(webp|jpg|png)$/i.test(f));

  if (foto) {
    const kb = Math.round(statSync(ruta(p, foto)).size / 1024);
    if (kb > 400) avisos.push(`  ${carpetaDe(p)}/${foto} pesa ${kb} kB; por encima de 400 kB conviene recomprimir`);
    listos.push(`  ${carpetaDe(p)}/${foto}${galeria.length ? ` · ${galeria.length} en galería` : ''}`);
  } else {
    sinFoto.push(`  ${carpetaDe(p)}/foto.webp   (${nombre})`);
  }

  if (brochure) {
    const kb = Math.round(statSync(ruta(p, brochure)).size / 1024);
    listos.push(`  ${carpetaDe(p)}/brochure.pdf · ${kb} kB`);
  } else if (p.fuenteBrochure) {
    sinBrochure.push(`  ${carpetaDe(p)}/brochure.pdf\n      descargar de ${p.fuenteBrochure}`);
  } else {
    sinBrochure.push(`  ${carpetaDe(p)}/brochure.pdf   (${nombre}) — sin fuente oficial conocida`);
  }

  if (galeria.length > 4) avisos.push(`  ${carpetaDe(p)} tiene ${galeria.length} imágenes de galería; el máximo es 4`);
}

const linea = '─'.repeat(68);
console.log(`\n${linea}\nFOTOS Y BROCHURES DE PRODUCTO\n${linea}`);

console.log(`\nFOTOS · faltan ${sinFoto.length} de ${productos.length}`);
if (sinFoto.length) {
  console.log(sinFoto.join('\n'));
  console.log('\n  Sin foto, el hero del producto va a una sola columna. No se rompe nada.');
  console.log('  La foto va a 1600×1200 sobre fondo neutro, en .webp.');
} else {
  console.log('  Están todas ✓');
}

console.log(`\nBROCHURES · faltan ${sinBrochure.length} de ${productos.length}`);
if (sinBrochure.length) console.log(sinBrochure.join('\n'));
else console.log('  Están todos ✓');

if (listos.length) console.log(`\nYA ESTÁN:\n${listos.join('\n')}`);
if (avisos.length) console.log(`\nAVISOS:\n${avisos.join('\n')}`);

console.log(`\nCómo subirlos: public/productos/LEEME.md`);
console.log(`Ancho mínimo recomendado de la foto: ${ANCHO_MINIMO} px\n`);
