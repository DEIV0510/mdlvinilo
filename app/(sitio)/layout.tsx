import { ConsultaProvider } from "@/components/consulta/ConsultaProvider";
import { PanelSeleccion } from "@/components/consulta/PanelSeleccion";
import { AvisoPendientes } from "@/components/dev/AvisoPendientes";
import { Intro } from "@/components/intro/Intro";
import { Cabecera } from "@/components/layout/Cabecera";
import { Pie } from "@/components/layout/Pie";
import { FocoAncla } from "@/components/ui/FocoAncla";
import { Revelador } from "@/components/ui/Revelador";
import { getProductos } from "@/lib/datos";

export default function SitioLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultaProvider>
      <a href="#contenido" className="saltar">
        Saltar al contenido
      </a>
      <Intro />
      <Cabecera />
      {/* Contenido en marfil; la portada marca sus secciones oscuras */}
      <main id="contenido" tabIndex={-1} className="claro">
        {children}
      </main>
      <Pie />
      <PanelSeleccion slugsPublicados={getProductos().map((p) => p.slug)} />
      <Revelador />
      <FocoAncla />
      <AvisoPendientes />
    </ConsultaProvider>
  );
}
