/**
 * Contrasta cada enlace del contenido contra el árbol de rutas y detiene la
 * construcción si alguno no existe. Un enlace muerto dentro del catálogo
 * manda al visitante a un 404 justo cuando iba a comprar.
 */
export function validarEnlaces() {
  return {
    name: 'svmg:validar-enlaces',
    hooks: {
      'astro:config:done': async ({ logger }) => {
        const { todosLosNodos, normalizar } = await import('../src/content/navegacion.ts');
        const { productos } = await import('../src/content/productos/index.ts');
        const { marcas } = await import('../src/content/marcas.ts');

        const rutas = new Set(todosLosNodos().map((n) => normalizar(n.url)));
        const fallos = [];
        let total = 0;

        const valida = (url) => url.startsWith('/#') || rutas.has(normalizar(url));
        const revisar = (url, donde) => {
          total++;
          if (!valida(url)) fallos.push(`  ${donde}\n    apunta a ${url}, que no existe en el árbol de rutas`);
        };

        const { urlLinea } = await import('../src/content/marcas.ts');
        const destino = (n) => (n.linea ? urlLinea(n.linea) : n.url);

        for (const p of productos) {
          for (const n of p.necesita) revisar(destino(n), `producto ${p.slug} · bloque «qué más necesita» → «${n.titulo}»`);
          if (p.alternativa) revisar(destino(p.alternativa), `producto ${p.slug} · alternativa → «${p.alternativa.titulo}»`);
        }

        /* Toda línea declarada en una marca tiene que existir como producto. */
        const slugs = new Set(productos.map((p) => p.slug));
        for (const m of marcas)
          for (const l of m.lineas) {
            total++;
            if (!slugs.has(l)) fallos.push(`  marca ${m.slug}\n    declara la línea «${l}», que no existe en el catálogo`);
          }

        if (fallos.length) {
          throw new Error(
            `\n\n${fallos.length} de ${total} enlaces de contenido apuntan a rutas inexistentes.\n\n` +
            fallos.join('\n\n') +
            `\n\nCorrija la url en src/content/ o añada la ruta en src/content/marcas.ts.\n`
          );
        }

        logger.info(`contenido: ${total} enlaces validados contra el árbol de rutas ✓`);
      },
    },
  };
}
