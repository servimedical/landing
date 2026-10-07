/** Escribe el bloque `redirects` de vercel.json desde el mapa único.
 *  node herramientas/redirecciones.mjs  ·  npm run redirecciones */
import { readFileSync, writeFileSync } from 'node:fs';
import { comoVercel } from '../integraciones/redirecciones.mjs';

const ruta = new URL('../vercel.json', import.meta.url);
const vercel = JSON.parse(readFileSync(ruta, 'utf8'));
const { headers, ...resto } = vercel;
const reglas = await comoVercel();
writeFileSync(ruta, JSON.stringify({ ...resto, redirects: reglas, headers }, null, 2) + '\n');
console.log(`vercel.json · ${reglas.length} redirecciones 301 escritas ✓`);
