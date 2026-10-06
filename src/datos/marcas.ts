import type { Marca } from './tipos.ts';

/* ============================================================================
   LAS MARCAS

   El orden de este arreglo es el orden del dropdown, de la franja de la home
   y de /marcas. Nunca se escribe el número de marcas en copy: se cuenta aquí.

   Cada cifra de fabricante lleva `// VERIFICAR`. Mientras lo lleve, hay que
   contrastarla contra la ficha o el sitio del fabricante antes de publicar.
   ========================================================================== */

export const marcas: Marca[] = [
  {
    slug: 'tuttnauer',
    nombre: 'Tuttnauer',
    descriptor: 'Esterilización y desinfección térmica',
    lead:
      // VERIFICAR · año de fundación (1925) y número de países (más de 130)
      'Fabricante de autoclaves desde 1925, con equipos en centrales de esterilización de más de 130 países. Esterilización por vapor, plasma de peróxido de hidrógeno y termodesinfección, con instalación, calificación y repuesto original desde Bogotá.',
    fabricante: {
      pais: 'Países Bajos e Israel', // VERIFICAR · sedes de fabricación
      fundacion: '1925', // VERIFICAR
    },
    rolSVMG: 'representante',
    // invima: pendiente. No se escribe un número de registro que no se tenga.
    logo: { src: '/logos/marcas/tuttnauer.svg', alt: 'Logo de Tuttnauer' },
    etapasCiclo: ['lavado', 'esterilizacion'],
    // pruebas: cada entrada necesita `fuente`. Sin fuente, el bloque no se renderiza.
    // TODO pruebas: normas de fabricación declaradas (ISO 13485, EN 285, ISO 15883)
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
        'Autoclaves de vapor, plasma de peróxido de hidrógeno y termodesinfectoras Tuttnauer, con instalación, calificación y repuesto original desde Bogotá.',
    },
  },

  {
    slug: 'sanqiang',
    nombre: 'Sanqiang',
    descriptor: 'Esterilización, desinfección y residuos',
    lead:
      // VERIFICAR · año (2010) y ciudad de fundación (Henan)
      'Fabricante chino de equipos para central de esterilización, fundado en 2010 en Henan. Cubre el ciclo de punta a punta: lavado y termodesinfección, vapor, plasma de peróxido y tratamiento de residuos hospitalarios.',
    fabricante: {
      pais: 'China',
      fundacion: '2010', // VERIFICAR
    },
    rolSVMG: 'distribuidor',
    logo: { src: '/logos/marcas/sanqiang.svg', alt: 'Logo de Sanqiang' },
    etapasCiclo: ['lavado', 'esterilizacion', 'residuos'],
    respaldo: [
      'Instalación y puesta en marcha con técnicos propios',
      'Mantenimiento preventivo y correctivo',
      'Repuesto original por importación directa',
    ],
    orden: 2,
    seo: {
      titulo: 'Sanqiang en Colombia | Servimedical',
      descripcion:
        'Equipos Sanqiang para central de esterilización: termodesinfectoras, autoclaves de vapor, plasma de peróxido y tratamiento de residuos hospitalarios.',
    },
  },

  {
    slug: 'servimedical',
    nombre: 'Servimedical',
    descriptor: 'Empaque, mobiliario y repuestos',
    lead:
      'Lo que la central consume y lo que la sostiene: papel grado esterilización y Tyvek, mobiliario en acero inoxidable fabricado a la medida de su flujo, y repuestos para mantener los equipos en operación.',
    fabricante: { pais: 'Colombia', razonSocial: 'Servimedical Group SAS' },
    rolSVMG: 'representante',
    logo: { src: '/logos/marcas/servimedical.svg', alt: 'Logo de Servimedical' },
    etapasCiclo: ['empaque', 'almacenamiento'],
    respaldo: [
      'Abastecimiento programado desde Bogotá',
      'Mobiliario fabricado a la medida del flujo de la central',
      'Repuesto original para las marcas que representamos',
    ],
    orden: 3,
    seo: {
      titulo: 'Servimedical — empaque, mobiliario y repuestos | Servimedical',
      descripcion:
        'Papel grado esterilización y Tyvek, mobiliario en acero inoxidable a la medida del flujo de la central, y repuestos originales con despacho desde Bogotá.',
    },
  },

  {
    slug: '2i',
    nombre: '2i',
    descriptor: 'Monitoreo del proceso',
    lead:
      'Indicadores químicos y biológicos para liberar cada carga con evidencia. Sin ellos no hay trazabilidad que presentar ante el comité de infecciones.',
    fabricante: {
      pais: '', // TODO confirmar con Felipe · país de fabricación de 2i
    },
    rolSVMG: 'distribuidor',
    logo: { src: '/logos/marcas/2i.svg', alt: 'Logo de 2i' },
    etapasCiclo: ['monitoreo'],
    // TODO pruebas: normas declaradas por el fabricante (ISO 11140, ISO 11138)
    respaldo: [
      'Abastecimiento programado según cargas por turno',
      'Lotes con certificado de análisis',
    ],
    orden: 4,
    seo: {
      titulo: '2i en Colombia — indicadores químicos y biológicos | Servimedical',
      descripcion:
        'Indicadores químicos y biológicos 2i para monitorear y liberar cada carga de la central de esterilización, con abastecimiento programado desde Bogotá.',
    },
  },

  {
    slug: 'akarmak',
    nombre: 'Akarmak',
    descriptor: 'Tratamiento de residuos hospitalarios',
    lead:
      // VERIFICAR · año de fundación (1990) y razón social (Akar Makina)
      'Fabricante turco de autoclaves industriales desde 1990. Su línea hospitalaria trata residuos biosanitarios con vapor y trituración, en sitio.',
    fabricante: {
      pais: 'Turquía',
      razonSocial: 'Akar Makina', // VERIFICAR
      fundacion: '1990', // VERIFICAR
    },
    rolSVMG: 'distribuidor',
    logo: { src: '/logos/marcas/akarmak.svg', alt: 'Logo de Akarmak' },
    etapasCiclo: ['residuos'],
    // TODO líneas pendientes de confirmar · no hay ninguna en src/datos/lineas.ts.
    // Por portafolio público el fabricante trata residuos por vapor con
    // trituración, pero no se crea una línea sin saber qué representa SVMG.
    orden: 5,
    seo: {
      titulo: 'Akarmak en Colombia — tratamiento de residuos | Servimedical',
      descripcion:
        'Akarmak, fabricante turco de autoclaves industriales. Tratamiento de residuos biosanitarios por vapor y trituración en sitio, representado en Colombia por Servimedical.',
    },
  },

  {
    slug: 'celitron',
    nombre: 'Celitron',
    descriptor: 'Vapor y tratamiento de residuos',
    lead:
      // VERIFICAR · denominación del sistema (ISS) y de la línea de autoclaves (Azteca)
      'Fabricante de esterilizadores de vapor y del sistema ISS, que esteriliza y tritura residuos biosanitarios en un solo recipiente.',
    fabricante: {
      pais: 'Hungría', // VERIFICAR · país de fabricación
    },
    rolSVMG: 'distribuidor',
    logo: { src: '/logos/marcas/celitron.svg', alt: 'Logo de Celitron' },
    etapasCiclo: ['esterilizacion', 'residuos'],
    // TODO líneas pendientes de confirmar · no hay ninguna en src/datos/lineas.ts.
    // Por portafolio público: sistema ISS —esterilizador-triturador en un solo
    // recipiente— y autoclaves de vapor. No se crean sin confirmar el alcance.
    orden: 6,
    seo: {
      titulo: 'Celitron en Colombia — vapor y residuos | Servimedical',
      descripcion:
        'Celitron: esterilizadores de vapor y el sistema ISS, que esteriliza y tritura residuos biosanitarios en un solo recipiente. Representada en Colombia por Servimedical.',
    },
  },
];

export const marcaPorSlug = (slug: string) => marcas.find((m) => m.slug === slug);
