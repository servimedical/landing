/* ============================================================================
   FUENTE ÚNICA DE NAVEGACIÓN

   El catálogo se organiza por marca: /marcas/<marca>/<linea>. El árbol se
   deriva de src/content/marcas.ts, así que añadir una marca o una línea allí
   la publica en el menú, el pie, las migas, el buscador y el sitemap.
   ========================================================================== */

import { marcas } from './marcas.ts';
import { buscarPorSlug } from './productos/index.ts';

export type NodoNav = {
  titulo: string;
  url: string;
  hijos?: NodoNav[];
  enNavbar?: boolean;
  enFooter?: 'marcas' | 'empresa' | false;
};

const nodoMarca = (m: (typeof marcas)[number]): NodoNav => ({
  titulo: m.nombre,
  url: `/marcas/${m.slug}`,
  enFooter: 'marcas',
  hijos: m.lineas.map((slug) => ({
    titulo: buscarPorSlug(slug)?.titulo ?? slug,
    url: `/marcas/${m.slug}/${slug}`,
  })),
});

export const navegacion: NodoNav[] = [
  { titulo: 'Inicio', url: '/', enNavbar: false, enFooter: false },

  {
    titulo: 'Marcas',
    url: '/marcas',
    enNavbar: true,
    enFooter: false,
    hijos: marcas.map(nodoMarca),
  },

  { titulo: 'Servicios', url: '/servicios', enNavbar: true, enFooter: 'empresa' },
  { titulo: 'Contacto', url: '/contacto', enNavbar: true, enFooter: false },

  {
    titulo: 'Política de tratamiento de datos',
    url: '/politica-de-tratamiento-de-datos',
    enNavbar: false,
    enFooter: false,
  },
];

/* ---------------------------------------------------------------- CONSULTAS */

/** Forma canónica: sin parámetros, sin `.html` y sin barra final. */
export function normalizar(url: string): string {
  if (!url.startsWith('/')) return url;
  const limpia = url.split(/[?#]/)[0]!.replace(/\.html$/, '');
  return limpia.length > 1 ? limpia.replace(/\/+$/, '') : '/';
}

/** Cadena desde la raíz hasta la URL dada, ambas incluidas. */
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

export function esActivo(nodo: NodoNav, url: string): boolean {
  return rutaActiva(url).some((n) => n.url === nodo.url);
}

export function todosLosNodos(nodos: NodoNav[] = navegacion): NodoNav[] {
  return nodos.flatMap((n) => [n, ...(n.hijos ? todosLosNodos(n.hijos) : [])]);
}

export const inicio: NodoNav = navegacion[0]!;

export const politicaDatos: NodoNav =
  navegacion.find((n) => n.url === '/politica-de-tratamiento-de-datos')!;

export const enNavbar: NodoNav[] = navegacion.filter((n) => n.enNavbar);

/** Las siete marcas como nodos, para el panel del menú y el pie. */
export const nodosMarcas: NodoNav[] =
  navegacion.find((n) => n.url === '/marcas')?.hijos ?? [];

export function columnaFooter(clave: 'marcas' | 'empresa'): NodoNav[] {
  return todosLosNodos().filter((n) => n.enFooter === clave);
}
