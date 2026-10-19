import type { MetadataRoute } from "next";
import { sitio } from "@/config/sitio";

export default function robots(): MetadataRoute.Robots {
  const base = sitio.dominio.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/acceso", "/salida"],
    },
    ...(base ? { sitemap: `${base}/sitemap.xml`, host: base } : {}),
  };
}
