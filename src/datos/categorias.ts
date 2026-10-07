import { ETAPAS, type EtapaCiclo } from './tipos.ts';

/* ============================================================================
   CATEGORÍAS DE LÍNEA

   El mismo catálogo, ordenado por método en vez de por fabricante. Quien llega
   diciendo «necesito plasma» entra por aquí; quien llega diciendo «vendemos
   Tuttnauer» entra por marcas. No hay datos nuevos: una categoría es una
   agrupación de las líneas que ya existen en src/datos/lineas.ts.

   `orden` es el orden del ciclo de la central, no el alfabético: es el que
   usan las columnas del menú y las tarjetas de /lineas.
   ========================================================================== */

export type Categoria = {
  slug: string;
  nombre: string;
  /** 3–6 palabras bajo el nombre. */
  descriptor: string;
  /** La etapa del ciclo donde entra. `transversal` es lo que no tiene una. */
  etapa: EtapaCiclo | 'transversal';
  orden: number;
  seo: { titulo: string; descripcion: string };
};

export const categorias: Categoria[] = [
  {
    slug: 'termodesinfectoras',
    nombre: 'Termodesinfectoras',
    descriptor: 'Lavado y desinfección térmica validada',
    etapa: 'lavado',
    orden: 1,
    seo: {
      titulo: 'Termodesinfectoras en Colombia | Servimedical',
      descripcion:
        'Termodesinfectoras para lavado y desinfección térmica validada de endoscopios e instrumental de lúmenes. Compare las marcas que representamos en Colombia.',
    },
  },
  {
    slug: 'empaque',
    nombre: 'Papel grado esterilización y Tyvek',
    descriptor: 'La barrera estéril hasta sala',
    etapa: 'empaque',
    orden: 2,
    seo: {
      titulo: 'Papel grado esterilización y Tyvek en Colombia | Servimedical',
      descripcion:
        'Rollo mixto, bolsas autosellantes, papel crepado y Tyvek para barrera estéril, con abastecimiento programado desde Bogotá.',
    },
  },
  {
    slug: 'vapor',
    nombre: 'Esterilización por vapor',
    descriptor: 'Material termorresistente y poroso empacado',
    etapa: 'esterilizacion',
    orden: 3,
    seo: {
      titulo: 'Esterilización por vapor en Colombia | Servimedical',
      descripcion:
        'Autoclaves de vapor saturado con prevacío para instrumental, textiles y contenedores. Compare las marcas que representamos en Colombia.',
    },
  },
  {
    slug: 'plasma',
    nombre: 'Esterilización por plasma',
    descriptor: 'Baja temperatura para lo termosensible',
    etapa: 'esterilizacion',
    orden: 4,
    seo: {
      titulo: 'Esterilización por plasma en Colombia | Servimedical',
      descripcion:
        'Esterilización por peróxido de hidrógeno vaporizado para óptica, motores y material termosensible. Compare las marcas que representamos en Colombia.',
    },
  },
  {
    slug: 'indicadores',
    nombre: 'Indicadores químicos y biológicos',
    descriptor: 'La evidencia para liberar la carga',
    etapa: 'monitoreo',
    orden: 5,
    seo: {
      titulo: 'Indicadores químicos y biológicos | Servimedical',
      descripcion:
        'Indicadores de proceso, de paquete, test de Bowie-Dick y control biológico de carga para central de esterilización, con abastecimiento programado.',
    },
  },
  {
    slug: 'mobiliario',
    nombre: 'Mobiliario en acero inoxidable',
    descriptor: 'Acero inoxidable contra el plano',
    etapa: 'almacenamiento',
    orden: 6,
    seo: {
      titulo: 'Mobiliario en acero inoxidable en Colombia | Servimedical',
      descripcion:
        'Mesones de lavado, mesas de empaque, carros diferenciados por flujo y estantería estéril en acero AISI 304, fabricados contra el plano de la central.',
    },
  },
  {
    slug: 'residuos-hospitalarios',
    nombre: 'Tratamiento de residuos',
    descriptor: 'Residuo biosanitario tratado en sitio',
    etapa: 'residuos',
    orden: 7,
    seo: {
      titulo: 'Tratamiento de residuos hospitalarios | Servimedical',
      descripcion:
        'Tratamiento de residuo biosanitario por vapor con trituración, dentro de la institución. Compare las marcas que representamos en Colombia.',
    },
  },
  {
    slug: 'repuestos',
    nombre: 'Repuestos',
    descriptor: 'Partes originales con inventario local',
    etapa: 'transversal',
    orden: 8,
    seo: {
      titulo: 'Repuestos para equipos de esterilización | Servimedical',
      descripcion:
        'Empaquetaduras de puerta, válvulas, trampas de vapor, sensores y tarjetas de control, con inventario en Bogotá y atención dentro y fuera de garantía.',
    },
  },
];

export const SLUGS_CATEGORIA = categorias.map((c) => c.slug) as [string, ...string[]];

export const categoriaPorSlug = (slug: string) => categorias.find((c) => c.slug === slug);

export const urlCategoria = (slug: string) => `/lineas/${slug}`;

/** Rótulo de etapa: «03 · Esterilización», o «Transversal» si no tiene una. */
export const rotuloEtapa = (c: Categoria): string => {
  const i = ETAPAS.findIndex((e) => e.id === c.etapa);
  return i < 0 ? 'Transversal' : `${String(i + 1).padStart(2, '0')} · ${ETAPAS[i]!.titulo}`;
};
