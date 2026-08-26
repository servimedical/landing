import { useCallback, useEffect, useState } from 'preact/hooks';
import type { Estacion, ItemEstacion, Reposo } from '../../content/ciclo';
import RuedaSVG from './RuedaSVG';
import RielEstaciones from './RielEstaciones';
import PanelEstacion from './PanelEstacion';

type Origen = 'clic' | 'teclado' | 'deep-link' | 'riel';

/* Instrumentación: cada interacción con la rueda es una declaración de
   intención. Se emite sin acoplarse a ningún proveedor — quien escuche
   (GTM, Plausible, un listener propio) decide qué hacer. */
function emitir(nombre: string, detalle: Record<string, unknown>) {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(new CustomEvent(`svmg:${nombre}`, { detail: detalle }));
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer?.push({ event: `svmg.${nombre}`, ...detalle });
}

/* El contenido llega como props desde Astro y no se importa aquí: así el
   texto de las seis estaciones viaja en el HTML —donde ya está, y gzip lo
   deduplica— en vez de duplicarse dentro del paquete de JavaScript. */
type Props = { estaciones: Estacion[]; reposo: Reposo };

export default function CicloIsla({ estaciones, reposo }: Props) {
  /** Lee `#/ciclo/03` o `#/ciclo/esterilizacion`. Un valor inválido es null. */
  const leerHash = (): number | null => {
    const m = /^#\/ciclo\/([\w-]+)$/.exec(location.hash);
    if (!m) return null;
    const clave = m[1]!;
    const n = Number(clave);
    if (Number.isInteger(n) && n >= 1 && n <= 6) return n;
    return estaciones.find((e) => e.slug === clave)?.numero ?? null;
  };

  const [fijada, setFijada] = useState<number | null>(null);
  const [previa, setPrevia] = useState<number | null>(null);
  const [pedido, setPedido] = useState<number | null>(null);
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setReducido(mq.matches);
    const f = () => setReducido(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);

  const fijar = useCallback((n: number | null, origen: Origen) => {
    setFijada(n);
    if (!n) return;
    const est = estaciones[n - 1]!;
    /* replaceState y no pushState: fijar estaciones no debe llenar el
       historial del navegador de entradas intermedias. */
    const hash = `#/ciclo/${String(n).padStart(2, '0')}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
    emitir('ciclo-estacion', { numero: n, slug: est.slug, origen });
  }, []);

  /* Enlace profundo. El desplazamiento de la carga inicial lo hace un script
     de página (ver Rueda.astro): la isla no ha hidratado todavía en ese
     momento. Aquí sólo se fija la estación, y se desplaza en los cambios de
     hash posteriores, cuando la isla ya está viva. */
  useEffect(() => {
    const aplicar = (desplazar: boolean) => {
      const n = leerHash();
      if (!n) return;
      setFijada(n);
      setPedido(n);
      emitir('ciclo-estacion', { numero: n, slug: estaciones[n - 1]!.slug, origen: 'deep-link' });
      if (desplazar) {
        document.getElementById('ciclo')?.scrollIntoView({
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    };
    aplicar(false);
    const f = () => aplicar(true);
    addEventListener('hashchange', f);
    return () => removeEventListener('hashchange', f);
  }, [estaciones]);

  const alItem = useCallback((item: ItemEstacion, est: Estacion) => {
    emitir('ciclo-item', {
      nombre: item.nombre, url: item.url,
      categoria: item.categoria, estacion: est.numero,
    });
  }, []);

  const desdeRiel = useCallback((n: number) => {
    setFijada((actual) => {
      if (actual === n) return actual;
      const hash = `#/ciclo/${String(n).padStart(2, '0')}`;
      if (location.hash !== hash) history.replaceState(null, '', hash);
      emitir('ciclo-estacion', { numero: n, slug: estaciones[n - 1]!.slug, origen: 'riel' });
      return n;
    });
  }, [estaciones]);

  /* El hover previsualiza sin fijar: exploración barata. */
  const mostrada = previa ?? fijada;
  const est = mostrada ? estaciones[mostrada - 1]! : null;

  return (
    <>
      {/* ESCRITORIO ≥1000 px */}
      <div class="hidden items-center gap-[clamp(28px,4.5vw,64px)] lg:grid lg:grid-cols-[1.05fr_.95fr]">
        <RuedaSVG
          estaciones={estaciones}
          fijada={fijada} previa={previa} reducido={reducido}
          onFijar={(n, o) => fijar(n, o)} onPrevia={setPrevia}
        />

        <div class="border-l-2 border-signal pl-[clamp(20px,2.5vw,30px)]">
          <div class="grid" aria-live="polite">
            <PanelEstacion estacion={null} reposo={reposo} visible={est === null} />
            {estaciones.map((e) => (
              <PanelEstacion
                key={e.slug} estacion={e} reposo={reposo}
                visible={est?.numero === e.numero} onItem={alItem}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MÓVIL <1000 px */}
      <div class="lg:hidden">
        <RielEstaciones
          estaciones={estaciones} activa={fijada ?? 1}
          onActiva={desdeRiel} onItem={alItem} pedido={pedido}
        />
      </div>
    </>
  );
}
