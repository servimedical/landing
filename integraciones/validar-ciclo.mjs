/**
 * Contrasta cada enlace del contenido contra el árbol de rutas y detiene la
 * construcción si alguno no existe. Un enlace muerto dentro del catálogo manda
 * al visitante a un 404 justo cuando iba a comprar.
 *
 * Lo que valida el esquema de src/content.config.ts —formas, longitudes,
 * referencias entre productos, máximos— no se repite aquí. Esto mira URLs.
 */
export function validarEnlaces() {
  return {
    name: 'svmg:validar-enlaces',
    hooks: {
      'astro:config:done': async ({ logger }) => {
        const { todosLosNodos, normalizar } = await import('../src/content/navegacion.ts');
        const { productos, productoPorId, urlProducto, idProducto } = await import('../src/datos/productos.ts');
        const { marcas } = await import('../src/datos/marcas.ts');
        const { home, servicios, contactoPagina } = await import('../src/content/institucional.ts');

        const rutas = new Set(todosLosNodos().map((n) => normalizar(n.url)));
        const fallos = [];
        let total = 0;

        const revisar = (url, donde) => {
          total++;
          if (!(url.startsWith('/#') || rutas.has(normalizar(url))))
            fallos.push(`  ${donde}\n    apunta a ${url}, que no existe en el árbol de rutas`);
        };

        /* Venta cruzada de cada producto. */
        for (const p of productos)
          for (const r of p.relacionadas) {
            const destino = productoPorId(r.producto);
            if (!destino) { total++; fallos.push(`  ${idProducto(p)} · «completa el ciclo»\n    «${r.producto}» no existe`); continue; }
            revisar(urlProducto(destino), `${idProducto(p)} · «completa el ciclo» → ${r.producto}`);
          }

        /* Documentos de marca, cuando los haya. */
        for (const m of marcas)
          for (const d of m.documentos ?? []) revisar(d.url, `marca ${m.slug} · documento «${d.titulo}»`);

        /* Contenido institucional. */
        revisar(home.cierre.url, 'home · cierre');
        for (const r of contactoPagina.rutas ?? []) if (r.ancla?.startsWith('/')) revisar(r.ancla, 'contacto');
        for (const x of servicios.items) revisar('/servicios', `home · tarjeta «${x.titulo}»`);

        if (fallos.length)
          throw new Error(
            `\n\n${fallos.length} de ${total} enlaces de contenido apuntan a rutas inexistentes.\n\n` +
            fallos.join('\n\n') +
            `\n\nCorrija la url en src/datos/ o añada la ruta correspondiente.\n`,
          );

        logger.info(`contenido: ${total} enlaces validados contra el árbol de rutas ✓`);
      },
    },
  };
}
