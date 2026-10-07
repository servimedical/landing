/* Resuelve qué archivo del hero se sirve.
 *
 * Vive aparte del componente porque la página necesita el mismo dato para
 * precargarlo desde el <head>: sin precarga, el navegador no descubre la
 * imagen hasta haber leído el CSS, y es el elemento que define el LCP.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const CARPETA_HERO = join(process.cwd(), 'public', 'hero');
const BASE = 'autoclave-tuttnauer';

export type ImagenHero = {
  /** Ruta que sirve el <img>, o null si no hay archivo. */
  src: string | null;
  /** Versiones generadas, para el srcset. Vacío si sólo hay una. */
  srcset: string;
  ancho: number;
  alto: number;
};

export async function imagenHero(): Promise<ImagenHero> {
  const archivos = existsSync(CARPETA_HERO) ? readdirSync(CARPETA_HERO) : [];

  /* Los anchos no se asumen: se descubren. `npm run hero` genera sólo los que
     el original puede dar, así que la plantilla lee la carpeta. */
  const generadas = archivos
    .map((f) => f.match(new RegExp(`^${BASE}-(\\d+)\\.webp$`)))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => ({ archivo: m[0], ancho: Number(m[1]) }))
    .sort((a, b) => a.ancho - b.ancho);

  const original = ['webp', 'png', 'jpg', 'jpeg']
    .map((e) => `${BASE}.${e}`)
    .find((f) => archivos.includes(f));

  const servida = generadas.at(-1)?.archivo ?? original ?? null;
  if (!servida) return { src: null, srcset: '', ancho: 0, alto: 0 };

  let ancho = 1200;
  let alto = 1600;
  try {
    const sharp = (await import('sharp')).default;
    const m = await sharp(join(CARPETA_HERO, servida)).metadata();
    if (m.width && m.height) { ancho = m.width; alto = m.height; }
  } catch {
    /* sin sharp se usan las proporciones por defecto; no vale romper el build */
  }

  return {
    src: `/hero/${servida}`,
    srcset: generadas.length > 1 ? generadas.map((g) => `/hero/${g.archivo} ${g.ancho}w`).join(', ') : '',
    ancho,
    alto,
  };
}
