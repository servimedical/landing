/* ============================================================================
   DEFINICIÓN Y VALIDACIÓN DE LOS FORMULARIOS

   Un solo módulo para cliente y servidor. La validación del navegador es
   comodidad; la que cuenta es la del servidor, y ambas tienen que decir lo
   mismo o el usuario ve un error que no entiende.

   Un solo formulario para todo el sitio. Lo que cambia con la página es el
   encuadre —qué se dimensiona— y lo que se pide en la descripción según el
   tipo de solicitud. El comportamiento no cambia nunca.
   ========================================================================== */

export type TipoCampo = 'texto' | 'correo' | 'telefono' | 'area' | 'opcion';

export type Campo = {
  nombre: string;
  rotulo: string;
  tipo: TipoCampo;
  requerido?: boolean;
  ayuda?: string;
  marcador?: string;
  opciones?: string[];
  /** Ocupa las dos columnas de la rejilla. */
  ancho?: boolean;
  autocomplete?: string;
};

export type Formulario = {
  id: 'solicitud';
  titulo: string;
  intro: string;
  /** Qué se hace con los datos. Va junto a la casilla de autorización. */
  finalidad: string;
  campos: Campo[];
  /** Qué dice el acuse cuando el envío sale bien. */
  acuse: string;
};

/* ---------------------------------------------------------------------------
   HABEAS DATA — Ley 1581 de 2012 y Decreto 1377 de 2013

   La casilla nunca viene marcada: el consentimiento preseleccionado no es
   consentimiento. La versión se guarda con cada envío porque es la prueba de
   qué texto aceptó el titular y cuándo.
   -------------------------------------------------------------------------- */

export const VERSION_AUTORIZACION = '2026-08-26.v1';

export const TEXTO_AUTORIZACION =
  'Autorizo a Servimedical Group SAS a tratar mis datos para atender esta solicitud.';

export const URL_POLITICA = '/politica-de-tratamiento-de-datos';

/* ---------------------------------------------------------------------------
   ANTISPAM
   Campo trampa invisible más marca de tiempo: un envío legítimo no llega en
   menos de tres segundos y un robot rellena todo lo que encuentra.
   -------------------------------------------------------------------------- */

export const CAMPO_TRAMPA = 'apellido_materno';
export const MINIMO_SEGUNDOS = 3;

/* ---------------------------------------------------------------------------
   EL FORMULARIO
   -------------------------------------------------------------------------- */

export const TIPOS_SOLICITUD = ['Cotización', 'Servicio técnico', 'Repuesto', 'Licitación'] as const;
export type TipoSolicitud = (typeof TIPOS_SOLICITUD)[number];

/* Lo que se pide en la descripción cambia con el tipo de solicitud: a un
   ingeniero con el equipo parado no se le pregunta por el volumen de carga.
   El guion del componente intercambia marcador y ayuda al escoger el tipo. */
export const DESCRIPCION_POR_TIPO: Record<TipoSolicitud, { marcador: string; ayuda?: string }> = {
  'Cotización': {
    marcador: 'Qué necesita procesar, cuántas cargas por día y para cuándo.',
    ayuda: 'Si tiene plano o pliego, mencione que lo tiene y se lo pedimos.',
  },
  'Servicio técnico': {
    marcador: 'Equipo, marca y modelo (están en la placa), qué falla y desde cuándo.',
    ayuda: 'Si el equipo está detenido, llame también al fijo.',
  },
  'Repuesto': {
    marcador: 'Equipo, marca, modelo y serie, y la referencia del repuesto si la tiene.',
  },
  'Licitación': {
    marcador: 'Entidad, número de proceso y fecha de cierre.',
  },
};

/* Tres encuadres del mismo formulario. El de la página decide cuál aplica:
   un autoclave se dimensiona, un consumible se programa. */
export const INTRO = {
  equipo: 'Dimensionamos el equipo con su volumen de carga, su flujo y la infraestructura de la central.',
  consumible: 'Armamos el esquema de consumo con sus cargas por día y el método de cada equipo.',
  general: 'Cuéntenos qué necesita su central y le responde un especialista, no un formulario automático.',
  servicio: 'Marca, modelo y qué muestra el equipo en pantalla. Si está detenido, llame además al fijo: el formulario no despierta a nadie.',
} as const;

/* La rejilla es de dos columnas: un campo ancho, seis a media columna —tres
   filas exactas— y la descripción ancha. Cierra sin celdas sueltas. */
export const FORMULARIO: Formulario = {
  id: 'solicitud',
  titulo: 'Hable con un especialista en esterilización',
  intro: INTRO.general,
  finalidad: 'Atender su solicitud y mantener la comunicación relacionada con ella.',
  acuse: 'Su solicitud quedó registrada. El equipo comercial responde al correo que indicó.',
  campos: [
    { nombre: 'tipo', rotulo: 'Tipo de solicitud', tipo: 'opcion', requerido: true, ancho: true, opciones: [...TIPOS_SOLICITUD] },

    { nombre: 'nombre', rotulo: 'Nombre', tipo: 'texto', requerido: true, marcador: 'Ana Ruiz', autocomplete: 'name' },
    { nombre: 'cargo', rotulo: 'Cargo', tipo: 'texto', requerido: true, marcador: 'Jefe de central de esterilización', autocomplete: 'organization-title' },
    { nombre: 'institucion', rotulo: 'Institución', tipo: 'texto', requerido: true, marcador: 'Clínica San Rafael', autocomplete: 'organization' },
    { nombre: 'ciudad', rotulo: 'Ciudad', tipo: 'texto', marcador: 'Bogotá', autocomplete: 'address-level2' },
    { nombre: 'correo', rotulo: 'Correo', tipo: 'correo', requerido: true, marcador: 'ana@clinica.com', autocomplete: 'email' },
    { nombre: 'telefono', rotulo: 'Teléfono o WhatsApp', tipo: 'telefono', marcador: '300 000 0000', autocomplete: 'tel' },

    { nombre: 'descripcion', rotulo: 'Descripción de la solicitud', tipo: 'area', requerido: true, ancho: true,
      marcador: DESCRIPCION_POR_TIPO['Cotización'].marcador,
      ayuda: DESCRIPCION_POR_TIPO['Cotización'].ayuda },
  ],
};

/** Compatibilidad: el sitio usa un solo formulario. */
export const FORMULARIOS = { solicitud: FORMULARIO } as const;

/* ---------------------------------------------------------------------------
   VALIDACIÓN
   -------------------------------------------------------------------------- */

export type Errores = Record<string, string>;

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFONO = /^[+()\d\s.-]{7,20}$/;

/** Valida un envío. La usan el navegador y la función del servidor. */
export function validar(
  form: Formulario,
  datos: Record<string, string>,
  opciones: { autorizacion?: boolean } = {}
): Errores {
  const e: Errores = {};

  for (const c of form.campos) {
    const v = (datos[c.nombre] ?? '').trim();

    if (c.requerido && !v) {
      e[c.nombre] = c.tipo === 'opcion' ? 'Escoja el tipo de solicitud.' : `${c.rotulo} es obligatorio.`;
      continue;
    }
    if (!v) continue;

    if (v.length > (c.tipo === 'area' ? 2000 : 200))
      e[c.nombre] = `${c.rotulo} es demasiado largo.`;
    else if (c.tipo === 'correo' && !CORREO.test(v))
      e[c.nombre] = 'Escriba un correo válido, con arroba y dominio.';
    else if (c.tipo === 'telefono' && !TELEFONO.test(v))
      e[c.nombre] = 'Escriba un número de teléfono válido.';
    else if (c.tipo === 'opcion' && c.opciones && !c.opciones.includes(v))
      e[c.nombre] = `Escoja una de las opciones de ${c.rotulo.toLowerCase()}.`;
  }

  /* La casilla se valida aparte porque no es un campo del formulario: es el
     requisito legal que habilita el tratamiento de todo lo demás. */
  if (opciones.autorizacion !== undefined && !opciones.autorizacion)
    e.autorizacion = 'Debe autorizar el tratamiento de sus datos para poder enviar.';

  return e;
}

export const hayErrores = (e: Errores) => Object.keys(e).length > 0;
