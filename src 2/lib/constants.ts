export const siteConfig = {
  name: "Servimedical Group",
  legalName: "Servimedical Group SAS",
  description:
    "Equipamiento hospitalario y esterilización en Colombia. El ciclo completo con un solo responsable: equipos, insumos, repuestos y trazabilidad.",
  url: "https://servimedicalgroup.com",
  locale: "es_CO",
  location: {
    city: "Bogotá",
    country: "Colombia",
    address: "Transversal 27 N.º 53C-47, Bogotá",
  },
  contact: {
    phone: "+57 (601) 211 4014",
    phoneHref: "tel:+576012114014",
    whatsapp: "+57 319 206 0943",
    whatsappHref: "https://wa.me/573192060943",
    commercial: "comercial@servimedicalgroup.com",
    general: "info@servimedicalgroup.com",
  },
  brands: [
    "TUTTNAUER",
    "SANQIANG",
    "EASYSEAL",
    "HONG RUN",
    "ANHUI",
    "2i HEALTH CARE",
  ],
  nav: [
    { label: "El ciclo", href: "#ciclo" },
    { label: "Trazabilidad", href: "#trazabilidad" },
    { label: "Productos", href: "#productos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros", href: "#nosotros" },
  ],
  spySections: ["ciclo", "trazabilidad", "productos", "servicios", "nosotros"],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
