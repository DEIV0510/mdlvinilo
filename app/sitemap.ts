import type { MetadataRoute } from "next";
import { sitio } from "@/config/sitio";
import { categorias } from "@/content/categorias";
import { getProductos, getTalento } from "@/lib/datos";

export const revalidate = 3600;

/**
 * Mapa del sitio. Requiere dominio definitivo (NEXT_PUBLIC_SITE_URL):
 * sin él no se publican URLs absolutas incorrectas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = sitio.dominio.replace(/\/$/, "");
  if (!base) return [];
  const ahora = new Date();
  const rutas = [
    { url: "/", prioridad: 1 },
    { url: "/coleccion", prioridad: 0.9 },
    ...categorias.map((c) => ({ url: `/coleccion/${c.id}`, prioridad: 0.7 })),
    ...getProductos()
      .filter((p) => !p.demo)
      .map((p) => ({ url: `/producto/${p.slug}`, prioridad: 0.8 })),
    { url: "/talento", prioridad: 0.6 },
    ...getTalento()
      .filter((p) => !p.demo)
      .map((p) => ({ url: `/talento/${p.slug}`, prioridad: 0.5 })),
    { url: "/legal/privacidad", prioridad: 0.2 },
    { url: "/legal/terminos", prioridad: 0.2 },
    { url: "/legal/cookies", prioridad: 0.2 },
  ];
  return rutas.map((r) => ({
    url: `${base}${r.url}`,
    lastModified: ahora,
    changeFrequency: "weekly" as const,
    priority: r.prioridad,
  }));
}
