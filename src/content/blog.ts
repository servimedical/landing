/* Artículos del blog. Cada uno tiene su página en src/pages/blog/{slug}.astro;
   aquí vive lo que necesitan el listado, el menú, las migas y el sitemap. */
export type Articulo = {
  slug: string;
  /** Título que se ve en la página. */
  titulo: string;
  /** Título para buscadores (≤ 65 caracteres). */
  tituloSeo: string;
  /** Meta descripción (≤ 160 caracteres). */
  descripcion: string;
  /** Fecha de publicación, AAAA-MM-DD. */
  fecha: string;
  /** Una o dos frases para la tarjeta del listado. */
  resumen: string;
  etiquetas: string[];
};

export const articulos: Articulo[] = [
  {
    slug: 'resolucion-914-de-2025-central-esterilizacion',
    titulo: 'Resolución 914 de 2025: ¿su IPS o consultorio necesita central de esterilización?',
    tituloSeo: 'Resolución 914 de 2025: ¿quién necesita central de esterilización?',
    descripcion:
      'Qué exige la Resolución 914 de 2025, qué cambia con el proyecto de 2026 y qué prestadores deben tener central de reprocesamiento antes del 3 de enero de 2027.',
    fecha: '2026-11-22',
    resumen:
      'Desde el 3 de enero de 2027 rige el nuevo manual de reprocesamiento de dispositivos médicos. Quiénes deben tener central propia, qué cambiaría con el proyecto de 2026 y qué equipos necesita su central.',
    etiquetas: ['Normativa', 'Central de esterilización'],
  },
];

export const urlArticulo = (slug: string) => `/blog/${slug}`;

export const fechaLegible = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
