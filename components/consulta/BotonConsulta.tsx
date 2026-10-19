"use client";

import type { ReactNode } from "react";
import { canalConsulta } from "@/lib/contacto";
import { clasesBoton, type VarianteBoton } from "@/components/ui/Boton";
import { IconoInstagram, IconoWhatsapp } from "@/components/ui/Iconos";
import { useConsultaOpcional } from "./ConsultaProvider";

/**
 * Botón de consulta comercial. Abre WhatsApp con el mensaje precargado
 * (incluye el producto o servicio). Si aún no hay número configurado, abre
 * el chat de Instagram y copia el mensaje al portapapeles para pegarlo.
 *
 * `texto` admite el marcador {canal}: «Consultar por {canal}».
 */
export function BotonConsulta({
  mensaje,
  texto = "Consultar por {canal}",
  variante = "principal",
  compacto,
  ancho,
  className,
  sinIcono,
  ariaLabel,
  crudo,
  children,
}: {
  mensaje?: string;
  texto?: string;
  variante?: VarianteBoton;
  compacto?: boolean;
  ancho?: boolean;
  className?: string;
  sinIcono?: boolean;
  ariaLabel?: string;
  /** Sin estilo de botón: solo la clase recibida y el contenido (children). */
  crudo?: boolean;
  children?: ReactNode;
}) {
  const canal = canalConsulta(mensaje);
  const consulta = useConsultaOpcional();
  const etiqueta = texto.replace("{canal}", canal.nombre);
  const Icono = canal.tipo === "whatsapp" ? IconoWhatsapp : IconoInstagram;

  function alPulsar() {
    if (canal.tipo !== "instagram") return;
    // Instagram no permite precargar texto: se copia el mensaje.
    try {
      void navigator.clipboard?.writeText(canal.mensaje).then(
        () => consulta?.avisar("Mensaje copiado. Pégalo en el chat de Instagram que se acaba de abrir."),
        () => undefined,
      );
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <a
      href={canal.href}
      target="_blank"
      rel="noopener noreferrer"
      className={crudo ? className : clasesBoton(variante, { compacto, ancho, className })}
      onClick={alPulsar}
      aria-label={ariaLabel ? `${ariaLabel} (se abre ${canal.nombre} en una pestaña nueva)` : undefined}
      data-canal={canal.tipo}
    >
      {sinIcono || crudo ? null : <Icono />}
      {crudo ? children : <span>{children ?? etiqueta}</span>}
      <span className="sr-only"> (se abre {canal.nombre} en una pestaña nueva)</span>
    </a>
  );
}
