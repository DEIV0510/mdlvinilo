"use client";

import { clasesBoton, type VarianteBoton } from "@/components/ui/Boton";
import { IconoMas } from "@/components/ui/Iconos";
import { useConsulta } from "./ConsultaProvider";

/**
 * Agrega una pieza (con su talla/color, si se eligió) a «Mi selección».
 * Deshabilitado con aria-disabled (no disabled) para que siga siendo
 * enfocable y lea el motivo.
 */
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
  const idMotivo = `motivo-${slug}`;
  return (
    <>
      <button
        type="button"
        className={clasesBoton(variante, { compacto, ancho })}
        onClick={() => {
          if (deshabilitado) return;
          agregar({ slug, nombre, talla, color });
        }}
        aria-disabled={deshabilitado || undefined}
        aria-describedby={deshabilitado && motivo ? idMotivo : undefined}
        style={deshabilitado ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
      >
        <IconoMas />
        <span>{texto}</span>
        {texto === "Agregar a mi selección" ? null : <span className="sr-only"> {nombre} a mi selección</span>}
      </button>
      {deshabilitado && motivo ? (
        <span id={idMotivo} className="sr-only">
          {motivo}
        </span>
      ) : null}
    </>
  );
}
