export interface CicloStation {
  name: string;
  description: string;
  covers: [string, string][];
  trace: string;
  label: string;
  geo: {
    arc: string;
    node: [number, number];
    txt: [number, number];
    sp: [[number, number], [number, number]];
  };
}

export const cicloStations: CicloStation[] = [
  {
    name: "Recepción y lavado",
    description:
      "El instrumental llega contaminado. Se descontamina, se lava y se seca bajo un proceso validado antes de que alguien lo vuelva a tocar.",
    covers: [
      ["Termodesinfectoras para endoscopios", "Equipos"],
      ["Tratamiento y filtración de agua", "Accesorios"],
      ["Repuestos de bombas y válvulas", "Repuestos"],
    ],
    trace: "Aquí se registra la recepción del set y quién lo lavó.",
    label: "LAVADO",
    geo: {
      arc: "M270.6,70.3 A190,190 0 0,1 419,156",
      node: [355, 95.5],
      txt: [323, 150.9],
      sp: [
        [307, 178.6],
        [344, 114.5],
      ],
    },
  },
  {
    name: "Inspección y empaque",
    description:
      "Se revisa pieza por pieza, se arma el set y se empaca. Un sellado deficiente invalida todo lo que viene después.",
    covers: [
      ["Selladoras Easyseal", "Accesorios"],
      ["Papel grado médico y rollos Anhui", "Consumibles"],
      ["Etiquetas e impresora de central", "Trazabilidad"],
    ],
    trace: "Aquí nace la etiqueta: el paquete adquiere identidad propia.",
    label: "EMPAQUE",
    geo: {
      arc: "M429.6,174.3 A190,190 0 0,1 429.6,345.7",
      node: [450, 260],
      txt: [386, 260],
      sp: [
        [354, 260],
        [428, 260],
      ],
    },
  },
  {
    name: "Esterilización",
    description:
      "Vapor para el material termorresistente, plasma de peróxido para el que no lo resiste. La elección define el resto de la central.",
    covers: [
      ["Autoclaves Tuttnauer y Sanqiang", "Equipos"],
      ["Esterilizadores de plasma H₂O₂", "Equipos"],
      ["Agente esterilizante H₂O₂", "Consumibles"],
    ],
    trace:
      "La etiqueta se lee al cargar: el paquete queda atado a un ciclo y a un operario.",
    label: "ESTERILIZAR",
    geo: {
      arc: "M419,364 A190,190 0 0,1 270.6,449.7",
      node: [355, 424.5],
      txt: [323, 369.1],
      sp: [
        [307, 341.4],
        [344, 405.5],
      ],
    },
  },
  {
    name: "Control y liberación",
    description:
      "Un ciclo que no se puede demostrar no sirve como evidencia. Cada carga necesita su registro físico, químico y biológico antes de liberarse.",
    covers: [
      ["Indicadores químicos 2i Health Care", "Consumibles"],
      ["Indicadores biológicos", "Consumibles"],
      ["Registro e impresión de ciclo", "Equipos"],
    ],
    trace:
      "El software guarda los parámetros y no deja liberar una carga no conforme.",
    label: "LIBERACIÓN",
    geo: {
      arc: "M249.4,449.7 A190,190 0 0,1 101,364",
      node: [165, 424.5],
      txt: [197, 369.1],
      sp: [
        [213, 341.4],
        [176, 405.5],
      ],
    },
  },
  {
    name: "Almacenamiento y despacho",
    description:
      "El paquete estéril espera. Lo que lo daña aquí es la humedad, el manipuleo y el vencimiento que nadie miró.",
    covers: [
      ["Empaque y barrera estéril", "Consumibles"],
      ["Control de vencimientos", "Trazabilidad"],
      ["Compresores y aire de planta", "Accesorios"],
    ],
    trace: "Ubicación, rotación y alerta de vencimiento salen de la misma etiqueta.",
    label: "ALMACÉN",
    geo: {
      arc: "M90.4,345.7 A190,190 0 0,1 90.4,174.3",
      node: [70, 260],
      txt: [134, 260],
      sp: [
        [166, 260],
        [92, 260],
      ],
    },
  },
  {
    name: "Uso en paciente",
    description:
      "El set se abre en sala. Ese es el momento que hay que poder reconstruir seis meses después si algo sale mal.",
    covers: [
      ["Vinculación paquete–procedimiento", "Trazabilidad"],
      ["Reporte de recall", "Trazabilidad"],
      ["Indicadores de productividad", "Trazabilidad"],
    ],
    trace: "Con un escaneo, el paquete queda unido al paciente. El ciclo cierra.",
    label: "PACIENTE",
    geo: {
      arc: "M101,156 A190,190 0 0,1 249.4,70.3",
      node: [165, 95.5],
      txt: [197, 150.9],
      sp: [
        [213, 178.6],
        [176, 114.5],
      ],
    },
  },
];

export const wedgeTransforms = [
  "translate(424.5,165) rotate(60)",
  "translate(424.5,355) rotate(120)",
  "translate(260,450) rotate(180)",
  "translate(95.5,355) rotate(240)",
  "translate(95.5,165) rotate(300)",
  "translate(260,70) rotate(360)",
];
