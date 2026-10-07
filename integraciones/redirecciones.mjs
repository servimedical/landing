/**
 * Mapa de redirecciones 301 de la reestructuración del portafolio.
 *
 * Origen único: `vercel.json` se genera de aquí con `npm run redirecciones`,
 * y la integración de abajo detiene el build si los dos se separan. Un 301
 * que se pierde es tráfico y posiciones que se pierden en silencio.
 */
/* Líneas con un solo producto: /lineas/<linea> no tiene página propia porque
   sería un paso intermedio vacío, así que va directo al producto. Se deriva de
   los datos: el día que una segunda marca entre a la línea, la página aparece
   y esta redirección desaparece sola. Así pasó con residuos hospitalarios al
   sumar Celitron y Akarmak. */
async function lineasDeUnProducto() {
  const { lineas } = await import('../src/datos/lineas.ts');
  const { productosDeLinea, urlProducto } = await import('../src/datos/productos.ts');
  return [...lineas]
    .sort((a, b) => a.orden - b.orden)
    .map((l) => [l, productosDeLinea(l.slug)])
    .filter(([, p]) => p.length === 1)
    .map(([l, p]) => [`/lineas/${l.slug}`, urlProducto(p[0])]);
}

export const redirecciones = [
  // Tuttnauer · nombres de línea cortos
  ['/marcas/tuttnauer/autoclaves-de-vapor',          '/marcas/tuttnauer/vapor'],
  ['/marcas/tuttnauer/plasma-de-peroxido',           '/marcas/tuttnauer/plasma'],
  ['/marcas/tuttnauer/esterilizacion-por-plasma',    '/marcas/tuttnauer/plasma'],

  // Servimedical · el empaque nombra el material, no la categoría
  ['/marcas/servimedical/papel-y-empaque',           '/marcas/servimedical/papel-y-tyvek'],
  ['/marcas/servimedical/repuestos-originales',      '/marcas/servimedical/repuestos'],

  // Servimedical · mesas, mesones, carros y estantería pasan a ser subtipos
  // dentro de una sola línea de mobiliario, no líneas aparte.
  ['/marcas/servimedical/mesas-y-mesones',           '/marcas/servimedical/mobiliario-acero-inoxidable'],
  ['/marcas/servimedical/carros-de-transporte',      '/marcas/servimedical/mobiliario-acero-inoxidable'],
  ['/marcas/servimedical/almacenamiento-esteril',    '/marcas/servimedical/mobiliario-acero-inoxidable'],

  // TODO confirmar con Felipe · compresores y tratamiento de agua salen del
  // portafolio de seis marcas. No caben como «insumo de instalación» dentro de
  // repuestos: cada uno tiene su propio dimensionamiento y su propio servicio.
  // Mientras se decide, van a la marca. El contenido completo de ambas líneas
  // está en el historial de git (commit 1966fa1, src/content/productos/).
  ['/marcas/servimedical/compresores',               '/marcas/servimedical'],
  ['/marcas/servimedical/tratamiento-de-agua',       '/marcas/servimedical'],

  // El fabricante turco es Akar Makina: Akarmak, no «Arkarmak».
  ['/marcas/arkarmak',                               '/marcas/akarmak'],
  ['/marcas/arkarmak/:resto*',                       '/marcas/akarmak'],

  // Easymedical sale del portafolio. Las selladoras térmicas no se reubican
  // mientras no se confirme bajo qué marca se siguen vendiendo.
  // TODO confirmar con Felipe · destino de las selladoras térmicas
  ['/marcas/easymedical',                            '/marcas'],
  ['/marcas/easymedical/:resto*',                    '/marcas'],
];

/* `statusCode: 301` y no `permanent: true`: Vercel traduce `permanent` a 308,
   que preserva el método. Para una migración de URLs lo que corresponde es un
   301, que es además lo que esperan las herramientas de SEO. */
export const comoVercel = async () =>
  [...redirecciones, ...(await lineasDeUnProducto())]
    .map(([source, destination]) => ({ source, destination, statusCode: 301 }));

/** Detiene el build si `vercel.json` y este archivo se separaron. */
export function validarRedirecciones() {
  return {
    name: 'svmg:validar-redirecciones',
    hooks: {
      'astro:config:done': async ({ logger }) => {
        const { readFileSync } = await import('node:fs');
        const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
        const reglas = await comoVercel();
        const esperado = JSON.stringify(reglas);
        const actual = JSON.stringify(vercel.redirects ?? []);
        if (esperado !== actual)
          throw new Error(
            '\n\nvercel.json no coincide con integraciones/redirecciones.mjs.\n' +
            'Ejecute `npm run redirecciones` para regenerarlo.\n'
          );
        logger.info(`redirecciones: ${reglas.length} reglas 301 sincronizadas con vercel.json ✓`);
      },
    },
  };
}
