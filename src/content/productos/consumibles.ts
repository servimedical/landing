import type { Producto } from './tipos.ts';

export const consumibles: Producto[] = [
  {
    slug: 'papel-y-empaque',
    categoria: 'consumibles',
    titulo: 'Papel grado médico y empaque',
    entradilla:
      'El empaque no envuelve el set: es la barrera estéril. Es lo que sostiene la esterilidad desde que la carga sale del equipo hasta que alguien abre el paquete en sala, y si cede en el almacenamiento o en el transporte el ciclo entero se pierde sin que nadie lo note.',

    procesa: [
      'Rollo mixto y bolsas autosellantes',
      'Papel crepado',
      'Papel grado médico',
      'Cintas indicadoras de proceso',
    ],

    dimensionamiento: [
      'Paquetes por turno y tamaño promedio del set',
      'Método de esterilización de cada línea de material',
      'Si el empaque es de sellado térmico o de doblado',
      'Consumo mensual actual, para programar el abastecimiento',
    ],
    cierreDimensionamiento:
      'Con estas respuestas programamos el abastecimiento contra el consumo real. Sin ellas, la central termina comprando de urgencia al precio que aparezca.',

    estacionPrimaria: 2,

    necesita: [
      {
        titulo: 'Selladoras térmicas',
        url: '/productos/accesorios/selladoras',
        porQue: 'El rollo mixto no sirve de nada sin un sellado con parámetros controlados. El material y el equipo que lo cierra son una sola decisión.',
      },
      {
        titulo: 'Indicadores químicos',
        url: '/productos/consumibles/indicadores-quimicos',
        porQue: 'La cinta indicadora dice que el paquete pasó por el equipo. Para saber qué ocurrió dentro hace falta un indicador interno.',
      },
      {
        titulo: 'Mesas de inspección y empaque',
        url: '/productos/mobiliario/mesas-y-mesones',
        porQue: 'El empaque se conforma en un puesto de trabajo. La superficie y la altura deciden cuántos paquetes salen por turno y en qué estado.',
      },
    ],

    servicio: [
      'Abastecimiento programado contra el consumo real de la central',
      'Acompañamiento en la elección de barrera por método de esterilización',
      'Entrenamiento en conformación y sellado de paquete',
    ],

    marcas: ['Anhui'],
    seo: {
      titulo: 'Papel grado médico y empaque para barrera estéril — Servimedical Group',
      descripcion:
        'Rollo mixto, bolsas autosellantes, papel crepado y cintas indicadoras para central de esterilización. Abastecimiento programado contra consumo real, con despacho nacional desde Bogotá.',
    },
  },

  {
    slug: 'indicadores-quimicos',
    categoria: 'consumibles',
    titulo: 'Indicadores químicos',
    entradilla:
      'Un indicador externo dice que el paquete pasó por el equipo. Uno interno dice que el agente llegó al centro del paquete, que es una afirmación distinta y más difícil, y la central necesita las dos para poder liberar una carga.',

    procesa: [
      'Control externo de proceso',
      'Control interno de paquete',
      'Paquete de prueba',
      'Test de Bowie-Dick diario',
    ],

    dimensionamiento: [
      'Cargas por día y por equipo',
      'Protocolo interno de monitoreo de la institución',
      'Método de esterilización de cada línea',
      'Nivel de evidencia que exige el comité de infecciones',
    ],
    cierreDimensionamiento:
      'Con estas respuestas armamos el esquema de monitoreo y su consumo mensual. Sin ellas, se compra indicador de más en una línea y falta en otra.',

    estacionPrimaria: 4,

    necesita: [
      {
        titulo: 'Papel grado médico y empaque',
        url: '/productos/consumibles/papel-y-empaque',
        porQue: 'El indicador interno va dentro del paquete y el externo va sobre la barrera. El consumo de los dos se mueve al mismo ritmo.',
      },
      {
        titulo: 'Indicadores biológicos',
        url: '/productos/consumibles/indicadores-biologicos',
        porQue: 'El químico es lectura inmediata pero es indicio. El biológico es la prueba. El protocolo se sostiene sobre los dos, no sobre uno.',
      },
      {
        titulo: 'Software de trazabilidad',
        url: '/trazabilidad/software',
        porQue: 'El resultado del indicador tiene que quedar atado a la carga que liberó. Anotado en un cuaderno, no sirve el día del recall.',
      },
    ],

    servicio: [
      'Definición del esquema de monitoreo junto con la central',
      'Abastecimiento programado por carga y por equipo',
      'Entrenamiento en lectura e interpretación de viraje',
    ],

    marcas: ['2i Health Care'],
    seo: {
      titulo: 'Indicadores químicos y test de Bowie-Dick — Servimedical Group',
      descripcion:
        'Indicadores químicos de proceso y de paquete, paquetes de prueba y test de Bowie-Dick diario para central de esterilización. Abastecimiento programado y despacho nacional desde Bogotá.',
    },
  },

  {
    slug: 'indicadores-biologicos',
    categoria: 'consumibles',
    titulo: 'Indicadores biológicos',
    entradilla:
      'Es la única evidencia de que el proceso mató la carga microbiana; todo lo demás es indicio. Cuando el comité de infecciones pregunta por una carga de hace seis meses, lo que respalda la respuesta es este registro y no la impresión del equipo.',

    procesa: [
      'Control biológico de carga',
      'Verificación periódica de equipo',
      'Liberación de carga con implantes según protocolo',
    ],

    dimensionamiento: [
      'Frecuencia de control biológico definida por el protocolo de la institución',
      'Número de equipos y de cargas que hay que cubrir',
      'Disponibilidad de incubadora en la central',
      'Tiempo de lectura que tolera la operación sin frenar el giro quirúrgico',
    ],
    cierreDimensionamiento:
      'Con estas respuestas definimos la frecuencia y el consumo. Sin ellas, el control biológico termina siendo el insumo que se acaba justo el día que hay implantes.',

    estacionPrimaria: 4,

    necesita: [
      {
        titulo: 'Indicadores químicos',
        url: '/productos/consumibles/indicadores-quimicos',
        porQue: 'El biológico se lee en horas y el químico en el momento. La carga se libera con los dos, cada uno respondiendo lo que el otro no puede.',
      },
      {
        titulo: 'Autoclaves de vapor',
        url: '/productos/esterilizacion/autoclaves-de-vapor',
        porQue: 'El control biológico también verifica el equipo, no solo la carga. Un resultado no conforme es un dato de mantenimiento, no solo de proceso.',
      },
      {
        titulo: 'Software de trazabilidad',
        url: '/trazabilidad/software',
        porQue: 'Un biológico positivo obliga a saber qué paquetes salieron de esa carga. Sin registro, se recoge el inventario completo y se reprocesa a ciegas.',
      },
    ],

    servicio: [
      'Definición de la frecuencia de control junto con la central',
      'Abastecimiento programado, con reserva para cargas con implantes',
      'Entrenamiento en incubación, lectura y conducta ante resultado no conforme',
    ],

    marcas: ['{{ POR CONFIRMAR: marcas de indicadores biológicos e incubadoras que representa SVMG }}'],
    seo: {
      titulo: 'Indicadores biológicos para liberación de carga — Servimedical Group',
      descripcion:
        'Control biológico de carga y verificación de equipo para central de esterilización, con incubación y lectura. Definición de frecuencia según protocolo y abastecimiento programado en Colombia.',
    },
  },
];
