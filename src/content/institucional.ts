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
  /** Qué incluye: entregables concretos, no adjetivos. */
  puntos: string[];
  /** Cuándo se necesita. Dos o tres situaciones reconocibles. */
  cuando?: string[];
  /** Qué norma o resolución lo exige, y qué dice exactamente. */
  exigencia?: { norma: string; que: string };
  /** Lo que queda en papel. Es lo que mira una auditoría de habilitación. */
  enPapel?: string[];
  /** Llamado propio del bloque. */
  cta?: { texto: string; url: string };
};

/** Un paso del ciclo de vida del equipo, de los planos a la revalidación. */
export type PasoCiclo = { titulo: string; que: string };

/** Un paso de la ruta de un equipo detenido. `horas` solo se pinta cuando
 *  deja de ser marcador: una cifra inventada de tiempo de respuesta es lo
 *  primero que un cliente verifica y lo primero que destruye la confianza. */
export type PasoAveria = { titulo: string; que: string; horas?: string };

/* Cuatro servicios, una sola fuente. La home pinta las tarjetas y /servicios
   el detalle; si se añade uno aquí, aparece en los dos sitios. */
export const servicios = {
  lead: 'El equipo se compra una vez y se sostiene durante quince años. Esto es lo que pasa en esos quince años.',
  /* Orden deliberado: mantenimiento primero porque es lo que decide si la
     institución vuelve a comprar, e instalación al final porque es lo que
     menos se busca —se da por hecho que viene incluido—. */
  items: [
    {
      slug: 'mantenimiento',
      titulo: 'Mantenimiento preventivo y correctivo',
      resumen: 'Rutina por equipo, repuesto original y la hoja de vida al día.',
      angulo: 'Un mantenimiento sin informe no existe para el auditor.',
      puntos: [
        'Preventivo con rutina y protocolo propios de cada equipo, según la recomendación del fabricante',
        'Correctivo con repuesto original, amparado por el permiso de comercialización del equipo',
        'Reposición programada de partes de desgaste: empaquetadura, válvulas, filtros, sensores',
        'Contrato con tiempo de respuesta pactado por escrito',
      ],
      cuando: [
        'Cuando llega la auditoría de habilitación y la hoja de vida tiene huecos',
        'Cuando el equipo aborta ciclos y nadie sabe si es la máquina, el agua o el vapor',
        'Cuando el proveedor anterior dejó de responder y no hay repuesto',
      ],
      exigencia: {
        norma: 'Resolución 3100 de 2019',
        que: 'Obliga a toda IPS a tener programa de mantenimiento preventivo según la recomendación del fabricante, y hoja de vida por equipo con el registro del preventivo y del correctivo.',
      },
      enPapel: [
        'Orden de trabajo firmada por visita',
        'Informe técnico con lo encontrado y lo intervenido',
        'Hoja de vida del equipo actualizada',
        'Cronograma del año con las fechas del preventivo',
      ],
      cta: { texto: 'Programar mantenimiento', url: '/contacto#cotizar' },
    },
    {
      slug: 'entrenamiento',
      titulo: 'Entrenamiento',
      resumen: 'Al personal de la central y al área biomédica, sobre los equipos que operan.',
      angulo: 'Un equipo mal cargado no esteriliza, por bueno que sea.',
      puntos: [
        'Carga, conformación de paquete y empaque compatible con cada método',
        'Lectura e interpretación de indicadores y criterios de liberación de carga',
        'Rutina diaria de verificación y conducta ante un resultado no conforme',
        'Primer nivel de diagnóstico para el área biomédica, para separar la falla real de la de operación',
      ],
      cuando: [
        'Al recibir un equipo nuevo, antes de la primera carga real',
        'Cuando rota el personal de la central',
        'Cuando aparecen cargas no conformes sin causa evidente',
      ],
      exigencia: {
        norma: 'Decreto 4725 de 2005',
        que: 'Obliga al fabricante o importador a ofrecer el entrenamiento necesario para la operación y el mantenimiento básico del equipo. No es un extra comercial: es una obligación de quien importa.',
      },
      enPapel: [
        'Lista de asistencia',
        'Constancia por persona entrenada',
        'Material de consulta entregado a la central',
      ],
      cta: { texto: 'Solicitar entrenamiento', url: '/contacto#cotizar' },
    },
    {
      slug: 'diseno-de-central',
      titulo: 'Diseño y obra civil para centrales de esterilización',
      resumen: 'El estudio que decide si la central va a funcionar, antes de construirla.',
      angulo: 'Corregir un flujo en planos cuesta una reunión. Corregirlo construido cuesta la obra otra vez.',
      puntos: [
        'Flujo unidireccional sucio–limpio–estéril, con sus barreras físicas',
        'Zonificación de áreas y control de acceso',
        'Dimensionamiento por carga quirúrgica y rotación de sets, no por metros cuadrados disponibles',
        'Requerimientos de agua, vapor, aire comprimido y acometida eléctrica',
        'Ventilación, presiones diferenciales y recambios de aire por área',
        'Plan de dotación de equipos y mobiliario, con presupuesto',
      ],
      cuando: [
        'En obra nueva, cuando la central todavía es un rectángulo en el plano',
        'En ampliación, cuando el volumen quirúrgico creció y la central no',
        'En remodelación, cuando el flujo cruza sucio con estéril y hay que separarlos',
      ],
      exigencia: {
        norma: 'Resolución 3100 de 2019',
        que: 'El estándar de infraestructura exige áreas diferenciadas y flujo que evite el cruce entre material sucio y material estéril. El criterio técnico de recambios de aire y presiones diferenciales se toma de la guía internacional AAMI ST79, que no es norma colombiana y se cita como lo que es.',
      },
      enPapel: [
        'Planos de flujo y zonificación',
        'Memoria de cálculo de la dotación',
        'Requerimientos de acometidas para el diseñador eléctrico e hidráulico',
        'Presupuesto de equipamiento y mobiliario',
      ],
      cta: { texto: 'Solicitar diseño de central', url: '/contacto#cotizar' },
    },
    {
      slug: 'instalacion-y-calificacion',
      titulo: 'Instalación y calificación',
      resumen: 'Verificación de acometidas, puesta en marcha y calificación de instalación, operación y desempeño.',
      angulo: 'No se instala un esterilizador sobre una acometida que no lo sostiene.',
      puntos: [
        'Verificación previa de acometidas eléctrica, hidráulica y de vapor contra la ficha del equipo',
        'Instalación, nivelación y conexión a servicios',
        'Calificación de instalación (IQ) y de operación (OQ)',
        'Calificación de desempeño (PQ) sobre la carga real de la institución',
        'Pruebas de fuga de vacío, Bowie-Dick y ciclos de aceptación',
      ],
      cuando: [
        'Al recibir un equipo nuevo',
        'Al trasladar un equipo de sede o de sala',
        'Después de una intervención mayor que toque cámara, generador o control',
      ],
      exigencia: {
        norma: 'ISO 17665',
        que: 'Define el marco de validación del proceso de calor húmedo: IQ comprueba que el equipo se instaló según su especificación, OQ que opera dentro de los límites previstos, y PQ que el proceso es efectivo sobre el producto real. La revalidación anual es buena práctica internacional, no exigencia de la norma colombiana.',
      },
      enPapel: [
        'Acta de instalación y lista de verificación de acometidas',
        'Protocolos de IQ, OQ y PQ con sus datos crudos',
        'Certificados de calibración de los patrones usados, con trazabilidad a laboratorio acreditado por la ONAC',
        'Manual de operación en español',
      ],
      cta: { texto: 'Programar instalación', url: '/contacto#cotizar' },
    },
  ] satisfies Servicio[],

  /* La columna visual de la página: lo que le pasa a un equipo desde que es
     una línea en un plano hasta que se reemplaza. */
  cicloDeVida: [
    { titulo: 'Diseño', que: 'Flujo, zonas y dimensionamiento antes de que haya obra.' },
    { titulo: 'Obra', que: 'Acometidas de agua, vapor, aire y electricidad según la ficha del equipo.' },
    { titulo: 'Instalación', que: 'Montaje, nivelación y conexión.' },
    { titulo: 'Calificación', que: 'IQ, OQ y PQ con sus protocolos firmados.' },
    { titulo: 'Entrenamiento', que: 'La central opera el equipo antes de la primera carga real.' },
    { titulo: 'Preventivo', que: 'Rutina programada y hoja de vida al día.' },
    { titulo: 'Correctivo', que: 'Diagnóstico, repuesto original y pruebas de aceptación.' },
    { titulo: 'Revalidación', que: 'Recalificación periódica del proceso.' },
    { titulo: 'Repuestos', que: 'Partes de desgaste reservadas contra el plan del año.' },
  ] satisfies PasoCiclo[],

  /* Un equipo detenido es una central detenida y una programación quirúrgica
     que se cae. Los tiempos van en marcador: una cifra de respuesta que no se
     pueda sostener es lo primero que el cliente verifica. */
  equipoDetenido: {
    lead: 'Un autoclave detenido no es un equipo averiado: es una programación quirúrgica que se cae esa misma tarde.',
    pasos: [
      { titulo: 'Llamada', que: 'Marca, modelo, serie y qué muestra el equipo en pantalla. Si el equipo está detenido, al fijo y no al formulario.', horas: '{{ CONFIRMAR SLA · contacto }}' },
      { titulo: 'Diagnóstico remoto', que: 'Buena parte de lo que detiene un ciclo es agua, vapor o carga, no la máquina. Se descarta por teléfono antes de mover a un técnico.', horas: '{{ CONFIRMAR SLA · diagnóstico }}' },
      { titulo: 'Visita', que: 'Técnico en sitio con el histórico del equipo y las partes de desgaste más probables.', horas: '{{ CONFIRMAR SLA · visita en Bogotá }}' },
      { titulo: 'Repuesto', que: 'Si la parte no está en inventario, se informa el tiempo real de importación el mismo día. No se promete una fecha que dependa de una aduana.', horas: '{{ CONFIRMAR SLA · repuesto }}' },
      { titulo: 'Pruebas y entrega', que: 'Ciclo de aceptación, fuga de vacío y Bowie-Dick antes de devolver el equipo a producción. Informe y hoja de vida actualizada.' },
    ] satisfies PasoAveria[],
  },

  faq: [
    {
      p: '¿El mantenimiento del equipo lo puede hacer cualquier proveedor?',
      r: 'Puede, pero el repuesto no. El Decreto 4725 de 2005 exige que los repuestos de un equipo biomédico importado estén amparados por el permiso de comercialización de ese equipo, y que la importación se reporte al INVIMA. Un repuesto sin esa cadena es un hallazgo de auditoría, no un ahorro.',
    },
    {
      p: '¿Qué pide exactamente la auditoría de habilitación?',
      r: 'Inventario con marca, modelo, serie, registro sanitario y clasificación de riesgo; programa de mantenimiento preventivo según la recomendación del fabricante; y hoja de vida por equipo con el registro de preventivos y correctivos. Los hallazgos más frecuentes son hojas de vida incompletas y órdenes de trabajo sin firma.',
    },
    {
      p: '¿Cada cuánto hay que recalificar un autoclave?',
      r: 'La práctica internacional es anual, y además después de cualquier intervención mayor sobre cámara, generador o sistema de control. La norma colombiana no fija una periodicidad explícita: la referencia es el marco de validación de la ISO 17665 y el protocolo que adopte la institución.',
    },
    {
      p: '¿La calificación la puede hacer el mismo que vende el equipo?',
      r: 'Sí, y es lo habitual, porque quien conoce la máquina es quien la representa. Lo que no puede faltar es la trazabilidad metrológica: los patrones con los que se mide deben tener certificado de calibración vigente de un laboratorio acreditado por la ONAC. Sin eso, la calificación no sostiene una auditoría.',
    },
    {
      p: 'Nos dijeron que la central no cumple el flujo. ¿Eso se arregla sin obra?',
      r: 'A veces. Lo que define el flujo no siempre es el muro: con frecuencia es la ubicación de la ventanilla de entrega, el sentido de la puerta del autoclave de doble puerta o el recorrido del carro de transporte. El estudio empieza por ahí, porque es lo que se puede corregir sin romper nada.',
    },
    {
      p: '¿Qué pasa si el equipo es de una marca que ustedes no representan?',
      r: 'Se atiende si hay acceso a repuesto original y documentación técnica del fabricante. Si no lo hay, se dice de entrada. Mantener un equipo a ciegas y sin repuesto amparado no le sirve a la institución ni sostiene una auditoría.',
    },
    {
      p: '¿Un evento adverso con un esterilizador hay que reportarlo?',
      r: 'Sí. La Resolución 4816 de 2008 establece el programa de tecnovigilancia, que obliga a reportar eventos e incidentes adversos con dispositivos médicos. El informe técnico del correctivo es parte del soporte de ese reporte.',
    },
  ],
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
