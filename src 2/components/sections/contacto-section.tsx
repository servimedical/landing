import { Button } from "@/components/ui";
import { siteConfig } from "@/lib/constants";

export function ContactoSection() {
  return (
    <section id="contacto">
      <div className="wrap contact">
        <div>
          <p className="mono eyebrow">Contacto</p>
          <h2 style={{ fontSize: "clamp(30px,4vw,50px)", marginTop: 18 }}>
            Cuéntenos qué necesita esterilizar.
          </h2>
          <p className="lede2">
            Con el tipo de material, el volumen por turno y el espacio
            disponible le proponemos el equipo y le enviamos cotización.
          </p>
          <Button
            href={siteConfig.contact.whatsappHref}
            variant="light"
            className=""
            external
          >
            Escribir por WhatsApp
          </Button>
        </div>
        <div className="cdata">
          <a href={siteConfig.contact.phoneHref}>
            <span className="k mono">Fijo</span>
            <span className="v">{siteConfig.contact.phone}</span>
          </a>
          <a href={siteConfig.contact.whatsappHref}>
            <span className="k mono">WhatsApp</span>
            <span className="v">{siteConfig.contact.whatsapp}</span>
          </a>
          <a href={`mailto:${siteConfig.contact.commercial}`}>
            <span className="k mono">Comercial</span>
            <span className="v">{siteConfig.contact.commercial}</span>
          </a>
          <a href={`mailto:${siteConfig.contact.general}`}>
            <span className="k mono">General</span>
            <span className="v">{siteConfig.contact.general}</span>
          </a>
          <div>
            <span className="k mono">Sede</span>
            <span className="v">{siteConfig.location.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
