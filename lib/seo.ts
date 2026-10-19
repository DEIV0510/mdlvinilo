import type { Metadata } from "next";
import { sitio } from "@/config/sitio";

/**
 * Canonical solo cuando hay dominio definitivo; sin él, Next resolvería la
 * ruta contra localhost y publicaría una canónica incorrecta.
 */
export function canonica(ruta: string): Metadata["alternates"] {
  return sitio.dominio ? { canonical: ruta } : undefined;
}
