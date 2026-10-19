import Link from "next/link";
import { sitio } from "@/config/sitio";
import { BotonConsulta } from "@/components/consulta/BotonConsulta";
import { Logo } from "@/components/marca/Logo";
import { RedesSociales } from "@/components/ui/RedesSociales";
import { enlacesLegales, navegacion } from "./navegacion";
import s from "./Pie.module.css";

export function Pie() {
  const { empresa, ubicacion } = sitio;
  const anio = new Date().getFullYear();
  const datosEmpresa = [
    empresa.razonSocial,
    empresa.nit ? `NIT ${empresa.nit}` : "",
    empresa.correo,
    empresa.telefono,
    empresa.direccion,
  ].filter(Boolean);

  return (
    <footer className={s.pie}>
      <div className={s.marquesina} aria-hidden="true">
        <span className="display">
          MDL <em>Vinilo</em> Colombia
        </span>
      </div>

      <div className={`contenedor ${s.rejilla}`}>
        <div className={s.marca}>
          <Logo sizes="160px" className={s.logo} />
          <p className={s.descripcion}>
            Moda, imagen y producción audiovisual con identidad propia. Desde {ubicacion.ciudad},{" "}
            {ubicacion.departamento}.
          </p>
          <BotonConsulta variante="secundario" compacto />
        </div>

        <nav aria-label="Pie de página" className={s.columna}>
          <p className="rotulo rotulo--oro">Explorar</p>
          <ul role="list" className={s.lista}>
            {navegacion.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.texto}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.columna}>
          <p className="rotulo rotulo--oro">Legal</p>
          <ul role="list" className={s.lista}>
            {enlacesLegales.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.texto}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.columna}>
          <p className="rotulo rotulo--oro">Redes oficiales</p>
          <RedesSociales />
          <p className={s.ubicacion}>
            {ubicacion.ciudad}, {ubicacion.departamento}, {ubicacion.pais}
          </p>
        </div>
      </div>

      <div className={`contenedor ${s.base}`}>
        <p className={s.aviso18}>
          <span className={s.sello} aria-hidden="true">
            18+
          </span>
          Sitio exclusivo para mayores de 18 años. El ingreso implica declarar la mayoría de edad; no
          constituye una verificación de identidad.
        </p>
        <p className={s.proteccion}>
          Denuncia la explotación sexual de niñas, niños y adolescentes: Línea 141 del ICBF ·{" "}
          <a href="https://www.teprotejocolombia.org/" target="_blank" rel="noopener noreferrer">
            Te Protejo Colombia
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </p>
        <div className={s.legal}>
          <p>
            © {anio} {sitio.marca}. Todos los derechos reservados. Logotipos, fotografías y videos son
            propiedad de la marca o de sus titulares y no pueden reutilizarse sin autorización.
          </p>
          {datosEmpresa.length > 0 ? <p>{datosEmpresa.join(" · ")}</p> : null}
        </div>
      </div>
    </footer>
  );
}
