import { ConsultaProvider } from "@/components/consulta/ConsultaProvider";
import { PanelSeleccion } from "@/components/consulta/PanelSeleccion";
import { AvisoPendientes } from "@/components/dev/AvisoPendientes";
import { Intro } from "@/components/intro/Intro";
import { Cabecera } from "@/components/layout/Cabecera";
import { Pie } from "@/components/layout/Pie";
import { Revelador } from "@/components/ui/Revelador";

export default function SitioLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultaProvider>
      <a href="#contenido" className="saltar">
        Saltar al contenido
      </a>
      <Intro />
      <Cabecera />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <Pie />
      <PanelSeleccion />
      <Revelador />
      <AvisoPendientes />
    </ConsultaProvider>
  );
}
