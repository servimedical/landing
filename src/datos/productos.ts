import { marcas } from './marcas.ts';
import { lineas } from './lineas.ts';
import type { Producto } from './tipos.ts';

/* ============================================================================
   LOS PRODUCTOS

   El equipo concreto, con sus cifras. Lo que es cierto del método vive en la
   línea y no se repite aquí.

   `instalacion` sólo admite cifras. Donde el fabricante no publica el dato, la
   fila no existe: una fila que dijera «según la placa del modelo» ocupa el
   lugar de la que sí informaría.
   ========================================================================== */

const ORDEN_MARCA = [...marcas].sort((a, b) => a.orden - b.orden).map((m) => m.slug);

export const productos: Producto[] = [
  /* ═══════════════════════════════════════════════════════ TUTTNAUER ════ */
  {
    marca: 'tuttnauer',
    slug: 'vapor',
    linea: 'vapor',
    nombre: 'Autoclaves hospitalarios',
    tipo: 'equipo',
    orden: 1,
    lead: 'Autoclaves de prevacío para la central, de 120 a 1.010 L, de una o dos puertas, con cámara en acero inoxidable 316L.',
    franja: [
      { label: 'Cámara', valor: '120 – 1.010 L' },
      { label: 'Temperatura', valor: '121 y 134 °C' },
      { label: 'Norma del equipo', valor: 'EN 285 · ANSI/AAMI ST8' },
      { label: 'Puerta', valor: 'Simple o doble, de barrera' },
    ],
    descripcion: [
      'Las series 44/55 Compact y T-Max y los modelos 6671130 y 69180 cubren desde la central de una clínica hasta la de un hospital de alta complejidad. Todos son de prevacío fraccionado, con cámara de 316L, generador de vapor integrado o conexión a vapor de planta, y puerta de barrera que separa el área limpia de la estéril.',
      'El control es por pantalla táctil, con impresora integrada, USB y Ethernet, memoria de ciclos y niveles de acceso por usuario. El sistema AquaMinimal, opcional, reduce el consumo de agua entre un 50 y un 90 %.',
    ],
    modelos: {
      encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Generador'],
      filas: [
        ['4472', '120 L', '408 × 408 × 730 mm', '18 kW'],
        ['4480', '140 L', '408 × 408 × 845 mm', '18 kW'],
        ['4496', '160 L', '408 × 408 × 970 mm', '18 kW'],
        ['5596', '250 L', '508 × 508 × 970 mm', '27 kW'],
        ['55120', '310 L', '508 × 508 × 1210 mm', '27 kW'],
        ['T-Max 6', '430 L · 6 STU', '660 × 660 × 990 mm', '36 kW'],
        ['T-Max 8', '565 L · 8 STU', '660 × 660 × 1295 mm', '36 kW'],
        ['6671130', '610 L', '660 × 710 × 1295 mm', '36 kW'],
        ['69180', '1.010 L', '610 × 910 × 1815 mm', '—'],
      ],
    },
    ciclos: [
      'Sin envolver · 134 °C / 3 min',
      'Envuelto · 134 °C / 4 min',
      'Doble envuelto · 134 °C / 7 min',
      'Material poroso · 121 °C / 15 min',
      'Priones · 134 °C / 18 min',
      'Bowie-Dick · 134 °C / 3,5 min',
      'Prueba de vacío',
    ],
    instalacion: [
      { label: 'Eléctrico', valor: 'Trifásico 208–415 V · 18 kW (27 kW en el 55120)' },
      { label: 'Agua del generador', valor: 'Dureza < 0,1 mmol/L y conductividad < 50 µS/cm · 25–37 L/h' },
      { label: 'Agua de enfriamiento', valor: '2–5 bar · alrededor de 17 L/min' },
      { label: 'Drenaje', valor: 'Mínimo 2", resistente a 80 °C' },
      { label: 'Aire comprimido', valor: '6–8 bar' },
      { label: 'Vapor de planta', valor: 'Opcional · 97–100 % seco, máximo 2,8 bar' },
    ],
    normasDeclaradas: ['EN 285', 'ANSI/AAMI ST8', 'ISO 13485:2016', 'ISO 9001:2015', 'PED 2014/68/UE'],
    diferenciales: ['120 – 1.010 L', 'EN 285 y AAMI ST8', 'Ciclo envuelto de 4 min a 134 °C'],
    preguntasCotizacion: [
      'Cirugías por día y por especialidad',
      'Cargas por turno y turnos que opera la central',
      'Espacio disponible y necesidad de doble puerta con barrera sanitaria',
      'Acometidas de vapor, agua, desagüe y eléctrica disponibles',
    ],
    relacionadas: [
      { producto: 'servimedical/papel-y-tyvek', porque: 'El vapor solo esteriliza lo que atraviesa. El empaque sostiene la barrera hasta sala.' },
      { producto: '2i/indicadores-biologicos', porque: 'La única evidencia de letalidad del ciclo. Sin ella no hay liberación que sostenga una auditoría.' },
      { producto: 'servimedical/repuestos', porque: 'Empaquetadura y válvulas son partes de desgaste. En inventario, una parada de días es de horas.' },
    ],
    servicio: [
      'Calificación de instalación y de operación, con prueba de vacío y Bowie-Dick de aceptación',
      'Mantenimiento preventivo con rutina definida por equipo',
      'Repuesto original con existencias en Bogotá',
    ],
    // El brochure oficial está en tuttnauer.com · ficha 44/55 Compact v2.5
    fuenteBrochure: 'https://tuttnauer.com/sites/default/files/technical_specifications/Tuttnauer%20-%20Intl%20-%2044%20and%2055%20-%20Medical%20-%20Bacsoft%20-%20Ver%202.5.pdf',
    seo: {
      titulo: 'Autoclaves Tuttnauer en Colombia | Servimedical',
      descripcion: 'Autoclaves hospitalarios Tuttnauer de prevacío, de 120 a 1.010 L, bajo EN 285 y AAMI ST8. Instalación, calificación y repuesto original desde Bogotá.',
    },
  },

  {
    marca: 'tuttnauer',
    slug: 'plasma',
    linea: 'plasma',
    nombre: 'PlazMax',
    tipo: 'equipo',
    orden: 2,
    lead: 'Esterilización a baja temperatura con peróxido de hidrógeno vaporizado, por debajo de 55 °C y en ciclos de 32 a 48 minutos. Sin consumo de agua.',
    franja: [
      { label: 'Cámara', valor: '47 · 109 · 162 L' },
      { label: 'Ciclo', valor: '32 – 48 min' },
      { label: 'Temperatura', valor: 'Menos de 55 °C' },
      { label: 'Norma del equipo', valor: 'ISO 14937' },
    ],
    descripcion: [
      'PlazMax esteriliza óptica, cables, motores e instrumental termosensible con peróxido de hidrógeno vaporizado. Cada modelo trae tres programas: estándar, avanzado para instrumental hueco, y endoscopio.',
      'El proceso no consume agua y sus subproductos son agua y oxígeno. La compatibilidad con endoscopios flexibles está verificada por un laboratorio independiente alemán, y cada ciclo se imprime y se exporta por USB y Ethernet.',
    ],
    modelos: {
      encabezados: ['Modelo', 'Cámara', 'Estándar', 'Avanzado', 'Endoscopio', 'Potencia'],
      filas: [
        ['P50', '47 L', '35 min', '40 min', '32 min', '3.100 W'],
        ['P110', '109 L', '39 min', '44 min', '37 min', '4.300 W'],
        ['P160', '162 L', '43 min', '48 min', '41 min', '4.300 W'],
      ],
    },
    ciclos: ['Prueba de penetración', 'Prueba de fuga'],
    instalacion: [
      { label: 'Agua', valor: 'No requiere' },
      { label: 'Fondo', valor: '736 mm en P50 y P110 · 1.036 mm en P160, versión de dos puertas' },
      // TODO · alimentación: la página indica trifásico y el brochure monofásico, ambos a 230 V.
      // TODO · lúmenes: el brochure en inglés dice 1 mm de diámetro interno, hasta 4 m con
      //   ambos extremos abiertos y 1,4 m con un extremo ciego. La extracción del PDF en
      //   español da 4 mm. Hay que leer el PDF original antes de publicarlo.
    ],
    normasDeclaradas: ['ISO 14937', 'ISO 13485', 'ISO 9001', 'EN 61010-2-040', 'EN 60601-1', 'CE 0344'],
    diferenciales: ['47 – 162 L', 'Desde 32 min', 'Sin consumo de agua'],
    preguntasCotizacion: [
      'Volumen de material termosensible por turno',
      'Tipo de lúmenes y longitudes que hay que procesar',
      'Urgencia de rotación entre cirugías',
      'Disponibilidad de empaque en Tyvek o SMS',
    ],
    relacionadas: [
      { producto: 'servimedical/papel-y-tyvek', porque: 'La celulosa aborta el ciclo. Esta línea necesita barrera en Tyvek.' },
      { producto: '2i/indicadores-quimicos', porque: 'Los indicadores de vapor no viran con peróxido. No sirven como control aquí.' },
      { producto: 'servimedical/repuestos', porque: 'Electrónica sensible: el canal de fábrica evita paradas largas por una parte menor.' },
    ],
    servicio: [
      'Calificación de instalación y de operación del ciclo de baja temperatura',
      'Mantenimiento preventivo con rutina propia del equipo de plasma',
      'Entrenamiento en carga, empaque compatible y control del proceso',
    ],
    fuenteBrochure: 'https://tuttnauer.com/sites/default/files/brochures/plazmax-low-temperature-plasma-sterilizer--tuttnauer--es--29-11-2020.pdf',
    seo: {
      titulo: 'PlazMax Tuttnauer en Colombia | Servimedical',
      descripcion: 'PlazMax de Tuttnauer: plasma de peróxido de hidrógeno de 47 a 162 L, ciclos de 32 a 48 minutos y sin consumo de agua.',
    },
  },

  {
    marca: 'tuttnauer',
    slug: 'termodesinfectoras',
    linea: 'termodesinfectoras',
    nombre: 'TIVA',
    tipo: 'equipo',
    orden: 3,
    lead: 'Termodesinfectoras de 65 a 430 L, de 8 a 18 cestas DIN, con secado por aire filtrado HEPA H14 y cuarenta programas.',
    franja: [
      { label: 'Cámara', valor: '65 – 430 L' },
      { label: 'Capacidad', valor: 'Hasta 18 cestas DIN' },
      { label: 'Desinfección', valor: 'Más de 90 °C' },
      { label: 'Secado', valor: 'Aire filtrado HEPA H14' },
    ],
    descripcion: [
      'La familia TIVA va desde un equipo bajo mesón para quirófano hasta una lavadora de central con puerta de barrera automática. Todas tienen cámara de 316L, dos bombas dosificadoras con caudalímetro para detergente alcalino y neutralizador ácido, y monitoreo de rotación de los brazos de aspersión.',
      'El equipo reconoce el carro cargado y mide la conductividad en el enjuague final, que es donde entra el manchado del instrumental. El secado es por aire caliente con prefiltro y filtro HEPA H14.',
    ],
    modelos: {
      encabezados: ['Modelo', 'Cámara', 'Cestas DIN', 'Puerta', 'Medidas'],
      filas: [
        ['Tiva 2', '65 L', '—', 'Manual', '—'],
        ['Tiva 8', '165 L', '8, en 4 niveles', 'Manual, doble vidrio', '600/900 × 650 × 860 mm'],
        ['Tiva 10-M', '265 L', '12, en 6 niveles', 'Manual abatible', '650 × 700 × 1850 mm'],
        ['Tiva 10-V', '265 L', '12, en 6 niveles', 'Automática corrediza', '680 × 700 × 1950 mm'],
        ['Tiva 15-V', '430 L', '18, en 6 niveles', 'Automática corrediza', '1000 × 900 × 1900 mm'],
      ],
    },
    instalacion: [
      { label: 'Agua', valor: 'Fría ablandada y desmineralizada · caliente opcional' },
      { label: 'Drenaje', valor: 'DN40' },
      { label: 'Eléctrico', valor: '6,3 – 8,8 kW en Tiva 8, según versión' },
      { label: 'Calentamiento', valor: 'Eléctrico, por vapor o híbrido, según configuración' },
    ],
    // TODO · el fabricante no publica cumplimiento de ISO 15883 ni el valor A0.
    // Hay que pedirlos antes de declararlos: la norma del método está en la línea.
    diferenciales: ['65 – 430 L', '40 programas', 'Secado HEPA H14'],
    preguntasCotizacion: [
      'Número de procedimientos por día y tipo de instrumental',
      'Cantidad de carros que hay que procesar por turno',
      'Calidad del agua de alimentación disponible',
      'Espacio en el área de lavado y paso hacia la zona limpia',
    ],
    relacionadas: [
      { producto: 'servimedical/mobiliario-acero-inoxidable', porque: 'Sin puesto de prelavado y escurrido, el material entra con residuo y el ciclo no lo corrige.' },
      { producto: 'servimedical/papel-y-tyvek', porque: 'Lo que sale limpio se empaca de inmediato, o espera descubierto.' },
      { producto: 'servimedical/repuestos', porque: 'Bombas, válvulas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
    ],
    servicio: [
      'Calificación de instalación y de operación del proceso de lavado',
      'Mantenimiento preventivo con protocolo definido por equipo',
      'Entrenamiento al personal de la zona de lavado',
    ],
    fuenteBrochure: 'https://www.tuttnauer.com/sites/default/files/2023-11/TIVA-disinfector-washers--Tuttnauer-EN-2022.pdf',
    seo: {
      titulo: 'Termodesinfectoras TIVA de Tuttnauer | Servimedical',
      descripcion: 'TIVA de Tuttnauer: termodesinfectoras de 65 a 430 L, hasta 18 cestas DIN, con secado por aire filtrado HEPA H14 y cuarenta programas.',
    },
  },

  /* ════════════════════════════════════════════════════════ SANQIANG ════ */
  {
    marca: 'sanqiang',
    slug: 'vapor',
    linea: 'vapor',
    nombre: 'Serie MD.JD',
    tipo: 'equipo',
    orden: 1,
    lead: 'Autoclaves de vacío pulsante de 250 a 1.500 L para centrales de alto volumen, con uniformidad de ±0,5 °C en cámara.',
    franja: [
      { label: 'Cámara', valor: '250 – 1.500 L' },
      { label: 'Temperatura', valor: '121 y 134 °C · máximo 139 °C' },
      { label: 'Uniformidad', valor: '± 0,5 °C' },
      { label: 'Vacío final', valor: '−96 kPa' },
    ],
    descripcion: [
      'Las series MD.JD y PVS.JD extraen el aire con pulsos de vacío programables —de 1 a 99 pulsos, hasta −96 kPa— antes de la exposición, y sostienen una uniformidad de ±0,5 °C en la cámara. El secado es al vacío.',
      'El control es por pantalla táctil con impresora térmica y USB. Las cámaras de 1.200 y 1.500 L están pensadas para centrales que procesan carros completos por ciclo, que es donde la capacidad decide cuántos turnos hacen falta.',
    ],
    modelos: {
      encabezados: ['Modelo', 'Cámara'],
      filas: [
        ['MD.JD-250S', '255 L'],
        ['MD.JD-360S', '360 L'],
        ['MD.JD-450S', '450 L'],
        ['MD.JD-600S', '600 L'],
        ['MD.JD-800S', '800 L'],
        ['MD.JD-1000S', '1.000 L'],
        ['MD.JD-1200S', '1.200 L'],
        ['MD.JD-1500S', '1.500 L'],
      ],
    },
    instalacion: [
      { label: 'Presión de trabajo', valor: 'Máximo 0,28 MPa' },
      { label: 'Temperatura máxima', valor: '139 °C' },
      { label: 'Fuga de vacío', valor: '≤ 0,13 kPa/min' },
      { label: 'Eléctrico', valor: '380 V · 50 Hz' },
    ],
    // No declara EN 285. No se publica esa norma para Sanqiang.
    normasDeclaradas: ['CE', 'ISO 13485', 'ASME'],
    diferenciales: ['Hasta 1.500 L', 'Uniformidad ± 0,5 °C', '1 a 99 pulsos de vacío'],
    // TODO · tiempos de ciclo (no se publican), si los sufijos S/D son una o dos
    // puertas, y la tensión: una fuente dice 220 V y otra 380 V.
    preguntasCotizacion: [
      'Cargas por turno y turnos que opera la central',
      'Material que procesa y tamaño promedio del set',
      'Espacio disponible y necesidad de doble puerta',
      'Acometidas de vapor, agua, desagüe y eléctrica disponibles',
    ],
    relacionadas: [
      { producto: 'servimedical/papel-y-tyvek', porque: 'El vapor solo esteriliza lo que atraviesa. El empaque sostiene la barrera hasta sala.' },
      { producto: '2i/indicadores-biologicos', porque: 'La evidencia de letalidad del ciclo, sin la cual no hay liberación.' },
      { producto: 'servimedical/repuestos', porque: 'Empaquetadura y válvulas definen el tiempo de parada cuando fallan.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo y correctivo',
      'Repuesto original por importación directa',
    ],
    seo: {
      titulo: 'Autoclaves Sanqiang en Colombia | Servimedical',
      descripcion: 'Autoclaves Sanqiang de vacío pulsante, de 250 a 1.500 L, con uniformidad de ±0,5 °C y hasta 99 pulsos de vacío.',
    },
  },

  {
    marca: 'sanqiang',
    slug: 'plasma',
    linea: 'plasma',
    nombre: 'SQ-WD',
    tipo: 'equipo',
    orden: 2,
    lead: 'Plasma de peróxido de hidrógeno de 100 a 190 L, con ciclo corto de 30 minutos y agente en cápsula.',
    franja: [
      { label: 'Cámara', valor: '100 · 135 · 190 L' },
      { label: 'Ciclo', valor: '30 / 50 / 60 min' },
      { label: 'Temperatura', valor: '45 – 55 °C' },
      { label: 'Norma del equipo', valor: 'EN ISO 14937' },
    ],
    descripcion: [
      'La serie SQ-WD tiene cámara rectangular en aluminio 5052, control por PLC Siemens con pantalla táctil de 7 pulgadas e impresora. Ofrece tres ciclos: corto de 30 minutos para carga general, largo de 50 y de lúmenes de 60.',
      'El peróxido viene en cápsula, lo que elimina la manipulación directa del agente por parte del operario. Opera a 220 V monofásico, que es una diferencia práctica frente a los equipos que exigen trifásico.',
    ],
    modelos: {
      encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Medidas externas', 'Peso', 'Potencia'],
      filas: [
        ['SQ-WD-100', '100 L', '700 × 430 × 360 mm', '1067 × 790 × 1782 mm', '301 kg', '3,4 kVA'],
        ['SQ-WD-135', '135 L', '750 × 450 × 400 mm', '1067 × 790 × 1782 mm', '308 kg', '3,5 kVA'],
        ['SQ-WD-190', '190 L', '820 × 510 × 460 mm', '1067 × 790 × 1782 mm', '341 kg', '4,3 kVA'],
      ],
    },
    instalacion: [
      { label: 'Eléctrico', valor: '220 V monofásico · 3,4 a 4,3 kVA según modelo' },
      { label: 'Agua', valor: 'No requiere' },
    ],
    normasDeclaradas: ['EN ISO 14937', 'EN ISO 13485:2016', 'EN 61010-2-040'],
    diferenciales: ['Hasta 190 L', 'Ciclo corto de 30 min', 'Agente en cápsula · 220 V'],
    // TODO · límite de lúmenes de la serie SQ-WD, concentración del peróxido y
    // registro INVIMA del SQ-WD-135.
    preguntasCotizacion: [
      'Volumen de material termosensible por turno',
      'Tipo de lúmenes y longitudes que hay que procesar',
      'Urgencia de rotación entre cirugías',
      'Disponibilidad de empaque en Tyvek o SMS',
    ],
    relacionadas: [
      { producto: 'servimedical/papel-y-tyvek', porque: 'La celulosa aborta el ciclo. Esta línea necesita barrera en Tyvek.' },
      { producto: '2i/indicadores-quimicos', porque: 'Los indicadores de vapor no viran con peróxido. No sirven como control aquí.' },
      { producto: 'servimedical/repuestos', porque: 'Electrónica sensible: el canal de fábrica evita paradas largas por una parte menor.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo con rutina propia del equipo de plasma',
      'Entrenamiento en carga y empaque compatible',
    ],
    seo: {
      titulo: 'Plasma SQ-WD de Sanqiang en Colombia | Servimedical',
      descripcion: 'SQ-WD de Sanqiang: plasma de peróxido de 100 a 190 L, ciclo corto de 30 minutos, agente en cápsula y alimentación a 220 V.',
    },
  },

  {
    marca: 'sanqiang',
    slug: 'termodesinfectoras',
    linea: 'termodesinfectoras',
    nombre: 'SQ-KX y SQ-X360',
    tipo: 'equipo',
    orden: 3,
    lead: 'Termodesinfectoras de 350 a 536 L con 12 cestas en 4 niveles, desinfección a 93–97 °C y secado automático.',
    franja: [
      { label: 'Cámara', valor: '350 – 536 L' },
      { label: 'Capacidad', valor: '12 cestas en 4 niveles' },
      { label: 'Desinfección', valor: '93 – 97 °C' },
      { label: 'Programas', valor: '17' },
    ],
    descripcion: [
      'La serie SQ-KX lava, desinfecta térmicamente y seca en un solo ciclo, con seis programas estándar y once configurables. Trabaja entre 93 y 97 °C en la fase de desinfección.',
      'La SQ-X360, de 350 L, es la opción compacta en acero inoxidable 304 para centrales que no necesitan la capacidad de la serie mayor pero sí el proceso validable.',
    ],
    modelos: {
      encabezados: ['Modelo', 'Cámara', 'Medidas externas', 'Potencia'],
      filas: [
        ['SQ-X360', '350 L', '950 × 825 × 2060 mm', '31 kVA'],
        ['SQ-KX-490', '470 L', '1190 × 900 × 2020 mm', '30 kVA'],
        ['SQ-KX-530', '536 L', '1270 × 1000 × 2020 mm', '40 kVA'],
      ],
    },
    instalacion: [
      { label: 'Eléctrico', valor: 'Trifásico 380 V · 50 Hz' },
      { label: 'Agua', valor: '0,2 – 0,5 MPa' },
      { label: 'Ruido', valor: '≤ 75 dB' },
    ],
    // TODO · no declara ISO 15883 ni el valor A0. Pedirlos antes de publicarlos.
    normasDeclaradas: ['CE', 'ISO 13485'],
    diferenciales: ['Hasta 536 L', '12 cestas en 4 niveles', '93 – 97 °C'],
    preguntasCotizacion: [
      'Número de procedimientos por día y tipo de instrumental',
      'Cantidad de carros que hay que procesar por turno',
      'Calidad del agua de alimentación disponible',
      'Espacio en el área de lavado y paso hacia la zona limpia',
    ],
    relacionadas: [
      { producto: 'servimedical/mobiliario-acero-inoxidable', porque: 'Sin puesto de prelavado y escurrido, el material entra con residuo y el ciclo no lo corrige.' },
      { producto: 'servimedical/papel-y-tyvek', porque: 'Lo que sale limpio se empaca de inmediato, o espera descubierto.' },
      { producto: 'servimedical/repuestos', porque: 'Bombas, válvulas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
    ],
    servicio: [
      'Instalación con conexión hidráulica y de desagüe, y puesta en marcha',
      'Mantenimiento preventivo con protocolo definido por equipo',
      'Entrenamiento al personal de la zona de lavado',
    ],
    seo: {
      titulo: 'Termodesinfectoras Sanqiang en Colombia | Servimedical',
      descripcion: 'SQ-KX y SQ-X360 de Sanqiang: termodesinfectoras de 350 a 536 L, 12 cestas en 4 niveles y desinfección a 93–97 °C.',
    },
  },

  {
    marca: 'sanqiang',
    slug: 'residuos-hospitalarios',
    linea: 'residuos-hospitalarios',
    nombre: 'Tratamiento de residuos',
    tipo: 'equipo',
    orden: 4,
    lead: 'Tratamiento de residuo biosanitario por vapor dentro de la institución, antes de que el material salga por la puerta.',
    franja: [
      { label: 'Método', valor: 'Vapor con trituración' },
      { label: 'Tratamiento', valor: 'En sitio, dentro de la institución' },
      { label: 'Origen', valor: 'Henan, China' },
    ],
    descripcion: [
      'Sanqiang completa su portafolio de central con el tratamiento del residuo biosanitario en el mismo sitio donde se genera, con la misma ingeniería de cámara y control de presión de sus autoclaves.',
      'Es la opción para una institución que ya opera equipos Sanqiang y quiere un solo interlocutor técnico para la central y para el recinto de residuos.',
    ],
    // TODO · modelo, capacidades por ciclo y reducción logarítmica declarada.
    // El equipo no aparece en el sitio de exportación ni en la tienda oficial:
    // los datos tienen que salir del proveedor. Mientras tanto, sin cifras.
    diferenciales: ['Tratamiento en sitio', 'Mismo fabricante que la central', 'Importación directa'],
    preguntasCotizacion: [
      'Kilos de residuo biosanitario por día y por turno',
      'Si el tratamiento se hace en la central o en un recinto aparte',
      'Costo actual de la gestión externa, para comparar',
      'Acometidas disponibles en el recinto de residuos',
    ],
    relacionadas: [
      { producto: 'servimedical/mobiliario-acero-inoxidable', porque: 'El residuo se mueve en carro cerrado y diferenciado, nunca en el mismo que el material estéril.' },
      { producto: '2i/indicadores-biologicos', porque: 'La inactivación se verifica con control biológico, igual que una carga de esterilización.' },
      { producto: 'servimedical/repuestos', porque: 'El sistema de trituración es la parte de mayor desgaste del equipo.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento del sistema de trituración y del circuito de vapor',
      'Entrenamiento al personal que opera el recinto de residuos',
    ],
    seo: {
      titulo: 'Tratamiento de residuos Sanqiang | Servimedical',
      descripcion: 'Tratamiento de residuo biosanitario por vapor dentro de la institución, de Sanqiang. Representado en Colombia por Servimedical.',
    },
  },

  /* ════════════════════════════════════════════════════════ CELITRON ════ */
  {
    marca: 'celitron',
    slug: 'residuos-hospitalarios',
    linea: 'residuos-hospitalarios',
    nombre: 'ISS',
    tipo: 'equipo',
    orden: 1,
    lead: 'Esterilizador y triturador integrado: el residuo biosanitario se tritura y se esteriliza con vapor en un solo recipiente, dentro del hospital, en 15 a 35 minutos.',
    franja: [
      { label: 'Cámara', valor: '25 · 150 · 560 L' },
      { label: 'Capacidad', valor: '5 – 150 kg/h' },
      { label: 'Temperatura', valor: '134 °C' },
      { label: 'Inactivación', valor: 'SAL superior a 6 log₁₀' },
    ],
    descripcion: [
      'El ISS carga el residuo en la cámara, lo tritura con cuchillas reversibles y lo esteriliza con vapor a 134 °C sin abrir el recipiente. No hay manipulación de residuo infeccioso entre la trituración y la esterilización, que es donde está el riesgo en los sistemas de dos equipos.',
      'El residuo sale estéril, seco y reducido a una quinta parte de su volumen, y se dispone como residuo ordinario. El líquido se condensa y se descarga al alcantarillado.',
    ],
    modelos: {
      encabezados: ['Modelo', 'Cámara', 'Capacidad', 'Ciclo', 'Medidas', 'Peso'],
      filas: [
        ['ISS AC-575', '150 L · Ø502 × 800 mm', '15 – 30 kg/h', '30 – 40 min', '1290 × 2150 × 2039 mm', '880 kg'],
      ],
    },
    ciclos: [
      'Residuos · exposición mínima de 3 min a 134 °C',
      'Textiles',
      'Residuo especial',
      'Vidrio',
    ],
    instalacion: [
      { label: 'Eléctrico', valor: 'Trifásico 380–400 V · 36 kW con generador' },
      { label: 'Accesorios estándar', valor: 'Generador de vapor, ósmosis inversa y drenaje' },
    ],
    normasDeclaradas: ['CE', 'Directiva de Máquinas', 'PED', 'EMC', 'RoHS II'],
    diferenciales: ['Un solo recipiente', '5 – 150 kg/h', 'Reducción a una quinta parte'],
    // TODO · no se encontraron fichas de los modelos de 25 y 560 L.
    preguntasCotizacion: [
      'Kilos de residuo biosanitario por día y por turno',
      'Espacio disponible en el recinto de residuos y acceso para el contenedor',
      'Costo actual de la gestión externa, para comparar',
      'Autorización ambiental vigente de la institución',
    ],
    relacionadas: [
      { producto: 'servimedical/mobiliario-acero-inoxidable', porque: 'El residuo se mueve en carro cerrado y diferenciado hasta el recinto de tratamiento.' },
      { producto: '2i/indicadores-biologicos', porque: 'La inactivación se verifica con control biológico, igual que una carga de esterilización.' },
      { producto: 'servimedical/repuestos', porque: 'Las cuchillas de trituración son la parte de mayor desgaste del equipo.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento del circuito de vapor y del sistema de trituración',
      'Entrenamiento al personal del recinto de residuos',
    ],
    fuenteBrochure: 'https://celitron.com/storage/download/iss-medical-en.pdf',
    seo: {
      titulo: 'Sistema ISS de Celitron en Colombia | Servimedical',
      descripcion: 'ISS de Celitron: tritura y esteriliza residuo biosanitario en un solo recipiente, de 5 a 150 kg/h, con inactivación superior a 6 log₁₀.',
    },
  },

  /* ═════════════════════════════════════════════════════════ AKARMAK ════ */
  {
    marca: 'akarmak',
    slug: 'residuos-hospitalarios',
    linea: 'residuos-hospitalarios',
    nombre: 'AKR',
    tipo: 'equipo',
    orden: 1,
    lead: 'Sistemas de esterilización de residuos biosanitarios con vapor a 135–140 °C y trituradora propia, desde 20 kg por ciclo en un hospital hasta 1.800 kg por hora en planta centralizada.',
    franja: [
      { label: 'Por lote', valor: '20 – 300 kg/ciclo' },
      { label: 'En continuo', valor: '500 – 1.800 kg/h' },
      { label: 'Inactivación', valor: '8 log₁₀' },
      { label: 'Validación', valor: 'Instituto Robert Koch · STAATT IV' },
    ],
    descripcion: [
      'La serie L tritura el residuo antes de la esterilización y trabaja por lote, para hospitales que procesan en sitio con poco espacio. La serie A tritura después del vapor y opera en continuo, para plantas regionales o de gestores.',
      'Ambas tienen control por pantalla táctil Siemens y trituradora de doble motor con reversa automática contra atascos. El alcance es llave en mano: generador de vapor, sistema de presurización y cargue y descargue automáticos.',
    ],
    modelos: {
      encabezados: ['Modelo', 'Tipo', 'Capacidad', 'Ciclo', 'Proceso', 'Inactivación'],
      filas: [
        ['AKR250L', 'Trituración previa · hospital', '20 – 30 kg/ciclo', '30 – 35 min', '135–140 °C · 3–4 bar', '8 log₁₀'],
        ['AKR500L', 'Trituración previa · hospital', '50 – 70 kg/ciclo', '30 – 35 min', '135–140 °C · 3–4 bar', '8 log₁₀'],
        ['AKR1000L', 'Trituración previa · hospital', '100 – 130 kg/ciclo', '40 – 45 min', '135–140 °C · 3–4 bar', '8 log₁₀'],
        ['AKR2500L', 'Trituración previa · planta', '250 – 300 kg/ciclo', '50 – 60 min', '135–140 °C · 3–4 bar', '8 log₁₀'],
        ['AKR500A', 'Trituración posterior · planta', '500 – 700 kg/h', 'Continuo', '140–155 °C · 4–5 bar', '6 log₁₀'],
        ['AKR1000A', 'Trituración posterior · planta', '1.000 – 1.200 kg/h', 'Continuo', '140–155 °C · 4–5 bar', '6 log₁₀'],
        ['AKR1500A', 'Trituración posterior · planta', '1.500 – 1.800 kg/h', 'Continuo', '140–155 °C · 4–5 bar', '6 log₁₀'],
      ],
    },
    instalacion: [
      { label: 'Alcance', valor: 'Llave en mano: generador de vapor, presurización y cargue automático' },
      { label: 'Control', valor: 'Pantalla táctil Siemens' },
    ],
    normasDeclaradas: ['PED 2014/68/UE', 'ASME VIII', 'AD 2000', 'ISO 9001:2015', 'Validación del Instituto Robert Koch · STAATT IV'],
    diferenciales: ['De hospital a planta', '8 log₁₀ validados', 'Trituradora de fabricación propia'],
    preguntasCotizacion: [
      'Kilos de residuo biosanitario por día y por turno',
      'Si es tratamiento para una sola institución o para varias',
      'Espacio y acometidas disponibles en el recinto de tratamiento',
      'Autorización ambiental vigente',
    ],
    relacionadas: [
      { producto: 'servimedical/mobiliario-acero-inoxidable', porque: 'El residuo se mueve en carro cerrado y diferenciado hasta el recinto de tratamiento.' },
      { producto: '2i/indicadores-biologicos', porque: 'La inactivación se verifica con control biológico, igual que una carga de esterilización.' },
      { producto: 'servimedical/repuestos', porque: 'La trituradora es la parte de mayor desgaste de todo el sistema.' },
    ],
    servicio: [
      'Instalación llave en mano con técnicos propios',
      'Mantenimiento del sistema de trituración y del circuito de vapor',
      'Entrenamiento al personal del recinto de tratamiento',
    ],
    // El brochure 2025 no tiene capa de texto: se publica como PDF descargable tal cual.
    fuenteBrochure: 'https://www.akarmak.com/uploads/urunler_kategori/1687132054.pdf',
    seo: {
      titulo: 'Sistemas AKR de Akarmak en Colombia | Servimedical',
      descripcion: 'AKR de Akarmak: esterilización de residuo biosanitario con vapor y trituradora propia, de 20 kg por ciclo a 1.800 kg por hora, con 8 log₁₀ validados.',
    },
  },

  /* ══════════════════════════════════════════════════════════════ 2i ════ */
  {
    marca: '2i',
    slug: 'indicadores-quimicos',
    linea: 'indicadores',
    nombre: 'Indicadores químicos',
    tipo: 'consumible',
    orden: 1,
    lead: 'Indicadores de las clases 1, 2, 4, 5 y 6 de la ISO 11140-1, para vapor, peróxido de hidrógeno, óxido de etileno y formaldehído.',
    franja: [
      { label: 'Clases', valor: 'Tipos 1 · 2 · 4 · 5 · 6' },
      { label: 'Métodos', valor: 'Vapor · peróxido · óxido de etileno · formaldehído' },
      { label: 'Lectura', valor: 'Inmediata, por viraje' },
      { label: 'Vida útil', valor: '5 años' },
    ],
    descripcion: [
      'El portafolio cubre cada punto de control de la central: etiquetas de proceso del Tipo 1 para el exterior del paquete, prueba de Bowie-Dick del Tipo 2 para el primer ciclo del día, e indicadores multivariables del Tipo 4, integradores del Tipo 5 y emuladores del Tipo 6 para el centro de la carga.',
      'El integrador de vapor vira de rosa a café o negro a 121 °C en 17 minutos, o a 134 °C en 3,5 minutos. No contiene metales pesados y tiene cinco años de vida útil.',
    ],
    modelos: {
      encabezados: ['Tipo', 'Producto', 'Método', 'Presentación'],
      filas: [
        ['1', 'Etiqueta de proceso · 100×50 y 50×50 mm', 'Vapor', '—'],
        ['2', 'Bowie-Dick', 'Vapor 121 / 134 °C', '—'],
        ['4', 'Multivariable', 'Vapor · peróxido · formaldehído', '—'],
        ['5', 'Integrador', 'Vapor: gravedad, prevacío y flash', '25 · 100 · 250'],
        ['5', 'Integrador', 'Óxido de etileno', '—'],
        ['6', 'Emulador', 'Vapor', '—'],
      ],
    },
    // TODO · faltan las fichas oficiales, que están en el portal de clientes de
    // 2i: presentaciones y unidades por caja de los Tipos 1, 2, 4 y 6.
    normasDeclaradas: ['ISO 11140-1'],
    diferenciales: ['5 clases de indicador', '4 métodos cubiertos', 'Integrador sin metales pesados'],
    preguntasCotizacion: [
      'Cargas por día y por equipo',
      'Protocolo interno de monitoreo de la institución',
      'Método de esterilización de cada equipo',
      'Nivel de evidencia que exige el comité de infecciones',
    ],
    relacionadas: [
      { producto: '2i/indicadores-biologicos', porque: 'El químico es lectura inmediata, pero indicio. El biológico es la prueba.' },
      { producto: 'servimedical/papel-y-tyvek', porque: 'Uno va dentro del paquete y otro sobre la barrera. El consumo se mueve al mismo ritmo.' },
      { producto: 'sanqiang/plasma', porque: 'El indicador se escoge contra el método del equipo: los de vapor no viran con peróxido.' },
    ],
    servicio: [
      'Definición del esquema de monitoreo junto con la central',
      'Abastecimiento programado por carga y por equipo',
      'Entrenamiento en lectura e interpretación de viraje',
    ],
    seo: {
      titulo: 'Indicadores químicos 2i en Colombia | Servimedical',
      descripcion: 'Indicadores químicos 2i de las clases 1, 2, 4, 5 y 6 de ISO 11140-1, para vapor, peróxido, óxido de etileno y formaldehído.',
    },
  },

  {
    marca: '2i',
    slug: 'indicadores-biologicos',
    linea: 'indicadores',
    nombre: 'Indicadores biológicos',
    tipo: 'consumible',
    orden: 2,
    lead: 'Indicadores biológicos autocontenidos con lectura rápida, desde 19 minutos en vapor, y lectoras e incubadoras propias.',
    franja: [
      { label: 'Lectura', valor: 'De 19 min a 24 h' },
      { label: 'Métodos', valor: 'Vapor · peróxido · óxido de etileno · formaldehído' },
      { label: 'Espora en vapor', valor: 'Geobacillus stearothermophilus' },
      { label: 'Equipos', valor: 'Lectoras de 4 y 12 pozos' },
    ],
    descripcion: [
      'El indicador de vapor lleva esporas de Geobacillus stearothermophilus. La versión de lectura por fluorescencia da resultado en tres horas incubando a 60 °C, y trae indicador químico en la etiqueta para separar los procesados de los testigos.',
      'Hay versiones de lectura rápida para peróxido, formaldehído y óxido de etileno. La línea se completa con lectoras de 4 y 12 pozos, incubadora de 6 pozos, impresora térmica y paquetes de prueba.',
    ],
    modelos: {
      encabezados: ['Producto', 'Método', 'Lectura', 'Caja'],
      filas: [
        ['Vapor 19 min', 'Vapor', '19 min', '50'],
        ['Vapor 1 h', 'Vapor', '1 h', '50'],
        ['Vapor 3 h', 'Vapor', '3 h, por fluorescencia', '50'],
        ['Vapor 24 h', 'Vapor', '24 h, pH visual', '10'],
        ['VH₂O₂', 'Peróxido de hidrógeno', '24 min / 8 h', '50'],
        ['FORM', 'Formaldehído', '2 h / 8 h', '50'],
        ['EO', 'Óxido de etileno', '4 h / 12 h', '50'],
      ],
    },
    // TODO · población del indicador de vapor de 3 h: las fuentes dan 10⁵ y 10⁶.
    // TODO · organismo de los indicadores de peróxido, óxido de etileno y formaldehído.
    normasDeclaradas: ['ISO 11138-1'],
    diferenciales: ['Lectura desde 19 min', '4 métodos cubiertos', 'Lectoras e incubadora propias'],
    preguntasCotizacion: [
      'Frecuencia de control biológico que define el protocolo de la institución',
      'Número de equipos y de cargas que hay que cubrir',
      'Si la central tiene incubadora propia o depende de un laboratorio externo',
      'Tiempo de lectura que tolera la operación sin frenar el giro quirúrgico',
    ],
    relacionadas: [
      { producto: '2i/indicadores-quimicos', porque: 'El biológico se lee en horas; el químico, en el momento. La carga se libera con los dos.' },
      { producto: 'tuttnauer/vapor', porque: 'Verifica el equipo, no solo la carga. Un resultado no conforme es un dato de mantenimiento.' },
      { producto: 'servimedical/repuestos', porque: 'Un resultado no conforme repetido suele ser el equipo. Ahí entra el repuesto.' },
    ],
    servicio: [
      'Definición de la frecuencia de control junto con la central',
      'Abastecimiento programado, con reserva para cargas con implantes',
      'Entrenamiento en incubación, lectura y conducta ante resultado no conforme',
    ],
    seo: {
      titulo: 'Indicadores biológicos 2i en Colombia | Servimedical',
      descripcion: 'Indicadores biológicos 2i autocontenidos con lectura desde 19 minutos en vapor, y lectoras e incubadoras propias.',
    },
  },

  /* ════════════════════════════════════════════════════ SERVIMEDICAL ════ */
  {
    marca: 'servimedical',
    slug: 'papel-y-tyvek',
    linea: 'empaque',
    nombre: 'Papel grado esterilización y Tyvek',
    tipo: 'consumible',
    orden: 1,
    lead: 'Empaque de barrera estéril para cada método: papel grado esterilización y rollos papel-película para vapor, y Tyvek para plasma y óxido de etileno.',
    franja: [
      { label: 'Norma', valor: 'ISO 11607-1 · EN 868' },
      { label: 'Sello', valor: 'Ancho mínimo de 6 mm' },
      { label: 'Indicador', valor: 'De proceso, impreso' },
      { label: 'Abastecimiento', valor: 'Programado contra el consumo real' },
    ],
    descripcion: [
      'Los rollos y sobres papel-película combinan papel médico con película de PET o PP, llevan indicadores de proceso impresos para vapor y óxido de etileno, y se sellan con un ancho mínimo de 6 mm según la EN 868-5.',
      'Para plasma se usa Tyvek, polietileno de alta densidad hilado por flash, porque la celulosa neutraliza el peróxido. El Tyvek resiste el desgarro y la humedad, y se abre sin desprender fibras sobre el campo estéril.',
    ],
    // TODO · catálogo propio con referencias, anchos de rollo, medidas de sobre
    // y unidades por caja. Sin eso no hay tabla de presentaciones.
    normasDeclaradas: ['ISO 11607-1 y -2', 'EN 868-2, -3 y -5', 'ISO 11140-1'],
    diferenciales: ['Papel-película y Tyvek', 'ISO 11607 y EN 868', 'Abastecimiento programado'],
    preguntasCotizacion: [
      'Paquetes por turno y tamaño promedio del set',
      'Método de esterilización de cada línea de material',
      'Si el empaque es de sellado térmico o de doblado',
      'Consumo mensual actual, para programar el abastecimiento',
    ],
    relacionadas: [
      { producto: '2i/indicadores-quimicos', porque: 'La cinta dice que el paquete pasó por el equipo. Lo de adentro lo dice el indicador interno.' },
      { producto: 'servimedical/mobiliario-acero-inoxidable', porque: 'La superficie y la altura deciden cuántos paquetes salen por turno y en qué estado.' },
      { producto: 'sanqiang/vapor', porque: 'El método de esterilización decide la barrera, no al revés: celulosa en vapor, Tyvek en plasma.' },
    ],
    servicio: [
      'Abastecimiento programado contra el consumo real de la central',
      'Acompañamiento en la elección de barrera por método de esterilización',
      'Entrenamiento en conformación y sellado de paquete',
    ],
    seo: {
      titulo: 'Papel grado esterilización y Tyvek | Servimedical',
      descripcion: 'Rollos papel-película para vapor y Tyvek para plasma, bajo ISO 11607 y EN 868, con sello de 6 mm y abastecimiento programado desde Bogotá.',
    },
  },

  {
    marca: 'servimedical',
    slug: 'mobiliario-acero-inoxidable',
    linea: 'mobiliario',
    nombre: 'Mobiliario en acero inoxidable',
    tipo: 'mobiliario',
    orden: 2,
    lead: 'Mesas, mesones con poceta, carros de transporte y estanterías en acero inoxidable, fabricados a la medida del plano y del flujo de sucio a limpio a estéril.',
    franja: [
      { label: 'Material', valor: 'AISI 304 · AISI 316 en zona húmeda' },
      { label: 'Fabricación', valor: 'A la medida, contra el plano' },
      { label: 'Acabado', valor: 'Superficie continua, soldadura pulida' },
      { label: 'Referencia', valor: 'Resolución 3100 de 2019' },
    ],
    descripcion: [
      'Se fabrica en acero AISI 304 para mesas y estanterías, y en AISI 316 para zonas húmedas, porque el molibdeno le da más resistencia a cloruros y detergentes. La superficie es continua y la soldadura, pulida: una unión retiene residuo y no se limpia.',
      'El levantamiento en sitio va antes de la cotización. La altura de trabajo y el largo del puesto deciden cuántos paquetes salen bien conformados al final del turno, y las dimensiones del carro dependen de puertas, ascensores y rampas del recorrido real.',
    ],
    modelos: {
      encabezados: ['Pieza', 'Zona'],
      filas: [
        ['Mesón de lavado con poceta y escurridero', 'Sucia'],
        ['Mesa de inspección y empaque', 'Limpia'],
        ['Carro de transporte abierto y cerrado, diferenciado por flujo', 'Sucia y estéril'],
        ['Carro de carga y descarga de autoclave', 'Limpia y estéril'],
        ['Estantería abierta y armario cerrado', 'Estéril'],
      ],
    },
    // TODO · calibre, acabado, plazos de fabricación y fotos de proyectos entregados.
    diferenciales: ['AISI 304 y 316', 'A la medida del plano', 'Soldadura pulida sin uniones'],
    preguntasCotizacion: [
      'Plano del área y zonificación de sucio, limpio y estéril',
      'Número de puestos de empaque simultáneos y altura de trabajo del personal',
      'Paquetes en circulación y tiempo de permanencia en estéril',
      'Distancia entre la central y las salas, y dimensiones de puertas y ascensores',
    ],
    relacionadas: [
      { producto: 'servimedical/papel-y-tyvek', porque: 'El paquete se conforma en la mesa y se guarda en la estantería. Se dimensionan juntas.' },
      { producto: 'sanqiang/residuos-hospitalarios', porque: 'El residuo sale de la central en carro cerrado y diferenciado, hasta el recinto de tratamiento.' },
      { producto: 'tuttnauer/termodesinfectoras', porque: 'Cuando el volumen de lúmenes crece, el lavado manual deja de sostener el proceso.' },
    ],
    servicio: [
      'Levantamiento en sitio de las zonas de lavado, empaque y almacenamiento',
      'Propuesta de distribución y de altura de trabajo según el flujo',
      'Fabricación e instalación, con conexión a las acometidas existentes',
    ],
    seo: {
      titulo: 'Mobiliario en acero inoxidable | Servimedical',
      descripcion: 'Mesones con poceta, mesas de empaque, carros diferenciados por flujo y estantería estéril en AISI 304 y 316, fabricados contra el plano de la central.',
    },
  },

  {
    marca: 'servimedical',
    slug: 'repuestos',
    linea: 'repuestos',
    nombre: 'Repuestos originales',
    tipo: 'consumible',
    orden: 3,
    lead: 'Repuesto para mantenimiento preventivo, correctivo y revalidación de autoclaves, plasma y termodesinfectoras, con existencias en Bogotá.',
    franja: [
      { label: 'Origen', valor: 'Original de fábrica' },
      { label: 'Inventario', valor: 'En Bogotá, las partes de mayor rotación' },
      { label: 'Cobertura', valor: 'Equipos dentro y fuera de garantía' },
      { label: 'Referencia', valor: 'Resolución 2183 de 2004' },
    ],
    descripcion: [
      'La Resolución 2183 de 2004 exige revalidar los esterilizadores como mínimo cada doce meses y calibrar los instrumentos a intervalos definidos. El kit de mantenimiento preventivo anual de un autoclave incluye empaque de puerta, filtro de cámara, fuelle de puerta y válvulas.',
      'Servimedical mantiene inventario de los repuestos de desgaste de las marcas que representa, para que el equipo no quede detenido esperando una importación. Atendemos también equipos fuera de garantía y de marcas que no vendimos.',
    ],
    modelos: {
      encabezados: ['Categoría', 'Aplica a'],
      filas: [
        ['Empaques y fuelles de puerta', 'Autoclaves de vapor'],
        ['Filtros de cámara y bacteriológicos de línea', 'Vapor y plasma'],
        ['Válvulas, trampas de vapor y purgadores', 'Autoclaves de vapor'],
        ['Sensores y transductores de temperatura y presión', 'Todas las líneas'],
        ['Bombas de vacío y resistencias de generador', 'Vapor y termodesinfectoras'],
        ['Impresoras de ciclo y papel térmico', 'Todas las líneas'],
      ],
    },
    // TODO confirmar con Felipe · qué categorías hay en existencia real y para qué marcas.
    diferenciales: ['Original de fábrica', 'Inventario en Bogotá', 'Dentro y fuera de garantía'],
    preguntasCotizacion: [
      'Marca, modelo y número de serie del equipo',
      'Qué hace el equipo y en qué momento se detiene',
      'Si el equipo está parado o la falla es intermitente',
      'Si busca una reposición puntual o un plan programado',
    ],
    relacionadas: [
      { producto: 'tuttnauer/vapor', porque: 'La empaquetadura de puerta es la falla más frecuente y la más fácil de prevenir.' },
      { producto: 'sanqiang/termodesinfectoras', porque: 'Bombas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
      { producto: 'tuttnauer/plasma', porque: 'La electrónica del ciclo de baja temperatura no admite partes equivalentes.' },
    ],
    servicio: [
      'Identificación de la parte a partir de la placa del equipo',
      'Reposición programada contra la rutina de mantenimiento',
      'Canal directo de fábrica para lo que no está en inventario',
    ],
    seo: {
      titulo: 'Repuestos originales | Servimedical',
      descripcion: 'Empaques de puerta, filtros, válvulas, sensores y bombas para autoclaves, plasma y termodesinfectoras, con existencias en Bogotá.',
    },
  },
];

/* ------------------------------------------------------------- consultas */

export const idProducto = (p: { marca: string; slug: string }) => `${p.marca}/${p.slug}`;
export const urlProducto = (p: { marca: string; slug: string }) => `/marcas/${p.marca}/${p.slug}`;

export const productoPorId = (id: string) => productos.find((p) => idProducto(p) === id);

/** Los productos de una marca, en su orden. */
export const productosDeMarca = (slugMarca: string) =>
  productos.filter((p) => p.marca === slugMarca).sort((a, b) => a.orden - b.orden);

/** Los productos de una línea, en el orden de las marcas del portafolio. */
export const productosDeLinea = (slugLinea: string) =>
  productos
    .filter((p) => p.linea === slugLinea)
    .sort((a, b) => ORDEN_MARCA.indexOf(a.marca) - ORDEN_MARCA.indexOf(b.marca));

/** Las líneas que una marca cubre, en el orden del ciclo. */
export const lineasDeMarca = (slugMarca: string) =>
  lineas
    .filter((l) => productos.some((p) => p.marca === slugMarca && p.linea === l.slug))
    .sort((a, b) => a.orden - b.orden);

/** Una línea con un solo producto no merece página propia: redirige a él. */
export const lineaTienePagina = (slugLinea: string) => productosDeLinea(slugLinea).length > 1;
