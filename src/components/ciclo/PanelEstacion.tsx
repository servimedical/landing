import type { Estacion, ItemEstacion, Reposo } from '../../content/ciclo';

type Props = {
  estacion: Estacion | null;
  reposo: Reposo;
  visible: boolean;
  onItem?: (item: ItemEstacion, estacion: Estacion) => void;
};

/** Fila de ítem: enlace de ancho completo. Nombre a la izquierda, categoría
 *  en mono a la derecha. La flecha aparece al pasar el cursor. */
function Fila({ item, onClick }: { item: ItemEstacion; onClick?: () => void }) {
  return (
    <li class="border-b border-rule">
      <a
        href={item.url}
        onClick={onClick}
        class="ciclo-fila"
      >
        <span class="text-[15.5px]">{item.nombre}</span>
        <span class="flex shrink-0 items-baseline gap-2">
          <span class="meta text-[10.5px] text-steel">{item.categoria}</span>
          <span aria-hidden="true" class="ciclo-flecha">→</span>
        </span>
      </a>
    </li>
  );
}

export default function PanelEstacion({ estacion, reposo, visible, onItem }: Props) {
  /* Todos los paneles ocupan la misma celda de la rejilla: el contenedor mide
     siempre lo que el más alto y la página no salta al cambiar. CLS = 0. */
  const base = 'ciclo-panel';
  const estado = visible ? 'opacity-100' : 'invisible opacity-0';

  if (!estacion) {
    return (
      <div class={`${base} ${estado}`} aria-hidden={!visible}>
        <p class="meta text-steel">El ciclo completo</p>
        <h3 class="mt-3 text-[clamp(23px,2.6vw,33px)]">{reposo.titulo}</h3>
        <p class="mt-4 max-w-[46ch] text-steel">{reposo.descripcion}</p>
        <p class="mt-6 flex items-start gap-2.5 text-[15px] text-steel">
          <span aria-hidden="true" class="senal mt-2"></span>
          <span>{reposo.nucleo}</span>
        </p>
        <p class="meta mt-8 border-t border-rule pt-4 text-[10.5px] text-steel">
          Toque una estación para ver qué la sostiene
        </p>
      </div>
    );
  }

  const n = String(estacion.numero).padStart(2, '0');

  return (
    <div class={`${base} ${estado}`} aria-hidden={!visible}>
      <p class="meta text-steel">Estación {n} / 06</p>
      <h3 class="mt-3 text-[clamp(23px,2.6vw,33px)]">{estacion.nombre}</h3>
      <p class="mt-4 max-w-[46ch] text-steel">{estacion.descripcion}</p>

      <div class="ciclo-bloque-dolor mt-6">
        <p class="flex items-start gap-2.5">
          <span aria-hidden="true" class="senal mt-2"></span>
          <span class="max-w-[44ch] text-[15.5px] font-medium">{estacion.dolor}</span>
        </p>
      </div>

      <ul class="mt-6 border-t border-rule">
        {estacion.items.map((item) => (
          <Fila key={item.url + item.nombre} item={item} onClick={() => onItem?.(item, estacion)} />
        ))}
      </ul>

      <p class="mt-5 flex items-start gap-2.5 text-[14.5px] text-steel">
        <span aria-hidden="true" class="senal mt-1.5"></span>
        <a href="/trazabilidad" class="max-w-[46ch] underline decoration-rule underline-offset-4 hover:text-navy">
          {estacion.trazabilidad}
        </a>
      </p>
    </div>
  );
}
