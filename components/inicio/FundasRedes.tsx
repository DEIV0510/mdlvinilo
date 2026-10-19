import Link from "next/link";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { IconoFlechaDiagonal, IconoInstagram, IconoTiktok } from "@/components/ui/Iconos";
import { sitio } from "@/config/sitio";
import { videoNovedades } from "@/content/videos";
import s from "./FundasRedes.module.css";
import { VideoRotacion } from "./VideoRotacion";

const fundas = [
  {
    id: "instagram",
    lado: "A",
    red: "Instagram",
    usuario: `@${sitio.redes.instagram.usuario}`,
    url: sitio.redes.instagram.url,
    Icono: IconoInstagram,
  },
  {
    id: "tiktok",
    lado: "B",
    red: "TikTok",
    usuario: `@${sitio.redes.tiktok.usuario}`,
    url: sitio.redes.tiktok.url,
    Icono: IconoTiktok,
  },
];

/**
 * Mientras no hay novedades publicadas en el sitio, las redes oficiales se
 * presentan como fundas de disco: el disco asoma y sale al pasar el cursor.
 * Si hay un video de la marca configurado, gira «en rotación» a su lado.
 * Solo enlaces reales a los perfiles verificados de la marca.
 */
export function FundasRedes() {
  return (
    <div className={videoNovedades ? `${s.bloque} ${s.conVideo}` : s.bloque}>
      {videoNovedades ? <VideoRotacion video={videoNovedades} /> : null}
      <ul className={s.fundas} role="list">
        {fundas.map(({ id, lado, red, usuario, url, Icono }, i) => (
          <li key={id} className={s.item} data-revelar style={{ "--orden": i } as React.CSSProperties}>
            <a href={url} target="_blank" rel="noopener noreferrer me" className={`${s.funda} oscuro`}>
              <span className={s.disco} aria-hidden="true">
                <span className={s.surcos} />
                <span className={s.brillo} />
                <span className={s.etiqueta}>
                  <Icono className={s.etiquetaIcono} />
                </span>
              </span>
              <span className={s.cara}>
                <span className={s.cabeza}>
                  <span className={s.lado}>Lado {lado}</span>
                  <span className={s.red}>{red}</span>
                </span>
                <span className={s.usuario}>{usuario}</span>
                <span className={s.pie}>
                  <span>Ver lanzamientos</span>
                  <IconoFlechaDiagonal className={s.flecha} />
                </span>
              </span>
              <span className="sr-only"> (se abre {red} en una pestaña nueva)</span>
            </a>
          </li>
        ))}
      </ul>

      <div className={s.lateral} data-revelar style={{ "--orden": 2 } as React.CSSProperties}>
        <p className={s.nota}>
          Cada lanzamiento sale <em>primero</em> en nuestras redes oficiales.
        </p>
        <div className={s.acciones}>
          <BotonConsulta
            variante="secundario"
            texto="Preguntar por lo nuevo"
            mensaje="Hola, quiero conocer las novedades y lanzamientos de MDL Vinilo Colombia."
          />
          <Link href="/coleccion" className={s.enlace}>
            Ver la colección
          </Link>
        </div>
      </div>
    </div>
  );
}
