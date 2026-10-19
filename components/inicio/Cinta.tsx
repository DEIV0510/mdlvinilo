import s from "./Cinta.module.css";

const palabras = [
  "Lencería",
  "Trajes y prendas",
  "Temporada",
  "Lanzamientos",
  "Producción audiovisual",
  "Promoción comercial",
];

/** Cinta tipográfica en movimiento lento. Estática con movimiento reducido. */
export function Cinta() {
  const grupo = (oculto: boolean) => (
    <ul className={s.grupo} role="list" aria-hidden={oculto || undefined}>
      {palabras.map((p, i) => (
        <li key={p} className={i % 2 ? s.cursiva : undefined}>
          {p}
          <svg className={s.rombo} viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 0 10 5 5 10 0 5Z" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={s.cinta}>
      <p className="sr-only">Lencería, trajes y prendas, temporada, lanzamientos, producción audiovisual y promoción comercial.</p>
      <div className={s.pista} aria-hidden="true">
        {grupo(true)}
        {grupo(true)}
      </div>
    </div>
  );
}
