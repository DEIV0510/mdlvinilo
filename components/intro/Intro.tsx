import { Logo, SIZES_LOGO_GRANDE } from "@/components/marca/Logo";
import s from "./Intro.module.css";

/**
 * Pantalla de carga inicial (solo marcado). Su ciclo de vida lo controla el
 * script inicial de app/layout.tsx, que se ejecuta antes del primer pintado:
 * - Se retira en cuanto las fuentes y la imagen principal están listas
 *   (sin esperas artificiales) y nunca después de 2,2 s.
 * - Si ya se vio en esta sesión, no se muestra.
 * - Solo existe mientras html.intro-activa: sin JavaScript o al llegar por
 *   navegación interna no aparece.
 * - Si algo se bloquea, una animación CSS la retira a los 3 s.
 * - No bloquea clics ni el foco del teclado (pointer-events: none, aria-hidden).
 */
export function Intro() {
  return (
    <div id="intro" className={`intro ${s.intro}`} aria-hidden="true">
      <div className={s.escena}>
        <div className={s.logo}>
          <Logo sizes={SIZES_LOGO_GRANDE} preload decorativo />
          <span className={s.destello} />
        </div>
        <div className={s.barra}>
          <span />
        </div>
        <p className={s.lema}>Floridablanca · Santander · Colombia</p>
      </div>
    </div>
  );
}
