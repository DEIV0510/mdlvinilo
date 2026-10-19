import type { ReactNode } from "react";
import { sitio } from "@/config/sitio";
import type { DocumentoLegal } from "@/content/legal/types";
import s from "./DocumentoLegal.module.css";

const valores: Record<string, { valor: string; etiqueta: string }> = {
  marca: { valor: sitio.marca, etiqueta: "marca" },
  razonSocial: { valor: sitio.empresa.razonSocial, etiqueta: "razón social" },
  nit: { valor: sitio.empresa.nit, etiqueta: "NIT" },
  correo: { valor: sitio.empresa.correo, etiqueta: "correo" },
  telefono: { valor: sitio.empresa.telefono, etiqueta: "teléfono" },
  direccion: { valor: sitio.empresa.direccion, etiqueta: "dirección" },
  ciudad: {
    valor: `${sitio.ubicacion.ciudad}, ${sitio.ubicacion.departamento}, ${sitio.ubicacion.pais}`,
    etiqueta: "ciudad",
  },
};

/** Sustituye {{marcadores}} por los datos de config/sitio.ts o los señala como pendientes. */
function conDatos(texto: string): ReactNode[] {
  return texto.split(/(\{\{\w+\}\})/g).map((parte, i) => {
    const m = parte.match(/^\{\{(\w+)\}\}$/);
    if (!m) return parte;
    const dato = valores[m[1]];
    if (dato?.valor) return dato.valor;
    return (
      <mark key={i} className="pendiente">
        [pendiente: {dato?.etiqueta ?? m[1]}]
      </mark>
    );
  });
}

function fecha(iso: string) {
  return new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeZone: "America/Bogota" }).format(
    new Date(`${iso}T12:00:00-05:00`),
  );
}

export function DocumentoLegalVista({ doc }: { doc: DocumentoLegal }) {
  return (
    <article className={s.documento}>
      <header className={s.cabecera}>
        <p className="rotulo rotulo--oro">Información legal</p>
        <h1 className={`display ${s.titulo}`}>{doc.titulo}</h1>
        <p className={s.resumen}>{doc.resumen}</p>
        <p className={s.fecha}>
          Última actualización: <time dateTime={doc.actualizado}>{fecha(doc.actualizado)}</time>
        </p>
        {doc.estado === "borrador" ? (
          <p className={s.borrador} role="note">
            <strong>Documento provisional.</strong> Este texto es un borrador pendiente de revisión jurídica y
            de los datos de la empresa. Los puntos marcados como pendientes aún no están definidos.
          </p>
        ) : null}
      </header>

      <nav aria-label="Contenido del documento" className={s.indice}>
        <ol>
          {doc.secciones.map((sec) => (
            <li key={sec.id}>
              <a href={`#${sec.id}`}>{sec.titulo}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={s.cuerpo}>
        {doc.secciones.map((sec, i) => (
          <section key={sec.id} id={sec.id} className={s.seccion} aria-labelledby={`${sec.id}-t`}>
            <h2 id={`${sec.id}-t`} className={s.subtitulo}>
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              {sec.titulo}
            </h2>
            {sec.bloques.map((b, j) => {
              if (b.tipo === "p") return <p key={j}>{conDatos(b.texto)}</p>;
              if (b.tipo === "lista")
                return (
                  <ul key={j}>
                    {b.items.map((it, k) => (
                      <li key={k}>{conDatos(it)}</li>
                    ))}
                  </ul>
                );
              return (
                <p key={j} className={s.pendiente}>
                  <span className={s.pendienteRotulo}>Pendiente</span>
                  {conDatos(b.texto)}
                </p>
              );
            })}
          </section>
        ))}
      </div>
    </article>
  );
}
