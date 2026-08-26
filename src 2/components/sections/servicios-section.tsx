import { SectionHead } from "@/components/ui";
import { servicios } from "@/lib/data/content";

export function ServiciosSection() {
  return (
    <section id="servicios">
      <div className="wrap">
        <SectionHead
          eyebrow="Línea 2 · Servicios"
          title="Antes de comprar el equipo y mucho después."
          description="El equipo es una parte del problema. El resto es cómo se diseña la central y quién responde cuando el ciclo falla un martes a las 6 a. m."
        />
        <div className="svc">
          {servicios.map((service) => (
            <div key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
