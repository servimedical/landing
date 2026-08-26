import { SectionHead, Tag } from "@/components/ui";
import { productos } from "@/lib/data/content";

export function ProductosSection() {
  return (
    <section id="productos">
      <div className="wrap">
        <SectionHead
          eyebrow="Línea 1 · Productos"
          title="Todo lo que una central consume."
          description="Cinco categorías, un solo proveedor: importación directa, existencias en Bogotá y despacho a todo el país."
        />
        <div className="cards">
          {productos.map((product) => (
            <article
              key={product.id}
              className={`card${product.wide ? " wide" : ""}`}
            >
              <p className="mono idx">{product.id}</p>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="tags">
                {product.tags.map((tag) => (
                  <Tag key={tag} highlight={product.highlightTags}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
