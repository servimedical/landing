/* ============================================================================
   FUENTE ÚNICA DE NAVEGACIÓN

   Header, panel de productos, menú móvil, pie de página, migas de pan,
   sitemap y las 24 páginas se generan desde este archivo. No debe existir
   ningún enlace de navegación escrito a mano en una plantilla.

   El orden de las cinco categorías de producto responde a la lógica
   comercial y se respeta igual en el navbar, el índice y el pie:
   equipos abre por ser la venta grande · consumibles va segundo por ser el
   ingreso recurrente · accesorios y repuestos sostienen el equipo instalado
   · mobiliario cierra como venta de proyecto.
   ========================================================================== */

export type NodoNav = {
  titulo: string;
  url: string;
  hijos?: NodoNav[];
  /** Aparece en la barra principal. */
  enNavbar?: boolean;
  enFooter?: 'productos' | 'servicios' | 'empresa' | false;
};

export const navegacion: NodoNav[] = [
  { titulo: 'Inicio', url: '/', enNavbar: false, enFooter: false },

  { titulo: 'Nosotros', url: '/nosotros', enNavbar: true, enFooter: 'empresa' },

  {
    titulo: 'Productos',
    url: '/productos',
    enNavbar: true,
    enFooter: false,
    hijos: [
      {
        titulo: 'Equipos de esterilización',
        url: '/productos/esterilizacion',
        enFooter: 'productos',
        hijos: [
          { titulo: 'Autoclaves de vapor', url: '/productos/esterilizacion/autoclaves-de-vapor' },
          { titulo: 'Plasma de peróxido', url: '/productos/esterilizacion/plasma-de-peroxido' },
          { titulo: 'Termodesinfectoras', url: '/productos/esterilizacion/termodesinfectoras' },
        ],
      },
      {
        titulo: 'Consumibles',
        url: '/productos/consumibles',
        enFooter: 'productos',
        hijos: [
          { titulo: 'Papel y empaque', url: '/productos/consumibles/papel-y-empaque' },
          { titulo: 'Indicadores químicos', url: '/productos/consumibles/indicadores-quimicos' },
          { titulo: 'Indicadores biológicos', url: '/productos/consumibles/indicadores-biologicos' },
        ],
      },
      {
        titulo: 'Accesorios',
        url: '/productos/accesorios',
        enFooter: 'productos',
        hijos: [
          { titulo: 'Selladoras', url: '/productos/accesorios/selladoras' },
          { titulo: 'Compresores', url: '/productos/accesorios/compresores' },
          { titulo: 'Tratamiento de agua', url: '/productos/accesorios/tratamiento-de-agua' },
        ],
      },
      {
        titulo: 'Repuestos',
        url: '/productos/repuestos',
        enFooter: 'productos',
      },
      {
        titulo: 'Mobiliario en acero inoxidable',
        url: '/productos/mobiliario',
        enFooter: 'productos',
        hijos: [
          { titulo: 'Almacenamiento estéril', url: '/productos/mobiliario/almacenamiento-esteril' },
          { titulo: 'Carros de transporte', url: '/productos/mobiliario/carros-de-transporte' },
          { titulo: 'Mesas y mesones', url: '/productos/mobiliario/mesas-y-mesones' },
        ],
      },
    ],
  },

  {
    titulo: 'Trazabilidad',
    url: '/trazabilidad',
    enNavbar: true,
    enFooter: 'servicios',
    hijos: [
      { titulo: 'Software de trazabilidad', url: '/trazabilidad/software' },
    ],
  },

  { titulo: 'Servicios', url: '/servicios', enNavbar: true, enFooter: 'servicios' },

  { titulo: 'Contacto', url: '/contacto', enNavbar: true, enFooter: false },

  /* Va en la línea de derechos del pie, no en una columna. Vive aquí para que
     ninguna plantilla tenga que escribir la URL a mano. */
  {
    titulo: 'Política de tratamiento de datos',
    url: '/politica-de-tratamiento-de-datos',
    enNavbar: false,
    enFooter: false,
  },
];

/* ---------------------------------------------------------------------------
   CONSULTAS
   -------------------------------------------------------------------------- */

/**
 * Lleva cualquier URL a la forma canónica del mapa de rutas: sin parámetros,
 * sin `.html` y sin barra final. `/` se conserva tal cual.
 *
 * El `.html` importa: con `build.format: 'file'`, `Astro.url.pathname` llega
 * como `/productos/mobiliario.html` durante la generación, y sin quitarlo no
 * casaría con ningún nodo del árbol.
 */
export function normalizar(url: string): string {
  if (!url.startsWith('/')) return url;
  const limpia = url.split(/[?#]/)[0]!.replace(/\.html$/, '');
  return limpia.length > 1 ? limpia.replace(/\/+$/, '') : '/';
}

/**
 * Cadena de nodos desde la raíz hasta la URL dada, ambos incluidos.
 * `/productos/consumibles/papel-y-empaque` →
 *   [Productos, Consumibles, Papel y empaque]
 * Devuelve [] si la URL no está en el árbol.
 */
export function rutaActiva(url: string): NodoNav[] {
  const objetivo = normalizar(url);
  const buscar = (nodos: NodoNav[], cadena: NodoNav[]): NodoNav[] => {
    for (const nodo of nodos) {
      const actual = [...cadena, nodo];
      if (normalizar(nodo.url) === objetivo) return actual;
      if (nodo.hijos) {
        const hallado = buscar(nodo.hijos, actual);
        if (hallado.length) return hallado;
      }
    }
    return [];
  };
  return buscar(navegacion, []);
}

/** ¿El nodo está en la cadena activa? Marca ancestros, no sólo la hoja. */
export function esActivo(nodo: NodoNav, url: string): boolean {
  return rutaActiva(url).some((n) => n.url === nodo.url);
}

/** Todos los nodos del árbol, en orden de recorrido. */
export function todosLosNodos(nodos: NodoNav[] = navegacion): NodoNav[] {
  return nodos.flatMap((n) => [n, ...(n.hijos ? todosLosNodos(n.hijos) : [])]);
}

/** El nodo raíz, para el enlace del logotipo y el primer eslabón de las migas. */
export const inicio: NodoNav = navegacion[0]!;

/** Los cinco nodos de producto, en el orden comercial definido arriba. */
export const categoriasProducto: NodoNav[] =
  navegacion.find((n) => n.url === '/productos')?.hijos ?? [];

/** Política de tratamiento de datos, enlazada desde el pie y los formularios. */
export const politicaDatos: NodoNav =
  navegacion.find((n) => n.url === '/politica-de-tratamiento-de-datos')!;

/** Nodos de la barra principal. */
export const enNavbar: NodoNav[] = navegacion.filter((n) => n.enNavbar);

/** Nodos de una columna del pie. */
export function columnaFooter(clave: 'productos' | 'servicios' | 'empresa'): NodoNav[] {
  return todosLosNodos().filter((n) => n.enFooter === clave);
}
