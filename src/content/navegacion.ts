/* ============================================================================
   FUENTE ÚNICA DE NAVEGACIÓN

   Tres niveles: la línea es el método, el producto es el equipo de una marca,
   y la marca es el fabricante. El árbol se deriva de src/datos, así que añadir
   un producto allí lo publica en el menú, el pie, las migas, el buscador y el
   sitemap sin tocar nada más.

   Se leen los módulos de datos, no las colecciones: la navegación tiene que
   resolverse de forma síncrona. Las colecciones los validan con zod sobre
   estos mismos arreglos, así que no hay dos verdades.
   ========================================================================== */

import { marcas } from '../datos/marcas.ts';
import { lineas, urlLinea } from '../datos/lineas.ts';
import { productos, productosDeLinea, lineasDeMarca, urlProducto, lineaTienePagina } from '../datos/productos.ts';
import { marcaPorSlug, urlMarca } from '../datos/marcas.ts';

export type NodoNav = {
  titulo: string;
  /** Nombre corto para el menú, cuando el de la página es más largo de lo que
   *  cabe en una línea del desplegable. */
  tituloCorto?: string;
  url: string;
  /** Una línea bajo el nombre, en el panel del menú. */
  descriptor?: string;
  /** Slug de la marca, cuando el nodo representa una. */
  marca?: string;
  hijos?: NodoNav[];
  enNavbar?: boolean;
  enFooter?: 'marcas' | 'empresa' | false;
};

/* Las migas del producto son Inicio / Líneas / {Línea} / {Marca}: se llega a
   un equipo por el método, no por el fabricante. Por eso los productos cuelgan
   de la rama de Líneas, que va primero y es la que `rutaActiva` encuentra.

   Una línea con un solo producto no tiene página propia: su nodo apunta
   directo al producto, y así la miga no pasa por una redirección. */
const nodoLinea = (l: (typeof lineas)[number]): NodoNav => {
  const suyos = productosDeLinea(l.slug);
  if (!lineaTienePagina(l.slug))
    return { titulo: l.nombre, tituloCorto: l.nombreNav, url: urlProducto(suyos[0]!), descriptor: l.descriptor };
  /* La hoja lleva el nombre de la marca, que es lo que distingue a un
     producto de otro dentro del método. Salvo cuando una marca aporta dos
     productos a la misma línea —los indicadores de 2i—: ahí el nombre de la
     marca repetido no distingue nada y manda el del producto. */
  const repiteMarca = (slugMarca: string) => suyos.filter((x) => x.marca === slugMarca).length > 1;
  return {
    titulo: l.nombre,
    tituloCorto: l.nombreNav,
    url: urlLinea(l.slug),
    descriptor: l.descriptor,
    hijos: suyos.map((p) => ({
      titulo: repiteMarca(p.marca) ? p.nombre : marcaPorSlug(p.marca)!.nombre,
      url: urlProducto(p),
    })),
  };
};

/* La rama de Marcas no repite los productos: si los repitiera, `rutaActiva`
   podría encontrarlos aquí y la miga diría «Marcas» en vez de «Líneas». El
   dropdown de marcas arma sus líneas desde los datos, no desde este árbol. */
const nodoMarca = (m: (typeof marcas)[number]): NodoNav => ({
  titulo: m.nombre,
  url: urlMarca(m.slug),
  descriptor: m.descriptor,
  /* El panel pinta el logotipo, no el nombre, y lo busca por aquí. */
  marca: m.slug,
  enFooter: 'marcas',
});

export const navegacion: NodoNav[] = [
  { titulo: 'Inicio', url: '/', enNavbar: false, enFooter: false },

  {
    titulo: 'Líneas',
    url: '/lineas',
    enNavbar: true,
    enFooter: 'empresa',
    hijos: [...lineas].sort((a, b) => a.orden - b.orden).map(nodoLinea),
  },

  {
    titulo: 'Marcas',
    url: '/marcas',
    enNavbar: true,
    enFooter: false,
    hijos: [...marcas].sort((a, b) => a.orden - b.orden).map(nodoMarca),
  },

  { titulo: 'Servicios', url: '/servicios', enNavbar: true, enFooter: 'empresa' },
  { titulo: 'Contacto', url: '/contacto', enNavbar: false, enFooter: 'empresa' },

  {
    titulo: 'Política de tratamiento de datos',
    url: '/politica-de-tratamiento-de-datos',
    enNavbar: false,
    enFooter: false,
  },
];

void productos;
void lineasDeMarca;

/* ---------------------------------------------------------------- CONSULTAS */

/** Forma canónica: sin parámetros, sin `.html` y sin barra final. */
export function normalizar(url: string): string {
  if (!url.startsWith('/')) return url;
  /* `build.format: 'file'` sirve la portada como `/index.html`, así que
     `Astro.url.pathname` trae `/index`. Sin esto, la canónica y la og:url de
     la portada apuntaban a `https://…/index`, que es una segunda dirección
     para la misma página: exactamente lo que una canónica existe para
     evitar. */
  const limpia = url.split(/[?#]/)[0]!.replace(/\.html$/, '').replace(/\/index$/, '');
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

/** Las líneas como nodos, para el panel del menú. */
export const nodosLineas: NodoNav[] =
  navegacion.find((n) => n.url === '/lineas')?.hijos ?? [];

export function columnaFooter(clave: 'marcas' | 'empresa'): NodoNav[] {
  return todosLosNodos().filter((n) => n.enFooter === clave);
}
