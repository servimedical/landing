/* ============================================================================
   MODELO DE CONTENIDO DE LAS PÁGINAS DE PRODUCTO

   Todo el texto vive aquí. Las plantillas no llevan copia suelta: si un bloque
   se puede copiar de una página a otra cambiando el nombre del producto, está
   mal escrito y hay que rehacerlo.

   Lo que no está confirmado se marca con {{ POR CONFIRMAR }} y no se rellena
   con un valor plausible. Estos equipos procesan material que entra a un
   paciente: una cifra inventada en una ficha no es un error de redacción.
   ========================================================================== */

export type CategoriaProducto = 'esterilizacion' | 'consumibles' | 'accesorios' | 'mobiliario';

export type Estacion = 1 | 2 | 3 | 4 | 5 | 6;

export type Necesidad = {
  titulo: string;
  /** Slug de otra línea del catálogo. La URL la resuelve la marca que la
   *  vende, así que un cambio de estructura no rompe el bloque. */
  linea?: string;
  /** Destino fuera del catálogo, p. ej. /servicios. */
  url?: string;
  /** El porqué explícito. Es lo que separa la venta cruzada real de un
   *  carrusel de «también le puede interesar». */
  porQue: string;
};

export type Producto = {
  slug: string;
  categoria: CategoriaProducto;
  titulo: string;
  /** Dos frases bajo el h1. Es donde la página nombra el dolor de su estación. */
  entradilla: string;

  /** Bloque 1. Qué material entra aquí. */
  procesa: string[];
  /** Bloque 1. Qué NO va aquí: en esterilización es la mitad de la decisión. */
  noProcesa?: string[];
  /** A dónde remitir lo que no procesa. */
  alternativa?: { titulo: string; linea?: string; url?: string; nota: string };

  /** Bloque 2. Las preguntas que se hacen antes de cotizar. */
  dimensionamiento: string[];
  /** Cierre del bloque 2, adaptado a si es equipo, insumo o mobiliario. */
  cierreDimensionamiento: string;

  /** Bloque 3. */
  estacionPrimaria: Estacion;
  estacionesSecundarias?: Estacion[];

  /** Bloque 4. Sale de la matriz de venta cruzada; no se inventan relaciones. */
  necesita: Necesidad[];

  /** Bloque 5. */
  servicio: string[];

  marcas?: string[];
  seo: { titulo: string; descripcion: string };
};
