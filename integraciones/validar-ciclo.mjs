/**
 * Contrasta cada enlace del contenido contra el árbol de rutas y detiene la
 * construcción si alguno no existe. Un enlace muerto dentro del catálogo
 * manda al visitante a un 404 justo cuando iba a comprar.
 *
 * Lo que valida el esquema de `src/content.config.ts` —formas, longitudes,
 * referencias de línea, máximos— no se repite aquí. Esto mira sólo URLs.
 */
export function validarEnlaces() {
  return {
    name: 'svmg:validar-enlaces',
    hooks: {
      'astro:config:done': async ({ logger }) => {
        const { todosLosNodos, normalizar } = await import('../src/content/navegacion.ts');
        const { lineas, resolverLinea, urlLinea } = await import('../src/datos/lineas.ts');
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

        /* Venta cruzada y alternativa de cada línea. */
        for (const l of lineas) {
          for (const r of l.relacionadas) {
            const destino = resolverLinea(r.linea, l.marca);
            if (!destino) { total++; fallos.push(`  ${l.marca}/${l.slug} · «completa el ciclo»\n    «${r.linea}» no es una línea del catálogo`); continue; }
            revisar(urlLinea(destino), `${l.marca}/${l.slug} · «completa el ciclo» → «${destino.nombre}»`);
          }
          if (l.alternativa) {
            const destino = resolverLinea(l.alternativa.linea, l.marca);
            if (!destino) { total++; fallos.push(`  ${l.marca}/${l.slug} · alternativa\n    «${l.alternativa.linea}» no existe`); continue; }
            revisar(urlLinea(destino), `${l.marca}/${l.slug} · alternativa → «${l.alternativa.titulo}»`);
          }
        }

        /* Catálogos y documentos de marca, cuando los haya. */
        for (const m of marcas) {
          if (m.catalogo) revisar(m.catalogo, `marca ${m.slug} · catálogo`);
          for (const d of m.documentos ?? []) revisar(d.url, `marca ${m.slug} · documento «${d.titulo}»`);
        }

        /* Enlaces del contenido institucional. */
        revisar(home.cierre.url, 'home · cierre');
        for (const r of contactoPagina.rutas ?? []) if (r.ancla?.startsWith('/')) revisar(r.ancla, 'contacto');

        /* Las tarjetas de servicio de la home anclan dentro de /servicios: el
           ancla tiene que existir como sección de esa página. */
        for (const x of servicios.items) revisar('/servicios', `home · tarjeta «${x.titulo}»`);

        if (fallos.length)
          throw new Error(
            `\n\n${fallos.length} de ${total} enlaces de contenido apuntan a rutas inexistentes.\n\n` +
            fallos.join('\n\n') +
            `\n\nCorrija la url en src/datos/ o añada la ruta correspondiente.\n`
          );

        logger.info(`contenido: ${total} enlaces validados contra el árbol de rutas ✓`);
      },
    },
  };
}
