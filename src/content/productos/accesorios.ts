import type { Producto } from './tipos.ts';

export const accesorios: Producto[] = [
  {
    slug: 'selladoras',
    categoria: 'accesorios',
    titulo: 'Selladoras térmicas',
    entradilla:
      'El sellado es un proceso validable, no un gesto mecánico. Si no se controlan temperatura, presión y velocidad, la barrera estéril no está garantizada aunque el paquete se vea perfectamente cerrado, y eso solo se descubre cuando ya se abrió en sala.',

    procesa: [
      'Sellado térmico de rollo mixto',
      'Sellado térmico de bolsas grado médico',
    ],

    dimensionamiento: [
      'Paquetes por turno que hay que sellar',
      'Ancho de rollo que utiliza la central',
      'Si se requiere registro de parámetros para auditoría',
      'Espacio disponible en la mesa de empaque',
    ],
    cierreDimensionamiento:
      'Con estas respuestas proponemos el equipo. Sin ellas, cualquier cotización es un número suelto.',

    estacionPrimaria: 2,

    necesita: [
      {
        titulo: 'Papel grado médico y empaque',
        url: '/productos/consumibles/papel-y-empaque',
        porQue: 'La selladora y el material son una sola decisión: el ancho de rollo y el tipo de barrera condicionan el equipo, y al revés.',
      },
      {
        titulo: 'Mesas de inspección y empaque',
        url: '/productos/mobiliario/mesas-y-mesones',
        porQue: 'La selladora vive sobre una mesa de empaque. La altura y el largo de la superficie deciden si el operario trabaja cómodo un turno entero.',
      },
      {
        titulo: 'Repuestos originales',
        url: '/productos/repuestos',
        porQue: 'La resistencia y las bandas de arrastre son partes de desgaste. Una selladora parada frena toda la estación de empaque.',
      },
    ],

    servicio: [
      'Instalación y ajuste inicial de parámetros de sellado',
      'Mantenimiento preventivo y verificación periódica del sello',
      'Entrenamiento al personal de la mesa de empaque',
    ],

    marcas: ['Easyseal'],
    seo: {
      titulo: 'Selladoras térmicas para empaque grado médico — Servimedical Group',
      descripcion:
        'Selladoras térmicas con control de parámetros para rollo mixto y bolsas grado médico. Instalación, ajuste, mantenimiento y repuestos originales con servicio técnico propio en Colombia.',
    },
  },

  {
    slug: 'compresores',
    categoria: 'accesorios',
    titulo: 'Compresores de aire',
    entradilla:
      'Aire comprimido para el accionamiento neumático de los esterilizadores y los servicios de la central. Es infraestructura invisible hasta el día que falla: cuando el aire sale de especificación la puerta del autoclave no abre, y el problema no parece del compresor.',

    procesa: [
      'Aire comprimido para accionamiento neumático de esterilizadores',
      'Aire para servicios de planta de la central',
    ],

    dimensionamiento: [
      'Equipos que hay que alimentar y consumo simultáneo',
      'Exigencia de aire libre de aceite',
      'Espacio disponible y nivel de ruido admisible en el área',
      'Calidad de aire que exige el fabricante del esterilizador',
    ],
    cierreDimensionamiento:
      'Con estas respuestas proponemos el equipo. Sin ellas, cualquier cotización es un número suelto.',

    estacionPrimaria: 3,
    estacionesSecundarias: [5],

    necesita: [
      {
        titulo: 'Autoclaves de vapor',
        url: '/productos/esterilizacion/autoclaves-de-vapor',
        porQue: 'El compresor se dimensiona contra el equipo que va a accionar. Es el fabricante del autoclave el que fija la calidad de aire, no el revés.',
      },
      {
        titulo: 'Tratamiento y filtración de agua',
        url: '/productos/accesorios/tratamiento-de-agua',
        porQue: 'Agua y aire son las dos acometidas que condicionan la validez del ciclo. Se revisan juntas antes de instalar cualquier equipo.',
      },
      {
        titulo: 'Repuestos originales',
        url: '/productos/repuestos',
        porQue: 'Filtros y elementos de secado son consumo de rutina. Dejarlos vencer traslada el problema al esterilizador, donde cuesta más.',
      },
    ],

    servicio: [
      'Verificación de la acometida y del punto de instalación',
      'Instalación, conexión neumática y puesta en marcha',
      'Mantenimiento preventivo con cambio programado de filtros y elementos de secado',
    ],

    marcas: ['Hong Run'],
    seo: {
      titulo: 'Compresores de aire para central de esterilización — Servimedical Group',
      descripcion:
        'Aire comprimido para accionamiento neumático de esterilizadores y servicios de planta. Dimensionamiento contra el equipo a alimentar, instalación y mantenimiento preventivo en Colombia.',
    },
  },

  {
    slug: 'tratamiento-de-agua',
    categoria: 'accesorios',
    titulo: 'Tratamiento y filtración de agua',
    entradilla:
      'Es la variable que más acorta la vida útil de una cámara y de un generador de vapor. La incrustación no se ve hasta que el equipo falla, y para entonces el daño ya está hecho y no se corrige con mantenimiento.',

    procesa: [
      'Agua de alimentación de esterilizadores',
      'Agua de alimentación de generadores de vapor',
      'Agua de alimentación de lavadoras y termodesinfectoras',
    ],

    dimensionamiento: [
      'Análisis del agua que entra a la institución',
      'Dureza y conductividad medidas en el punto de consumo',
      'Consumo por ciclo y por turno',
      'Calidad de agua que exige el fabricante del equipo',
    ],
    cierreDimensionamiento:
      'Con el análisis del agua proponemos el tren de tratamiento. Sin él, se instala un sistema que no corresponde al agua real de la institución.',

    estacionPrimaria: 1,
    estacionesSecundarias: [3],

    necesita: [
      {
        titulo: 'Autoclaves de vapor',
        url: '/productos/esterilizacion/autoclaves-de-vapor',
        porQue: 'El tren de tratamiento se diseña contra la exigencia del equipo que alimenta. Es el autoclave el que fija la especificación.',
      },
      {
        titulo: 'Termodesinfectoras',
        url: '/productos/esterilizacion/termodesinfectoras',
        porQue: 'El lavado consume mucha más agua que la esterilización, y el manchado del instrumental casi siempre viene del enjuague final.',
      },
      {
        titulo: 'Repuestos originales',
        url: '/productos/repuestos',
        porQue: 'Cartuchos, membranas y resinas son consumo periódico. Un tren de tratamiento sin reposición deja de tratar y nadie se entera.',
      },
    ],

    servicio: [
      'Toma de muestra y análisis del agua de la institución',
      'Propuesta de tren de tratamiento según la exigencia del equipo',
      'Instalación, puesta en marcha y reposición programada de consumibles',
    ],

    marcas: ['{{ POR CONFIRMAR: marcas de tratamiento de agua que representa SVMG }}'],
    seo: {
      titulo: 'Tratamiento y filtración de agua para esterilizadores — Servimedical Group',
      descripcion:
        'Tratamiento de agua de alimentación para autoclaves, generadores de vapor y lavadoras. Análisis del agua, propuesta de tren de tratamiento e instalación con servicio técnico en Colombia.',
    },
  },
];
