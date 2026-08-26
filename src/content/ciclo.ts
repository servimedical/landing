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
      'El instrumental llega contaminado desde salas. Se recibe, se descontamina, se lava y se seca bajo proceso validado, antes de que alguien vuelva a manipularlo sin barrera.',
    dolor:
      'Un lavado deficiente arrastra materia orgánica a todo lo que sigue. Ningún método de esterilización corrige lo que el lavado no removió.',
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
      'Se revisa pieza por pieza, se verifica funcionalidad, se conforma el set y se empaca. Un sellado sin control de parámetros invalida todo lo que viene después.',
    dolor:
      'El empaque es la barrera estéril. Si se abre en el almacenamiento o en el transporte, el ciclo entero se pierde sin que nadie lo note.',
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
      'Vapor con prevacío fraccionado para material termorresistente y empacado; plasma de peróxido para el termosensible. La elección de método define el resto de la central.',
    dolor:
      'Un equipo mal dimensionado obliga a ciclos extra por turno, y cada ciclo extra es tiempo de sala esperando instrumental.',
    items: [
      { nombre: 'Autoclaves de vapor',                   categoria: 'Equipos',    url: '/productos/esterilizacion/autoclaves-de-vapor' },
      { nombre: 'Esterilización por plasma de peróxido', categoria: 'Equipos',    url: '/productos/esterilizacion/plasma-de-peroxido' },
      { nombre: 'Carros de carga y descarga',            categoria: 'Mobiliario', url: '/productos/mobiliario/carros-de-transporte' },
      { nombre: 'Sellos, válvulas y partes de cámara',   categoria: 'Repuestos',  url: '/productos/repuestos' },
    ],
    trazabilidad: 'Al conformar la carga se lee el rótulo: el paquete queda atado a un ciclo, un equipo y un turno.',
  },
  {
    numero: 4,
    slug: 'control-y-liberacion',
    nombre: 'Control y liberación',
    rotulo: 'LIBERACIÓN',
    descripcion:
      'Una carga que no se puede demostrar no se puede liberar. Se verifica el registro físico del ciclo, el indicador químico interno y el resultado biológico según protocolo.',
    dolor:
      'Cuando la evidencia vive en un cuaderno, la auditoría y el recall dependen de la memoria del turno que estuvo esa mañana.',
    items: [
      { nombre: 'Indicadores químicos y Bowie-Dick',    categoria: 'Consumibles',  url: '/productos/consumibles/indicadores-quimicos' },
      { nombre: 'Indicadores biológicos e incubación',  categoria: 'Consumibles',  url: '/productos/consumibles/indicadores-biologicos' },
      { nombre: 'Registro impreso de ciclo',            categoria: 'Equipos',      url: '/productos/esterilizacion/autoclaves-de-vapor' },
      { nombre: 'Liberación documentada de carga',      categoria: 'Trazabilidad', url: '/trazabilidad/software' },
    ],
    trazabilidad: 'El sistema no deja liberar una carga sin parámetros conformes, y guarda quién liberó y con qué evidencia.',
  },
  {
    numero: 5,
    slug: 'almacenamiento-esteril',
    nombre: 'Almacenamiento estéril',
    rotulo: 'ALMACÉN',
    descripcion:
      'El paquete espera. Lo que destruye la barrera aquí es la humedad, el contacto con piso o muro, el manipuleo repetido y la rotación que nadie controla.',
    dolor:
      'Es la estación donde más se pierde material ya procesado, y la pérdida no se ve: se reprocesa material vigente y se despacha material vencido.',
    items: [
      { nombre: 'Estantería y armarios en acero AISI 304', categoria: 'Mobiliario',   url: '/productos/mobiliario/almacenamiento-esteril' },
      { nombre: 'Bolsas y barrera estéril de reserva',     categoria: 'Consumibles',  url: '/productos/consumibles/papel-y-empaque' },
      { nombre: 'Aire comprimido y servicios de planta',   categoria: 'Accesorios',   url: '/productos/accesorios/compresores' },
      { nombre: 'Control de vencimientos y rotación',      categoria: 'Trazabilidad', url: '/trazabilidad/software' },
    ],
    trazabilidad: 'Ubicación, rotación por vencimiento y alerta de caducidad salen del mismo rótulo.',
  },
  {
    numero: 6,
    slug: 'entrega-y-uso',
    nombre: 'Entrega y uso',
    rotulo: 'ENTREGA',
    descripcion:
      'El set se despacha y se abre en sala. Ese es el momento que hay que poder reconstruir seis meses después si el comité de infecciones lo pide.',
    dolor:
      'Sin vínculo entre paquete y procedimiento, un indicador biológico positivo obliga a recoger el inventario completo y a reprocesar a ciegas.',
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
    'El material sucio entra por un extremo y sale estéril por el otro. El flujo es unidireccional y no admite retrocesos: lo que una estación no resuelve, la siguiente no corrige.',
  nucleo:
    'La trazabilidad no es una séptima estación: es el hilo que las cose todas, y por eso ocupa el núcleo.',
};

/** Busca por número (1–6) o por slug. Devuelve null si no existe. */
export function buscarEstacion(clave: string): Estacion | null {
  const n = Number(clave);
  if (Number.isInteger(n) && n >= 1 && n <= 6) return estaciones[n - 1] ?? null;
  return estaciones.find((e) => e.slug === clave) ?? null;
}
