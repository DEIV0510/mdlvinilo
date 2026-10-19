"use client";

import Link from "next/link";
import { clasesBoton } from "@/components/ui/Boton";
import s from "./estado.module.css";

export default function ErrorPagina({ retry }: { error: unknown; reset: () => void; retry: () => void }) {
  return (
    <main className={s.estado}>
      <p className={`display metal ${s.codigo}`}>Ups</p>
      <h1 className={`display ${s.titulo}`}>Algo no cargó como esperábamos</h1>
      <p className={s.texto}>Puedes intentarlo de nuevo o volver al inicio.</p>
      <div className={s.acciones}>
        <button type="button" className={clasesBoton("principal")} onClick={() => retry()}>
          <span>Reintentar</span>
        </button>
        <Link href="/" className={clasesBoton("secundario")}>
          <span>Volver al inicio</span>
        </Link>
      </div>
    </main>
  );
}
