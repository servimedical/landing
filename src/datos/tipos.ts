/* ============================================================================
   MODELO DE DATOS DEL CATÁLOGO

   Tres niveles, cada uno con una pregunta propia y sin repetirse:

     Marca    /marcas/{marca}            quién fabrica y qué respalda SVMG aquí
     Línea    /lineas/{linea}            qué es el método y cuándo se usa
     Producto /marcas/{marca}/{linea}    el equipo concreto, con cifras

   El método se explica UNA vez, en la línea. El producto no lo repite: trae
   sus modelos, sus ciclos y sus cifras, y enlaza a la línea.

   Reglas que no se negocian:
   · Una cifra sin fuente no se publica. Si el fabricante no la declara, el
     campo va vacío y marcado. Estos equipos procesan material que entra a un
     paciente: una capacidad inventada no es un error de redacción.
   · Una sección sin datos no se renderiza. Nunca se rellena un hueco.
   · `instalacion` sólo admite cifras. Una fila que diría «según la placa» se
     omite: no informa y ocupa el lugar de la que sí informaría.
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

export type Spec = { label: string; valor: string };

/* ------------------------------------------------------------------ MARCA */

export type Marca = {
  slug: string;
  nombre: string;
  /** Una línea bajo el nombre, en menús y tarjetas. */
  descriptor: string;
  /** Dos frases: quién es y qué sostiene SVMG en Colombia. */
  lead: string;
  /** Un párrafo: historia, planta, normas de fabricación y alcance. */
  quienEs: string;
  fabricante: {
    razonSocial?: string;
    ciudad?: string;
    pais: string;
    fundacion?: string;
  };
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
  orden: number;
  seo: { titulo: string; descripcion: string };
};

/* ------------------------------------------------------------------ LÍNEA
   El método. Lo que es cierto para cualquier fabricante que lo venda. */

export type Linea = {
  slug: string;
  nombre: string;
  /** Nombre corto para el navbar, cuando el de la página no cabe o sobra.
   *  «Indicadores y empaque» en la página, «Indicadores» en el menú. */
  nombreNav?: string;
  /** 3–6 palabras bajo el nombre, en el menú y en las tarjetas. */
  descriptor: string;
  etapa: EtapaCiclo | 'transversal';
  /** Una línea puede cubrir más de una etapa del ciclo. «Indicadores y
   *  empaque» vigila el proceso y además sostiene la barrera estéril, y sin
   *  esto la marca que aporta el papel no podría declarar la etapa
   *  «empaque». */
  etapasAdicionales?: EtapaCiclo[];
  /** Una frase. */
  lead: string;
  /** 2–3 párrafos. Aquí, y sólo aquí, se explica cómo funciona el método. */
  comoFunciona: string[];
  compatible: string[];
  noCompatible: string[];
  /** Nota sobre el empaque que exige el método, cuando la hay. */
  empaque?: string;
  normas: { norma: string; que: string }[];
  faq?: { p: string; r: string }[];
  orden: number;
  seo: { titulo: string; descripcion: string };
};

/* --------------------------------------------------------------- PRODUCTO */

/* Una tabla de modelos. Cuando un producto tiene varias familias —mesa,
   mediano, central— va una tabla por familia con su propio encabezado: una
   sola de veinte filas no se lee. */
export type TablaModelos = {
  familia?: string;
  nota?: string;
  encabezados: string[];
  filas: string[][];
};

/** Foto, galería y brochure. La plantilla resuelve en build qué existe y
 *  elige la variante del hero. `npm run media` lista lo que falta. */
export type Media = {
  foto?: string;
  galeria?: string[];
  brochure?: { url: string; titulo: string; pesoKB: number };
};

export type Relacionado = {
  /** Identificador de otro producto: `marca/linea`. */
  producto: string;
  porque: string;
};

export type Producto = {
  marca: string;
  /** `false` oculta el producto del sitio entero: rutas, menús, línea y
   *  venta cruzada. Se usa cuando el fabricante no publica la ficha y no se
   *  puede afirmar en el sitio un equipo que no se puede documentar. */
  publicado?: boolean;
  /** Segmento de la URL: /marcas/{marca}/{slug}. Casi siempre coincide con
   *  `linea`; difiere cuando una marca aporta dos productos a la misma línea,
   *  como los indicadores químicos y biológicos de 2i. */
  slug: string;
  /** Slug de la línea —el método— a la que pertenece. */
  linea: string;
  /** Nombre comercial de la familia: «PlazMax», «Azteca», «AKR». */
  nombre: string;
  tipo: 'equipo' | 'consumible' | 'mobiliario';
  /** Una o dos frases con cifras. */
  lead: string;
  /** 3–4 datos duros bajo el H1. */
  franja: Spec[];
  /** Dos párrafos sobre este equipo: construcción, control y qué lo distingue. */
  descripcion: string[];
  modelos?: TablaModelos[];
  /** Ciclos y pruebas declarados por el fabricante, agrupados por familia
   *  cuando cambian de una a otra. */
  ciclos?: { familia?: string; items: string[] }[];
  /** Sólo cifras reales. Sin cifra, la fila no entra. */
  instalacion?: Spec[];
  /** A qué familia aplican los requisitos de instalación. */
  instalacionFamilia?: string;
  /** Lo que el fabricante declara. Distinto de las normas del método.
   *  Por familia cuando cambian. */
  normasDeclaradas?: { familia?: string; normas: string[] }[];
  /** Exactamente 3, para la tarjeta de la línea. Son lo que lo distingue. */
  diferenciales: [string, string, string];
  preguntasCotizacion: string[];
  /** Máximo 3 productos de otras etapas, sin repetir destino. */
  relacionadas: Relacionado[];
  servicio: string[];
  media?: Media;
  /** Dónde descargar el brochure oficial, mientras no esté en el repo. */
  fuenteBrochure?: string;
  orden: number;
  seo: { titulo: string; descripcion: string };
};
