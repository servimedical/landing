/**
 * Contrasta cada `url` de src/content/ciclo.ts contra el árbol de rutas de
 * src/content/navegacion.ts y detiene la construcción si alguna no existe.
 *
 * La rueda es el índice del catálogo: un enlace muerto ahí la degrada de
 * índice a decoración. Por eso se valida en compilación y no a ojo.
 */
export function validarCiclo() {
  return {
    name: 'svmg:validar-ciclo',
    hooks: {
      'astro:config:done': async ({ logger }) => {
        const { estaciones } = await import('../src/content/ciclo.ts');
        const { todosLosNodos, normalizar } = await import('../src/content/navegacion.ts');

        const rutas = new Set(todosLosNodos().map((n) => normalizar(n.url)));
        const fallos = [];
        let total = 0;

        for (const est of estaciones) {
          for (const item of est.items) {
            total++;
            if (!rutas.has(normalizar(item.url))) {
              fallos.push(
                `  estación 0${est.numero} (${est.slug}) → «${item.nombre}»\n` +
                `    apunta a ${item.url}, que no existe en el árbol de rutas`
              );
            }
          }
        }

        if (fallos.length) {
          throw new Error(
            `\n\nciclo.ts: ${fallos.length} de ${total} enlaces apuntan a rutas inexistentes.\n\n` +
            fallos.join('\n\n') +
            `\n\nCorrija la url en src/content/ciclo.ts o añada la ruta en ` +
            `src/content/navegacion.ts.\n`
          );
        }

        logger.info(`ciclo.ts: ${total} enlaces validados contra el árbol de rutas ✓`);
      },
    },
  };
}
