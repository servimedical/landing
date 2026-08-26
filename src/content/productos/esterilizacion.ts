import type { Producto } from './tipos.ts';

export const esterilizacion: Producto[] = [
  {
    slug: 'autoclaves-de-vapor',
    categoria: 'esterilizacion',
    titulo: 'Autoclaves de vapor',
    entradilla:
      'Vapor saturado con prevacío fraccionado para todo el material termorresistente y empacado. Es el equipo que decide cuántas cargas salen por turno, y por lo tanto cuánto instrumental tiene que estar duplicado para que la programación quirúrgica no dependa de un solo ciclo.',

    procesa: [
      'Instrumental quirúrgico de acero inoxidable',
      'Textiles y ropa quirúrgica',
      'Material poroso empacado',
      'Vidriería y líquidos en ciclo específico',
      'Sets conformados en contenedor rígido',
    ],
    noProcesa: [
      'Óptica y endoscopios flexibles',
      'Motores e instrumental con electrónica',
      'Polímeros termosensibles',
      'Material sensible a la humedad',
    ],
    alternativa: {
      titulo: 'Esterilización por plasma de peróxido',
      url: '/productos/esterilizacion/plasma-de-peroxido',
      nota: 'Todo lo termosensible va por baja temperatura. Forzarlo en vapor daña el material y no lo esteriliza.',
    },

    dimensionamiento: [
      'Cirugías por día y por especialidad',
      'Cargas por turno y turnos que opera la central',
      'Rotación de sets y cuáles son los sets críticos duplicados',
      'Espacio disponible y necesidad de doble puerta con barrera sanitaria',
      'Acometidas de vapor, agua, desagüe y eléctrica disponibles',
      'Proyección de crecimiento a cinco años',
    ],
    cierreDimensionamiento:
      'Con estas respuestas proponemos el equipo. Sin ellas, cualquier cotización es un número suelto.',

    estacionPrimaria: 3,

    necesita: [
      {
        titulo: 'Tratamiento y filtración de agua',
        url: '/productos/accesorios/tratamiento-de-agua',
        porQue: 'El agua fuera de especificación incrusta la cámara y el generador de vapor. Es la causa de desgaste que menos se vigila y la que más caro sale.',
      },
      {
        titulo: 'Compresores de aire',
        url: '/productos/accesorios/compresores',
        porQue: 'Las puertas y las válvulas neumáticas se accionan con aire comprimido. Sin aire en especificación, el equipo no abre y la central se detiene.',
      },
      {
        titulo: 'Papel grado médico y empaque',
        url: '/productos/consumibles/papel-y-empaque',
        porQue: 'El vapor solo esteriliza lo que atraviesa. El empaque tiene que dejar pasar el agente y sostener la barrera hasta que el set se abra en sala.',
      },
      {
        titulo: 'Indicadores químicos',
        url: '/productos/consumibles/indicadores-quimicos',
        porQue: 'El registro impreso dice qué hizo el equipo. El indicador interno dice qué pasó dentro del paquete, que no es lo mismo.',
      },
      {
        titulo: 'Indicadores biológicos',
        url: '/productos/consumibles/indicadores-biologicos',
        porQue: 'Es la única evidencia de letalidad. Sin control biológico según protocolo no hay liberación de carga que sostenga una auditoría.',
      },
      {
        titulo: 'Repuestos originales',
        url: '/productos/repuestos',
        porQue: 'La empaquetadura de puerta y las válvulas son partes de desgaste. Tenerlas en inventario convierte una parada de días en una de horas.',
      },
    ],

    servicio: [
      'Verificación previa de acometidas antes de despachar el equipo',
      'Instalación y puesta en marcha',
      'Calificación de instalación y de operación',
      'Pruebas de vacío y test de Bowie-Dick de aceptación',
      'Mantenimiento preventivo con rutina definida por equipo',
      'Entrenamiento a la central y al área biomédica',
    ],

    marcas: ['Tuttnauer', 'Sanqiang'],
    seo: {
      titulo: 'Autoclaves de vapor para central de esterilización — Servimedical Group',
      descripcion:
        'Autoclaves de vapor con prevacío fraccionado para instrumental, textil y material poroso empacado. Dimensionamiento por carga quirúrgica, instalación, calificación y servicio técnico propio en Colombia.',
    },
  },

  {
    slug: 'plasma-de-peroxido',
    categoria: 'esterilizacion',
    titulo: 'Esterilización por plasma de peróxido',
    entradilla:
      'Baja temperatura para el material que el vapor destruye: óptica, motores, cables y polímeros. Su valor no está en el ciclo sino en la rotación, porque devuelve a sala el instrumental caro el mismo día en vez de obligar a comprar un segundo juego.',

    procesa: [
      'Óptica rígida y flexible',
      'Cables y fibra',
      'Motores e instrumental con electrónica',
      'Polímeros y material termosensible',
    ],
    noProcesa: [
      'Celulosa, textiles y papel',
      'Líquidos y polvos',
      'Lúmenes fuera de la especificación del equipo',
    ],
    alternativa: {
      titulo: 'Autoclaves de vapor',
      url: '/productos/esterilizacion/autoclaves-de-vapor',
      nota: 'La celulosa absorbe el peróxido y aborta el ciclo. Todo lo termorresistente y poroso va por vapor.',
    },

    dimensionamiento: [
      'Volumen de material termosensible por turno',
      'Tipo de lúmenes y longitudes que hay que procesar',
      'Urgencia de rotación entre cirugías',
      'Disponibilidad de empaque compatible con el método',
    ],
    cierreDimensionamiento:
      'Con estas respuestas proponemos el equipo. Sin ellas, cualquier cotización es un número suelto.',

    estacionPrimaria: 3,

    necesita: [
      {
        titulo: 'Empaque compatible con peróxido',
        url: '/productos/consumibles/papel-y-empaque',
        porQue: 'El empaque de celulosa no sirve aquí: absorbe el agente y aborta el ciclo. Esta línea necesita su propio material de barrera.',
      },
      {
        titulo: 'Indicadores químicos',
        url: '/productos/consumibles/indicadores-quimicos',
        porQue: 'El peróxido tiene sus propios indicadores. Los de vapor no viran con este agente y no sirven como control.',
      },
      {
        titulo: 'Repuestos originales',
        url: '/productos/repuestos',
        porQue: 'Es un equipo de electrónica sensible. El repuesto original con canal directo de fábrica evita paradas largas por una parte menor.',
      },
    ],

    servicio: [
      'Instalación en el punto definido y puesta en marcha',
      'Calificación de instalación y de operación del ciclo de baja temperatura',
      'Mantenimiento preventivo con rutina propia del equipo de plasma',
      'Entrenamiento en carga, empaque compatible y control del proceso',
    ],

    marcas: ['{{ POR CONFIRMAR: marcas de plasma de peróxido que representa SVMG }}'],
    seo: {
      titulo: 'Esterilización por plasma de peróxido de hidrógeno — Servimedical Group',
      descripcion:
        'Esterilización a baja temperatura para óptica, motores, cables y material termosensible. Dimensionamiento por volumen y rotación, instalación, calificación y servicio técnico propio en Colombia.',
    },
  },

  {
    slug: 'termodesinfectoras',
    categoria: 'esterilizacion',
    titulo: 'Termodesinfectoras',
    entradilla:
      'Lavado y desinfección térmica bajo proceso validado, antes de que alguien vuelva a manipular el material sin barrera. Ningún método de esterilización corrige lo que el lavado no removió, y por eso esta es la estación que decide si el resto del ciclo tiene sentido.',

    procesa: [
      'Endoscopios flexibles',
      'Instrumental de lúmenes',
      'Accesorios de endoscopia',
    ],

    dimensionamiento: [
      'Número de procedimientos endoscópicos por día',
      'Tipo y cantidad de equipos que hay que procesar',
      'Calidad del agua de alimentación disponible',
      'Espacio en el área de lavado y flujo hacia la zona limpia',
    ],
    cierreDimensionamiento:
      'Con estas respuestas proponemos el equipo. Sin ellas, cualquier cotización es un número suelto.',

    estacionPrimaria: 1,

    necesita: [
      {
        titulo: 'Tratamiento y filtración de agua',
        url: '/productos/accesorios/tratamiento-de-agua',
        porQue: 'El agua es el insumo principal del proceso. La que no cumple especificación mancha el instrumental y deja depósitos en los lúmenes que después nadie ve.',
      },
      {
        titulo: 'Mesones de lavado',
        url: '/productos/mobiliario/mesas-y-mesones',
        porQue: 'El equipo necesita un puesto de prelavado y escurrido antes de la carga. Sin él, el material entra con residuo y el ciclo no lo corrige.',
      },
      {
        titulo: 'Carros de transporte',
        url: '/productos/mobiliario/carros-de-transporte',
        porQue: 'El material sucio llega desde salas y no puede compartir carro con el estéril. La separación es parte del flujo unidireccional.',
      },
      {
        titulo: 'Repuestos originales',
        url: '/productos/repuestos',
        porQue: 'Bombas, válvulas y sensores son partes de desgaste en un equipo que trabaja con agua todo el día.',
      },
    ],

    servicio: [
      'Instalación con conexión hidráulica y de desagüe, y puesta en marcha',
      'Calificación de instalación y de operación del proceso de lavado',
      'Mantenimiento preventivo con protocolo definido por equipo',
      'Entrenamiento al personal de la zona de lavado',
    ],

    marcas: ['{{ POR CONFIRMAR: marcas de termodesinfectoras que representa SVMG }}'],
    seo: {
      titulo: 'Termodesinfectoras para endoscopios y lúmenes — Servimedical Group',
      descripcion:
        'Lavado y desinfección térmica validada para endoscopios flexibles e instrumental de lúmenes. Dimensionamiento por volumen de procedimientos, instalación, calificación y servicio técnico en Colombia.',
    },
  },
];
