/* ============================================================================
   MODELO DE DATOS DEL PORTAFOLIO

   Un solo origen de verdad. El navbar, la home, /marcas, las páginas de marca
   y las de línea leen de aquí. Ningún componente lleva listas propias.

   Reglas que no se negocian:

   · Una cifra sin fuente no se publica. Si el fabricante no la declara en su
     ficha, el campo va vacío y marcado. Estos equipos procesan material que
     entra a un paciente: una capacidad inventada en una ficha técnica no es
     un error de redacción.
   · Una sección sin datos no se renderiza. Nunca se rellena un hueco.
   · Los marcadores viven en el código, nunca en la página (ver VOZ.md).
   ========================================================================== */

export type EtapaCiclo =
  | 'lavado'
  | 'empaque'
  | 'esterilizacion'
  | 'monitoreo'
  | 'almacenamiento'
  | 'residuos';

export const ETAPAS: { id: EtapaCiclo; titulo: string }[] = [
  { id: 'lavado',         titulo: 'Lavado y desinfección' },
  { id: 'empaque',        titulo: 'Empaque' },
  { id: 'esterilizacion', titulo: 'Esterilización' },
  { id: 'monitoreo',      titulo: 'Monitoreo' },
  { id: 'almacenamiento', titulo: 'Almacenamiento' },
  { id: 'residuos',       titulo: 'Residuos' },
];

/** Dato de fabricante con su procedencia. Sin `fuente` no se renderiza. */
export type Prueba = { dato: string; fuente: string };

export type Documento = { titulo: string; url: string; tipo: string; peso: string };

export type Marca = {
  slug: string;
  nombre: string;
  /** Una línea bajo el nombre, en el dropdown y en las tarjetas. 1–6 palabras. */
  descriptor: string;
  /** [quién es] + [qué resuelve en la central, con método] + [qué sostiene SVMG]. */
  lead: string;
  fabricante: { pais: string; fundacion?: string; razonSocial?: string; fuente?: string };
  rolSVMG: 'representante' | 'distribuidor';
  /** Número real de registro sanitario. Vacío mientras no esté confirmado. */
  invima?: string;
  logo: { src: string; alt: string };
  /** Corrige el peso óptico de un logo suelto. 1 es el tamaño natural. */
  logoEscala?: number;
  etapasCiclo: EtapaCiclo[];
  pruebas?: Prueba[];
  respaldo?: string[];
  documentos?: Documento[];
  catalogo?: string;
  orden: number;
  seo: { titulo: string; descripcion: string };
};

export type Spec = { label: string; valor: string };

export type Relacionada = {
  /** Slug de otra línea. La URL la resuelve su marca. */
  linea: string;
  porque: string;
};

export type Linea = {
  slug: string;
  marca: string;
  nombre: string;
  tipo: 'equipo' | 'consumible' | 'mobiliario';
  /** Slug de `src/datos/categorias.ts`. Agrupa la línea por método, no por
   *  fabricante: es lo que arma el menú de Líneas y /lineas. */
  categoria: string;
  /** Sólo cuando una marca aporta más de una línea a la misma categoría y el
   *  nombre de la marca ya no basta para distinguirlas en el menú. */
  etiquetaMenu?: string;
  /** [qué carga procesa] + [cómo] + [por qué importa en la central]. */
  lead: string;
  /** El método en una línea. Va en la tarjeta de la marca y en el hero. */
  metodo: string;
  /** Para qué carga o servicio. */
  uso: string;
  /** 3–4 datos duros bajo el hero. */
  specsClave: Spec[];
  modelos?: { encabezados: string[]; filas: string[][] };
  /** Sólo `equipo`. */
  compatible?: string[];
  noCompatible?: string[];
  /** Reemplaza a compatible/noCompatible en consumibles y mobiliario. */
  dondeSeUsa?: string[];
  /** A dónde remitir lo que esta línea no procesa. */
  alternativa?: { titulo: string; linea: string; nota: string };
  /** Norma que gobierna el proceso, no una certificación del fabricante. */
  normasProceso?: { norma: string; que: string }[];
  /** Lo que el fabricante declara en su ficha. Vacío mientras no se tenga. */
  certificaciones?: Prueba[];
  /** Sólo `equipo`. */
  instalacion?: Spec[];
  preguntasCotizacion: string[];
  /** Máximo 3, sin destinos repetidos. */
  relacionadas: Relacionada[];
  servicio: string[];
  faq?: { p: string; r: string }[];
  orden: number;
  seo: { titulo: string; descripcion: string };
};
