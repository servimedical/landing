/**
 * Revisa, optimiza y verifica los logotipos de las marcas.
 *
 *   npm run logos
 *
 * 1. Dice qué logos faltan.
 * 2. Optimiza los SVG con svgo y les recorta el margen vacío ajustando el
 *    viewBox al contenido.
 * 3. Recorta el margen de los PNG con sharp y los deja a 2× la caja `lg`.
 * 4. Avisa si un PNG queda por debajo de 560 px de ancho —2× de la caja `lg`—,
 *    porque en pantalla de retina se vería blando.
 *
 * No descarga nada ni dibuja nada: los archivos los pone una persona. Ver
 * public/logos/marcas/LEEME.md.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { marcas } from '../src/datos/marcas.ts';

const CARPETA = new URL('../public/logos/marcas/', import.meta.url);
const ANCHO_MINIMO = 560; // 2 × la caja `lg` (280 px)

const ruta = (nombre) => new URL(nombre, CARPETA);
const existe = (nombre) => existsSync(ruta(nombre));

const faltan = [];
const hechos = [];
const avisos = [];

const corre = (cmd, args) => {
  try {
    execFileSync(cmd, args, { stdio: 'pipe' });
    return true;
  } catch (e) {
    avisos.push(`  no se pudo ejecutar ${cmd}: ${e.message.split('\n')[0]}`);
    return false;
  }
};

for (const m of marcas) {
  const base = m.logo.src.split('/').pop().replace(/\.svg$/, '');
  const svg = `${base}.svg`;
  const png = `${base}.png`;

  if (existe(svg)) {
    /* svgo con `removeViewBox: false` y el plugin de recorte: el viewBox se
       ajusta al dibujo, así que el margen vacío del archivo original deja de
       descentrar el logo dentro de la caja. */
    const antes = readFileSync(ruta(svg), 'utf8').length;
    const ok = corre('npx', [
      '--yes', 'svgo@3', '--multipass', '--quiet',
      '--config', new URL('./svgo.config.mjs', import.meta.url).pathname,
      '-i', ruta(svg).pathname, '-o', ruta(svg).pathname,
    ]);
    if (ok) {
      const despues = readFileSync(ruta(svg), 'utf8').length;
      hechos.push(`  ${svg} · ${(antes / 1024).toFixed(1)} kB → ${(despues / 1024).toFixed(1)} kB`);
      if (!/viewBox/i.test(readFileSync(ruta(svg), 'utf8')))
        avisos.push(`  ${svg} no tiene viewBox: no escalará bien dentro de la caja`);
    }
  } else if (existe(png)) {
    let sharp;
    try {
      sharp = (await import('sharp')).default;
    } catch {
      avisos.push('  sharp no está instalado; los PNG no se procesan. `npm i -D sharp`');
      continue;
    }
    const img = sharp(ruta(png).pathname);
    const meta = await img.metadata();
    if (meta.width < ANCHO_MINIMO)
      avisos.push(`  ${png} mide ${meta.width} px de ancho; por debajo de ${ANCHO_MINIMO} px se ve blando en pantalla retina`);

    const salida = await img
      .trim()                                  // fuera el margen vacío
      .resize({ width: ANCHO_MINIMO, withoutEnlargement: true, fit: 'inside' })
      .png({ compressionLevel: 9 })
      .toBuffer();
    writeFileSync(ruta(png), salida);
    const nueva = await sharp(salida).metadata();
    hechos.push(`  ${png} · recortado y normalizado a ${nueva.width}×${nueva.height}`);
  } else {
    faltan.push(`  ${svg}  (${m.nombre})`);
  }
}

const linea = '─'.repeat(64);
console.log(`\n${linea}\nLOGOTIPOS DE MARCA\n${linea}`);

if (faltan.length) {
  console.log(`\nFALTAN ${faltan.length} de ${marcas.length}:`);
  console.log(faltan.join('\n'));
  console.log('\nMientras falten, esas marcas se muestran con su nombre en la');
  console.log('tipografía de títulos. Cómo conseguirlos: public/logos/marcas/LEEME.md');
} else {
  console.log(`\nEstán los ${marcas.length} logotipos ✓`);
}

if (hechos.length) console.log(`\nPROCESADOS:\n${hechos.join('\n')}`);
if (avisos.length) console.log(`\nAVISOS:\n${avisos.join('\n')}`);
console.log('');
