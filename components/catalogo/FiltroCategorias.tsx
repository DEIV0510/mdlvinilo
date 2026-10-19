import Link from "next/link";
import { getCategoriasConConteo } from "@/lib/datos";
import s from "./FiltroCategorias.module.css";

/** Navegación por categorías del catálogo (enlaces reales, sin JavaScript). */
export function FiltroCategorias({ actual }: { actual?: string }) {
  const categorias = getCategoriasConConteo();
  const total = categorias.reduce((n, c) => Math.max(n, c.total), 0);
  return (
    <nav aria-label="Categorías" className={s.filtro}>
      <ul role="list">
        <li>
          <Link href="/coleccion" aria-current={!actual ? "page" : undefined}>
            Todo
          </Link>
        </li>
        {categorias.map((c) => (
          <li key={c.id}>
            <Link href={`/coleccion/${c.id}`} aria-current={actual === c.id ? "page" : undefined}>
              {c.nombre}
              {total > 0 ? <span className={s.conteo}>{c.total}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
