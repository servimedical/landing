/**
 * Genera public/og.png (1200×630) — la tarjeta que se ve al compartir el
 * enlace por WhatsApp, LinkedIn o Slack.
 *
 *   npm run og
 *
 * El texto se convierte a trazados con las mismas fuentes autoalojadas del
 * sitio, así que no depende de que la máquina las tenga instaladas.
 * Nota: fontkit no aplica los ejes variables de este woff2, por lo que se
 * usa la instancia base de Archivo (SemiBold, ancho 100).
 */
import * as fontkit from 'fontkit';
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const W = 1200, H = 630;
const NAVY = '#26416B', DEEP = '#1B3050', SIGNAL = '#89D800';

const archivo = fontkit.create(readFileSync('public/fonts/archivo-latin-wdth-normal.woff2'));
const mono = fontkit.create(readFileSync('public/fonts/ibm-plex-mono-latin-500-normal.woff2'));

/** Convierte una cadena en un <path> SVG. Devuelve { d, ancho }. */
function texto(font, str, size, x, y, tracking = 0) {
  const s = size / font.unitsPerEm;
  const run = font.layout(str);
  const partes = [];
  let pen = 0;
  run.glyphs.forEach((g, i) => {
    const d = g.path.transform(s, 0, 0, -s, x + pen, y).toSVG();
    if (d) partes.push(d);
    pen += run.positions[i].xAdvance * s + tracking;
  });
  return { d: partes.join(' '), ancho: pen - tracking };
}

const T = [];
const push = (font, str, size, x, y, fill, tracking = 0, extra = '') => {
  const { d, ancho } = texto(font, str, size, x, y, tracking);
  T.push(`<path d="${d}" fill="${fill}" ${extra}/>`);
  return ancho;
};

/* ── marca ── */
const MX = 80, MY = 92;
const marca = `
  <g transform="translate(${MX},${MY})">
    <circle cx="17" cy="17" r="13.5" fill="none" stroke="#fff" stroke-width="3.9"
            stroke-dasharray="63.6 21.2"/>
    <rect x="23.6" y="4.1" width="7.4" height="7.4" fill="${SIGNAL}"/>
  </g>`;
const wAncho = push(archivo, 'SERVIMEDICAL', 30, MX + 46, MY + 27, '#fff', 0.4,
                    'stroke="#fff" stroke-width="0.55" stroke-linejoin="round"');
push(mono, 'GROUP', 13, MX + 46 + wAncho + 12, MY + 27, 'rgba(255,255,255,.55)', 2.6);

/* ── titular ── */
push(archivo, 'El ciclo completo', 74, 80, 300, '#fff', -0.5,
     'stroke="#fff" stroke-width="1.1" stroke-linejoin="round"');
push(archivo, 'de esterilización.', 74, 80, 386, 'rgba(255,255,255,.62)', -0.5);

/* ── pie ── */
push(mono, 'EQUIPOS · TRAZABILIDAD · CONSUMIBLES · SERVICIO TÉCNICO', 15, 80, 505,
     'rgba(255,255,255,.66)', 2.2);
push(mono, 'BOGOTÁ · COLOMBIA', 15, 80, 556, 'rgba(255,255,255,.42)', 2.2);
const dom = texto(mono, 'SERVIMEDICALGROUP.COM', 15, 0, 0, 2.2).ancho;
push(mono, 'SERVIMEDICALGROUP.COM', 15, W - 80 - dom, 556, SIGNAL, 2.2);

/* ── anillo del ciclo, a la derecha ── */
const CX = 955, CY = 300, R = 172;
const pt = (a, r = R) => [CX + r * Math.cos((a - 90) * Math.PI / 180),
                          CY + r * Math.sin((a - 90) * Math.PI / 180)];
const arco = (a0, a1, r = R) => {
  const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r);
  return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0,1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
};
const segmentos = Array.from({ length: 6 }, (_, i) => {
  const a0 = i * 60 + 4, a1 = (i + 1) * 60 - 4;
  const on = i === 0;
  return `<path d="${arco(a0, a1)}" fill="none" stroke="${on ? SIGNAL : 'rgba(255,255,255,.19)'}" stroke-width="13"/>`;
}).join('');
const nodos = Array.from({ length: 6 }, (_, i) => {
  const [x, y] = pt(i * 60 + 30);
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" fill="${DEEP}" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>`;
}).join('');
const numeros = Array.from({ length: 6 }, (_, i) => {
  const [x, y] = pt(i * 60 + 30);
  const t = texto(mono, `0${i + 1}`, 12, 0, 0, .6);
  return `<path d="${texto(mono, `0${i + 1}`, 12, x - t.ancho / 2, y + 4.2, .6).d}" fill="rgba(255,255,255,.82)"/>`;
}).join('');
const nucleoT = texto(archivo, 'TRAZABILIDAD', 17, 0, 0, .3);
const nucleo = `
  <circle cx="${CX}" cy="${CY}" r="78" fill="none" stroke="${SIGNAL}" stroke-width="1.5" stroke-dasharray="4 4"/>
  <path d="${texto(archivo, 'TRAZABILIDAD', 17, CX - nucleoT.ancho / 2, CY + 6, .3).d}" fill="#fff"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <rect x="0" y="0" width="${W}" height="8" fill="${SIGNAL}"/>
  <line x1="80" y1="452" x2="${W - 80}" y2="452" stroke="rgba(255,255,255,.18)" stroke-width="1"/>
  ${segmentos}${nodos}${numeros}${nucleo}
  ${marca}
  ${T.join('\n  ')}
</svg>`;

writeFileSync('scripts/.og.svg', svg);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
const { size } = await import('node:fs').then((m) => m.promises.stat('public/og.png'));
console.log(`public/og.png  ${W}×${H}  ${(size / 1024).toFixed(0)} KB`);
