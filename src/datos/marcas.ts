import type { Marca } from './tipos.ts';

/* ============================================================================
   LAS MARCAS

   El orden de este arreglo manda en el menú, en la home y en /marcas. Nunca
   se escribe el número de marcas en copy: se cuenta desde aquí.

   Las cifras salen de las fuentes primarias del catálogo de investigación
   (7 de octubre de 2026). Lo que una fuente contradice lleva `// VERIFICAR`
   y no se publica hasta que Felipe lo confirme.
   ========================================================================== */

export const marcas: Marca[] = [
  {
    slug: 'tuttnauer',
    nombre: 'Tuttnauer',
    descriptor: 'Esterilización y desinfección térmica',
    lead:
      'Fabricante de autoclaves desde 1925, con más de 200 distribuidores en más de 140 países. Esterilización por vapor, plasma de peróxido de hidrógeno y lavado con termodesinfección para la central, con instalación, calificación y repuesto original desde Bogotá.',
    quienEs:
      'Tuttnauer empezó en 1925 como taller de recipientes a presión y hoy diseña equipos de esterilización y control de infecciones para hospitales, clínicas, laboratorios y odontología. Tiene oficinas regionales en Estados Unidos, Europa, India y China, y plantas en China desde 2013 y en Hungría desde 2022. Sus autoclaves hospitalarios se fabrican bajo EN 285, ANSI/AAMI ST8, ISO 13485 e ISO 9001, y la Directiva de Equipos a Presión 2014/68/UE.',
    fabricante: { pais: 'China y Hungría', fundacion: '1925' },
    rolSVMG: 'representante',
    // TODO INVIMA · número de registro sanitario por equipo, empezando por PlazMax
    logo: { src: '/logos/marcas/tuttnauer.png', alt: 'Logo de Tuttnauer' },
    etapasCiclo: ['lavado', 'esterilizacion'],
    pruebas: [
      { dato: 'Fundada en 1925, con plantas en China y Hungría.', fuente: 'tuttnauer.com · página de empresa' },
      { dato: 'Autoclaves de central bajo EN 285 y ANSI/AAMI ST8.', fuente: 'Ficha técnica 44/55 Compact v2.5' },
      { dato: 'Trazabilidad por impresora, USB y Ethernet en toda la línea hospitalaria.', fuente: 'Fichas de producto Tuttnauer' },
    ],
    respaldo: [
      'Instalación y calificación de instalación y de operación',
      'Mantenimiento preventivo y correctivo con técnicos propios',
      'Repuesto original con existencias en Bogotá',
      'Entrenamiento al personal de la central y a biomédica',
    ],
    orden: 1,
    seo: {
      titulo: 'Tuttnauer en Colombia | Servimedical',
      descripcion:
        'Autoclaves de vapor de 120 a 1.010 L, plasma PlazMax y termodesinfectoras TIVA. Instalación, calificación y repuesto original desde Bogotá.',
    },
  },

  {
    slug: 'sanqiang',
    nombre: 'Sanqiang',
    descriptor: 'Esterilización, desinfección y residuos',
    lead:
      'Fabricante chino de equipos para la central de esterilización, fundado en 2010 y exportador a más de 100 países. Cubre el lavado y la termodesinfección, el vapor —desde autoclaves de mesa hasta cámaras de 1.500 L— y el plasma de peróxido.',
    quienEs:
      'Sanqiang diseña y fabrica en Hua County, en la provincia de Henan, autoclaves de vacío pulsante, esterilizadores de plasma de peróxido, termodesinfectoras y equipos de óxido de etileno, formaldehído y secado. Tiene 304 empleados y una planta de 51.677 m², según su perfil verificado por SGS. Declara ISO 13485, ISO 9001, ISO 14001, ISO 45001, marcado CE y ASME.',
    fabricante: { razonSocial: 'Henan Sanqiang Medical Equipment', ciudad: 'Hua County, Henan', pais: 'China', fundacion: '2010' },
    rolSVMG: 'distribuidor',
    logo: { src: '/logos/marcas/sanqiang.png', alt: 'Logo de Sanqiang' },
    logoEscala: 0.88, // apaisa el peso óptico frente a los logotipos horizontales
    /* Residuos no entra hasta que el producto se publique: la marca no puede
       declarar una etapa que su catálogo visible no cubre. */
    etapasCiclo: ['lavado', 'esterilizacion'],
    /* Se publican las cifras del perfil verificado por SGS —304 empleados y
       51.677 m²—, no las del sitio propio, que dice «500+» y «56.000 m²».
       «5.000+ equipos instalados» no se publica: no está en datos verificados. */
    pruebas: [
      { dato: 'Cámaras de vapor de hasta 1.500 L.', fuente: 'sanqiangmedical.com · tabla técnica PVS·JD' },
      { dato: 'Plasma de 100 a 190 L, con ciclo corto de 30 minutos.', fuente: 'sanqiangmedical.com · plasma SQ-WD' },
      { dato: 'Termodesinfectoras de hasta 12 cestas DIN, en la serie KX.', fuente: 'Tienda oficial verificada · serie SQ-KX' },
    ],
    respaldo: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo y correctivo',
      'Repuesto original por importación directa',
    ],
    orden: 2,
    seo: {
      titulo: 'Sanqiang en Colombia | Servimedical',
      descripcion:
        'Autoclaves de vacío pulsante hasta 1.500 L, plasma SQ-WD, termodesinfectoras y tratamiento de residuos. Importación directa y servicio técnico propio.',
    },
  },

  {
    slug: 'celitron',
    nombre: 'Celitron',
    descriptor: 'Tratamiento de residuos biosanitarios',
    lead:
      'Fabricante húngaro del sistema ISS, que tritura y esteriliza residuos biosanitarios en un solo recipiente, dentro del hospital. Más de 500 unidades en más de 40 países.',
    quienEs:
      'Celitron diseña y fabrica en Vác, en Hungría, autoclaves hospitalarios bajo EN 285 y equipos de tratamiento de residuos sin incineración. Es una empresa certificada ISO 9001 e ISO 13485, con productos con marcado CE. Reporta más de quinientas unidades de tratamiento de residuos vendidas en más de cuarenta países.',
    fabricante: { razonSocial: 'Celitron Medical Technologies', ciudad: 'Vác', pais: 'Hungría' },
    // TODO confirmar con Felipe · ¿representante o distribuidor de Celitron?
    rolSVMG: 'distribuidor',
    logo: { src: '/logos/marcas/celitron.png', alt: 'Logo de Celitron' },
    logoEscala: 0.95, // apaisa el peso óptico frente a los logotipos horizontales
    etapasCiclo: ['residuos'],
    /* «Más de 80 países» es de toda la empresa y «más de 40» sólo de residuos:
       no se contradicen. Se usa 40, que es la línea que representamos.
       TODO · el año de fundación no está publicado. */
    pruebas: [
      { dato: 'Más de 500 unidades de tratamiento de residuos en más de 40 países.', fuente: 'celitron.com · página del sistema ISS' },
      { dato: 'Fabricación bajo EN 285, con empresa certificada ISO 9001 e ISO 13485.', fuente: 'celitron.com · página de empresa' },
    ],
    respaldo: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento del circuito de vapor y del sistema de trituración',
      'Entrenamiento al personal del recinto de residuos',
    ],
    orden: 3,
    seo: {
      titulo: 'Celitron en Colombia — sistema ISS | Servimedical',
      descripcion:
        'Sistema ISS de Celitron: tritura y esteriliza residuos biosanitarios en un solo recipiente, dentro del hospital, en 15 a 35 minutos.',
    },
  },

  {
    slug: 'akarmak',
    nombre: 'Akarmak',
    descriptor: 'Tratamiento de residuos biosanitarios',
    lead:
      'Fabricante turco de autoclaves industriales desde 1990, con clientes en más de 70 países. Su línea médica esteriliza y tritura residuos biosanitarios, desde equipos para un solo hospital hasta plantas centralizadas.',
    quienEs:
      'Akarmak fabrica autoclaves y recipientes a presión para las industrias del vidrio, los compuestos, el caucho y la construcción, y aplica esa ingeniería al tratamiento de residuos médicos. Fabrica bajo la Directiva de Equipos a Presión 2014/68/UE, ASME VIII, AD 2000 e ISO 9001:2015, y sus sistemas de residuos están validados por organismos independientes como el Instituto Robert Koch, en nivel STAATT IV.',
    fabricante: { razonSocial: 'Akar Makina', ciudad: 'Eskişehir', pais: 'Turquía', fundacion: '1990' },
    rolSVMG: 'distribuidor',
    logo: { src: '/logos/marcas/akarmak.png', alt: 'Logo de Akarmak' },
    etapasCiclo: ['residuos'],
    pruebas: [
      { dato: 'Reducción microbiana de 8 log₁₀ en sistemas con trituración previa.', fuente: 'akarmak.com · esterilización de residuos médicos' },
      { dato: 'Validación del Instituto Robert Koch, nivel STAATT IV.', fuente: 'akarmak.com · esterilización de residuos médicos' },
      { dato: 'Trituradora de fabricación propia, con doble motor y reversa automática.', fuente: 'akarmak.com · ficha de residuos médicos' },
    ],
    respaldo: [
      'Alcance llave en mano: generador de vapor, presurización y cargue automático',
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento del sistema de trituración',
    ],
    orden: 4,
    seo: {
      titulo: 'Akarmak en Colombia — residuos biosanitarios | Servimedical',
      descripcion:
        'Sistemas Akarmak de esterilización de residuos biosanitarios con vapor y trituradora propia, de 20 kg por ciclo a 1.800 kg por hora.',
    },
  },

  {
    slug: '2i',
    nombre: '2i',
    descriptor: 'Monitoreo del proceso',
    lead:
      'Indicadores químicos y biológicos para monitorear vapor, peróxido de hidrógeno, óxido de etileno y formaldehído, con lectura rápida desde 19 minutos en vapor. La evidencia con la que la central libera cada carga.',
    quienEs:
      '2i fabrica en Brasil indicadores para todas las clases de la ISO 11140-1, indicadores biológicos autocontenidos, paquetes de prueba, pruebas de limpieza para lavadoras, y lectoras e incubadoras propias.',
    fabricante: { razonSocial: '2i Health Care', ciudad: 'Cambé, Paraná', pais: 'Brasil' },
    rolSVMG: 'distribuidor',
    // TODO confirmar con Felipe · registro INVIMA y certificación ISO 13485,
    // que no es visible públicamente.
    logo: { src: '/logos/marcas/2i.png', alt: 'Logo de 2i' },
    logoEscala: 0.85, // apaisa el peso óptico frente a los logotipos horizontales
    etapasCiclo: ['monitoreo'],
    pruebas: [
      { dato: 'Indicadores de las clases 1, 2, 4, 5 y 6 de la ISO 11140-1.', fuente: '2i.ind.br · catálogo de indicadores químicos' },
      { dato: 'Lectura biológica desde 19 minutos en vapor.', fuente: '2i.ind.br · catálogo de indicadores biológicos' },
      { dato: 'Lectoras de 4 y 12 pozos e incubadora de 6 pozos propias.', fuente: '2i.ind.br · catálogo de equipos' },
    ],
    respaldo: [
      'Definición del esquema de monitoreo junto con la central',
      'Abastecimiento programado por carga y por equipo',
      'Entrenamiento en lectura e interpretación',
    ],
    orden: 5,
    seo: {
      titulo: '2i en Colombia — indicadores químicos y biológicos | Servimedical',
      descripcion:
        'Indicadores químicos de clases 1 a 6 e indicadores biológicos autocontenidos con lectura desde 19 minutos, para vapor, peróxido, óxido de etileno y formaldehído.',
    },
  },

  {
    slug: 'servimedical',
    nombre: 'Servimedical',
    descriptor: 'Empaque, mobiliario y repuestos',
    lead:
      'Lo que la central consume y lo que la sostiene: papel grado esterilización y Tyvek para la barrera estéril, mobiliario en acero inoxidable para el flujo de sucio a limpio a estéril, y repuestos para que los equipos no se detengan.',
    quienEs:
      'La línea propia de Servimedical cubre lo que no depende de un fabricante de equipos: el empaque bajo ISO 11607 y EN 868, el mobiliario según los ambientes que exige la Resolución 3100 de 2019, y el repuesto para el mantenimiento y la revalidación anual que pide la Resolución 2183 de 2004.',
    fabricante: { razonSocial: 'Servimedical Group SAS', ciudad: 'Bogotá', pais: 'Colombia' },
    rolSVMG: 'representante',
    logo: { src: '/logos/marcas/servimedical.svg', alt: 'Logo de Servimedical' },
    etapasCiclo: ['empaque', 'almacenamiento'],
    respaldo: [
      'Abastecimiento programado desde Bogotá',
      'Mobiliario fabricado a la medida del flujo de la central',
      'Repuesto de desgaste en inventario para las marcas que representamos',
    ],
    orden: 6,
    seo: {
      titulo: 'Servimedical — empaque, mobiliario y repuestos | Servimedical',
      descripcion:
        'Papel grado esterilización y Tyvek bajo ISO 11607, mobiliario en acero inoxidable a la medida del plano, y repuestos con existencias en Bogotá.',
    },
  },
];

export const marcaPorSlug = (slug: string) => marcas.find((m) => m.slug === slug);
export const urlMarca = (slug: string) => `/marcas/${slug}`;
