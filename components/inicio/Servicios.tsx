import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { Encabezado } from "@/components/ui/Encabezado";
import { mensajes } from "@/lib/contacto";
import { getServicios } from "@/lib/datos";
import { indice } from "@/lib/formato";
import { Visor } from "./Visor";
import s from "./Servicios.module.css";

export function Servicios() {
  const servicios = getServicios();

  return (
    <section id="servicios" className={`${s.seccion} oscuro`} aria-labelledby="servicios-titulo">
      <div className="contenedor">
        <Encabezado
          id="servicios-titulo"
          numero="04"
          rotulo="Servicios audiovisuales y publicitarios"
          titulo={
            <>
              Producción y <em>promoción</em>
            </>
          }
          entrada="Producción de contenido, marketing y promoción comercial con la dirección de arte de la casa."
        />

        <div className={s.rejilla}>
          <Visor nombres={servicios.map((x) => x.nombre)} />

          <ol className={s.lista} role="list">
            {servicios.map((sv, i) => (
              <li
                key={sv.id}
                className={s.item}
                data-servicio={i}
                data-revelar
                style={{ "--orden": i } as React.CSSProperties}
              >
                <span className={s.num}>{indice(i + 1)}</span>
                <div className={s.cuerpo}>
                  <h3 className={`display ${s.nombre}`}>{sv.nombre}</h3>
                  <p className={s.linea}>{sv.linea}</p>
                  <BotonConsulta
                    variante="enlace"
                    texto="Consultar este servicio"
                    mensaje={mensajes.servicio(sv.nombre)}
                    ariaLabel={`Consultar este servicio: ${sv.nombre}`}
                    className={s.consultar}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={s.cierre} data-revelar>
          <p className={s.cierreTexto}>
            Cuéntanos tu proyecto y te respondemos con una <em>propuesta</em>.
          </p>
          <BotonConsulta texto="Consultar servicios" mensaje={mensajes.servicio()} />
        </div>
      </div>
    </section>
  );
}
