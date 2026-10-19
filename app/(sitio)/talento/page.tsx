import type { Metadata } from "next";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { TarjetaTalento } from "@/components/talento/TarjetaTalento";
import { Encabezado } from "@/components/ui/Encabezado";
import { mensajes, viaTalento } from "@/lib/contacto";
import { getTalento } from "@/lib/datos";
import { indice } from "@/lib/formato";
import { canonica } from "@/lib/seo";
import pagina from "../pagina.module.css";
import s from "./talento.module.css";

// La vigencia de las autorizaciones se revisa cada hora.
export const revalidate = 3600;

// Mientras no haya contenido publicado, la página no se indexa (evita páginas vacías en buscadores).
export const metadata: Metadata = {
  title: "Talento Vinilo",
  description:
    "Modelos adultas con vínculo comercial formal con MDL Vinilo Colombia. Perfiles publicados con autorización. Consultas para campañas y colaboraciones.",
  alternates: canonica("/talento"),
  ...(getTalento().length ? {} : { robots: { index: false, follow: true } }),
};

export default function TalentoPagina() {
  const perfiles = getTalento();
  return (
    <div className={`contenedor ${pagina.pagina}`}>
      <Encabezado
        nivel={1}
        numero="03"
        rotulo="Talento Vinilo"
        titulo={
          <>
            Talento <em>vinculado</em>
          </>
        }
        entrada="No es un directorio abierto: aquí aparecen únicamente modelos adultas con vínculo comercial formal con la marca y autorización expresa para publicar su imagen."
        accion={<BotonConsulta variante="secundario" texto="Consultar campañas y colaboraciones" mensaje={mensajes.talento()} via={viaTalento} />}
      />

      {perfiles.length ? (
        <ul className={s.rejilla} role="list">
          {perfiles.map((p, i) => (
            <li key={p.slug} data-revelar={i >= 3 ? "" : undefined} style={{ "--orden": i % 3 } as React.CSSProperties}>
              <TarjetaTalento perfil={p} numero={indice(i + 1)} nivelTitulo={2} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={s.vacio}>
          <p className={`display ${s.vacioTitulo}`}>
            Perfiles en <em>preparación</em>
          </p>
          <p className={s.vacioTexto}>
            Estamos preparando los perfiles autorizados. Para campañas, colaboraciones o promoción comercial,
            escríbenos.
          </p>
          <BotonConsulta texto="Consultar campañas y colaboraciones" mensaje={mensajes.talento()} via={viaTalento} />
        </div>
      )}

      <p className={s.aviso}>
        ¿Apareces en este sitio y quieres actualizar o retirar tu perfil? Escríbenos por los canales
        oficiales y lo atenderemos.
      </p>
    </div>
  );
}
