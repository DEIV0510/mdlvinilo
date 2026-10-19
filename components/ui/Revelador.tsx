"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Revela los elementos marcados con [data-revelar] cuando entran en
 * pantalla. Un único IntersectionObserver para toda la página.
 * Si el navegador no lo soporta, todo se muestra de inmediato.
 */
export function Revelador() {
  const ruta = usePathname();

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.classList.add("revelar-listo");
    // Llegada por navegación interna (sin intro): la portada debe animarse igualmente.
    if (!raiz.classList.contains("intro-activa")) raiz.classList.add("intro-fin");
    const pendientes = Array.from(document.querySelectorAll<HTMLElement>("[data-revelar]:not(.visto)"));
    if (!("IntersectionObserver" in window)) {
      pendientes.forEach((el) => el.classList.add("visto"));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("visto");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pendientes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ruta]);

  return null;
}
