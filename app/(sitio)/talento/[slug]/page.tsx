import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Foto } from "@/components/catalogo/Foto";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { mensajes } from "@/lib/contacto";
import { getPerfil, getTalento } from "@/lib/datos";
import { canonica } from "@/lib/seo";
import pagina from "../../pagina.module.css";
import s from "../talento.module.css";

export const dynamicParams = false;
// La vigencia de las autorizaciones se revisa al menos una vez al día.
export const revalidate = 86400;

export function generateStaticParams() {
  return getTalento().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPerfil((await params).slug);
  if (!p) return {};
  return {
    title: `${p.nombreArtistico} — Talento Vinilo`,
    description: p.presentacion ?? `${p.nombreArtistico}, talento vinculado a MDL Vinilo Colombia.`,
    alternates: canonica(`/talento/${p.slug}`),
    robots: p.demo ? { index: false, follow: false } : undefined,
  };
}

export default async function PerfilPagina({ params }: Props) {
  const p = getPerfil((await params).slug);
  if (!p) notFound();

  return (
    <div className={`contenedor ${pagina.pagina}`}>
      <nav aria-label="Ruta de navegación" className={pagina.migas}>
        <ol>
          <li>
            <Link href="/talento">Talento</Link>
          </li>
          <li aria-current="page">{p.nombreArtistico}</li>
        </ol>
      </nav>

      <div className={s.perfil}>
        <div className={s.retrato}>
          <Foto imagen={p.retrato} nombre={p.nombreArtistico} sizes="(max-width: 900px) 92vw, 45vw" proporcion="3 / 4" preload />
        </div>

        <div className={s.info}>
          {p.demo ? <span className="insignia-demo">Perfil de ejemplo — no publicar</span> : null}
          <p className="rotulo rotulo--oro">Talento Vinilo</p>
          <h1 className={`display ${s.nombre}`}>{p.nombreArtistico}</h1>
          {p.presentacion ? <p className={s.presentacion}>{p.presentacion}</p> : null}

          <BotonConsulta texto="Consultar servicios comerciales" mensaje={mensajes.talento(p.nombreArtistico)} />

          {p.proyectos?.length ? (
            <div className={s.bloque}>
              <h2 className="rotulo">Proyectos y campañas</h2>
              <ul>
                {p.proyectos.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {p.redes?.length ? (
            <div className={s.bloque}>
              <h2 className="rotulo">Redes profesionales</h2>
              <ul className={s.redes} role="list">
                {p.redes.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer nofollow">
                      {r.nombre}
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {p.galeria?.length ? (
            <div className={s.galeria}>
              {p.galeria.map((img) => (
                <Foto key={img.src} imagen={img} nombre={p.nombreArtistico} sizes="(max-width: 900px) 45vw, 22vw" proporcion="3 / 4" />
              ))}
            </div>
          ) : null}

          <p className={s.autorizacion}>
            {p.demo
              ? "Perfil de ejemplo para revisar el diseño: no representa a ninguna persona real."
              : "Perfil publicado con autorización de la modelo, vinculada comercialmente con MDL Vinilo Colombia. Para actualizarlo o retirarlo, escríbenos por los canales oficiales."}
          </p>
        </div>
      </div>
    </div>
  );
}
