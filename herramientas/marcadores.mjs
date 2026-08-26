/**
 * Inventario consolidado de marcadores, agrupado por página y separando lo
 * que es decisión comercial de lo que requiere revisión jurídica.
 *
 *   node herramientas/marcadores.mjs        ·  npm run marcadores
 */
const { productos, categorias, repuestos, urlProducto } = await import('../src/content/productos/index.ts');
const { sitio } = await import('../src/content/sitio.ts');
const { etiqueta } = await import('../src/content/trazabilidad.ts');
const inst = await import('../src/content/institucional.ts');
const legal = await import('../src/content/legal.ts');

const RE = /\{\{\s*(POR CONFIRMAR|REQUIERE REVISIÓN JURÍDICA)\s*:?\s*([^}]*)\}\}/g;

const comercial = new Map();
const juridico = new Map();

const anota = (grupo, pagina, campo, tipo, texto) => {
  const destino = tipo === 'POR CONFIRMAR' ? comercial : juridico;
  if (!destino.has(pagina)) destino.set(pagina, []);
  destino.get(pagina).push([campo, texto.trim() || '(sin detalle)']);
};

const recorrer = (pagina, obj, prefijo = '') => {
  if (typeof obj === 'string') {
    for (const m of obj.matchAll(RE)) anota(null, pagina, prefijo || 'texto', m[1], m[2]);
    return;
  }
  if (Array.isArray(obj)) return obj.forEach((v, i) => recorrer(pagina, v, `${prefijo}[${i}]`));
  if (obj && typeof obj === 'object')
    for (const [k, v] of Object.entries(obj)) recorrer(pagina, v, prefijo ? `${prefijo}.${k}` : k);
};

for (const p of productos) recorrer(urlProducto(p), p);
recorrer('/productos/repuestos', repuestos);
for (const c of categorias) recorrer(`/productos/${c.slug}`, c);
recorrer('/trazabilidad', etiqueta);
recorrer('/nosotros', inst.nosotros);
recorrer('/servicios', inst.servicios);
recorrer('/trazabilidad', inst.trazabilidad);
recorrer('/trazabilidad/software', inst.software);
recorrer('/contacto', inst.contactoPagina);
recorrer('/politica-de-tratamiento-de-datos', { VIGENCIA: legal.VIGENCIA, CANAL_TITULAR: legal.CANAL_TITULAR });
recorrer('(global) src/content/sitio.ts', sitio);
recorrer('(global) src/components/Footer.astro', {
  redes: '{{ POR CONFIRMAR: redes sociales propias de SVMG }}',
});
recorrer('(global) api/formulario.ts', {
  destinatarios: '{{ POR CONFIRMAR: dirección o direcciones que reciben cada formulario, y si repuestos y servicio técnico van a un destinatario distinto de comercial }}',
});

const imprimir = (titulo, grupos) => {
  const total = [...grupos.values()].reduce((n, l) => n + l.length, 0);
  console.log(`\n${'═'.repeat(72)}\n${titulo} — ${total} en ${grupos.size} páginas\n${'═'.repeat(72)}`);
  for (const [pagina, items] of [...grupos].sort()) {
    console.log(`\n${pagina}`);
    for (const [campo, texto] of items) console.log(`  · [${campo}] ${texto}`);
  }
};

imprimir('DECISIÓN COMERCIAL — datos que debe confirmar SVMG', comercial);
console.log(`\n${'═'.repeat(72)}\nREVISIÓN JURÍDICA — no publicar sin validación\n${'═'.repeat(72)}`);
console.log('\nsrc/content/legal.ts');
console.log('  · [encabezado del archivo] {{ REQUIERE REVISIÓN JURÍDICA }} · borrador completo de la');
console.log('    política de tratamiento de datos (Ley 1581 de 2012, Decreto 1377 de 2013).');
console.log('    Lo tiene que revisar y aprobar quien lleve lo jurídico antes de producción.');
for (const [pagina, items] of juridico)
  for (const [campo, texto] of items) console.log(`\n${pagina}\n  · [${campo}] ${texto}`);
