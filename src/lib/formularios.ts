/* ============================================================================
   DEFINICIÓN Y VALIDACIÓN DE LOS FORMULARIOS

   Un solo módulo para cliente y servidor. La validación del navegador es
   comodidad; la que cuenta es la del servidor, y ambas tienen que decir lo
   mismo o el usuario ve un error que no entiende.

   Los tres formularios comparten componente, validación y manejo de estados.
   Cambian los campos, no el comportamiento.
   ========================================================================== */

export type TipoCampo = 'texto' | 'correo' | 'telefono' | 'area' | 'seleccion';

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
  /** Se rellena desde la página y no se edita. */
  fijo?: boolean;
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
  'Autorizo a Servimedical Group SAS a tratar mis datos personales con la ' +
  'finalidad indicada arriba, en los términos de su política de tratamiento ' +
  'de datos.';

export const URL_POLITICA = '/politica-de-tratamiento-de-datos';

/* ---------------------------------------------------------------------------
   ANTISPAM
   Campo trampa invisible más marca de tiempo: un envío legítimo no llega en
   menos de tres segundos y un robot rellena todo lo que encuentra.
   -------------------------------------------------------------------------- */

export const CAMPO_TRAMPA = 'apellido_materno';
export const MINIMO_SEGUNDOS = 3;

/* ---------------------------------------------------------------------------
   LOS TRES FORMULARIOS
   -------------------------------------------------------------------------- */

const CONTACTO_BASE: Campo[] = [
  { nombre: 'institucion', rotulo: 'Institución', tipo: 'texto', requerido: true, marcador: 'Clínica San Rafael', autocomplete: 'organization' },
  { nombre: 'ciudad', rotulo: 'Ciudad', tipo: 'texto', marcador: 'Bogotá', autocomplete: 'address-level2' },
  { nombre: 'nombre', rotulo: 'Nombre y cargo', tipo: 'texto', requerido: true, marcador: 'Ana Ruiz, jefe de central', autocomplete: 'name' },
  { nombre: 'telefono', rotulo: 'Teléfono o WhatsApp', tipo: 'telefono', marcador: '300 000 0000', autocomplete: 'tel' },
  { nombre: 'correo', rotulo: 'Correo', tipo: 'correo', requerido: true, marcador: 'ana@clinica.com', autocomplete: 'email' },
];

export const TIPOS_SOLICITUD = [
  'Cotización',
  'Servicio técnico o equipo detenido',
  'Repuesto',
  'Licitación o pliego',
] as const;

/* Un solo formulario para todo. Antes había tres y la persona tenía que
   adivinar cuál le tocaba; ahora escoge el tipo de solicitud y los campos
   propios de repuesto y de servicio técnico aparecen sólo si aplican. */
export const FORMULARIO: Formulario = {
  id: 'solicitud',
  titulo: 'Solicitar cotización o servicio',
  intro:
    'Un solo formulario para cotizar, pedir un repuesto o reportar un equipo detenido. Rellene lo que sepa.',
  finalidad: 'Atender su solicitud y mantener la comunicación relacionada con ella.',
  acuse: 'Su solicitud quedó registrada. El equipo comercial responde al correo que indicó.',
  campos: [
    { nombre: 'tipo', rotulo: 'Tipo de solicitud', tipo: 'seleccion', requerido: true, opciones: [...TIPOS_SOLICITUD] },
    { nombre: 'necesita', rotulo: 'Sobre qué', tipo: 'texto', requerido: true, fijo: true },
    ...CONTACTO_BASE,
    { nombre: 'equipo', rotulo: 'Equipo, marca y modelo', tipo: 'texto', ancho: true,
      ayuda: 'Para servicio técnico o repuesto. La placa del equipo trae marca, modelo y serie.',
      marcador: 'Autoclave Tuttnauer, modelo de la placa' },
    { nombre: 'detalle', rotulo: 'Detalle', tipo: 'area', ancho: true,
      marcador: 'Qué procesa y cuánto, o qué hace el equipo y desde cuándo.' },
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

    if (c.requerido && !v) { e[c.nombre] = `${c.rotulo} es obligatorio.`; continue; }
    if (!v) continue;

    if (v.length > (c.tipo === 'area' ? 2000 : 200))
      e[c.nombre] = `${c.rotulo} es demasiado largo.`;
    else if (c.tipo === 'correo' && !CORREO.test(v))
      e[c.nombre] = 'Escriba un correo válido, con arroba y dominio.';
    else if (c.tipo === 'telefono' && !TELEFONO.test(v))
      e[c.nombre] = 'Escriba un número de teléfono válido.';
    else if (c.tipo === 'seleccion' && c.opciones && !c.opciones.includes(v))
      e[c.nombre] = `Escoja una de las opciones de ${c.rotulo.toLowerCase()}.`;
  }

  /* La casilla se valida aparte porque no es un campo del formulario: es el
     requisito legal que habilita el tratamiento de todo lo demás. */
  if (opciones.autorizacion !== undefined && !opciones.autorizacion)
    e.autorizacion = 'Debe autorizar el tratamiento de sus datos para poder enviar.';

  return e;
}

export const hayErrores = (e: Errores) => Object.keys(e).length > 0;
