import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogoVacio } from "@/components/catalogo/CatalogoVacio";
import { FiltroCategorias } from "@/components/catalogo/FiltroCategorias";
import { RejillaProductos } from "@/components/catalogo/RejillaProductos";
import { Encabezado } from "@/components/ui/Encabezado";
import { categoriaPorId, categorias } from "@/content/categorias";
import { getProductosPorCategoria } from "@/lib/datos";
import { canonica } from "@/lib/seo";
import s from "../../pagina.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.id }));
}

type Props = { params: Promise<{ categoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const c = categoriaPorId(categoria);
  if (!c) return {};
  return {
    title: `${c.nombre} — Colección`,
    description: `${c.nombre} de MDL Vinilo Colombia. ${c.linea} Consulta disponibilidad, tallas y precios.`,
    alternates: canonica(`/coleccion/${c.id}`),
  };
}

export default async function CategoriaPagina({ params }: Props) {
  const { categoria } = await params;
  const c = categoriaPorId(categoria);
  if (!c) notFound();
  const productos = getProductosPorCategoria(c.id);

  return (
    <div className={`contenedor ${s.pagina}`}>
      <nav aria-label="Ruta de navegación" className={s.migas}>
        <ol>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/coleccion">Colección</Link>
          </li>
          <li aria-current="page">{c.nombre}</li>
        </ol>
      </nav>
      <Encabezado nivel={1} rotulo="Colección" titulo={<em>{c.nombre}</em>} entrada={c.linea} />
      <FiltroCategorias actual={c.id} />
      {productos.length ? (
        <RejillaProductos productos={productos} nivelTitulo={2} />
      ) : (
        <CatalogoVacio categoria={c.nombre} />
      )}
    </div>
  );
}
