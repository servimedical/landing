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
  lineas: [
    {
      etiqueta: 'Catálogo',
      titulo: 'Marcas',
      texto: 'Siete marcas representadas. Equipos, consumibles, mobiliario y repuestos: el autoclave se compra una vez, el consumible todos los meses.',
      url: '/marcas',
    },
    {
      etiqueta: 'Servicios',
      titulo: 'Servicio técnico',
      texto: 'Instalación, calificación y mantenimiento con técnicos propios. Y el estudio de la central antes de que se funda la primera placa.',
      url: '/servicios',
    },
  ],
  cierre: {
    titulo: 'Cuéntenos qué necesita esterilizar.',
    texto: 'Con el material que procesa y el volumen por turno proponemos el equipo y enviamos cotización formal.',
    url: '/contacto',
    boton: 'Solicitar cotización',
  },
} as const;

/* --------------------------------------------------------------- SERVICIOS */

export const servicios = {
  titulo: 'Antes de comprar el equipo y mucho después.',
  bajada:
    'El equipo es una parte del problema. El resto es cómo está diseñada la central y quién responde cuando un ciclo falla un martes a las 6 de la mañana.',

  tecnico: {
    idx: '2.1',
    titulo: 'Servicio técnico especializado',
    intro:
      'Técnicos propios entrenados por fábrica, con documentación de servicio y repuesto original. Atendemos marcas representadas y equipos de terceros.',
    grupos: [
      {
        titulo: 'Instalación y puesta en marcha',
        angulo: 'No se instala un esterilizador sobre una acometida que no lo sostiene.',
        puntos: [
          'Verificación previa de acometidas eléctrica, hidráulica y de vapor',
          'Instalación, nivelación y conexión a servicios',
          'Calificación de instalación y de operación',
          'Pruebas de vacío, Bowie-Dick y ciclos de aceptación',
          'Entrenamiento al personal de la central y a biomédica',
        ],
      },
      {
        titulo: 'Mantenimiento y respuesta',
        angulo: 'Un mantenimiento sin informe no existe para el auditor.',
        puntos: [
          'Preventivo con rutina y protocolo por equipo',
          'Correctivo con repuesto original',
          'Contratos con tiempo de respuesta pactado',
          'Reposición programada de partes de desgaste',
          'Informe técnico y hoja de vida del equipo para auditoría',
        ],
      },
    ],
  },

  asesoria: {
    idx: '2.2',
    titulo: 'Asesoría y diseño de centrales de esterilización',
    intro: 'Estudio técnico previo a la obra o a la remodelación.',
    angulo: 'Corregir un flujo en planos cuesta una reunión. Corregirlo construido cuesta la obra otra vez.',
    grupos: [
      {
        titulo: 'Qué entregamos',
        puntos: [
          'Flujo unidireccional sucio–limpio–estéril y barreras',
          'Zonificación de áreas y control de acceso',
          'Dimensionamiento por carga quirúrgica y rotación de sets',
          'Requerimientos de agua, vapor, aire comprimido y eléctrico',
          'Ventilación, presiones diferenciales y recambios por área',
          'Plan de dotación de equipos y mobiliario con presupuesto',
        ],
      },
      {
        titulo: 'Cómo trabajamos el estudio',
        puntos: [
          'Visita técnica y levantamiento de la operación actual',
          'Proyección de crecimiento a cinco años',
          'Coordinación con arquitectura e ingeniería del proyecto',
          'Cronograma de implementación por etapas',
          'Honorarios deducibles del contrato de dotación posterior',
        ],
      },
    ],
    alcance: 'Aplica a obra nueva, ampliación y remodelación.',
  },

  cta: {
    titulo: '¿Equipo detenido o proyecto en planos?',
    texto: 'Dos urgencias distintas, dos conversaciones distintas.',
    rutas: [
      { titulo: 'Tengo un equipo detenido', texto: 'Marca, modelo y falla. Si está parado, llame también al fijo.', ancla: '#cotizar' },
      { titulo: 'Tengo un proyecto en planos', texto: 'Planos y número de salas. Empezamos por una visita técnica.', ancla: '#cotizacion' },
    ],
  },
} as const;

/* ---------------------------------------------------------------- CONTACTO */

export const contactoPagina = {
  titulo: 'Cuéntenos qué necesita esterilizar.',
  bajada:
    'Con el material que procesa y el volumen por turno proponemos el equipo y enviamos cotización formal. Si ya tiene pliego, trabajamos sobre eso.',
  rutas: [
    { titulo: 'Cotización', texto: 'Equipos, consumibles, accesorios o mobiliario.', ancla: '#cotizacion' },
    { titulo: 'Servicio técnico', texto: 'Marca, modelo y falla. Si el equipo está detenido, llame también al fijo.', ancla: '#cotizar' },
    { titulo: 'Licitaciones', texto: 'Envíe el pliego a comercial@servimedicalgroup.com y lo revisamos contra lo que podemos cubrir.', ancla: null },
  ],
} as const;
