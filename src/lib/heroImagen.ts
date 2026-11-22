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
  /** Más ancha que alta, como una caja de indicadores: ver Hero.astro. */
  ancha: boolean;
  /** Foto con fondo (sin transparencia): llena el recuadro en vez de
   *  sobresalir de él. Ver Hero.astro. */
  foto: boolean;
  /** Encuadre de una foto con fondo dentro del recuadro (`object-position`). */
  encuadre?: string;
  etiqueta?: { titulo: string; dato: string; url: string; lado?: 'derecha' };
};

const medir = async (ruta: string) => {
  try {
    const sharp = (await import('sharp')).default;
    const m = await sharp(ruta).metadata();
    if (m.width && m.height) return { ancho: m.width, alto: m.height, alfa: Boolean(m.hasAlpha) };
  } catch {
    /* sin sharp se usan proporciones por defecto; no vale romper el build */
  }
  return { ancho: 1600, alto: 1280, alfa: true };
};

/** Títulos que no salen de «línea · marca». El papel vive en la línea de
 *  indicadores, y «Indicadores · Servimedical» no dice qué muestra la foto. */
const TITULO_HERO: Record<string, string> = {
  'svm-papel-para-esterilizacion': 'Papel para esterilización',
  'svm-papel-para-esterilizacion--bolsas': 'Bolsas de esterilización',
};

/** Encuadre de las fotos que no van centradas en el recuadro. Hoy ninguna:
 *  desde que todas llegan cuadradas, se ven enteras. */
const ENCUADRE_HERO: Record<string, string> = {};

/** Fotos en las que la etiqueta va abajo a la derecha (en escritorio). En la
 *  de Sanqiang, a la izquierda tapaba el logo pintado en la máquina. */
const ETIQUETA_DERECHA = new Set(['sanqiang-baja-temperatura']);

/** Etiqueta del producto, armada desde su ficha. */
/* `nombre` es lo que va tras el número en el archivo. Puede llevar una
   variante tras `--` (`svm-papel-para-esterilizacion--bolsas`): enlaza al
   mismo producto con otro título, para dos fotos de una misma ficha. */
const etiquetaDe = (nombre: string) => {
  const idCrudo = nombre.split('--')[0] ?? nombre;
  /* El nombre del archivo puede venir con el identificador anterior: la foto
     es la misma aunque la línea se llame distinto. */
  const { id } = resolverProducto(idCrudo);
  const p = publicados.find((x) => `${x.marca}-${x.slug}` === id);
  if (!p) return undefined;
  const m = marcaPorSlug(p.marca);
  const l = lineaPorSlug(p.linea);
  if (!m || !l) return undefined;
  return {
    titulo: TITULO_HERO[nombre] ?? TITULO_HERO[id] ?? `${l.nombre} · ${m.nombre}`,
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
        const etiquetaBase = etiquetaDe(id);
        const etiqueta = etiquetaBase && ETIQUETA_DERECHA.has(id)
          ? { ...etiquetaBase, lado: 'derecha' as const }
          : etiquetaBase;
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
        /* Escena o producto se decide por el original: el WebP generado pierde
           el canal alfa cuando la imagen es opaca, aunque venga de un PNG
           preparado como producto sobre blanco. */
        const { alfa } = await medir(join(CARRUSEL, f));
        slides.push({
          src: mayor ? `/home/hero/w/${mayor.archivo}` : `/home/hero/${f}`,
          srcset:
            anchos.length > 1
              ? anchos.map((a) => `/home/hero/w/${a.archivo} ${a.ancho}w`).join(', ')
              : '',
          alt: etiqueta ? `${etiqueta.titulo.replace(' · ', ' ')}` : 'Equipo para central de esterilización',
          ancho,
          alto,
          /* 1,3 y no 1,5: los rollos de papel (1,36:1) también son apaisados y,
             pegados abajo, quedaban hundidos detrás de la etiqueta. */
          ancha: alfa && ancho > alto * 1.3,
          foto: !alfa,
          encuadre: ENCUADRE_HERO[f.replace(/^\d+-/, '').replace(/\.\w+$/, '')],
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
    ancha: ancho > alto * 1.5,
    foto: false,
    etiqueta: etiquetaDe('tuttnauer-autoclaves'),
  }];
}
