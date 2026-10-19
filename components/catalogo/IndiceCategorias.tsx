import Link from "next/link";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { IconoFlecha } from "@/components/ui/Iconos";
import { mensajes } from "@/lib/contacto";
import { getCategoriasConConteo } from "@/lib/datos";
import { indice } from "@/lib/formato";
import s from "./IndiceCategorias.module.css";

/**
 * Índice tipográfico de categorías. Si una categoría tiene piezas
 * publicadas enlaza a su página; si no, abre la consulta directa con el
 * nombre de la categoría (sin páginas vacías intermedias).
 */
export function IndiceCategorias({ nivelTitulo = 3 }: { nivelTitulo?: 2 | 3 }) {
  const categorias = getCategoriasConConteo();
  const H = nivelTitulo === 2 ? "h2" : "h3";

  return (
    <ol className={s.indice} role="list">
      {categorias.map((c, i) => {
        const contenido = (
          <>
            <span className={s.num}>{indice(i + 1)}</span>
            <H className={`display ${s.nombre}`}>
              <span className={s.nombreTexto}>{c.nombre}</span>
            </H>
            <span className={s.linea}>{c.linea}</span>
            <span className={s.estado}>
              {c.total > 0 ? `${c.total} ${c.total === 1 ? "pieza" : "piezas"}` : "Consultar disponibilidad"}
              <IconoFlecha className={s.flecha} />
            </span>
          </>
        );
        return (
          <li key={c.id} className={s.fila} data-revelar style={{ "--orden": i } as React.CSSProperties}>
            {c.total > 0 ? (
              <Link href={`/coleccion/${c.id}`} className={s.enlace}>
                {contenido}
              </Link>
            ) : (
              <BotonConsulta crudo className={s.enlace} mensaje={mensajes.categoria(c.nombre)}>
                {contenido}
              </BotonConsulta>
            )}
          </li>
        );
      })}
    </ol>
  );
}
