import type { Producto } from './tipos.ts';

/* El dato de origen y fabricación a medida del mobiliario está marcado en
   categorias.ts, que es donde se muestra: cambia el argumento de la categoría
   entera y no se rellena con una suposición. */

export const mobiliario: Producto[] = [
  {
    slug: 'almacenamiento-esteril',
    categoria: 'mobiliario',
    titulo: 'Almacenamiento estéril',
    entradilla:
      'Es donde más se pierde material ya procesado, y la pérdida no se ve: se reprocesa lo vigente y se despacha lo vencido. El mobiliario protege la barrera hasta que el paquete se abre en sala.',

    procesa: [
      'Almacenamiento de paquetes procesados hasta su despacho',
      'Separación por rotación y por fecha de vencimiento',
      'Resguardo de material de baja rotación en armario cerrado',
    ],
    noProcesa: [
      'Almacenamiento de material sucio o pendiente de proceso',
      'Almacenamiento en zonas sin control de humedad y de tránsito',
    ],
    alternativa: {
      titulo: 'Carros de transporte',
      url: '/productos/mobiliario/carros-de-transporte',
      nota: 'Lo que está en tránsito va en carro cerrado y diferenciado por flujo, no en la estantería de estéril.',
    },

    dimensionamiento: [
      'Número de paquetes en circulación y tamaño promedio',
      'Tiempo de permanencia según el vencimiento que defina la institución',
      'Área disponible y altura libre del recinto',
      'Separación mínima de piso, muro y techo según el protocolo interno',
      'Necesidad de armario cerrado para material de baja rotación',
    ],
    cierreDimensionamiento:
      'Con estas respuestas hacemos el levantamiento y proponemos la distribución. Sin ellas, se instala estantería que no cabe o que obliga a apilar.',

    estacionPrimaria: 5,

    necesita: [
      {
        titulo: 'Papel grado médico y empaque',
        url: '/productos/consumibles/papel-y-empaque',
        porQue: 'La estantería protege la barrera, no la reemplaza. Un empaque frágil falla en el mejor armario.',
      },
      {
        titulo: 'Carros de transporte',
        url: '/productos/mobiliario/carros-de-transporte',
        porQue: 'Si el último tramo va descubierto, se pierde en la puerta lo que se cuidó durante días.',
      },
      {
        titulo: 'Mesas y mesones',
        url: '/productos/mobiliario/mesas-y-mesones',
        porQue: 'El paquete se conforma en la mesa y se guarda en la estantería. Se dimensionan juntas.',
      },
    ],

    servicio: [
      'Levantamiento en sitio del área de almacenamiento',
      'Propuesta de distribución según flujo y volumen en circulación',
      'Fabricación de la estantería según el plano de la central',
      'Instalación y entrega en sitio',
    ],

    marcas: ['{{ POR CONFIRMAR: marca o taller que fabrica el mobiliario en acero AISI 304 }}'],
    seo: {
      titulo: 'Estantería y armarios para almacenamiento estéril — Servimedical Group',
      descripcion:
        'Mobiliario en acero AISI 304 para almacenamiento de material estéril, con levantamiento en sitio y propuesta de distribución según el plano de la central. Bogotá, cobertura nacional.',
    },
  },

  {
    slug: 'carros-de-transporte',
    categoria: 'mobiliario',
    titulo: 'Carros de transporte',
    entradilla:
      'El carro de sucio y el de estéril nunca son el mismo. En cuanto uno hace los dos recorridos, la barrera que se construyó en seis estaciones deja de significar algo.',

    procesa: [
      'Transporte de material sucio desde salas hacia la central',
      'Transporte de material estéril desde la central hacia salas',
      'Carga y descarga de autoclave',
    ],
    noProcesa: [
      'Uso indistinto de un mismo carro para material sucio y estéril',
    ],
    alternativa: {
      titulo: 'El ciclo completo',
      url: '/#/ciclo/01',
      nota: 'El recorrido de sucio empieza en la estación 01 y el de estéril termina en la 06. Son dos flujos que no se cruzan.',
    },

    dimensionamiento: [
      'Distancia entre la central y las salas',
      'Volumen por viaje y número de viajes por turno',
      'Necesidad de carros cerrados diferenciados por flujo',
      'Dimensiones de puertas, ascensores y rampas del recorrido',
    ],
    cierreDimensionamiento:
      'Con estas respuestas proponemos el carro y la cantidad. Sin ellas, se compra un carro que no pasa por una puerta del recorrido.',

    estacionPrimaria: 6,
    estacionesSecundarias: [1, 3],

    necesita: [
      {
        titulo: 'Almacenamiento estéril',
        url: '/productos/mobiliario/almacenamiento-esteril',
        porQue: 'Las dimensiones de uno condicionan las del otro. Conviene decidirlas en el mismo plano.',
      },
      {
        titulo: 'Mesas y mesones',
        url: '/productos/mobiliario/mesas-y-mesones',
        porQue: 'Si las alturas no coinciden, el material se manipula de más justo donde no debe.',
      },
    ],

    servicio: [
      'Levantamiento del recorrido entre central y salas',
      'Propuesta de carro y cantidad según volumen por viaje',
      'Fabricación de los carros diferenciados por flujo',
    ],

    marcas: ['{{ POR CONFIRMAR: marca o taller que fabrica el mobiliario en acero AISI 304 }}'],
    seo: {
      titulo: 'Carros de transporte para central de esterilización — Servimedical Group',
      descripcion:
        'Carros cerrados diferenciados por flujo para material sucio y estéril, y carros de carga de autoclave. Levantamiento del recorrido y fabricación según el plano de la central.',
    },
  },

  {
    slug: 'mesas-y-mesones',
    categoria: 'mobiliario',
    titulo: 'Mesas y mesones',
    entradilla:
      'Superficie continua y soldadura pulida, sin uniones que retengan residuo. La altura de trabajo decide cuántos paquetes salen bien conformados al final del turno.',

    procesa: [
      'Mesas de inspección y empaque',
      'Mesones de lavado con poza y escurridero',
    ],
    noProcesa: [
      'Superficies con uniones, remaches o juntas que retengan residuo',
    ],
    alternativa: {
      titulo: 'Termodesinfectoras',
      url: '/productos/esterilizacion/termodesinfectoras',
      nota: 'Cuando el volumen de lúmenes y endoscopios crece, el lavado manual deja de sostener el proceso y hay que automatizarlo.',
    },

    dimensionamiento: [
      'Número de puestos de empaque simultáneos',
      'Tipo de lavado: manual o automatizado',
      'Altura de trabajo del personal de la central',
      'Acometidas hidráulicas disponibles en el área de lavado',
    ],
    cierreDimensionamiento:
      'Con estas respuestas hacemos el levantamiento y proponemos la distribución. Sin ellas, se fabrica una mesa que no corresponde al puesto de trabajo real.',

    estacionPrimaria: 2,
    estacionesSecundarias: [1],

    necesita: [
      {
        titulo: 'Selladoras térmicas',
        url: '/productos/accesorios/selladoras',
        porQue: 'Ocupa un tramo fijo de la mesa. Si no se contempla, el puesto queda corto desde el primer día.',
      },
      {
        titulo: 'Tratamiento y filtración de agua',
        url: '/productos/accesorios/tratamiento-de-agua',
        porQue: 'El enjuague final con agua fuera de especificación mancha lo que se acaba de lavar.',
      },
      {
        titulo: 'Carros de transporte',
        url: '/productos/mobiliario/carros-de-transporte',
        porQue: 'Las alturas se deciden juntas para no manipular el material más de lo necesario.',
      },
    ],

    servicio: [
      'Levantamiento en sitio de las zonas de lavado y de empaque',
      'Propuesta de distribución y de altura de trabajo',
      'Fabricación de mesas y mesones sobre medida del puesto',
      'Instalación y conexión a las acometidas existentes',
    ],

    marcas: ['{{ POR CONFIRMAR: marca o taller que fabrica el mobiliario en acero AISI 304 }}'],
    seo: {
      titulo: 'Mesas de empaque y mesones de lavado en acero — Servimedical Group',
      descripcion:
        'Mesas de inspección y empaque y mesones de lavado con poza en acero AISI 304, con superficie continua y soldadura pulida. Levantamiento en sitio y fabricación según plano.',
    },
  },
];
