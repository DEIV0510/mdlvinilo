import { NextResponse } from "next/server";
import { COOKIE_EDAD, EDAD_CONFIRMADA, EDAD_RECHAZADA, destinoSeguro } from "@/lib/edad";

/**
 * Recibe la respuesta del formulario de acceso (funciona sin JavaScript).
 * Guarda la declaración en una cookie de sesión HttpOnly y redirige.
 */
export async function POST(request: Request) {
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
  const ubicacion = confirmada ? destino : rechazada ? "/salida" : "/";

  // Location relativa: válida según RFC 9110 y no depende del host interno.
  const res = new NextResponse(null, {
    status: 303,
    headers: { Location: ubicacion, "Cache-Control": "no-store" },
  });

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
  return new NextResponse(null, { status: 303, headers: { Location: "/" } });
}
