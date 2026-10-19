import { sitio } from "@/config/sitio";

/**
 * Canal de consulta comercial. Si hay número de WhatsApp configurado se usa
 * WhatsApp con el mensaje precargado; si no (o si la consulta pide
 * Instagram, como la de talento), el chat de Instagram de la marca, que no
 * admite texto precargado: el mensaje se copia al portapapeles desde el botón.
 */
export type TipoCanal = "whatsapp" | "instagram";

export interface Canal {
  tipo: TipoCanal;
  href: string;
  /** Nombre visible del canal. */
  nombre: string;
  mensaje: string;
}

function numeroWhatsapp(): string {
  return sitio.whatsapp.numero.replace(/\D/g, "");
}

export function hayWhatsapp(): boolean {
  return numeroWhatsapp().length >= 10;
}

/** «+57 316 099 8998» a partir de «573160998998». */
export function numeroVisible(): string {
  const n = numeroWhatsapp();
  const m = /^57(\d{3})(\d{3})(\d{4})$/.exec(n);
  return m ? `+57 ${m[1]} ${m[2]} ${m[3]}` : `+${n}`;
}

/** Canal fijado para las consultas de talento (undefined = el general). */
export const viaTalento: TipoCanal | undefined =
  sitio.whatsapp.talento === "instagram" ? "instagram" : undefined;

export function canalConsulta(mensaje: string = sitio.whatsapp.mensajeGeneral, via?: TipoCanal): Canal {
  if (via !== "instagram" && hayWhatsapp()) {
    return {
      tipo: "whatsapp",
      href: `https://wa.me/${numeroWhatsapp()}?text=${encodeURIComponent(mensaje)}`,
      nombre: "WhatsApp",
      mensaje,
    };
  }
  return {
    tipo: "instagram",
    href: sitio.redes.instagram.chat,
    nombre: "Instagram",
    mensaje,
  };
}

function urlAbsoluta(ruta: string): string {
  return sitio.dominio ? `${sitio.dominio.replace(/\/$/, "")}${ruta}` : "";
}

/* ─────────── Plantillas de mensaje ─────────── */

export const mensajes = {
  general: () => sitio.whatsapp.mensajeGeneral,

  producto: (nombre: string, opciones: { talla?: string; color?: string; slug?: string } = {}) => {
    const detalles = [
      opciones.talla ? `talla ${opciones.talla}` : "",
      opciones.color ? `color ${opciones.color}` : "",
    ].filter(Boolean);
    const enlace = opciones.slug ? urlAbsoluta(`/producto/${opciones.slug}`) : "";
    return [
      `Hola, me interesa «${nombre}»${detalles.length ? ` (${detalles.join(", ")})` : ""}.`,
      "¿Me confirman disponibilidad y precio?",
      enlace,
    ]
      .filter(Boolean)
      .join(" ");
  },

  categoria: (categoria: string) =>
    `Hola, quiero conocer las piezas de ${categoria.toLowerCase()} disponibles en MDL Vinilo Colombia.`,

  servicio: (servicio?: string) =>
    servicio
      ? `Hola, quiero información sobre el servicio de ${servicio.toLowerCase()} de MDL Vinilo Colombia.`
      : "Hola, quiero información sobre los servicios audiovisuales y publicitarios de MDL Vinilo Colombia.",

  talento: (nombre?: string) =>
    `Hola, quiero consultar una campaña o colaboración publicitaria con MDL Vinilo Colombia${
      nombre ? ` (perfil: ${nombre})` : ""
    }.`,

  novedad: (titulo: string) => `Hola, quiero saber más sobre «${titulo}» de MDL Vinilo Colombia.`,

  lista: (
    items: { nombre: string; talla?: string; color?: string; cantidad: number }[],
  ) => {
    const lineas = items.map((it, i) => {
      const det = [it.talla ? `talla ${it.talla}` : "", it.color ? `color ${it.color}` : ""]
        .filter(Boolean)
        .join(", ");
      return `${i + 1}. ${it.nombre}${det ? ` (${det})` : ""} × ${it.cantidad}`;
    });
    return [
      "Hola, quiero consultar disponibilidad y precio de estas piezas de MDL Vinilo Colombia:",
      ...lineas,
    ].join("\n");
  },
};

/* ─────────── Redes oficiales ─────────── */

export interface RedOficial {
  id: "instagram" | "tiktok" | "facebook" | "otra";
  nombre: string;
  url: string;
  usuario?: string;
}

/** Solo devuelve redes con URL configurada. */
export function redesOficiales(): RedOficial[] {
  const r = sitio.redes;
  const lista: RedOficial[] = [
    { id: "instagram", nombre: "Instagram", url: r.instagram.url, usuario: `@${r.instagram.usuario}` },
    { id: "tiktok", nombre: "TikTok", url: r.tiktok.url, usuario: `@${r.tiktok.usuario}` },
    { id: "facebook", nombre: r.facebook.nombre, url: r.facebook.url },
    { id: "otra", nombre: r.otra.nombre, url: r.otra.url },
  ];
  return lista.filter((x) => x.url && x.nombre);
}
