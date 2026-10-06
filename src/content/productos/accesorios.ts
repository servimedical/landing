import type { Producto } from './tipos.ts';

export const accesorios: Producto[] = [
  {
    slug: 'selladoras',
    categoria: 'accesorios',
    titulo: 'Selladoras térmicas',
    entradilla:
      'El sellado es un proceso validable, no un gesto mecánico. Sin control de temperatura, presión y velocidad, la barrera no está garantizada aunque el paquete se vea cerrado.',

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


    necesita: [
      {
        titulo: 'Papel grado médico y empaque',
        linea: 'papel-y-empaque',
        porQue: 'El ancho de rollo y el tipo de barrera condicionan el equipo, y al revés.',
      },
      {
        titulo: 'Mesas de inspección y empaque',
        linea: 'mesas-y-mesones',
        porQue: 'La altura y el largo de la mesa deciden si el operario trabaja cómodo un turno entero.',
      },
      {
        titulo: 'Repuestos originales',
        linea: 'repuestos',
        porQue: 'Resistencia y bandas se desgastan. Una selladora parada frena todo el empaque.',
      },
    ],

    servicio: [
      'Instalación y ajuste inicial de parámetros de sellado',
      'Mantenimiento preventivo y verificación periódica del sello',
      'Entrenamiento al personal de la mesa de empaque',
    ],

    marcas: ['Easyseal'],
    seo: {
      titulo: 'Selladoras térmicas para empaque grado médico',
      descripcion:
        'Selladoras térmicas con control de parámetros para rollo mixto y bolsas grado médico. Instalación, ajuste, mantenimiento y repuestos originales con servicio técnico propio en Colombia.',
    },
  },

  {
    slug: 'compresores',
    categoria: 'accesorios',
    titulo: 'Compresores de aire',
    entradilla:
      'Aire comprimido para el accionamiento neumático de la central. Cuando sale de especificación, la puerta del autoclave no abre y el problema no parece del compresor.',

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


    necesita: [
      {
        titulo: 'Autoclaves de vapor',
        linea: 'autoclaves-de-vapor',
        porQue: 'La calidad de aire la fija el fabricante del autoclave, no el revés.',
      },
      {
        titulo: 'Tratamiento y filtración de agua',
        linea: 'tratamiento-de-agua',
        porQue: 'Agua y aire condicionan la validez del ciclo. Se revisan juntas antes de instalar.',
      },
      {
        titulo: 'Repuestos originales',
        linea: 'repuestos',
        porQue: 'Filtros y secado son consumo de rutina. Vencidos, el problema pasa al esterilizador.',
      },
    ],

    servicio: [
      'Verificación de la acometida y del punto de instalación',
      'Instalación, conexión neumática y puesta en marcha',
      'Mantenimiento preventivo con cambio programado de filtros y elementos de secado',
    ],

    marcas: ['Hong Run'],
    seo: {
      titulo: 'Compresores de aire para central de esterilización',
      descripcion:
        'Aire comprimido para accionamiento neumático de esterilizadores y servicios de planta. Dimensionamiento contra el equipo a alimentar, instalación y mantenimiento preventivo en Colombia.',
    },
  },

  {
    slug: 'tratamiento-de-agua',
    categoria: 'accesorios',
    titulo: 'Tratamiento y filtración de agua',
    entradilla:
      'Es la variable que más acorta la vida de una cámara y un generador. La incrustación no se ve hasta que el equipo falla.',

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


    necesita: [
      {
        titulo: 'Autoclaves de vapor',
        linea: 'autoclaves-de-vapor',
        porQue: 'El tren se diseña contra la exigencia del equipo. El autoclave fija la especificación.',
      },
      {
        titulo: 'Termodesinfectoras',
        linea: 'termodesinfectoras',
        porQue: 'El lavado consume mucha más agua, y el manchado casi siempre viene del enjuague final.',
      },
      {
        titulo: 'Repuestos originales',
        linea: 'repuestos',
        porQue: 'Cartuchos, membranas y resinas son consumo periódico. Sin reposición, deja de tratar.',
      },
    ],

    servicio: [
      'Toma de muestra y análisis del agua de la institución',
      'Propuesta de tren de tratamiento según la exigencia del equipo',
      'Instalación, puesta en marcha y reposición programada de consumibles',
    ],

    marcas: ['{{ POR CONFIRMAR: marcas de tratamiento de agua que representa SVMG }}'],
    seo: {
      titulo: 'Tratamiento y filtración de agua para esterilizadores',
      descripcion:
        'Tratamiento de agua de alimentación para autoclaves, generadores de vapor y lavadoras. Análisis del agua, propuesta de tren de tratamiento e instalación con servicio técnico en Colombia.',
    },
  },
];
