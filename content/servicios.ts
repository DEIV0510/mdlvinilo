import type { Servicio } from "./tipos";

/**
 * Servicios. Solo se publican los marcados como `confirmado: true`, que
 * corresponden a las actividades descritas por la empresa: producción de
 * contenido audiovisual, marketing, promoción comercial, promoción del
 * talento vinculado y desarrollo de oportunidades de negocio.
 */
export const servicios: Servicio[] = [
  {
    id: "produccion-audiovisual",
    nombre: "Producción audiovisual",
    linea: "Contenido audiovisual con la dirección de arte de la casa.",
    confirmado: true,
  },
  {
    id: "marketing",
    nombre: "Marketing y promoción comercial",
    linea: "Estrategia, contenido y difusión para lanzamientos y campañas.",
    confirmado: true,
  },
  {
    id: "promocion-talento",
    nombre: "Promoción del talento vinculado",
    linea: "Promoción publicitaria de las modelos con vínculo comercial formal con la marca.",
    confirmado: true,
  },
  {
    id: "oportunidades",
    nombre: "Alianzas y oportunidades comerciales",
    linea: "Colaboraciones y nuevos proyectos dentro del sector.",
    confirmado: true,
  },
  // PENDIENTES DE CONFIRMAR por la empresa antes de publicarse:
  {
    id: "foto-video-comercial",
    nombre: "Fotografía y video comercial",
    linea: "Sesiones de foto y video para terceros.",
    confirmado: false,
  },
  {
    id: "campanas-marca",
    nombre: "Campañas de marca",
    linea: "Campañas completas para marcas aliadas.",
    confirmado: false,
  },
];
