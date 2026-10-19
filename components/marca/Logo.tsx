import Image from "next/image";
import logo from "@/assets/brand/logo-mdl-vinilo.webp";

/**
 * Logotipo original de MDL Vinilo Colombia (recorte con transparencia del
 * archivo «Logotipo dorado MDL ViNiLO!COL.png», sin alterar colores ni forma).
 */
export function Logo({
  sizes,
  preload = false,
  className,
  decorativo = false,
  calidad = 90,
  ...rest
}: {
  sizes: string;
  preload?: boolean;
  className?: string;
  /** true cuando el nombre de la marca ya está en el texto contiguo. */
  decorativo?: boolean;
  calidad?: 75 | 90;
  "data-lcp"?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt={decorativo ? "" : "MDL Vinilo Colombia"}
      sizes={sizes}
      // Imagen principal: carga inmediata y prioridad alta (recomendado por Next 16
      // en lugar de preload). El resto, diferida.
      loading={preload ? "eager" : "lazy"}
      fetchPriority={preload ? "high" : undefined}
      quality={calidad}
      className={className}
      draggable={false}
      {...rest}
    />
  );
}

export const proporcionLogo = logo.width / logo.height;

/** Mismo valor en la intro y en la portada para que el navegador descargue una sola imagen. */
export const SIZES_LOGO_GRANDE = "(max-width: 640px) 82vw, (max-width: 1200px) 50vw, 640px";
