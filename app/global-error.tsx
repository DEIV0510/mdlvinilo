"use client";

/**
 * Último recurso si falla el layout raíz. No recibe los estilos globales,
 * por eso usa estilos en línea mínimos.
 */
export default function ErrorGlobal({ retry }: { error: unknown; reset: () => void; retry: () => void }) {
  return (
    <html lang="es-CO">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#000",
          color: "#f3ebdd",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <title>MDL Vinilo Colombia</title>
        <div>
          <h1 style={{ fontWeight: 400, fontSize: 36, margin: "0 0 12px" }}>Algo no cargó como esperábamos</h1>
          <p style={{ color: "#bdb4a4", margin: "0 0 24px" }}>Intenta de nuevo en unos segundos.</p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              background: "#edb12a",
              color: "#140c00",
              border: 0,
              padding: "14px 24px",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
