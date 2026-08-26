export const site = {
  nombre: 'Servimedical Group',
  razon: 'Servimedical Group SAS',
  dominio: 'https://www.servimedicalgroup.com',
  descripcion:
    'Importación y comercialización de equipamiento hospitalario en Colombia, con especialidad en centrales de esterilización: equipos, accesorios, consumibles, repuestos, trazabilidad y servicio técnico propio.',
  ciudad: 'Bogotá',
  pais: 'Colombia',
} as const;

export const contacto = {
  fijo:      { label: '+57 (601) 211 4014', href: 'tel:+576012114014' },
  whatsapp:  { label: '+57 319 206 0943',   href: 'https://wa.me/573192060943' },
  comercial: { label: 'comercial@servimedicalgroup.com', href: 'mailto:comercial@servimedicalgroup.com' },
  general:   { label: 'info@servimedicalgroup.com',      href: 'mailto:info@servimedicalgroup.com' },
  sede:      { label: 'Transversal 27 N.º 53C-47, Bogotá', href: '' },
} as const;

export const nav = [
  { label: 'Nosotros',     href: '/nosotros/' },
  { label: 'Productos',    href: '/productos/' },
  { label: 'Servicios',    href: '/servicios/' },
  { label: 'Trazabilidad', href: '/productos/trazabilidad/' },
  { label: 'Contacto',     href: '/contacto/' },
] as const;

/** Marcas representadas. Agregar una aquí la publica en la cinta y en el pie. */
export const marcas = [
  { nombre: 'Tuttnauer',      rol: 'Esterilización por vapor y plasma' },
  { nombre: 'Sanqiang',       rol: 'Autoclaves y termodesinfección' },
  { nombre: 'Easyseal',       rol: 'Selladoras de empaque' },
  { nombre: 'Hong Run',       rol: 'Compresores de aire médico' },
  { nombre: 'Anhui',          rol: 'Papel y empaque grado médico' },
  { nombre: '2i Health Care', rol: 'Indicadores químicos y biológicos' },
] as const;

/** Sectores atendidos. */
export const sectores = [
  'Hospitales', 'Clínicas', 'Centros quirúrgicos', 'Odontología',
  'Laboratorios', 'Universidades', 'Centros de imagen', 'Distribuidores',
] as const;
