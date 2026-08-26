/* /productos/repuestos no sigue la plantilla de seis bloques: es índice y
   página a la vez, y su argumento no es qué material procesa sino qué pasa
   cuando el equipo se detiene. */

export type GrupoPartes = { titulo: string; descripcion: string; partes: string[] };

/* {{ POR CONFIRMAR: qué partes concretas entran en el inventario local y
   cuáles se traen por pedido }} — el listado no se publica hasta tenerlo. */

export const repuestos = {
  titulo: 'Repuestos',
  entradilla:
    'Repuestos originales de las marcas que representamos, con inventario local de las partes de mayor rotación. Atendemos también equipos fuera de garantía y de marcas que no vendimos, porque un autoclave detenido es un quirófano detenido y esa conversación no admite condiciones previas.',

  grupos: [
    {
      titulo: 'Sellos y empaquetaduras de puerta',
      descripcion:
        'Es la falla más frecuente de un autoclave y la más fácil de prevenir. La empaquetadura se endurece con los ciclos y deja de sellar de forma progresiva, así que el equipo no falla de golpe: empieza a abortar ciclos sueltos que la central atribuye a otra cosa.',
      partes: [
        'Empaquetadura de puerta',
        'Sellos de cámara',
        'Juntas de tapa y de registro',
      ],
    },
    {
      titulo: 'Válvulas, trampas de vapor y purgadores',
      descripcion:
        'Gobiernan la entrada de vapor y la salida de condensado. Cuando una trampa deja de purgar, la cámara acumula condensado y el ciclo pierde uniformidad sin que el registro impreso lo delate necesariamente.',
      partes: [
        'Válvulas solenoide y de retención',
        'Trampas de vapor y purgadores',
        'Filtros bacteriológicos de línea',
      ],
    },
    {
      titulo: 'Sensores, tarjetas e impresoras de ciclo',
      descripcion:
        'Son las partes que producen la evidencia. Un sensor descalibrado o una impresora sin cinta no detienen el equipo, pero dejan a la central sin el registro físico que necesita para liberar la carga.',
      partes: [
        'Sensores y transductores de temperatura y presión',
        'Tarjetas de control',
        'Impresoras de ciclo y su consumible',
      ],
    },
  ] satisfies GrupoPartes[],

  reposicion: {
    titulo: 'Reposición programada',
    texto:
      'La empaquetadura de puerta es la falla más frecuente y la más fácil de prevenir. Un plan de reposición cuesta menos que un equipo detenido en día quirúrgico, y permite cambiar la parte en la ventana que la central elija en vez de la que imponga la avería.',
    puntos: [
      'Se define contra la rutina de mantenimiento del equipo, no contra una fecha genérica',
      'Las partes de mayor rotación quedan en inventario en Bogotá',
      'El resto se trae por canal directo de fábrica',
      'El listado concreto se define contra el parque de equipos de la central',
    ],
  },

  seo: {
    titulo: 'Repuestos originales para equipos de esterilización — Servimedical Group',
    descripcion:
      'Empaquetaduras de puerta, válvulas, trampas de vapor, sensores y tarjetas de control para autoclaves y equipos de central. Inventario local en Bogotá y atención a equipos fuera de garantía.',
  },
} as const;
