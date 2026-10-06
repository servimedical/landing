import type { Producto } from './tipos.ts';

/* Repuestos entra al catálogo como una línea más: una sola plantilla para
   todas las páginas de producto, sin excepciones. */

export const propios: Producto[] = [
  {
    slug: 'repuestos',
    categoria: 'accesorios',
    titulo: 'Repuestos originales',
    entradilla:
      'Partes originales de las marcas que representamos, con inventario local de lo que más se pide. Un autoclave detenido es un quirófano detenido, así que atendemos también equipos fuera de garantía y de marcas que no vendimos.',

    procesa: [
      'Empaquetaduras y sellos de puerta',
      'Válvulas, trampas de vapor y purgadores',
      'Filtros bacteriológicos de línea',
      'Sensores y transductores de temperatura y presión',
      'Tarjetas de control e impresoras de ciclo',
    ],
    noProcesa: [
      'Partes adaptadas o equivalentes no originales',
    ],
    alternativa: {
      titulo: 'Servicio técnico',
      url: '/servicios',
      nota: 'Si no sabe qué parte falló, el diagnóstico va antes que el pedido.',
    },

    dimensionamiento: [
      'Marca, modelo y número de serie del equipo',
      'Qué hace el equipo y en qué momento se detiene',
      'Si el equipo está parado o la falla es intermitente',
      'Si se busca una reposición puntual o un plan programado',
    ],
    cierreDimensionamiento:
      'Con la placa del equipo identificamos la parte sin ir a la sede. Sin ella, el pedido se vuelve una adivinanza cara.',


    necesita: [
      {
        titulo: 'Autoclaves de vapor',
        url: '/marcas/tuttnauer/autoclaves-de-vapor',
        porQue: 'La empaquetadura de puerta es la falla más frecuente y la más fácil de prevenir.',
      },
      {
        titulo: 'Tratamiento de agua',
        url: '/marcas/servimedical/tratamiento-de-agua',
        porQue: 'Buena parte del desgaste que obliga a cambiar partes entra por el agua de alimentación.',
      },
      {
        titulo: 'Selladoras térmicas',
        url: '/marcas/easymedical/selladoras',
        porQue: 'Resistencia y bandas de arrastre se desgastan. Una selladora parada frena todo el empaque.',
      },
    ],

    servicio: [
      'Identificación de la parte a partir de la placa del equipo',
      'Reposición programada contra la rutina de mantenimiento',
      'Inventario en Bogotá de las partes de mayor rotación',
      'Canal directo de fábrica para el resto',
      'Atención a equipos dentro y fuera de garantía',
    ],

    seo: {
      titulo: 'Repuestos originales para equipos de esterilización',
      descripcion:
        'Empaquetaduras de puerta, válvulas, trampas de vapor, sensores y tarjetas de control. Inventario local en Bogotá y atención a equipos fuera de garantía.',
    },
  },
];
