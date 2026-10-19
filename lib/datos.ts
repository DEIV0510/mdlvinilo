import { categorias } from "@/content/categorias";
import { novedadesDemo, productosDemo, talentoDemo } from "@/content/demo";
import { novedades } from "@/content/novedades";
import { productos } from "@/content/productos";
import { servicios } from "@/content/servicios";
import { talento } from "@/content/talento";
import type { CategoriaId, Novedad, PerfilTalento, Producto } from "@/content/tipos";

/**
 * Capa de acceso a datos. Hoy lee archivos locales; mañana puede leer un
 * CMS o una base de datos sin cambiar los componentes.
 *
 * Los datos de ejemplo solo aparecen en desarrollo (`next dev`) o si se
 * fuerza con MDL_DEMO=1. En una compilación de producción normal nunca.
 */
export const MOSTRAR_DEMO =
  process.env.MDL_DEMO === "1" || process.env.NODE_ENV === "development";

function conDemo<T extends { demo?: boolean }>(reales: T[], demo: T[]): T[] {
  const limpios = reales.filter((r) => !r.demo);
  return MOSTRAR_DEMO ? [...limpios, ...demo] : limpios;
}

/* ─────────── Catálogo ─────────── */

export function getProductos(): Producto[] {
  return conDemo(productos, productosDemo).filter((p) => p.publicado);
}

export function getProducto(slug: string): Producto | undefined {
  return getProductos().find((p) => p.slug === slug);
}

export function productoEnCategoria(p: Producto, id: CategoriaId): boolean {
  return p.categoria === id || (p.categoriasExtra?.includes(id) ?? false);
}

export function getProductosPorCategoria(id: CategoriaId): Producto[] {
  return getProductos().filter((p) => productoEnCategoria(p, id));
}

export function getCategoriasConConteo() {
  const todos = getProductos();
  return categorias.map((c) => ({
    ...c,
    total: todos.filter((p) => productoEnCategoria(p, c.id)).length,
  }));
}

export function getDestacados(max = 4): Producto[] {
  const todos = getProductos();
  const marcados = todos.filter((p) => productoEnCategoria(p, "destacados"));
  const resto = todos.filter((p) => !marcados.includes(p));
  return [...marcados, ...resto].slice(0, max);
}

/* ─────────── Novedades ─────────── */

export function getNovedades(): Novedad[] {
  return conDemo(novedades, novedadesDemo)
    .filter((n) => n.publicado)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/* ─────────── Talento ─────────── */

/** Un perfil solo es publicable con vínculo, autorización y mayoría de edad verificados. */
export function perfilPublicable(p: PerfilTalento, hoy = new Date()): boolean {
  const a = p.autorizacion;
  if (!p.publicado || !a.vinculoComercial || !a.autorizacionImagen || !a.mayorDeEdadVerificado) {
    return false;
  }
  if (!a.referenciaInterna.trim()) return false;
  if (a.vigenteHasta && new Date(`${a.vigenteHasta}T23:59:59`) < hoy) return false;
  return true;
}

export function getTalento(): PerfilTalento[] {
  return conDemo(talento, talentoDemo).filter((p) => perfilPublicable(p));
}

export function getPerfil(slug: string): PerfilTalento | undefined {
  return getTalento().find((p) => p.slug === slug);
}

/* ─────────── Servicios ─────────── */

export function getServicios() {
  return servicios.filter((s) => s.confirmado);
}
