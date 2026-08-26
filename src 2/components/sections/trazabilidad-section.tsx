"use client";

import { useMemo } from "react";
import { SectionHead } from "@/components/ui";
import {
  labelFields,
  traceEvents,
  traceKit,
} from "@/lib/data/content";
import {
  generateBarcodeWidths,
  generateDataMatrix,
  useTraceLabelLink,
} from "@/lib/hooks/use-interactions";

export function TrazabilidadSection() {
  useTraceLabelLink();

  const barcodeWidths = useMemo(() => generateBarcodeWidths(), []);
  const dataMatrix = useMemo(() => generateDataMatrix(), []);

  return (
    <section id="trazabilidad">
      <div className="wrap">
        <SectionHead
          eyebrow="Línea nueva"
          title="Cada paquete cuenta dónde estuvo."
          description="Si un ciclo sale no conforme, la pregunta del comité de infecciones es una sola: qué paquetes salieron de ahí y a qué pacientes llegaron. Con trazabilidad se responde en un minuto; sin ella, se recoge todo el inventario."
        />

        <div className="trace">
          <div>
            <div className="label" aria-label="Etiqueta de paquete estéril">
              <div className="label-top">
                <span className="inst">CENTRAL DE ESTERILIZACIÓN</span>
                <span className="mono" style={{ fontSize: "9px" }}>
                  CEyE-01
                </span>
              </div>
              <p className="label-item">
                Set laparoscopia
                <br />
                básico
              </p>
              <div className="fields">
                {labelFields.map((field) => (
                  <div key={field.key} className="f" data-k={field.key}>
                    <p className="k">{field.label}</p>
                    <p className="v">{field.value}</p>
                  </div>
                ))}
              </div>
              <div className="codes">
                <div className="barcode">
                  {barcodeWidths.map((width, index) => (
                    <i key={index} style={{ width: `${width}px` }} />
                  ))}
                </div>
                <div className="dm">
                  {dataMatrix.map((on, index) => (
                    <i
                      key={index}
                      style={{ background: on ? undefined : "transparent" }}
                    />
                  ))}
                </div>
              </div>
              <div className="label-foot">
                <span>SVMG · TRAZABILIDAD</span>
                <span>250825A3-0412</span>
              </div>
            </div>
            <p className="trace-caption">
              La etiqueta se imprime al cerrar el empaque y no se despega hasta
              que el paquete se abre en sala. Todo lo que sigue se registra
              leyéndola.
            </p>
          </div>

          <div>
            <ul className="tl">
              {traceEvents.map((event) => (
                <li key={event.time} data-k={event.fieldKey}>
                  <span className="t">{event.time}</span>
                  <span className="e">
                    {event.title}
                    <small>{event.detail}</small>
                  </span>
                  <span className="w">{event.station}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="trace-kit">
          {traceKit.map((item) => (
            <div key={item.n}>
              <p className="n">{item.n}</p>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
