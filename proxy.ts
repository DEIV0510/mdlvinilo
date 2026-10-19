import { NextResponse, type NextRequest } from "next/server";
import { sitio } from "@/config/sitio";
import {
  CABECERA_DESTINO,
  COOKIE_EDAD,
  EDAD_CONFIRMADA,
  EDAD_RECHAZADA,
  destinoSeguro,
  esRutaPublica,
} from "@/lib/edad";
import { esRastreadorVerificado, ipCliente } from "@/lib/rastreadores";

/**
 * Control de acceso para mayores de 18 años (en el servidor).
 *
 * - Sin declaración: se muestra la pantalla de acceso EN LA MISMA URL
 *   (reescritura), también al entrar directamente a una ruta interna.
 * - Declaró ser mayor de edad: acceso normal durante la sesión.
 * - Eligió «Salir»: se muestra la página de salida durante la sesión.
 * - Rastreadores de Google/Bing verificados por DNS: ven el contenido
 *   (configurable en config/sitio.ts → seo.rastreadoresVerificados).
 *
 * Es una declaración del visitante, no una verificación de identidad.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (esRutaPublica(pathname)) return NextResponse.next();

  const estado = request.cookies.get(COOKIE_EDAD)?.value;

  if (pathname === "/acceso") {
    if (estado === EDAD_CONFIRMADA) {
      const destino = destinoSeguro(request.nextUrl.searchParams.get("destino"));
      return NextResponse.redirect(new URL(destino, request.url), 303);
    }
    return sinCache(NextResponse.next());
  }

  if (estado === EDAD_CONFIRMADA) return NextResponse.next();

  if (estado === EDAD_RECHAZADA) {
    return sinCache(NextResponse.rewrite(new URL("/salida", request.url)));
  }

  if (
    sitio.seo.rastreadoresVerificados &&
    (await esRastreadorVerificado(request.headers.get("user-agent"), ipCliente(request.headers)))
  ) {
    return sinCache(NextResponse.next());
  }

  const cabeceras = new Headers(request.headers);
  cabeceras.set(CABECERA_DESTINO, destinoSeguro(`${pathname}${search}`));
  return sinCache(
    NextResponse.rewrite(new URL("/acceso", request.url), { request: { headers: cabeceras } }),
  );
}

/** Las respuestas que dependen de la cookie nunca deben guardarse en cachés compartidas. */
function sinCache(res: NextResponse) {
  res.headers.set("Cache-Control", "private, no-store, max-age=0");
  res.headers.set("Vary", "Cookie");
  return res;
}

export const config = {
  matcher: [
    // Todo excepto recursos estáticos, imágenes optimizadas y archivos con extensión
    // (favicon, iconos, robots.txt, sitemap.xml, imagen para redes, /brand/*).
    "/((?!_next/static|_next/image|.*\\..*).*)",
  ],
};
