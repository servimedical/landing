/* Resuelve las imágenes del hero de la home.
 *
 * Hay dos modos y el que manda es el contenido de las carpetas:
 *
 *   public/home/hero/NN-{marca}-{slug}.webp   carrusel · varias imágenes
 *   public/hero/autoclave-tuttnauer.webp      imagen única · el modo anterior
 *
 * El prefijo numérico define el orden. El resto del nombre empareja la foto
 * con su producto, y de ahí salen la etiqueta y el enlace: no se escriben a
 * mano, para que no puedan contradecir a la ficha.
 *
 * Vive aparte del componente porque la página necesita la primera imagen para
 * precargarla desde el <head>: sin eso, el navegador no la descubre hasta
 * haber leído el CSS, y es el elemento que define el LCP.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { marcaPorSlug } from '../datos/marcas.ts';
import { lineaPorSlug } from '../datos/lineas.ts';
import { resolverProducto } from '../datos/alias.ts';
import { publicados, urlProducto } from '../datos/productos.ts';

const CARRUSEL = join(process.cwd(), 'public', 'home', 'hero');
/* `npm run hero` deja aquí las versiones por ancho. Si la carpeta no existe
   —nadie ha corrido la herramienta— se sirve el original y ya. */
const CARRUSEL_W = join(CARRUSEL, 'w');
const UNICA = join(process.cwd(), 'public', 'hero');
const BASE_UNICA = 'autoclave-tuttnauer';

export type Diapositiva = {
  src: string;
  srcset: string;
  alt: string;
  ancho: number;
  alto: number;
  etiqueta?: { titulo: string; dato: string; url: string };
};

const medir = async (ruta: string) => {
  try {
    const sharp = (await import('sharp')).default;
    const m = await sharp(ruta).metadata();
    if (m.width && m.height) return { ancho: m.width, alto: m.height };
  } catch {
    /* sin sharp se usan proporciones por defecto; no vale romper el build */
  }
  return { ancho: 1600, alto: 1280 };
};

/** Etiqueta del producto, armada desde su ficha. */
const etiquetaDe = (idCrudo: string) => {
  /* El nombre del archivo puede venir con el identificador anterior: la foto
     es la misma aunque la línea se llame distinto. */
  const { id } = resolverProducto(idCrudo);
  const p = publicados.find((x) => `${x.marca}-${x.slug}` === id);
  if (!p) return undefined;
  const m = marcaPorSlug(p.marca);
  const l = lineaPorSlug(p.linea);
  if (!m || !l) return undefined;
  return {
    titulo: `${l.nombre} · ${m.nombre}`,
    dato: p.franja.slice(0, 2).map((f) => f.valor).join(' · '),
    url: urlProducto(p),
  };
};

export async function diapositivasHero(): Promise<Diapositiva[]> {
  /* 1 · carrusel */
  if (existsSync(CARRUSEL)) {
    const archivos = readdirSync(CARRUSEL)
      .filter((f) => /^\d+-[a-z0-9-]+\.(webp|png|jpg|jpeg)$/i.test(f))
      .sort();

    if (archivos.length) {
      const versiones = existsSync(CARRUSEL_W) ? readdirSync(CARRUSEL_W) : [];
      const slides: Diapositiva[] = [];
      for (const f of archivos) {
        const id = f.replace(/^\d+-/, '').replace(/\.\w+$/, '');
        const etiqueta = etiquetaDe(id);
        /* Sólo los anchos que existen de verdad: anunciar uno que no está
           deja al navegador pidiendo un 404 justo en la imagen LCP. */
        const base = f.replace(/\.\w+$/, '');
        const anchos = versiones
          .map((v) => v.match(new RegExp(`^${base}-(\\d+)\\.webp$`)))
          .filter((m): m is RegExpMatchArray => Boolean(m))
          .map((m) => ({ archivo: m[0], ancho: Number(m[1]) }))
          .sort((a, b) => a.ancho - b.ancho);

        /* Se sirve la versión generada, no el original: es la que trae el
           equipo recortado y pegado al borde inferior, y pesa una fracción. */
        const mayor = anchos.at(-1);
        const servida = mayor ? join(CARRUSEL_W, mayor.archivo) : join(CARRUSEL, f);
        const { ancho, alto } = await medir(servida);
        slides.push({
          src: mayor ? `/home/hero/w/${mayor.archivo}` : `/home/hero/${f}`,
          srcset:
            anchos.length > 1
              ? anchos.map((a) => `/home/hero/w/${a.archivo} ${a.ancho}w`).join(', ')
              : '',
          alt: etiqueta ? `${etiqueta.titulo.replace(' · ', ' ')}` : 'Equipo para central de esterilización',
          ancho,
          alto,
          etiqueta,
        });
      }
      return slides;
    }
  }

  /* 2 · imagen única, el modo anterior */
  if (!existsSync(UNICA)) return [];
  const archivos = readdirSync(UNICA);
  const generadas = archivos
    .map((f) => f.match(new RegExp(`^${BASE_UNICA}-(\\d+)\\.webp$`)))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => ({ archivo: m[0], ancho: Number(m[1]) }))
    .sort((a, b) => a.ancho - b.ancho);

  const original = ['webp', 'png', 'jpg', 'jpeg']
    .map((e) => `${BASE_UNICA}.${e}`)
    .find((f) => archivos.includes(f));

  const servida = generadas.at(-1)?.archivo ?? original;
  if (!servida) return [];

  const { ancho, alto } = await medir(join(UNICA, servida));
  return [{
    src: `/hero/${servida}`,
    srcset: generadas.length > 1 ? generadas.map((g) => `/hero/${g.archivo} ${g.ancho}w`).join(', ') : '',
    alt: 'Autoclave de vapor Tuttnauer de doble puerta, con la cámara cargada',
    ancho,
    alto,
    etiqueta: etiquetaDe('tuttnauer-autoclaves'),
  }];
}
