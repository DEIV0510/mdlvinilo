import type { ReactNode } from "react";
import s from "./Encabezado.module.css";

/** Encabezado editorial de sección: índice, rótulo, titular y entrada breve. */
export function Encabezado({
  numero,
  rotulo,
  titulo,
  entrada,
  accion,
  id,
  nivel = 2,
  alineacion = "izquierda",
  revelar = nivel !== 1,
}: {
  numero?: string;
  rotulo: string;
  titulo: ReactNode;
  entrada?: ReactNode;
  accion?: ReactNode;
  id?: string;
  nivel?: 1 | 2;
  alineacion?: "izquierda" | "centro";
  /** Animación de aparición. Por defecto no en encabezados de página (h1): se ven al instante. */
  revelar?: boolean;
}) {
  const H = nivel === 1 ? "h1" : "h2";
  const r = revelar ? "" : undefined;
  return (
    <header className={`${s.encabezado} ${alineacion === "centro" ? s.centro : ""}`}>
      <div className={s.meta} data-revelar={r}>
        {numero ? <span className={s.numero}>{numero}</span> : null}
        <span className={s.raya} aria-hidden="true" />
        <span className="rotulo rotulo--oro">{rotulo}</span>
      </div>
      <H id={id} className={`display ${s.titulo}`} data-revelar={r} style={{ "--orden": 1 } as React.CSSProperties}>
        {titulo}
      </H>
      {entrada || accion ? (
        <div className={s.pie} data-revelar={r} style={{ "--orden": 2 } as React.CSSProperties}>
          {entrada ? <p className={s.entrada}>{entrada}</p> : null}
          {accion ? <div className={s.accion}>{accion}</div> : null}
        </div>
      ) : null}
    </header>
  );
}
