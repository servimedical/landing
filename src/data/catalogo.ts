/* ============================================================
   Líneas de negocio. Fuente única: alimenta menús, home,
   páginas de detalle, pie de página y sitemap.
   ============================================================ */

export type Familia = {
  nombre: string;
  desc: string;
  marcas?: string[];
  specs?: [string, string][];
};

export type Categoria = {
  slug: string;
  idx: string;
  nombre: string;
  corto: string;
  resumen: string;
  intro: string;
  destacada?: boolean;
  marcas: string[];
  familias: Familia[];
  /** Estaciones del ciclo (1–6) donde interviene esta categoría. */
  estaciones: number[];
};

/* ---------------- LÍNEA 1 · PRODUCTOS ---------------- */

export const productos: Categoria[] = [
  {
    slug: 'equipos-de-esterilizacion',
    idx: '1.1',
    nombre: 'Equipos de esterilización',
    corto: 'Equipos',
    resumen:
      'Autoclaves de vapor de mesa y de gran capacidad, esterilizadores de plasma de peróxido de hidrógeno y termodesinfectoras.',
    intro:
      'La elección del equipo condiciona todo lo demás: el consumible que se compra cada mes, el espacio que ocupa la central y el tipo de material que la institución podrá procesar. Antes de cotizar revisamos qué se esteriliza, cuánto y con qué frecuencia.',
    marcas: ['Tuttnauer', 'Sanqiang'],
    estaciones: [1, 3, 4],
    familias: [
      {
        nombre: 'Autoclaves de vapor de mesa',
        desc: 'Para consultorio odontológico, laboratorio y unidades de bajo volumen. Clase B con prevacío fraccionado para instrumental empacado, hueco y poroso.',
        marcas: ['Tuttnauer', 'Sanqiang'],
        specs: [
          ['Capacidad', '3 – 85 L'],
          ['Método', 'Vapor saturado 121 °C / 134 °C'],
          ['Ciclo', 'Clase B, prevacío fraccionado'],
          ['Registro', 'Impresión y puerto de datos'],
        ],
      },
      {
        nombre: 'Autoclaves de gran capacidad',
        desc: 'Cámara rectangular para central de esterilización hospitalaria. Configuración de una o dos puertas para separar zona limpia de zona estéril sin romper la barrera.',
        marcas: ['Tuttnauer', 'Sanqiang'],
        specs: [
          ['Capacidad', '150 – 1000 L'],
          ['Puertas', 'Simple o doble puerta (barrera)'],
          ['Vacío', 'Bomba de anillo líquido o eyector'],
          ['Control', 'Registro de parámetros por ciclo'],
        ],
      },
      {
        nombre: 'Esterilización por plasma de H₂O₂',
        desc: 'Baja temperatura para material termosensible: óptica, cables, motores, polímeros. Ciclos cortos que devuelven el instrumental al giro quirúrgico el mismo día.',
        marcas: ['Tuttnauer'],
        specs: [
          ['Agente', 'Peróxido de hidrógeno vaporizado'],
          ['Temperatura', 'Proceso a baja temperatura'],
          ['Uso', 'Óptica, motores, cables, polímeros'],
          ['Insumo', 'Cartucho de agente + indicadores'],
        ],
      },
      {
        nombre: 'Termodesinfectoras y lavado',
        desc: 'Lavado y desinfección térmica validada antes de que alguien vuelva a manipular el instrumental. Incluye equipos dedicados a endoscopios flexibles.',
        marcas: ['Tuttnauer', 'Sanqiang'],
        specs: [
          ['Proceso', 'Lavado, desinfección térmica y secado'],
          ['Trazable', 'Registro de ciclo por lote'],
          ['Aplicación', 'Instrumental, contenedores, endoscopios'],
        ],
      },
    ],
  },

  {
    slug: 'trazabilidad',
    idx: '1.2',
    nombre: 'Trazabilidad',
    corto: 'Trazabilidad',
    destacada: true,
    resumen:
      'Etiquetas, impresora en el punto de empaque y software para seguir cada paquete desde el sellado hasta el paciente.',
    intro:
      'Cuando un ciclo sale no conforme, el comité de infecciones hace una sola pregunta: qué paquetes salieron de ahí y a qué pacientes llegaron. Con trazabilidad esa respuesta toma un minuto. Sin ella, se recoge todo el inventario y se repite el trabajo de una semana.',
    marcas: [],
    estaciones: [2, 3, 4, 5, 6],
    familias: [
      {
        nombre: 'Etiquetas y rótulos',
        desc: 'Adhesivos que resisten el ciclo sin perder legibilidad, con doble código —lineal y bidimensional— para lectura manual y automática.',
        specs: [
          ['Resistencia', 'Vapor 134 °C y plasma H₂O₂'],
          ['Códigos', 'Código de barras + Data Matrix'],
          ['Datos', 'Lote, ciclo, equipo, operario, vencimiento'],
        ],
      },
      {
        nombre: 'Impresora de central',
        desc: 'Impresión en el punto de empaque: un paquete, una etiqueta, sin transcripción a mano ni rótulos escritos con marcador.',
        specs: [
          ['Ubicación', 'Mesa de inspección y empaque'],
          ['Emisión', 'Al cerrar el empaque, antes del ciclo'],
        ],
      },
      {
        nombre: 'Software de trazabilidad',
        desc: 'Registro por carga y por paquete, liberación con control de indicadores, alerta de vencimientos, indicadores de productividad y reporte de recall.',
        specs: [
          ['Registro', 'Por carga y por paquete individual'],
          ['Liberación', 'Bloquea la carga no conforme'],
          ['Recall', 'Reporte de paquetes y pacientes afectados'],
          ['Gestión', 'Vencimientos, rotación y productividad'],
        ],
      },
      {
        nombre: 'Lectores',
        desc: 'Lectura en cada estación del ciclo. Cada escaneo suma un evento fechado a la historia del paquete.',
        specs: [
          ['Puntos', 'Empaque, carga, liberación, despacho, sala'],
          ['Salida', 'Historia completa y auditable del paquete'],
        ],
      },
    ],
  },

  {
    slug: 'accesorios',
    idx: '1.3',
    nombre: 'Accesorios',
    corto: 'Accesorios',
    resumen:
      'Lo que el equipo necesita alrededor para operar dentro de norma: aire comprimido de grado médico, tratamiento de agua y sellado de empaques.',
    intro:
      'Buena parte de las fallas que atendemos no están en el autoclave: están en el agua que lo alimenta, en el aire que lo acciona o en un sellado que nunca cerró bien. Los accesorios no son opcionales, son la condición para que el ciclo sea válido.',
    marcas: ['Hong Run', 'Easyseal'],
    estaciones: [1, 2, 5],
    familias: [
      {
        nombre: 'Compresores de aire médico',
        desc: 'Aire comprimido limpio y seco para el accionamiento de puertas, válvulas y equipos neumáticos de la central.',
        marcas: ['Hong Run'],
        specs: [
          ['Uso', 'Accionamiento neumático y aire de planta'],
          ['Calidad', 'Filtración y secado en línea'],
        ],
      },
      {
        nombre: 'Tratamiento y filtración de agua',
        desc: 'El agua fuera de especificación mancha el instrumental, incrusta la cámara y acorta la vida del generador de vapor. Se trata antes, no después.',
        specs: [
          ['Etapas', 'Filtración, ablandamiento, ósmosis inversa'],
          ['Efecto', 'Evita incrustación y manchado del material'],
          ['Alcance', 'Alimentación de autoclave y lavadora'],
        ],
      },
      {
        nombre: 'Selladoras de empaque',
        desc: 'Sellado continuo y controlado de rollos y bolsas grado médico. Un sellado deficiente invalida todo lo que viene después del empaque.',
        marcas: ['Easyseal'],
        specs: [
          ['Tipo', 'Rotativa continua y de barra'],
          ['Control', 'Temperatura y velocidad regulables'],
          ['Trazable', 'Impresión de datos sobre el sello'],
        ],
      },
    ],
  },

  {
    slug: 'consumibles',
    idx: '1.4',
    nombre: 'Consumibles',
    corto: 'Consumibles',
    resumen:
      'El gasto recurrente de la central: papel y empaque grado médico, indicadores químicos y biológicos, y agente esterilizante.',
    intro:
      'Es la línea que sostiene la relación. Programamos el abastecimiento contra el consumo real de la central para que ningún ciclo se detenga por falta de insumo y para que la institución no tenga que comprar de urgencia al precio que aparezca.',
    marcas: ['Anhui', '2i Health Care'],
    estaciones: [2, 3, 4, 5],
    familias: [
      {
        nombre: 'Papel y empaque grado médico',
        desc: 'Barrera estéril que deja pasar el agente y no deja pasar el microorganismo. Rollos mixtos, bolsas autosellantes, papel crepado y no tejido SMS.',
        marcas: ['Anhui'],
        specs: [
          ['Formatos', 'Rollo mixto, bolsa, papel crepado, SMS'],
          ['Compatible', 'Vapor y plasma H₂O₂'],
          ['Indicador', 'Viraje de proceso impreso'],
        ],
      },
      {
        nombre: 'Indicadores químicos',
        desc: 'La evidencia de que el paquete pasó por el proceso y de que el agente llegó al interior. Clases 1 a 6, paquetes de prueba y Bowie-Dick.',
        marcas: ['2i Health Care'],
        specs: [
          ['Clases', 'Proceso, multiparamétrico y emulador'],
          ['Prueba diaria', 'Bowie-Dick para remoción de aire'],
          ['Uso', 'Externo por paquete e interno por set'],
        ],
      },
      {
        nombre: 'Indicadores biológicos',
        desc: 'La prueba de letalidad sobre esporas. Lectura rápida en incubadora para liberar la carga sin frenar el giro quirúrgico.',
        marcas: ['2i Health Care'],
        specs: [
          ['Método', 'Esporas + incubación y lectura'],
          ['Aplicación', 'Vapor y plasma H₂O₂'],
          ['Uso', 'Rutina de carga e implantes'],
        ],
      },
      {
        nombre: 'Agente esterilizante H₂O₂',
        desc: 'Cartuchos de peróxido de hidrógeno para los ciclos de baja temperatura, con su propio consumible de control.',
        specs: [
          ['Presentación', 'Cartucho por número de ciclos'],
          ['Trazable', 'Lote y vencimiento por cartucho'],
        ],
      },
    ],
  },

  {
    slug: 'repuestos',
    idx: '1.5',
    nombre: 'Repuestos',
    corto: 'Repuestos',
    resumen:
      'Repuestos originales de las marcas que representamos, con inventario local de las partes de mayor rotación.',
    intro:
      'Un autoclave detenido es un quirófano detenido. Sostenemos inventario en Bogotá de las partes que más se piden —empaque de puerta, válvulas, sensores— y traemos el resto por canal directo de fábrica, con o sin garantía vigente.',
    marcas: ['Tuttnauer', 'Sanqiang', 'Easyseal', 'Hong Run'],
    estaciones: [1, 2, 3],
    familias: [
      {
        nombre: 'Partes de alta rotación',
        desc: 'Empaques de puerta, válvulas solenoide, trampas de vapor, filtros bacteriológicos y sensores de temperatura y presión.',
        specs: [
          ['Origen', 'Repuesto original de fábrica'],
          ['Disponibilidad', 'Inventario en Bogotá'],
        ],
      },
      {
        nombre: 'Componentes mayores',
        desc: 'Bombas de vacío, generadores de vapor, resistencias, tarjetas de control y sistemas de puerta.',
        specs: [
          ['Origen', 'Canal directo de fábrica'],
          ['Alcance', 'Equipos dentro y fuera de garantía'],
        ],
      },
    ],
  },
];

/* ---------------- LÍNEA 2 · SERVICIOS ---------------- */

export type Servicio = {
  slug: string;
  idx: string;
  nombre: string;
  corto: string;
  resumen: string;
  intro: string;
  puntos: string[];
  entrega: [string, string][];
};

export const servicios: Servicio[] = [
  {
    slug: 'servicio-tecnico',
    idx: '2.1',
    nombre: 'Servicio técnico',
    corto: 'Servicio técnico',
    resumen:
      'Técnicos propios entrenados por fábrica, para las marcas que representamos y para equipos de terceros.',
    intro:
      'No vendemos un equipo y desaparecemos. El servicio técnico es la parte del negocio que decide si la institución vuelve: atendemos instalación, mantenimiento y falla, con repuesto original y respuesta pactada por contrato.',
    puntos: [
      'Instalación y puesta en marcha',
      'Mantenimiento preventivo programado',
      'Mantenimiento correctivo y diagnóstico de falla',
      'Calificación de instalación, operación y desempeño (IQ / OQ / PQ)',
      'Contratos con tiempo de respuesta pactado',
      'Repuesto original con inventario local',
      'Atención a equipos de terceros',
      'Capacitación al personal de la central',
    ],
    entrega: [
      ['Cobertura', 'Nacional, con base y taller en Bogotá'],
      ['Marcas', 'Representadas y de terceros'],
      ['Documentación', 'Informe técnico y hoja de vida del equipo'],
      ['Repuestos', 'Originales, con stock de alta rotación'],
    ],
  },
  {
    slug: 'diseno-de-centrales',
    idx: '2.2',
    nombre: 'Asesoría y diseño hospitalario',
    corto: 'Diseño de centrales',
    resumen:
      'Estudio técnico previo a la obra: flujos, zonificación, dimensionamiento y dotación de la central de esterilización.',
    intro:
      'Una central mal diseñada no se arregla con equipos mejores. El error se paga todos los días en recorridos cruzados, cuellos de botella y material que se reprocesa. Trabajamos el estudio antes de que se funda la primera placa.',
    puntos: [
      'Flujo sucio – limpio – estéril y definición de barreras',
      'Zonificación y layout de la central',
      'Dimensionamiento por carga quirúrgica y giro de instrumental',
      'Requerimientos de agua, vapor, aire comprimido y eléctrico',
      'Extracción, presión diferencial y condiciones ambientales',
      'Ficha de dotación y presupuesto de equipamiento',
      'Cronograma de implementación por etapas',
      'Acompañamiento en obra y puesta en marcha',
    ],
    entrega: [
      ['Insumo inicial', 'Planos, número de salas y programa quirúrgico'],
      ['Producto', 'Layout, ficha de dotación y presupuesto'],
      ['Alcance', 'Obra nueva, ampliación y remodelación'],
      ['Continuidad', 'Se enlaza con instalación y puesta en marcha'],
    ],
  },
];

/* ---------------- EL CICLO ---------------- */

export type Estacion = {
  n: string;
  nombre: string;
  etiqueta: string;
  desc: string;
  cubre: [string, string][];
  traza: string;
};

export const ciclo: Estacion[] = [
  {
    n: '01', nombre: 'Recepción y lavado', etiqueta: 'LAVADO',
    desc: 'El instrumental llega contaminado. Se descontamina, se lava y se seca bajo un proceso validado antes de que alguien lo vuelva a tocar.',
    cubre: [
      ['Termodesinfectoras y lavado', 'Equipos'],
      ['Tratamiento y filtración de agua', 'Accesorios'],
      ['Repuestos de bombas y válvulas', 'Repuestos'],
    ],
    traza: 'Aquí se registra la recepción del set y quién lo lavó.',
  },
  {
    n: '02', nombre: 'Inspección y empaque', etiqueta: 'EMPAQUE',
    desc: 'Se revisa pieza por pieza, se arma el set y se empaca. Un sellado deficiente invalida todo lo que viene después.',
    cubre: [
      ['Selladoras Easyseal', 'Accesorios'],
      ['Papel grado médico Anhui', 'Consumibles'],
      ['Etiquetas e impresora de central', 'Trazabilidad'],
    ],
    traza: 'Aquí nace la etiqueta: el paquete adquiere identidad propia.',
  },
  {
    n: '03', nombre: 'Esterilización', etiqueta: 'ESTERILIZAR',
    desc: 'Vapor para el material termorresistente, plasma de peróxido para el que no lo resiste. La elección define el resto de la central.',
    cubre: [
      ['Autoclaves Tuttnauer y Sanqiang', 'Equipos'],
      ['Esterilizadores de plasma H₂O₂', 'Equipos'],
      ['Agente esterilizante H₂O₂', 'Consumibles'],
    ],
    traza: 'La etiqueta se lee al cargar: el paquete queda atado a un ciclo y a un operario.',
  },
  {
    n: '04', nombre: 'Control y liberación', etiqueta: 'LIBERACIÓN',
    desc: 'Un ciclo que no se puede demostrar no sirve como evidencia. Cada carga necesita su registro físico, químico y biológico antes de liberarse.',
    cubre: [
      ['Indicadores químicos 2i Health Care', 'Consumibles'],
      ['Indicadores biológicos', 'Consumibles'],
      ['Registro e impresión de ciclo', 'Equipos'],
    ],
    traza: 'El software guarda los parámetros y no deja liberar una carga no conforme.',
  },
  {
    n: '05', nombre: 'Almacenamiento y despacho', etiqueta: 'ALMACÉN',
    desc: 'El paquete estéril espera. Lo que lo daña aquí es la humedad, el manipuleo y el vencimiento que nadie miró.',
    cubre: [
      ['Empaque y barrera estéril', 'Consumibles'],
      ['Control de vencimientos', 'Trazabilidad'],
      ['Compresores y aire de planta', 'Accesorios'],
    ],
    traza: 'Ubicación, rotación y alerta de vencimiento salen de la misma etiqueta.',
  },
  {
    n: '06', nombre: 'Uso en paciente', etiqueta: 'PACIENTE',
    desc: 'El set se abre en sala. Ese es el momento que hay que poder reconstruir seis meses después si algo sale mal.',
    cubre: [
      ['Vinculación paquete – procedimiento', 'Trazabilidad'],
      ['Reporte de recall', 'Trazabilidad'],
      ['Indicadores de productividad', 'Trazabilidad'],
    ],
    traza: 'Con un escaneo, el paquete queda unido al paciente. El ciclo cierra.',
  },
];
