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
      etiqueta: 'Línea 1',
      titulo: 'Productos',
      texto: 'Equipos, consumibles, accesorios, repuestos y mobiliario en acero. El autoclave se compra una vez; el consumible, todos los meses.',
      url: '/productos',
    },
    {
      etiqueta: 'Línea 2',
      titulo: 'Servicios',
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

/* ---------------------------------------------------------------- NOSOTROS */

export const nosotros = {
  titulo: 'Especialistas en el proceso, no solo en el equipo.',
  bajada:
    'Importamos y comercializamos equipamiento hospitalario en Colombia, con especialidad en esterilización. Hablamos con quien opera la central todos los días: CEyE, biomédica, infecciones y compras.',

  distinto: {
    titulo: 'Qué hacemos distinto.',
    parrafos: [
      'Una central no falla por el esterilizador. Falla por el agua que le llega, por el aire que mueve sus válvulas, por el empaque que cedió en el almacenamiento o por el repuesto que tardó seis semanas.',
      'No vendemos equipos sueltos. Representamos la línea completa, mantenemos inventario local de lo que más rota y respondemos con técnicos propios.',
    ],
  },

  exigencias: {
    titulo: 'Qué le exigimos a una marca antes de representarla.',
    bajada:
      'La pregunta del comprador institucional que casi nadie responde por escrito: ¿quién me responde en tres años?',
    pasos: [
      {
        titulo: 'Documentación técnica completa',
        texto: 'Manuales de servicio, despieces y parámetros de fábrica para nuestro taller. No solo el manual de usuario.',
      },
      {
        titulo: 'Registro sanitario viable',
        texto: 'Que el equipo pueda obtener y sostener registro INVIMA vigente en Colombia.',
      },
      {
        titulo: 'Cadena de repuestos',
        texto: 'Partes críticas disponibles, con tiempos de reposición que una institución pueda tolerar.',
      },
      {
        titulo: 'Entrenamiento de fábrica',
        texto: 'Formación certificada para nuestros técnicos, y actualización cuando cambia la plataforma.',
      },
    ],
  },

  marcas: {
    titulo: 'Las marcas y su lugar en el proceso.',
    items: [
      { nombre: 'Tuttnauer', papel: 'Esterilización', estacion: 3 },
      { nombre: 'Sanqiang', papel: 'Esterilización', estacion: 3 },
      { nombre: 'Easyseal', papel: 'Empaque', estacion: 2 },
      { nombre: 'Anhui', papel: 'Barrera estéril', estacion: 2 },
      { nombre: '2i Health Care', papel: 'Control', estacion: 4 },
      { nombre: 'Hong Run', papel: 'Planta', estacion: 3 },
      { nombre: 'Mobiliario en acero inoxidable', papel: 'Almacenamiento', estacion: 5 },
    ],
  },

  cifras: [
    { valor: '6', clave: 'Marcas representadas' },
    { valor: 'Nacional', clave: 'Cobertura de servicio' },
    { valor: 'Bogotá', clave: 'Sala de ventas y taller' },
    { valor: 'INVIMA', clave: 'Equipos con registro sanitario' },
  ],
  cifrasPendientes: '{{ POR CONFIRMAR: años de operación, número de instalaciones, número de clientes }}',

  cta: {
    titulo: '¿Está evaluando proveedores para su central?',
    texto: 'Agende una visita técnica. Miramos la operación y le decimos qué cambiaríamos, con o sin compra de por medio.',
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
      { titulo: 'Tengo un equipo detenido', texto: 'Marca, modelo y falla. Si está parado, llame también al fijo.', ancla: '#servicio-tecnico' },
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
    { titulo: 'Servicio técnico', texto: 'Marca, modelo y falla. Si el equipo está detenido, llame también al fijo.', ancla: '#servicio-tecnico' },
    { titulo: 'Licitaciones', texto: 'Envíe el pliego a comercial@servimedicalgroup.com y lo revisamos contra lo que podemos cubrir.', ancla: null },
  ],
} as const;
