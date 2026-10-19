import type { Categoria } from "./tipos";

/** Categorías iniciales confirmadas por la empresa. */
export const categorias: Categoria[] = [
  { id: "lenceria", nombre: "Lencería", linea: "Piezas de lencería femenina." },
  { id: "trajes", nombre: "Trajes y prendas", linea: "Trajes y prendas de temporada." },
  { id: "temporada", nombre: "Temporada", linea: "Colecciones de cada temporada." },
  { id: "destacados", nombre: "Destacados", linea: "Selección de piezas destacadas." },
  { id: "lanzamientos", nombre: "Lanzamientos", linea: "Lo más reciente de la marca." },
];

export function categoriaPorId(id: string) {
  return categorias.find((c) => c.id === id);
}
