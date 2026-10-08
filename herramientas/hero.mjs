/**
 * Prepara la imagen del hero.
 *
 *   npm run hero
 *
 * Verifica el archivo que puso una persona, avisa de lo que no puede arreglar
 * —fondo opaco, resolución baja— y genera las dos versiones que sirve la
 * página. No descarga nada ni recorta fondos: recortar mal un equipo se nota
 * más que no recortarlo.
 */
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const CARPETA = join(process.cwd(), 'public', 'hero');
const CARRUSEL = join(process.cwd(), 'public', 'home', 'hero');
/* Las versiones por ancho van en una subcarpeta: el carrusel descubre sus
   diapositivas leyendo los archivos sueltos de CARRUSEL, y una versión
   `-800.webp` al lado del original entraría como una diapositiva más. */
const CARRUSEL_W = join(CARRUSEL, 'w');
const BASE = 'autoclave-tuttnauer';
const ALTO_MINIMO = 1600;
const PESO_MAXIMO_KB = 300;
const ANCHOS = [1600, 800];

const linea = '─'.repeat(68);
console.log(`\n${linea}\nIMÁGENES DEL HERO\n${linea}\n`);

/* ------------------------------------------------------------- carrusel --
   Si hay fotos aquí, son las que manda la portada; la imagen única queda de
   respaldo. Cada archivo se empareja con su producto por el nombre. */
const delCarrusel = existsSync(CARRUSEL)
  ? readdirSync(CARRUSEL).filter((f) => /^\d+-[a-z0-9-]+\.(webp|png|jpg|jpeg)$/i.test(f)).sort()
  : [];

if (delCarrusel.length) {
  const { publicados } = await import('../src/datos/productos.ts');
  const ids = new Set(publicados.map((p) => `${p.marca}-${p.slug}`));
  let sharpC;
  try { sharpC = (await import('sharp')).default; } catch { /* sin sharp, sólo se listan */ }

  console.log(`CARRUSEL · ${delCarrusel.length} imagen(es) en public/home/hero`);
  for (const f of delCarrusel) {
    const id = f.replace(/^\d+-/, '').replace(/\.\w+$/, '');
    const kb = Math.round(statSync(join(CARRUSEL, f)).size / 1024);
    let dim = '';
    let alfa = '';
    if (sharpC) {
      const img = sharpC(join(CARRUSEL, f));
      const m = await img.metadata();
      dim = `${m.width} × ${m.height} px · `;
      const st = await img.stats();
      const a = st.channels[3];
      alfa = m.hasAlpha && a && a.min < 250 ? '' : ' · ⚠ sin transparencia';
      if (m.width !== 1600 || m.height !== 1280)
        alfa += ` · ⚠ no es 1600 × 1280`;
    }
    const emparejada = ids.has(id) ? '' : ' · ⚠ no corresponde a ningún producto: saldrá sin etiqueta';
    console.log(`  ${f} · ${dim}${kb} kB${kb > 250 ? ' · ⚠ pasa de 250 kB' : ''}${alfa}${emparejada}`);
  }
  /* Sin esto el carrusel sirve la foto completa también en un teléfono, y la
     primera es la imagen LCP de la portada. */
  if (sharpC) {
    rmSync(CARRUSEL_W, { recursive: true, force: true });
    mkdirSync(CARRUSEL_W, { recursive: true });
    console.log('\n  Versiones por ancho (public/home/hero/w):');
    for (const f of delCarrusel) {
      const base = f.replace(/\.\w+$/, '');
      const util = (await sharpC(join(CARRUSEL, f)).metadata()).width;
      const anchos = ANCHOS.filter((a) => a <= util);
      if (!anchos.length) anchos.push(util);
      const hechas = [];
      for (const a of anchos) {
        const info = await sharpC(join(CARRUSEL, f))
          .resize({ width: a, withoutEnlargement: true, fit: 'inside' })
          .webp({ quality: 86 })
          .toFile(join(CARRUSEL_W, `${base}-${a}.webp`));
        hechas.push(`${a}w ${Math.round(info.size / 1024)} kB`);
      }
      console.log(`    ${base} · ${hechas.join(' · ')}`);
    }
  }

  if (delCarrusel.length < 4) console.log(`\n  ⚠ Son ${delCarrusel.length}; el carrusel se ve mejor con 4 a 6.`);
  if (delCarrusel.length > 6) console.log(`\n  ⚠ Son ${delCarrusel.length}; con más de 6 el visitante no alcanza a verlas.`);
  console.log('');
} else {
  console.log('CARRUSEL · sin imágenes en public/home/hero');
  console.log('  La portada usa la imagen única de public/hero.');
  console.log('  Cómo subirlas: public/home/hero/LEEME.md\n');
}

console.log(`${linea}\nIMAGEN ÚNICA\n${linea}\n`);

const original = ['webp', 'png', 'jpg', 'jpeg']
  .map((ext) => join(CARPETA, `${BASE}.${ext}`))
  .find((f) => existsSync(f));

if (!original) {
  console.log(`FALTA  ${BASE}.webp`);
  console.log('\n  La portada se arma igual: el panel queda vacío con la etiqueta');
  console.log('  del equipo y el sitio compila sin errores.');
  console.log(`\n  Cómo conseguirla: public/hero/LEEME.md\n`);
  process.exit(0);
}

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.log('sharp no está instalado, así que no se pueden generar las versiones.');
  console.log('\n  npm i -D sharp\n');
  process.exit(1);
}

const img = sharp(original);
const meta = await img.metadata();
const kb = Math.round(statSync(original).size / 1024);
const nombre = original.split('/').pop();

/* `hasAlpha` no basta: un JPG exportado a PNG trae canal alfa aunque esté todo
   opaco. Lo que importa es si ese canal varía, que es lo que indica un recorte
   real. Sin eso, una foto con fondo blanco pasaría el control. */
const stats = await img.stats();
const alfa = stats.channels[3];
const recortada = Boolean(meta.hasAlpha && alfa && alfa.min < 250);

console.log(`ORIGINAL  ${nombre}`);
console.log(`  ${meta.width} × ${meta.height} px · ${kb} kB · ${recortada ? 'recortada, con fondo transparente' : 'con fondo'}`);

const avisos = [];
if (!recortada)
  avisos.push('La imagen tiene fondo; se verá un recuadro. Hay que recortarlo antes de publicar.');
if (meta.height < ALTO_MINIMO)
  avisos.push(`Resolución baja (${meta.height} px de alto); se verá borrosa en retina. El mínimo es ${ALTO_MINIMO} px.`);
if (kb > PESO_MAXIMO_KB)
  avisos.push(`Pesa ${kb} kB; el máximo recomendado es ${PESO_MAXIMO_KB} kB.`);

/* Las versiones viejas se borran antes: si la nueva imagen es más pequeña, una
   versión anterior más grande seguiría sirviéndose desde el srcset.
   Nunca se borra el original, aunque llegue con uno de esos nombres. */
for (const a of ANCHOS) {
  const f = join(CARPETA, `${BASE}-${a}.webp`);
  if (existsSync(f) && f !== original) unlinkSync(f);
}

/* Sólo se generan los anchos que el original puede dar. Agrandar una imagen no
   añade detalle, y anunciar «1600w» en el srcset para un archivo de 423 px le
   dice al navegador que descargue el grande en pantallas donde no sirve. */
const anchoUtil = (await sharp(original).trim().metadata()).width;
const aGenerar = ANCHOS.filter((a) => a <= anchoUtil);
if (!aGenerar.length) aGenerar.push(anchoUtil);

console.log('\nGENERADAS');
const salidas = [];
for (const ancho of aGenerar) {
  const destino = join(CARPETA, `${BASE}-${ancho}.webp`);
  const info = await sharp(original)
    .trim()                                   // fuera el margen vacío
    .resize({ width: ancho, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 86 })
    .toFile(destino);
  salidas.push({ nombre: `${BASE}-${ancho}.webp`, ancho: info.width, alto: info.height, kb: Math.round(info.size / 1024) });
  console.log(`  ${BASE}-${ancho}.webp · ${info.width} × ${info.height} px · ${Math.round(info.size / 1024)} kB`);
}
for (const a of ANCHOS.filter((a) => a > anchoUtil))
  console.log(`  ${BASE}-${a}.webp · no se genera: el original sólo da ${anchoUtil} px de ancho`);

const grande = salidas[salidas.length - 1];
console.log('\nPARA LA PÁGINA');
console.log(`  Se sirve a ${grande.ancho} × ${grande.alto} px. La plantilla lo lee sola.`);

if (avisos.length) {
  console.log(`\nAVISOS`);
  for (const a of avisos) console.log(`  · ${a}`);
}
console.log('');
