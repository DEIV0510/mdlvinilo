import Link from "next/link";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { Logo, SIZES_LOGO_GRANDE } from "@/components/marca/Logo";
import { Boton } from "@/components/ui/Boton";
import { mensajes } from "@/lib/contacto";
import s from "./Heroe.module.css";

const indice = [
  { href: "/coleccion/lenceria", texto: "Lencería" },
  { href: "/coleccion/trajes", texto: "Trajes y prendas" },
  { href: "/coleccion/temporada", texto: "Temporada" },
  { href: "/#servicios", texto: "Audiovisual" },
];

export function Heroe() {
  return (
    <section className={s.heroe} aria-labelledby="heroe-titulo">
      <div className={s.fondo} aria-hidden="true" />

      <div className={s.rejilla}>
        <div className={s.visual}>
          <div className={s.disco} aria-hidden="true">
            <span className={s.surcos} />
            <span className={s.reflejo} />
          </div>
          <div className={s.logo}>
            <Logo sizes={SIZES_LOGO_GRANDE} preload data-lcp />
          </div>
        </div>

        <div className={s.texto}>
          <p className={`rotulo ${s.rotulo}`}>
            <span className={s.punto} aria-hidden="true" />
            Floridablanca · Santander · Colombia
          </p>
          <h1 id="heroe-titulo" className={`display ${s.titulo}`}>
            <span className={s.linea}>
              <span>El universo</span>
            </span>
            <span className={s.linea}>
              <span>
                <em className="metal">Vinilo</em>
              </span>
            </span>
          </h1>
          <p className={s.subtitulo}>Moda, imagen y experiencias audiovisuales con una identidad propia.</p>
          <div className={s.acciones}>
            <Boton href="/coleccion" flecha>
              Explorar colección
            </Boton>
            <Boton href="/#vinilo" variante="secundario">
              Conocer Vinilo
            </Boton>
          </div>
          <BotonConsulta
            variante="enlace"
            sinIcono
            mensaje={mensajes.servicio()}
            texto="Consultar servicios comerciales"
            className={s.discreto}
          />
        </div>
      </div>

      <nav className={s.indice} aria-label="Accesos rápidos">
        <ol role="list">
          {indice.map((it, i) => (
            <li key={it.href}>
              <Link href={it.href}>
                <span className={s.indiceNum}>{String(i + 1).padStart(2, "0")}</span>
                {it.texto}
              </Link>
            </li>
          ))}
        </ol>
        <a href="#novedades" className={s.bajar}>
          <span>Desliza</span>
          <span className={s.bajarLinea} aria-hidden="true" />
        </a>
      </nav>
    </section>
  );
}
