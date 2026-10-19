/**
 * Modelos de datos del catálogo, las novedades, el talento y los servicios.
 * Los componentes solo leen estos tipos: para publicar contenido real basta
 * con editar los archivos de /content, sin tocar la interfaz.
 */

export type CategoriaId = "lenceria" | "trajes" | "temporada" | "destacados" | "lanzamientos";

export interface Categoria {
  id: CategoriaId;
  nombre: string;
  /** Frase breve y factual; no describir características no confirmadas. */
  linea: string;
}

export interface Imagen {
  /** Ruta dentro de /public (p. ej. "/catalogo/body-negro-1.webp") o URL permitida. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type Disponibilidad = "disponible" | "agotado" | "por-encargo";

export interface Producto {
  slug: string;
  nombre: string;
  categoria: CategoriaId;
  /** Categorías adicionales (p. ej. un producto de lencería que también es lanzamiento). */
  categoriasExtra?: CategoriaId[];
  descripcion?: string;
  /** Precio en pesos colombianos. Solo si está confirmado; si no, null = «Precio a consultar». */
  precio: number | null;
  imagenes: Imagen[];
  tallas?: string[];
  colores?: { nombre: string; hex?: string }[];
  /** Solo cuando la disponibilidad esté realmente conectada o confirmada. null = consultar. */
  disponibilidad: Disponibilidad | null;
  etiqueta?: "Nuevo" | "Lanzamiento" | "Temporada" | "Destacado";
  publicado: boolean;
  /** Datos de ejemplo: solo se muestran en desarrollo, nunca en producción. */
  demo?: boolean;
}

export interface Novedad {
  slug: string;
  titulo: string;
  descripcion: string;
  imagen?: Imagen;
  etiqueta?: "Lanzamiento" | "Nueva colección" | "Temporada" | "Destacado";
  /** Si la novedad corresponde a un producto del catálogo, enlaza a su ficha. */
  productoSlug?: string;
  /** Fecha ISO de publicación, para ordenar. */
  fecha: string;
  publicado: boolean;
  demo?: boolean;
}

export interface PerfilTalento {
  slug: string;
  /** Nombre artístico autorizado. Nunca nombres legales ni datos privados. */
  nombreArtistico: string;
  presentacion?: string;
  retrato?: Imagen;
  galeria?: Imagen[];
  proyectos?: string[];
  /** Solo redes profesionales que la persona autorizó publicar. */
  redes?: { nombre: string; url: string }[];
  /**
   * Requisito para publicar: vínculo comercial formal y autorización
   * escrita de uso de imagen y datos, verificada por la empresa.
   */
  autorizacion: {
    vinculoComercial: boolean;
    autorizacionImagen: boolean;
    mayorDeEdadVerificado: boolean;
    /** Referencia interna del documento firmado (no se muestra en la web). */
    referenciaInterna: string;
    /** Fecha ISO hasta la que es válida la autorización, si aplica. */
    vigenteHasta?: string;
  };
  publicado: boolean;
  demo?: boolean;
}

export interface Servicio {
  id: string;
  nombre: string;
  linea: string;
  /** false = no se muestra hasta que la empresa lo confirme. */
  confirmado: boolean;
}
