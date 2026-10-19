import { NextResponse } from "next/server";
import { COOKIE_EDAD, EDAD_CONFIRMADA, EDAD_RECHAZADA, destinoSeguro } from "@/lib/edad";

function redirigir(ubicacion: string) {
  // Location relativa: válida según RFC 9110 y no depende del host interno.
  return new NextResponse(null, {
    status: 303,
    headers: { Location: ubicacion, "Cache-Control": "no-store" },
  });
}

/** Solo se aceptan envíos desde el propio sitio (evita que otra web fije la cookie). */
function esMismoSitio(request: Request): boolean {
  const sfs = request.headers.get("sec-fetch-site");
  if (sfs) return sfs === "same-origin" || sfs === "none";
  const origen = request.headers.get("origin");
  if (!origen) return true; // navegadores antiguos sin Origin en formularios
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origen).host === host;
  } catch {
    return false;
  }
}

/**
 * Recibe la respuesta del formulario de acceso (funciona sin JavaScript).
 * Guarda la declaración en una cookie de sesión HttpOnly y redirige.
 */
export async function POST(request: Request) {
  if (!esMismoSitio(request)) return redirigir("/");

  // Quien eligió «Salir» no puede cambiar la respuesta durante la sesión.
  const actual = request.headers.get("cookie")?.match(/(?:^|;\s*)mdl_edad=([^;]+)/)?.[1];
  if (actual === EDAD_RECHAZADA) return redirigir("/salida");

  let decision: FormDataEntryValue | null = null;
  let destino = "/";
  try {
    const datos = await request.formData();
    decision = datos.get("decision");
    destino = destinoSeguro(datos.get("destino"));
  } catch {
    /* formulario inválido: se trata como sin decisión */
  }

  const confirmada = decision === "si";
  const rechazada = decision === "no";
  const res = redirigir(confirmada ? destino : rechazada ? "/salida" : "/");

  if (confirmada || rechazada) {
    res.cookies.set(COOKIE_EDAD, confirmada ? EDAD_CONFIRMADA : EDAD_RECHAZADA, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      // Sin maxAge ni expires: cookie de sesión (se borra al cerrar el navegador).
    });
  }
  return res;
}

export function GET() {
  return redirigir("/");
}
