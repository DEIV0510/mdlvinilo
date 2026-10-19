import type { Producto } from "./tipos";

/**
 * CATÁLOGO REAL
 * ─────────────
 * Agrega aquí los productos con datos confirmados. Las fotos van en
 * /public/catalogo/ (formato .webp o .avif, idealmente 1200×1500 px, 4:5).
 *
 * Ejemplo (copiar, completar y cambiar publicado a true):
 *
 * {
 *   slug: "nombre-del-producto",
 *   nombre: "Nombre del producto",
 *   categoria: "lenceria",
 *   descripcion: "Descripción breve y real.",
 *   precio: null,                       // número en COP solo si está confirmado
 *   imagenes: [
 *     { src: "/catalogo/nombre-1.webp", alt: "Descripción de la foto", width: 1200, height: 1500 },
 *   ],
 *   tallas: ["S", "M", "L"],            // solo si existen
 *   colores: [{ nombre: "Negro", hex: "#000000" }],
 *   disponibilidad: null,               // "disponible" | "agotado" | "por-encargo" | null
 *   etiqueta: "Nuevo",
 *   publicado: true,
 * },
 */
export const productos: Producto[] = [];
