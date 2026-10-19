import Link from "next/link";
import { Foto } from "@/components/catalogo/Foto";
import type { PerfilTalento } from "@/content/tipos";
import s from "./TarjetaTalento.module.css";

export function TarjetaTalento({
  perfil: p,
  numero,
  sizes = "(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 30vw",
  nivelTitulo = 3,
}: {
  perfil: PerfilTalento;
  numero: string;
  sizes?: string;
  nivelTitulo?: 2 | 3;
}) {
  const H = nivelTitulo === 2 ? "h2" : "h3";
  return (
    <article className={s.tarjeta}>
      <Link href={`/talento/${p.slug}`} className={s.enlace}>
        <div className={s.retrato}>
          <Foto imagen={p.retrato} nombre={p.nombreArtistico} sizes={sizes} proporcion="3 / 4" />
          <span className={s.velo} aria-hidden="true" />
        </div>
        <div className={s.pie}>
          <span className={s.numero}>{numero}</span>
          <H className={`display ${s.nombre}`}>{p.nombreArtistico}</H>
          {p.presentacion ? <p className={s.presentacion}>{p.presentacion}</p> : null}
          <span className={s.ver}>Ver perfil</span>
        </div>
      </Link>
      {p.demo ? <span className={`insignia-demo ${s.demo}`}>Perfil de ejemplo</span> : null}
    </article>
  );
}
