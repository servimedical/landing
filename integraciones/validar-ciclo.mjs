/**
 * Contrasta cada `url` de src/content/ciclo.ts contra el árbol de rutas de
 * src/content/navegacion.ts y detiene la construcción si alguna no existe.
 *
 * La rueda es el índice del catálogo: un enlace muerto ahí la degrada de
 * índice a decoración. Por eso se valida en compilación y no a ojo.
 */
export function validarEnlaces() {
  return {
    name: 'svmg:validar-enlaces',
    hooks: {
      'astro:config:done': async ({ logger }) => {
        const { estaciones } = await import('../src/content/ciclo.ts');
        const { todosLosNodos, normalizar } = await import('../src/content/navegacion.ts');
        const { productos } = await import('../src/content/productos/index.ts');

        const rutas = new Set(todosLosNodos().map((n) => normalizar(n.url)));
        const fallos = [];
        let total = 0;

        /** Un ancla del ciclo (/#/ciclo/03) apunta a la home y siempre es válida. */
        const valida = (url) => url.startsWith('/#') || rutas.has(normalizar(url));

        const revisar = (url, donde) => {
          total++;
          if (!valida(url)) fallos.push(`  ${donde}\n    apunta a ${url}, que no existe en el árbol de rutas`);
        };

        for (const est of estaciones)
          for (const item of est.items)
            revisar(item.url, `ciclo · estación 0${est.numero} (${est.slug}) → «${item.nombre}»`);

        for (const p of productos) {
          for (const n of p.necesita)
            revisar(n.url, `productos · ${p.categoria}/${p.slug} · bloque 4 → «${n.titulo}»`);
          if (p.alternativa)
            revisar(p.alternativa.url, `productos · ${p.categoria}/${p.slug} · alternativa → «${p.alternativa.titulo}»`);
        }

        if (fallos.length) {
          throw new Error(
            `\n\n${fallos.length} de ${total} enlaces de contenido apuntan a rutas inexistentes.\n\n` +
            fallos.join('\n\n') +
            `\n\nCorrija la url en src/content/ o añada la ruta en ` +
            `src/content/navegacion.ts.\n`
          );
        }

        logger.info(`contenido: ${total} enlaces validados contra el árbol de rutas ✓`);
      },
    },
  };
}
