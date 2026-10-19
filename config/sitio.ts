/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN CENTRAL DE MDL VINILO COLOMBIA
 * ─────────────────────────────────────────────────────────────
 *  Edita este archivo para completar los datos de contacto, redes
 *  y la información empresarial. Ningún dato aquí debe inventarse:
 *  lo que esté vacío ("") simplemente no se muestra en la web.
 *
 *  Variables de entorno opcionales (tienen prioridad):
 *    NEXT_PUBLIC_SITE_URL       Dominio definitivo, p. ej. https://mdlvinilo.com
 *    NEXT_PUBLIC_WHATSAPP       Número en formato internacional sin "+", p. ej. 57300XXXXXXX
 */

export const sitio = {
  marca: "MDL Vinilo Colombia",
  marcaCorta: "MDL Vinilo",
  /** Usuario principal en redes, confirmado por la empresa. */
  usuario: "@mdlvinilocol",
  ubicacion: {
    ciudad: "Floridablanca",
    departamento: "Santander",
    pais: "Colombia",
    /** Código ISO del país para datos estructurados. */
    paisCodigo: "CO",
  },

  /** Dominio definitivo. Vacío = sin canonical ni sitemap absolutos. */
  dominio: process.env.NEXT_PUBLIC_SITE_URL ?? "",

  /** Datos confirmados por la empresa (usados en la sección «Sobre Vinilo»). */
  trayectoria: {
    aniosFuncionando: 6, // aproximado, según la empresa
    aniosConstituida: 2,
    socios: 3,
  },

  whatsapp: {
    /**
     * PENDIENTE: número oficial de WhatsApp en formato internacional sin "+"
     * ni espacios (Colombia empieza por 57). Mientras esté vacío, los botones
     * de consulta abren el chat de Instagram de la marca.
     */
    numero: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
    mensajeGeneral: "Hola, quiero conocer los productos y servicios de MDL Vinilo Colombia.",
  },

  redes: {
    instagram: {
      usuario: "mdlvinilocol",
      url: "https://www.instagram.com/mdlvinilocol/",
      /** Enlace directo al chat de Instagram (se usa si no hay WhatsApp). */
      chat: "https://ig.me/m/mdlvinilocol",
    },
    tiktok: {
      usuario: "mdlcol",
      url: "https://www.tiktok.com/@mdlcol",
    },
    facebook: {
      /**
       * PENDIENTE DE CONFIRMAR. Se encontró una página que parece de la marca
       * (enlaza a @mdlvinilocol y usa el mismo logotipo), pero hoy está vacía:
       *   https://www.facebook.com/MdlViniloCol/
       * Pega aquí la URL solo cuando la empresa confirme que es la oficial.
       */
      url: "",
      nombre: "Facebook",
    },
    /** Espacio para otra red oficial (p. ej. X, YouTube, Telegram). */
    otra: {
      url: "",
      nombre: "",
    },
  },

  seo: {
    /**
     * Permite que Googlebot y Bingbot, verificados por DNS (no solo por su
     * User-Agent), vean el contenido sin la pantalla de acceso, como
     * recomienda Google para sitios con acceso por edad. Con false, los
     * buscadores solo indexan la pantalla de acceso.
     */
    rastreadoresVerificados: true,
  },

  /**
   * Información empresarial para el pie de página y los textos legales.
   * PENDIENTE: completar con los datos del registro mercantil.
   */
  empresa: {
    razonSocial: "",
    nit: "",
    correo: "",
    telefono: "",
    /** Solo si la empresa decide publicarla. */
    direccion: "",
  },
} as const;

export type Sitio = typeof sitio;

/** Lista de datos que faltan antes de publicar (se muestra solo en desarrollo). */
export function datosPendientes(): string[] {
  const faltan: string[] = [];
  if (!sitio.whatsapp.numero) faltan.push("Número de WhatsApp (config/sitio.ts o NEXT_PUBLIC_WHATSAPP)");
  if (!sitio.dominio) faltan.push("Dominio definitivo (NEXT_PUBLIC_SITE_URL)");
  if (!sitio.redes.facebook.url) faltan.push("URL oficial de Facebook");
  if (!sitio.empresa.razonSocial) faltan.push("Razón social");
  if (!sitio.empresa.nit) faltan.push("NIT");
  if (!sitio.empresa.correo) faltan.push("Correo de contacto / datos personales");
  return faltan;
}
