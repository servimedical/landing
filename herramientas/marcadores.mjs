/**
 * Inventario de {{ POR CONFIRMAR }} agrupado por página.
 * Es el insumo de trabajo del área comercial.   node herramientas/marcadores.mjs
 */
const { productos, categorias, repuestos, urlProducto } = await import('../src/content/productos/index.ts');
const { sitio } = await import('../src/content/sitio.ts');
const { etiqueta } = await import('../src/content/trazabilidad.ts');

const RE = /\{\{\s*POR CONFIRMAR:?\s*([^}]*)\}\}/g;
const grupos = new Map();

const anota = (pagina, campo, texto) => {
  for (const m of String(texto ?? '').matchAll(RE)) {
    if (!grupos.has(pagina)) grupos.set(pagina, []);
    grupos.get(pagina).push([campo, m[1].trim()]);
  }
};

const recorrer = (pagina, obj, prefijo = '') => {
  if (typeof obj === 'string') return anota(pagina, prefijo || 'texto', obj);
  if (Array.isArray(obj)) return obj.forEach((v, i) => recorrer(pagina, v, `${prefijo}[${i}]`));
  if (obj && typeof obj === 'object')
    for (const [k, v] of Object.entries(obj)) recorrer(pagina, v, prefijo ? `${prefijo}.${k}` : k);
};

for (const p of productos) recorrer(urlProducto(p), p);
recorrer('/productos/repuestos', repuestos);
for (const c of categorias) recorrer(`/productos/${c.slug}`, c);
recorrer('/trazabilidad', etiqueta);
recorrer('(global) src/content/sitio.ts', sitio);

const total = [...grupos.values()].reduce((n, l) => n + l.length, 0);
console.log(`\n${total} marcadores {{ POR CONFIRMAR }} en ${grupos.size} páginas\n`);
for (const [pagina, items] of grupos) {
  console.log(pagina);
  for (const [campo, texto] of items) console.log(`  · [${campo}] ${texto}`);
  console.log();
}
