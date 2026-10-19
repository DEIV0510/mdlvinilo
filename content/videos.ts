import type { VideoMarca } from "./tipos";

/**
 * VIDEO EN ROTACIÓN (sección Novedades)
 * ─────────────────────────────────────
 * Video vertical de la marca que se reproduce sin sonido y en bucle junto a
 * las redes oficiales. Solo se carga cuando entra en pantalla, y no arranca
 * solo si el visitante pidió reducir el movimiento o ahorrar datos.
 *
 * Para cambiarlo, deja en public/media/ el MP4 optimizado y su primer
 * fotograma, y actualiza estos datos:
 *   ffmpeg -i original.mp4 -an -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart public/media/nuevo.mp4
 *   ffmpeg -ss 0.1 -i original.mp4 -frames:v 1 -q:v 4 public/media/nuevo.jpg
 *
 * Con null, la sección muestra solo las redes.
 * Publicar a una persona requiere su autorización de uso de imagen.
 */
export const videoNovedades: VideoMarca | null = {
  src: "/media/vinilo-video-01.mp4",
  poster: "/media/vinilo-video-01.jpg",
  ancho: 464,
  alto: 832,
  descripcion:
    "Modelo con vestido negro corto de cuello blanco y trenzas, en un parque de la ciudad, con un termo negro en la mano.",
};
