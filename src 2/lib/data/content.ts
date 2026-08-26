export interface ProductCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  wide?: boolean;
  highlightTags?: boolean;
}

export const productos: ProductCard[] = [
  {
    id: "1.1",
    title: "Equipos de esterilización",
    description:
      "Autoclaves de vapor de mesa y de gran capacidad, esterilizadores de plasma de peróxido de hidrógeno para material termosensible y termodesinfectoras para endoscopios.",
    tags: ["Tuttnauer", "Sanqiang", "Plasma H₂O₂", "Termodesinfección"],
    wide: true,
  },
  {
    id: "1.2",
    title: "Trazabilidad",
    description:
      "El sistema completo para seguir el paquete desde el empaque hasta el paciente: etiquetas, impresora en el punto de empaque y software de registro, liberación y recall.",
    tags: ["Etiquetado", "Impresora", "Software", "Lectores"],
    wide: true,
    highlightTags: true,
  },
  {
    id: "1.3",
    title: "Accesorios",
    description:
      "Lo que el equipo necesita para operar dentro de norma: aire comprimido de grado médico, tratamiento de agua y sellado de empaques.",
    tags: ["Hong Run", "Filtros de agua", "Easyseal"],
  },
  {
    id: "1.4",
    title: "Consumibles",
    description:
      "El gasto recurrente de la central, con abastecimiento programado para que ningún ciclo se detenga por falta de insumo.",
    tags: ["Anhui · papel", "2i · indicadores", "Agente H₂O₂"],
  },
  {
    id: "1.5",
    title: "Repuestos",
    description:
      "Repuestos originales de las marcas que representamos, con inventario local de las partes de mayor rotación.",
    tags: ["Originales", "Stock Bogotá", "Fuera de garantía"],
  },
];

export interface ServicioBlock {
  title: string;
  description: string;
  items: string[];
}

export const servicios: ServicioBlock[] = [
  {
    title: "Servicio técnico",
    description:
      "Técnicos propios entrenados por fábrica. Atendemos equipos de las marcas que representamos y de terceros.",
    items: [
      "Instalación y puesta en marcha",
      "Mantenimiento preventivo y correctivo",
      "Calificación de instalación y operación",
      "Contratos con tiempo de respuesta pactado",
    ],
  },
  {
    title: "Asesoría y diseño de centrales",
    description:
      "Estudio técnico previo a la obra: flujos, zonificación, dimensionamiento y dotación de la central de esterilización.",
    items: [
      "Flujo sucio–limpio–estéril y barreras",
      "Dimensionamiento por carga quirúrgica",
      "Requerimientos de agua, vapor y aire",
      "Presupuesto de dotación y cronograma",
    ],
  },
];

export interface TraceEvent {
  time: string;
  title: string;
  detail: string;
  station: string;
  fieldKey: string;
}

export const traceEvents: TraceEvent[] = [
  {
    time: "07:12",
    title: "Empaque y sellado",
    detail: "Se genera el paquete y se imprime la etiqueta",
    station: "Estación 02",
    fieldKey: "op",
  },
  {
    time: "08:04",
    title: "Carga del ciclo 0412",
    detail: "El paquete queda asociado a la carga y al operario",
    station: "Estación 03",
    fieldKey: "ciclo",
  },
  {
    time: "08:38",
    title: "Ciclo terminado",
    detail: "Parámetros registrados: 134 °C · 2.1 bar · 4 min",
    station: "Estación 03",
    fieldKey: "metodo",
  },
  {
    time: "09:05",
    title: "Carga liberada",
    detail: "Indicador biológico y químico conformes",
    station: "Estación 04",
    fieldKey: "ciclo",
  },
  {
    time: "09:20",
    title: "Ingreso a estéril",
    detail: "Ubicación asignada y vencimiento en control",
    station: "Estación 05",
    fieldKey: "vence",
  },
  {
    time: "11:47",
    title: "Entregado a quirófano 3",
    detail: "Queda vinculado al procedimiento y al paciente",
    station: "Estación 06",
    fieldKey: "lote",
  },
];

export const traceKit = [
  {
    n: "01",
    title: "Etiquetas y rótulos",
    description:
      "Adhesivos que resisten el ciclo sin perder legibilidad, con doble código para lectura manual y automática.",
  },
  {
    n: "02",
    title: "Impresora de central",
    description:
      "Impresión en el punto de empaque: un paquete, una etiqueta, sin transcripción a mano.",
  },
  {
    n: "03",
    title: "Software de trazabilidad",
    description:
      "Registro por carga y por paquete, liberación, control de vencimientos, indicadores de productividad y reporte de recall.",
  },
];

export const labelFields = [
  { key: "lote", label: "Lote", value: "250825-A3" },
  { key: "ciclo", label: "Ciclo", value: "0412" },
  { key: "equipo", label: "Equipo", value: "AUTOCLAVE 02" },
  { key: "metodo", label: "Método", value: "VAPOR 134 °C" },
  { key: "op", label: "Empacó", value: "OP-114" },
  { key: "vence", label: "Vence", value: "24-11-2026" },
];

export const aboutStats = [
  { value: "6", label: "Marcas representadas" },
  { value: "Nacional", label: "Cobertura de servicio" },
  { value: "Bogotá", label: "Sala de ventas y taller" },
  { value: "INVIMA", label: "Equipos con registro" },
];

export const aboutTags = [
  "Hospitales",
  "Clínicas",
  "Universidades",
  "Centros de imagen",
  "Distribuidores",
];
