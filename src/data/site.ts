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

export type Marca = {
  slug: string;
  nombre: string;
  rol: string;
  /** Qué resuelve dentro de la central. 2–3 frases. */
  intro: string;
  /* ── Rellenar cuando Servimedical confirme el dato de fábrica ──
     origen: país del fabricante · desde: año de representación.
     Se muestran sólo si tienen valor, así que dejarlos vacíos no rompe nada. */
  origen?: string;
  desde?: string;
};

/** Marcas representadas. Agregar una aquí publica su página, su fila en
 *  Nosotros, la cinta de marcas y el pie de página. */
export const marcas: Marca[] = [
  {
    slug: 'tuttnauer',
    nombre: 'Tuttnauer',
    rol: 'Esterilización por vapor y plasma',
    intro:
      'Es la marca sobre la que se apoya el grueso de las centrales que montamos: autoclaves de vapor de mesa y de gran capacidad, esterilización por plasma de peróxido para material termosensible y equipos de lavado. Somos representantes en Colombia y sostenemos el servicio técnico y el repuesto original en el país.',
  },
  {
    slug: 'sanqiang',
    nombre: 'Sanqiang',
    rol: 'Autoclaves y termodesinfección',
    intro:
      'Cubre el mismo terreno técnico que la línea principal con una estructura de costo distinta. Es la opción cuando la institución necesita capacidad de cámara sin el presupuesto de la marca premium, sin renunciar a registro sanitario ni a servicio técnico local.',
  },
  {
    slug: 'easyseal',
    nombre: 'Easyseal',
    rol: 'Selladoras de empaque',
    intro:
      'Selladoras rotativas y de barra para rollos y bolsas grado médico. Es un equipo pequeño con un peso desproporcionado en el proceso: un sellado deficiente invalida el ciclo entero que viene después, y es de las fallas que más reprocesos genera en una central.',
  },
  {
    slug: 'hong-run',
    nombre: 'Hong Run',
    rol: 'Compresores de aire médico',
    intro:
      'Aire comprimido limpio y seco para el accionamiento neumático de puertas, válvulas y equipos de la central. Es infraestructura invisible hasta que falla: cuando el aire no cumple especificación, el autoclave no abre y el quirófano se detiene.',
  },
  {
    slug: 'anhui',
    nombre: 'Anhui',
    rol: 'Papel y empaque grado médico',
    intro:
      'La barrera estéril: rollos mixtos, bolsas autosellantes, papel crepado y no tejido SMS. Deja pasar el agente esterilizante y no deja pasar el microorganismo. Es el consumible de mayor rotación de una central y lo abastecemos de forma programada contra el consumo real.',
  },
  {
    slug: '2i-health-care',
    nombre: '2i Health Care',
    rol: 'Indicadores químicos y biológicos',
    intro:
      'La evidencia del proceso. Indicadores químicos de clase 1 a 6, paquetes de prueba Bowie-Dick e indicadores biológicos con incubación y lectura. Sin ellos un ciclo no se puede liberar ni demostrar ante el comité de infecciones.',
  },
];

/** Sectores atendidos. */
export const sectores = [
  'Hospitales', 'Clínicas', 'Centros quirúrgicos', 'Odontología',
  'Laboratorios', 'Universidades', 'Centros de imagen', 'Distribuidores',
] as const;
