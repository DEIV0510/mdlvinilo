import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { Logo, SIZES_LOGO_GRANDE } from "@/components/marca/Logo";
import { clasesBoton } from "@/components/ui/Boton";
import { categoriaPorId } from "@/content/categorias";
import { getPerfil, getProducto } from "@/lib/datos";
import { CABECERA_DESTINO, destinoSeguro } from "@/lib/edad";
import s from "./acceso.module.css";

const DESCRIPCION_BASE =
  "MDL Vinilo Colombia: lencería, trajes y colecciones de temporada, producción audiovisual y promoción comercial desde Floridablanca, Santander. Sitio exclusivo para mayores de 18 años.";

/**
 * Las vistas previas de enlaces (WhatsApp, Instagram, X…) reciben esta
 * pantalla: se usa el nombre del destino compartido (producto, categoría o
 * perfil) para que la vista previa sea útil, sin exponer más contenido.
 */
export async function generateMetadata(): Promise<Metadata> {
  const destino = destinoSeguro((await headers()).get(CABECERA_DESTINO) ?? "/");
  const [ruta] = destino.split("?");
  const partes = ruta.split("/").filter(Boolean);
  let titulo = "";
  if (partes[0] === "producto" && partes[1]) titulo = getProducto(partes[1])?.nombre ?? "";
  else if (partes[0] === "coleccion" && partes[1]) titulo = categoriaPorId(partes[1])?.nombre ?? "";
  else if (partes[0] === "coleccion") titulo = "Colección";
  else if (partes[0] === "talento" && partes[1]) titulo = getPerfil(partes[1])?.nombreArtistico ?? "";
  else if (partes[0] === "talento") titulo = "Talento Vinilo";

  const completo = titulo ? `${titulo} · MDL Vinilo Colombia` : "MDL Vinilo Colombia — El universo Vinilo";
  return {
    title: { absolute: titulo ? `${completo} (18+)` : "MDL Vinilo Colombia — Acceso para mayores de 18 años" },
    description: DESCRIPCION_BASE,
    openGraph: { title: completo, description: DESCRIPCION_BASE },
    twitter: { title: completo, description: DESCRIPCION_BASE },
  };
}

export default async function Acceso({
  searchParams,
}: {
  searchParams: Promise<{ destino?: string | string[] }>;
}) {
  const cabeceras = await headers();
  const parametros = await searchParams;
  const desdeQuery = Array.isArray(parametros.destino) ? parametros.destino[0] : parametros.destino;
  const destino = destinoSeguro(cabeceras.get(CABECERA_DESTINO) ?? desdeQuery ?? "/");

  return (
    <main className={s.acceso}>
      <div className={s.luz} aria-hidden="true" />
      <div className={s.disco} aria-hidden="true" />

      <div className={s.caja}>
        <div className={s.logo}>
          <Logo sizes={SIZES_LOGO_GRANDE} preload />
          <span className={s.destello} aria-hidden="true" />
        </div>

        <p className={`rotulo rotulo--oro ${s.marca}`}>MDL Vinilo Colombia</p>

        <h1 className={`display ${s.titulo}`}>
          Contenido exclusivo para <em>mayores de 18 años</em>
        </h1>

        <p className={s.texto}>
          Este sitio contiene información comercial relacionada con productos de lencería, entretenimiento
          para adultos y servicios audiovisuales.
        </p>

        <form method="post" action="/api/edad" className={s.formulario}>
          <fieldset className={s.grupo}>
            <legend className={s.pregunta}>¿Confirmas que tienes 18 años o más?</legend>
            <input type="hidden" name="destino" value={destino} />
            <div className={s.botones}>
              <button type="submit" name="decision" value="si" className={clasesBoton("principal")}>
                <span>Sí, soy mayor de edad</span>
              </button>
              <button type="submit" name="decision" value="no" className={clasesBoton("secundario")}>
                <span>Salir</span>
              </button>
            </div>
          </fieldset>
        </form>

        <p className={s.nota}>
          Al ingresar declaras, bajo tu responsabilidad, ser mayor de edad. Esta declaración no es una
          verificación de identidad. Tu respuesta se guarda en una cookie técnica solo durante esta sesión.
        </p>

        <nav aria-label="Información legal" className={s.legal}>
          <Link href="/legal/terminos">Términos</Link>
          <Link href="/legal/privacidad">Privacidad</Link>
          <Link href="/legal/cookies">Cookies</Link>
        </nav>
      </div>
    </main>
  );
}
