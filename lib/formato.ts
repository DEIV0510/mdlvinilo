const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/** Precio en pesos o «Precio a consultar» cuando no está confirmado. */
export function formatoPrecio(precio: number | null | undefined): string {
  return typeof precio === "number" && Number.isFinite(precio) && precio > 0
    ? cop.format(precio)
    : "Precio a consultar";
}

export const etiquetasDisponibilidad = {
  disponible: "Disponible",
  agotado: "Agotado",
  "por-encargo": "Por encargo",
} as const;

/** Número de índice con dos cifras: 1 → "01". */
export function indice(n: number): string {
  return String(n).padStart(2, "0");
}
