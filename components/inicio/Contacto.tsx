import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { IconoInstagram, IconoUbicacion, IconoWhatsapp } from "@/components/ui/Iconos";
import { RedesSociales } from "@/components/ui/RedesSociales";
import { sitio } from "@/config/sitio";
import { canalConsulta, hayWhatsapp, numeroVisible, viaTalento } from "@/lib/contacto";
import s from "./Contacto.module.css";

export function Contacto() {
  const { ubicacion } = sitio;
  return (
    <section id="contacto" className={`${s.seccion} oscuro`} aria-labelledby="contacto-titulo">
      <div className={`contenedor ${s.rejilla}`}>
        <div className={s.principal}>
          <div className={s.meta} data-revelar>
            <span className={s.numero}>06</span>
            <span className={s.raya} aria-hidden="true" />
            <span className="rotulo rotulo--oro">Contacto</span>
          </div>
          <h2 id="contacto-titulo" className={`display ${s.titulo}`} data-revelar style={{ "--orden": 1 } as React.CSSProperties}>
            <em className="metal">Hablemos</em>
          </h2>
          <p className={s.entrada} data-revelar style={{ "--orden": 2 } as React.CSSProperties}>
            Pedidos, disponibilidad, colaboraciones y servicios comerciales. Escríbenos y te respondemos
            directamente.
          </p>
          <div className={s.cta} data-revelar style={{ "--orden": 3 } as React.CSSProperties}>
            <BotonConsulta texto="Escribir por {canal}" />
          </div>

          {hayWhatsapp() ? (
            <ul className={s.canales} role="list" data-revelar style={{ "--orden": 4 } as React.CSSProperties}>
              <li>
                <a href={canalConsulta().href} target="_blank" rel="noopener noreferrer" className={s.canal}>
                  <span className={s.canalRed}>
                    <IconoWhatsapp /> WhatsApp
                  </span>
                  <span className={s.canalDato}>{numeroVisible()}</span>
                  <span className={s.canalUso}>Pedidos, disponibilidad y servicios</span>
                  <span className="sr-only"> (se abre WhatsApp en una pestaña nueva)</span>
                </a>
              </li>
              <li>
                <a href={sitio.redes.instagram.chat} target="_blank" rel="noopener noreferrer" className={s.canal}>
                  <span className={s.canalRed}>
                    <IconoInstagram /> Instagram
                  </span>
                  <span className={`${s.canalDato} ${s.canalCursiva}`}>@{sitio.redes.instagram.usuario}</span>
                  <span className={s.canalUso}>
                    {viaTalento === "instagram" ? "Campañas, talento y colaboraciones" : "Mensaje directo"}
                  </span>
                  <span className="sr-only"> (se abre Instagram en una pestaña nueva)</span>
                </a>
              </li>
            </ul>
          ) : null}

          <p className={s.ubicacion} data-revelar style={{ "--orden": 5 } as React.CSSProperties}>
            <IconoUbicacion />
            {ubicacion.ciudad}, {ubicacion.departamento}, {ubicacion.pais}
          </p>
        </div>

        <div className={s.redes} data-revelar style={{ "--orden": 2 } as React.CSSProperties}>
          <h3 className="rotulo">Redes oficiales</h3>
          <RedesSociales conUsuario />
        </div>
      </div>
    </section>
  );
}
