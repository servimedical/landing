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
    slug: 'autoclaves',
    linea: 'autoclaves',
    nombre: 'Autoclaves',
    tipo: 'equipo',
    orden: 2,
    lead: 'Autoclaves de vapor de 21 a 1.010 L: de mesa Clase B para clínica y quirófano, medianos móviles, y de central bajo EN 285, de una o dos puertas.',
    franja: [
      { label: 'Cámara', valor: '21 – 1.010 L' },
      { label: 'Temperatura', valor: '121 y 134 °C' },
      { label: 'Normas', valor: 'EN 13060 · EN 285' },
      { label: 'Puertas', valor: 'Simple o doble, en central' },
    ],
    descripcion: [
      'Los equipos de mesa T-Top y T-Edge son Clase B, con prevacío fraccionado para carga hueca y porosa, trazabilidad por USB y conectividad Wi-Fi o Ethernet. Los HSG son medianos sobre ruedas, de 85 y 160 L, que funcionan sin acometidas del edificio.',
      'En la central, las series GS, 44/55 Compact y T-Max, más los modelos 6671130 y 69180, van de 120 a 1.010 L. Todos llevan cámara de 316L, generador integrado o conexión a vapor de planta, y puerta de barrera que separa el área limpia de la estéril. El sistema AquaMinimal, opcional, reduce el consumo de agua entre un 50 y un 90 %.',
    ],
    modelos: [
      {
        familia: 'Mesa, Clase B · EN 13060',
        encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Medidas externas', 'Peso', 'Notas'],
        filas: [
          ['T-Top 10', '21 L', 'Ø249 × 450 mm', '585 × 462 × 460 mm', '45 kg', '4 bandejas · llenado manual'],
          ['T-Top 11', '27 L', 'Ø280 × 452 mm', '594 × 495 × 457 mm', '52 kg', 'Llenado manual o automático'],
          ['T-Edge 10', '23 L', 'Ø250 × 460 mm', '480 × 500 × 580 mm', '53 kg', '5 bandejas · 230 V monofásico'],
          ['T-Edge 11', '27 L', 'Ø280 × 460 mm', '500 × 500 × 580 mm', '56 kg', '230 V monofásico'],
        ],
      },
      {
        familia: 'Mesa, Clase S · EN 13060',
        encabezados: ['Modelo', 'Cámara', 'Medidas externas', 'Potencia'],
        filas: [
          ['2540EKA', '23 L', '508 × 362 × 550 mm', '2.200 W · 230 V'],
          ['D-Line 2840EKA', '28,5 L', '—', '2.200 W · 230 V'],
          ['3850EA', '65 L', '660 × 525 × 695 mm', '2.400 W · 230 V'],
          ['D-Line 3850EA', '65 L', '720 × 540 × 765 mm', '2.400 W · 230 V'],
          ['D-Line 3870EA', '85 L', '720 × 540 × 940 mm', '3.000 W · 230 V'],
        ],
      },
      {
        familia: 'Medianos móviles · HSG D-Line',
        nota: 'Funcionan sin acometidas del edificio.',
        encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Medidas externas', 'Peso', 'Potencia'],
        filas: [
          ['3870HSG D-Line', '85 L', 'Ø384 × 758 mm', '720 × 1365 × 1180 mm', '180 kg', '9 kW trifásico'],
          ['5075HSG-D', '160 L', '—', '857 × 1660 × 1286 mm', '366 kg', '18 kW'],
        ],
      },
      {
        familia: 'Central · EN 285',
        encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Generador', 'Puertas'],
        filas: [
          ['5075GS', '160 L', 'Ø500 × 810 mm', '18 kW', '1 o 2'],
          ['50125GS', '250 L', 'Ø500 × 1250 mm', '18 kW', '1 o 2'],
          ['4472', '120 L', '408 × 408 × 730 mm', '18 kW', '1 o 2'],
          ['4496', '160 L', '408 × 408 × 970 mm', '18 kW', '1 o 2'],
          ['5596', '250 L', '508 × 508 × 970 mm', '27 kW', '1 o 2'],
          ['55120', '310 L', '508 × 508 × 1210 mm', '27 kW', '1 o 2'],
          ['T-Max 6', '430 L · 6 StU', '660 × 660 × 990 mm', '36 kW', '1 o 2'],
          ['T-Max 8', '565 L · 8 StU', '660 × 660 × 1295 mm', '36 kW', '1 o 2'],
          ['6671130', '610 L', '660 × 710 × 1295 mm', '36 kW', '1 o 2'],
          ['69180', '1.010 L', '610 × 910 × 1815 mm', '—', '1 o 2'],
        ],
      },
    ],
    // TODO · volumen real del 5075HSG: con Ø500 × 750 la cámara da 147 L, no 160,
    //   y su página declara EN 285 y EN 13060 a la vez. Confirmar con fábrica.
    // TODO · potencia del generador del 69180, no publicada.
    ciclos: [
      {
        familia: 'Mesa · T-Top 10, tiempo total',
        items: [
          '134 °C sin envolver · 24 min',
          '134 °C envuelto · 52 min',
          '121 °C sin envolver · 34 min',
          '121 °C envuelto · 72 min',
          'Priones · 70 min',
          'Bowie-Dick y prueba de vacío',
        ],
      },
      {
        familia: 'Central · 44/55 Compact, tiempo de exposición',
        items: [
          'Sin envolver · 134 °C / 3 min',
          'Envuelto · 134 °C / 4 min',
          'Doble envuelto · 134 °C / 7 min',
          'Material poroso · 121 °C / 15 min',
          'Priones · 134 °C / 18 min',
          'Bowie-Dick · 134 °C / 3,5 min',
          'Prueba de vacío',
        ],
      },
    ],
    instalacionFamilia: 'Central · 44/55 Compact',
    instalacion: [
      { label: 'Eléctrico', valor: 'Trifásico 208–415 V · 18 kW (27 kW en el 55120)' },
      { label: 'Agua del generador', valor: 'Dureza < 0,1 mmol/L y conductividad < 50 µS/cm · 25–37 L/h' },
      { label: 'Agua de enfriamiento', valor: '2–5 bar · alrededor de 17 L/min' },
      { label: 'Drenaje', valor: 'Mínimo 2", resistente a 80 °C' },
      { label: 'Aire comprimido', valor: '6–8 bar' },
      { label: 'Vapor de planta', valor: 'Opcional · 97–100 % seco, máximo 2,8 bar' },
      { label: 'Mesa', valor: 'Toma de 230 V monofásica y agua desmineralizada para el depósito' },
    ],
    normasDeclaradas: [
      { familia: 'Mesa', normas: ['EN 13060', 'IEC 61010-1 y -2-040', 'PED 2014/68/UE', 'ISO 13485:2016', 'CE bajo MDR'] },
      { familia: 'Central', normas: ['EN 285', 'ANSI/AAMI ST8', 'ISO 13485:2016', 'PED 2014/68/UE', 'ASME'] },
    ],
    diferenciales: ['21 – 1.010 L, de mesa a central', 'EN 285 y AAMI ST8', 'Ciclo envuelto de 4 min a 134 °C'],
    preguntasCotizacion: [
      'Cirugías por día y por especialidad',
      'Cargas por turno y turnos que opera la central',
      'Si procesa bandejas o carros completos',
      'Espacio disponible y necesidad de doble puerta con barrera sanitaria',
      'Acometidas de vapor, agua, desagüe y eléctrica disponibles',
    ],
    relacionadas: [
      { producto: 'svm/papel-para-esterilizacion', porque: 'El vapor solo esteriliza lo que atraviesa. El empaque sostiene la barrera hasta sala.' },
      { producto: '2i/indicadores-biologicos', porque: 'La única evidencia de letalidad del ciclo. Sin ella no hay liberación que sostenga una auditoría.' },
      { producto: 'svm/repuestos', porque: 'Empaquetadura y válvulas son partes de desgaste. En inventario, una parada de días es de horas.' },
    ],
    servicio: [
      'Calificación de instalación y de operación, con prueba de vacío y Bowie-Dick de aceptación',
      'Mantenimiento preventivo con rutina definida por equipo',
      'Repuesto original con existencias en Bogotá',
    ],
    fuenteBrochure: 'https://tuttnauer.com/medical-autoclaves/hospital-cssd/large-autoclaves/44-and-55-compact-series/technical-chart',
    seo: {
      titulo: 'Autoclaves Tuttnauer en Colombia | Servimedical',
      descripcion: 'Autoclaves de vapor Tuttnauer de 21 a 1.010 L: mesa Clase B bajo EN 13060 y central bajo EN 285. Instalación, calificación y repuesto original desde Bogotá.',
    },
  },

  {
    marca: 'tuttnauer',
    slug: 'baja-temperatura',
    linea: 'baja-temperatura',
    nombre: 'PlazMax',
    tipo: 'equipo',
    orden: 3,
    lead: 'Esterilización a baja temperatura con peróxido de hidrógeno vaporizado, por debajo de 55 °C y en ciclos de 32 a 48 minutos. Sin consumo de agua.',
    franja: [
      { label: 'Cámara', valor: '47 · 109 · 162 L' },
      { label: 'Ciclo', valor: '32 – 48 min' },
      { label: 'Temperatura', valor: '50 – 55 °C' },
      { label: 'Norma del equipo', valor: 'ISO 14937' },
    ],
    descripcion: [
      'Tres programas por modelo: estándar, avanzado para lúmenes y endoscopio. La cámara es de aluminio, de una o dos puertas, con canastas de 40 × 60 cm —40 × 90 en el P160—.',
      'No consume agua y sus subproductos son agua y oxígeno. Cada ciclo se imprime y se exporta por USB y Ethernet. Procesa lúmenes de 1 mm de diámetro, hasta 4 m abiertos en ambos extremos y 1,4 m con un extremo cerrado, según el dispositivo de desafío del fabricante.',
    ],
    modelos: [
      {
        encabezados: ['Modelo', 'Cámara', 'Estándar', 'Avanzado', 'Endoscopio', 'Medidas externas', 'Potencia'],
        filas: [
          ['P50', '47 L', '35 min', '40 min', '32 min', '702 × 1528 × 729 mm', '3.100 W'],
          ['P110', '109 L', '39 min', '44 min', '37 min', '702 × 1768 × 729 mm', '4.300 W'],
          ['P160', '162 L', '43 min', '48 min', '41 min', '702 × 1768 × 1029 mm', '4.300 W'],
        ],
      },
    ],
    ciclos: [{ items: ['Prueba de penetración', 'Prueba de fuga'] }],
    instalacion: [
      { label: 'Eléctrico', valor: '230 V monofásico · 13,5 y 18,7 A según modelo' },
      { label: 'Agua', valor: 'No requiere' },
      { label: 'Fondo con dos puertas', valor: '736 mm · 1.036 mm en el P160' },
    ],
    // El sitio dice trifásico, pero los folletos 2020 en español, francés y alemán
    // dicen monofásico, y 13,5 A sólo es posible en monofásico. Se publica
    // monofásico. TODO · confirmación escrita de fábrica.
    // No declara ISO 22441: no va en la franja ni en las normas.
    normasDeclaradas: [
      { normas: ['ISO 14937', 'ISO 13485', 'EN 61010-2-040', 'EN 60601-1', 'CE 0344'] },
    ],
    diferenciales: ['47 – 162 L', 'Desde 32 min', 'Sin consumo de agua'],
    preguntasCotizacion: [
      'Volumen de material termosensible por turno',
      'Tipo de lúmenes y longitudes que hay que procesar',
      'Urgencia de rotación entre cirugías',
      'Disponibilidad de empaque en Tyvek o SMS',
    ],
    relacionadas: [
      { producto: 'svm/papel-para-esterilizacion', porque: 'La celulosa aborta el ciclo. Esta línea necesita barrera en Tyvek.' },
      { producto: '2i/indicadores-quimicos', porque: 'Los indicadores de vapor no viran con peróxido. No sirven como control aquí.' },
      { producto: 'svm/repuestos', porque: 'Electrónica sensible: el canal de fábrica evita paradas largas por una parte menor.' },
    ],
    servicio: [
      'Calificación de instalación y de operación del ciclo de baja temperatura',
      'Mantenimiento preventivo con rutina propia del equipo de plasma',
      'Entrenamiento en carga, empaque compatible y control del proceso',
    ],
    fuenteBrochure: 'https://tuttnauer.com/sites/default/files/brochures/plazmax-low-temperature-plasma-sterilizer--tuttnauer--es--29-11-2020.pdf',
    seo: {
      titulo: 'PlazMax Tuttnauer en Colombia | Servimedical',
      descripcion: 'PlazMax de Tuttnauer: plasma de peróxido de hidrógeno de 47 a 162 L, ciclos de 32 a 48 minutos por debajo de 55 °C y sin consumo de agua.',
    },
  },

  {
    marca: 'tuttnauer',
    slug: 'termodesinfectoras',
    linea: 'termodesinfectoras',
    nombre: 'TIVA',
    tipo: 'equipo',
    orden: 1,
    lead: 'Termodesinfectoras de 65 a 430 L, de 8 a 18 cestas DIN, con secado por aire filtrado HEPA H14 y cuarenta programas.',
    franja: [
      { label: 'Capacidad', valor: 'Hasta 18 cestas DIN' },
      { label: 'Cámara', valor: '65 – 430 L' },
      { label: 'Desinfección', valor: 'Más de 90 °C' },
      { label: 'Secado', valor: 'Aire filtrado HEPA H14' },
    ],
    descripcion: [
      'La familia va desde un equipo bajo mesón para quirófano hasta una lavadora de central con puerta de barrera automática. Todas llevan cámara de 316L, dos bombas dosificadoras con caudalímetro para detergente alcalino y neutralizador ácido, y monitoreo de rotación de los brazos de aspersión. Las fabrica AT-OS, en Italia, para Tuttnauer.',
      'El equipo reconoce el carro cargado y mide la conductividad en el enjuague final, que es por donde entra el manchado del instrumental. El secado es por aire caliente con prefiltro y filtro HEPA H14.',
    ],
    modelos: [
      {
        encabezados: ['Modelo', 'Cámara', 'Cestas DIN', 'Puerta', 'Medidas externas'],
        filas: [
          ['Tiva 2', '65 L', '—', 'Vidrio, manual', '595 × 520 × 600 mm'],
          ['Tiva 8', '165 L', '8, en 4 niveles', 'Vidrio, manual batiente', '600 o 900 × 650 × 860 mm'],
          ['Tiva 10-M', '265 L', '12, en 6 niveles', 'Vidrio, manual batiente · 1 o 2 puertas', '650 × 700 × 1850 mm'],
          ['Tiva 10-V', '265 L', '12, en 6 niveles', 'Vidrio, automática corrediza · 1 o 2 puertas', '680 × 700 × 1950 mm'],
          ['Tiva 15-V', '430 L', '18, en 6 niveles', 'Automática corrediza · 1 o 2 puertas', '1000 × 900 × 1900 mm'],
        ],
      },
    ],
    // TODO · el Tiva 8 figura con 165 L en la web y 175 L en los folletos.
    // TODO · ISO 15883 sólo aparece en el folleto del Tiva 2. Las páginas actuales
    //   no declaran la norma ni el valor A0: pedir la declaración de conformidad
    //   antes de publicarlas.
    instalacion: [
      { label: 'Agua', valor: 'Fría ablandada y desmineralizada · caliente opcional' },
      { label: 'Drenaje', valor: 'DN40' },
      { label: 'Eléctrico', valor: 'Tiva 8: 6,3 a 8,8 kW · 230 V monofásico o 380/415 V trifásico' },
      { label: 'Calentamiento', valor: 'Eléctrico, por vapor o híbrido' },
    ],
    diferenciales: ['Hasta 18 cestas DIN', '40 programas', 'Secado HEPA H14'],
    preguntasCotizacion: [
      'Número de procedimientos por día y tipo de instrumental',
      'Cantidad de carros que hay que procesar por turno',
      'Calidad del agua de alimentación disponible',
      'Espacio en el área de lavado y paso hacia la zona limpia',
    ],
    relacionadas: [
      { producto: 'svm/mobiliario-acero-inoxidable', porque: 'Sin puesto de prelavado y escurrido, el material entra con residuo y el ciclo no lo corrige.' },
      { producto: 'svm/papel-para-esterilizacion', porque: 'Lo que sale limpio se empaca de inmediato, o espera descubierto.' },
      { producto: 'svm/repuestos', porque: 'Bombas, válvulas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
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
    slug: 'termodesinfectoras',
    linea: 'termodesinfectoras',
    nombre: 'SQ-X y SQ-KX',
    tipo: 'equipo',
    orden: 1,
    lead: 'Termodesinfectoras de 350 a 560 L, de 8 a 12 cestas DIN, que lavan, desinfectan térmicamente y secan en un solo ciclo.',
    franja: [
      { label: 'Capacidad', valor: '8 a 12 cestas DIN' },
      { label: 'Cámara', valor: '350 – 560 L' },
      { label: 'Desinfección', valor: 'Más de 90 °C · 93–97 °C en la serie KX' },
      { label: 'Alimentación', valor: '380 V trifásico' },
    ],
    descripcion: [
      'La serie KX trabaja entre 93 y 97 °C en la fase de desinfección, con doce cestas en cuatro niveles y programas estándar más configurables. La SQ-X360 es la opción compacta, de doble puerta, con ocho cestas en cuatro niveles.',
      'El secado es por aire caliente por encima de 100 °C. Todas operan a 380 V trifásico y con presión de agua de 0,2 a 0,5 MPa.',
    ],
    modelos: [
      {
        encabezados: ['Modelo', 'Cámara', 'Cestas DIN', 'Medidas de cámara', 'Medidas externas', 'Potencia'],
        filas: [
          ['SQ-X360', '350 L', '8, en 4 niveles', '627 × 595 × 980 mm', '950 × 825 × 2060 mm', '31 kVA'],
          ['SQ-KX-490', '470 L', '12, en 4 niveles', '693 × 728 × 935 mm', '1190 × 900 × 2020 mm', '30 kVA'],
          ['SQ-KX-530', '536 L', '12, en 4 niveles', '693 × 828 × 935 mm', '1270 × 1000 × 2020 mm', '40 kVA'],
          ['SQ-X560', '560 L', '—', '750 × 740 × 940 mm', '1350 × 1050 × 2100 mm', '31 kW'],
        ],
      },
    ],
    // TODO · cestas de la SQ-X560: las fuentes dan 8 y 12.
    // TODO · número de programas de la KX: la ficha dice «6 + 11» en un sitio y
    //   «6 + DIY» en otro. Mientras tanto no se publica una cifra.
    // TODO · no declara ISO 15883 ni el valor A0.
    instalacion: [
      { label: 'Eléctrico', valor: 'Trifásico 380 V · 50 Hz' },
      { label: 'Agua', valor: '0,2 – 0,5 MPa' },
      { label: 'Ruido', valor: '≤ 75 dB' },
    ],
    normasDeclaradas: [{ normas: ['CE', 'ISO 13485'] }],
    diferenciales: ['Hasta 12 cestas DIN', '93 – 97 °C en la serie KX', '380 V trifásico'],
    preguntasCotizacion: [
      'Número de procedimientos por día y tipo de instrumental',
      'Cantidad de carros que hay que procesar por turno',
      'Calidad del agua de alimentación disponible',
      'Espacio en el área de lavado y paso hacia la zona limpia',
    ],
    relacionadas: [
      { producto: 'svm/mobiliario-acero-inoxidable', porque: 'Sin puesto de prelavado y escurrido, el material entra con residuo y el ciclo no lo corrige.' },
      { producto: 'svm/papel-para-esterilizacion', porque: 'Lo que sale limpio se empaca de inmediato, o espera descubierto.' },
      { producto: 'svm/repuestos', porque: 'Bombas, válvulas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
    ],
    servicio: [
      'Instalación con conexión hidráulica y de desagüe, y puesta en marcha',
      'Mantenimiento preventivo con protocolo definido por equipo',
      'Entrenamiento al personal de la zona de lavado',
    ],
    seo: {
      titulo: 'Termodesinfectoras Sanqiang en Colombia | Servimedical',
      descripcion: 'SQ-X y SQ-KX de Sanqiang: termodesinfectoras de 350 a 560 L, de 8 a 12 cestas DIN, con desinfección a 93–97 °C y secado por aire caliente.',
    },
  },

  {
    marca: 'sanqiang',
    slug: 'autoclaves',
    linea: 'autoclaves',
    nombre: 'Autoclaves',
    tipo: 'equipo',
    orden: 2,
    lead: 'Autoclaves de vapor de 18 a 1.500 L: de mesa Clase B, horizontales compactos, y de vacío pulsante para centrales de alto volumen.',
    franja: [
      { label: 'Cámara', valor: '18 – 1.500 L' },
      { label: 'Temperatura', valor: '121 y 134 °C' },
      { label: 'Uniformidad', valor: '± 0,5 °C, en central' },
      { label: 'Vacío final', valor: '−96 kPa, en central' },
    ],
    descripcion: [
      'Los equipos de mesa SQ-Z son Clase B, a 220 V, con ciclos de 18 a 40 minutos para instrumental sólido y envuelto. Los horizontales SQ-M100 y SQ-M200, bajo EN 13060, sirven a clínicas y quirófanos satélite con generador de vapor integrado.',
      'En la central, la serie MD.JD y PVS·JD extrae el aire con 1 a 99 pulsos de vacío programables, hasta −96 kPa, y sostiene una uniformidad de ±0,5 °C en cámara. El secado es al vacío y el control, por pantalla táctil con impresora térmica y USB.',
    ],
    modelos: [
      {
        familia: 'Mesa, Clase B',
        encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Medidas externas', 'Peso', 'Potencia'],
        filas: [
          ['SQ-Z18', '18 L', 'Ø246 × 360 mm', '715 × 513 × 425 mm', '45 kg', '1,7 kVA · 220 V'],
          ['SQ-Z23', '23 L', 'Ø246 × 450 mm', '715 × 513 × 425 mm', '49 kg', '1,7 kVA · 220 V'],
          ['SQ-Z45', '45 L', 'Ø320 × 620 mm', '900 × 565 × 600 mm', '108 kg', '3,5 kVA · 220 V'],
        ],
      },
      {
        familia: 'Horizontales compactos · EN 13060',
        encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Medidas externas', 'Peso', 'Potencia'],
        filas: [
          ['SQ-M100', '100 L', 'Ø420 × 700 mm', '1150 × 770 × 1520 mm', '310 kg', '15 kVA · 380 V'],
          ['SQ-M200', '200 L', 'Ø500 × 1000 mm', '1360 × 810 × 1580 mm', '360 kg', '18 kVA · 380 V'],
        ],
      },
      {
        familia: 'Central · vacío pulsante',
        nota: 'De las tallas de 255, 360 y 450 L el fabricante sólo publica el volumen.',
        encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Medidas externas', 'Peso'],
        filas: [
          ['MD.JD-250', '255 L', '—', '—', '—'],
          ['MD.JD-360', '360 L', '—', '—', '—'],
          ['MD.JD-450', '450 L', '—', '—', '—'],
          ['PVS·JD-600', '638 L', '610 × 910 × 1150 mm', '1440 × 1950 × 1620 mm', '1.250 kg'],
          ['PVS·JD-800', '832 L', '610 × 910 × 1500 mm', '1440 × 1950 × 2050 mm', '1.400 kg'],
          ['PVS·JD-1000', '1.001 L', '610 × 910 × 1820 mm', '1440 × 1950 × 2100 mm', '1.550 kg'],
          ['PVS·JD-1200', '1.203 L', '680 × 1180 × 1500 mm', '1480 × 1980 × 2100 mm', '1.950 kg'],
          ['PVS·JD-1500', '1.500 L', '680 × 1180 × 1900 mm', '1616 × 2150 × 2315 mm', '2.390 kg'],
        ],
      },
    ],
    // TODO · qué significan los sufijos S y D. Por convención del sector serían
    //   una y dos puertas, pero el fabricante no lo define: no se publica.
    // TODO · tiempos de ciclo de los equipos de central, no publicados.
    // TODO · una ficha del SQ-M100 dice 220 V y otra 380 V.
    ciclos: [
      {
        familia: 'Mesa · SQ-Z23, tiempo total',
        items: [
          'Sólidos 134 °C · 18–30 min',
          'Envuelto 134 °C · 30–40 min',
          'Textil · 45–65 min',
          'Priones · 45–70 min',
          'Plásticos 105 °C · 50–65 min',
          'Bowie-Dick · 22–35 min',
          'Prueba de vacío · 4–10 min',
        ],
      },
    ],
    instalacionFamilia: 'Central',
    instalacion: [
      { label: 'Presión de trabajo', valor: 'Máximo 0,28 MPa' },
      { label: 'Temperatura máxima', valor: '139 °C' },
      { label: 'Fuga de vacío', valor: '≤ 0,13 kPa/min' },
      { label: 'Eléctrico', valor: '380 V · 50 Hz · 48–54 kVA' },
    ],
    // No declara EN 285. No publicar «EN 285» ni «Clase B» para la central.
    normasDeclaradas: [
      { familia: 'Mesa', normas: ['Clase B'] },
      { familia: 'Compactos', normas: ['EN 13060'] },
      { familia: 'Central', normas: ['CE', 'ISO 13485', 'ASME'] },
    ],
    diferenciales: ['18 – 1.500 L, de mesa a central', 'Uniformidad ± 0,5 °C', '1 a 99 pulsos de vacío'],
    preguntasCotizacion: [
      'Cargas por turno y turnos que opera la central',
      'Si procesa bandejas o carros completos',
      'Material que procesa y tamaño promedio del set',
      'Acometidas de vapor, agua, desagüe y eléctrica disponibles',
    ],
    relacionadas: [
      { producto: 'svm/papel-para-esterilizacion', porque: 'El vapor solo esteriliza lo que atraviesa. El empaque sostiene la barrera hasta sala.' },
      { producto: '2i/indicadores-biologicos', porque: 'La evidencia de letalidad del ciclo, sin la cual no hay liberación.' },
      { producto: 'svm/repuestos', porque: 'Empaquetadura y válvulas definen el tiempo de parada cuando fallan.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo y correctivo',
      'Repuesto original por importación directa',
    ],
    seo: {
      titulo: 'Autoclaves Sanqiang en Colombia | Servimedical',
      descripcion: 'Autoclaves Sanqiang de 18 a 1.500 L: mesa Clase B, horizontales compactos EN 13060 y vacío pulsante de central con uniformidad de ±0,5 °C.',
    },
  },

  {
    marca: 'sanqiang',
    slug: 'baja-temperatura',
    linea: 'baja-temperatura',
    nombre: 'SQ-WD',
    tipo: 'equipo',
    orden: 3,
    lead: 'Plasma de peróxido de hidrógeno de 100 a 190 L, con ciclo corto de 30 minutos y agente en cápsula.',
    franja: [
      { label: 'Cámara', valor: '100 · 135 · 190 L' },
      { label: 'Ciclo', valor: '30 / 50 / 60 min' },
      { label: 'Temperatura', valor: '45 – 55 °C' },
      { label: 'Norma del equipo', valor: 'EN ISO 14937' },
    ],
    descripcion: [
      'Cámara rectangular en aluminio 5052, control por PLC Siemens con pantalla táctil de siete pulgadas e impresora. Tres ciclos: corto de 30 minutos para carga general, largo de 50 y de lúmenes de 60.',
      'El peróxido viene en cápsula, lo que elimina la manipulación directa del agente por parte del operario. Opera a 220 V monofásico, que es una diferencia práctica frente a los equipos que exigen trifásico. Los tres modelos comparten gabinete: solo cambia la cámara.',
    ],
    modelos: [
      {
        encabezados: ['Modelo', 'Cámara', 'Medidas de cámara', 'Medidas externas', 'Peso', 'Potencia'],
        filas: [
          ['SQ-WD-100', '100 L', '700 × 430 × 360 mm', '1067 × 790 × 1782 mm', '301 kg', '3,4 kVA'],
          ['SQ-WD-135', '135 L', '750 × 450 × 400 mm', '1067 × 790 × 1782 mm', '308 kg', '3,5 kVA'],
          ['SQ-WD-190', '190 L', '820 × 510 × 460 mm', '1067 × 790 × 1782 mm', '341 kg', '4,3 kVA'],
        ],
      },
    ],
    // TODO · límite de lúmenes de la serie SQ-WD. El dato de 1 mm × 1 m rígido y
    //   3 m flexible es de las series SQ-D y SQ-DZ, no de esta.
    // TODO · registro INVIMA del SQ-WD-135.
    instalacion: [
      { label: 'Eléctrico', valor: '220 V monofásico · 3,4 a 4,3 kVA según modelo' },
      { label: 'Agua', valor: 'No requiere' },
    ],
    normasDeclaradas: [
      { normas: ['EN ISO 14937', 'EN ISO 13485:2016', 'EN 61010-2-040', 'GB 27955-2020'] },
    ],
    diferenciales: ['Hasta 190 L', 'Ciclo corto de 30 min', 'Agente en cápsula · 220 V'],
    preguntasCotizacion: [
      'Volumen de material termosensible por turno',
      'Tipo de lúmenes y longitudes que hay que procesar',
      'Urgencia de rotación entre cirugías',
      'Disponibilidad de empaque en Tyvek o SMS',
    ],
    relacionadas: [
      { producto: 'svm/papel-para-esterilizacion', porque: 'La celulosa aborta el ciclo. Esta línea necesita barrera en Tyvek.' },
      { producto: '2i/indicadores-quimicos', porque: 'Los indicadores de vapor no viran con peróxido. No sirven como control aquí.' },
      { producto: 'svm/repuestos', porque: 'Electrónica sensible: el canal de fábrica evita paradas largas por una parte menor.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo con rutina propia del equipo de plasma',
      'Entrenamiento en carga y empaque compatible',
    ],
    seo: {
      titulo: 'Plasma SQ-WD de Sanqiang en Colombia | Servimedical',
      descripcion: 'SQ-WD de Sanqiang: plasma de peróxido de 100 a 190 L, ciclo corto de 30 minutos, agente en cápsula y alimentación a 220 V monofásico.',
    },
  },

  {
    marca: 'sanqiang',
    slug: 'residuos-hospitalarios',
    linea: 'residuos-hospitalarios',
    /* Oculto. Sanqiang no muestra ningún equipo de residuos en su sitio, en su
       tienda oficial ni en búsquedas abiertas: la existencia la confirmó Felipe,
       no el fabricante. No se afirma en el sitio un equipo que no se puede
       documentar. Se publica cuando llegue la ficha del proveedor con modelo,
       capacidad, proceso, reducción log validada, acometidas y certificaciones. */
    publicado: false,
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
    diferenciales: ['Tratamiento en sitio', 'Mismo fabricante que la central', 'Importación directa'],
    preguntasCotizacion: [
      'Kilos de residuo biosanitario por día y por turno',
      'Si el tratamiento se hace en la central o en un recinto aparte',
      'Costo actual de la gestión externa, para comparar',
      'Acometidas disponibles en el recinto de residuos',
    ],
    relacionadas: [
      { producto: 'svm/mobiliario-acero-inoxidable', porque: 'El residuo se mueve en carro cerrado y diferenciado, nunca en el mismo que el material estéril.' },
      { producto: '2i/indicadores-biologicos', porque: 'La inactivación se verifica con control biológico, igual que una carga de esterilización.' },
      { producto: 'svm/repuestos', porque: 'El sistema de trituración es la parte de mayor desgaste del equipo.' },
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
    lead: 'Esterilizador y triturador integrado: el residuo biosanitario se tritura y se esteriliza con vapor a 134 °C en un solo recipiente, dentro del hospital.',
    franja: [
      { label: 'Cámara', valor: '150 L' },
      { label: 'Capacidad', valor: '15 – 30 kg/h' },
      { label: 'Ciclo', valor: '30 – 40 min' },
      { label: 'Inactivación', valor: 'SAL superior a 6 log₁₀' },
    ],
    descripcion: [
      'El ISS carga el residuo, lo tritura con cuchillas reversibles y lo esteriliza con vapor a 134 °C sin abrir el recipiente. No hay manipulación de residuo infeccioso entre la trituración y la esterilización, que es donde está el riesgo en los sistemas de dos equipos.',
      'El residuo sale estéril, seco y reducido a una quinta parte de su volumen, y se dispone como residuo ordinario. Celitron fabrica la línea en tres tamaños —25, 150 y 560 L—; la ficha vigente es la del modelo de 150 L, pensado para hospitales medianos.',
    ],
    modelos: [
      {
        familia: 'Modelo con ficha vigente',
        encabezados: ['Modelo', 'Cámara', 'Capacidad', 'Ciclo', 'Medidas externas', 'Peso', 'Potencia'],
        filas: [
          ['ISS AC-575', '150 L · Ø502 × 800 mm', '15 – 30 kg/h', '30 – 40 min', '1290 × 2150 × 2039 mm', '880 kg', '36 kW con generador · 380–400 V trifásico'],
        ],
      },
    ],
    // TODO · fichas vigentes del ISS de 25 L y de 560 L. Sus capacidades sólo
    //   aparecen en un folleto de 2019 alojado por un tercero, así que no entran
    //   ni en la tabla ni en la franja.
    ciclos: [{ items: ['Residuos', 'Textiles', 'Residuo especial', 'Vidrio', 'Prueba dinámica', 'Limpieza'] }],
    instalacion: [
      { label: 'Eléctrico', valor: 'Trifásico 380–400 V · 36 kW con generador' },
      { label: 'Accesorios estándar', valor: 'Generador de vapor, ósmosis inversa y drenaje' },
    ],
    normasDeclaradas: [
      { normas: ['CE', 'Directiva de Máquinas 2006/42/CE', 'PED 2014/68/UE', 'EMC 2014/30/UE', 'RoHS II'] },
    ],
    diferenciales: ['Un solo recipiente', '15 – 30 kg/h', 'Reducción a una quinta parte'],
    preguntasCotizacion: [
      'Kilos de residuo biosanitario por día y por turno',
      'Espacio disponible en el recinto de residuos y acceso para el contenedor',
      'Costo actual de la gestión externa, para comparar',
      'Autorización ambiental vigente de la institución',
    ],
    relacionadas: [
      { producto: 'svm/mobiliario-acero-inoxidable', porque: 'El residuo se mueve en carro cerrado y diferenciado hasta el recinto de tratamiento.' },
      { producto: '2i/indicadores-biologicos', porque: 'La inactivación se verifica con control biológico, igual que una carga de esterilización.' },
      { producto: 'svm/repuestos', porque: 'Las cuchillas de trituración son la parte de mayor desgaste del equipo.' },
    ],
    servicio: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento del circuito de vapor y del sistema de trituración',
      'Entrenamiento al personal del recinto de residuos',
    ],
    fuenteBrochure: 'https://celitron.com/storage/download/iss-medical-en.pdf',
    seo: {
      titulo: 'Sistema ISS de Celitron en Colombia | Servimedical',
      descripcion: 'ISS de Celitron: tritura y esteriliza residuo biosanitario en un solo recipiente, de 15 a 30 kg por hora, con inactivación superior a 6 log₁₀.',
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
      { label: 'Por lote · serie L', valor: '20 – 300 kg/ciclo' },
      { label: 'Planta · serie A', valor: '500 – 1.800 kg/ciclo' },
      { label: 'Inactivación', valor: 'Hasta 8 log₁₀' },
      { label: 'Temperatura', valor: '135 – 155 °C' },
    ],
    descripcion: [
      'La serie L tritura el residuo antes de la esterilización y trabaja por lote, para hospitales que procesan en sitio con poco espacio. La serie A tritura después del vapor y es la planta centralizada de alto volumen, para una región o un gestor.',
      'Ambas tienen control por pantalla táctil Siemens y trituradora de doble motor con reversa automática contra atascos. El alcance es llave en mano: generador de vapor, sistema de presurización y cargue y descargue automáticos.',
    ],
    modelos: [
      {
        encabezados: ['Modelo', 'Tipo', 'Capacidad', 'Ciclo', 'Proceso', 'Inactivación'],
        filas: [
          ['AKR250L', 'Trituración previa · hospital', '20 – 30 kg/ciclo', '30 – 35 min', '135–140 °C · 3–4 bar', '8 log₁₀'],
          ['AKR500L', 'Trituración previa · hospital', '50 – 70 kg/ciclo', '30 – 35 min', '135–140 °C · 3–4 bar', '8 log₁₀'],
          ['AKR1000L', 'Trituración previa · hospital', '100 – 130 kg/ciclo', '40 – 45 min', '135–140 °C · 3–4 bar', '8 log₁₀'],
          ['AKR2500L', 'Trituración previa · planta', '250 – 300 kg/ciclo', '50 – 60 min', '135–140 °C · 3–4 bar', '8 log₁₀'],
          ['AKR500A', 'Trituración posterior · planta', '500 – 700 kg/ciclo', '35 – 40 min', '140–155 °C · 4–5 bar', '6 log₁₀'],
          ['AKR1000A', 'Trituración posterior · planta', '1.000 – 1.250 kg/ciclo', '45 – 50 min', '140–155 °C · 4–5 bar', '6 log₁₀'],
          ['AKR1500A', 'Trituración posterior · planta', '1.500 – 1.800 kg/ciclo', '50 – 55 min', '140–155 °C · 4–5 bar', '6 log₁₀'],
        ],
      },
    ],
    instalacion: [
      { label: 'Alcance', valor: 'Llave en mano: generador de vapor, presurización y cargue automático' },
      { label: 'Control', valor: 'Pantalla táctil Siemens' },
    ],
    // La validación del Instituto Robert Koch es una declaración del fabricante
    // sin informe público. Se publica como declaración, no como hecho.
    // TODO · pedir el informe de validación y el STAATT IV.
    // TODO · no se publican el volumen de cámara de la serie A (tres versiones
    //   distintas entre documentos) ni las potencias (los dos PDF no coinciden).
    normasDeclaradas: [
      { normas: ['PED 2014/68/UE', 'ASME VIII', 'AD 2000', 'ISO 9001:2015', 'Validación declarada por el fabricante: Instituto Robert Koch · STAATT IV'] },
    ],
    diferenciales: ['De hospital a planta centralizada', 'Hasta 8 log₁₀', 'Trituradora de fabricación propia'],
    preguntasCotizacion: [
      'Kilos de residuo biosanitario por día y por turno',
      'Si es tratamiento para una sola institución o para varias',
      'Espacio y acometidas disponibles en el recinto de tratamiento',
      'Autorización ambiental vigente',
    ],
    relacionadas: [
      { producto: 'svm/mobiliario-acero-inoxidable', porque: 'El residuo se mueve en carro cerrado y diferenciado hasta el recinto de tratamiento.' },
      { producto: '2i/indicadores-biologicos', porque: 'La inactivación se verifica con control biológico, igual que una carga de esterilización.' },
      { producto: 'svm/repuestos', porque: 'La trituradora es la parte de mayor desgaste de todo el sistema.' },
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
    lead: 'Indicadores de las clases 4, 5 y 6 de la ISO 11140-1, prueba de Bowie-Dick y paquetes de prueba, para vapor, peróxido de hidrógeno, óxido de etileno y formaldehído.',
    franja: [
      { label: 'Clases', valor: '2 · 4 · 5 · 6' },
      { label: 'Métodos', valor: 'Vapor · peróxido · óxido de etileno · formaldehído' },
      { label: 'Lectura', valor: 'Inmediata, por viraje' },
    ],
    descripcion: [
      'El portafolio cubre los dos puntos que la central tiene que documentar: el primer ciclo del día, con la prueba de Bowie-Dick, y el centro de cada paquete, con multivariables, integradores y emuladores.',
      'El integrador de vapor es Tipo 5 y responde a las tres variables críticas del ciclo: tiempo, temperatura y presencia de vapor. Es el que sigue el comportamiento de un indicador biológico.',
    ],
    modelos: [
      {
        encabezados: ['Tipo', 'Producto', 'Método', 'Presentación'],
        filas: [
          ['2', 'Bowie-Dick', 'Vapor', '—'],
          ['—', 'Paquete de prueba (PCD)', 'Vapor', '—'],
          ['4', 'Multivariable', 'Vapor', '—'],
          ['4', 'Multivariable', 'Peróxido de hidrógeno vaporizado', '—'],
          ['4', 'Multivariable', 'Formaldehído', '—'],
          ['5', 'Integrador', 'Vapor', '25 · 100 · 250'],
          ['5', 'Integrador', 'Óxido de etileno', '—'],
          ['6', 'Emulador', 'Vapor', '—'],
        ],
      },
    ],
    // TODO · presentaciones y unidades por caja, que están en las fichas del
    //   portal de clientes de 2i.
    // El Tipo 2 del Bowie-Dick lo asigna el distribuidor; 2i no le asigna tipo.
    // 2i no tiene etiqueta de proceso Tipo 1 en su catálogo.
    normasDeclaradas: [{ normas: ['ISO 11140-1'] }],
    diferenciales: ['4 métodos cubiertos', 'Integrador Tipo 5', 'Bowie-Dick y paquete de prueba'],
    preguntasCotizacion: [
      'Cargas por día y por equipo',
      'Protocolo interno de monitoreo de la institución',
      'Método de esterilización de cada equipo',
      'Nivel de evidencia que exige el comité de infecciones',
    ],
    relacionadas: [
      { producto: '2i/indicadores-biologicos', porque: 'El químico es lectura inmediata, pero indicio. El biológico es la prueba.' },
      { producto: 'svm/papel-para-esterilizacion', porque: 'Uno va dentro del paquete y otro sobre la barrera. El consumo se mueve al mismo ritmo.' },
      { producto: 'sanqiang/baja-temperatura', porque: 'El indicador se escoge contra el método del equipo: los de vapor no viran con peróxido.' },
    ],
    servicio: [
      'Definición del esquema de monitoreo junto con la central',
      'Abastecimiento programado por carga y por equipo',
      'Entrenamiento en lectura e interpretación de viraje',
    ],
    seo: {
      titulo: 'Indicadores químicos 2i en Colombia | Servimedical',
      descripcion: 'Indicadores químicos 2i de las clases 4, 5 y 6 de ISO 11140-1, prueba de Bowie-Dick y paquetes de prueba para vapor, peróxido, óxido de etileno y formaldehído.',
    },
  },

  {
    marca: '2i',
    slug: 'indicadores-biologicos',
    linea: 'indicadores',
    nombre: 'Indicadores biológicos',
    tipo: 'consumible',
    orden: 2,
    lead: 'Indicadores biológicos autocontenidos con lectura desde 19 minutos en vapor, y lectoras e incubadora propias.',
    franja: [
      { label: 'Lectura en vapor', valor: '19 min a 24 h' },
      { label: 'Métodos', valor: 'Vapor · peróxido · formaldehído · óxido de etileno' },
      { label: 'Equipos', valor: 'Lectoras de 4 y 12 pozos' },
    ],
    descripcion: [
      'El indicador de vapor lleva un mínimo de 10⁶ esporas de Geobacillus stearothermophilus, con un valor D a 121 °C de entre 1,5 y 3 minutos, y se incuba a 60 ± 2 °C en lectora automática. Cumple la ANSI/AAMI/ISO 11138-1:2017.',
      'Hay versiones de lectura rápida para peróxido, formaldehído y óxido de etileno. La línea se completa con lectoras de cuatro y doce pozos y una mini incubadora de seis.',
    ],
    modelos: [
      {
        encabezados: ['Producto', 'Método', 'Lectura', 'Caja'],
        filas: [
          ['Vapor 19 min', 'Vapor', '19 min', '50'],
          ['Vapor 1 h', 'Vapor', '1 h', '50'],
          ['Vapor 3 h', 'Vapor', '3 h', '50'],
          ['Vapor 8 h', 'Vapor', '8 h', '50'],
          ['Vapor 24 h', 'Vapor', '24 h', '10'],
          ['VH₂O₂', 'Peróxido de hidrógeno', '24 min / 8 h', '50'],
          ['FORM', 'Formaldehído', '2 h / 8 h', '50'],
          ['EO', 'Óxido de etileno', '4 h / 12 h', '50'],
        ],
      },
    ],
    // TODO · para peróxido, formaldehído y óxido de etileno no se publican ni
    //   organismo ni población: no están en la ficha.
    // TODO · el sitio de 2i llama al EO de 12 h «indicador pH». Confirmar.
    normasDeclaradas: [{ familia: 'Vapor', normas: ['ANSI/AAMI/ISO 11138-1:2017'] }],
    diferenciales: ['Lectura desde 19 min', '4 métodos cubiertos', 'Lectoras e incubadora propias'],
    preguntasCotizacion: [
      'Frecuencia de control biológico que define el protocolo de la institución',
      'Número de equipos y de cargas que hay que cubrir',
      'Si la central tiene incubadora propia o depende de un laboratorio externo',
      'Tiempo de lectura que tolera la operación sin frenar el giro quirúrgico',
    ],
    relacionadas: [
      { producto: '2i/indicadores-quimicos', porque: 'El biológico se lee en horas; el químico, en el momento. La carga se libera con los dos.' },
      { producto: 'tuttnauer/autoclaves', porque: 'Verifica el equipo, no solo la carga. Un resultado no conforme es un dato de mantenimiento.' },
      { producto: 'svm/repuestos', porque: 'Un resultado no conforme repetido suele ser el equipo. Ahí entra el repuesto.' },
    ],
    servicio: [
      'Definición de la frecuencia de control junto con la central',
      'Abastecimiento programado, con reserva para cargas con implantes',
      'Entrenamiento en incubación, lectura y conducta ante resultado no conforme',
    ],
    seo: {
      titulo: 'Indicadores biológicos 2i en Colombia | Servimedical',
      descripcion: 'Indicadores biológicos 2i autocontenidos con lectura desde 19 minutos en vapor, bajo ISO 11138-1, y lectoras e incubadora propias.',
    },
  },

  /* ════════════════════════════════════════════════════ SERVIMEDICAL ════ */
  {
    marca: 'svm',
    /* La línea abarca dos etapas; esta mitad es la barrera, no la evidencia. */
    etapa: 'empaque',
    slug: 'papel-para-esterilizacion',
    linea: 'indicadores',
    nombre: 'Papel para esterilización y Tyvek',
    tipo: 'consumible',
    orden: 1,
    lead: 'Empaque de barrera estéril para cada método: papel para esterilización y rollos papel-película para vapor, y Tyvek para plasma y óxido de etileno.',
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
    normasDeclaradas: [{ normas: ['ISO 11607-1 y -2', 'EN 868-2, -3 y -5', 'ISO 11140-1'] }],
    diferenciales: ['Papel-película y Tyvek', 'ISO 11607 y EN 868', 'Abastecimiento programado'],
    preguntasCotizacion: [
      'Paquetes por turno y tamaño promedio del set',
      'Método de esterilización de cada línea de material',
      'Si el empaque es de sellado térmico o de doblado',
      'Consumo mensual actual, para programar el abastecimiento',
    ],
    relacionadas: [
      { producto: '2i/indicadores-quimicos', porque: 'La cinta dice que el paquete pasó por el equipo. Lo de adentro lo dice el indicador interno.' },
      { producto: 'svm/mobiliario-acero-inoxidable', porque: 'La superficie y la altura deciden cuántos paquetes salen por turno y en qué estado.' },
      { producto: 'sanqiang/autoclaves', porque: 'El método de esterilización decide la barrera, no al revés: celulosa en vapor, Tyvek en plasma.' },
    ],
    servicio: [
      'Abastecimiento programado contra el consumo real de la central',
      'Acompañamiento en la elección de barrera por método de esterilización',
      'Entrenamiento en conformación y sellado de paquete',
    ],
    seo: {
      titulo: 'Papel para esterilización y Tyvek | Servimedical',
      descripcion: 'Rollos papel-película para vapor y Tyvek para plasma, bajo ISO 11607 y EN 868, con sello de 6 mm y abastecimiento programado desde Bogotá.',
    },
  },

  {
    marca: 'svm',
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
    modelos: [
      {
        encabezados: ['Pieza', 'Zona'],
        filas: [
          ['Mesón de lavado con poceta y escurridero', 'Sucia'],
          ['Mesa de inspección y empaque', 'Limpia'],
          ['Carro de transporte abierto y cerrado, diferenciado por flujo', 'Sucia y estéril'],
          ['Carro de carga y descarga de autoclave', 'Limpia y estéril'],
          ['Estantería abierta y armario cerrado', 'Estéril'],
        ],
      },
    ],
    // TODO · calibre, acabado, plazos de fabricación y fotos de proyectos entregados.
    diferenciales: ['AISI 304 y 316', 'A la medida del plano', 'Soldadura pulida sin uniones'],
    preguntasCotizacion: [
      'Plano del área y zonificación de sucio, limpio y estéril',
      'Número de puestos de empaque simultáneos y altura de trabajo del personal',
      'Paquetes en circulación y tiempo de permanencia en estéril',
      'Distancia entre la central y las salas, y dimensiones de puertas y ascensores',
    ],
    relacionadas: [
      { producto: 'svm/papel-para-esterilizacion', porque: 'El paquete se conforma en la mesa y se guarda en la estantería. Se dimensionan juntas.' },
      { producto: 'celitron/residuos-hospitalarios', porque: 'El residuo sale de la central en carro cerrado y diferenciado, hasta el recinto de tratamiento.' },
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
    marca: 'svm',
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
    modelos: [
      {
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
    ],
    // TODO confirmar con Felipe · qué categorías hay en existencia real y para qué marcas.
    diferenciales: ['Original de fábrica', 'Inventario en Bogotá', 'Dentro y fuera de garantía'],
    preguntasCotizacion: [
      'Marca, modelo y número de serie del equipo',
      'Qué hace el equipo y en qué momento se detiene',
      'Si el equipo está parado o la falla es intermitente',
      'Si busca una reposición puntual o un plan programado',
    ],
    relacionadas: [
      { producto: 'tuttnauer/autoclaves', porque: 'La empaquetadura de puerta es la falla más frecuente y la más fácil de prevenir.' },
      { producto: 'sanqiang/termodesinfectoras', porque: 'Bombas y sensores se desgastan en un equipo que trabaja con agua todo el día.' },
      { producto: 'tuttnauer/baja-temperatura', porque: 'La electrónica del ciclo de baja temperatura no admite partes equivalentes.' },
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

/* Un producto sin publicar no existe para el sitio: ni ruta, ni menú, ni
   tarjeta en la línea, ni destino de venta cruzada. Sigue en los datos, con
   su copy listo, para que publicarlo sea cambiar una línea. */
export const publicados = productos.filter((p) => p.publicado !== false);

export const idProducto = (p: { marca: string; slug: string }) => `${p.marca}/${p.slug}`;
export const urlProducto = (p: { marca: string; slug: string }) => `/marcas/${p.marca}/${p.slug}`;

export const productoPorId = (id: string) => publicados.find((p) => idProducto(p) === id);

/** Los productos de una marca, en su orden. */
export const productosDeMarca = (slugMarca: string) =>
  publicados.filter((p) => p.marca === slugMarca).sort((a, b) => a.orden - b.orden);

/** Los productos de una línea, en el orden de las marcas del portafolio. */
export const productosDeLinea = (slugLinea: string) =>
  publicados
    .filter((p) => p.linea === slugLinea)
    .sort((a, b) => ORDEN_MARCA.indexOf(a.marca) - ORDEN_MARCA.indexOf(b.marca));

/** Las líneas que una marca cubre, en el orden del ciclo. */
export const lineasDeMarca = (slugMarca: string) =>
  lineas
    .filter((l) => publicados.some((p) => p.marca === slugMarca && p.linea === l.slug))
    .sort((a, b) => a.orden - b.orden);

/** Una línea con un solo producto no merece página propia: redirige a él. */
export const lineaTienePagina = (slugLinea: string) => productosDeLinea(slugLinea).length > 1;
