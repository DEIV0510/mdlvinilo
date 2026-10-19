import { datosPendientes } from "@/config/sitio";
import { MOSTRAR_DEMO } from "@/lib/datos";

/**
 * Recordatorio visible SOLO en desarrollo (`next dev`): datos que faltan
 * antes de publicar y aviso de que hay contenido de ejemplo en pantalla.
 * En producción no se renderiza nada.
 */
export function AvisoPendientes() {
  if (process.env.NODE_ENV !== "development") return null;
  const faltan = datosPendientes();
  if (!faltan.length && !MOSTRAR_DEMO) return null;
  return (
    <details
      style={{
        position: "fixed",
        left: 12,
        bottom: 12,
        zIndex: 110,
        maxWidth: "min(92vw, 360px)",
        background: "#1a1711",
        border: "1px dashed #e8a818",
        color: "#f3ebdd",
        font: "12px/1.5 system-ui, sans-serif",
        padding: "8px 12px",
      }}
    >
      <summary style={{ cursor: "pointer", color: "#f5c542", fontWeight: 700 }}>
        Desarrollo: {faltan.length} datos pendientes{MOSTRAR_DEMO ? " · contenido de ejemplo visible" : ""}
      </summary>
      <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
        {faltan.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {MOSTRAR_DEMO ? (
        <p style={{ margin: "8px 0 0" }}>
          Los elementos marcados «Ejemplo» no aparecen en producción.
        </p>
      ) : null}
    </details>
  );
}
