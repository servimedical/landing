/* Datos globales del sitio. Los de contacto están confirmados por el cliente
   y se usan tal cual; lo demás queda marcado hasta que se confirme. */

export const sitio = {
  nombre: 'Servimedical Group',
  razon: 'Servimedical Group SAS',
  dominio: 'https://www.servimedicalgroup.com',
  descripcion:
    'Equipos, consumibles, accesorios, repuestos y mobiliario para centrales de esterilización, con servicio técnico propio. Bogotá, cobertura nacional.',
  ciudad: 'Bogotá',
  pais: 'Colombia',
  idioma: 'es-CO',
  /** Una línea bajo la marca, en el pie. */
  lineaMarca: 'Equipamiento hospitalario y centrales de esterilización.',
  /* No se muestra en ninguna página mientras no esté confirmado: un
     marcador nunca va a la vista del visitante (ver VOZ.md). */
  horario: '{{ POR CONFIRMAR: horario de atención }}',
} as const;

export const contacto = {
  fijo:      { rotulo: 'Fijo',      valor: '+57 (601) 211 4014',            href: 'tel:+576012114014' },
  whatsapp:  { rotulo: 'WhatsApp',  valor: '+57 319 206 0943',              href: 'https://wa.me/573192060943' },
  comercial: { rotulo: 'Comercial', valor: 'comercial@servimedicalgroup.com', href: 'mailto:comercial@servimedicalgroup.com' },
  general:   { rotulo: 'General',   valor: 'info@servimedicalgroup.com',     href: 'mailto:info@servimedicalgroup.com' },
  sede:      { rotulo: 'Sede',      valor: 'Transversal 27 N.º 53C-47, Bogotá', href: null },
} as const;

export const canalesContacto = [
  contacto.fijo, contacto.whatsapp, contacto.comercial, contacto.general, contacto.sede,
];


/** Único CTA persistente del sitio. */
export const cta = { texto: 'Solicitar cotización', url: '/contacto' } as const;

export const anclaCiclo = '/#ciclo';
