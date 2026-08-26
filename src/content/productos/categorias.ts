import type { CategoriaProducto } from './tipos.ts';

export type FichaCategoria = {
  slug: CategoriaProducto | 'repuestos';
  titulo: string;
  /** Dos frases, para el encabezado del índice. */
  intro: string;
  /** Una línea, para el panel desplegable del menú. */
  panel: string;
  /** Dato que falta y que cambia el argumento de toda la categoría. */
  porConfirmar?: string;
  seo: { titulo: string; descripcion: string };
};

/* El orden es el comercial y se respeta en el índice, en el navbar y en el
   pie: equipos abre por ser la venta grande, consumibles va segundo por ser
   el ingreso recurrente, accesorios y repuestos sostienen el equipo
   instalado, y mobiliario cierra como venta de proyecto. */
export const categorias: FichaCategoria[] = [
  {
    slug: 'esterilizacion',
    titulo: 'Equipos de esterilización',
    panel: 'Vapor, plasma de peróxido y termodesinfección.',
    intro:
      'La elección de método define el resto de la central: qué se puede procesar, cuánto espacio ocupa y qué se compra todos los meses. Vapor para lo termorresistente, plasma de peróxido para lo que el vapor destruye, y termodesinfección para lo que entra sucio desde salas.',
    seo: {
      titulo: 'Equipos de esterilización para central hospitalaria — Servimedical Group',
      descripcion:
        'Autoclaves de vapor, esterilización por plasma de peróxido y termodesinfectoras. Dimensionamiento por carga quirúrgica, instalación, calificación y servicio técnico propio en Colombia.',
    },
  },
  {
    slug: 'consumibles',
    titulo: 'Consumibles',
    panel: 'Barrera estéril y evidencia del proceso, mes a mes.',
    intro:
      'Es el gasto que la central hace todos los meses y el que decide si un ciclo se puede liberar. Barrera estéril por un lado y evidencia del proceso por el otro: sin lo primero no hay paquete, y sin lo segundo no hay liberación de carga.',
    seo: {
      titulo: 'Consumibles para central de esterilización — Servimedical Group',
      descripcion:
        'Papel grado médico, empaque, indicadores químicos y biológicos para central de esterilización. Abastecimiento programado contra el consumo real, con despacho nacional desde Bogotá.',
    },
  },
  {
    slug: 'accesorios',
    titulo: 'Accesorios',
    panel: 'Agua, aire y sellado: lo que hace válido el ciclo.',
    intro:
      'Buena parte de las fallas que atendemos no están en el esterilizador: están en el agua que lo alimenta, en el aire que lo acciona o en un sellado que nunca cerró bien. No son opcionales, son la condición para que el ciclo sea válido.',
    seo: {
      titulo: 'Accesorios para central de esterilización — Servimedical Group',
      descripcion:
        'Selladoras térmicas, compresores de aire y tratamiento de agua para central de esterilización. Dimensionamiento contra la exigencia del equipo, instalación y mantenimiento en Colombia.',
    },
  },
  {
    slug: 'repuestos',
    titulo: 'Repuestos',
    panel: 'Partes originales, con inventario local en Bogotá.',
    intro:
      'Partes originales de las marcas que representamos, con inventario local de lo que más se pide. Atendemos equipos dentro y fuera de garantía, y también de marcas que no vendimos.',
    seo: {
      titulo: 'Repuestos originales para equipos de esterilización — Servimedical Group',
      descripcion:
        'Empaquetaduras de puerta, válvulas, trampas de vapor, sensores y tarjetas de control. Inventario local en Bogotá y atención a equipos fuera de garantía.',
    },
  },
  {
    slug: 'mobiliario',
    titulo: 'Mobiliario en acero inoxidable',
    panel: 'Acero AISI 304 para lavado, empaque y almacenamiento.',
    intro:
      'Acero AISI 304 para las estaciones donde el material se manipula y espera: lavado, empaque, almacenamiento y transporte. Se dimensiona sobre el plano de la central, porque un mueble que no corresponde al flujo obliga al personal a corregirlo todos los días.',
    porConfirmar:
      '{{ POR CONFIRMAR: si el mobiliario en acero inoxidable es importado o de fabricación local, y si se fabrica a medida }}',
    seo: {
      titulo: 'Mobiliario en acero inoxidable para central de esterilización — Servimedical Group',
      descripcion:
        'Estantería de almacenamiento estéril, carros de transporte y mesas de empaque en acero AISI 304. Levantamiento en sitio y fabricación según el plano de la central.',
    },
  },
];

export const indiceGeneral = {
  titulo: 'Productos',
  intro:
    'Cinco categorías que cubren el ciclo entero. La institución compra el autoclave una vez; el papel, el indicador y el repuesto los compra todos los meses, y el mobiliario cuando la central se diseña o se amplía.',
  seo: {
    titulo: 'Productos para central de esterilización — Servimedical Group',
    descripcion:
      'Equipos de esterilización, consumibles, accesorios, repuestos y mobiliario en acero para central de esterilización. Importación directa, existencias en Bogotá y despacho nacional.',
  },
} as const;
