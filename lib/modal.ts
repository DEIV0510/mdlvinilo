/**
 * Bloqueo del desplazamiento de fondo mientras haya un diálogo modal
 * abierto. Lleva la cuenta por nombre para que dos diálogos no se pisen.
 */
const abiertos = new Set<string>();

export function bloquearFondo(nombre: string, activo: boolean) {
  if (activo) abiertos.add(nombre);
  else abiertos.delete(nombre);
  if (abiertos.size) document.documentElement.setAttribute("data-modal", "");
  else document.documentElement.removeAttribute("data-modal");
}
