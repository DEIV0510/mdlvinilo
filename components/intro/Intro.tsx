import { Logo, SIZES_LOGO_GRANDE } from "@/components/marca/Logo";
import s from "./Intro.module.css";

/**
 * Pantalla de carga inicial.
 * - Se retira en cuanto las fuentes y la imagen principal están listas
 *   (sin esperas artificiales) y nunca después de 2,2 s.
 * - Si ya se vio en esta sesión, no se muestra.
 * - Si el script no llega a ejecutarse, una animación CSS la retira a los 3 s.
 * - Sin JavaScript no existe (html:not(.js) .intro { display: none }).
 * - No bloquea clics ni el foco del teclado (pointer-events: none, aria-hidden).
 */
const script = `(function(){
var d=document.documentElement,el=document.getElementById('intro');if(!el)return;
var visto=false;try{visto=sessionStorage.getItem('mdl-intro-vista')==='1';sessionStorage.setItem('mdl-intro-vista','1');}catch(e){}
function fin(){if(d.classList.contains('intro-fin'))return;if(window.performance&&performance.now()>2800){el.setAttribute('data-oculto','');d.classList.add('intro-fin');return;}d.classList.add('intro-fin');setTimeout(function(){el.setAttribute('data-oculto','');},900);}
if(visto){d.classList.add('intro-omitida');fin();return;}
d.classList.add('intro-activa');
var tope=setTimeout(fin,2200);
function listo(){var esperas=[];
if(document.fonts&&document.fonts.ready)esperas.push(document.fonts.ready);
var img=document.querySelector('img[data-lcp]');
if(img&&!img.complete)esperas.push(new Promise(function(r){img.addEventListener('load',r,{once:true});img.addEventListener('error',r,{once:true});}));
Promise.all(esperas).then(function(){clearTimeout(tope);fin();},fin);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',listo,{once:true});else listo();
})();`;

export function Intro() {
  return (
    <>
      <div id="intro" className={`intro ${s.intro}`} aria-hidden="true" suppressHydrationWarning>
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
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
