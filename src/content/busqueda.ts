/* Índice de búsqueda. Se arma en compilación desde los mismos datos que
   publican las páginas, así que no puede desincronizarse del sitio. */

import { navegacion } from './navegacion.ts';
import { marcas } from '../datos/marcas.ts';
import { lineas, lineasDe, urlLinea } from '../datos/lineas.ts';

export type Entrada = {
  titulo: string;
  url: string;
  grupo: string;
  pista: string;
  terminos: string;
};

const nombreMarca = (slug: string) => marcas.find((m) => m.slug === slug)!.nombre;

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
        : n.url === '/marcas' ? 'Las marcas que representamos'
        : 'Cotización, servicio técnico, repuestos y licitaciones',
      terminos: '',
    })),

  // Marcas
  ...[...marcas].sort((a, b) => a.orden - b.orden).map((m) => ({
    titulo: m.nombre,
    url: `/marcas/${m.slug}`,
    grupo: 'Marca',
    pista: m.descriptor,
    terminos: lineasDe(m.slug).map((l) => l.nombre).join(' '),
  })),

  // Líneas
  ...lineas.map((l) => ({
    titulo: `${l.nombre} ${nombreMarca(l.marca)}`,
    url: urlLinea(l),
    grupo: nombreMarca(l.marca),
    pista: l.metodo,
    terminos: [l.uso, ...(l.compatible ?? []), ...(l.dondeSeUsa ?? [])].join(' '),
  })),
];
