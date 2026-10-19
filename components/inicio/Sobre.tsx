import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { Boton } from "@/components/ui/Boton";
import { sitio } from "@/config/sitio";
import { indice } from "@/lib/formato";
import s from "./Sobre.module.css";

export function Sobre() {
  const { trayectoria, ubicacion } = sitio;
  const datos = [
    { valor: indice(trayectoria.aniosFuncionando), texto: "años de trayectoria (aprox.)" },
    { valor: indice(trayectoria.aniosConstituida), texto: "años de constitución legal" },
    { valor: indice(trayectoria.socios), texto: "socios al frente" },
  ];

  return (
    <section id="vinilo" className={s.seccion} aria-labelledby="vinilo-titulo">
      <span className={s.fondoPalabra} aria-hidden="true">
        Vinilo
      </span>
      <div className={`contenedor ${s.rejilla}`}>
        <div className={s.texto}>
          <div className={s.meta} data-revelar>
            <span className={s.numero}>05</span>
            <span className={s.raya} aria-hidden="true" />
            <span className="rotulo rotulo--oro">Sobre Vinilo</span>
          </div>
          <h2 id="vinilo-titulo" className={`display ${s.titulo}`} data-revelar style={{ "--orden": 1 } as React.CSSProperties}>
            Creatividad con <em>identidad propia</em>
          </h2>
          <div className={s.parrafos} data-revelar style={{ "--orden": 2 } as React.CSSProperties}>
            <p>
              Una marca construida a partir de la creatividad, la producción audiovisual y el desarrollo de
              oportunidades comerciales.
            </p>
            <p>
              Desde {ubicacion.ciudad}, {ubicacion.departamento}, conectamos imagen, talento y productos a
              través de una identidad propia.
            </p>
          </div>
          <div className={s.acciones} data-revelar style={{ "--orden": 3 } as React.CSSProperties}>
            <Boton href="/coleccion" flecha>
              Explorar colección
            </Boton>
            <BotonConsulta variante="enlace" texto="Hablar con el equipo" sinIcono />
          </div>
        </div>

        <dl className={s.datos}>
          {datos.map((d, i) => (
            <div key={d.texto} className={s.dato} data-revelar style={{ "--orden": i } as React.CSSProperties}>
              <dt className={s.datoTexto}>{d.texto}</dt>
              <dd className={`display metal ${s.datoValor}`}>{d.valor}</dd>
            </div>
          ))}
          <div className={`${s.dato} ${s.lugar}`} data-revelar style={{ "--orden": 3 } as React.CSSProperties}>
            <dt className={s.datoTexto}>
              {ubicacion.departamento}, {ubicacion.pais}
            </dt>
            <dd className={`display ${s.datoValor} ${s.ciudad}`}>{ubicacion.ciudad}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
