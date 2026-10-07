import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { marcas } from './datos/marcas.ts';
import { lineas } from './datos/lineas.ts';
import { categorias, SLUGS_CATEGORIA } from './datos/categorias.ts';

/* ============================================================================
   COLECCIONES DE CONTENIDO

   Los datos viven en `src/datos/*.ts` —TypeScript, no JSON, porque cada hueco
   lleva un comentario `// TODO` o `// VERIFICAR` al lado del campo y eso es
   parte del contenido—. Aquí se cargan en colecciones y se validan con zod.

   Todo lo que falla en este archivo tumba el build. Es deliberado: es más
   barato que publicar una ficha con una capacidad inventada.
   ========================================================================== */

const prueba = z.object({ dato: z.string().min(1), fuente: z.string().min(1) });
const spec = z.object({ label: z.string().min(1), valor: z.string().min(1) });

const ETAPAS = ['lavado', 'empaque', 'esterilizacion', 'monitoreo', 'almacenamiento', 'residuos'] as const;

const esquemaMarca = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  nombre: z.string().min(1),
  descriptor: z.string().min(1).max(60),
  lead: z.string().min(1).max(420),
  fabricante: z.object({
    pais: z.string(),
    fundacion: z.string().optional(),
    razonSocial: z.string().optional(),
    fuente: z.string().optional(),
  }),
  rolSVMG: z.enum(['representante', 'distribuidor']),
  invima: z.string().min(1).optional(),
  logo: z.object({ src: z.string().min(1), alt: z.string().min(1) }),
  logoEscala: z.number().positive().max(3).optional(),
  etapasCiclo: z.array(z.enum(ETAPAS)).min(1),
  pruebas: z.array(prueba).optional(),
  respaldo: z.array(z.string().min(1)).optional(),
  documentos: z.array(z.object({
    titulo: z.string().min(1), url: z.string().min(1), tipo: z.string().min(1), peso: z.string().min(1),
  })).optional(),
  catalogo: z.string().optional(),
  orden: z.number().int().positive(),
  seo: z.object({ titulo: z.string().min(1).max(70), descripcion: z.string().min(1).max(185) }),
});

const esquemaLinea = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  marca: z.string().regex(/^[a-z0-9-]+$/),
  nombre: z.string().min(1),
  tipo: z.enum(['equipo', 'consumible', 'mobiliario']),
  categoria: z.enum(SLUGS_CATEGORIA),
  etiquetaMenu: z.string().min(1).max(24).optional(),
  lead: z.string().min(1).max(360),
  metodo: z.string().min(1).max(80),
  uso: z.string().min(1).max(80),
  specsClave: z.array(spec).min(2).max(4),
  modelos: z.object({ encabezados: z.array(z.string()).min(2), filas: z.array(z.array(z.string())).min(1) }).optional(),
  compatible: z.array(z.string().min(1)).optional(),
  noCompatible: z.array(z.string().min(1)).optional(),
  dondeSeUsa: z.array(z.string().min(1)).optional(),
  alternativa: z.object({ titulo: z.string().min(1), linea: z.string().min(1), nota: z.string().min(1) }).optional(),
  normasProceso: z.array(z.object({ norma: z.string().min(1), que: z.string().min(1) })).optional(),
  certificaciones: z.array(prueba).optional(),
  instalacion: z.array(spec).optional(),
  preguntasCotizacion: z.array(z.string().min(1)).min(4).max(5),
  /* §6 · máximo 3 y sin destinos repetidos. */
  relacionadas: z.array(z.object({ linea: z.string().min(1), porque: z.string().min(1) }))
    .max(3)
    .refine((r) => new Set(r.map((x) => x.linea)).size === r.length,
      { message: 'hay dos tarjetas de «Completa el ciclo» al mismo destino' }),
  servicio: z.array(z.string().min(1)).min(1),
  faq: z.array(z.object({ p: z.string().min(1), r: z.string().min(1) })).min(2).max(5).optional(),
  orden: z.number().int().positive(),
  seo: z.object({ titulo: z.string().min(1).max(70), descripcion: z.string().min(1).max(185) }),
}).superRefine((l, ctx) => {
  const falta = (m: string) => ctx.addIssue({ code: 'custom', message: m });
  if (l.tipo === 'equipo' && !l.compatible?.length) falta('un equipo necesita `compatible`');
  if (l.tipo !== 'equipo' && !l.dondeSeUsa?.length) falta('un consumible o mobiliario necesita `dondeSeUsa`');
  if (l.tipo !== 'equipo' && l.instalacion?.length) falta('`instalacion` es sólo de equipos');
});

/* ------------------------------------------------- validaciones cruzadas --
   Lo que un esquema por entrada no puede ver. */

/** §8 · vocabulario prohibido. Se audita todo el copy que llega a la página. */
const PROHIBIDO: [RegExp, string][] = [
  [/\bl[ií]der(es)?\b/i, 'superlativo sin dato'],
  [/\bel mejor\b/i, 'superlativo sin dato'],
  [/vanguardia/i, 'superlativo sin dato'],
  [/alta calidad/i, 'superlativo sin dato'],
  [/soluciones integrales/i, 'relleno'],
  [/innovador/i, 'superlativo sin dato'],
  [/el grueso\b/i, 'autorreferencia vaga'],
  [/\b(siete|seis|cinco|cuatro|\d+)\s+marcas\b/i, 'el número de marcas se cuenta desde los datos, no se escribe'],
  [/una sola conversaci/i, 'relleno'],
  /* Lo retirado es el CTA «Cuéntenos qué necesita esterilizar», no el verbo:
     la entradilla del formulario lo usa a propósito. */
  [/cu[eé]ntenos qu[eé] necesita esterilizar/i, 'CTA retirado: use «Hable con un especialista»'],
  [/cu[eé]ntanos|escr[ií]benos|cont[aá]ctanos/i, 'el sitio trata de usted'],
  [/termodesinfectadora/i, 'el término es «termodesinfectora»'],
  [/grado m[eé]dico/i, 'el término es «papel grado esterilización»'],
];

const auditar = (ruta: string, valor: unknown, fallos: string[]) => {
  if (typeof valor === 'string') {
    for (const [re, por] of PROHIBIDO)
      if (re.test(valor)) fallos.push(`${ruta}: «${valor.match(re)![0]}» — ${por}`);
  } else if (Array.isArray(valor)) {
    valor.forEach((v, i) => auditar(`${ruta}[${i}]`, v, fallos));
  } else if (valor && typeof valor === 'object') {
    for (const [k, v] of Object.entries(valor)) auditar(`${ruta}.${k}`, v, fallos);
  }
};

const validarPortafolio = () => {
  const fallos: string[] = [];
  const slugs = new Set(marcas.map((m) => m.slug));

  for (const l of lineas) {
    if (!slugs.has(l.marca)) fallos.push(`línea ${l.slug}: la marca «${l.marca}» no existe`);

    /* Las referencias de «Completa el ciclo» y de la alternativa tienen que
       resolver a una línea real. */
    for (const r of l.relacionadas)
      if (!lineas.some((x) => x.slug === r.linea))
        fallos.push(`${l.marca}/${l.slug}: «${r.linea}» no es una línea del catálogo`);
    if (l.alternativa && !lineas.some((x) => x.slug === l.alternativa!.linea))
      fallos.push(`${l.marca}/${l.slug}: la alternativa «${l.alternativa.linea}» no existe`);
  }

  /* Ninguna categoría puede quedar vacía: si lo está, es que se borró la
     última línea y la columna del menú y la página /lineas/<slug> saldrían
     en blanco. Akarmak y Celitron no tienen líneas y por eso tampoco
     aparecen; el día que las tengan, aparecen solas. */
  for (const c of categorias) {
    const n = lineas.filter((l) => l.categoria === c.slug).length;
    if (n === 0) fallos.push(`categoría ${c.slug}: no tiene ninguna línea`);
  }

  /* Dos líneas de la misma marca en la misma categoría necesitan etiqueta
     propia, o el menú mostraría el nombre de la marca repetido. */
  const porCatMarca = new Map<string, number>();
  for (const l of lineas) {
    const k = `${l.categoria}|${l.marca}`;
    porCatMarca.set(k, (porCatMarca.get(k) ?? 0) + 1);
  }
  for (const l of lineas) {
    const k = `${l.categoria}|${l.marca}`;
    if ((porCatMarca.get(k) ?? 0) > 1 && !l.etiquetaMenu)
      fallos.push(`${l.marca}/${l.slug}: comparte categoría «${l.categoria}» con otra línea de la misma marca y necesita \`etiquetaMenu\``);
  }

  /* §1 · el dropdown no admite más de cuatro líneas por marca. */
  for (const m of marcas) {
    const n = lineas.filter((l) => l.marca === m.slug).length;
    if (n > 4) fallos.push(`${m.slug}: ${n} líneas en el dropdown, el máximo es 4`);
  }

  /* Una línea identificada dos veces por la misma marca rompería la ruta. */
  const vistas = new Set<string>();
  for (const l of lineas) {
    const id = `${l.marca}/${l.slug}`;
    if (vistas.has(id)) fallos.push(`ruta duplicada: /marcas/${id}`);
    vistas.add(id);
  }

  auditar('categorias', categorias, fallos);
  auditar('marcas', marcas, fallos);
  auditar('lineas', lineas, fallos);

  if (fallos.length)
    throw new Error(`\n\nPortafolio inválido — ${fallos.length} fallo(s):\n  · ${fallos.join('\n  · ')}\n`);
};

/* ---------------------------------------------------------------- loader --
   Un loader propio sobre los módulos de `src/datos`. Mantiene los comentarios
   del archivo de datos, que un JSON no podría llevar. */
const desde = <T extends { slug: string }>(
  nombre: string,
  filas: T[],
  id: (fila: T) => string,
) => ({
  name: nombre,
  load: async ({ store, parseData }: any) => {
    validarPortafolio();
    store.clear();
    for (const fila of filas) {
      const data = await parseData({ id: id(fila), data: fila });
      store.set({ id: id(fila), data });
    }
  },
});

export const collections = {
  marcas: defineCollection({
    loader: desde('marcas', marcas, (m) => m.slug),
    schema: esquemaMarca,
  }),
  lineas: defineCollection({
    loader: desde('lineas', lineas, (l) => `${l.marca}/${l.slug}`),
    schema: esquemaLinea,
  }),
};
