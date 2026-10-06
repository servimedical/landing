import type { Producto } from './tipos.ts';

export const esterilizacion: Producto[] = [
  {
    slug: 'autoclaves-de-vapor',
    categoria: 'esterilizacion',
    titulo: 'Autoclaves de vapor',
    entradilla:
      'Vapor saturado con prevacío fraccionado para todo el material termorresistente y empacado. Decide cuántas cargas salen por turno y, con eso, cuánto instrumental hay que tener duplicado.',

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
      linea: 'plasma-de-peroxido',
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
        linea: 'tratamiento-de-agua',
        porQue: 'El agua fuera de especificación incrusta la cámara y el generador. Es el desgaste que menos se vigila.',
      },
      {
        titulo: 'Compresores de aire',
        linea: 'compresores',
        porQue: 'Puertas y válvulas se accionan con aire. Sin aire en especificación, el equipo no abre.',
      },
      {
        titulo: 'Papel grado médico y empaque',
        linea: 'papel-y-empaque',
        porQue: 'El vapor solo esteriliza lo que atraviesa. El empaque deja pasar el agente y sostiene la barrera hasta sala.',
      },
      {
        titulo: 'Indicadores químicos',
        linea: 'indicadores-quimicos',
        porQue: 'El registro impreso dice qué hizo el equipo. El indicador interno, qué pasó dentro del paquete.',
      },
      {
        titulo: 'Indicadores biológicos',
        linea: 'indicadores-biologicos',
        porQue: 'Es la única evidencia de letalidad. Sin él no hay liberación que sostenga una auditoría.',
      },
      {
        titulo: 'Repuestos originales',
        linea: 'repuestos',
        porQue: 'Empaquetadura y válvulas son partes de desgaste. En inventario, una parada de días es de horas.',
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
      titulo: 'Autoclaves de vapor para central de esterilización',
      descripcion:
        'Autoclaves de vapor con prevacío fraccionado para instrumental, textil y material poroso empacado. Dimensionamiento por carga quirúrgica, instalación, calificación y servicio técnico propio en Colombia.',
    },
  },

  {
    slug: 'plasma-de-peroxido',
    categoria: 'esterilizacion',
    titulo: 'Esterilización por plasma de peróxido',
    entradilla:
      'Baja temperatura para lo que el vapor destruye: óptica, motores, cables y polímeros. Su valor está en la rotación: devuelve el instrumental caro a sala el mismo día.',

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
      linea: 'autoclaves-de-vapor',
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
        linea: 'papel-y-empaque',
        porQue: 'La celulosa absorbe el agente y aborta el ciclo. Esta línea necesita su propia barrera.',
      },
      {
        titulo: 'Indicadores químicos',
        linea: 'indicadores-quimicos',
        porQue: 'Los indicadores de vapor no viran con peróxido. No sirven como control aquí.',
      },
      {
        titulo: 'Repuestos originales',
        linea: 'repuestos',
        porQue: 'Electrónica sensible: el canal directo de fábrica evita paradas largas por una parte menor.',
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
      titulo: 'Esterilización por plasma de peróxido de hidrógeno',
      descripcion:
        'Esterilización a baja temperatura para óptica, motores, cables y material termosensible. Dimensionamiento por volumen y rotación, instalación, calificación y servicio técnico propio en Colombia.',
    },
  },

  {
    slug: 'termodesinfectoras',
    categoria: 'esterilizacion',
    titulo: 'Termodesinfectoras',
    entradilla:
      'Lavado y desinfección térmica bajo proceso validado. Ningún método de esterilización corrige lo que el lavado no removió.',

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
        linea: 'tratamiento-de-agua',
        porQue: 'El agua fuera de especificación mancha el instrumental y deja depósitos en los lúmenes.',
      },
      {
        titulo: 'Mesones de lavado',
        linea: 'mesas-y-mesones',
        porQue: 'Sin puesto de prelavado y escurrido, el material entra con residuo y el ciclo no lo corrige.',
      },
      {
        titulo: 'Carros de transporte',
        linea: 'carros-de-transporte',
        porQue: 'El material sucio no puede compartir carro con el estéril. Es parte del flujo unidireccional.',
      },
      {
        titulo: 'Repuestos originales',
        linea: 'repuestos',
        porQue: 'Bombas, válvulas y sensores se desgastan en un equipo que trabaja con agua todo el día.',
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
      titulo: 'Termodesinfectoras para endoscopios y lúmenes',
      descripcion:
        'Lavado y desinfección térmica validada para endoscopios flexibles e instrumental de lúmenes. Dimensionamiento por volumen de procedimientos, instalación, calificación y servicio técnico en Colombia.',
    },
  },
];
