import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { IconoUbicacion } from "@/components/ui/Iconos";
import { RedesSociales } from "@/components/ui/RedesSociales";
import { sitio } from "@/config/sitio";
import s from "./Contacto.module.css";

export function Contacto() {
  const { ubicacion } = sitio;
  return (
    <section id="contacto" className={s.seccion} aria-labelledby="contacto-titulo">
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
          <p className={s.ubicacion} data-revelar style={{ "--orden": 4 } as React.CSSProperties}>
            <IconoUbicacion />
            {ubicacion.ciudad}, {ubicacion.departamento}, {ubicacion.pais}
          </p>
        </div>

        <div className={s.redes} data-revelar style={{ "--orden": 2 } as React.CSSProperties}>
          <p className="rotulo">Redes oficiales</p>
          <RedesSociales conUsuario />
        </div>
      </div>
    </section>
  );
}
