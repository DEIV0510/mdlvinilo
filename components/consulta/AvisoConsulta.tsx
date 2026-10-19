"use client";

import { useConsulta } from "./ConsultaProvider";
import s from "./Seleccion.module.css";

/**
 * Región de avisos (p. ej. «Mensaje copiado») para páginas sin el panel de
 * selección, como las legales.
 */
export function AvisoConsulta() {
  const { aviso } = useConsulta();
  return (
    <div className={s.aviso} role="status" aria-live="polite" data-visible={aviso ? "" : undefined}>
      {aviso}
    </div>
  );
}
