/**
 * Declaración de mayoría de edad.
 *
 * IMPORTANTE: esto es una DECLARACIÓN del visitante, no una verificación de
 * identidad. Se guarda en una cookie de sesión estrictamente necesaria,
 * HttpOnly, que el servidor comprueba en cada ruta (proxy.ts), de modo que
 * funciona aunque JavaScript esté desactivado y al entrar directamente a
 * cualquier dirección interna.
 */
export const COOKIE_EDAD = "mdl_edad";
export const EDAD_CONFIRMADA = "si";
export const EDAD_RECHAZADA = "no";

/** Cabecera interna con la ruta original cuando el proxy muestra el acceso. */
export const CABECERA_DESTINO = "x-mdl-destino";

/** Rutas visibles sin declarar la edad (información legal y salida). */
export const RUTAS_PUBLICAS = ["/legal", "/salida", "/api/edad"];

export function esRutaPublica(pathname: string): boolean {
  return RUTAS_PUBLICAS.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

/**
 * Evita redirecciones abiertas: solo rutas internas relativas.
 */
export function destinoSeguro(valor: unknown): string {
  if (typeof valor !== "string") return "/";
  const v = valor.trim();
  if (!v.startsWith("/") || v.startsWith("//") || v.includes("\\") || /[\r\n]/.test(v)) return "/";
  if (v.startsWith("/acceso") || v.startsWith("/salida") || v.startsWith("/api/")) return "/";
  return v.length > 512 ? "/" : v;
}
