import Link from "next/link";
import { AvisoConsulta } from "@/components/consulta/AvisoConsulta";
import { ConsultaProvider } from "@/components/consulta/ConsultaProvider";
import { FocoAncla } from "@/components/ui/FocoAncla";
import { Logo } from "@/components/marca/Logo";
import { Pie } from "@/components/layout/Pie";
import s from "./legal.module.css";

/** Páginas legales: accesibles sin declarar la edad, con cabecera mínima. */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultaProvider>
      <a href="#contenido" className="saltar">
        Saltar al contenido
      </a>
      <header className={s.cabecera}>
        <Link href="/" className={s.marca} aria-label="MDL Vinilo Colombia, ir al inicio">
          <Logo sizes="96px" decorativo className={s.logo} />
        </Link>
        <Link href="/" className={s.volver}>
          Volver al sitio
        </Link>
      </header>
      <main id="contenido" tabIndex={-1} className={`claro ${s.principal}`}>
        <div className="contenedor">{children}</div>
      </main>
      <Pie />
      <AvisoConsulta />
      <FocoAncla />
    </ConsultaProvider>
  );
}
