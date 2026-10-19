import s from "./Lamina.module.css";

/**
 * Lámina tipográfica que ocupa el lugar de una fotografía cuando aún no
 * existe (o no carga). Nunca simula una foto: muestra la inicial del
 * nombre y un rótulo honesto.
 */
export function Lamina({
  nombre,
  rotulo = "Fotografía próximamente",
  proporcion = "4 / 5",
  className,
}: {
  nombre: string;
  rotulo?: string;
  proporcion?: string;
  className?: string;
}) {
  const primera = nombre.trim().charAt(0);
  // Sin letra inicial utilizable, se usa la «V» de Vinilo.
  const inicial = /[a-záéíóúñ]/i.test(primera) ? primera : "V";
  return (
    <div className={`${s.lamina} oscuro ${className ?? ""}`} style={{ aspectRatio: proporcion }} role="img" aria-label={`${nombre}: ${rotulo.toLowerCase()}`}>
      <span className={s.surcos} aria-hidden="true" />
      <span className={`display ${s.inicial}`} aria-hidden="true">
        {inicial.toUpperCase()}
      </span>
      <span className={s.rotulo} aria-hidden="true">
        {rotulo}
      </span>
    </div>
  );
}
