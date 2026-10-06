/** Escribe el bloque `redirects` de vercel.json desde el mapa único.
 *  node herramientas/redirecciones.mjs  ·  npm run redirecciones */
import { readFileSync, writeFileSync } from 'node:fs';
import { comoVercel } from '../integraciones/redirecciones.mjs';

const ruta = new URL('../vercel.json', import.meta.url);
const vercel = JSON.parse(readFileSync(ruta, 'utf8'));
const { headers, ...resto } = vercel;
writeFileSync(ruta, JSON.stringify({ ...resto, redirects: comoVercel(), headers }, null, 2) + '\n');
console.log(`vercel.json · ${comoVercel().length} redirecciones 301 escritas ✓`);
