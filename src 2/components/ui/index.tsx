import Link from "next/link";
import { siteConfig } from "@/lib/constants";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
  external?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: ButtonProps) {
  const classes = ["btn", variant !== "primary" ? variant : "", className]
    .filter(Boolean)
    .join(" ");

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a className={classes} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        <span className="dot" />
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      <span className="dot" />
      {children}
    </Link>
  );
}

export function Logo({ suffix = "GROUP" }: { suffix?: string }) {
  return (
    <Link className="logo" href="#top">
      <span className="name">SERVIMEDICAL</span>
      <span className="sub">{suffix}</span>
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`sec-head reveal ${className}`.trim()}>
      <p className="mono eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function Tag({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return <span className={`tag${highlight ? " hi" : ""}`}>{children}</span>;
}

export function Header() {
  return (
    <header>
      <div className="wrap bar">
        <Logo />
        <nav>
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="#contacto">Solicitar cotización</Button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Logo suffix="GROUP SAS" />
            <p style={{ marginTop: 14, fontSize: "14.5px", maxWidth: "34ch" }}>
              Equipamiento hospitalario y esterilización. Bogotá, Colombia.
            </p>
          </div>
          <div>
            <h5>Productos</h5>
            <ul>
              <li><Link href="#productos">Equipos de esterilización</Link></li>
              <li><Link href="#trazabilidad">Trazabilidad</Link></li>
              <li><Link href="#productos">Accesorios</Link></li>
              <li><Link href="#productos">Consumibles</Link></li>
              <li><Link href="#productos">Repuestos</Link></li>
            </ul>
          </div>
          <div>
            <h5>Servicios</h5>
            <ul>
              <li><Link href="#servicios">Servicio técnico</Link></li>
              <li><Link href="#servicios">Diseño de centrales</Link></li>
              <li><Link href="#ciclo">El ciclo completo</Link></li>
            </ul>
          </div>
          <div>
            <h5>Contacto</h5>
            <ul>
              <li><a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a></li>
              <li><a href={siteConfig.contact.whatsappHref}>{siteConfig.contact.whatsapp}</a></li>
              <li><a href={`mailto:${siteConfig.contact.commercial}`}>{siteConfig.contact.commercial}</a></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span className="mono">© {new Date().getFullYear()} Servimedical Group SAS</span>
          <span className="mono">Bogotá · Colombia</span>
        </div>
      </div>
    </footer>
  );
}
