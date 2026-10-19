import { IndiceCategorias } from "@/components/catalogo/IndiceCategorias";
import { RejillaProductos } from "@/components/catalogo/RejillaProductos";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { Boton } from "@/components/ui/Boton";
import { Encabezado } from "@/components/ui/Encabezado";
import { getDestacados, getProductos } from "@/lib/datos";
import s from "./Coleccion.module.css";

export function Coleccion() {
  const destacados = getDestacados(3);
  const total = getProductos().length;

  return (
    <section id="coleccion" className={s.seccion} aria-labelledby="coleccion-titulo">
      <div className="contenedor">
        <Encabezado
          id="coleccion-titulo"
          numero="02"
          rotulo="Colección y tienda"
          titulo={
            <>
              La <em>colección</em>
            </>
          }
          entrada="Lencería, trajes y piezas de temporada. Elige, arma tu selección y confirma disponibilidad directamente con el equipo."
          accion={
            total > 0 ? (
              <Boton href="/coleccion" variante="secundario" flecha>
                Ver toda la colección
              </Boton>
            ) : (
              <BotonConsulta variante="secundario" texto="Consultar la colección por {canal}" />
            )
          }
        />

        <IndiceCategorias />

        {destacados.length > 0 ? (
          <div className={s.destacados}>
            <div className={s.destacadosCabecera} data-revelar>
              <p className="rotulo rotulo--oro">Selección destacada</p>
              <Boton href="/coleccion" variante="enlace" flecha>
                Ver las {total} piezas
              </Boton>
            </div>
            <RejillaProductos productos={destacados} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
