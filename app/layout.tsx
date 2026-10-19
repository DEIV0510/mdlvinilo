import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import { sitio } from "@/config/sitio";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--f-bodoni",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--f-archivo",
});

const descripcion =
  "MDL Vinilo Colombia: lencería, trajes y colecciones de temporada, producción audiovisual y promoción comercial desde Floridablanca, Santander. Sitio para mayores de 18 años.";

export const metadata: Metadata = {
  ...(sitio.dominio ? { metadataBase: new URL(sitio.dominio) } : {}),
  title: {
    default: "MDL Vinilo Colombia — Moda, imagen y producción audiovisual",
    template: "%s · MDL Vinilo Colombia",
  },
  description: descripcion,
  applicationName: sitio.marca,
  keywords: [
    "MDL Vinilo Colombia",
    "mdlvinilocol",
    "lencería Floridablanca",
    "lencería Santander",
    "producción audiovisual Floridablanca",
    "marketing y contenido Santander",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: sitio.marca,
    title: "MDL Vinilo Colombia — El universo Vinilo",
    description: descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: "MDL Vinilo Colombia — El universo Vinilo",
    description: descripcion,
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Sin <meta name="rating" content="adult">: el sitio no contiene material explícito y
  // Google recomienda marcar solo páginas explícitas (si no, filtra todo el dominio).
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Se ejecuta antes del primer pintado: activa las mejoras con JavaScript y,
 * como red de seguridad, las retira si la aplicación no llega a hidratarse.
 */
const scriptInicial = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.classList.contains('revelar-listo')){d.classList.remove('js');d.classList.add('intro-fin');}},4500);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-CO"
      className={`${bodoni.variable} ${archivo.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptInicial }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
