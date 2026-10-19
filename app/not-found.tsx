import Link from "next/link";
import { Logo } from "@/components/marca/Logo";
import { clasesBoton } from "@/components/ui/Boton";
import s from "./estado.module.css";

export default function NoEncontrada() {
  return (
    <main className={s.estado}>
      <Logo sizes="160px" className={s.logo} />
      <p className={`display metal ${s.codigo}`}>404</p>
      <h1 className={`display ${s.titulo}`}>Esta página no existe</h1>
      <p className={s.texto}>Puede que el enlace haya cambiado o que la pieza ya no esté publicada.</p>
      <div className={s.acciones}>
        <Link href="/" className={clasesBoton("principal")}>
          <span>Volver al inicio</span>
        </Link>
        <Link href="/coleccion" className={clasesBoton("secundario")}>
          <span>Ver la colección</span>
        </Link>
      </div>
    </main>
  );
}
