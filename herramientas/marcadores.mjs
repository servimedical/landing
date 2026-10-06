/**
 * Inventario consolidado de marcadores, agrupado por página y separando lo
 * que es decisión comercial de lo que requiere revisión jurídica.
 *
 *   node herramientas/marcadores.mjs        ·  npm run marcadores
 */
const { lineas, urlLinea, urlMarca } = await import('../src/datos/lineas.ts');
const { marcas } = await import('../src/datos/marcas.ts');
const { sitio } = await import('../src/content/sitio.ts');
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

for (const l of lineas) recorrer(urlLinea(l), l);
for (const m of marcas) recorrer(urlMarca(m.slug), m);
recorrer('/servicios', inst.servicios);
recorrer('/contacto', inst.contactoPagina);
recorrer('/politica-de-tratamiento-de-datos', { VIGENCIA: legal.VIGENCIA, CANAL_TITULAR: legal.CANAL_TITULAR });
recorrer('(global) src/content/sitio.ts', sitio);
recorrer('(global) src/components/Footer.astro', {
  redes: '{{ POR CONFIRMAR: redes sociales propias de SVMG }}',
});
recorrer('(global) api/formulario.ts', {
  destinatarios: '{{ POR CONFIRMAR: dirección interna que recibe el formulario, y si repuestos y servicio técnico van a un destinatario distinto de comercial }}',
});

/* Barrido del código fuente: cualquier marcador que no viva en un módulo de
   contenido —comentarios, plantillas, la función de formularios— también
   tiene que aparecer en el inventario. */
const { readdirSync, readFileSync, statSync } = await import('node:fs');
const { join } = await import('node:path');

const recorrerDir = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? recorrerDir(p) : [p];
});

const yaVisto = new Set(
  [...comercial.values(), ...juridico.values()].flat().map(([, t]) => t)
);

for (const dir of ['src', 'api']) {
  for (const archivo of recorrerDir(dir)) {
    if (!/\.(astro|ts|tsx|mjs|css)$/.test(archivo)) continue;
    for (const m of readFileSync(archivo, 'utf8').matchAll(RE)) {
      const texto = m[2].trim() || '(sin detalle)';
      if (yaVisto.has(texto)) continue;
      yaVisto.add(texto);
      anota(null, `(código) ${archivo}`, 'fuente', m[1], texto);
    }
  }
}

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
