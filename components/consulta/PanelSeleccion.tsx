"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { canalConsulta, mensajes } from "@/lib/contacto";
import { clasesBoton } from "@/components/ui/Boton";
import { IconoCerrar, IconoCopiar, IconoMas, IconoMenos } from "@/components/ui/Iconos";
import { bloquearFondo } from "@/lib/modal";
import { BotonConsulta } from "./BotonConsulta";
import { useConsulta } from "./ConsultaProvider";
import s from "./Seleccion.module.css";

/**
 * Panel lateral (diálogo modal nativo) con la lista de consulta.
 * `slugsPublicados` llega del servidor: una pieza guardada que ya no está
 * publicada se muestra sin enlace (nunca lleva a una página inexistente).
 */
export function PanelSeleccion({ slugsPublicados }: { slugsPublicados: string[] }) {
  const { items, abierto, cerrar, cambiarCantidad, quitar, vaciar, aviso } = useConsulta();
  const ref = useRef<HTMLDialogElement>(null);
  const areaMensaje = useRef<HTMLTextAreaElement>(null);
  const [copiado, setCopiado] = useState<"" | "ok" | "manual">("");
  const publicados = new Set(slugsPublicados);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
    bloquearFondo("seleccion", abierto);
  }, [abierto]);

  const mensaje = mensajes.lista(items);
  const canal = canalConsulta(mensaje);

  async function copiarMensaje() {
    try {
      await navigator.clipboard.writeText(mensaje);
      setCopiado("ok");
    } catch {
      // Sin acceso al portapapeles: se selecciona el texto para copiarlo a mano.
      areaMensaje.current?.focus();
      areaMensaje.current?.select();
      setCopiado("manual");
    }
  }

  const avisoRegion = (
    <div className={s.aviso} role="status" aria-live="polite" data-visible={aviso ? "" : undefined}>
      {aviso}
    </div>
  );

  return (
    <>
      <dialog
        ref={ref}
        className={s.panel}
        aria-labelledby="seleccion-titulo"
        onClose={() => {
          setCopiado("");
          cerrar();
        }}
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
                      {publicados.has(it.slug) ? (
                        <Link href={`/producto/${it.slug}`} className={s.itemNombre} onClick={cerrar}>
                          {it.nombre}
                        </Link>
                      ) : (
                        <span className={s.itemNombre}>
                          {it.nombre} <span className={s.itemRetirado}>(ya no está publicada)</span>
                        </span>
                      )}
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
                {canal.tipo === "whatsapp" ? (
                  <>
                    <p className={s.nota}>
                      Esto no es una compra. Al enviar, se abre WhatsApp con tu lista para que el equipo
                      confirme disponibilidad, precio y entrega.
                    </p>
                    <BotonConsulta mensaje={mensaje} texto="Enviar consulta por {canal}" ancho />
                  </>
                ) : (
                  <>
                    <p className={s.nota}>
                      Esto no es una compra. Instagram no permite adjuntar mensajes: copia tu lista y pégala
                      en el chat para que el equipo confirme disponibilidad, precio y entrega.
                    </p>
                    <label className={s.etiquetaMensaje} htmlFor="mensaje-seleccion">
                      Mensaje para enviar
                    </label>
                    <textarea
                      id="mensaje-seleccion"
                      ref={areaMensaje}
                      className={s.mensaje}
                      readOnly
                      rows={Math.min(8, items.length + 2)}
                      value={mensaje}
                    />
                    <button
                      type="button"
                      className={clasesBoton("secundario", { ancho: true })}
                      onClick={copiarMensaje}
                    >
                      <IconoCopiar />
                      <span>{copiado === "ok" ? "Mensaje copiado" : "Copiar mensaje"}</span>
                    </button>
                    <p className={s.estadoCopia} role="status">
                      {copiado === "ok"
                        ? "Listo: ahora abre Instagram y pega el mensaje."
                        : copiado === "manual"
                          ? "Texto seleccionado: cópialo con el teclado o manteniendo pulsado."
                          : ""}
                    </p>
                    <BotonConsulta mensaje={mensaje} texto="Abrir chat de Instagram" ancho />
                  </>
                )}
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
