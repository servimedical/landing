import type { Estacion } from '../../content/ciclo';
import { GEO, CUNAS, LARGO_RADIO, CENTRO, R_NUCLEO } from './geometria';

type Props = {
  estaciones: Estacion[];
  fijada: number | null;
  previa: number | null;
  reducido: boolean;
  onFijar: (n: number, origen: 'clic' | 'teclado') => void;
  onPrevia: (n: number | null) => void;
};

export default function RuedaSVG({ estaciones, fijada, previa, reducido, onFijar, onPrevia }: Props) {
  /* Tabulación itinerante: el grupo entra como un solo control y las flechas
     rotan dentro. */
  const foco = fijada ?? 1;

  const teclas = (e: KeyboardEvent, n: number) => {
    const ir = (d: number) => {
      const s = ((n - 1 + d + 6) % 6) + 1;
      e.preventDefault();
      onPrevia(s);
      (document.getElementById(`arco-${s}`) as SVGPathElement | null)?.focus();
    };
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') ir(1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ir(-1);
    else if (e.key === 'Home') { e.preventDefault(); onPrevia(1); document.getElementById('arco-1')?.focus(); }
    else if (e.key === 'End') { e.preventDefault(); onPrevia(6); document.getElementById('arco-6')?.focus(); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFijar(n, 'teclado'); }
  };

  const trans = reducido ? 'none' : undefined;

  return (
    <svg viewBox="0 0 520 520" class="mx-auto block w-full max-w-[500px] overflow-visible" role="img">
      <title>El ciclo de esterilización en seis estaciones</title>
      <desc>
        El material sucio entra por recepción y lavado y sale estéril por entrega y uso,
        atravesando inspección y empaque, esterilización, control y liberación, y
        almacenamiento estéril. La trazabilidad ocupa el núcleo porque atraviesa las seis.
      </desc>

      {/* radios: base punteada + trazo que se ilumina del centro hacia afuera */}
      <g>
        {GEO.map((g, i) => {
          const activo = fijada === i + 1;
          return (
            <g key={`r${i}`}>
              <line
                x1={g.radio[0][0]} y1={g.radio[0][1]} x2={g.radio[1][0]} y2={g.radio[1][1]}
                stroke="var(--color-blue)" stroke-width="1" stroke-dasharray="2 5" opacity="0.4"
              />
              <line
                x1={g.radio[0][0]} y1={g.radio[0][1]} x2={g.radio[1][0]} y2={g.radio[1][1]}
                stroke="var(--color-signal)" stroke-width="1.5"
                stroke-dasharray={LARGO_RADIO}
                stroke-dashoffset={activo ? 0 : LARGO_RADIO}
                style={{ transition: trans ?? 'stroke-dashoffset 400ms cubic-bezier(.4,0,.2,1)' }}
              />
            </g>
          );
        })}
      </g>

      {/* cuñas de sentido: el giro es horario */}
      {CUNAS.map(([x, y, r], i) => (
        <polygon
          key={`c${i}`} points="-3.5,-4.5 -3.5,4.5 3.5,0"
          transform={`translate(${x},${y}) rotate(${r})`}
          fill="var(--color-blue)" opacity="0.45"
        />
      ))}

      {/* arcos */}
      <g role="group" aria-label="Estaciones del ciclo de esterilización">
        {GEO.map((g, i) => {
          const n = i + 1;
          const est = estaciones[i]!;
          const activo = fijada === n;
          const encima = previa === n && !activo;
          return (
            <path
              key={`a${i}`} id={`arco-${n}`} d={g.arco}
              class="cursor-pointer outline-offset-[3px] focus-visible:outline-2 focus-visible:outline-[var(--color-signal)]"
              fill="none" stroke-width="14"
              stroke={activo ? 'var(--color-signal)' : encima ? '#C4CFDC' : 'var(--color-mist)'}
              style={{ transition: trans ?? 'stroke 250ms ease 150ms' }}
              role="button"
              tabIndex={n === foco ? 0 : -1}
              aria-pressed={activo}
              aria-label={`Estación ${n} de 6: ${est.nombre}`}
              onClick={() => onFijar(n, 'clic')}
              onMouseEnter={() => onPrevia(n)}
              onMouseLeave={() => onPrevia(null)}
              onFocus={() => onPrevia(n)}
              onKeyDown={(e) => teclas(e as unknown as KeyboardEvent, n)}
            />
          );
        })}
      </g>

      {/* nodos, números y rótulos */}
      {GEO.map((g, i) => {
        const n = i + 1;
        const est = estaciones[i]!;
        const activo = fijada === n;
        return (
          <g key={`n${i}`} class="pointer-events-none">
            <circle
              cx={g.nodo[0]} cy={g.nodo[1]} r="17"
              fill={activo ? 'var(--color-navy)' : '#fff'}
              stroke="var(--color-navy)" stroke-width="1.5"
              style={{ transition: trans ?? 'fill 250ms ease' }}
            />
            <text
              x={g.nodo[0]} y={g.nodo[1]} text-anchor="middle" dominant-baseline="central"
              font-family="var(--font-mono)" font-size="12" font-weight="600"
              fill={activo ? '#fff' : 'var(--color-navy)'}
            >{String(n).padStart(2, '0')}</text>
            <text
              x={g.rotulo[0]} y={g.rotulo[1]} text-anchor="middle" dominant-baseline="central"
              font-family="var(--font-mono)" font-size="10.5" letter-spacing=".11em"
              font-weight={activo ? 600 : 400}
              fill={activo ? 'var(--color-navy)' : 'var(--color-steel)'}
            >{est.rotulo}</text>
          </g>
        );
      })}

      {/* núcleo: la trazabilidad cose las seis estaciones */}
      <a href="/trazabilidad" aria-label="Trazabilidad: el hilo que cose las seis estaciones">
        <circle
          cx={CENTRO} cy={CENTRO} r={R_NUCLEO} class="cursor-pointer"
          fill="#fff" stroke="var(--color-signal)" stroke-width="1.5" stroke-dasharray="4 4"
        />
        <text x={CENTRO} y="240" text-anchor="middle" font-family="var(--font-mono)"
              font-size="8.5" letter-spacing=".12em" fill="var(--color-steel)">HILO CONDUCTOR</text>
        <text x={CENTRO} y="264" text-anchor="middle" font-family="var(--font-display)"
              font-size="15" font-weight="700" fill="var(--color-navy)"
              style={{ fontVariationSettings: "'wdth' 112" }}>TRAZABILIDAD</text>
        <text x={CENTRO} y="288" text-anchor="middle" font-family="var(--font-mono)"
              font-size="8.5" letter-spacing=".12em" fill="var(--color-steel)">ETIQUETA · LECTURA</text>
      </a>
    </svg>
  );
}
