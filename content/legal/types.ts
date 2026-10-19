/**
 * Estructura de los documentos legales del sitio.
 * Los textos viven en archivos de datos para que un abogado pueda
 * revisarlos y editarlos sin tocar componentes.
 */
export type EstadoDocumento = "borrador" | "revisado";

export type BloqueLegal =
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; items: string[] }
  /** Nota visible de contenido pendiente o que requiere revisión jurídica. */
  | { tipo: "pendiente"; texto: string };

export interface SeccionLegal {
  id: string;
  titulo: string;
  bloques: BloqueLegal[];
}

export interface DocumentoLegal {
  slug: "privacidad" | "terminos" | "cookies";
  titulo: string;
  /** Resumen de una línea para metadatos y para el encabezado de la página. */
  resumen: string;
  estado: EstadoDocumento;
  /** Fecha ISO (AAAA-MM-DD) de la última actualización del texto. */
  actualizado: string;
  secciones: SeccionLegal[];
}
