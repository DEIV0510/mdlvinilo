"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Imagen } from "@/content/tipos";
import { Lamina } from "./Lamina";

/**
 * Fotografía del catálogo con respaldo: si no existe o falla al cargar,
 * se muestra la lámina tipográfica en su lugar (sin saltos de diseño:
 * ambas respetan la misma proporción).
 */
export function Foto({
  imagen,
  nombre,
  sizes,
  proporcion = "4 / 5",
  preload = false,
  className,
}: {
  imagen?: Imagen;
  nombre: string;
  sizes: string;
  proporcion?: string;
  preload?: boolean;
  className?: string;
}) {
  const [fallo, setFallo] = useState(false);

  // Si la imagen falló antes de que React se hidratara, onError no llega a
  // dispararse: se comprueba el estado real del elemento al conectarlo.
  const comprobar = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFallo(true);
  }, []);

  if (!imagen || fallo) {
    return (
      <Lamina
        nombre={nombre}
        proporcion={proporcion}
        className={className}
        rotulo={fallo ? "Imagen no disponible" : undefined}
      />
    );
  }
  return (
    <div className={className} style={{ position: "relative", aspectRatio: proporcion, overflow: "hidden" }}>
      <Image
        ref={comprobar}
        src={imagen.src}
        alt={imagen.alt}
        fill
        sizes={sizes}
        preload={preload}
        style={{ objectFit: "cover" }}
        onError={() => setFallo(true)}
      />
    </div>
  );
}
