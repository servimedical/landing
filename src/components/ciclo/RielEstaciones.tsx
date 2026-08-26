import { useEffect, useRef } from 'preact/hooks';
import type { ItemEstacion, Estacion } from '../../content/ciclo';

type Props = {
  estaciones: Estacion[];
  activa: number;
  onActiva: (n: number) => void;
  onItem: (item: ItemEstacion, estacion: Estacion) => void;
  /** Número que pide enfocar el riel desde fuera (enlace profundo). */
  pedido: number | null;
};

/* En 380 px una interacción radial es inutilizable: arcos de 20 px y rótulos
   ilegibles. La rueda no se encoge, se transforma en un riel con snap: se
   conserva la secuencia —que es lo que comunica el concepto— y se sacrifica
   la circularidad, que es lo decorativo. */
export default function RielEstaciones({ estaciones, activa, onActiva, onItem, pedido }: Props) {
  const riel = useRef<HTMLDivElement>(null);
  /* Mientras se centra una tarjeta por programa, el observador calla: si no,
     los estados intermedios del desplazamiento pisan el enlace profundo. */
  const centrando = useRef(false);

  /* Se mueve sólo el riel, nunca el documento: `scrollIntoView` sobre una
     tarjeta cancela el desplazamiento vertical que el enlace profundo acaba
     de iniciar hacia la sección. */
  const centrar = (n: number, reintento = true) => {
    const pista = riel.current;
    const destino = pista?.querySelector<HTMLElement>(`[data-n="${n}"]`);
    if (!pista || !destino) return;
    centrando.current = true;
    /* Con rectángulos y no con offsetLeft: el offsetParent de la tarjeta no
       es el riel, y el cálculo salía desplazado. */
    const rp = pista.getBoundingClientRect();
    const rd = destino.getBoundingClientRect();
    pista.scrollTo({
      left: pista.scrollLeft + (rd.left - rp.left) - (pista.clientWidth - rd.width) / 2,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    const soltar = () => { centrando.current = false; };
    if ('onscrollend' in window) pista.addEventListener('scrollend', soltar, { once: true });
    setTimeout(soltar, 1200);

    /* Al llegar por enlace profundo, este centrado compite con el
       desplazamiento vertical hacia la sección y a veces no llega. Se
       comprueba una vez y, si la tarjeta no quedó centrada, se remata. */
    if (reintento) {
      setTimeout(() => {
        const p = pista.getBoundingClientRect();
        const d = destino.getBoundingClientRect();
        if (Math.abs((d.left + d.width / 2) - (p.left + p.width / 2)) > 24) centrar(n, false);
      }, 900);
    }
  };

  // La tarjeta centrada manda sobre el estado
  useEffect(() => {
    const nodo = riel.current;
    if (!nodo) return;
    const io = new IntersectionObserver(
      (es) => {
        if (centrando.current) return;
        const visible = es.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) onActiva(Number((visible.target as HTMLElement).dataset.n));
      },
      { root: nodo, threshold: 0.6 }
    );
    nodo.querySelectorAll('[data-n]').forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [onActiva]);

  // Enlace profundo: centra la tarjeta pedida
  useEffect(() => { if (pedido) centrar(pedido); }, [pedido]);

  const irA = (n: number) => centrar(n);

  return (
    <div>
      <div
        ref={riel}
class="ciclo-riel"
      >
        {estaciones.map((e) => (
          <article
            key={e.slug} data-n={e.numero}
            class="ciclo-tarjeta"
          >
            <p class="meta text-steel">
              <span class="font-display text-[26px] leading-none font-bold text-navy align-baseline">
                {String(e.numero).padStart(2, '0')}
              </span>
              <span class="ml-2.5">/ 06</span>
            </p>
            <h3 class="mt-3 text-[23px]">{e.nombre}</h3>
            <p class="mt-3 text-[15px] text-steel">{e.descripcion}</p>

            <div class="ciclo-bloque-dolor">
              <p class="flex items-start gap-2.5">
                <span aria-hidden="true" class="senal mt-2"></span>
                <span class="text-[15px] font-medium">{e.dolor}</span>
              </p>
            </div>

            <ul class="mt-5 border-t border-rule">
              {e.items.map((item) => (
                <li key={item.url + item.nombre} class="border-b border-rule">
                  <a
                    href={item.url}
                    onClick={() => onItem(item, e)}
                    class="flex items-baseline justify-between gap-3 py-3"
                  >
                    <span class="text-[15px]">{item.nombre}</span>
                    <span class="meta shrink-0 text-[10px] text-steel">{item.categoria}</span>
                  </a>
                </li>
              ))}
            </ul>

            <p class="mt-4 flex items-start gap-2.5 text-[14px] text-steel">
              <span aria-hidden="true" class="senal mt-1.5"></span>
              <a href="/trazabilidad" class="underline decoration-rule underline-offset-4">{e.trazabilidad}</a>
            </p>
          </article>
        ))}
      </div>

      {/* línea de progreso: seis segmentos, el activo en señal */}
      <div class="mt-5 flex gap-1.5" role="tablist" aria-label="Estaciones del ciclo">
        {estaciones.map((e) => (
          <button
            key={e.slug} type="button" role="tab"
            aria-selected={activa === e.numero}
            aria-label={`Estación ${e.numero}: ${e.nombre}`}
            onClick={() => irA(e.numero)}
            class="h-1.5 flex-1 transition-colors"
            style={{ background: activa === e.numero ? 'var(--color-signal)' : 'var(--color-mist)' }}
          />
        ))}
      </div>
    </div>
  );
}
