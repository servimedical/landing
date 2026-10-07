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
  const base = m.logo.src.split('/').pop().replace(/\.(svg|png)$/i, '');
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

    /* El mismo logo en WebP. Un PNG de 560 px con transparencia pesa cinco o
       seis veces más, y seis de ellos van en la franja del hero, encima del
       pliegue: es la diferencia entre 370 kB y 60 kB en la primera pantalla. */
    const webp = `${base}.webp`;
    const salidaWebp = await sharp(salida).webp({ quality: 90 }).toBuffer();
    writeFileSync(ruta(webp), salidaWebp);

    /* Y una versión chica. La caja grande mide 280 px y sólo se usa en el
       encabezado de la página de marca; en los menús y en la franja del hero
       la caja es de 132 px. Servir ahí el archivo de 560 px son seis imágenes
       cuatro veces más grandes de lo que se ven, encima del pliegue. */
    const chico = `${base}-280.webp`;
    const salidaChica = await sharp(salida).resize({ width: 280 }).webp({ quality: 90 }).toBuffer();
    writeFileSync(ruta(chico), salidaChica);

    hechos.push(
      `  ${png} · ${nueva.width}×${nueva.height} · ${Math.round(salida.length / 1024)} kB → ` +
      `${webp} ${Math.round(salidaWebp.length / 1024)} kB · ${chico} ${Math.round(salidaChica.length / 1024)} kB`,
    );
  } else {
    faltan.push(`  ${svg}  (${m.nombre})`);
  }
}

/* ------------------------------------------------- logotipo de la empresa --
   El de la barra y el pie. Se procesa aparte porque el original suele llegar
   como archivo de impresión: CMYK, con margen y fondo opaco. Se prepara sin
   redibujar nada —espacio de color, recorte y blanco a transparente— y se
   deja al tamaño en que se muestra, no al que vino. */
const EMPRESA = 'servimedical-group';
const ANCHO_EMPRESA = 260; // ~2,5× de lo que mide en la barra

const prepararEmpresa = async () => {
  const dir = new URL('../public/logos/', import.meta.url);
  const fuente = ['servimedical.jpg', 'servimedical.png', 'servimedical.webp', `${EMPRESA}.svg`]
    .map((f) => new URL(f, dir))
    .find((u) => existsSync(u));
  if (!fuente) return;
  if (fuente.pathname.endsWith('.svg')) {
    hechos.push(`  ${EMPRESA}.svg · se usa tal cual`);
    return;
  }

  let sharp;
  try { sharp = (await import('sharp')).default; } catch { return; }

  const srgb = await sharp(fuente.pathname).toColourspace('srgb').png().toBuffer();
  const { data, info } = await sharp(srgb)
    .trim({ threshold: 10 })
    .resize({ width: ANCHO_EMPRESA, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  /* Blanco puro a transparente, con alfa parcial en los grises de borde: sin
     eso, las diagonales del símbolo quedan serruchadas. */
  let opacos = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const luz = Math.min(data[i], data[i + 1], data[i + 2]);
    if (luz > 244) data[i + 3] = 0;
    else if (luz > 200) data[i + 3] = Math.round(255 * (1 - (luz - 200) / 44));
    else opacos++;
  }
  if (!opacos) { avisos.push('  el logotipo de la empresa quedó vacío al recortar; revise el archivo'); return; }

  const png = await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png({ compressionLevel: 9 }).toBuffer();
  const webp = await sharp(png).webp({ quality: 92 }).toBuffer();
  writeFileSync(new URL(`${EMPRESA}.png`, dir), png);
  writeFileSync(new URL(`${EMPRESA}.webp`, dir), webp);
  hechos.push(`  ${EMPRESA}.webp · ${info.width}×${info.height} · ${Math.round(webp.length / 1024)} kB · con transparencia`);

  if (info.width / info.height < 2.6)
    avisos.push('  el logotipo de la empresa es apilado; en una barra de 72 px la segunda línea se lee con dificultad. Pida al diseñador la versión horizontal.');
};

await prepararEmpresa();

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
