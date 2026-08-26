import type { Producto, CategoriaProducto } from './tipos.ts';
import { esterilizacion } from './esterilizacion.ts';
import { consumibles } from './consumibles.ts';
import { accesorios } from './accesorios.ts';
import { mobiliario } from './mobiliario.ts';

export * from './tipos.ts';
export { categorias, indiceGeneral, type FichaCategoria } from './categorias.ts';
export { repuestos, type GrupoPartes } from './repuestos.ts';

export const productos: Producto[] = [
  ...esterilizacion, ...consumibles, ...accesorios, ...mobiliario,
];

export const porCategoria = (c: CategoriaProducto): Producto[] =>
  productos.filter((p) => p.categoria === c);

export const buscarProducto = (categoria: string, slug: string): Producto | undefined =>
  productos.find((p) => p.categoria === categoria && p.slug === slug);

/** URL canónica de una página de producto. */
export const urlProducto = (p: Producto): string => `/productos/${p.categoria}/${p.slug}`;
