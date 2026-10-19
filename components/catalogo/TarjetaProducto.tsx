import Link from "next/link";
import { AgregarSeleccion } from "@/components/consulta/AgregarSeleccion";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import type { Producto } from "@/content/tipos";
import { mensajes } from "@/lib/contacto";
import { etiquetasDisponibilidad, formatoPrecio } from "@/lib/formato";
import { Foto } from "./Foto";
import s from "./TarjetaProducto.module.css";

export function TarjetaProducto({
  producto: p,
  indice,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw",
  nivelTitulo = 3,
}: {
  producto: Producto;
  indice?: string;
  sizes?: string;
  nivelTitulo?: 2 | 3;
}) {
  const tieneVariantes = Boolean(p.tallas?.length || (p.colores?.length ?? 0) > 1);
  const agotado = p.disponibilidad === "agotado";
  const H = nivelTitulo === 2 ? "h2" : "h3";
  const url = `/producto/${p.slug}`;

  return (
    <article className={s.tarjeta}>
      <Link href={url} className={s.imagen} tabIndex={-1} aria-hidden="true">
        <Foto imagen={p.imagenes[0]} nombre={p.nombre} sizes={sizes} className={s.foto} />
        {p.imagenes[1] ? (
          <Foto imagen={p.imagenes[1]} nombre={p.nombre} sizes={sizes} className={s.fotoAlterna} />
        ) : null}
      </Link>

      <div className={s.marcas}>
        {p.demo ? <span className="insignia-demo">Ejemplo</span> : null}
        {p.etiqueta ? <span className={s.etiqueta}>{p.etiqueta}</span> : null}
      </div>

      <div className={s.info}>
        {indice ? <span className={s.indice}>{indice}</span> : null}
        <H className={s.nombre}>
          <Link href={url} className={s.enlaceNombre}>
            {p.nombre}
          </Link>
        </H>
        <p className={s.precio}>
          {formatoPrecio(p.precio)}
          {p.disponibilidad ? (
            <span className={s.disponibilidad} data-estado={p.disponibilidad}>
              {etiquetasDisponibilidad[p.disponibilidad]}
            </span>
          ) : null}
        </p>
        {p.tallas?.length ? <p className={s.variantes}>Tallas: {p.tallas.join(" · ")}</p> : null}
      </div>

      <div className={s.acciones}>
        {tieneVariantes ? (
          <Link href={url} className={s.accionTexto}>
            Elegir talla o color
          </Link>
        ) : (
          <AgregarSeleccion
            slug={p.slug}
            nombre={p.nombre}
            color={p.colores?.[0]?.nombre}
            variante="enlace"
            texto="Agregar"
            deshabilitado={agotado}
            motivo="Producto agotado"
          />
        )}
        <BotonConsulta
          variante="enlace"
          texto="Consultar"
          mensaje={mensajes.producto(p.nombre, { slug: p.slug })}
          ariaLabel={`Consultar ${p.nombre}`}
        />
      </div>
    </article>
  );
}
