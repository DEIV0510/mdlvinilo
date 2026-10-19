import { lookup, reverse } from "node:dns/promises";

/**
 * Verificación de rastreadores de buscadores (Googlebot, Bingbot).
 *
 * Google recomienda que, en sitios con acceso por edad, sus rastreadores
 * verificados vean el mismo contenido que un adulto que ya declaró su edad
 * (si no, solo se indexa la pantalla de acceso). La verificación sigue el
 * método oficial: DNS inverso del IP → dominio del buscador → DNS directo
 * que devuelva el mismo IP. Nunca se confía solo en el User-Agent.
 */
const UA_RASTREADOR = /\b(Googlebot|Google-InspectionTool|GoogleOther|bingbot)\b/i;
const DOMINIOS = [".googlebot.com", ".google.com", ".search.msn.com"];
const TTL_MS = 6 * 60 * 60 * 1000;
const TIEMPO_MAX_MS = 1500;
const MAX_ENTRADAS = 2000;
const cache = new Map<string, { ok: boolean; hasta: number }>();

export function pareceRastreador(userAgent: string | null): boolean {
  return Boolean(userAgent && UA_RASTREADOR.test(userAgent));
}

function conLimite<T>(p: Promise<T>): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rechazar) => setTimeout(() => rechazar(new Error("tiempo")), TIEMPO_MAX_MS)),
  ]);
}

async function verificarIp(ip: string): Promise<boolean> {
  try {
    const nombres = await conLimite(reverse(ip));
    const host = nombres.find((n) => DOMINIOS.some((d) => n.toLowerCase().endsWith(d)));
    if (!host) return false;
    const direcciones = await conLimite(lookup(host, { all: true }));
    return direcciones.some((d) => d.address === ip);
  } catch {
    return false;
  }
}

export async function esRastreadorVerificado(userAgent: string | null, ip: string | null): Promise<boolean> {
  if (!ip || !pareceRastreador(userAgent)) return false;
  const ahora = Date.now();
  const guardado = cache.get(ip);
  if (guardado && guardado.hasta > ahora) return guardado.ok;
  const ok = await verificarIp(ip);
  if (cache.size >= MAX_ENTRADAS) cache.clear();
  cache.set(ip, { ok, hasta: ahora + TTL_MS });
  return ok;
}

/**
 * IP real del visitante, tomada SOLO de una fuente que el cliente no puede
 * falsificar:
 * - En Vercel: `x-vercel-forwarded-for` (la fija la plataforma).
 * - En servidor propio: la cabecera indicada en MDL_CABECERA_IP (p. ej.
 *   `x-real-ip`, fijada por Nginx con `proxy_set_header X-Real-IP $remote_addr;`).
 * Sin una fuente de confianza devuelve null y el pase para buscadores queda
 * desactivado (todos ven la pantalla de acceso).
 */
export function ipCliente(cabeceras: Headers): string | null {
  if (process.env.VERCEL) {
    return cabeceras.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || null;
  }
  const nombre = process.env.MDL_CABECERA_IP?.trim().toLowerCase();
  if (!nombre) return null;
  return cabeceras.get(nombre)?.split(",")[0]?.trim() || null;
}
