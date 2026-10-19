import { Cinta } from "@/components/inicio/Cinta";
import { Coleccion } from "@/components/inicio/Coleccion";
import { Contacto } from "@/components/inicio/Contacto";
import { Heroe } from "@/components/inicio/Heroe";
import { Novedades } from "@/components/inicio/Novedades";
import { Servicios } from "@/components/inicio/Servicios";
import { Sobre } from "@/components/inicio/Sobre";
import { Talento } from "@/components/inicio/Talento";
import { sitio } from "@/config/sitio";
import { redesOficiales } from "@/lib/contacto";

/** Datos estructurados solo con información verificable y confirmada. */
function datosEstructurados() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: sitio.marca,
    alternateName: sitio.usuario,
    address: {
      "@type": "PostalAddress",
      addressLocality: sitio.ubicacion.ciudad,
      addressRegion: sitio.ubicacion.departamento,
      addressCountry: sitio.ubicacion.paisCodigo,
    },
    sameAs: redesOficiales().map((r) => r.url),
  };
  if (sitio.dominio) {
    org.url = sitio.dominio;
    org.logo = `${sitio.dominio.replace(/\/$/, "")}/brand/icon-512.png`;
  }
  return JSON.stringify(org).replace(/</g, "\\u003c");
}

export default function Inicio() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datosEstructurados() }} />
      <Heroe />
      <Cinta />
      <Novedades />
      <Coleccion />
      <Talento />
      <Servicios />
      <Sobre />
      <Contacto />
    </>
  );
}
