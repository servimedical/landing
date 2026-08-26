/* ============================================================================
   ETIQUETA DE PAQUETE ESTÉRIL Y SU LÍNEA DE VIDA

   No es la ilustración de un concepto: es la reproducción del artefacto que
   la central maneja todos los días. El vínculo entre el campo del rótulo y
   los eventos que lo leen es lo que demuestra el software sin explicarlo.

   `clave` empareja campo y evento. `carga` apunta a dos eventos —conformación
   y liberación— a propósito: un mismo dato se lee más de una vez a lo largo
   del recorrido, que es justamente el argumento.
   ========================================================================== */

export type Clave = 'lote' | 'carga' | 'equipo' | 'metodo' | 'operario' | 'vence';

export type CampoEtiqueta = { clave: Clave; rotulo: string; valor: string };

export const etiqueta = {
  institucion: 'CENTRAL DE ESTERILIZACIÓN',
  servicio: 'CEyE-01',
  paquete: 'Set laparoscopia básico',
  pieIzq: 'SVMG · TRAZABILIDAD',
  pieDer: '250825A3-0412',
  apoyo:
    'Doble código: lectura automática para el flujo diario y lectura humana para cuando el escáner no está a la mano.',
} as const;

export const campos: CampoEtiqueta[] = [
  { clave: 'lote',     rotulo: 'Lote',    valor: '250825-A3' },
  { clave: 'carga',    rotulo: 'Carga',   valor: '0412' },
  { clave: 'equipo',   rotulo: 'Equipo',  valor: 'AUTOCLAVE 02' },
  { clave: 'metodo',   rotulo: 'Método',  valor: 'VAPOR 134 °C' },
  { clave: 'operario', rotulo: 'Empacó',  valor: 'OP-114' },
  { clave: 'vence',    rotulo: 'Vence',   valor: '24-11-2026' },
];

export type Evento = {
  hora: string;
  evento: string;
  subtexto: string;
  estacion: number;
  clave: Clave;
};

export const lineaDeVida: Evento[] = [
  { hora: '07:12', evento: 'Empaque y sellado',                  subtexto: 'Se conforma el set, se sella y se imprime el rótulo con operario responsable', estacion: 2, clave: 'operario' },
  { hora: '08:04', evento: 'Conformación de la carga 0412',      subtexto: 'El paquete queda asociado a la carga, al equipo y al turno',                    estacion: 3, clave: 'carga' },
  { hora: '08:38', evento: 'Fin de ciclo',                       subtexto: 'Parámetros registrados: 134 °C · 2.1 bar · 4 min de exposición',               estacion: 3, clave: 'metodo' },
  { hora: '09:05', evento: 'Liberación de carga',                subtexto: 'Indicador químico interno e indicador biológico conformes',                     estacion: 4, clave: 'carga' },
  { hora: '09:20', evento: 'Ingreso a almacenamiento estéril',   subtexto: 'Ubicación asignada y fecha de vencimiento en control de rotación',             estacion: 5, clave: 'vence' },
  { hora: '11:47', evento: 'Entrega a quirófano 3',              subtexto: 'Queda vinculado al procedimiento y al paciente',                                estacion: 6, clave: 'lote' },
];

export const cierre =
  'Seis registros, ningún cuaderno. La misma información que hoy se anota a mano queda capturada en el punto donde ocurre.';

/* --------------------------------------------------------------------------
   CÓDIGOS
   Se generan en compilación con semilla fija: el dibujo es idéntico en cada
   construcción y no cuesta ni una imagen ni un byte de JavaScript.
   -------------------------------------------------------------------------- */

function generador(semilla: number) {
  let s = semilla;
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
}

/** 46 barras de ancho alterno 1.5 o 3 px. */
export const barras: number[] = (() => {
  const azar = generador(7);
  return Array.from({ length: 46 }, () => (azar() > 0.62 ? 3 : 1.5));
})();

/** Matriz 12×12 con patrón de localización real: columna izquierda llena,
 *  fila inferior llena, borde superior y derecho alternado. */
export const matriz: boolean[] = (() => {
  const azar = generador(7);
  // se consume la misma secuencia que las barras para conservar el dibujo
  for (let i = 0; i < 46; i++) azar();
  return Array.from({ length: 144 }, (_, i) => {
    const fila = Math.floor(i / 12), col = i % 12;
    if (col === 0 || fila === 11) return true;
    if (fila === 0 || col === 11) return i % 2 === 0;
    return azar() > 0.5;
  });
})();
