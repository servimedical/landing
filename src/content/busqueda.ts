/* Índice de búsqueda. Se arma en compilación desde los mismos datos que
   publican las páginas, así que no puede desincronizarse del sitio. */

import { navegacion } from './navegacion.ts';
import { marcas, marcaPorSlug, urlMarca } from '../datos/marcas.ts';
import { lineas, urlLinea } from '../datos/lineas.ts';
import { productos, productosDeLinea, urlProducto, lineaTienePagina } from '../datos/productos.ts';

export type Entrada = {
  titulo: string;
  url: string;
  grupo: string;
  pista: string;
  terminos: string;
};

export const indice: Entrada[] = [
  // Páginas
  ...navegacion
    .filter((n) => ['/lineas', '/marcas', '/servicios', '/contacto'].includes(n.url))
    .map((n) => ({
      titulo: n.titulo,
      url: n.url,
      grupo: 'Sitio',
      pista:
        n.url === '/lineas' ? 'El método de cada etapa de la central'
        : n.url === '/marcas' ? 'Las marcas que representamos'
        : n.url === '/servicios' ? 'Instalación, mantenimiento, entrenamiento y diseño de central'
        : 'Cotización, servicio técnico, repuestos y licitaciones',
      terminos: '',
    })),

  // Líneas con página propia
  ...[...lineas]
    .filter((l) => lineaTienePagina(l.slug))
    .sort((a, b) => a.orden - b.orden)
    .map((l) => ({
      titulo: l.nombre,
      url: urlLinea(l.slug),
      grupo: 'Línea',
      pista: l.descriptor,
      terminos: [...l.compatible, ...productosDeLinea(l.slug).map((p) => marcaPorSlug(p.marca)!.nombre)].join(' '),
    })),

  // Marcas
  ...[...marcas].sort((a, b) => a.orden - b.orden).map((m) => ({
    titulo: m.nombre,
    url: urlMarca(m.slug),
    grupo: 'Marca',
    pista: m.descriptor,
    terminos: m.fabricante.pais,
  })),

  // Productos
  ...productos.map((p) => ({
    titulo: `${p.nombre} ${marcaPorSlug(p.marca)!.nombre}`,
    url: urlProducto(p),
    grupo: marcaPorSlug(p.marca)!.nombre,
    pista: p.diferenciales.join(' · '),
    terminos: [...p.franja.map((f) => f.valor), ...(p.normasDeclaradas ?? [])].join(' '),
  })),
];
