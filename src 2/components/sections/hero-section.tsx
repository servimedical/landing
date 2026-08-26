"use client";

import { Button } from "@/components/ui";
import {
  useCycleChartAnimation,
  useReducedMotion,
} from "@/lib/hooks/use-interactions";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const { pathRef, headRef, liveState, readout } =
    useCycleChartAnimation(reducedMotion);

  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="mono eyebrow">Central de esterilización · Colombia</p>
          <h1>
            El ciclo completo
            <em>con un solo responsable.</em>
          </h1>
          <p className="lede">
            Un paquete estéril pasa por seis estaciones antes de llegar al
            quirófano. Ponemos el equipo, el insumo, el repuesto y la
            trazabilidad de cada una — y respondemos cuando algo falla.
          </p>
          <div className="actions">
            <Button href="#contacto">Solicitar cotización</Button>
            <Button href="#ciclo" variant="ghost">
              Recorrer el ciclo
            </Button>
          </div>
          <div className="hero-meta mono">
            <span>Representantes Tuttnauer</span>
            <span>Bogotá · cobertura nacional</span>
            <span>Servicio técnico propio</span>
          </div>
        </div>

        <figure className="chart">
          <figcaption className="chart-head mono">
            <span>Ciclo 134 °C · instrumental empacado</span>
            <span className="live">
              <i />
              <span>{liveState}</span>
            </span>
          </figcaption>
          <svg
            viewBox="0 0 520 262"
            role="img"
            aria-label="Gráfica de un ciclo de esterilización por vapor: prevacío, exposición a 134 grados durante 4 minutos y secado."
          >
            <line className="grid-line" x1="46" y1="40" x2="510" y2="40" />
            <line className="grid-line" x1="46" y1="100" x2="510" y2="100" />
            <line className="grid-line" x1="46" y1="160" x2="510" y2="160" />
            <line className="grid-line" x1="46" y1="212" x2="510" y2="212" />
            <text className="axis-lbl" x="6" y="44">
              134 °C
            </text>
            <text className="axis-lbl" x="6" y="104">
              100 °C
            </text>
            <text className="axis-lbl" x="14" y="164">
              60 °C
            </text>
            <text className="axis-lbl" x="14" y="216">
              20 °C
            </text>
            <rect className="band" x="228" y="34" width="112" height="178" />
            <text className="phase" x="66" y="242">
              PREVACÍO
            </text>
            <text className="phase" x="236" y="242">
              EXPOSICIÓN 4:00
            </text>
            <text className="phase" x="382" y="242">
              SECADO
            </text>
            <path
              ref={pathRef}
              id="curve"
              className="curve"
              d="M46,212 L74,168 L92,196 L118,150 L136,182 L162,128 L182,160 L206,74 L228,40 L340,40 L360,96 L392,150 L440,182 L510,196"
            />
            <circle ref={headRef} id="head" r="4.5" fill="#26416B" cx="46" cy="212" />
          </svg>
          <div className="readout">
            <div>
              <p className="val">{readout.temp}</p>
              <p className="key mono">Temperatura</p>
            </div>
            <div>
              <p className="val">{readout.bar}</p>
              <p className="key mono">Presión cámara</p>
            </div>
            <div>
              <p className="val">{readout.time}</p>
              <p className="key mono">Tiempo de ciclo</p>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}
