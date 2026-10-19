"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Servicios.module.css";

/**
 * Visor de cámara (marco de encuadre en CSS): muestra el servicio que el
 * usuario señala o enfoca en la lista. Puramente decorativo; la lista
 * contigua contiene toda la información.
 */
export function Visor({ nombres }: { nombres: string[] }) {
  const [activo, setActivo] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lista = ref.current?.parentElement?.querySelector("ol");
    if (!lista) return;
    const elegir = (e: Event) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>("[data-servicio]");
      if (li) setActivo(Number(li.dataset.servicio));
    };
    lista.addEventListener("pointerover", elegir);
    lista.addEventListener("focusin", elegir);
    return () => {
      lista.removeEventListener("pointerover", elegir);
      lista.removeEventListener("focusin", elegir);
    };
  }, []);

  return (
    <div ref={ref} className={s.visor} aria-hidden="true">
      <span className={`${s.esquina} ${s.si}`} />
      <span className={`${s.esquina} ${s.sd}`} />
      <span className={`${s.esquina} ${s.ii}`} />
      <span className={`${s.esquina} ${s.id}`} />
      <span className={s.mira} />
      <div className={s.hud}>
        <span className={s.rec}>
          <span className={s.recPunto} /> REC
        </span>
        <span>Floridablanca</span>
      </div>
      <p key={activo} className={`display ${s.visorTexto}`}>
        {nombres[activo]}
      </p>
      <div className={`${s.hud} ${s.hudBajo}`}>
        <span>MDL · VINILO</span>
        <span className={s.contador}>
          Toma {String(activo + 1).padStart(2, "0")} / {String(nombres.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
