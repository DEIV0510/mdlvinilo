import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { mensajes } from "@/lib/contacto";
import s from "./CatalogoVacio.module.css";

/**
 * Estado honesto cuando no hay piezas publicadas: no aparenta un catálogo,
 * invita a consultar directamente la disponibilidad.
 */
export function CatalogoVacio({ categoria }: { categoria?: string }) {
  return (
    <div className={s.vacio}>
      <p className={`display ${s.titulo}`}>
        {categoria ? (
          <>
            {categoria}: <em>disponibilidad por consulta</em>
          </>
        ) : (
          <>
            Catálogo en línea <em>en preparación</em>
          </>
        )}
      </p>
      <p className={s.texto}>
        Las piezas se publicarán aquí con fotos reales. Mientras tanto, pregunta por la colección disponible y
        te compartimos opciones, tallas y precios.
      </p>
      <BotonConsulta
        texto="Consultar disponibilidad por {canal}"
        mensaje={categoria ? mensajes.categoria(categoria) : "Hola, quiero conocer la colección disponible de MDL Vinilo Colombia."}
      />
    </div>
  );
}
