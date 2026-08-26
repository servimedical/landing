/* Geometría del anillo. viewBox 0 0 520 520 · centro (260,260) · radio 190.
   Seis arcos de 60° con separación de 3.2°. Coordenadas fijas: la comparten
   la rueda interactiva y la mini-rueda estática. */

export type Geo = {
  arco: string;
  nodo: [number, number];
  rotulo: [number, number];
  /** Radio interno: [punto interior, punto exterior]. Se dibuja de dentro
      hacia fuera para que la trazabilidad «alcance» la estación. */
  radio: [[number, number], [number, number]];
};

export const GEO: Geo[] = [
  { arco: 'M270.6,70.3 A190,190 0 0,1 419,156',     nodo: [355, 95.5],  rotulo: [323, 150.9], radio: [[307, 178.6], [344, 114.5]] },
  { arco: 'M429.6,174.3 A190,190 0 0,1 429.6,345.7', nodo: [450, 260],   rotulo: [386, 260],   radio: [[354, 260],   [428, 260]]   },
  { arco: 'M419,364 A190,190 0 0,1 270.6,449.7',    nodo: [355, 424.5], rotulo: [323, 369.1], radio: [[307, 341.4], [344, 405.5]] },
  { arco: 'M249.4,449.7 A190,190 0 0,1 101,364',    nodo: [165, 424.5], rotulo: [197, 369.1], radio: [[213, 341.4], [176, 405.5]] },
  { arco: 'M90.4,345.7 A190,190 0 0,1 90.4,174.3',  nodo: [70, 260],    rotulo: [134, 260],   radio: [[166, 260],   [92, 260]]    },
  { arco: 'M101,156 A190,190 0 0,1 249.4,70.3',     nodo: [165, 95.5],  rotulo: [197, 150.9], radio: [[213, 178.6], [176, 114.5]] },
];

/** Cuñas de sentido: indican el giro horario en los espacios entre arcos. */
export const CUNAS: [number, number, number][] = [
  [424.5, 165, 60], [424.5, 355, 120], [260, 450, 180],
  [95.5, 355, 240], [95.5, 165, 300],  [260, 70, 360],
];

/** Todos los radios miden lo mismo; es la longitud que anima el trazo. */
export const LARGO_RADIO = 74;

export const CENTRO = 260;
export const R_NUCLEO = 86;
