import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { marcas } from './datos/marcas.ts';
import { lineas } from './datos/lineas.ts';
import { productos, publicados, idProducto, productosDeLinea } from './datos/productos.ts';

/* ============================================================================
   COLECCIONES DE CONTENIDO

   Los datos viven en `src/datos/*.ts` —TypeScript y no JSON, porque cada hueco
   lleva su `// TODO` al lado del campo y eso es parte del contenido—. Aquí se
   cargan en colecciones y se validan con zod.

   Todo lo que falla aquí tumba el build. Es deliberado: es más barato que
   publicar una ficha con una capacidad inventada.
   ========================================================================== */

const prueba = z.object({ dato: z.string().min(1), fuente: z.string().min(1) });
const spec = z.object({ label: z.string().min(1), valor: z.string().min(1) });
const ETAPAS = ['lavado', 'empaque', 'esterilizacion', 'monitoreo', 'almacenamiento', 'residuos'] as const;
const SLUG = /^[a-z0-9-]+$/;

const esquemaMarca = z.object({
  slug: z.string().regex(SLUG),
  nombre: z.string().min(1),
  descriptor: z.string().min(1).max(60),
  lead: z.string().min(1).max(420),
  quienEs: z.string().min(120).max(900),
  fabricante: z.object({
    razonSocial: z.string().optional(),
    ciudad: z.string().optional(),
    pais: z.string().min(1),
    fundacion: z.string().optional(),
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
  orden: z.number().int().positive(),
  seo: z.object({ titulo: z.string().min(1).max(70), descripcion: z.string().min(1).max(185) }),
});

const esquemaLinea = z.object({
  slug: z.string().regex(SLUG),
  nombre: z.string().min(1),
  descriptor: z.string().min(1).max(60),
  etapa: z.enum([...ETAPAS, 'transversal']),
  etapasAdicionales: z.array(z.enum(ETAPAS)).optional(),
  nombreNav: z.string().optional(),
  lead: z.string().min(1).max(260),
  /* Cuatro y no tres: «Indicadores y empaque» reúne dos materias que se
     compran juntas, y explicarlas en tres párrafos obliga a apretarlas. El
     tope sigue existiendo para que una línea no se vuelva un tratado. */
  comoFunciona: z.array(z.string().min(80)).min(2).max(4),
  compatible: z.array(z.string().min(1)).min(2),
  noCompatible: z.array(z.string().min(1)).min(1),
  empaque: z.string().min(1).optional(),
  normas: z.array(z.object({ norma: z.string().min(1), que: z.string().min(1) })).min(1),
  faq: z.array(z.object({ p: z.string().min(1), r: z.string().min(1) })).min(2).max(5).optional(),
  orden: z.number().int().positive(),
  seo: z.object({ titulo: z.string().min(1).max(70), descripcion: z.string().min(1).max(185) }),
});

const esquemaProducto = z.object({
  marca: z.string().regex(SLUG),
  etapa: z.enum(ETAPAS).optional(),
  publicado: z.boolean().optional(),
  slug: z.string().regex(SLUG),
  linea: z.string().regex(SLUG),
  nombre: z.string().min(1),
  tipo: z.enum(['equipo', 'consumible', 'mobiliario']),
  lead: z.string().min(1).max(300),
  franja: z.array(spec).min(3).max(4),
  descripcion: z.array(z.string().min(80)).min(1).max(3),
  /* Una tabla por familia: mesa, mediano, central. Una sola de veinte filas
     no se lee. */
  modelos: z.array(z.object({
    familia: z.string().min(1).optional(),
    nota: z.string().min(1).optional(),
    encabezados: z.array(z.string().min(1)).min(2),
    filas: z.array(z.array(z.string())).min(1),
  })).min(1).optional(),
  ciclos: z.array(z.object({
    familia: z.string().min(1).optional(),
    items: z.array(z.string().min(1)).min(1),
  })).min(1).optional(),
  instalacion: z.array(spec).optional(),
  instalacionFamilia: z.string().min(1).optional(),
  normasDeclaradas: z.array(z.object({
    familia: z.string().min(1).optional(),
    normas: z.array(z.string().min(1)).min(1),
  })).min(1).optional(),
  diferenciales: z.tuple([z.string().min(1).max(44), z.string().min(1).max(44), z.string().min(1).max(44)]),
  preguntasCotizacion: z.array(z.string().min(1)).min(4).max(5),
  relacionadas: z.array(z.object({ producto: z.string().min(1), porque: z.string().min(1) }))
    .max(3)
    .refine((r) => new Set(r.map((x) => x.producto)).size === r.length,
      { message: 'hay dos tarjetas de «Completa el ciclo» al mismo destino' }),
  servicio: z.array(z.string().min(1)).min(1),
  media: z.object({
    foto: z.string().optional(),
    galeria: z.array(z.string()).max(4).optional(),
    brochure: z.object({ url: z.string(), titulo: z.string(), pesoKB: z.number().positive() }).optional(),
  }).optional(),
  fuenteBrochure: z.string().url().optional(),
  orden: z.number().int().positive(),
  seo: z.object({ titulo: z.string().min(1).max(70), descripcion: z.string().min(1).max(185) }),
}).superRefine((p, ctx) => {
  const falla = (m: string) => ctx.addIssue({ code: 'custom', message: m });
  if (p.tipo !== 'equipo' && p.instalacion?.length) falla('`instalacion` es sólo de equipos');
  /* Una fila de instalación sin cifra no informa. Si fuera a decir «según la
     placa del modelo», se omite: ocupa el lugar de la que sí informaría. */
  for (const r of p.instalacion ?? [])
    if (/seg[uú]n la placa|seg[uú]n el modelo|por confirmar/i.test(r.valor))
      falla(`la fila de instalación «${r.label}» no trae una cifra`);
  for (const t of p.modelos ?? [])
    for (const f of t.filas)
      if (f.length !== t.encabezados.length)
        falla(`una fila de «${t.familia ?? 'modelos'}» no tiene ${t.encabezados.length} celdas`);
});

/* ------------------------------------------------- validaciones cruzadas */

/** §8 de VOZ.md · vocabulario prohibido en todo el copy que llega a la página. */
const PROHIBIDO: [RegExp, string][] = [
  [/\bl[ií]der(es)?\b/i, 'superlativo sin dato'],
  [/\bel mejor\b/i, 'superlativo sin dato'],
  [/vanguardia/i, 'superlativo sin dato'],
  [/alta calidad/i, 'superlativo sin dato'],
  [/soluciones integrales/i, 'relleno'],
  [/innovador/i, 'superlativo sin dato'],
  [/el grueso\b/i, 'autorreferencia vaga'],
  [/\b(siete|seis|cinco|cuatro|\d+)\s+marcas\b/i, 'el número de marcas se cuenta desde los datos'],
  [/una sola conversaci/i, 'relleno'],
  [/cu[eé]ntenos qu[eé] necesita esterilizar/i, 'CTA retirado: use «Hable con un especialista»'],
  [/cu[eé]ntanos|escr[ií]benos|cont[aá]ctanos/i, 'el sitio trata de usted'],
  [/termodesinfectadora/i, 'el término es «termodesinfectora»'],
  [/papel grado m[eé]dico/i, 'el término es «papel para esterilización»'],
  [/grado esterilizaci[oó]n/i, 'nomenclatura anterior: es «papel para esterilización»'],
  [/esterilizaci[oó]n por plasma/i, 'la línea se llama «baja temperatura»; el plasma es solo uno de sus métodos'],
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

const validarCatalogo = () => {
  const fallos: string[] = [];
  const slugsMarca = new Set(marcas.map((m) => m.slug));
  const slugsLinea = new Set(lineas.map((l) => l.slug));
  const ids = new Set(publicados.map(idProducto));

  for (const p of productos) {
    if (!slugsMarca.has(p.marca)) fallos.push(`${idProducto(p)}: la marca «${p.marca}» no existe`);
    if (!slugsLinea.has(p.linea)) fallos.push(`${idProducto(p)}: la línea «${p.linea}» no existe`);
    for (const r of p.relacionadas)
      if (!ids.has(r.producto))
        fallos.push(`${idProducto(p)}: «${r.producto}» no es un producto publicado del catálogo`);
    if (p.relacionadas.some((r) => r.producto === idProducto(p)))
      fallos.push(`${idProducto(p)}: se enlaza a sí mismo en «Completa el ciclo»`);
  }

  /* Ninguna línea puede quedar sin producto: su página saldría en blanco y la
     entrada del menú llevaría a la nada. */
  for (const l of lineas)
    if (productosDeLinea(l.slug).length === 0) fallos.push(`línea ${l.slug}: no tiene ningún producto publicado`);

  /* Dos productos de la misma marca en la misma línea necesitan slugs
     distintos, o compartirían ruta. */
  const vistas = new Set<string>();
  for (const p of productos) {
    const id = idProducto(p);
    if (vistas.has(id)) fallos.push(`ruta duplicada: /marcas/${id}`);
    vistas.add(id);
  }

  /* El dropdown de Marcas no admite más de cuatro líneas por marca. */
  for (const m of marcas) {
    const n = new Set(publicados.filter((p) => p.marca === m.slug).map((p) => p.linea)).size;
    if (n > 4) fallos.push(`${m.slug}: ${n} líneas en el dropdown, el máximo es 4`);
  }

  /* Una marca tiene que cubrir en `etapasCiclo` las etapas de sus productos, o
     el diagrama de la página de marca diría algo distinto del catálogo. */
  for (const m of marcas) {
    const suyas = new Set(
      publicados.filter((p) => p.marca === m.slug)
        /* La etapa del producto, no la de su línea: «Indicadores y empaque»
           abarca dos, y obligar a 2i a declarar «empaque» —o a SVM
           «monitoreo»— sería hacerles decir que venden algo que no venden. */
        .map((p) => p.etapa ?? lineas.find((x) => x.slug === p.linea)!.etapa)
        .filter((e) => e !== 'transversal'),
    );
    for (const e of suyas)
      if (!m.etapasCiclo.includes(e as (typeof ETAPAS)[number]))
        fallos.push(`${m.slug}: vende en la etapa «${e}» pero no la declara en etapasCiclo`);
  }

  auditar('lineas', lineas, fallos);
  auditar('marcas', marcas, fallos);
  auditar('productos', productos, fallos);

  if (fallos.length)
    throw new Error(`\n\nCatálogo inválido — ${fallos.length} fallo(s):\n  · ${fallos.join('\n  · ')}\n`);
};

/* ---------------------------------------------------------------- loader */
const desde = <T,>(nombre: string, filas: T[], id: (fila: T) => string) => ({
  name: nombre,
  load: async ({ store, parseData }: any) => {
    validarCatalogo();
    store.clear();
    for (const fila of filas) {
      const data = await parseData({ id: id(fila), data: fila });
      store.set({ id: id(fila), data });
    }
  },
});

export const collections = {
  marcas: defineCollection({ loader: desde('marcas', marcas, (m) => m.slug), schema: esquemaMarca }),
  lineas: defineCollection({ loader: desde('lineas', lineas, (l) => l.slug), schema: esquemaLinea }),
  productos: defineCollection({ loader: desde('productos', productos, idProducto), schema: esquemaProducto }),
};
