import { siteConfig } from "@/lib/constants";

export function BrandsSection() {
  return (
    <div className="brands">
      <div className="wrap row">
        <span className="mono lbl">Marcas que representamos</span>
        {siteConfig.brands.map((brand) => (
          <span key={brand} className="b">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
