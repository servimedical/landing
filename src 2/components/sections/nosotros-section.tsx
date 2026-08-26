import { Tag } from "@/components/ui";
import { aboutStats, aboutTags } from "@/lib/data/content";

export function NosotrosSection() {
  return (
    <section id="nosotros">
      <div className="wrap about">
        <div>
          <p className="mono eyebrow">Nosotros</p>
          <h2 style={{ fontSize: "clamp(30px,4vw,50px)", marginTop: 18 }}>
            Una empresa colombiana de equipamiento hospitalario.
          </h2>
          <div className="who">
            {aboutTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div>
          <p style={{ color: "var(--steel)" }}>
            Servimedical Group SAS importa y comercializa equipamiento
            hospitalario en Colombia, con especialidad en esterilización.
            Representamos marcas internacionales, sostenemos su servicio técnico
            en el país y acompañamos a la institución desde el estudio previo
            hasta la operación diaria de la central.
          </p>
          <p style={{ color: "var(--steel)", marginTop: 16 }}>
            No vendemos un equipo y desaparecemos: la mayoría de nuestros
            clientes vuelve por el consumible, el repuesto y el mantenimiento
            del mismo equipo que instalamos.
          </p>
          <div className="figs">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="fig">
                <p className="v">{stat.value}</p>
                <p className="k mono">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
