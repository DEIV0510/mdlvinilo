import type { DocumentoLegal } from "./types";

/**
 * BORRADOR. Texto provisional preparado sin asesoría jurídica.
 * Debe revisarlo un abogado antes de publicarse como versión definitiva.
 * Si cambia el código del aviso de edad, de la lista de consulta o de la
 * intro, este documento debe actualizarse en el mismo cambio.
 */
export const documento: DocumentoLegal = {
  slug: "cookies",
  titulo: "Política de cookies y almacenamiento local",
  resumen:
    "Qué guarda el sitio en su navegador: una cookie para el aviso de edad y dos registros locales. Sin analítica ni publicidad. Borrador pendiente de revisión jurídica.",
  estado: "borrador",
  actualizado: "2026-10-18",
  secciones: [
    {
      id: "que-son",
      titulo: "Qué son y qué usamos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Este documento es un borrador pendiente de revisión jurídica. Explica qué información guarda el sitio de {{marca}} en su navegador.",
        },
        {
          tipo: "p",
          texto:
            "Las cookies son pequeños archivos que un sitio guarda en el navegador y que se envían al servidor del sitio. El almacenamiento local (localStorage) y el de sesión (sessionStorage) cumplen una función parecida, pero sus datos se quedan en el dispositivo y no se envían al servidor.",
        },
        {
          tipo: "p",
          texto:
            "El sitio usa una cookie y dos registros de almacenamiento, todos propios. Sirven para que el sitio funcione o para recordar lo que usted elige. No usamos cookies de analítica, publicidad ni redes sociales.",
        },
      ],
    },
    {
      id: "cookie-mdl-edad",
      titulo: "Cookie «mdl_edad» (aviso de edad)",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Tipo: cookie propia, estrictamente necesaria.",
            "Para qué sirve: guarda su respuesta al aviso de edad, es decir, que declaró ser mayor de 18 años o que decidió salir, para no preguntarle en cada página.",
            "Duración: cookie de sesión; se borra cuando cierra el navegador. Algunos navegadores la conservan si usted tiene activada la opción de restaurar la sesión anterior.",
            "Acceso: es HttpOnly, por lo que el código de la página no puede leerla; el navegador solo la envía al servidor del sitio.",
            "No contiene su nombre, su edad ni otros datos que lo identifiquen.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Si la bloquea, el aviso de edad aparecerá de nuevo y es posible que no pueda navegar el sitio.",
        },
      ],
    },
    {
      id: "lista-de-consulta",
      titulo: "Almacenamiento local «mdl-lista-consulta» (lista de consulta)",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Tipo: almacenamiento local (localStorage) propio.",
            "Para qué sirve: guarda los productos, tallas, colores y cantidades que usted agrega a su lista de consulta, para que no se pierdan al cambiar de página o al volver otro día.",
            "Duración: permanece en su dispositivo hasta que usted quite los productos de la lista o borre los datos del sitio en su navegador.",
            "Quién lo ve: solo usted, en ese navegador. {{marca}} no recibe la lista, salvo que usted decida enviar por WhatsApp o Instagram el mensaje que el sitio prepara con ella. Para Instagram, el sitio copia ese mensaje al portapapeles de su dispositivo cuando usted pulsa el botón, para que lo pegue en el chat.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Cuando usted envía ese mensaje, su contenido pasa por WhatsApp o Instagram (Meta) y llega a {{marca}}. Desde ese momento aplica la Política de tratamiento de datos personales.",
        },
      ],
    },
    {
      id: "intro-vista",
      titulo: "Almacenamiento de sesión «mdl-intro-vista» (animación de entrada)",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Tipo: almacenamiento de sesión (sessionStorage) propio.",
            "Para qué sirve: recuerda que ya vio la animación de entrada, para no mostrársela de nuevo mientras siga en la misma pestaña.",
            "Duración: se borra al cerrar la pestaña o el navegador, salvo que el navegador restaure la sesión anterior.",
            "No contiene datos personales.",
          ],
        },
      ],
    },
    {
      id: "lo-que-no-usamos",
      titulo: "Lo que no usamos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Actualmente el sitio no usa herramientas de analítica (por ejemplo, para contar visitas), píxeles de publicidad, cookies de redes sociales ni otros rastreadores de terceros.",
        },
        {
          tipo: "pendiente",
          texto:
            "Antes de publicar, confirmar técnicamente que el sitio no carga recursos de terceros (fuentes tipográficas, videos o mapas incrustados, widgets) que instalen cookies o registren datos del visitante. Si los carga, deben incluirse en esta política.",
        },
        {
          tipo: "pendiente",
          texto:
            "Si en el futuro se agregan analítica, publicidad o píxeles, se debe actualizar esta política antes de activarlos e implementar un mecanismo para que el visitante acepte o rechace esas cookies antes de que se instalen. Un abogado debe validar ese mecanismo.",
        },
      ],
    },
    {
      id: "sitios-de-terceros",
      titulo: "Sitios de terceros",
      bloques: [
        {
          tipo: "p",
          texto:
            "Los botones y enlaces a redes sociales y aplicaciones de mensajería (por ejemplo Instagram, TikTok o WhatsApp, según los canales activos en el sitio) lo llevan a sitios o aplicaciones de terceros. Esas plataformas usan sus propias cookies y tecnologías según sus políticas de privacidad y de cookies, que {{marca}} no controla. Le recomendamos revisarlas.",
        },
      ],
    },
    {
      id: "como-borrar",
      titulo: "Cómo borrar o bloquear estos datos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Puede borrar la cookie y el almacenamiento del sitio en cualquier momento desde la configuración de privacidad de su navegador, en opciones como «Cookies y datos de sitios» o «Borrar datos de navegación».",
        },
        {
          tipo: "lista",
          items: [
            "Al borrar los datos del sitio se elimina la lista de consulta guardada en ese navegador.",
            "Al cerrar el navegador se borran la cookie «mdl_edad» y el registro «mdl-intro-vista», salvo que el navegador esté configurado para restaurar la sesión anterior.",
            "En una ventana privada o de incógnito, todos estos datos se borran al cerrarla.",
            "Si bloquea todas las cookies, el aviso de edad no podrá recordar su respuesta.",
          ],
        },
      ],
    },
    {
      id: "cambios-y-contacto",
      titulo: "Cambios y contacto",
      bloques: [
        {
          tipo: "p",
          texto:
            "Si cambian las cookies o el almacenamiento que usa el sitio, actualizaremos esta política y su fecha. Para preguntas, escriba a {{correo}}.",
        },
        {
          tipo: "pendiente",
          texto:
            "Revisar con un abogado la versión final de esta política junto con la Política de tratamiento de datos personales.",
        },
      ],
    },
  ],
};
