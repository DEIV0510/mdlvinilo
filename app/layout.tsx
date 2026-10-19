import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces, Unbounded } from "next/font/google";
import { sitio } from "@/config/sitio";
import "./globals.css";

/** Titulares: grotesca ancha y redonda, en diálogo con las letras gruesas del logotipo. */
const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
  variable: "--f-unbounded",
});

/** Acentos y títulos editoriales: serif suave (eje SOFT), cálida, de portada de disco. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT"],
  display: "swap",
  variable: "--f-fraunces",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--f-archivo",
});

/** Dominio configurado o, en Vercel, el dominio de producción del proyecto. */
const urlBase =
  sitio.dominio ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");

const descripcion =
  "MDL Vinilo Colombia: lencería, trajes y colecciones de temporada, producción audiovisual y promoción comercial desde Floridablanca, Santander. Sitio para mayores de 18 años.";

export const metadata: Metadata = {
  ...(urlBase ? { metadataBase: new URL(urlBase) } : {}),
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
 * Se ejecuta antes del primer pintado y solo en cargas completas (nunca en
 * navegación interna):
 * - Activa las mejoras con JavaScript (html.js) y las retira si la app no
 *   llega a hidratarse (red de seguridad a los 4,5 s).
 * - Pantalla de carga: se muestra (html.intro-activa) solo si la página la
 *   tiene y no se vio en esta sesión; se retira en cuanto fuentes e imagen
 *   principal están listas, como máximo a los 2,2 s (respaldo CSS a los 3 s).
 */
const scriptInicial = `(function(){var d=document.documentElement;d.classList.add('js');
setTimeout(function(){if(!d.classList.contains('revelar-listo')&&document.querySelector('[data-revelar]')){d.classList.remove('js');d.classList.add('intro-fin');}},4500);
var visto=false;try{visto=sessionStorage.getItem('mdl-intro-vista')==='1';}catch(e){}
if(visto){d.classList.add('intro-fin');return;}
d.classList.add('intro-activa');
function quitar(){d.classList.remove('intro-activa');}
function fin(){if(d.classList.contains('intro-fin'))return;d.classList.add('intro-fin');if(window.performance&&performance.now()>2800){quitar();return;}setTimeout(quitar,900);}
var tope=setTimeout(fin,2200);
document.addEventListener('DOMContentLoaded',function(){
if(!document.getElementById('intro')){clearTimeout(tope);quitar();return;}
try{sessionStorage.setItem('mdl-intro-vista','1');}catch(e){}
var esperas=[];if(document.fonts&&document.fonts.ready)esperas.push(document.fonts.ready);
var img=document.querySelector('img[data-lcp]');
if(img&&!img.complete)esperas.push(new Promise(function(r){img.addEventListener('load',r,{once:true});img.addEventListener('error',r,{once:true});}));
Promise.all(esperas).then(function(){clearTimeout(tope);fin();},fin);},{once:true});
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-CO"
      className={`${unbounded.variable} ${fraunces.variable} ${archivo.variable}`}
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
