/**
 * Rastreo de enlaces internos sobre el sitio ya compilado.
 *
 *   npm run enlaces
 *
 * El build ya valida los enlaces que salen de los datos. Esto revisa el HTML
 * final, que es donde aparecen los que escribió una persona a mano y los que
 * una plantilla arma concatenando.
 *
 * También comprueba que cada redirección 301 apunte a una ruta que existe: un
 * 301 hacia un 404 es peor que no tener redirección, porque el buscador
 * registra la mudanza y luego no encuentra nada.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const RAIZ = 'dist';
const ESTATICO = /\.(css|js|mjs|svg|png|webp|jpe?g|ico|xml|txt|json|pdf|woff2?)$/;

const paginas = [];
const rutas = new Set(['/']);

function recorrer(dir, base = '') {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      recorrer(p, `${base}/${f}`);
    } else if (f.endsWith('.html')) {
      const ruta = `${base}/${f.replace(/\.html$/, '')}`.replace(/\/index$/, '') || '/';
      rutas.add(ruta);
      paginas.push({ archivo: `${base}/${f}`, ruta, html: readFileSync(p, 'utf8') });
    }
  }
}
recorrer(RAIZ);

const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
const redirecciones = new Map(vercel.redirects.map((r) => [r.source, r.destination]));

let revisados = 0;
const rotos = new Set();

for (const pagina of paginas) {
  for (const m of pagina.html.matchAll(/href="(\/[^"#?]*)/g)) {
    const url = m[1].replace(/\/$/, '') || '/';
    if (url.startsWith('/_') || ESTATICO.test(url)) continue;
    revisados++;
    if (!rutas.has(url) && !redirecciones.has(url)) rotos.add(`${pagina.archivo} → ${url}`);
  }
}

/* Las redirecciones con comodín (`:resto*`) no se pueden resolver sin el
   enrutador de Vercel, así que se excluyen de esta comprobación. */
const destinosRotos = [...redirecciones].filter(
  ([, d]) => !d.includes(':') && !rutas.has(d.replace(/\/$/, '')),
);

const linea = '─'.repeat(68);
console.log(`\n${linea}\nENLACES INTERNOS\n${linea}\n`);
console.log(`  ${paginas.length} páginas · ${revisados} enlaces · ${rotos.size} rotos`);
for (const r of [...rotos].slice(0, 20)) console.log(`    · ${r}`);

console.log(`\n  ${redirecciones.size} redirecciones 301 · ${destinosRotos.length} con destino inexistente`);
for (const [s, d] of destinosRotos) console.log(`    · ${s} → ${d}`);
console.log('');

if (rotos.size || destinosRotos.length) process.exit(1);
