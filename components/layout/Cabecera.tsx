"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { useConsulta } from "@/components/consulta/ConsultaProvider";
import { Logo } from "@/components/marca/Logo";
import { IconoCerrar, IconoSeleccion } from "@/components/ui/Iconos";
import { RedesSociales } from "@/components/ui/RedesSociales";
import { navegacion } from "./navegacion";
import { bloquearFondo } from "@/lib/modal";
import s from "./Cabecera.module.css";

export function Cabecera() {
  const ruta = usePathname();
  const esPortada = ruta === "/";
  const [desplazado, setDesplazado] = useState(false);
  const [menu, setMenu] = useState(false);
  const { total, listo, abrir } = useConsulta();
  const dialogo = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let raf = 0;
    const medir = () => {
      raf = 0;
      // En portada el logotipo de la cabecera aparece al dejar atrás el héroe.
      const umbral = esPortada ? window.innerHeight * 0.55 : 24;
      setDesplazado(window.scrollY > umbral);
    };
    const alDesplazar = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    raf = requestAnimationFrame(medir);
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar, { passive: true });
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
      cancelAnimationFrame(raf);
    };
  }, [esPortada]);

  // Cierra el menú al navegar (estado derivado de la ruta, sin efectos).
  const [rutaMenu, setRutaMenu] = useState(ruta);
  if (rutaMenu !== ruta) {
    setRutaMenu(ruta);
    setMenu(false);
  }

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (menu && !d.open) d.showModal();
    if (!menu && d.open) d.close();
    bloquearFondo("menu", menu);
    return () => bloquearFondo("menu", false);
  }, [menu]);

  return (
    <header className={s.cabecera} data-solida={desplazado ? "" : undefined} data-portada={esPortada ? "" : undefined}>
      <div className={s.fila}>
        <Link href="/" className={s.marca} aria-label="MDL Vinilo Colombia, ir al inicio">
          <Logo sizes="96px" decorativo className={s.logo} />
        </Link>

        <nav aria-label="Principal" className={s.nav}>
          <ul role="list">
            {navegacion.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={s.enlace}
                  aria-current={!n.href.includes("#") && (ruta === n.href || ruta.startsWith(`${n.href}/`)) ? "page" : undefined}
                >
                  {n.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.acciones}>
          {/* Nombre accesible = texto visible («Selección 2») + «piezas» solo para lectores */}
          <button type="button" className={s.seleccion} onClick={abrir}>
            <IconoSeleccion />
            <span className={s.seleccionTexto}>Selección</span>
            <span className={s.contador} data-activo={listo && total > 0 ? "" : undefined}>
              {listo ? total : 0}
            </span>
            <span className="sr-only">{listo && total === 1 ? " pieza" : " piezas"}</span>
          </button>
          <BotonConsulta compacto variante="secundario" texto="Consultar" className={s.consultar} />
          <button
            type="button"
            className={s.botonMenu}
            onClick={() => setMenu(true)}
            aria-expanded={menu}
            aria-controls="menu-movil"
          >
            <span className={s.lineas} aria-hidden="true">
              <span />
              <span />
            </span>
            <span>Menú</span>
          </button>
        </div>
      </div>

      <dialog id="menu-movil" ref={dialogo} className={s.menu} aria-label="Menú" onClose={() => setMenu(false)}>
        <div className={s.menuCaja}>
          <div className={s.menuCabecera}>
            {/* Solo con el menú abierto: evita descargar y medir una imagen oculta */}
            {menu ? <Logo sizes="96px" decorativo className={s.logoMenu} /> : <span className={s.logoMenu} />}
            <button type="button" className={s.cerrar} onClick={() => setMenu(false)} aria-label="Cerrar menú">
              <IconoCerrar />
            </button>
          </div>
          <nav aria-label="Menú móvil">
            <ol className={s.menuLista} role="list">
              {navegacion.map((n, i) => (
                <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
                  <Link href={n.href} className={s.menuEnlace} onClick={() => setMenu(false)}>
                    <span className={s.menuIndice}>{String(i + 1).padStart(2, "0")}</span>
                    {n.texto}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          {/* Al abrir un canal externo se cierra el menú (el aviso de copiado queda visible) */}
          <div className={s.menuPie} onClick={(e) => (e.target as Element).closest("a") && setMenu(false)}>
            <BotonConsulta ancho />
            <RedesSociales />
          </div>
        </div>
      </dialog>
    </header>
  );
}
