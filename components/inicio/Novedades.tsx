import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { Foto } from "@/components/catalogo/Foto";
import { Boton } from "@/components/ui/Boton";
import { Encabezado } from "@/components/ui/Encabezado";
import type { Novedad } from "@/content/tipos";
import { mensajes } from "@/lib/contacto";
import { getNovedades, getProducto } from "@/lib/datos";
import { indice } from "@/lib/formato";
import { FundasRedes } from "./FundasRedes";
import s from "./Novedades.module.css";

function Acciones({ n }: { n: Novedad }) {
  return (
    <div className={s.acciones}>
      {n.productoSlug && getProducto(n.productoSlug) ? (
        <Boton href={`/producto/${n.productoSlug}`} variante="enlace" flecha>
          Ver la pieza
        </Boton>
      ) : null}
      <BotonConsulta variante="enlace" texto="Consultar" mensaje={mensajes.novedad(n.titulo)} ariaLabel={`Consultar ${n.titulo}`} />
    </div>
  );
}

export function Novedades() {
  const lista = getNovedades();
  const [portada, ...resto] = lista;

  return (
    <section id="novedades" className={`${s.seccion} claro`} aria-labelledby="novedades-titulo">
      <div className="contenedor">
        <Encabezado
          id="novedades-titulo"
          numero="01"
          rotulo="Novedades"
          titulo={
            <>
              Lo nuevo en <em>Vinilo</em>
            </>
          }
          entrada="Lanzamientos, colecciones de temporada y piezas destacadas."
        />

        {portada ? (
          <>
            <article className={s.portada}>
              <div className={s.portadaImagen} data-revelar="imagen">
                <Foto imagen={portada.imagen} nombre={portada.titulo} sizes="(max-width: 900px) 92vw, 56vw" />
              </div>
              <div className={s.portadaTexto} data-revelar>
                <p className={s.numero}>N.º {indice(1)}</p>
                <div className={s.marcas}>
                  {portada.demo ? <span className="insignia-demo">Ejemplo</span> : null}
                  {portada.etiqueta ? <span className="rotulo rotulo--oro">{portada.etiqueta}</span> : null}
                </div>
                <h3 className={`display ${s.portadaTitulo}`}>{portada.titulo}</h3>
                <p className={s.descripcion}>{portada.descripcion}</p>
                <Acciones n={portada} />
              </div>
            </article>

            {resto.length ? (
              <ol className={s.lista} role="list">
                {resto.slice(0, 3).map((n, i) => (
                  <li key={n.slug} className={s.item} data-revelar style={{ "--orden": i } as React.CSSProperties}>
                    <div className={s.itemImagen}>
                      <Foto imagen={n.imagen} nombre={n.titulo} sizes="(max-width: 900px) 70vw, 22vw" />
                    </div>
                    <div className={s.itemTexto}>
                      <p className={s.numero}>N.º {indice(i + 2)}</p>
                      <div className={s.marcas}>
                        {n.demo ? <span className="insignia-demo">Ejemplo</span> : null}
                        {n.etiqueta ? <span className="rotulo rotulo--oro">{n.etiqueta}</span> : null}
                      </div>
                      <h3 className={s.itemTitulo}>{n.titulo}</h3>
                      <p className={s.descripcion}>{n.descripcion}</p>
                      <Acciones n={n} />
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}
          </>
        ) : (
          <FundasRedes />
        )}
      </div>
    </section>
  );
}
