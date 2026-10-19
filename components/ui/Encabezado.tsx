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
}: {
  numero?: string;
  rotulo: string;
  titulo: ReactNode;
  entrada?: ReactNode;
  accion?: ReactNode;
  id?: string;
  nivel?: 1 | 2;
  alineacion?: "izquierda" | "centro";
}) {
  const H = nivel === 1 ? "h1" : "h2";
  return (
    <header className={`${s.encabezado} ${alineacion === "centro" ? s.centro : ""}`}>
      <div className={s.meta} data-revelar>
        {numero ? <span className={s.numero}>{numero}</span> : null}
        <span className={s.raya} aria-hidden="true" />
        <span className="rotulo rotulo--oro">{rotulo}</span>
      </div>
      <H id={id} className={`display ${s.titulo}`} data-revelar style={{ "--orden": 1 } as React.CSSProperties}>
        {titulo}
      </H>
      {entrada || accion ? (
        <div className={s.pie} data-revelar style={{ "--orden": 2 } as React.CSSProperties}>
          {entrada ? <p className={s.entrada}>{entrada}</p> : null}
          {accion ? <div className={s.accion}>{accion}</div> : null}
        </div>
      ) : null}
    </header>
  );
}
