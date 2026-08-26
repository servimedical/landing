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
      texto: 'Equipos, consumibles, accesorios, repuestos y mobiliario en acero. El autoclave se compra una vez; el papel, el indicador y el repuesto se compran todos los meses.',
      url: '/productos',
    },
    {
      etiqueta: 'Línea 2',
      titulo: 'Servicios',
      texto: 'Servicio técnico con técnicos propios entrenados por fábrica, y asesoría de diseño para centrales en obra nueva, ampliación o remodelación.',
      url: '/servicios',
    },
  ],
  trazabilidad: {
    titulo: 'Trazabilidad de paquete, del empaque al paciente',
    texto: 'Cuando una carga sale no conforme, la diferencia entre responder en minutos y recoger el inventario completo está en si el paquete tiene historia.',
    url: '/trazabilidad',
    boton: 'Ver cómo funciona',
  },
  cierre: {
    titulo: 'Cuéntenos qué necesita esterilizar.',
    texto: 'Con el material que procesa, el volumen por turno y el espacio disponible proponemos el equipo y enviamos cotización formal.',
    url: '/contacto',
    boton: 'Solicitar cotización',
  },
} as const;

/* ---------------------------------------------------------------- NOSOTROS */

export const nosotros = {
  titulo: 'Especialistas en el proceso, no solo en el equipo.',
  bajada:
    'Servimedical Group SAS importa y comercializa equipamiento hospitalario en Colombia, con especialidad en esterilización y desinfección de alto nivel. Trabajamos con quien opera la central todos los días: enfermería de CEyE, ingeniería biomédica, infecciones y compras.',

  distinto: {
    titulo: 'Qué hacemos distinto.',
    parrafos: [
      'Una central no falla por el esterilizador. Falla por el agua que le llega, por el aire comprimido que mueve sus válvulas, por el empaque que se abrió en el almacenamiento o por el repuesto que tardó seis semanas en llegar del exterior.',
      'Por eso no vendemos equipos sueltos: representamos la línea completa que sostiene el proceso, mantenemos inventario local de consumibles y repuestos de alta rotación, y respondemos con técnicos propios entrenados por fábrica.',
    ],
  },

  exigencias: {
    titulo: 'Qué le exigimos a una marca antes de representarla.',
    bajada:
      'Es la pregunta que hace el comprador institucional y que casi nadie responde por escrito: ¿y quién me responde en tres años?',
    pasos: [
      {
        titulo: 'Documentación técnica completa',
        texto: 'Manuales de servicio, despieces y parámetros de fábrica disponibles para nuestro taller, no solo el manual de usuario.',
      },
      {
        titulo: 'Registro sanitario viable',
        texto: 'Que el equipo pueda obtener y sostener registro INVIMA vigente para su comercialización en Colombia.',
      },
      {
        titulo: 'Cadena de repuestos',
        texto: 'Disponibilidad garantizada de partes críticas y tiempos de reposición que una institución pueda tolerar.',
      },
      {
        titulo: 'Entrenamiento de fábrica',
        texto: 'Formación certificada para nuestros técnicos y actualización cuando el fabricante cambia de plataforma.',
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
    texto: 'Agende una visita técnica. Vamos, miramos la operación y le decimos qué cambiaríamos, con o sin compra de por medio.',
  },
} as const;

/* --------------------------------------------------------------- SERVICIOS */

export const servicios = {
  titulo: 'Antes de comprar el equipo y mucho después.',
  bajada:
    'El equipo es una parte del problema. El resto es cómo está diseñada la central y quién responde cuando un ciclo falla un martes a las 6 de la mañana con la programación quirúrgica ya montada.',

  tecnico: {
    idx: '2.1',
    titulo: 'Servicio técnico especializado',
    intro:
      'Técnicos propios entrenados por fábrica, con acceso a documentación de servicio y repuestos originales. Se atienden las marcas representadas y equipos de terceros.',
    grupos: [
      {
        titulo: 'Instalación y puesta en marcha',
        angulo: 'No se instala un esterilizador sobre una acometida que no lo sostiene. La verificación previa evita la mitad de los problemas del primer año.',
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
        angulo: 'La hoja de vida del equipo es exigible en auditoría. Un mantenimiento sin informe no existe para el auditor.',
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
    angulo: 'Corregir un flujo mal planteado en planos cuesta una reunión; corregirlo construido cuesta la obra otra vez.',
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
    texto: 'Son dos urgencias distintas y dos conversaciones distintas. Escoja la que le corresponde.',
    rutas: [
      { titulo: 'Tengo un equipo detenido', texto: 'Marca, modelo y descripción de la falla. Si el equipo está parado, llame también al fijo.', ancla: '#servicio-tecnico' },
      { titulo: 'Tengo un proyecto en planos', texto: 'Planos, número de salas y programa quirúrgico previsto. Empezamos por una visita técnica.', ancla: '#cotizacion' },
    ],
  },
} as const;

/* ------------------------------------------------------------ TRAZABILIDAD */

export const trazabilidad = {
  titulo: 'Cada paquete cuenta dónde estuvo.',
  bajada:
    'Si una carga sale no conforme, la pregunta del comité de infecciones es una sola: qué paquetes salieron de ahí y a qué pacientes llegaron. Con trazabilidad se responde en minutos; sin ella, se recoge el inventario completo y se reprocesa a ciegas.',

  resuelve: {
    titulo: 'Qué resuelve.',
    items: [
      {
        titulo: 'Recall dirigido',
        texto: 'Ante una carga no conforme o un indicador biológico positivo, el listado de paquetes afectados y su destino sale del sistema, no de la libreta del turno.',
      },
      {
        titulo: 'Liberación con criterio',
        texto: 'La carga no se despacha sin registro de parámetros y resultado de indicadores. Queda quién liberó y con qué evidencia.',
      },
      {
        titulo: 'Vencimientos bajo control',
        texto: 'Alerta por rotación y por fecha, para dejar de reprocesar material vigente y de despachar material vencido.',
      },
      {
        titulo: 'Productividad medible',
        texto: 'Cargas por equipo y por turno, tiempos de ciclo, reprocesos y consumo real de insumo por paquete.',
      },
    ],
  },

  sistema: {
    titulo: 'El sistema.',
    componentes: [
      { titulo: 'Etiquetas y rótulos', texto: 'Adhesivos que resisten el ciclo sin perder legibilidad, con doble código para lectura automática y humana.' },
      { titulo: 'Impresora de central', texto: 'Impresión en el punto de empaque: un paquete, un rótulo, sin transcripción a mano.' },
      { titulo: 'Software y lectores', texto: 'Registro en cada estación del ciclo, liberación de carga, control de vencimientos y reportes.', url: '/trazabilidad/software' },
    ],
  },

  implementacion: {
    titulo: 'Cómo se implementa.',
    etapas: [
      { titulo: 'Levantamiento del flujo', texto: 'Se recorre la central tal como opera hoy, no como debería operar.' },
      { titulo: 'Configuración', texto: 'Sets, equipos, operarios y vencimientos quedan cargados con los datos reales de la institución.' },
      { titulo: 'Entrenamiento del turno', texto: 'Se entrena a quien va a leer el rótulo todos los días, no solo a la coordinación.' },
      { titulo: 'Marcha asistida', texto: 'Acompañamiento en los primeros ciclos, cuando aparecen los casos que el levantamiento no previó.' },
    ],
  },

  cta: {
    titulo: 'Pida una demostración con sus propios sets.',
    texto: 'Presencial o remota. Se hace con el listado de sets de su central, no con datos de ejemplo: es la única forma de ver si el sistema encaja con su operación.',
  },
} as const;

/* --------------------------------------------------- TRAZABILIDAD/SOFTWARE */

export const software = {
  titulo: 'Software de trazabilidad',
  bajada:
    'Esta página está dirigida a quien evalúa: coordinación de la central junto a sistemas o biomédica. Describe lo que el sistema tiene que ser capaz de hacer, estación por estación.',

  pendiente:
    '{{ POR CONFIRMAR: marca y nombre comercial del sistema, modalidad on-premise o nube, requisitos de servidor, navegador y red, y política de respaldo }}',

  nota:
    'Mientras ese dato no esté confirmado, esta página describe capacidades funcionales y no especificaciones de producto. No hay nombre, versión ni pantallas porque no se inventan.',

  modulos: {
    titulo: 'Módulos funcionales.',
    items: [
      { titulo: 'Registro de carga', texto: 'Conformación de la carga por lectura de rótulo: qué paquetes entran, en qué equipo, en qué ciclo y con qué operario.' },
      { titulo: 'Liberación', texto: 'La carga no se libera sin parámetros conformes y resultado de indicadores. Queda registrado quién liberó y con qué evidencia.' },
      { titulo: 'Almacenamiento y despacho', texto: 'Ubicación del paquete, rotación por vencimiento y registro de la entrega al servicio que lo solicita.' },
      { titulo: 'Recall', texto: 'A partir de una carga o de un equipo, el listado de paquetes afectados con su ubicación o su destino.' },
      { titulo: 'Reportes de gestión', texto: 'Cargas por equipo y por turno, reprocesos, tiempos de ciclo y consumo de insumo por paquete.' },
    ],
  },

  perfiles: {
    titulo: 'Perfiles y permisos.',
    texto: 'Los permisos se asignan por rol y no por persona, de modo que un cambio de turno no obligue a reconfigurar el sistema.',
    items: [
      'Operario de empaque: conforma paquetes e imprime rótulos',
      'Operario de esterilización: conforma cargas y cierra ciclos',
      'Responsable de liberación: libera o retiene la carga con su evidencia',
      'Coordinación de la central: configura sets, vencimientos y consulta reportes',
      'Auditoría: consulta sin modificar',
    ],
  },

  evidencia: {
    titulo: 'Trazabilidad de la evidencia.',
    puntos: [
      'Cada evento queda con fecha, hora, equipo y usuario que lo registró',
      'Los registros de liberación no se editan: se corrigen con un nuevo asiento que deja constancia',
      'La consulta histórica de un paquete reconstruye su recorrido completo',
      'Los reportes se exportan para adjuntarlos a un expediente de auditoría',
    ],
  },

  requisitos: {
    titulo: 'Requisitos e integración.',
    texto: 'La instalación se define contra la infraestructura que ya tiene la institución, en conjunto con su área de sistemas. Lo que sí es independiente de la modalidad:',
    puntos: [
      'Puestos de lectura en empaque, carga, liberación, almacenamiento y despacho',
      'Impresora de rótulos en el punto de empaque',
      'Continuidad de operación cuando la red falla, con sincronización posterior',
      'Respaldo de la información y procedimiento de restauración documentado',
    ],
  },
} as const;

/* ---------------------------------------------------------------- CONTACTO */

export const contactoPagina = {
  titulo: 'Cuéntenos qué necesita esterilizar.',
  bajada:
    'Con el tipo de material, el volumen por turno y el espacio disponible proponemos el equipo y enviamos cotización formal. Si ya tiene pliego o lista de necesidades, trabajamos sobre eso.',
  rutas: [
    { titulo: 'Cotización', texto: 'Equipos, consumibles, accesorios o mobiliario. Formulario general.', ancla: '#cotizacion' },
    { titulo: 'Servicio técnico', texto: 'Marca, modelo y descripción de la falla. Si el equipo está detenido, llame también al fijo.', ancla: '#servicio-tecnico' },
    { titulo: 'Licitaciones', texto: 'Envíe el pliego a comercial@servimedicalgroup.com y lo revisamos contra el alcance que podemos cubrir.', ancla: null },
  ],
} as const;
