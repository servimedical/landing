/* Índice de búsqueda. Se arma en compilación desde el contenido que ya
   existe: ninguna entrada se escribe a mano, así que no se puede
   desincronizar del sitio. */

import { navegacion, todosLosNodos } from './navegacion.ts';
import { productos, categorias, urlProducto, repuestos } from './productos/index.ts';
import { estaciones } from './ciclo.ts';

export type Entrada = {
  titulo: string;
  url: string;
  grupo: string;
  /** Una línea bajo el título en los resultados. */
  pista: string;
  /** Texto adicional que se busca pero no se muestra. */
  terminos: string;
};

const primeraFrase = (t: string) => (t.split('. ')[0] ?? t).replace(/\.$/, '') + '.';

export const indice: Entrada[] = [
  // Páginas institucionales
  ...navegacion
    .filter((n) => ['/nosotros', '/servicios', '/contacto'].includes(n.url))
    .map((n) => ({
      titulo: n.titulo,
      url: n.url,
      grupo: 'Compañía',
      pista:
        n.url === '/servicios' ? 'Servicio técnico y diseño de centrales'
        : n.url === '/nosotros' ? 'Marcas representadas y criterio de representación'
        : 'Cotización, servicio técnico y licitaciones',
      terminos: '',
    })),

  // Índice de productos y categorías
  {
    titulo: 'Productos',
    url: '/productos',
    grupo: 'Productos',
    pista: 'Las cinco categorías del catálogo',
    terminos: 'catálogo',
  },
  ...categorias.map((c) => ({
    titulo: c.titulo,
    url: `/productos/${c.slug}`,
    grupo: 'Categoría',
    pista: c.panel,
    terminos: c.intro,
  })),

  // Productos
  ...productos.map((p) => ({
    titulo: p.titulo,
    url: urlProducto(p),
    grupo: categorias.find((c) => c.slug === p.categoria)?.titulo ?? 'Productos',
    pista: primeraFrase(p.entradilla),
    terminos: [...p.procesa, ...(p.marcas ?? []).filter((m) => !m.startsWith('{{'))].join(' '),
  })),
  {
    titulo: repuestos.titulo,
    url: '/productos/repuestos',
    grupo: 'Productos',
    pista: primeraFrase(repuestos.entradilla),
    terminos: repuestos.grupos.flatMap((g) => g.partes).join(' '),
  },

  // Estaciones del proceso, que es como el visitante nombra su problema
  ...estaciones.map((e) => ({
    titulo: e.nombre,
    url: '/#proceso',
    grupo: `Proceso · estación ${String(e.numero).padStart(2, '0')}`,
    pista: primeraFrase(e.descripcion),
    terminos: e.dolor + ' ' + e.rotulo,
  })),
];

/** Comprobación de integridad: toda url del índice existe en el árbol. */
export const urlsDelIndice = indice.map((e) => e.url);
export const rutasConocidas = new Set(todosLosNodos().map((n) => n.url));
