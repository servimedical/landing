/* ============================================================================
   CONTENIDO DE LAS PÁGINAS INSTITUCIONALES

   La home no repite lo que dicen las páginas internas: cada bloque suyo es
   una puerta, no un resumen.
   ========================================================================== */

export const home = {
  sectores: [
    'Hospitales', 'Clínicas', 'IPS ambulatorias', 'Centros de cirugía',
    'Universidades', 'Laboratorios', 'Distribuidores',
  ],
  cierre: {
    titulo: 'Hable con un especialista en esterilización',
    texto: 'Dimensionamos el equipo con su volumen de carga, su flujo y la infraestructura de la central.',
    url: '/contacto',
    boton: 'Hablar con un especialista',
  },
} as const;

/* --------------------------------------------------------------- SERVICIOS */

export type Servicio = {
  slug: string;
  titulo: string;
  /** Una frase para la tarjeta de la home. */
  resumen: string;
  /** La frase con filo del bloque, cuando la hay. */
  angulo?: string;
  puntos: string[];
};

/* Cuatro servicios, una sola fuente. La home pinta las tarjetas y /servicios
   el detalle; si se añade uno aquí, aparece en los dos sitios. */
export const servicios = {
  lead: 'Lo que sostiene el equipo después de la compra, y el estudio que decide si la central va a funcionar.',
  items: [
    {
      slug: 'instalacion-y-calificacion',
      titulo: 'Instalación y calificación',
      resumen: 'Verificación de acometidas, puesta en marcha y calificación de instalación y de operación.',
      angulo: 'No se instala un esterilizador sobre una acometida que no lo sostiene.',
      puntos: [
        'Verificación previa de acometidas eléctrica, hidráulica y de vapor',
        'Instalación, nivelación y conexión a servicios',
        'Calificación de instalación y de operación',
        'Pruebas de vacío, Bowie-Dick y ciclos de aceptación',
      ],
    },
    {
      slug: 'mantenimiento',
      titulo: 'Mantenimiento preventivo y correctivo',
      resumen: 'Rutina por equipo, repuesto original y tiempo de respuesta pactado.',
      angulo: 'Un mantenimiento sin informe no existe para el auditor.',
      puntos: [
        'Preventivo con rutina y protocolo por equipo',
        'Correctivo con repuesto original',
        'Contratos con tiempo de respuesta pactado',
        'Reposición programada de partes de desgaste',
        'Informe técnico y hoja de vida del equipo para auditoría',
      ],
    },
    {
      slug: 'entrenamiento',
      titulo: 'Entrenamiento',
      resumen: 'Al personal de la central y al área biomédica, sobre los equipos que operan.',
      angulo: 'Un equipo mal cargado no esteriliza, por bueno que sea.',
      puntos: [
        'Carga, conformación de paquete y empaque compatible con cada método',
        'Lectura e interpretación de indicadores y liberación de carga',
        'Rutina diaria de verificación y conducta ante resultado no conforme',
        'Primer nivel de diagnóstico para el área biomédica',
      ],
    },
    {
      slug: 'estudio-de-central',
      titulo: 'Estudio y diseño de la central',
      resumen: 'Estudio y diseño de la central antes de construirla, para obra nueva, ampliación o remodelación.',
      angulo: 'Corregir un flujo en planos cuesta una reunión. Corregirlo construido cuesta la obra otra vez.',
      puntos: [
        'Flujo unidireccional sucio–limpio–estéril y barreras',
        'Zonificación de áreas y control de acceso',
        'Dimensionamiento por carga quirúrgica y rotación de sets',
        'Requerimientos de agua, vapor, aire comprimido y eléctrico',
        'Ventilación, presiones diferenciales y recambios por área',
        'Plan de dotación de equipos y mobiliario con presupuesto',
      ],
    },
  ] satisfies Servicio[],
} as const;

/* ---------------------------------------------------------------- CONTACTO */

export const contactoPagina = {
  titulo: 'Hable con un especialista en esterilización',
  bajada:
    'Dimensionamos el equipo con su volumen de carga, su flujo y la infraestructura de la central. Si ya tiene pliego, trabajamos sobre eso.',
  rutas: [
    { titulo: 'Cotización', texto: 'Equipos, consumibles, accesorios o mobiliario.', ancla: '#cotizacion' },
    { titulo: 'Servicio técnico', texto: 'Marca, modelo y falla. Si el equipo está detenido, llame también al fijo.', ancla: '#cotizar' },
    { titulo: 'Licitaciones', texto: 'Envíe el pliego a comercial@servimedicalgroup.com y lo revisamos contra lo que podemos cubrir.', ancla: null },
  ],
} as const;
