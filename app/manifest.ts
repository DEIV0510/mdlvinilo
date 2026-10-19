import type { MetadataRoute } from "next";
import { sitio } from "@/config/sitio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: sitio.marca,
    short_name: sitio.marcaCorta,
    description: "Moda, imagen y producción audiovisual con identidad propia.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "es-CO",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
