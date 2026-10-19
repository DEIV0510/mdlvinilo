import type { PerfilTalento } from "./tipos";

/**
 * TALENTO VINCULADO
 * ─────────────────
 * Solo modelos adultas con relación comercial formal con MDL Vinilo
 * Colombia y autorización escrita para publicar su imagen y sus datos.
 * Un perfil no se muestra si falta cualquiera de las tres confirmaciones
 * de `autorizacion` o si la autorización está vencida.
 *
 * Nunca publiques teléfonos, direcciones, nombres legales ni datos
 * personales que no sean necesarios para la actividad comercial.
 *
 * {
 *   slug: "nombre-artistico",
 *   nombreArtistico: "Nombre artístico",
 *   presentacion: "Presentación breve aprobada por la modelo.",
 *   retrato: { src: "/talento/nombre.webp", alt: "Retrato de …", width: 1200, height: 1600 },
 *   proyectos: ["Campaña …"],
 *   redes: [{ nombre: "Instagram", url: "https://www.instagram.com/…/" }],
 *   autorizacion: {
 *     vinculoComercial: true,
 *     autorizacionImagen: true,
 *     mayorDeEdadVerificado: true,
 *     referenciaInterna: "AUT-2026-001",
 *     vigenteHasta: "2027-12-31",
 *   },
 *   publicado: true,
 * },
 */
export const talento: PerfilTalento[] = [];
