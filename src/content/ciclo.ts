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
  | 'Repuestos' | 'Mobiliario' | 'Trazabilidad';

export type ItemEstacion = {
  nombre: string;
  categoria: Categoria;
  url: string;
};

export type Estacion = {
  numero: 1 | 2 | 3 | 4 | 5 | 6;
  slug: string;
  nombre: string;
  /** Máx. 11 caracteres: va dentro de la rueda. */
  rotulo: string;
  descripcion: string;
  /** Qué falla ahí cuando falla. Es el gancho comercial de la estación. */
  dolor: string;
  items: ItemEstacion[];
  /** Qué registra el sistema en este punto. */
  trazabilidad: string;
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
    trazabilidad: 'Se registra la recepción del set, el turno y el responsable del lavado.',
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
      { nombre: 'Etiquetas e impresora de central',   categoria: 'Trazabilidad', url: '/trazabilidad' },
    ],
    trazabilidad: 'Aquí nace el rótulo: el paquete adquiere identidad, operario y fecha de vencimiento.',
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
    trazabilidad: 'Se lee el rótulo al conformar la carga: el paquete queda atado a un ciclo, un equipo y un turno.',
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
      { nombre: 'Liberación documentada de carga',      categoria: 'Trazabilidad', url: '/trazabilidad/software' },
    ],
    trazabilidad: 'Sin parámetros conformes el sistema no deja liberar, y guarda quién lo hizo.',
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
      { nombre: 'Control de vencimientos y rotación',      categoria: 'Trazabilidad', url: '/trazabilidad/software' },
    ],
    trazabilidad: 'Ubicación, rotación y alerta de vencimiento salen del mismo rótulo.',
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
      { nombre: 'Vinculación paquete–procedimiento', categoria: 'Trazabilidad', url: '/trazabilidad' },
      { nombre: 'Reporte de recall dirigido',        categoria: 'Trazabilidad', url: '/trazabilidad/software' },
      { nombre: 'Repuestos y partes de desgaste',    categoria: 'Repuestos',    url: '/productos/repuestos' },
    ],
    trazabilidad: 'Con una lectura, el paquete queda unido al procedimiento y al paciente. El ciclo cierra.',
  },
];

/** Tesis del estado de reposo: se cuenta antes de que el visitante toque nada. */
export type Reposo = { titulo: string; descripcion: string; nucleo: string };

export const reposo: Reposo = {
  titulo: 'Seis estaciones, un proveedor',
  descripcion:
    'El material sucio entra por un extremo y sale estéril por el otro. El flujo es unidireccional.',
  nucleo:
    'La trazabilidad no es una séptima estación: es el hilo que las cose todas.',
};

/** Busca por número (1–6) o por slug. Devuelve null si no existe. */
export function buscarEstacion(clave: string): Estacion | null {
  const n = Number(clave);
  if (Number.isInteger(n) && n >= 1 && n <= 6) return estaciones[n - 1] ?? null;
  return estaciones.find((e) => e.slug === clave) ?? null;
}
