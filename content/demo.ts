import type { Novedad, PerfilTalento, Producto } from "./tipos";

/**
 * DATOS DE EJEMPLO — SOLO DESARROLLO
 * ──────────────────────────────────
 * Sirven para revisar el diseño de las secciones mientras llega el
 * contenido real. Nunca se muestran en producción (ver lib/datos.ts) y
 * todos llevan una marca visible de «Ejemplo». No representan productos,
 * precios ni personas reales.
 */

export const productosDemo: Producto[] = [
  {
    slug: "ejemplo-lenceria-01",
    nombre: "Producto de ejemplo 01",
    categoria: "lenceria",
    categoriasExtra: ["destacados"],
    descripcion: "Texto de ejemplo para revisar la ficha de producto.",
    precio: null,
    imagenes: [],
    tallas: ["A", "B", "C"],
    colores: [{ nombre: "de ejemplo 1", hex: "#0b0b0b" }, { nombre: "de ejemplo 2", hex: "#7a1020" }],
    disponibilidad: null,
    etiqueta: "Nuevo",
    publicado: true,
    demo: true,
  },
  {
    slug: "ejemplo-lenceria-02",
    nombre: "Producto de ejemplo 02",
    categoria: "lenceria",
    precio: null,
    imagenes: [],
    tallas: ["A", "B"],
    disponibilidad: null,
    publicado: true,
    demo: true,
  },
  {
    slug: "ejemplo-traje-01",
    nombre: "Producto de ejemplo 03",
    categoria: "trajes",
    categoriasExtra: ["temporada", "lanzamientos"],
    descripcion: "Texto de ejemplo para revisar la ficha de producto.",
    precio: null,
    imagenes: [],
    colores: [{ nombre: "de ejemplo 1", hex: "#c9a227" }],
    disponibilidad: null,
    etiqueta: "Lanzamiento",
    publicado: true,
    demo: true,
  },
  {
    slug: "ejemplo-temporada-01",
    nombre: "Producto de ejemplo 04",
    categoria: "temporada",
    categoriasExtra: ["destacados"],
    precio: null,
    imagenes: [],
    disponibilidad: null,
    etiqueta: "Temporada",
    publicado: true,
    demo: true,
  },
  {
    slug: "ejemplo-imagen-rota",
    nombre: "Producto de ejemplo 05 (imagen que falla)",
    categoria: "lanzamientos",
    descripcion: "Comprueba el comportamiento cuando una fotografía no carga.",
    precio: null,
    imagenes: [{ src: "/catalogo/no-existe.webp", alt: "Imagen inexistente de prueba", width: 1200, height: 1500 }],
    disponibilidad: null,
    publicado: true,
    demo: true,
  },
];

export const novedadesDemo: Novedad[] = [
  {
    slug: "ejemplo-novedad-01",
    titulo: "Novedad de ejemplo 01",
    descripcion: "Texto de ejemplo: aquí irá una línea real sobre el lanzamiento.",
    etiqueta: "Lanzamiento",
    productoSlug: "ejemplo-traje-01",
    fecha: "2026-10-01",
    publicado: true,
    demo: true,
  },
  {
    slug: "ejemplo-novedad-02",
    titulo: "Novedad de ejemplo 02",
    descripcion: "Texto de ejemplo para una colección de temporada.",
    etiqueta: "Temporada",
    fecha: "2026-09-20",
    publicado: true,
    demo: true,
  },
  {
    slug: "ejemplo-novedad-03",
    titulo: "Novedad de ejemplo 03",
    descripcion: "Texto de ejemplo para una pieza destacada.",
    etiqueta: "Destacado",
    fecha: "2026-09-02",
    publicado: true,
    demo: true,
  },
];

const autorizacionDemo: PerfilTalento["autorizacion"] = {
  vinculoComercial: true,
  autorizacionImagen: true,
  mayorDeEdadVerificado: true,
  referenciaInterna: "EJEMPLO",
};

export const talentoDemo: PerfilTalento[] = [
  {
    slug: "perfil-de-ejemplo-01",
    nombreArtistico: "Perfil de ejemplo 01",
    presentacion: "Texto de ejemplo. Aquí irá la presentación aprobada por la modelo.",
    proyectos: ["Proyecto de ejemplo"],
    autorizacion: autorizacionDemo,
    publicado: true,
    demo: true,
  },
  {
    slug: "perfil-de-ejemplo-02",
    nombreArtistico: "Perfil de ejemplo 02",
    presentacion: "Texto de ejemplo. Aquí irá la presentación aprobada por la modelo.",
    autorizacion: autorizacionDemo,
    publicado: true,
    demo: true,
  },
  {
    slug: "perfil-de-ejemplo-03",
    nombreArtistico: "Perfil de ejemplo 03",
    presentacion: "Texto de ejemplo. Aquí irá la presentación aprobada por la modelo.",
    autorizacion: autorizacionDemo,
    publicado: true,
    demo: true,
  },
];
