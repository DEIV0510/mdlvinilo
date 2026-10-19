import type { Metadata } from "next";
import { CatalogoVacio } from "@/components/catalogo/CatalogoVacio";
import { FiltroCategorias } from "@/components/catalogo/FiltroCategorias";
import { IndiceCategorias } from "@/components/catalogo/IndiceCategorias";
import { RejillaProductos } from "@/components/catalogo/RejillaProductos";
import { Encabezado } from "@/components/ui/Encabezado";
import { getProductos } from "@/lib/datos";
import { canonica } from "@/lib/seo";
import s from "../pagina.module.css";

export const metadata: Metadata = {
  title: "Colección",
  description:
    "Lencería, trajes y prendas, colecciones de temporada y lanzamientos de MDL Vinilo Colombia. Consulta disponibilidad, tallas y precios.",
  alternates: canonica("/coleccion"),
};

export default function ColeccionPagina() {
  const productos = getProductos();
  return (
    <div className={`contenedor ${s.pagina}`}>
      <Encabezado
        nivel={1}
        numero="02"
        rotulo="Colección y tienda"
        titulo={
          <>
            La <em>colección</em>
          </>
        }
        entrada="Elige tus piezas, agrégalas a tu selección y confirma disponibilidad, talla y precio con el equipo."
      />
      <FiltroCategorias />
      {productos.length ? (
        <RejillaProductos productos={productos} nivelTitulo={2} />
      ) : (
        <>
          <CatalogoVacio />
          <div className={s.seccionExtra}>
            <IndiceCategorias nivelTitulo={2} />
          </div>
        </>
      )}
    </div>
  );
}
