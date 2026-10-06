import type { Producto } from './tipos.ts';

export const consumibles: Producto[] = [
  {
    slug: 'papel-y-empaque',
    categoria: 'consumibles',
    titulo: 'Papel grado médico y empaque',
    entradilla:
      'El empaque no envuelve el set: es la barrera estéril. Sostiene la esterilidad hasta que alguien abre el paquete en sala.',

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
        porQue: 'El material y el equipo que lo cierra son una sola decisión.',
      },
      {
        titulo: 'Indicadores químicos',
        url: '/productos/consumibles/indicadores-quimicos',
        porQue: 'La cinta dice que el paquete pasó por el equipo. Lo de adentro lo dice el indicador interno.',
      },
      {
        titulo: 'Mesas de inspección y empaque',
        url: '/productos/mobiliario/mesas-y-mesones',
        porQue: 'La superficie y la altura deciden cuántos paquetes salen por turno y en qué estado.',
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
      'Un indicador externo dice que el paquete pasó por el equipo. Uno interno, que el agente llegó al centro. La central necesita los dos.',

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
        porQue: 'Uno va dentro del paquete y otro sobre la barrera. El consumo se mueve al mismo ritmo.',
      },
      {
        titulo: 'Indicadores biológicos',
        url: '/productos/consumibles/indicadores-biologicos',
        porQue: 'El químico es lectura inmediata, pero indicio. El biológico es la prueba.',
      },
      {
        titulo: 'Papel grado médico y empaque',
        url: '/productos/consumibles/papel-y-empaque',
        porQue: 'El paquete de prueba se arma con el mismo material que la carga que va a representar.',
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
      'Es la única evidencia de que el proceso mató la carga microbiana. Todo lo demás es indicio.',

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
        porQue: 'El biológico se lee en horas; el químico, en el momento. La carga se libera con los dos.',
      },
      {
        titulo: 'Autoclaves de vapor',
        url: '/productos/esterilizacion/autoclaves-de-vapor',
        porQue: 'Verifica el equipo, no solo la carga. Un resultado no conforme es un dato de mantenimiento.',
      },
      {
        titulo: 'Repuestos originales',
        url: '/productos/repuestos',
        porQue: 'Un resultado no conforme repetido suele ser el equipo, no la carga. Ahí entra el repuesto.',
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
