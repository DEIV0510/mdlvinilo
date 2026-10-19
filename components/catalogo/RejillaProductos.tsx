import type { Producto } from "@/content/tipos";
import { indice } from "@/lib/formato";
import { TarjetaProducto } from "./TarjetaProducto";
import s from "./RejillaProductos.module.css";

/**
 * Rejilla editorial asimétrica: columnas desplazadas en altura para evitar
 * la sensación de catálogo genérico.
 */
export function RejillaProductos({
  productos,
  nivelTitulo = 3,
}: {
  productos: Producto[];
  nivelTitulo?: 2 | 3;
}) {
  return (
    <ul className={s.rejilla} role="list">
      {productos.map((p, i) => (
        <li key={p.slug} className={s.celda} data-revelar style={{ "--orden": i % 3 } as React.CSSProperties}>
          <TarjetaProducto producto={p} indice={indice(i + 1)} nivelTitulo={nivelTitulo} />
        </li>
      ))}
    </ul>
  );
}
