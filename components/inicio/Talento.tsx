import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { TarjetaTalento } from "@/components/talento/TarjetaTalento";
import { Boton } from "@/components/ui/Boton";
import { Encabezado } from "@/components/ui/Encabezado";
import { mensajes } from "@/lib/contacto";
import { getTalento } from "@/lib/datos";
import { indice } from "@/lib/formato";
import s from "./Talento.module.css";

export function Talento() {
  const perfiles = getTalento();

  return (
    <section id="talento" className={s.seccion} aria-labelledby="talento-titulo">
      <div className="contenedor">
        <Encabezado
          id="talento-titulo"
          numero="03"
          rotulo="Talento Vinilo"
          titulo={
            <>
              Talento <em>vinculado</em>
            </>
          }
          entrada="Modelos adultas con vínculo comercial formal con MDL Vinilo Colombia. Cada perfil se publica únicamente con su autorización."
          accion={
            perfiles.length ? (
              <Boton href="/talento" variante="secundario" flecha>
                Ver todo el talento
              </Boton>
            ) : null
          }
        />

        {perfiles.length ? (
          <ul className={s.rejilla} role="list">
            {perfiles.slice(0, 3).map((p, i) => (
              <li key={p.slug} className={s.celda} data-revelar style={{ "--orden": i } as React.CSSProperties}>
                <TarjetaTalento perfil={p} numero={indice(i + 1)} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.preparacion} data-revelar>
            <p className={`display ${s.preparacionTitulo}`}>
              Perfiles en <em>preparación</em>
            </p>
            <p className={s.preparacionTexto}>
              Publicamos solo talento con vínculo comercial y autorización expresa. Para campañas,
              colaboraciones o promoción comercial, escríbenos.
            </p>
            <BotonConsulta variante="secundario" texto="Consultar campañas y colaboraciones" mensaje={mensajes.talento()} />
          </div>
        )}

        {perfiles.length ? (
          <div className={s.cierre} data-revelar>
            <p>¿Una campaña, una colaboración o una promoción comercial?</p>
            <BotonConsulta variante="principal" texto="Consultar campañas y colaboraciones" mensaje={mensajes.talento()} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
