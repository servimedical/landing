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
  id: 'cotizacion' | 'repuestos' | 'servicio-tecnico';
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

export const FORMULARIOS: Record<Formulario['id'], Formulario> = {
  cotizacion: {
    id: 'cotizacion',
    titulo: 'Solicitar cotización',
    intro: 'Con el material que procesa y el volumen por turno proponemos el equipo y enviamos cotización formal.',
    finalidad: 'Atender su solicitud de cotización y mantener la comunicación relacionada con ella.',
    acuse: 'Su solicitud de cotización quedó registrada. El equipo comercial responde al correo que indicó.',
    campos: [
      { nombre: 'necesita', rotulo: 'Qué necesita', tipo: 'texto', requerido: true, fijo: true, ancho: true },
      ...CONTACTO_BASE,
      { nombre: 'volumen', rotulo: 'Volumen aproximado', tipo: 'texto', marcador: '4 salas quirúrgicas, 2 turnos' },
      { nombre: 'detalle', rotulo: 'Detalle', tipo: 'area', ancho: true, marcador: 'Material que procesa, espacio disponible, o el pliego si ya lo tiene.' },
    ],
  },

  repuestos: {
    id: 'repuestos',
    titulo: 'Pedir un repuesto',
    intro: 'La placa del equipo trae marca, modelo y número de serie. Con esos tres datos se identifica la parte sin ir a la sede.',
    finalidad: 'Atender su solicitud de repuesto y mantener la comunicación relacionada con ella.',
    acuse: 'Su pedido de repuesto quedó registrado. Si tiene fotografía de la parte o de la placa, respóndanos al correo de acuse y adjúntela.',
    campos: [
      { nombre: 'necesita', rotulo: 'Qué necesita', tipo: 'texto', requerido: true, fijo: true, ancho: true },
      { nombre: 'marca', rotulo: 'Marca del equipo', tipo: 'texto', requerido: true, marcador: 'Tuttnauer' },
      { nombre: 'modelo', rotulo: 'Modelo', tipo: 'texto', requerido: true, marcador: 'El que figura en la placa' },
      { nombre: 'serie', rotulo: 'Número de serie', tipo: 'texto', marcador: 'El que figura en la placa' },
      { nombre: 'urgencia', rotulo: 'Urgencia', tipo: 'seleccion', opciones: ['Equipo detenido', 'Falla intermitente', 'Reposición programada'] },
      { nombre: 'parte', rotulo: 'Descripción de la parte', tipo: 'area', requerido: true, ancho: true, marcador: 'Empaquetadura de puerta, válvula solenoide de entrada de vapor, sensor de cámara…' },
      { nombre: 'institucion', rotulo: 'Institución', tipo: 'texto', requerido: true, autocomplete: 'organization' },
      { nombre: 'nombre', rotulo: 'Nombre y cargo', tipo: 'texto', requerido: true, autocomplete: 'name' },
      { nombre: 'telefono', rotulo: 'Teléfono o WhatsApp', tipo: 'telefono', autocomplete: 'tel' },
      { nombre: 'correo', rotulo: 'Correo', tipo: 'correo', requerido: true, autocomplete: 'email' },
      { nombre: 'foto', rotulo: 'Fotografía', tipo: 'texto', ancho: true, ayuda: 'Opcional. Adjúntela respondiendo al correo de acuse o envíela por WhatsApp.', marcador: 'La enviaré por WhatsApp' },
    ],
  },

  'servicio-tecnico': {
    id: 'servicio-tecnico',
    titulo: 'Solicitar servicio técnico',
    intro: 'Para un equipo detenido, el teléfono directo acorta la respuesta. Deje el número al que se puede llamar sin pasar por conmutador.',
    finalidad: 'Atender su solicitud de servicio técnico y mantener la comunicación relacionada con ella.',
    acuse: 'Su solicitud de servicio técnico quedó registrada. Si el equipo está detenido, llame también al fijo o escriba por WhatsApp.',
    campos: [
      { nombre: 'institucion', rotulo: 'Institución', tipo: 'texto', requerido: true, marcador: 'Clínica San Rafael', autocomplete: 'organization' },
      { nombre: 'ciudad', rotulo: 'Ciudad', tipo: 'texto', marcador: 'Bogotá', autocomplete: 'address-level2' },
      { nombre: 'equipo', rotulo: 'Equipo y marca', tipo: 'texto', requerido: true, marcador: 'Autoclave Tuttnauer' },
      { nombre: 'desde', rotulo: 'Desde cuándo', tipo: 'texto', marcador: 'Desde el martes' },
      { nombre: 'falla', rotulo: 'Descripción de la falla', tipo: 'area', requerido: true, ancho: true, marcador: 'Qué hace el equipo, qué mensaje muestra y en qué fase del ciclo se detiene.' },
      { nombre: 'nombre', rotulo: 'Nombre y cargo', tipo: 'texto', requerido: true, autocomplete: 'name' },
      { nombre: 'telefono', rotulo: 'Teléfono directo', tipo: 'telefono', requerido: true, marcador: '300 000 0000', autocomplete: 'tel' },
      { nombre: 'correo', rotulo: 'Correo', tipo: 'correo', requerido: true, autocomplete: 'email' },
    ],
  },
};

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
