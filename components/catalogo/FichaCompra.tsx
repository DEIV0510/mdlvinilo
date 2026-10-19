"use client";

import { useId, useState } from "react";
import { AgregarSeleccion } from "@/components/consulta/AgregarSeleccion";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import type { Producto } from "@/content/tipos";
import { mensajes } from "@/lib/contacto";
import s from "./FichaCompra.module.css";

/**
 * Selección de talla y color + acciones de compra/consulta. El mensaje de
 * WhatsApp incluye el producto y las opciones elegidas.
 */
export function FichaCompra({ producto: p }: { producto: Producto }) {
  const id = useId();
  const tallas = p.tallas ?? [];
  const colores = p.colores ?? [];
  const [talla, setTalla] = useState<string | undefined>(tallas.length === 1 ? tallas[0] : undefined);
  const [color, setColor] = useState<string | undefined>(colores.length === 1 ? colores[0].nombre : undefined);

  const faltaTalla = tallas.length > 0 && !talla;
  const faltaColor = colores.length > 1 && !color;
  const agotado = p.disponibilidad === "agotado";
  const motivo = agotado
    ? "Este producto está agotado."
    : faltaTalla
      ? "Elige una talla para agregarlo a tu selección."
      : faltaColor
        ? "Elige un color para agregarlo a tu selección."
        : undefined;

  return (
    <div className={s.ficha}>
      {tallas.length > 0 ? (
        <fieldset className={s.grupo}>
          <legend className={s.leyenda}>
            Talla{talla ? <span className={s.elegido}>: {talla}</span> : null}
          </legend>
          <div className={s.opciones}>
            {tallas.map((t) => (
              <label key={t} className={s.opcion}>
                <input
                  type="radio"
                  name={`${id}-talla`}
                  value={t}
                  checked={talla === t}
                  onChange={() => setTalla(t)}
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {colores.length > 0 ? (
        <fieldset className={s.grupo}>
          <legend className={s.leyenda}>
            Color{color ? <span className={s.elegido}>: {color}</span> : null}
          </legend>
          <div className={s.opciones}>
            {colores.map((c) => (
              <label key={c.nombre} className={`${s.opcion} ${s.opcionColor}`}>
                <input
                  type="radio"
                  name={`${id}-color`}
                  value={c.nombre}
                  checked={color === c.nombre}
                  onChange={() => setColor(c.nombre)}
                />
                <span>
                  {c.hex ? <i className={s.muestra} style={{ background: c.hex }} aria-hidden="true" /> : null}
                  {c.nombre}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className={s.acciones}>
        <BotonConsulta
          ancho
          texto={agotado ? "Consultar reposición por {canal}" : "Consultar por {canal}"}
          mensaje={mensajes.producto(p.nombre, { talla, color, slug: p.slug })}
        />
        <AgregarSeleccion
          slug={p.slug}
          nombre={p.nombre}
          talla={talla}
          color={color}
          ancho
          deshabilitado={Boolean(motivo)}
          motivo={motivo}
        />
        {motivo && !agotado ? <p className={s.ayuda}>{motivo}</p> : null}
      </div>
    </div>
  );
}
