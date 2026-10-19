"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconoPausa, IconoReproducir } from "@/components/ui/Iconos";
import type { VideoMarca } from "@/content/tipos";
import s from "./FundasRedes.module.css";

/**
 * Video vertical «en rotación»: sin sonido, en bucle y solo mientras está en
 * pantalla. No descarga nada hasta que se reproduce (preload="none"); el
 * fotograma inicial es una imagen optimizada y diferida. No arranca solo con
 * «reducir movimiento» o «ahorro de datos», y siempre se puede pausar.
 */
export function VideoRotacion({ video }: { video: VideoMarca }) {
  const ref = useRef<HTMLVideoElement>(null);
  const pausadoPorUsuario = useRef(false);
  const [reproduciendo, setReproduciendo] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) v.pause();
        else if (!pausadoPorUsuario.current && !reducido && !ahorro) void v.play().catch(() => undefined);
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function alternar() {
    const v = ref.current;
    if (!v) return;
    pausadoPorUsuario.current = !v.paused;
    if (v.paused) void v.play().catch(() => undefined);
    else v.pause();
  }

  return (
    <figure className={s.reel} data-revelar>
      <div className={s.pantalla} style={{ aspectRatio: `${video.ancho} / ${video.alto}` }}>
        <Image src={video.poster} alt="" fill sizes="(max-width: 1024px) 20rem, 24rem" className={s.poster} />
        <video
          ref={ref}
          className={s.video}
          src={video.src}
          width={video.ancho}
          height={video.alto}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setReproduciendo(true)}
          onPause={() => setReproduciendo(false)}
        />
        <span className={s.enRotacion}>
          <span className={s.piloto} data-activo={reproduciendo || undefined} aria-hidden="true" />
          En rotación
        </span>
        <button type="button" className={s.control} onClick={alternar}>
          {reproduciendo ? <IconoPausa /> : <IconoReproducir />}
          <span className="sr-only">{reproduciendo ? "Pausar el video" : "Reproducir el video"}</span>
        </button>
      </div>
      <figcaption className="sr-only">Video sin sonido. {video.descripcion}</figcaption>
    </figure>
  );
}
