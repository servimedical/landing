"use client";

import { useCallback, useState } from "react";
import { SectionHead } from "@/components/ui";
import { cicloStations, wedgeTransforms } from "@/lib/data/ciclo";

export function CicloSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const station = cicloStations[activeIndex];

  const renderStation = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePointerOver = (event: React.PointerEvent<SVGSVGElement>) => {
    const target = (event.target as Element).closest("[data-i]");
    if (target) renderStation(Number((target as HTMLElement).dataset.i));
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = (event.target as Element).closest("[data-i]");
    if (target) renderStation(Number((target as HTMLElement).dataset.i));
  };

  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    const target = event.target as Element;
    const index = target.getAttribute("data-i");
    if ((event.key === "Enter" || event.key === " ") && index !== null) {
      event.preventDefault();
      renderStation(Number(index));
    }
  };

  const handleFocusIn = (event: React.FocusEvent<SVGSVGElement>) => {
    const index = (event.target as Element).getAttribute("data-i");
    if (index !== null) {
      renderStation(Number(index));
    }
  };

  return (
    <section id="ciclo">
      <div className="wrap">
        <SectionHead
          eyebrow="Cómo trabajamos"
          title="Seis estaciones y un hilo que las cose."
          description="El material sucio entra por un extremo y sale estéril por el otro. Cada etapa necesita un equipo, un insumo y un repuesto detrás; y todas necesitan la misma etiqueta encima para poder demostrar lo que pasó. Toque una estación."
        />

        <div className="ring-grid">
          <svg
            className="ring"
            viewBox="0 0 520 520"
            role="group"
            aria-label="Ciclo de esterilización con seis estaciones"
            onPointerOver={handlePointerOver}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onFocus={handleFocusIn}
          >
            <circle className="core" cx="260" cy="260" r="86" />
            <g id="spokes">
              {cicloStations.map((item, index) => (
                <line
                  key={`spoke-${item.label}`}
                  x1={item.geo.sp[0][0]}
                  y1={item.geo.sp[0][1]}
                  x2={item.geo.sp[1][0]}
                  y2={item.geo.sp[1][1]}
                  className={`spoke${index === activeIndex ? " on" : ""}`}
                />
              ))}
            </g>
            <g id="segs">
              {cicloStations.map((item, index) => (
                <path
                  key={`seg-${item.label}`}
                  d={item.geo.arc}
                  className={`seg${index === activeIndex ? " on" : ""}`}
                  data-i={index}
                  tabIndex={0}
                  role="button"
                  aria-label={`Estación ${index + 1}: ${item.name}`}
                />
              ))}
            </g>
            <g id="nodes">
              {cicloStations.map((item, index) => (
                <g key={`node-${item.label}`}>
                  <circle
                    cx={item.geo.node[0]}
                    cy={item.geo.node[1]}
                    r={17}
                    className={`node${index === activeIndex ? " on" : ""}`}
                    data-i={index}
                    style={{ cursor: "pointer" }}
                  />
                  <text
                    x={item.geo.node[0]}
                    y={item.geo.node[1]}
                    className={`node-n${index === activeIndex ? " on" : ""}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </text>
                  <text
                    x={item.geo.txt[0]}
                    y={item.geo.txt[1]}
                    className={`st-lbl${index === activeIndex ? " on" : ""}`}
                  >
                    {item.label}
                  </text>
                </g>
              ))}
            </g>
            {wedgeTransforms.map((transform) => (
              <polygon
                key={transform}
                className="wedge"
                points="-3.5,-4.5 -3.5,4.5 3.5,0"
                transform={transform}
              />
            ))}
            <text className="core-s" x="260" y="240">
              HILO CONDUCTOR
            </text>
            <text className="core-t" x="260" y="264">
              TRAZABILIDAD
            </text>
            <text className="core-s" x="260" y="288">
              ETIQUETA · LECTURA
            </text>
          </svg>

          <div className="ring-panel">
            <p className="mono step">
              ESTACIÓN {String(activeIndex + 1).padStart(2, "0")} / 06
            </p>
            <h3>{station.name}</h3>
            <p className="desc">{station.description}</p>
            <ul className="covers">
              {station.covers.map(([label, category]) => (
                <li key={label}>
                  <b>{label}</b>
                  <span>{category}</span>
                </li>
              ))}
            </ul>
            <p className="ring-note">
              <i />
              <span>{station.trace}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
