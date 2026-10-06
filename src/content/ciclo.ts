/* ============================================================================
   EL CICLO DE ESTERILIZACIÓN — contenido de la rueda

   La rueda no es una infografía: es el índice del catálogo ordenado como lo
   vive la central, no como lo ve el vendedor. Por eso cada ítem es un enlace
   real a una página que existe; `validarCiclo()` lo comprueba en compilación.

   Un mismo producto aparece en varias estaciones apuntando siempre a la misma
   URL —el mobiliario está en cinco de las seis—. Es deliberado: la rueda es
   una vista, las páginas son la verdad.
   ========================================================================== */

export type Categoria =
  | 'Equipos' | 'Consumibles' | 'Accesorios'
  | 'Repuestos' | 'Mobiliario';

export type ItemEstacion = {
  nombre: string;
  categoria: Categoria;
  url: string;
};

export type Estacion = {
  numero: 1 | 2 | 3 | 4 | 5 | 6;
  slug: string;
  nombre: string;
  /** Rótulo corto, para listados compactos. */
  rotulo: string;
  descripcion: string;
  /** Qué falla ahí cuando falla. Es el gancho comercial de la estación. */
  dolor: string;
  items: ItemEstacion[];
};

export const estaciones: Estacion[] = [
  {
    numero: 1,
    slug: 'recepcion-y-lavado',
    nombre: 'Recepción y lavado',
    rotulo: 'LAVADO',
    descripcion:
      'El instrumental llega contaminado desde salas. Se descontamina, se lava y se seca bajo proceso validado.',
    dolor:
      'Ningún método de esterilización corrige lo que el lavado no removió.',
    items: [
      { nombre: 'Termodesinfectoras de endoscopios', categoria: 'Equipos',    url: '/productos/esterilizacion/termodesinfectoras' },
      { nombre: 'Mesones de lavado con poza',        categoria: 'Mobiliario', url: '/productos/mobiliario/mesas-y-mesones' },
      { nombre: 'Tratamiento y filtración de agua',  categoria: 'Accesorios', url: '/productos/accesorios/tratamiento-de-agua' },
      { nombre: 'Carros cerrados de material sucio', categoria: 'Mobiliario', url: '/productos/mobiliario/carros-de-transporte' },
    ],
  },
  {
    numero: 2,
    slug: 'inspeccion-y-empaque',
    nombre: 'Inspección y empaque',
    rotulo: 'EMPAQUE',
    descripcion:
      'Se revisa pieza por pieza, se verifica funcionalidad, se conforma el set y se empaca.',
    dolor:
      'El empaque es la barrera. Si cede en almacenamiento o transporte, el ciclo se pierde sin que nadie lo note.',
    items: [
      { nombre: 'Selladoras térmicas de rollo mixto', categoria: 'Accesorios',   url: '/productos/accesorios/selladoras' },
      { nombre: 'Papel grado médico y rollo mixto',   categoria: 'Consumibles',  url: '/productos/consumibles/papel-y-empaque' },
      { nombre: 'Mesas de inspección y empaque',      categoria: 'Mobiliario',   url: '/productos/mobiliario/mesas-y-mesones' },
      { nombre: 'Cintas indicadoras de proceso',      categoria: 'Consumibles', url: '/productos/consumibles/papel-y-empaque' },
    ],
  },
  {
    numero: 3,
    slug: 'esterilizacion',
    nombre: 'Esterilización',
    rotulo: 'ESTERILIZA',
    descripcion:
      'Vapor con prevacío fraccionado para lo termorresistente y empacado; plasma de peróxido para lo termosensible.',
    dolor:
      'Un equipo mal dimensionado obliga a ciclos extra. Cada ciclo extra es una sala esperando instrumental.',
    items: [
      { nombre: 'Autoclaves de vapor',                   categoria: 'Equipos',    url: '/productos/esterilizacion/autoclaves-de-vapor' },
      { nombre: 'Esterilización por plasma de peróxido', categoria: 'Equipos',    url: '/productos/esterilizacion/plasma-de-peroxido' },
      { nombre: 'Carros de carga y descarga',            categoria: 'Mobiliario', url: '/productos/mobiliario/carros-de-transporte' },
      { nombre: 'Sellos, válvulas y partes de cámara',   categoria: 'Repuestos',  url: '/productos/repuestos' },
    ],
  },
  {
    numero: 4,
    slug: 'control-y-liberacion',
    nombre: 'Control y liberación',
    rotulo: 'LIBERACIÓN',
    descripcion:
      'Se verifica el registro físico del ciclo, el indicador químico interno y el resultado biológico según protocolo.',
    dolor:
      'La evidencia vive en un cuaderno. El recall depende de la memoria del turno de esa mañana.',
    items: [
      { nombre: 'Indicadores químicos y Bowie-Dick',    categoria: 'Consumibles',  url: '/productos/consumibles/indicadores-quimicos' },
      { nombre: 'Indicadores biológicos e incubación',  categoria: 'Consumibles',  url: '/productos/consumibles/indicadores-biologicos' },
      { nombre: 'Registro impreso de ciclo',            categoria: 'Equipos',      url: '/productos/esterilizacion/autoclaves-de-vapor' },
      { nombre: 'Paquetes de prueba Bowie-Dick',        categoria: 'Consumibles', url: '/productos/consumibles/indicadores-quimicos' },
    ],
  },
  {
    numero: 5,
    slug: 'almacenamiento-esteril',
    nombre: 'Almacenamiento estéril',
    rotulo: 'ALMACÉN',
    descripcion:
      'El paquete espera. Lo que rompe la barrera aquí es la humedad, el contacto con piso o muro y el manipuleo.',
    dolor:
      'Es donde más se pierde material ya procesado, y la pérdida no se ve.',
    items: [
      { nombre: 'Estantería y armarios en acero AISI 304', categoria: 'Mobiliario',   url: '/productos/mobiliario/almacenamiento-esteril' },
      { nombre: 'Bolsas y barrera estéril de reserva',     categoria: 'Consumibles',  url: '/productos/consumibles/papel-y-empaque' },
      { nombre: 'Aire comprimido y servicios de planta',   categoria: 'Accesorios',   url: '/productos/accesorios/compresores' },
      { nombre: 'Armarios cerrados de baja rotación',      categoria: 'Mobiliario',  url: '/productos/mobiliario/almacenamiento-esteril' },
    ],
  },
  {
    numero: 6,
    slug: 'entrega-y-uso',
    nombre: 'Entrega y uso',
    rotulo: 'ENTREGA',
    descripcion:
      'El set se abre en sala. Es el momento que hay que poder reconstruir seis meses después.',
    dolor:
      'Sin vínculo entre paquete y procedimiento, un biológico positivo obliga a recoger todo el inventario.',
    items: [
      { nombre: 'Carros cerrados de distribución',   categoria: 'Mobiliario',   url: '/productos/mobiliario/carros-de-transporte' },
      { nombre: 'Mesas de entrega y recepción',      categoria: 'Mobiliario', url: '/productos/mobiliario/mesas-y-mesones' },
      { nombre: 'Barrera estéril de reserva',        categoria: 'Consumibles', url: '/productos/consumibles/papel-y-empaque' },
      { nombre: 'Repuestos y partes de desgaste',    categoria: 'Repuestos',    url: '/productos/repuestos' },
    ],
  },
];

/** Tesis del bloque: encabeza el proceso en la home. */
export type Reposo = { titulo: string; descripcion: string };

export const reposo: Reposo = {
  titulo: 'Seis estaciones, un proveedor',
  descripcion:
    'El material sucio entra por un extremo y sale estéril por el otro. El flujo es unidireccional.',
};

/** Busca por número (1–6) o por slug. Devuelve null si no existe. */
export function buscarEstacion(clave: string): Estacion | null {
  const n = Number(clave);
  if (Number.isInteger(n) && n >= 1 && n <= 6) return estaciones[n - 1] ?? null;
  return estaciones.find((e) => e.slug === clave) ?? null;
}
