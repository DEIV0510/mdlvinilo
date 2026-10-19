import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/marca/Logo";
import { clasesBoton } from "@/components/ui/Boton";
import s from "./salida.module.css";

export const metadata: Metadata = {
  title: "Salida",
  robots: { index: false, follow: false },
};

/**
 * Página de salida: se muestra a quien indicó no ser mayor de edad y se
 * mantiene durante la sesión para cualquier ruta del sitio.
 */
export default function Salida() {
  return (
    <main className={s.salida}>
      <div className={s.caja}>
        <Logo sizes="200px" className={s.logo} />
        <h1 className={`display ${s.titulo}`}>
          Este sitio es solo para <em>mayores de edad</em>
        </h1>
        <p className={s.texto}>
          Gracias por tu sinceridad. El contenido de MDL Vinilo Colombia está reservado para personas de 18
          años o más.
        </p>
        <a href="https://www.google.com/" className={clasesBoton("secundario")} rel="noopener noreferrer">
          <span>Salir del sitio</span>
        </a>
        <nav aria-label="Información legal" className={s.legal}>
          <Link href="/legal/privacidad">Privacidad</Link>
          <Link href="/legal/terminos">Términos</Link>
          <Link href="/legal/cookies">Cookies</Link>
        </nav>
      </div>
    </main>
  );
}
