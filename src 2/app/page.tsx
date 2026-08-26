import { PageEffects } from "@/components/page-effects";
import { BrandsSection } from "@/components/sections/brands-section";
import { CicloSection } from "@/components/sections/ciclo-section";
import { ContactoSection } from "@/components/sections/contacto-section";
import { HeroSection } from "@/components/sections/hero-section";
import { NosotrosSection } from "@/components/sections/nosotros-section";
import { ProductosSection } from "@/components/sections/productos-section";
import { ServiciosSection } from "@/components/sections/servicios-section";
import { TrazabilidadSection } from "@/components/sections/trazabilidad-section";
import { Footer, Header } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="top">
        <HeroSection />
        <BrandsSection />
        <CicloSection />
        <TrazabilidadSection />
        <ProductosSection />
        <ServiciosSection />
        <NosotrosSection />
        <ContactoSection />
      </main>
      <Footer />
    </>
  );
}
