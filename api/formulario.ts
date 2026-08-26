/* ============================================================================
   RECEPCIÓN DE FORMULARIOS — función de Vercel

   Existe por dos razones que no se pueden resolver en el navegador:
   la validación del servidor (la del cliente es comodidad, no control) y el
   envío por servicio transaccional con dominio verificado.

   Si el servicio de correo no está configurado, responde 503 con un motivo
   explícito: el navegador conserva lo escrito y ofrece WhatsApp o correo
   directo. Es preferible a perder el mensaje.
   ========================================================================== */

import {
  FORMULARIOS, validar, hayErrores,
  CAMPO_TRAMPA, MINIMO_SEGUNDOS, VERSION_AUTORIZACION, TEXTO_AUTORIZACION,
  type Formulario,
} from '../src/lib/formularios.ts';

type Peticion = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };
type Respuesta = {
  status: (n: number) => Respuesta;
  json: (b: unknown) => void;
  setHeader: (k: string, v: string) => void;
};

const REMITENTE = process.env.CORREO_REMITENTE ?? 'sitio@servimedicalgroup.com';
const INTERNO = process.env.CORREO_INTERNO ?? 'comercial@servimedicalgroup.com';
/* {{ POR CONFIRMAR: dirección o direcciones que reciben cada formulario, y si
   repuestos y servicio técnico van a un destinatario distinto de comercial }}
   Mientras tanto, todo llega a comercial y se puede desviar por variable de
   entorno sin tocar el código: CORREO_REPUESTOS y CORREO_SERVICIO. */
const DESTINO: Record<Formulario['id'], string> = {
  cotizacion: INTERNO,
  repuestos: process.env.CORREO_REPUESTOS ?? INTERNO,
  'servicio-tecnico': process.env.CORREO_SERVICIO ?? INTERNO,
};

const enBogota = (d: Date) =>
  new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota', dateStyle: 'full', timeStyle: 'long',
  }).format(d);

const escapar = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function enviar(a: string, asunto: string, texto: string) {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) throw Object.assign(new Error('correo sin configurar'), { codigo: 'sin-configurar' });

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Servimedical Group <${REMITENTE}>`,
      to: [a],
      subject: asunto,
      text: texto,
      html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapar(texto)}</pre>`,
    }),
  });
  if (!r.ok) throw Object.assign(new Error(await r.text()), { codigo: 'envio-fallido' });
}

export default async function handler(req: Peticion, res: Respuesta) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, motivo: 'metodo' });

  const cuerpo = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Record<string, unknown>;
  const form = FORMULARIOS[cuerpo?.formulario as Formulario['id']];
  if (!form) return res.status(400).json({ ok: false, motivo: 'formulario-desconocido' });

  /* Antispam. Se responde 200 a propósito: al robot no se le informa. */
  const trampa = String(cuerpo[CAMPO_TRAMPA] ?? '').trim();
  const abierto = Number(cuerpo.abierto ?? 0);
  const segundos = abierto ? (Date.now() - abierto) / 1000 : 0;
  if (trampa || segundos < MINIMO_SEGUNDOS) return res.status(200).json({ ok: true, descartado: true });

  const datos: Record<string, string> = {};
  for (const c of form.campos) datos[c.nombre] = String(cuerpo[c.nombre] ?? '');

  const autorizacion = cuerpo.autorizacion === true || cuerpo.autorizacion === 'true';
  const errores = validar(form, datos, { autorizacion });
  if (hayErrores(errores)) return res.status(422).json({ ok: false, motivo: 'validacion', errores });

  const ahora = new Date();
  const origen = String(cuerpo.origen ?? '').slice(0, 300);

  /* Registro del consentimiento: fecha, hora y versión del texto aceptado.
     Es la prueba que se pide si el tratamiento se cuestiona. Va en el correo
     interno, que es el archivo del que dispone la empresa hoy. */
  const consentimiento =
    `AUTORIZACIÓN DE TRATAMIENTO DE DATOS\n` +
    `Aceptada: sí\n` +
    `Fecha y hora: ${enBogota(ahora)}\n` +
    `Marca ISO: ${ahora.toISOString()}\n` +
    `Versión del texto: ${VERSION_AUTORIZACION}\n` +
    `Texto aceptado: ${TEXTO_AUTORIZACION}\n` +
    `Finalidad informada: ${form.finalidad}`;

  const detalle = form.campos
    .filter((c) => datos[c.nombre]?.trim())
    .map((c) => `${c.rotulo}: ${datos[c.nombre]!.trim()}`)
    .join('\n');

  const interno =
    `${form.titulo}\n\n${detalle}\n\n` +
    `— — —\nPágina de origen: ${origen || 'no informada'}\n` +
    `Recibido: ${enBogota(ahora)}\n\n${consentimiento}\n`;

  const acuse =
    `${form.acuse}\n\n` +
    `Esto fue lo que recibimos:\n\n${detalle}\n\n` +
    `— — —\nServimedical Group SAS · Transversal 27 N.º 53C-47, Bogotá\n` +
    `Fijo +57 (601) 211 4014 · WhatsApp +57 319 206 0943\n\n` +
    `Usted autorizó el tratamiento de sus datos el ${enBogota(ahora)} ` +
    `(versión ${VERSION_AUTORIZACION}). Puede conocerlos, actualizarlos, ` +
    `rectificarlos, suprimirlos o revocar esta autorización escribiendo a ` +
    `${INTERNO}. Política de tratamiento: ` +
    `https://www.servimedicalgroup.com/politica-de-tratamiento-de-datos\n`;

  try {
    await enviar(DESTINO[form.id], `[${form.id}] ${datos.institucion ?? 'Solicitud'} — servimedicalgroup.com`, interno);
    if (datos.correo) {
      await enviar(datos.correo, `Recibimos su ${form.titulo.toLowerCase()} — Servimedical Group`, acuse);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    const codigo = (err as { codigo?: string }).codigo ?? 'envio-fallido';
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ ok: false, motivo: codigo });
  }
}
