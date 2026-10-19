import type { Novedad } from "./tipos";

/**
 * NOVEDADES REALES
 * ────────────────
 * Lanzamientos, colecciones y noticias de temporada. Mientras la lista
 * esté vacía, la sección invita a seguir las novedades en redes.
 *
 * {
 *   slug: "coleccion-ejemplo",
 *   titulo: "Nombre de la novedad",
 *   descripcion: "Una o dos líneas reales.",
 *   imagen: { src: "/novedades/foto.webp", alt: "…", width: 1200, height: 1500 },
 *   etiqueta: "Lanzamiento",
 *   productoSlug: "slug-del-producto",  // opcional
 *   fecha: "2026-11-01",
 *   publicado: true,
 * },
 */
export const novedades: Novedad[] = [];
