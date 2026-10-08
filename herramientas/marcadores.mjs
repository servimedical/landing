/**
 * Inventario consolidado de marcadores, agrupado por página y separando lo
 * que es decisión comercial de lo que requiere revisión jurídica.
 *
 *   node herramientas/marcadores.mjs        ·  npm run marcadores
 */
const { lineas, urlLinea } = await import('../src/datos/lineas.ts');
const { marcas, urlMarca } = await import('../src/datos/marcas.ts');
const { productos, urlProducto, idProducto } = await import('../src/datos/productos.ts');
const { sitio } = await import('../src/content/sitio.ts');
const inst = await import('../src/content/institucional.ts');
const legal = await import('../src/content/legal.ts');

const RE = /\{\{\s*(POR CONFIRMAR|REQUIERE REVISIÓN JURÍDICA)\s*:?\s*([^}]*)\}\}/g;

const comercial = new Map();
const juridico = new Map();

const normalizar = (t) => t.replace(/[\s*]+/g, ' ').trim();

const anota = (grupo, pagina, campo, tipo, texto) => {
  const destino = tipo === 'POR CONFIRMAR' ? comercial : juridico;
  if (!destino.has(pagina)) destino.set(pagina, []);
  destino.get(pagina).push([campo, normalizar(texto) || '(sin detalle)']);
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

for (const l of lineas) recorrer(urlLinea(l.slug), l);
for (const m of marcas) recorrer(urlMarca(m.slug), m);
for (const p of productos) recorrer(urlProducto(p), p);
recorrer('/servicios', inst.servicios);
recorrer('/contacto', inst.contactoPagina);
recorrer('/politica-de-tratamiento-de-datos', { VIGENCIA: legal.VIGENCIA, CANAL_TITULAR: legal.CANAL_TITULAR });
recorrer('(global) src/content/sitio.ts', sitio);
recorrer('(global) src/components/Footer.astro', {
  redes: '{{ POR CONFIRMAR: redes sociales propias de SVMG }}',
});

/* Los datos del catálogo marcan sus huecos con `// TODO` y `// VERIFICAR` al
   lado del campo, no con llaves dobles: un comentario no se puede colar a la
   página. Se listan aparte. */
const { readFileSync: leer } = await import('node:fs');
const pendientesCatalogo = [];
for (const archivo of ['src/datos/marcas.ts', 'src/datos/lineas.ts', 'src/datos/productos.ts']) {
  const lineas = leer(archivo, 'utf8').split('\n');
  for (let i = 0; i < lineas.length; i++) {
    const m = lineas[i].match(/\/\/\s*(TODO|VERIFICAR)\b(.*)$/);
    if (!m) continue;

    /* Las menciones entre comillas invertidas son la documentación de la
       convención, no un pendiente. Sin esto, la cabecera de cada archivo
       aparecería como tarea. */
    if (/`/.test(lineas[i])) continue;

    /* Un pendiente puede ocupar varias líneas. Se juntan las continuaciones
       —comentarios `//` sin marcador propio— para no cortar la frase a la
       mitad, que es donde suele estar el dato que importa. */
    const partes = [m[2]];
    let j = i + 1;
    while (j < lineas.length) {
      const sig = lineas[j].match(/^\s*\/\/\s?(.*)$/);
      if (!sig || /\b(TODO|VERIFICAR)\b/.test(sig[1])) break;
      partes.push(sig[1]);
      j++;
    }
    const texto = partes.join(' ').replace(/\s+/g, ' ').trim().replace(/^·\s*/, '');
    pendientesCatalogo.push([`${archivo}:${i + 1}`, m[1], texto]);
    i = j - 1;
  }
}

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

/* El mismo marcador puede aparecer en el módulo de contenido y en el barrido
   del código. Se lista una vez. */
for (const grupo of [comercial, juridico]) {
  const vistos = new Set();
  for (const [pagina, items] of [...grupo]) {
    const unicos = items.filter(([, t]) => (vistos.has(t) ? false : vistos.add(t)));
    if (unicos.length) grupo.set(pagina, unicos);
    else grupo.delete(pagina);
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

if (pendientesCatalogo.length) {
  console.log(`\n${'═'.repeat(72)}\nCATÁLOGO — datos de fabricante por confirmar o contrastar — ${pendientesCatalogo.length}\n${'═'.repeat(72)}\n`);
  for (const [donde, tipo, texto] of pendientesCatalogo)
    console.log(`${donde}\n  · [${tipo}] ${texto || '(ver el comentario en el archivo)'}`);
}
console.log(`\n${'═'.repeat(72)}\nREVISIÓN JURÍDICA — no publicar sin validación\n${'═'.repeat(72)}`);
console.log('\nsrc/content/legal.ts');
console.log('  · [encabezado del archivo] {{ REQUIERE REVISIÓN JURÍDICA }} · borrador completo de la');
console.log('    política de tratamiento de datos (Ley 1581 de 2012, Decreto 1377 de 2013).');
console.log('    Lo tiene que revisar y aprobar quien lleve lo jurídico antes de producción.');
for (const [pagina, items] of juridico)
  for (const [campo, texto] of items) console.log(`\n${pagina}\n  · [${campo}] ${texto}`);
