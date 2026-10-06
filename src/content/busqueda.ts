/* Índice de búsqueda. Se arma en compilación desde el contenido que ya
   existe, así que no puede desincronizarse del sitio. */

import { navegacion } from './navegacion.ts';
import { marcas, urlLinea, marcaDe, rolVisible } from './marcas.ts';
import { productos, buscarPorSlug } from './productos/index.ts';

export type Entrada = {
  titulo: string;
  url: string;
  grupo: string;
  pista: string;
  terminos: string;
};

const primeraFrase = (t: string) => (t.split('. ')[0] ?? t).replace(/\.$/, '') + '.';

export const indice: Entrada[] = [
  // Páginas
  ...navegacion
    .filter((n) => ['/servicios', '/contacto', '/marcas'].includes(n.url))
    .map((n) => ({
      titulo: n.titulo,
      url: n.url,
      grupo: 'Sitio',
      pista:
        n.url === '/servicios' ? 'Servicio técnico y diseño de centrales'
        : n.url === '/marcas' ? 'Las siete marcas que representamos'
        : 'Cotización, servicio técnico, repuestos y licitaciones',
      terminos: '',
    })),

  // Marcas
  ...marcas.map((m) => ({
    titulo: m.nombre,
    url: `/marcas/${m.slug}`,
    grupo: 'Marca',
    pista: rolVisible(m),
    terminos: m.lineas.map((s) => buscarPorSlug(s)?.titulo ?? '').join(' '),
  })),

  // Líneas de producto
  ...productos
    .filter((p) => marcaDe(p.slug))
    .map((p) => ({
      titulo: p.titulo,
      url: urlLinea(p.slug),
      grupo: marcaDe(p.slug)!.nombre,
      pista: primeraFrase(p.entradilla),
      terminos: p.procesa.join(' '),
    })),
];
