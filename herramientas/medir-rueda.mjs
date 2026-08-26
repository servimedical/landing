/**
 * Mide el JavaScript que descarga y ejecuta la rueda del ciclo.
 * Presupuesto: 14 KB comprimidos.   node herramientas/medir-rueda.mjs
 */
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const gz = (b) => gzipSync(Buffer.from(b), { level: 9 }).length;
const html = readFileSync('dist/index.html', 'utf8');

const componente = /<astro-island[^>]*component-url="([^"]+)"/.exec(html)[1];
const renderizador = /<astro-island[^>]*renderer-url="([^"]+)"/.exec(html)[1];

/* Sólo importaciones estáticas: lo que se carga con import() dinámico —los
   signals de Preact, que no se usan— no se descarga nunca. */
const vistos = new Set(), cola = [componente, renderizador];
while (cola.length) {
  const f = cola.shift();
  if (vistos.has(f)) continue;
  vistos.add(f);
  for (const m of readFileSync('dist' + f, 'utf8').matchAll(/(?:from|import)\s*"(\.\/[^"]+\.js)"/g))
    cola.push('/_astro/' + m[1].slice(2));
}

let total = 0;
console.log('  módulo                                  bruto     gzip');
for (const f of [...vistos].sort()) {
  const b = readFileSync('dist' + f);
  const g = gz(b); total += g;
  console.log(`  ${f.replace('/_astro/', '').padEnd(38)} ${String(b.length).padStart(6)}  ${String(g).padStart(6)}`);
}

// Scripts en línea. Se excluyen los del paso 1, que no son de la rueda.
const bloques = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const deLaRueda = bloques.filter((b) => !/grupo-productos|boton-menu/.test(b));
for (const b of deLaRueda) {
  const g = gz(b); total += g;
  console.log(`  ${'(en línea: runtime de isla / hash)'.padEnd(38)} ${String(b.length).padStart(6)}  ${String(g).padStart(6)}`);
}

const cabe = total < 14336;
console.log(`\n  excluidos ${bloques.length - deLaRueda.length} scripts del paso 1 (panel de productos y menú móvil)`);
console.log(`  TOTAL: ${(total / 1024).toFixed(2)} KB comprimidos · presupuesto 14 KB · ${cabe ? '✓ margen ' + ((14336 - total) / 1024).toFixed(2) + ' KB' : '✗ EXCEDE'}`);
process.exit(cabe ? 0 : 1);
