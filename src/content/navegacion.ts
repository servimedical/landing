/* ============================================================================
   FUENTE ÚNICA DE NAVEGACIÓN

   El catálogo se organiza por marca: /marcas/<marca>/<linea>. El árbol se
   deriva de src/datos, así que añadir una marca o una línea allí la publica
   en el menú, el pie, las migas, el buscador y el sitemap.

   Se leen los módulos de datos, no las colecciones: la navegación tiene que
   resolverse de forma síncrona. Las colecciones los validan con zod sobre
   estos mismos arreglos, así que no hay dos verdades.
   ========================================================================== */

import { marcas } from '../datos/marcas.ts';
import { lineasDe, urlLinea, urlMarca } from '../datos/lineas.ts';
import { categorias, urlCategoria } from '../datos/categorias.ts';
import type { Marca } from '../datos/tipos.ts';

export type NodoNav = {
  titulo: string;
  url: string;
  /** Una línea bajo el nombre, en el panel del menú. */
  descriptor?: string;
  hijos?: NodoNav[];
  enNavbar?: boolean;
  enFooter?: 'marcas' | 'empresa' | false;
};

const nodoMarca = (m: Marca): NodoNav => ({
  titulo: m.nombre,
  url: urlMarca(m.slug),
  descriptor: m.descriptor,
  enFooter: 'marcas',
  hijos: lineasDe(m.slug).map((l) => ({ titulo: l.nombre, url: urlLinea(l) })),
});

export const navegacion: NodoNav[] = [
  { titulo: 'Inicio', url: '/', enNavbar: false, enFooter: false },

  /* Líneas va primero: es la entrada de quien llega con una necesidad y no
     con un fabricante en la cabeza.

     Sus hijos son las categorías, no las páginas de línea. Las páginas de
     línea cuelgan de la marca y tienen que seguir haciéndolo: si aparecieran
     también aquí, `rutaActiva` las encontraría primero y la miga de pan de
     /marcas/tuttnauer/vapor diría «Líneas» en lugar de «Marcas». */
  {
    titulo: 'Líneas',
    url: '/lineas',
    enNavbar: true,
    enFooter: 'empresa',
    hijos: [...categorias]
      .sort((a, b) => a.orden - b.orden)
      .map((c) => ({ titulo: c.nombre, url: urlCategoria(c.slug), descriptor: c.descriptor })),
  },

  {
    titulo: 'Marcas',
    url: '/marcas',
    enNavbar: true,
    enFooter: false,
    hijos: [...marcas].sort((a, b) => a.orden - b.orden).map(nodoMarca),
  },

  { titulo: 'Servicios', url: '/servicios', enNavbar: true, enFooter: 'empresa' },
  /* Fuera del navbar: el botón «Hablar con un especialista» ya lleva aquí y
     dos entradas al mismo sitio compiten entre ellas. Se mantiene en el pie. */
  { titulo: 'Contacto', url: '/contacto', enNavbar: false, enFooter: 'empresa' },

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

/** Las marcas como nodos, para el panel del menú y el pie. */
export const nodosMarcas: NodoNav[] =
  navegacion.find((n) => n.url === '/marcas')?.hijos ?? [];

/** Las categorías como nodos, para el panel del menú. */
export const nodosCategorias: NodoNav[] =
  navegacion.find((n) => n.url === '/lineas')?.hijos ?? [];

export function columnaFooter(clave: 'marcas' | 'empresa'): NodoNav[] {
  return todosLosNodos().filter((n) => n.enFooter === clave);
}
