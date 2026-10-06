import type { Producto } from './tipos.ts';
import { esterilizacion } from './esterilizacion.ts';
import { consumibles } from './consumibles.ts';
import { accesorios } from './accesorios.ts';
import { mobiliario } from './mobiliario.ts';
import { propios } from './propios.ts';

export * from './tipos.ts';

export const productos: Producto[] = [
  ...esterilizacion, ...consumibles, ...accesorios, ...mobiliario, ...propios,
];

/** Por slug, sin importar la categoría: es como lo pide el árbol de marcas. */
export const buscarPorSlug = (slug: string): Producto | undefined =>
  productos.find((p) => p.slug === slug);

/** URL canónica de una línea. Vive en src/content/marcas.ts porque es la
 *  marca la que define la ruta. */
export { urlLinea as urlProducto } from '../marcas.ts';
