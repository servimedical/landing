/* ============================================================================
   AIRTABLE — registro de leads

   El lead se guarda en LEADS WEB, una fila por envío. No se fusiona con nada:
   el trabajo comercial vive en CLIENTES SERVIMEDICAL y SEGUIMIENTO COMERCIAL,
   y quien atiende decide si este lead es un cliente nuevo o uno que ya está.

   Lo único que hace este módulo por su cuenta es dejar la **nota** de si la
   institución ya figura en el CRM. Es una pista para quien atiende, no un
   enlace ni una fusión.
   ========================================================================== */

import { TIPOS_SOLICITUD } from './formularios.ts';

const API = 'https://api.airtable.com/v0';

/** Lo que el sitio recoge, ya validado. */
export type Lead = {
  tipo: string;
  nombre: string;
  cargo: string;
  institucion: string;
  ciudad?: string;
  correo: string;
  telefono?: string;
  descripcion: string;
  origen: string;
  autorizacion: boolean;
  recibido: Date;
};

const config = () => {
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_BASE;
  const leads = process.env.AIRTABLE_TABLA_LEADS;
  const clientes = process.env.AIRTABLE_TABLA_CLIENTES;
  if (!token || !base || !leads) return null;
  return { token, base, leads, clientes };
};

/** `true` cuando hay con qué escribir. La función lo consulta para no
 *  intentar un envío que va a fallar seguro. */
export const configurado = () => config() !== null;

const pedir = async (url: string, token: string, init?: RequestInit) => {
  const r = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  if (!r.ok) {
    const cuerpo = await r.text();
    throw Object.assign(new Error(`Airtable ${r.status}: ${cuerpo.slice(0, 300)}`), {
      codigo: 'airtable',
      estado: r.status,
    });
  }
  return r.json() as Promise<Record<string, unknown>>;
};

/* ------------------------------------------------------- NOMBRES DE ENTIDAD

   Los nombres del CRM vienen como los escribió quien cargó la base:

     HOSPITAL DE YOPAL E.S.E.
     HOSPITAL SAN ANDRES ESE
     CLINICA ESPECIALIZADA LA CONCEPCIÓN      ← con espacio final
     CLINICA ZAYMA S.A.S

   Mayúsculas, casi sin tildes, espacios sobrantes y el mismo tipo de entidad
   escrito de varias formas. Quien escribe en el formulario pone «Clínica
   Zayma». Para que eso coincida hay que normalizar los dos lados. */

const SUFIJOS = /\b(S\.?A\.?S?|LTDA|E\.?S\.?E|IPS|EPS|SOCIEDAD|FUNDACION|FUNDACIÓN)\b\.?/g;

/** Deja un nombre comparable: sin tildes, sin puntuación, sin sufijo legal
 *  y sin espacios de más. */
export const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // fuera las tildes
    .toUpperCase()
    .replace(SUFIJOS, ' ')
    .replace(/[^A-Z0-9ÑÜ ]/g, ' ')     // fuera puntuación
    .replace(/\s+/g, ' ')
    .trim();

/* Airtable no sabe quitar tildes, así que la fórmula las sustituye una por
   una sobre el campo antes de comparar. Son seis letras: no hay más en
   español. */
const sinTildesEnFormula = (campo: string) =>
  [['Á', 'A'], ['É', 'E'], ['Í', 'I'], ['Ó', 'O'], ['Ú', 'U'], ['Ü', 'U']]
    .reduce((exp, [de, a]) => `SUBSTITUTE(${exp},"${de}","${a}")`, `UPPER({${campo}})`);

const comillas = (s: string) => s.replace(/"/g, '\\"');

export type Coincidencia = { esCliente: boolean; nota: string };

/** Busca la institución en CLIENTES SERVIMEDICAL.
 *
 *  Conservador a propósito: solo afirma cuando está seguro. Un falso negativo
 *  hace que alguien revise; un falso positivo le dice al equipo comercial «ya
 *  es cliente» cuando no lo es, y sobre eso se toman decisiones.
 *
 *  Nunca lanza: si la consulta falla, el lead se guarda igual sin la nota. */
export async function buscarCliente(lead: Lead): Promise<Coincidencia> {
  const c = config();
  if (!c?.clientes) return { esCliente: false, nota: '' };

  const url = (formula: string) =>
    `${API}/${c.base}/${c.clientes}?maxRecords=5&fields%5B%5D=Organizaci%C3%B3n&fields%5B%5D=Correo` +
    `&filterByFormula=${encodeURIComponent(formula)}`;

  try {
    /* 1 · Por correo. Solo el 7 % de los clientes lo tiene cargado, pero
       cuando está es una coincidencia exacta y no admite duda. */
    if (lead.correo) {
      const r = await pedir(url(`LOWER({Correo})="${comillas(lead.correo.toLowerCase())}"`), c.token);
      const filas = (r.records ?? []) as { fields: Record<string, string> }[];
      if (filas.length === 1) {
        return { esCliente: true, nota: `${filas[0]!.fields['Organización']?.trim() ?? ''} · por correo` };
      }
    }

    /* 2 · Por nombre. Se traen candidatos que contengan el nombre normalizado
       y después se compara en JavaScript, donde sí se puede normalizar bien
       los dos lados. */
    const aguja = normalizar(lead.institucion);
    if (aguja.length < 4) return { esCliente: false, nota: '' };

    const r = await pedir(url(`SEARCH("${comillas(aguja)}",${sinTildesEnFormula('Organización')})`), c.token);
    const filas = (r.records ?? []) as { fields: Record<string, string> }[];
    const exactas = filas.filter((f) => normalizar(f.fields['Organización'] ?? '') === aguja);

    if (exactas.length === 1) {
      return { esCliente: true, nota: `${exactas[0]!.fields['Organización']?.trim()} · por nombre` };
    }
    /* Varias coincidencias exactas, o solo parciales: no se afirma nada. Hay
       seis «HOSPITAL SAN JUAN» distintos y acertar al azar es peor que
       callar. */
    if (filas.length) {
      const nombres = filas.slice(0, 3).map((f) => f.fields['Organización']?.trim()).filter(Boolean);
      return { esCliente: false, nota: `Revisar · se parece a: ${nombres.join(' / ')}` };
    }
    return { esCliente: false, nota: '' };
  } catch {
    /* La nota es un lujo; el lead no. */
    return { esCliente: false, nota: '' };
  }
}

/** Guarda el lead. Lanza si no se pudo: es el registro de verdad. */
export async function guardarLead(lead: Lead, coincidencia: Coincidencia) {
  const c = config();
  if (!c) throw Object.assign(new Error('Airtable sin configurar'), { codigo: 'sin-configurar' });

  const fields: Record<string, unknown> = {
    'Institución': lead.institucion,
    'Nombre': lead.nombre,
    'Cargo': lead.cargo,
    'Correo': lead.correo,
    'Descripción de la solicitud': lead.descripcion,
    'Página de origen': lead.origen || 'no informada',
    'Autorización de datos': lead.autorizacion,
    'Fecha de registro': lead.recibido.toISOString(),
    'Estado del lead': 'NUEVO',
    'Cliente actual': coincidencia.esCliente,
  };

  if (lead.ciudad) fields['Ciudad'] = lead.ciudad;
  if (lead.telefono) fields['Teléfono o WhatsApp'] = lead.telefono;
  if (coincidencia.nota) fields['Coincidencia en el CRM'] = coincidencia.nota;

  /* `Tipo de solicitud` solo se manda si es uno de los valores que existen en
     Airtable. Si llega otro —alguien manipulando el formulario, o un tipo
     nuevo que se añada al sitio y no a la tabla—, Airtable responde 422 y
     **rechaza el registro entero**. Antes que perder el lead por un campo, se
     guarda sin él y el tipo queda escrito en las notas.

     No se usa `typecast`: aceptaría el valor creando una opción nueva en el
     CRM sin que nadie lo decida. */
  if ((TIPOS_SOLICITUD as readonly string[]).includes(lead.tipo)) {
    fields['Tipo de solicitud'] = lead.tipo;
  } else if (lead.tipo) {
    fields['Notas comerciales'] = `Tipo de solicitud recibido, fuera de la lista: ${lead.tipo}`;
  }

  await pedir(`${API}/${c.base}/${c.leads}`, c.token, {
    method: 'POST',
    body: JSON.stringify({ records: [{ fields }], typecast: false }),
  });
}
