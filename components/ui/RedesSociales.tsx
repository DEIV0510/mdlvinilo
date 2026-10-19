import { redesOficiales, type RedOficial } from "@/lib/contacto";
import { IconoEnlace, IconoFacebook, IconoInstagram, IconoTiktok } from "./Iconos";
import s from "./RedesSociales.module.css";

const iconos: Record<RedOficial["id"], typeof IconoInstagram> = {
  instagram: IconoInstagram,
  tiktok: IconoTiktok,
  facebook: IconoFacebook,
  otra: IconoEnlace,
};

/**
 * Enlaces a las redes oficiales configuradas en config/sitio.ts.
 * Las redes sin URL no se muestran.
 */
export function RedesSociales({
  conUsuario = false,
  className,
}: {
  conUsuario?: boolean;
  className?: string;
}) {
  const redes = redesOficiales();
  return (
    <ul className={`${s.redes} ${conUsuario ? s.conUsuario : ""} ${className ?? ""}`} role="list">
      {redes.map((r) => {
        const Icono = iconos[r.id];
        return (
          <li key={r.id}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer me"
              className={s.red}
              aria-label={conUsuario ? undefined : `${r.nombre} de MDL Vinilo Colombia (se abre en una pestaña nueva)`}
            >
              <Icono className={s.icono} />
              {conUsuario ? (
                <span className={s.texto}>
                  <span className={s.nombre}>{r.nombre}</span>
                  {r.usuario ? <span className={s.usuario}>{r.usuario}</span> : null}
                  <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
