/**
 * Presupuestos de JavaScript del sitio.   node herramientas/medir.mjs
 *
 *   Rueda del ciclo (paso 2) ............ < 14 KB comprimidos
 *   Carta + etiqueta (paso 3) ...........  < 8 KB comprimidos
 *
 * Se mide sólo lo que el navegador descarga y ejecuta: las importaciones
 * dinámicas que nunca se piden —los signals de Preact— quedan fuera.
 */
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const gz = (b) => gzipSync(Buffer.from(b), { level: 9 }).length;
const enLinea = (html) =>
  [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);

const home = readFileSync('dist/index.html', 'utf8');
const traza = readFileSync('dist/trazabilidad.html', 'utf8');

/* Cada script en línea se atribuye por una marca propia de su código. */
const DUENO = [
  { marca: /grupo-productos/, de: 'paso 1 · panel de productos' },
  { marca: /boton-menu/,      de: 'paso 1 · menú móvil' },
  { marca: /carta-curva/,     de: 'paso 3 · carta de ciclo' },
  { marca: /\.campo\[data-k/, de: 'paso 3 · etiqueta' },
];
const duenoDe = (b) => DUENO.find((d) => d.marca.test(b))?.de ?? 'paso 2 · rueda';

function informe(titulo, presupuesto, filas) {
  const total = filas.reduce((n, f) => n + f[2], 0);
  console.log(`\n${titulo}`);
  for (const [nombre, bruto, g] of filas)
    console.log(`  ${nombre.padEnd(40)} ${String(bruto).padStart(6)}  ${String(g).padStart(5)}`);
  const cabe = total <= presupuesto;
  console.log(`  ${''.padEnd(40, '-')} ${''.padStart(6)}  ${String(total).padStart(5)}`);
  console.log(`  ${(total / 1024).toFixed(2)} KB de ${presupuesto / 1024} KB · ` +
    (cabe ? `✓ margen ${((presupuesto - total) / 1024).toFixed(2)} KB` : `✗ excede ${((total - presupuesto) / 1024).toFixed(2)} KB`));
  return cabe;
}

/* ── Rueda: módulos de la isla + runtime + enlace profundo ── */
const componente = /<astro-island[^>]*component-url="([^"]+)"/.exec(home)[1];
const renderizador = /<astro-island[^>]*renderer-url="([^"]+)"/.exec(home)[1];
const vistos = new Set(), cola = [componente, renderizador];
while (cola.length) {
  const f = cola.shift();
  if (vistos.has(f)) continue;
  vistos.add(f);
  for (const m of readFileSync('dist' + f, 'utf8').matchAll(/(?:from|import)\s*"(\.\/[^"]+\.js)"/g))
    cola.push('/_astro/' + m[1].slice(2));
}
const filasRueda = [...vistos].sort().map((f) => {
  const b = readFileSync('dist' + f);
  return [f.replace('/_astro/', ''), b.length, gz(b)];
});
for (const b of enLinea(home).filter((b) => duenoDe(b) === 'paso 2 · rueda'))
  filasRueda.push(['(en línea: runtime de isla / hash)', b.length, gz(b)]);

/* ── Paso 3: carta y etiqueta ── */
const filasPiezas = [];
for (const [html, pag] of [[home, 'home'], [traza, '/trazabilidad']])
  for (const b of enLinea(html)) {
    const de = duenoDe(b);
    if (de.startsWith('paso 3')) filasPiezas.push([`${de.slice(9)} (${pag})`, b.length, gz(b)]);
  }

const ok1 = informe('RUEDA DEL CICLO (paso 2)', 14336, filasRueda);
const ok2 = informe('CARTA DE CICLO Y ETIQUETA (paso 3)', 8192, filasPiezas);
process.exit(ok1 && ok2 ? 0 : 1);
