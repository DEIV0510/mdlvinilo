import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FichaCompra } from "@/components/catalogo/FichaCompra";
import { Foto } from "@/components/catalogo/Foto";
import { RejillaProductos } from "@/components/catalogo/RejillaProductos";
import { categoriaPorId } from "@/content/categorias";
import { sitio } from "@/config/sitio";
import type { Producto } from "@/content/tipos";
import { getProducto, getProductos, getProductosPorCategoria } from "@/lib/datos";
import { etiquetasDisponibilidad, formatoPrecio } from "@/lib/formato";
import { canonica } from "@/lib/seo";
import pagina from "../../pagina.module.css";
import s from "./producto.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProductos().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProducto((await params).slug);
  if (!p) return {};
  const descripcion = p.descripcion ?? `${p.nombre} — colección de MDL Vinilo Colombia. Consulta disponibilidad y precio.`;
  return {
    title: p.nombre,
    description: descripcion,
    alternates: canonica(`/producto/${p.slug}`),
    robots: p.demo ? { index: false, follow: false } : undefined,
  };
}

/**
 * Datos estructurados de producto, solo con información confirmada. Google
 * exige una oferta (precio y disponibilidad) para el resultado enriquecido:
 * sin ella no se emite nada.
 */
function jsonLd(p: Producto): string | null {
  if (!(typeof p.precio === "number" && p.precio > 0 && p.disponibilidad)) return null;
  const base = sitio.dominio.replace(/\/$/, "");
  const datos: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nombre,
    brand: { "@type": "Brand", name: sitio.marca },
    offers: {
      "@type": "Offer",
      price: p.precio,
      priceCurrency: "COP",
      availability: {
        disponible: "https://schema.org/InStock",
        agotado: "https://schema.org/OutOfStock",
        "por-encargo": "https://schema.org/PreOrder",
      }[p.disponibilidad],
      ...(base ? { url: `${base}/producto/${p.slug}` } : {}),
    },
  };
  if (p.descripcion) datos.description = p.descripcion;
  if (base) datos.url = `${base}/producto/${p.slug}`;
  const imagenes = p.imagenes
    .map((i) => (/^https?:\/\//.test(i.src) ? i.src : base ? `${base}${i.src}` : ""))
    .filter(Boolean);
  if (imagenes.length) datos.image = imagenes;
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}

export default async function ProductoPagina({ params }: Props) {
  const p = getProducto((await params).slug);
  if (!p) notFound();
  const categoria = categoriaPorId(p.categoria);
  const relacionados = getProductosPorCategoria(p.categoria)
    .filter((x) => x.slug !== p.slug)
    .slice(0, 3);
  const imagenes = p.imagenes.length ? p.imagenes : [undefined];
  const ld = p.demo ? null : jsonLd(p);

  return (
    <>
      {ld ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} /> : null}
      <div className={`contenedor ${pagina.pagina}`}>
        <nav aria-label="Ruta de navegación" className={pagina.migas}>
          <ol>
            <li>
              <Link href="/coleccion">Colección</Link>
            </li>
            {categoria ? (
              <li>
                <Link href={`/coleccion/${categoria.id}`}>{categoria.nombre}</Link>
              </li>
            ) : null}
            <li aria-current="page">{p.nombre}</li>
          </ol>
        </nav>

        <div className={s.producto}>
          <div className={s.galeria}>
            {imagenes.map((img, i) => (
              <div key={img?.src ?? "lamina"} className={s.foto}>
                <Foto
                  imagen={img}
                  nombre={p.nombre}
                  sizes="(max-width: 900px) 92vw, 55vw"
                  preload={i === 0}
                />
              </div>
            ))}
          </div>

          <div className={s.info}>
            <div className={s.marcas}>
              {p.demo ? <span className="insignia-demo">Producto de ejemplo</span> : null}
              {p.etiqueta ? <span className="rotulo rotulo--oro">{p.etiqueta}</span> : null}
            </div>
            <h1 className={`display ${s.nombre}`}>{p.nombre}</h1>
            <p className={s.precio}>
              {formatoPrecio(p.precio)}
              {p.disponibilidad ? (
                <span className={s.disponibilidad}>{etiquetasDisponibilidad[p.disponibilidad]}</span>
              ) : null}
            </p>
            {p.descripcion ? <p className={s.descripcion}>{p.descripcion}</p> : null}

            <FichaCompra producto={p} />

            <ul className={s.notas} role="list">
              <li>La consulta no es una compra: el equipo confirma disponibilidad, precio y entrega.</li>
              <li>Tu selección se guarda solo en este dispositivo.</li>
              <li>
                Consulta los <Link href="/legal/terminos">términos y condiciones</Link> antes de comprar.
              </li>
            </ul>
          </div>
        </div>

        {relacionados.length ? (
          <section className={pagina.seccionExtra} aria-labelledby="relacionados">
            <h2 id="relacionados" className={`display ${s.relacionadosTitulo}`}>
              También en <em>{categoria?.nombre ?? "la colección"}</em>
            </h2>
            <RejillaProductos productos={relacionados} />
          </section>
        ) : null}
      </div>
    </>
  );
}
