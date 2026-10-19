"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { canalConsulta, mensajes } from "@/lib/contacto";
import { IconoCerrar, IconoMas, IconoMenos } from "@/components/ui/Iconos";
import { BotonConsulta } from "./BotonConsulta";
import { useConsulta } from "./ConsultaProvider";
import { bloquearFondo } from "@/lib/modal";
import s from "./Seleccion.module.css";

/** Panel lateral (diálogo modal nativo) con la lista de consulta. */
export function PanelSeleccion() {
  const { items, abierto, cerrar, cambiarCantidad, quitar, vaciar, aviso } = useConsulta();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
    bloquearFondo("seleccion", abierto);
  }, [abierto]);

  const mensaje = mensajes.lista(items);
  const avisoRegion = (
    <div className={s.aviso} role="status" aria-live="polite" data-visible={aviso ? "" : undefined}>
      {aviso}
    </div>
  );
  const canal = canalConsulta(mensaje);

  return (
    <>
      <dialog
        ref={ref}
        className={s.panel}
        aria-labelledby="seleccion-titulo"
        onClose={cerrar}
        onClick={(e) => {
          // Clic en el fondo (fuera de la caja) cierra el panel.
          if (e.target === e.currentTarget) cerrar();
        }}
      >
        <div className={s.caja}>
          <header className={s.cabecera}>
            <p className="rotulo rotulo--oro">Lista de consulta</p>
            <h2 id="seleccion-titulo" className={`display ${s.titulo}`}>
              Mi <em>selección</em>
            </h2>
            <button type="button" className={s.cerrar} onClick={cerrar} aria-label="Cerrar mi selección">
              <IconoCerrar />
            </button>
          </header>

          {items.length === 0 ? (
            <div className={s.vacia}>
              <p>Aún no has agregado piezas.</p>
              <Link href="/coleccion" className={s.enlaceVacio} onClick={cerrar}>
                Explorar la colección
              </Link>
            </div>
          ) : (
            <>
              <ul className={s.lista} role="list">
                {items.map((it) => (
                  <li key={it.id} className={s.item}>
                    <div className={s.itemTexto}>
                      <Link href={`/producto/${it.slug}`} className={s.itemNombre} onClick={cerrar}>
                        {it.nombre}
                      </Link>
                      {(it.talla || it.color) && (
                        <p className={s.itemDetalle}>
                          {[it.talla && `Talla ${it.talla}`, it.color && `Color ${it.color}`]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                    <div className={s.cantidad} role="group" aria-label={`Cantidad de ${it.nombre}`}>
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(it.id, it.cantidad - 1)}
                        disabled={it.cantidad <= 1}
                        aria-label="Restar una unidad"
                      >
                        <IconoMenos />
                      </button>
                      <output aria-live="polite">{it.cantidad}</output>
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(it.id, it.cantidad + 1)}
                        disabled={it.cantidad >= 20}
                        aria-label="Sumar una unidad"
                      >
                        <IconoMas />
                      </button>
                    </div>
                    <button
                      type="button"
                      className={s.quitar}
                      onClick={() => quitar(it.id)}
                      aria-label={`Quitar ${it.nombre} de la selección`}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>

              <footer className={s.pie}>
                <p className={s.nota}>
                  Esto no es una compra. Al enviar, se abre {canal.nombre} con tu lista para que el equipo
                  confirme disponibilidad, precio y entrega.
                </p>
                <BotonConsulta mensaje={mensaje} texto="Enviar consulta por {canal}" ancho />
                <button type="button" className={s.vaciar} onClick={vaciar}>
                  Vaciar selección
                </button>
              </footer>
            </>
          )}
          <p className={s.privacidad}>Tu selección se guarda solo en este dispositivo.</p>
        </div>
        {abierto ? avisoRegion : null}
      </dialog>

      {abierto ? null : avisoRegion}
    </>
  );
}
