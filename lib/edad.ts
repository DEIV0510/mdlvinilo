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

const ORIGEN_INTERNO = "http://interno.invalid";

/**
 * Evita redirecciones abiertas: solo rutas internas del propio sitio.
 * Se interpreta como lo haría el navegador (new URL) y se exige que el
 * resultado siga en el mismo origen; se rechazan caracteres de control
 * (tabuladores, saltos de línea) y barras invertidas.
 */
export function destinoSeguro(valor: unknown): string {
  if (typeof valor !== "string" || valor.length === 0 || valor.length > 512) return "/";
  if (!valor.startsWith("/") || /[\u0000-\u001F\u007F\\]/.test(valor)) return "/";
  let url: URL;
  try {
    url = new URL(valor, ORIGEN_INTERNO);
  } catch {
    return "/";
  }
  if (url.origin !== ORIGEN_INTERNO) return "/";
  const ruta = `${url.pathname}${url.search}`;
  if (ruta.startsWith("//") || /^\/(acceso|salida|api)(\/|\?|$)/.test(ruta)) return "/";
  return ruta;
}
