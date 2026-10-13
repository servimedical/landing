import type { Linea } from './tipos.ts';

/* ============================================================================
   LAS LÍNEAS · el método

   Aquí se explica cómo funciona cada método, qué procesa y qué no, y bajo qué
   normas. Una sola vez. Los productos no repiten nada de esto: enlazan.

   `orden` es el orden del ciclo de la central, no el alfabético.
   ========================================================================== */

export const lineas: Linea[] = [
  {
    slug: 'termodesinfectoras',
    nombre: 'Termodesinfectoras',
    descriptor: 'Lavado y desinfección térmica validada',
    etapa: 'lavado',
    orden: 3,
    lead: 'Lavado y desinfección térmica automática del instrumental antes del empaque. Sin una carga limpia no hay esterilización que valga.',
    comoFunciona: [
      'Lavan, desinfectan por calor y secan el instrumental en un solo ciclo cerrado, sin que nadie manipule material contaminado. La ISO 15883 mide la desinfección con el valor A0: A0 600 es el mínimo para instrumental quirúrgico.',
    ],
    compatible: [
      'Instrumental quirúrgico',
      'Contenedores',
      'Material de anestesia',
      'Instrumental canulado, con carro de inyección',
    ],
    noCompatible: [
      'Endoscopios flexibles, que van a una reprocesadora de endoscopios',
      'Material termosensible que no tolere 90 °C',
    ],
    normas: [
      { norma: 'ISO 15883-1', que: 'Lavadoras desinfectadoras: requisitos generales, términos y ensayos.' },
      { norma: 'ISO 15883-2', que: 'Requisitos para las que procesan instrumental quirúrgico, de anestesia y contenedores.' },
    ],
    faq: [
      { p: '¿Reemplaza el lavado manual?', r: 'Sí, para todo lo que entra en un carro. Es repetible y queda registrado, que es lo que el lavado manual no puede ofrecer.' },
      { p: '¿Qué agua necesita?', r: 'Blanda para el lavado y desmineralizada para el enjuague final, para no dejar manchas ni residuos sobre el instrumental ya limpio.' },
      { p: '¿Cómo se verifica la limpieza?', r: 'Con pruebas de limpieza —de suciedad o de proteína— por carga o por turno, según el protocolo de la institución.' },
    ],
    seo: {
      titulo: 'Termodesinfectoras en Colombia | Servimedical',
      descripcion: 'Lavado y desinfección térmica validada por encima de 90 °C bajo ISO 15883, con secado por aire filtrado. Equipos Tuttnauer y Sanqiang en Colombia.',
    },
  },

  {
    slug: 'autoclaves',
    nombre: 'Autoclaves',
    descriptor: 'El método de referencia de la central',
    etapa: 'esterilizacion',
    orden: 1,
    lead: 'Vapor saturado a 121 o 134 °C para todo lo que resiste calor y humedad. El método de referencia de la central.',
    comoFunciona: [
      'Vapor saturado a 121 o 134 °C bajo presión, precedido de vacío fraccionado para sacar el aire de los lúmenes: donde queda aire, no hay esterilización. Es el método de referencia de la central, el más barato por carga y el único sin residuo tóxico.',
    ],
    compatible: [
      'Instrumental metálico',
      'Textiles y ropa quirúrgica',
      'Contenedores rígidos',
      'Vidrio',
      'Caucho y siliconas termorresistentes',
    ],
    noCompatible: [
      'Óptica, cables y motores, que van a plasma',
      'Polímeros termosensibles',
      'Líquidos en recipientes sellados',
    ],
    normas: [
      { norma: 'ISO 17665', que: 'Esterilización por calor húmedo: desarrollo, validación y control de rutina del proceso.' },
      { norma: 'EN 285', que: 'Requisitos de los esterilizadores de vapor grandes, los de central.' },
      { norma: 'EN 13060', que: 'Requisitos de los esterilizadores de vapor pequeños, los de consultorio y sala.' },
    ],
    faq: [
      { p: '¿121 o 134 °C?', r: '134 °C para la mayoría del instrumental envuelto, con exposición de 4 minutos. 121 °C para material que no tolera 134 °C, con exposición más larga.' },
      { p: '¿Por qué la prueba de Bowie-Dick todos los días?', r: 'Porque detecta aire residual o fugas antes de procesar la primera carga. Un prevacío que falla no se nota en el paquete: se nota en el indicador.' },
      { p: '¿Qué agua necesita el generador?', r: 'Desmineralizada o de baja conductividad, para proteger el generador y la calidad del vapor. La incrustación no se ve hasta que el equipo falla.' },
      { p: '¿Mesa o central?', r: 'Depende de la carga por turno y del tamaño de los sets. Un equipo de mesa procesa bandejas; uno de central procesa carros completos. Se dimensiona con las cirugías por día.' },
    ],
    seo: {
      titulo: 'Autoclaves de vapor en Colombia | Servimedical',
      descripcion: 'Autoclaves de vapor de 18 a 1.500 L, de mesa bajo EN 13060 a central bajo EN 285, a 121 y 134 °C. Equipos Tuttnauer y Sanqiang con servicio técnico propio.',
    },
  },

  {
    slug: 'baja-temperatura',
    nombre: 'Baja temperatura',
    descriptor: 'Baja temperatura para lo termosensible',
    etapa: 'esterilizacion',
    orden: 2,
    lead: 'Peróxido de hidrógeno vaporizado por debajo de 55 °C para lo que el vapor destruye: óptica, cables, motores y polímeros.',
    comoFunciona: [
      'Peróxido de hidrógeno vaporizado por debajo de 55 °C, para lo que el vapor destruye: óptica, electrónica, polímeros y lúmenes largos. Ciclos de 30 a 60 minutos y carga lista al terminar, sin aireación.',
    ],
    compatible: [
      'Óptica rígida',
      'Cables y fibra',
      'Motores e instrumental con electrónica',
      'Polímeros y material termosensible',
    ],
    noCompatible: [
      'Celulosa: papel, textiles y gasa, que absorben el peróxido y abortan el ciclo',
      'Líquidos y polvos',
      'Lúmenes fuera del límite de diámetro y longitud de cada equipo',
    ],
    empaque: 'Se empaca en Tyvek o en envoltorio SMS de polipropileno, nunca en papel.',
    normas: [
      { norma: 'ISO 14937', que: 'Requisitos generales para caracterizar un agente esterilizante y validar el proceso.' },
      { norma: 'ISO 22441', que: 'Esterilización a baja temperatura por peróxido de hidrógeno vaporizado.' },
    ],
    faq: [
      { p: '¿Por qué no se puede usar papel?', r: 'La celulosa neutraliza el peróxido. El empaque de esta línea es Tyvek o SMS.' },
      { p: '¿Reemplaza al autoclave?', r: 'No. Es complementario: el plasma cubre lo termosensible y el vapor todo lo demás. Una central necesita los dos.' },
      { p: '¿Qué indicador uso?', r: 'Uno específico para peróxido. Los indicadores de vapor no viran con este método y dan una lectura que no significa nada.' },
    ],
    seo: {
      titulo: 'Esterilización a baja temperatura en Colombia | Servimedical',
      descripcion: 'Peróxido de hidrógeno vaporizado por debajo de 55 °C bajo ISO 14937, en ciclos de 30 a 60 minutos. Equipos Tuttnauer PlazMax y Sanqiang SQ-WD.',
    },
  },

  {
    slug: 'reprocesadoras-endoscopios',
    nombre: 'Reprocesadoras de endoscopios',
    nombreNav: 'Endoscopios',
    descriptor: 'Lo que no resiste el autoclave',
    etapa: 'lavado',
    orden: 4,
    lead: 'El endoscopio flexible no se puede autoclavar y no se puede abrir: se reprocesa por dentro, canal por canal, y esa es toda la dificultad.',
    comoFunciona: [
      'Lavan e irrigan cada canal del endoscopio flexible, lo desinfectan de alto nivel por inmersión química y lo enjuagan con agua tratada. La ISO 15883-4 exige además prueba de fugas y registro por ciclo: el endoscopio no se puede autoclavar ni abrir.',
    ],
    compatible: [
      'Endoscopios flexibles con canal de aire, agua, biopsia y succión',
      'Desinfección de alto nivel con ácido peracético u ortoftalaldehído',
      'Enjuague final con agua tratada por ósmosis inversa o filtración absoluta',
    ],
    noCompatible: [
      'Esterilización por vapor de un endoscopio flexible: el material no la resiste',
      'Reprocesamiento sin limpieza manual previa en el punto de uso',
      'Enjuague final con agua de red sin tratar',
    ],
    normas: [
      { norma: 'ISO 15883-1', que: 'Lavadoras-desinfectadoras: requisitos generales, definiciones y ensayos.' },
      { norma: 'ISO 15883-4', que: 'Requisitos propios de las lavadoras-desinfectadoras de endoscopios termolábiles, incluida la prueba de fugas y la verificación de canales.' },
      { norma: 'Resolución 3100 de 2019', que: 'El estándar de procesos prioritarios exige procedimiento documentado de reprocesamiento y registro por equipo.' },
    ],
    faq: [
      { p: '¿Se puede esterilizar un endoscopio flexible?', r: 'Por vapor no: el material no resiste la temperatura. Existen procesos de esterilización a baja temperatura para algunos modelos, pero el estándar de uso en endoscopia digestiva y respiratoria es la desinfección de alto nivel tras un lavado validado.' },
      { p: '¿Por qué importa tanto la prueba de fugas?', r: 'Porque una perforación en la cubierta mete líquido en la óptica y en la electrónica. El ciclo no solo no desinfecta el interior: arruina el endoscopio, que cuesta más que la máquina que lo reprocesa.' },
      { p: '¿Hace falta tratar el agua del enjuague?', r: 'Sí. El enjuague es el último contacto del endoscopio antes de usarse en un paciente; con agua de red se le devuelve la carga microbiana que se acaba de eliminar. La norma pide agua de calidad definida para esa etapa.' },
      { p: '¿Cuántos endoscopios caben por ciclo?', r: 'Depende del equipo, y esa cifra la define la ficha del fabricante. Es la primera pregunta que hay que resolver contra el volumen de procedimientos de la institución, porque condiciona cuántas máquinas se necesitan.' },
    ],
    seo: {
      titulo: 'Reprocesadoras de endoscopios en Colombia | Servimedical',
      descripcion: 'Lavado y desinfección de alto nivel de endoscopios flexibles bajo ISO 15883-4, con prueba de fugas, irrigación de canales y enjuague con agua tratada.',
    },
  },

  {
    slug: 'otros-equipos',
    nombre: 'Otros equipos de la central',
    nombreNav: 'Otros equipos',
    descriptor: 'Lo que la central también necesita',
    etapa: 'transversal',
    orden: 5,
    lead: 'Una central no son solo esterilizadores: también sella la barrera e incuba la evidencia, y esos equipos deciden tanto como el autoclave si la carga se libera.',
    comoFunciona: [
      'Lo que la central también necesita: selladoras que cierran la barrera estéril con temperatura y presión controladas, e incubadoras que revelan el resultado del indicador biológico. Sin ellas, ni el empaque ni la evidencia se sostienen.',
    ],
    compatible: [
      'Sellado de rollos y sobres papel-película',
      'Sellado de Tyvek y envoltorio de polipropileno',
      'Incubación de indicadores biológicos de lectura convencional y rápida',
    ],
    noCompatible: [
      'Sellado por grapa, cinta o doblado, que no constituye barrera estéril',
      'Incubación a temperatura no controlada o fuera del rango de la referencia',
    ],
    normas: [
      { norma: 'ISO 11607-2', que: 'Validación de los procesos de empaque: formado, sellado y ensamblaje, con IQ, OQ y PQ.' },
      { norma: 'EN 868-5', que: 'Requisitos de las bolsas y rollos termosellables, incluido el ancho mínimo de sello.' },
      { norma: 'ISO 11138-1', que: 'Indicadores biológicos: requisitos generales, incluidas las condiciones de incubación.' },
    ],
    faq: [
      { p: '¿Una selladora de bolsas de cocina sirve?', r: 'No. Lo que exige la ISO 11607-2 no es que el sello pegue, sino que el proceso sea reproducible y demostrable: temperatura controlada, presión y velocidad constantes, y registro. Sin eso no hay nada que validar.' },
      { p: '¿Cada cuánto se verifica el sello?', r: 'La práctica es verificar al inicio de cada turno con una tarjeta o solución de prueba, que revela canales y discontinuidades que no se ven a simple vista. La validación completa del proceso es anual o tras cualquier cambio de material o de equipo.' },
      { p: '¿Puedo incubar el indicador en una estufa de laboratorio?', r: 'Solo si sostiene el rango de temperatura de la referencia y está calibrada. Una incubadora dedicada es más barata que el riesgo de un falso negativo, que es una carga liberada sin evidencia.' },
    ],
    seo: {
      titulo: 'Selladoras e incubadoras para central de esterilización | Servimedical',
      descripcion: 'Selladoras automáticas con control y registro de los parámetros del sello, e incubadoras para indicadores biológicos.',
    },
  },

  {
    slug: 'indicadores',
    nombre: 'Indicadores y empaque',
    /* En el menú sobra «y empaque»: ocupa dos líneas y el visitante que busca
       papel llega igual por el producto. */
    nombreNav: 'Indicadores',
    descriptor: 'La barrera y la evidencia',
    etapa: 'monitoreo',
    etapasAdicionales: ['empaque'],
    orden: 7,
    lead: 'Dos mitades del mismo control: el empaque sostiene la barrera estéril y los indicadores prueban que el proceso funcionó dentro de ella.',
    comoFunciona: [
      'El empaque sostiene la barrera estéril bajo ISO 11607 y los indicadores prueban que el proceso funcionó dentro de ella: el químico confirma que el agente llegó, el biológico que mató las esporas. Se compran juntos porque fallan juntos.',
    ],
    compatible: [
      'Rollos y sobres papel-película para vapor y óxido de etileno',
      'Papel crepado y envoltorio SMS para doblado de sets',
      'Tyvek-película para baja temperatura y óxido de etileno',
      'Control externo de proceso, sobre la barrera',
      'Control interno de paquete, en el centro de la carga',
      'Paquete de prueba, armado con el mismo material que representa',
      'Test de Bowie-Dick diario, en la primera carga del día',
      'Control biológico de carga y verificación periódica de cada equipo',
    ],
    noCompatible: [
      'Papel y celulosa en ciclos de peróxido de hidrógeno',
      'Empaque reutilizado o con el sello comprometido',
      'Un indicador de vapor en un ciclo de peróxido, y al revés: cada método tiene el suyo',
      'La liberación de una carga con implantes sin control biológico',
    ],
    empaque: 'El sello térmico debe tener un ancho mínimo de 6 mm, según la EN 868-5.',
    normas: [
      { norma: 'ISO 11140-1', que: 'Indicadores químicos: clases, requisitos y métodos de ensayo.' },
      { norma: 'ISO 11140-4', que: 'Indicadores de la prueba de Bowie-Dick.' },
      { norma: 'ISO 11138-1 y -3', que: 'Indicadores biológicos: requisitos generales y los propios del vapor.' },
      { norma: 'ISO 11607-1 y -2', que: 'Sistemas de barrera estéril: requisitos de materiales y validación de los procesos de empaque.' },
      { norma: 'EN 868-2, -3 y -5', que: 'Requisitos del papel de envoltura, el papel crepado y las bolsas y rollos termosellables.' },
    ],
    faq: [
      { p: '¿Basta con el indicador externo?', r: 'No. El externo dice que el paquete pasó por el equipo; el interno, que el agente llegó al centro de la carga.' },
      { p: '¿Con qué frecuencia el biológico?', r: 'Como mínimo semanal, según la Resolución 3100 de 2019, y preferiblemente diario. La carga con implantes no admite excepción.' },
      { p: '¿Sirve el mismo indicador para vapor y para baja temperatura?', r: 'No. Cada método tiene el suyo, y uno de vapor no vira con peróxido.' },
      { p: '¿Por qué no sirve el mismo empaque para vapor y para baja temperatura?', r: 'Porque la celulosa absorbe el peróxido, baja la concentración del agente y aborta el ciclo. La baja temperatura exige Tyvek o SMS.' },
      { p: '¿Cuánto dura la barrera estéril?', r: 'El vencimiento lo define el protocolo de la institución según el tipo de empaque y las condiciones de almacenamiento, no el material por sí solo.' },
    ],
    seo: {
      titulo: 'Indicadores y empaque para esterilización | Servimedical',
      descripcion: 'Indicadores de las clases 1 a 6 de ISO 11140-1, indicadores biológicos bajo ISO 11138 y barrera estéril bajo ISO 11607 y EN 868.',
    },
  },

  {
    slug: 'mobiliario',
    nombre: 'Mobiliario en acero inoxidable',
    descriptor: 'El flujo de sucio a limpio a estéril',
    etapa: 'almacenamiento',
    orden: 8,
    lead: 'Mesas, mesones, carros y estanterías que definen el recorrido del material. El mobiliario no acompaña el flujo de la central: lo construye.',
    comoFunciona: [
      'Acero inoxidable AISI 304 y 316 dimensionado contra el plano de la central: mesas de recepción y empaque, carros de transporte y estantería de almacenamiento estéril. Define el flujo de sucio a limpio a estéril antes que cualquier equipo.',
    ],
    compatible: [
      'Mesones de lavado con poceta y escurridero, en la zona sucia',
      'Mesas de inspección y empaque, en la zona limpia',
      'Carros de transporte cerrados y diferenciados por flujo',
      'Carros de carga y descarga de autoclave',
      'Estantería y armarios para almacenamiento estéril',
    ],
    noCompatible: [
      'Un mismo carro para material sucio y estéril',
      'Superficies con uniones, remaches o juntas que retengan residuo',
    ],
    normas: [
      { norma: 'Resolución 3100 de 2019', que: 'Exige mesón de trabajo con poceta y flujo unidireccional en cada etapa de la central.' },
      { norma: 'Resolución 2183 de 2004', que: 'Manual de buenas prácticas de esterilización.' },
    ],
    faq: [
      { p: '¿Se puede usar un mismo carro para sucio y para estéril?', r: 'No. En cuanto un carro hace los dos recorridos, la barrera que separa lo sucio de lo estéril deja de significar algo.' },
      { p: '¿A qué altura se almacena el material estéril?', r: 'La AAMI ST79 recomienda a 20–25 cm del piso, a 45 cm de los rociadores y a 5 cm de los muros exteriores. Es una recomendación internacional, no una norma colombiana.' },
    ],
    seo: {
      titulo: 'Mobiliario en acero inoxidable para central | Servimedical',
      descripcion: 'Mesones con poceta, mesas de empaque, carros diferenciados por flujo y estantería estéril en acero AISI 304 y 316, bajo Resolución 3100 de 2019.',
    },
  },

  {
    slug: 'residuos-hospitalarios',
    nombre: 'Tratamiento de residuos',
    descriptor: 'Vapor y trituración en sitio',
    etapa: 'residuos',
    orden: 6,
    lead: 'Vapor y trituración en el mismo sitio donde se genera el residuo biosanitario. Sale estéril, irreconocible y con una fracción del volumen.',
    comoFunciona: [
      'Trituran y esterilizan con vapor el residuo biosanitario en el mismo sitio donde se genera. Sale irreconocible, estéril y con una fracción del volumen, así que deja de ser residuo peligroso y baja el costo de disposición.',
    ],
    compatible: [
      'Cortopunzantes en contenedor rígido',
      'Jeringas, gasas y textiles',
      'Plásticos y vidrio',
      'Filtros de diálisis',
    ],
    noCompatible: [
      'Residuo químico y farmacéutico',
      'Residuo citotóxico',
      'Residuo radiactivo',
    ],
    normas: [
      { norma: 'Reducción logarítmica validada', que: 'La eficacia se demuestra con el nivel de inactivación que declara el fabricante y que validan organismos independientes.' },
      { norma: 'STAATT nivel IV', que: 'Escala internacional de inactivación para tecnologías de tratamiento de residuos médicos.' },
    ],
    faq: [
      { p: '¿Qué pasa con el residuo tratado?', r: 'Sale estéril y triturado, y se dispone como residuo no peligroso según la autorización ambiental de la institución.' },
      { p: '¿Cuánto reduce?', r: 'Hasta una quinta parte del volumen original, según el equipo y el tipo de residuo.' },
      { p: '¿Elimina al gestor externo?', r: 'No lo elimina: reduce el volumen y el riesgo del material que sale. Lo que exige la normativa ambiental sobre disposición final lo define la autoridad competente.' },
    ],
    seo: {
      titulo: 'Tratamiento de residuos hospitalarios | Servimedical',
      descripcion: 'Esterilización con vapor y trituración de residuo biosanitario en sitio, de 20 a 1.800 kg por ciclo. Equipos Akarmak en Colombia.',
    },
  },

  {
    slug: 'repuestos',
    nombre: 'Repuestos',
    descriptor: 'Partes originales con inventario local',
    etapa: 'transversal',
    orden: 9,
    lead: 'Repuesto para el mantenimiento preventivo, el correctivo y la revalidación anual. Un autoclave detenido es un quirófano detenido.',
    comoFunciona: [
      'Partes de desgaste de los equipos de la central: empaquetaduras y fuelles de puerta, filtros, válvulas, sensores y bombas. Se cambian por calendario contra la rutina de mantenimiento, no cuando el equipo ya está detenido.',
    ],
    compatible: [
      'Empaques y fuelles de puerta',
      'Filtros de cámara y bacteriológicos de línea',
      'Válvulas, trampas de vapor y purgadores',
      'Sensores y transductores de temperatura y presión',
      'Bombas de vacío y resistencias de generador',
      'Impresoras de ciclo y papel térmico',
    ],
    noCompatible: [
      'Partes adaptadas o equivalentes no originales',
    ],
    normas: [
      { norma: 'Resolución 2183 de 2004', que: 'Manual de buenas prácticas de esterilización.' },
    ],
    faq: [
      { p: '¿Atienden equipos que no compramos a ustedes?', r: 'Sí, dentro y fuera de garantía.' },
      { p: '¿Trabajan con partes equivalentes?', r: 'No. En un equipo que esteriliza material que entra a un paciente, una parte adaptada cambia el comportamiento del ciclo sin que nadie lo vea.' },
      { p: 'No sé qué parte falló. ¿Qué hago?', r: 'El diagnóstico va antes del pedido. Con la placa del equipo y la descripción de la falla, el servicio técnico identifica la parte.' },
    ],
    seo: {
      titulo: 'Repuestos para equipos de esterilización | Servimedical',
      descripcion: 'Empaques de puerta, filtros, válvulas, sensores y bombas para autoclaves, plasma y termodesinfectoras, con existencias en Bogotá.',
    },
  },
];

export const lineaPorSlug = (slug: string) => lineas.find((l) => l.slug === slug);
export const urlLinea = (slug: string) => `/lineas/${slug}`;

