import type { MetadataRoute } from "next";
import { sitio } from "@/config/sitio";
import { categorias } from "@/content/categorias";
import { documento as cookies } from "@/content/legal/cookies";
import { documento as privacidad } from "@/content/legal/privacidad";
import { documento as terminos } from "@/content/legal/terminos";
import { getProductos, getProductosPorCategoria, getTalento } from "@/lib/datos";

export const revalidate = 3600;

/**
 * Mapa del sitio. Requiere dominio definitivo (NEXT_PUBLIC_SITE_URL): sin él
 * no se publican URLs absolutas incorrectas. Solo incluye páginas con
 * contenido real (sin listados vacíos ni borradores legales) y solo indica
 * fechas de modificación cuando son reales.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = sitio.dominio.replace(/\/$/, "");
  if (!base) return [];

  const productos = getProductos().filter((p) => !p.demo);
  const talento = getTalento().filter((p) => !p.demo);

  const rutas: { url: string; prioridad: number; fecha?: string }[] = [
    { url: "/", prioridad: 1 },
    ...(productos.length ? [{ url: "/coleccion", prioridad: 0.9 }] : []),
    ...categorias
      .filter((c) => getProductosPorCategoria(c.id).some((p) => !p.demo))
      .map((c) => ({ url: `/coleccion/${c.id}`, prioridad: 0.7 })),
    ...productos.map((p) => ({ url: `/producto/${p.slug}`, prioridad: 0.8 })),
    ...(talento.length ? [{ url: "/talento", prioridad: 0.6 }] : []),
    ...talento.map((p) => ({ url: `/talento/${p.slug}`, prioridad: 0.5 })),
    ...[privacidad, terminos, cookies]
      .filter((d) => d.estado === "revisado")
      .map((d) => ({ url: `/legal/${d.slug}`, prioridad: 0.2, fecha: d.actualizado })),
  ];

  return rutas.map((r) => ({
    url: `${base}${r.url}`,
    ...(r.fecha ? { lastModified: r.fecha } : {}),
    priority: r.prioridad,
  }));
}
