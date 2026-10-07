/**
 * Lanzador de las herramientas del repo.
 *
 * Los scripts leen los datos directamente de `src/datos/*.ts`, y eso sólo lo
 * entiende Node 22. Si la terminal está en otra versión —lo normal cuando se
 * tienen varias instaladas—, `node` se cae con un volcado de pila que no dice
 * qué hacer.
 *
 * Este lanzador resuelve el caso: si la versión actual sirve, ejecuta; si no,
 * busca una Node 22 instalada por nvm y relanza con ella. Y si no hay ninguna,
 * explica en una línea qué instalar.
 *
 *   node herramientas/correr.mjs logos
 */
import { spawnSync } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const MINIMA = [22, 6]; // desde 22.6 Node lee TypeScript sin compilar

const herramienta = process.argv[2];
const destino = new URL(`./${herramienta}.mjs`, import.meta.url);

if (!herramienta || !existsSync(destino)) {
  console.error(`\nNo existe la herramienta «${herramienta ?? ''}».`);
  console.error('Disponibles: logos · media · marcadores\n');
  process.exit(1);
}

const [mayor, menor] = process.versions.node.split('.').map(Number);
const sirve = mayor > MINIMA[0] || (mayor === MINIMA[0] && menor >= MINIMA[1]);

if (sirve) {
  await import(destino.href);
} else {
  /* Buscar una Node suficientemente nueva entre las que instaló nvm. */
  const raiz = join(homedir(), '.nvm', 'versions', 'node');
  const candidata = existsSync(raiz)
    ? readdirSync(raiz)
        .map((v) => v.replace(/^v/, '').split('.').map(Number))
        .filter(([a, b]) => a > MINIMA[0] || (a === MINIMA[0] && b >= MINIMA[1]))
        .sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2])[0]
    : null;

  if (!candidata) {
    console.error(`\nEsta herramienta necesita Node ${MINIMA.join('.')} o superior.`);
    console.error(`Su terminal está usando la ${process.versions.node}.\n`);
    console.error('Instálela una vez y vuelva a ejecutar:\n');
    console.error('  nvm install 22\n');
    process.exit(1);
  }

  const binario = join(raiz, `v${candidata.join('.')}`, 'bin', 'node');
  const r = spawnSync(binario, [destino.pathname, ...process.argv.slice(3)], { stdio: 'inherit' });
  process.exit(r.status ?? 1);
}
