import type { Linea } from './tipos.ts';
import { marcas } from './marcas.ts';

const ORDEN_MARCA = [...marcas].sort((a, b) => a.orden - b.orden).map((m) => m.slug);

/* ============================================================================
   LAS LÍNEAS

   Una línea pertenece a exactamente una marca. El orden dentro de cada marca
   es el orden del dropdown y de la grilla de la página de marca.

   Lo que NO está aquí y no se inventa:
   · `modelos` — ninguna línea tiene tabla porque no hay fichas del fabricante.
   · `certificaciones` — lo que el fabricante declara en su ficha. Distinto de
     `normasProceso`, que es la norma que gobierna el proceso en sí.
   · capacidades y dimensiones en `specsClave`.
   Cada hueco lleva su `// TODO`. Una sección sin datos no se renderiza.
   ========================================================================== */

/* --------------------------------------------------- normas de referencia --
   Son las normas que gobiernan el proceso, no certificaciones de un equipo.
   Se repiten entre marcas porque el proceso es el mismo. */
const N_VAPOR = [
  { norma: 'ISO 17665', que: 'Esterilización por calor húmedo: desarrollo, validación y control de rutina del proceso.' },
  { norma: 'EN 285 · EN 13060', que: 'Requisitos de los esterilizadores de vapor grandes y pequeños.' },
];
const N_PLASMA = [
  { norma: 'ISO 14937', que: 'Requisitos generales para caracterizar un agente esterilizante y validar el proceso.' },
  { norma: 'ISO 22441', que: 'Esterilización a baja temperatura por peróxido de hidrógeno vaporizado.' },
];
const N_TERMO = [
  { norma: 'ISO 15883', que: 'Lavadoras desinfectadoras: requisitos, ensayos y validación del proceso.' },
];

export const lineas: Linea[] = [
  /* ════════════════════════════════════════════════════════ TUTTNAUER ════ */
  {
    slug: 'vapor',
    marca: 'tuttnauer',
    nombre: 'Vapor',
    tipo: 'equipo',
    categoria: 'vapor',
    lead:
      'Vapor saturado con prevacío fraccionado para todo el material termorresistente y empacado. Decide cuántas cargas salen por turno y, con eso, cuánto instrumental hay que tener duplicado.',
    metodo: 'Vapor saturado con prevacío fraccionado',
    uso: 'Instrumental termorresistente, textiles y contenedores',
    specsClave: [
      { label: 'Método', valor: 'Vapor saturado · prevacío fraccionado' },
      { label: 'Temperatura de ciclo', valor: '121 °C y 134 °C' },
      { label: 'Norma del proceso', valor: 'ISO 17665' },
      // TODO capacidad: rango de volumen de cámara según catálogo Tuttnauer
    ],
    compatible: [
      'Instrumental quirúrgico de acero inoxidable',
      'Textiles y ropa quirúrgica',
      'Material poroso empacado',
      'Vidriería y líquidos en ciclo específico',
      'Sets conformados en contenedor rígido',
    ],
    noCompatible: [
      'Óptica y endoscopios flexibles',
      'Motores e instrumental con electrónica',
      'Polímeros termosensibles',
      'Material sensible a la humedad',
    ],
    alternativa: {
      titulo: 'Plasma Tuttnauer',
      linea: 'plasma',
      nota: 'Todo lo termosensible va por baja temperatura. Forzarlo en vapor daña el material y no lo esteriliza.',
    },
    normasProceso: N_VAPOR,
    instalacion: [
      { label: 'Eléctrico', valor: 'Acometida dedicada según la placa del modelo.' },
      { label: 'Agua', valor: 'Agua tratada. La dureza y la conductividad las fija el fabricante en la ficha del modelo.' },
      { label: 'Vapor', valor: 'Red de planta o generador propio, según configuración.' },
      { label: 'Drenaje', valor: 'Desagüe con capacidad para la descarga de condensado del ciclo.' },
      { label: 'Ventilación', valor: 'Extracción en el recinto y disipación del calor del equipo.' },
      { label: 'Espacio', valor: 'Área de servicio al respaldo y, si hay barrera sanitaria, doble puerta.' },
    ],
    preguntasCotizacion: [
      'Cirugías por día y por especialidad',
      'Cargas por turno y turnos que opera la central',
      'Rotación de sets y cuáles son los sets críticos duplicados',
      'Espacio disponible y necesidad de doble puerta con barrera sanitaria',
      'Acometidas de vapor, agua, desagüe y eléctrica disponibles',
    ],
    relacionadas: [
      { linea: 'papel-y-tyvek', porque: 'El vapor solo esteriliza lo que atraviesa. El empaque deja pasar el agente y sostiene la barrera hasta sala.' },
      { linea: 'indicadores-biologicos', porque: 'Es la única evidencia de letalidad. Sin él no hay liberación que sostenga una auditoría.' },
      { linea: 'repuestos', porque: 'Empaquetadura y válvulas son partes de desgaste. En inventario, una parada de días es de horas.' },
    ],
    servicio: [
      'Calificación de instalación y de operación, con pruebas de vacío y Bowie-Dick de aceptación',
      'Mantenimiento preventivo con rutina definida por equipo',
      'Repuesto original con existencias en Bogotá',
    ],
    faq: [
      { p: '¿Sirve para óptica y motores?', r: 'No. El vapor destruye la óptica, los cables y la electrónica. Ese material va por plasma de peróxido.' },
      { p: '¿Hace falta generador de vapor propio?', r: 'Depende de la red de la institución. Si la planta entrega vapor en especificación y con caudal suficiente, el equipo se conecta a ella; si no, se configura con generador propio.' },
      { p: '¿Con qué frecuencia se corre el Bowie-Dick?', r: 'Diaria, en la primera carga del día, antes de procesar material. Es la prueba que verifica la remoción de aire del prevacío.' },
      { p: '¿Se puede instalar sin tratamiento de agua?', r: 'Se puede, pero la incrustación acorta la vida de la cámara y del generador y el daño no se ve hasta que el equipo falla. El análisis del agua va antes de la instalación.' },
    ],
    orden: 1,
    seo: {
      titulo: 'Vapor Tuttnauer en Colombia | Servimedical',
      descripcion:
        'Autoclaves Tuttnauer de vapor saturado con prevacío fraccionado para instrumental, textiles y contenedores. Instalación, calificación y repuesto original desde Bogotá.',
    },
  },

  {
    slug: 'plasma',
    marca: 'tuttnauer',
    nombre: 'Plasma',
    tipo: 'equipo',
    categoria: 'plasma',
    lead:
      'Baja temperatura para lo que el vapor destruye: óptica, motores, cables y polímeros. Su valor está en la rotación: devuelve el instrumental caro a sala el mismo día.',
    metodo: 'Peróxido de hidrógeno vaporizado a baja temperatura',
    uso: 'Óptica, motores, cables y material termosensible',
    specsClave: [
      { label: 'Método', valor: 'Peróxido de hidrógeno vaporizado' },
      { label: 'Temperatura de ciclo', valor: 'Baja temperatura' },
      { label: 'Norma del proceso', valor: 'ISO 22441' },
      // TODO capacidad y duración de ciclo según catálogo Tuttnauer
    ],
    compatible: [
      'Óptica rígida y flexible',
      'Cables y fibra',
      'Motores e instrumental con electrónica',
      'Polímeros y material termosensible',
    ],
    noCompatible: [
      'Celulosa, textiles y papel',
      'Líquidos y polvos',
      'Lúmenes fuera de la especificación del equipo',
    ],
    alternativa: {
      titulo: 'Vapor Tuttnauer',
      linea: 'vapor',
      nota: 'La celulosa absorbe el peróxido y aborta el ciclo. Todo lo termorresistente y poroso va por vapor.',
    },
    normasProceso: N_PLASMA,
    instalacion: [
      { label: 'Eléctrico', valor: 'Acometida dedicada según la placa del modelo.' },
      { label: 'Ventilación', valor: 'Recinto ventilado, por el agente químico del proceso.' },
      { label: 'Espacio', valor: 'Área de servicio al respaldo y espacio para el almacenamiento de cartuchos.' },
    ],
    preguntasCotizacion: [
      'Volumen de material termosensible por turno',
      'Tipo de lúmenes y longitudes que hay que procesar',
      'Urgencia de rotación entre cirugías',
      'Disponibilidad de empaque compatible con el método',
    ],
    relacionadas: [
      { linea: 'papel-y-tyvek', porque: 'La celulosa absorbe el agente y aborta el ciclo. Esta línea necesita su propia barrera, en Tyvek.' },
      { linea: 'indicadores-quimicos', porque: 'Los indicadores de vapor no viran con peróxido. No sirven como control aquí.' },
      { linea: 'repuestos', porque: 'Electrónica sensible: el canal directo de fábrica evita paradas largas por una parte menor.' },
    ],
    servicio: [
      'Calificación de instalación y de operación del ciclo de baja temperatura',
      'Mantenimiento preventivo con rutina propia del equipo de plasma',
      'Entrenamiento en carga, empaque compatible y control del proceso',
    ],
    faq: [
      { p: '¿Por qué no se puede empacar en papel?', r: 'La celulosa absorbe el peróxido, baja la concentración del agente y aborta el ciclo. El empaque de esta línea es Tyvek.' },
      { p: '¿Procesa lúmenes largos?', r: 'Dentro del límite de diámetro y longitud que declara el fabricante para cada ciclo. Fuera de ese límite el agente no llega al interior.' },
      { p: '¿Reemplaza al autoclave de vapor?', r: 'No. Son métodos complementarios: el plasma cubre lo termosensible y el vapor todo lo termorresistente y poroso. Una central necesita los dos.' },
    ],
    orden: 2,
    seo: {
      titulo: 'Plasma Tuttnauer en Colombia | Servimedical',
      descripcion:
        'Esterilización Tuttnauer por peróxido de hidrógeno vaporizado para óptica, motores, cables y material termosensible. Instalación, calificación y servicio técnico propio.',
    },
  },

  {
    slug: 'termodesinfectoras',
    marca: 'tuttnauer',
    nombre: 'Termodesinfectoras',
    tipo: 'equipo',
    categoria: 'termodesinfectoras',
    lead:
      'Lavado y desinfección térmica bajo proceso validado. Ningún método de esterilización corrige lo que el lavado no removió.',
    metodo: 'Desinfección térmica con proceso validado',
    uso: 'Instrumental de lúmenes, endoscopios y accesorios',
    specsClave: [
      { label: 'Método', valor: 'Lavado y desinfección térmica' },
      { label: 'Norma del proceso', valor: 'ISO 15883' },
      // TODO capacidad: bandejas o DIN por cámara según catálogo Tuttnauer
    ],
    compatible: ['Instrumental de lúmenes', 'Endoscopios flexibles', 'Accesorios de endoscopia', 'Instrumental quirúrgico general'],
    noCompatible: ['Material termosensible fuera de la especificación del ciclo', 'Instrumental con electrónica no sumergible'],
    normasProceso: N_TERMO,
    instalacion: [
      { label: 'Eléctrico', valor: 'Acometida dedicada según la placa del modelo.' },
      { label: 'Agua', valor: 'Agua tratada para el enjuague final. El manchado del instrumental casi siempre entra por ahí.' },
      { label: 'Drenaje', valor: 'Desagüe con capacidad para la descarga de cada fase del ciclo.' },
      { label: 'Espacio', valor: 'Zona sucia del área de lavado, con paso hacia la zona limpia sin cruce de flujos.' },
    ],
    preguntasCotizacion: [
      'Número de procedimientos por día y tipo de instrumental',
      'Cantidad de equipos que hay que procesar por turno',
      'Calidad del agua de alimentación disponible',
      'Espacio en el área de lavado y flujo hacia la zona limpia',
    ],
    relacionadas: [
      { linea: 'mobiliario-acero-inoxidable', porque: 'Sin puesto de prelavado y escurrido, el material entra con residuo y el ciclo no lo corrige.' },
      { linea: 'papel-y-tyvek', porque: 'Lo que sale limpio se empaca de inmediato. Si no hay barrera lista, el material espera descubierto.' },
      { linea: 'repuestos', porque: 'Bombas, válvulas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
    ],
    servicio: [
      'Calificación de instalación y de operación del proceso de lavado',
      'Mantenimiento preventivo con protocolo definido por equipo',
      'Entrenamiento al personal de la zona de lavado',
    ],
    faq: [
      { p: '¿Reemplaza el lavado manual?', r: 'Lo automatiza y lo hace validable. El prelavado y el escurrido siguen siendo parte del flujo, en el puesto anterior al equipo.' },
      { p: '¿Por qué importa tanto el agua del enjuague final?', r: 'Porque es la última que toca el instrumental. Fuera de especificación deja depósitos y manchas sobre material ya limpio.' },
    ],
    orden: 3,
    seo: {
      titulo: 'Termodesinfectoras Tuttnauer en Colombia | Servimedical',
      descripcion:
        'Termodesinfectoras Tuttnauer para lavado y desinfección térmica validada de instrumental de lúmenes y endoscopios. Instalación, calificación y servicio técnico propio.',
    },
  },

  /* ═════════════════════════════════════════════════════════ SANQIANG ════ */
  {
    slug: 'vapor',
    marca: 'sanqiang',
    nombre: 'Vapor',
    tipo: 'equipo',
    categoria: 'vapor',
    lead:
      'Esterilización por vapor saturado para material termorresistente y empacado, con una estructura de costo distinta a la de la marca premium.',
    metodo: 'Vapor saturado con prevacío',
    uso: 'Instrumental termorresistente, textiles y contenedores',
    specsClave: [
      { label: 'Método', valor: 'Vapor saturado · prevacío' },
      { label: 'Temperatura de ciclo', valor: '121 °C y 134 °C' },
      { label: 'Norma del proceso', valor: 'ISO 17665' },
      // TODO capacidad: rango de volumen de cámara según catálogo Sanqiang
    ],
    compatible: [
      'Instrumental quirúrgico de acero inoxidable',
      'Textiles y ropa quirúrgica',
      'Material poroso empacado',
      'Sets conformados en contenedor rígido',
    ],
    noCompatible: [
      'Óptica y endoscopios flexibles',
      'Motores e instrumental con electrónica',
      'Polímeros termosensibles',
    ],
    alternativa: {
      titulo: 'Plasma Sanqiang',
      linea: 'plasma',
      nota: 'Lo termosensible va por baja temperatura. En vapor se daña y no se esteriliza.',
    },
    normasProceso: N_VAPOR,
    instalacion: [
      { label: 'Eléctrico', valor: 'Acometida dedicada según la placa del modelo.' },
      { label: 'Agua', valor: 'Agua tratada. La especificación la fija el fabricante en la ficha del modelo.' },
      { label: 'Vapor', valor: 'Red de planta o generador propio, según configuración.' },
      { label: 'Drenaje', valor: 'Desagüe con capacidad para la descarga de condensado del ciclo.' },
      { label: 'Espacio', valor: 'Área de servicio al respaldo y, si hay barrera sanitaria, doble puerta.' },
    ],
    preguntasCotizacion: [
      'Cargas por turno y turnos que opera la central',
      'Material que procesa y tamaño promedio del set',
      'Espacio disponible y necesidad de doble puerta',
      'Acometidas de vapor, agua, desagüe y eléctrica disponibles',
    ],
    relacionadas: [
      { linea: 'papel-y-tyvek', porque: 'El vapor solo esteriliza lo que atraviesa. El empaque sostiene la barrera hasta sala.' },
      { linea: 'indicadores-biologicos', porque: 'Es la única evidencia de letalidad del ciclo.' },
      { linea: 'repuestos', porque: 'Empaquetadura y válvulas son partes de desgaste y definen el tiempo de parada.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo y correctivo',
      'Repuesto original por importación directa',
    ],
    orden: 1,
    seo: {
      titulo: 'Vapor Sanqiang en Colombia | Servimedical',
      descripcion:
        'Autoclaves Sanqiang de vapor saturado para instrumental termorresistente, textiles y contenedores, con instalación y servicio técnico propio desde Bogotá.',
    },
  },

  {
    slug: 'plasma',
    marca: 'sanqiang',
    nombre: 'Plasma',
    tipo: 'equipo',
    categoria: 'plasma',
    lead:
      'Baja temperatura por peróxido de hidrógeno para óptica, motores y polímeros, en centrales que necesitan el método sin el presupuesto de la línea alta.',
    metodo: 'Peróxido de hidrógeno vaporizado a baja temperatura',
    uso: 'Óptica, motores, cables y material termosensible',
    specsClave: [
      { label: 'Método', valor: 'Peróxido de hidrógeno vaporizado' },
      { label: 'Temperatura de ciclo', valor: 'Baja temperatura' },
      { label: 'Norma del proceso', valor: 'ISO 22441' },
      // TODO capacidad y duración de ciclo según catálogo Sanqiang
    ],
    compatible: ['Óptica rígida y flexible', 'Cables y fibra', 'Motores e instrumental con electrónica', 'Polímeros y material termosensible'],
    noCompatible: ['Celulosa, textiles y papel', 'Líquidos y polvos', 'Lúmenes fuera de la especificación del equipo'],
    alternativa: {
      titulo: 'Vapor Sanqiang',
      linea: 'vapor',
      nota: 'La celulosa absorbe el peróxido y aborta el ciclo. Lo termorresistente y poroso va por vapor.',
    },
    normasProceso: N_PLASMA,
    instalacion: [
      { label: 'Eléctrico', valor: 'Acometida dedicada según la placa del modelo.' },
      { label: 'Ventilación', valor: 'Recinto ventilado, por el agente químico del proceso.' },
      { label: 'Espacio', valor: 'Área de servicio al respaldo y espacio para el almacenamiento de cartuchos.' },
    ],
    preguntasCotizacion: [
      'Volumen de material termosensible por turno',
      'Tipo de lúmenes y longitudes que hay que procesar',
      'Urgencia de rotación entre cirugías',
      'Disponibilidad de empaque compatible con el método',
    ],
    relacionadas: [
      { linea: 'papel-y-tyvek', porque: 'La celulosa aborta el ciclo. Esta línea necesita barrera en Tyvek.' },
      { linea: 'indicadores-quimicos', porque: 'Los indicadores de vapor no viran con peróxido. No sirven como control aquí.' },
      { linea: 'repuestos', porque: 'Electrónica sensible: el canal de fábrica evita paradas largas por una parte menor.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo con rutina propia del equipo de plasma',
      'Entrenamiento en carga y empaque compatible',
    ],
    orden: 2,
    seo: {
      titulo: 'Plasma Sanqiang en Colombia | Servimedical',
      descripcion:
        'Esterilización Sanqiang por peróxido de hidrógeno vaporizado para óptica, motores y material termosensible, con instalación y servicio técnico propio en Colombia.',
    },
  },

  {
    slug: 'termodesinfectoras',
    marca: 'sanqiang',
    nombre: 'Termodesinfectoras',
    tipo: 'equipo',
    categoria: 'termodesinfectoras',
    lead:
      'Lavado y desinfección térmica bajo proceso validado. Ningún método de esterilización corrige lo que el lavado no removió.',
    metodo: 'Desinfección térmica con proceso validado',
    uso: 'Instrumental de lúmenes, endoscopios y accesorios',
    specsClave: [
      { label: 'Método', valor: 'Lavado y desinfección térmica' },
      { label: 'Norma del proceso', valor: 'ISO 15883' },
      // TODO capacidad: bandejas o DIN por cámara según catálogo Sanqiang
    ],
    compatible: ['Endoscopios flexibles', 'Instrumental de lúmenes', 'Accesorios de endoscopia', 'Instrumental quirúrgico general'],
    noCompatible: ['Material termosensible fuera de la especificación del ciclo', 'Instrumental con electrónica no sumergible'],
    normasProceso: N_TERMO,
    instalacion: [
      { label: 'Eléctrico', valor: 'Acometida dedicada según la placa del modelo.' },
      { label: 'Agua', valor: 'Agua tratada para el enjuague final.' },
      { label: 'Drenaje', valor: 'Desagüe con capacidad para la descarga de cada fase del ciclo.' },
      { label: 'Espacio', valor: 'Zona sucia del área de lavado, con paso hacia la zona limpia sin cruce de flujos.' },
    ],
    preguntasCotizacion: [
      'Número de procedimientos endoscópicos por día',
      'Tipo y cantidad de equipos que hay que procesar',
      'Calidad del agua de alimentación disponible',
      'Espacio en el área de lavado y flujo hacia la zona limpia',
    ],
    relacionadas: [
      { linea: 'mobiliario-acero-inoxidable', porque: 'Sin puesto de prelavado y escurrido, el material entra con residuo y el ciclo no lo corrige.' },
      { linea: 'papel-y-tyvek', porque: 'Lo que sale limpio se empaca de inmediato, o espera descubierto.' },
      { linea: 'repuestos', porque: 'Bombas, válvulas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
    ],
    servicio: [
      'Instalación con conexión hidráulica y de desagüe, y puesta en marcha',
      'Mantenimiento preventivo con protocolo definido por equipo',
      'Entrenamiento al personal de la zona de lavado',
    ],
    orden: 3,
    seo: {
      titulo: 'Termodesinfectoras Sanqiang en Colombia | Servimedical',
      descripcion:
        'Termodesinfectoras Sanqiang para lavado y desinfección térmica validada de endoscopios e instrumental de lúmenes, con instalación y servicio técnico en Colombia.',
    },
  },

  {
    slug: 'residuos-hospitalarios',
    marca: 'sanqiang',
    nombre: 'Tratamiento de residuos hospitalarios',
    tipo: 'equipo',
    categoria: 'residuos-hospitalarios',
    lead:
      'Trata el residuo biosanitario en la institución, por vapor, antes de que salga por la puerta. Reduce el volumen que se entrega al gestor externo y el riesgo del tramo que no se controla.',
    metodo: 'Tratamiento por vapor con trituración',
    uso: 'Residuo biosanitario generado en la institución',
    specsClave: [
      { label: 'Método', valor: 'Vapor con trituración' },
      { label: 'Tratamiento', valor: 'En sitio, dentro de la institución' },
      // TODO capacidad por ciclo y reducción logarítmica declarada en la ficha Sanqiang
    ],
    compatible: ['Residuo biosanitario de salas y central', 'Cortopunzantes en contenedor rígido', 'Cultivos y material de laboratorio'],
    noCompatible: ['Residuo químico y farmacéutico', 'Residuo radiactivo', 'Residuo anatomopatológico, según la normativa aplicable'],
    normasProceso: [
      { norma: 'Reducción logarítmica validada', que: 'La eficacia del tratamiento se demuestra con el nivel de inactivación que declara el fabricante en su ficha.' },
    ],
    instalacion: [
      { label: 'Eléctrico', valor: 'Acometida dedicada según la placa del modelo.' },
      { label: 'Agua', valor: 'Alimentación para la generación de vapor del ciclo.' },
      { label: 'Drenaje', valor: 'Desagüe conectado al manejo de efluentes de la institución.' },
      { label: 'Ventilación', valor: 'Extracción en el recinto de tratamiento.' },
      { label: 'Espacio', valor: 'Recinto de residuos con acceso para el ingreso del contenedor y la salida del material tratado.' },
    ],
    preguntasCotizacion: [
      'Kilos de residuo biosanitario por día y por turno',
      'Si el tratamiento se hace en la central o en un recinto aparte',
      'Costo actual de la gestión externa, para comparar',
      'Acometidas disponibles en el recinto de residuos',
    ],
    relacionadas: [
      { linea: 'mobiliario-acero-inoxidable', porque: 'El residuo se mueve en carro cerrado y diferenciado, nunca en el mismo que el material estéril.' },
      { linea: 'indicadores-biologicos', porque: 'La inactivación se verifica con control biológico, igual que una carga de esterilización.' },
      { linea: 'repuestos', porque: 'El sistema de trituración es la parte de mayor desgaste del equipo.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo del sistema de trituración y del circuito de vapor',
      'Entrenamiento al personal que opera el recinto de residuos',
    ],
    faq: [
      { p: '¿Elimina la necesidad del gestor externo?', r: 'No la elimina: reduce el volumen y el riesgo del material que sale. Lo que exige la normativa ambiental sobre disposición final lo define la autoridad competente, no el equipo.' },
      { p: '¿Trata cortopunzantes?', r: 'Sí, dentro de su contenedor rígido. Lo que no trata es el residuo químico, el farmacéutico y el radiactivo.' },
    ],
    orden: 4,
    seo: {
      titulo: 'Residuos hospitalarios Sanqiang en Colombia | Servimedical',
      descripcion:
        'Tratamiento de residuo biosanitario por vapor con trituración, en sitio. Equipos Sanqiang con instalación, mantenimiento y entrenamiento desde Bogotá.',
    },
  },

  /* ═════════════════════════════════════════════════════ SERVIMEDICAL ════ */
  {
    slug: 'papel-y-tyvek',
    marca: 'servimedical',
    nombre: 'Papel grado esterilización y Tyvek',
    tipo: 'consumible',
    categoria: 'empaque',
    lead:
      'El empaque no envuelve el set: es la barrera estéril. Sostiene la esterilidad hasta que alguien abre el paquete en sala.',
    metodo: 'Barrera estéril por método de esterilización',
    uso: 'Conformación y sellado de paquete en la zona de empaque',
    specsClave: [
      { label: 'Formatos', valor: 'Rollo mixto, bolsa autosellante, papel crepado' },
      { label: 'Tyvek', valor: 'Para plasma de peróxido' },
      { label: 'Abastecimiento', valor: 'Programado contra el consumo real' },
    ],
    dondeSeUsa: [
      'Rollo mixto y bolsas autosellantes para sellado térmico',
      'Papel crepado para doblado de sets',
      'Papel grado esterilización para material poroso',
      'Tyvek para los ciclos de plasma de peróxido, que no admiten celulosa',
      'Cintas indicadoras de proceso sobre la barrera',
    ],
    preguntasCotizacion: [
      'Paquetes por turno y tamaño promedio del set',
      'Método de esterilización de cada línea de material',
      'Si el empaque es de sellado térmico o de doblado',
      'Consumo mensual actual, para programar el abastecimiento',
    ],
    relacionadas: [
      { linea: 'indicadores-quimicos', porque: 'La cinta dice que el paquete pasó por el equipo. Lo de adentro lo dice el indicador interno.' },
      { linea: 'mobiliario-acero-inoxidable', porque: 'La superficie y la altura deciden cuántos paquetes salen por turno y en qué estado.' },
      { linea: 'vapor', porque: 'El método de esterilización decide la barrera, no al revés. Celulosa en vapor, Tyvek en plasma.' },
    ],
    servicio: [
      'Abastecimiento programado contra el consumo real de la central',
      'Acompañamiento en la elección de barrera por método de esterilización',
      'Entrenamiento en conformación y sellado de paquete',
    ],
    faq: [
      { p: '¿Por qué no sirve el mismo empaque para vapor y para plasma?', r: 'Porque la celulosa absorbe el peróxido y aborta el ciclo de plasma. Ese método exige Tyvek.' },
      { p: '¿Cuánto dura la barrera estéril?', r: 'El vencimiento lo define el protocolo de la institución según el tipo de empaque y las condiciones de almacenamiento, no el material por sí solo.' },
    ],
    orden: 1,
    seo: {
      titulo: 'Papel grado esterilización y Tyvek | Servimedical',
      descripcion:
        'Rollo mixto, bolsas autosellantes, papel crepado y Tyvek para barrera estéril. Abastecimiento programado contra consumo real, con despacho nacional desde Bogotá.',
    },
  },

  {
    slug: 'mobiliario-acero-inoxidable',
    marca: 'servimedical',
    nombre: 'Mobiliario en acero inoxidable',
    tipo: 'mobiliario',
    categoria: 'mobiliario',
    lead:
      'Mesas, mesones, carros y estantería fabricados contra el plano de la central. Superficie continua y soldadura pulida, sin uniones que retengan residuo.',
    metodo: 'Acero inoxidable AISI 304, fabricado sobre medida',
    uso: 'Lavado, empaque, transporte y almacenamiento estéril',
    specsClave: [
      { label: 'Material', valor: 'Acero inoxidable AISI 304' },
      { label: 'Fabricación', valor: 'Sobre medida, contra el plano de la central' },
      { label: 'Acabado', valor: 'Superficie continua, soldadura pulida' },
    ],
    dondeSeUsa: [
      'Mesones de lavado con poza y escurridero, en la zona sucia',
      'Mesas de inspección y empaque, en la zona limpia',
      'Carros de transporte cerrados y diferenciados por flujo',
      'Carros de carga y descarga de autoclave',
      'Estantería y armarios para almacenamiento estéril',
    ],
    preguntasCotizacion: [
      'Plano del área y zonificación de sucio, limpio y estéril',
      'Número de puestos de empaque simultáneos y altura de trabajo del personal',
      'Paquetes en circulación y tiempo de permanencia en estéril',
      'Distancia entre la central y las salas, y dimensiones de puertas y ascensores',
    ],
    relacionadas: [
      { linea: 'papel-y-tyvek', porque: 'El paquete se conforma en la mesa y se guarda en la estantería. Se dimensionan juntas.' },
      { linea: 'termodesinfectoras', porque: 'Cuando el volumen de lúmenes crece, el lavado manual deja de sostener el proceso y hay que automatizarlo.' },
      { linea: 'repuestos', porque: 'Ruedas, bisagras y rieles son las partes que primero ceden en un mobiliario que se mueve todo el día.' },
    ],
    servicio: [
      'Levantamiento en sitio de las zonas de lavado, empaque y almacenamiento',
      'Propuesta de distribución y de altura de trabajo según el flujo',
      'Fabricación e instalación, con conexión a las acometidas existentes',
    ],
    faq: [
      { p: '¿Se puede usar un mismo carro para sucio y para estéril?', r: 'No. En cuanto un carro hace los dos recorridos, la barrera que separa lo sucio de lo estéril deja de significar algo. Los carros van diferenciados por flujo.' },
      { p: '¿Por qué soldadura pulida y superficie continua?', r: 'Porque una unión, un remache o una junta retienen residuo y no se limpian. En la zona de lavado y de empaque eso es un foco.' },
      { p: '¿Fabrican contra plano?', r: 'Sí. El levantamiento en sitio va antes de la cotización: la altura de trabajo y el largo del puesto deciden cuántos paquetes salen bien conformados al final del turno.' },
    ],
    orden: 2,
    seo: {
      titulo: 'Mobiliario en acero inoxidable en Colombia | Servimedical',
      descripcion:
        'Mesones de lavado, mesas de empaque, carros diferenciados por flujo y estantería estéril en acero AISI 304. Levantamiento en sitio y fabricación contra el plano de la central.',
    },
  },

  {
    slug: 'repuestos',
    marca: 'servimedical',
    nombre: 'Repuestos',
    tipo: 'consumible',
    categoria: 'repuestos',
    lead:
      'Partes originales de las marcas que representamos, con inventario local de lo que más se pide. Un autoclave detenido es un quirófano detenido, así que atendemos también equipos fuera de garantía y de marcas que no vendimos.',
    metodo: 'Repuesto original, con inventario en Bogotá',
    uso: 'Mantenimiento preventivo y correctivo de los equipos de la central',
    specsClave: [
      { label: 'Origen', valor: 'Original de fábrica' },
      { label: 'Inventario', valor: 'En Bogotá, las partes de mayor rotación' },
      { label: 'Cobertura', valor: 'Equipos dentro y fuera de garantía' },
    ],
    dondeSeUsa: [
      'Empaquetaduras y sellos de puerta',
      'Válvulas, trampas de vapor y purgadores',
      'Filtros bacteriológicos de línea',
      'Sensores y transductores de temperatura y presión',
      'Tarjetas de control e impresoras de ciclo',
    ],
    preguntasCotizacion: [
      'Marca, modelo y número de serie del equipo',
      'Qué hace el equipo y en qué momento se detiene',
      'Si el equipo está parado o la falla es intermitente',
      'Si se busca una reposición puntual o un plan programado',
    ],
    relacionadas: [
      { linea: 'vapor', porque: 'La empaquetadura de puerta es la falla más frecuente y la más fácil de prevenir.' },
      { linea: 'plasma', porque: 'La electrónica del ciclo de baja temperatura no admite partes equivalentes.' },
      { linea: 'termodesinfectoras', porque: 'Bombas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
    ],
    servicio: [
      'Identificación de la parte a partir de la placa del equipo',
      'Reposición programada contra la rutina de mantenimiento',
      'Canal directo de fábrica para lo que no está en inventario',
    ],
    faq: [
      { p: '¿Atienden equipos que no compramos a ustedes?', r: 'Sí, dentro y fuera de garantía. Un autoclave detenido es un quirófano detenido.' },
      { p: '¿Trabajan con partes equivalentes?', r: 'No. En un equipo que esteriliza material que entra a un paciente, una parte adaptada cambia el comportamiento del ciclo sin que nadie lo vea.' },
      { p: 'No sé qué parte falló. ¿Qué hago?', r: 'El diagnóstico va antes del pedido. Con la placa del equipo y la descripción de la falla el servicio técnico identifica la parte.' },
    ],
    orden: 3,
    seo: {
      titulo: 'Repuestos originales para equipos de esterilización | Servimedical',
      descripcion:
        'Empaquetaduras de puerta, válvulas, trampas de vapor, sensores y tarjetas de control. Inventario en Bogotá y atención a equipos dentro y fuera de garantía.',
    },
  },

  /* ═══════════════════════════════════════════════════════════════ 2i ════ */
  {
    slug: 'indicadores-quimicos',
    marca: '2i',
    nombre: 'Indicadores químicos',
    tipo: 'consumible',
    categoria: 'indicadores',
    etiquetaMenu: 'Químicos',
    lead:
      'Un indicador externo dice que el paquete pasó por el equipo. Uno interno, que el agente llegó al centro. La central necesita los dos.',
    metodo: 'Viraje por exposición a los parámetros del ciclo',
    uso: 'Control de proceso, de paquete y test de Bowie-Dick',
    specsClave: [
      { label: 'Lectura', valor: 'Inmediata, por viraje' },
      { label: 'Norma del proceso', valor: 'ISO 11140' },
      // TODO clases de indicador y métodos compatibles declarados en la ficha 2i
    ],
    dondeSeUsa: [
      'Control externo de proceso, sobre la barrera',
      'Control interno de paquete, en el centro de la carga',
      'Paquete de prueba, armado con el mismo material que representa',
      'Test de Bowie-Dick diario, en la primera carga del día',
    ],
    normasProceso: [
      { norma: 'ISO 11140', que: 'Indicadores químicos: clases, requisitos y métodos de ensayo.' },
    ],
    preguntasCotizacion: [
      'Cargas por día y por equipo',
      'Protocolo interno de monitoreo de la institución',
      'Método de esterilización de cada línea',
      'Nivel de evidencia que exige el comité de infecciones',
    ],
    relacionadas: [
      { linea: 'indicadores-biologicos', porque: 'El químico es lectura inmediata, pero indicio. El biológico es la prueba.' },
      { linea: 'papel-y-tyvek', porque: 'Uno va dentro del paquete y otro sobre la barrera. El consumo se mueve al mismo ritmo.' },
      { linea: 'vapor', porque: 'El indicador se escoge contra el método del equipo: los de vapor no viran con peróxido.' },
    ],
    servicio: [
      'Definición del esquema de monitoreo junto con la central',
      'Abastecimiento programado por carga y por equipo',
      'Entrenamiento en lectura e interpretación de viraje',
    ],
    faq: [
      { p: '¿Basta con el indicador externo?', r: 'No. El externo solo dice que el paquete estuvo en el equipo. Que el agente llegó al centro de la carga lo dice el interno.' },
      { p: '¿Sirve el mismo indicador para vapor y para plasma?', r: 'No. Cada método tiene su indicador; uno de vapor no vira con peróxido y da una lectura que no significa nada.' },
      { p: '¿El indicador químico permite liberar la carga?', r: 'Es parte de la evidencia, no toda. La liberación se sostiene con el registro del equipo, el químico y el biológico, según el protocolo de la institución.' },
    ],
    orden: 1,
    seo: {
      titulo: 'Indicadores químicos 2i en Colombia | Servimedical',
      descripcion:
        'Indicadores químicos de proceso y de paquete, paquetes de prueba y test de Bowie-Dick para central de esterilización. Abastecimiento programado desde Bogotá.',
    },
  },

  {
    slug: 'indicadores-biologicos',
    marca: '2i',
    nombre: 'Indicadores biológicos',
    tipo: 'consumible',
    categoria: 'indicadores',
    etiquetaMenu: 'Biológicos',
    lead:
      'Es la única evidencia de que el proceso mató la carga microbiana. Todo lo demás es indicio.',
    metodo: 'Inactivación de esporas con incubación y lectura',
    uso: 'Control biológico de carga y verificación de equipo',
    specsClave: [
      { label: 'Evidencia', valor: 'Letalidad del proceso' },
      { label: 'Norma del proceso', valor: 'ISO 11138' },
      // TODO tiempo de incubación y tipo de espora declarados en la ficha 2i
    ],
    dondeSeUsa: [
      'Control biológico de carga, según el protocolo de la institución',
      'Verificación periódica de cada equipo',
      'Liberación de cargas con implantes',
      'Verificación tras un mantenimiento correctivo',
    ],
    normasProceso: [
      { norma: 'ISO 11138', que: 'Indicadores biológicos: requisitos generales y por método de esterilización.' },
    ],
    preguntasCotizacion: [
      'Frecuencia de control biológico que define el protocolo de la institución',
      'Número de equipos y de cargas que hay que cubrir',
      'Disponibilidad de incubadora en la central',
      'Tiempo de lectura que tolera la operación sin frenar el giro quirúrgico',
    ],
    relacionadas: [
      { linea: 'indicadores-quimicos', porque: 'El biológico se lee en horas; el químico, en el momento. La carga se libera con los dos.' },
      { linea: 'vapor', porque: 'Verifica el equipo, no solo la carga. Un resultado no conforme es un dato de mantenimiento.' },
      { linea: 'repuestos', porque: 'Un resultado no conforme repetido suele ser el equipo, no la carga. Ahí entra el repuesto.' },
    ],
    servicio: [
      'Definición de la frecuencia de control junto con la central',
      'Abastecimiento programado, con reserva para cargas con implantes',
      'Entrenamiento en incubación, lectura y conducta ante resultado no conforme',
    ],
    faq: [
      { p: '¿Con qué frecuencia se corre?', r: 'La define el protocolo de la institución. Lo que no admite excepción es la carga con implantes.' },
      { p: '¿Qué se hace ante un resultado no conforme?', r: 'Se retiene la carga, se revisa el equipo y se repite el control. Si se repite, el problema suele ser el equipo y no la carga.' },
      { p: '¿Hace falta incubadora propia?', r: 'Sí, en la central, para no depender de un laboratorio externo y poder liberar dentro del giro quirúrgico.' },
    ],
    orden: 2,
    seo: {
      titulo: 'Indicadores biológicos 2i en Colombia | Servimedical',
      descripcion:
        'Control biológico de carga y verificación de equipo para central de esterilización, con incubación y lectura. Abastecimiento programado desde Bogotá.',
    },
  },
];

/** Las líneas de una marca, en su orden. */
export const lineasDe = (slugMarca: string) =>
  lineas.filter((l) => l.marca === slugMarca).sort((a, b) => a.orden - b.orden);

/** Una línea se identifica por marca + slug: `vapor` existe en dos marcas. */
export const lineaPorSlug = (slugMarca: string, slug: string) =>
  lineas.find((l) => l.marca === slugMarca && l.slug === slug);

export const urlMarca = (slugMarca: string) => `/marcas/${slugMarca}`;

/** Las líneas de una categoría, en el orden de las marcas del portafolio. */
export const lineasDeCategoria = (slugCategoria: string) =>
  lineas
    .filter((l) => l.categoria === slugCategoria)
    .sort((a, b) => ORDEN_MARCA.indexOf(a.marca) - ORDEN_MARCA.indexOf(b.marca) || a.orden - b.orden);

/** Cuántas marcas distintas aportan a una categoría. Decide si /lineas/<cat>
 *  es un comparador o una redirección a la única línea que hay. */
export const marcasDeCategoria = (slugCategoria: string) =>
  [...new Set(lineasDeCategoria(slugCategoria).map((l) => l.marca))];

/** Etiqueta de la línea en el menú de Líneas: el nombre de la marca basta,
 *  salvo cuando una marca aporta más de una línea a la misma categoría. */
export const etiquetaMenu = (l: { marca: string; etiquetaMenu?: string }, nombreMarca: string) =>
  l.etiquetaMenu ? `${l.etiquetaMenu} · ${nombreMarca}` : nombreMarca;
export const urlLinea = (l: { marca: string; slug: string }) => `/marcas/${l.marca}/${l.slug}`;

/** Resuelve una referencia de `relacionadas`. Prefiere la línea de la misma
 *  marca cuando el slug existe en varias —`vapor`, `plasma`—, para no mandar
 *  al visitante a otro fabricante sin motivo. */
export const resolverLinea = (slug: string, marcaPreferida?: string) =>
  (marcaPreferida && lineas.find((l) => l.slug === slug && l.marca === marcaPreferida)) ||
  lineas.find((l) => l.slug === slug);
