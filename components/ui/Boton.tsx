import Link from "next/link";
import type { ReactNode } from "react";
import { IconoFlecha } from "./Iconos";
import s from "./Boton.module.css";

export type VarianteBoton = "principal" | "secundario" | "enlace";

export function clasesBoton(
  variante: VarianteBoton = "principal",
  opciones: { compacto?: boolean; ancho?: boolean; className?: string } = {},
) {
  return [
    s.boton,
    s[variante],
    opciones.compacto ? s.compacto : "",
    opciones.ancho ? s.ancho : "",
    opciones.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export const claseFlecha = s.flecha;

/**
 * Enlace con aspecto de botón. Las rutas internas usan <Link>; las externas
 * abren en una pestaña nueva de forma segura.
 */
export function Boton({
  href,
  children,
  variante = "principal",
  icono,
  flecha = false,
  compacto,
  ancho,
  className,
  externo,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variante?: VarianteBoton;
  icono?: ReactNode;
  flecha?: boolean;
  compacto?: boolean;
  ancho?: boolean;
  className?: string;
  externo?: boolean;
  "aria-label"?: string;
}) {
  const clase = clasesBoton(variante, { compacto, ancho, className });
  const contenido = (
    <>
      {icono}
      <span>{children}</span>
      {flecha ? <IconoFlecha className={s.flecha} /> : null}
    </>
  );
  const esExterno = externo ?? /^https?:\/\//.test(href);
  if (esExterno) {
    return (
      <a href={href} className={clase} target="_blank" rel="noopener noreferrer" {...rest}>
        {contenido}
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={clase} {...rest}>
      {contenido}
    </Link>
  );
}
