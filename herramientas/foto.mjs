/**
 * Deja una foto de producto lista para public/productos/{marca}-{slug}/.
 *
 *   npm run foto -- <origen> <marca>-<slug> <relleno|recorte>
 *
 * Sale siempre en 4:3 y .webp, que es lo que pide public/productos/LEEME.md:
 *   relleno  recorta el margen vacío y centra el equipo sobre blanco, con el
 *            mismo aire a los lados. Para fotos de fábrica sobre fondo blanco.
 *   recorte  corta al centro. Para fotos sobre un fondo de color de la marca,
 *            donde rellenar con blanco dejaría franjas.
 *   extender ensancha una foto cuadrada o vertical copiando sus bordes. Para
 *            fondos de estudio en degradado, que el blanco plano delataría.
 *
 * Nunca amplía: una foto chica sigue siendo chica, y eso se resuelve
 * pidiéndole otra al fabricante, no estirándola. Después de correrla,
 * `npm run media` confirma que quedó en su sitio y bajo 400 kB.
 */
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';

/* Desde `npm run foto`, correr.mjs importa este archivo sin relanzarlo, y el
   nombre de la herramienta sigue en argv. */
const desdeLanzador = process.argv[1]?.endsWith('correr.mjs');
const [origen, carpeta, modo] = process.argv.slice(desdeLanzador ? 3 : 2);
if (!origen || !carpeta || !['relleno', 'recorte', 'extender'].includes(modo)) {
  console.error('\nuso: npm run foto -- <origen> <marca>-<slug> <relleno|recorte|extender>\n');
  process.exit(1);
}
if (!existsSync(origen)) {
  console.error(`\nNo existe ${origen}\n`);
  process.exit(1);
}

const ANCHO = 1600;
const dir = new URL(`../public/productos/${carpeta}/`, import.meta.url);
if (!existsSync(dir)) {
  console.error(`\nNo existe public/productos/${carpeta}/ — revise el nombre en LEEME.md\n`);
  process.exit(1);
}

let buf;
if (modo === 'relleno') {
  const recortada = await sharp(origen).flatten({ background: '#ffffff' }).trim({ threshold: 12 }).toBuffer();
  const { width: w, height: h } = await sharp(recortada).metadata();
  const aire = Math.round(Math.max(w, h) * 0.07);
  const H = Math.max(h + 2 * aire, Math.ceil(((w + 2 * aire) * 3) / 4));
  const W = Math.round((H * 4) / 3);
  buf = await sharp(recortada).extend({
    top: Math.floor((H - h) / 2), bottom: Math.ceil((H - h) / 2),
    left: Math.floor((W - w) / 2), right: Math.ceil((W - w) / 2),
    background: '#ffffff',
  }).toBuffer();
} else if (modo === 'extender') {
  const { width: w, height: h } = await sharp(origen).metadata();
  const W = Math.max(w, Math.round((h * 4) / 3));
  buf = await sharp(origen).flatten({ background: '#ffffff' }).extend({
    left: Math.floor((W - w) / 2), right: Math.ceil((W - w) / 2),
    extendWith: 'copy',
  }).toBuffer();
} else {
  const { width: w, height: h } = await sharp(origen).metadata();
  const W = Math.min(w, Math.round((h * 4) / 3));
  const H = Math.round((W * 3) / 4);
  buf = await sharp(origen).flatten({ background: '#ffffff' })
    .extract({ left: Math.floor((w - W) / 2), top: Math.floor((h - H) / 2), width: W, height: H })
    .toBuffer();
}

const salida = await sharp(buf)
  .resize({ width: ANCHO, withoutEnlargement: true })
  .webp({ quality: 84 })
  .toFile(new URL('foto.webp', dir).pathname);

const kb = Math.round(salida.size / 1024);
console.log(`public/productos/${carpeta}/foto.webp · ${salida.width}×${salida.height} · ${kb} kB`);
if (salida.width < ANCHO) console.log(`  aviso: ${salida.width} px de ancho; LEEME.md recomienda ${ANCHO}. Pedir una más grande al fabricante.`);
