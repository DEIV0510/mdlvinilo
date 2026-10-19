"use client";

import { clasesBoton, type VarianteBoton } from "@/components/ui/Boton";
import { IconoMas } from "@/components/ui/Iconos";
import { useConsulta } from "./ConsultaProvider";

/** Agrega una pieza (con su talla/color, si se eligió) a «Mi selección». */
export function AgregarSeleccion({
  slug,
  nombre,
  talla,
  color,
  deshabilitado,
  motivo,
  variante = "secundario",
  compacto,
  ancho,
  texto = "Agregar a mi selección",
}: {
  slug: string;
  nombre: string;
  talla?: string;
  color?: string;
  deshabilitado?: boolean;
  motivo?: string;
  variante?: VarianteBoton;
  compacto?: boolean;
  ancho?: boolean;
  texto?: string;
}) {
  const { agregar } = useConsulta();
  return (
    <button
      type="button"
      className={clasesBoton(variante, { compacto, ancho })}
      onClick={() => agregar({ slug, nombre, talla, color })}
      disabled={deshabilitado}
      aria-describedby={deshabilitado && motivo ? `motivo-${slug}` : undefined}
      style={deshabilitado ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
    >
      <IconoMas />
      <span>{texto}</span>
      {deshabilitado && motivo ? (
        <span id={`motivo-${slug}`} className="sr-only">
          {motivo}
        </span>
      ) : null}
    </button>
  );
}
