import type { DocumentoLegal } from "./types";

/**
 * BORRADOR. Texto provisional preparado sin asesoría jurídica.
 * Debe revisarlo un abogado antes de publicarse como versión definitiva.
 */
export const documento: DocumentoLegal = {
  slug: "privacidad",
  titulo: "Política de tratamiento de datos personales",
  resumen:
    "Qué datos personales recibimos por WhatsApp e Instagram, para qué los usamos y cómo ejercer sus derechos. Borrador pendiente de revisión jurídica.",
  estado: "borrador",
  actualizado: "2026-10-18",
  secciones: [
    {
      id: "responsable",
      titulo: "Responsable del tratamiento",
      bloques: [
        {
          tipo: "p",
          texto:
            "Este documento es un borrador pendiente de revisión jurídica. Describe cómo {{marca}} tratará los datos personales de clientes, personas interesadas y talento vinculado, con base en la Ley 1581 de 2012 y sus decretos reglamentarios.",
        },
        {
          tipo: "lista",
          items: [
            "Responsable: {{razonSocial}} ({{marca}})",
            "NIT: {{nit}}",
            "Dirección: {{direccion}}, {{ciudad}}",
            "Correo para asuntos de datos personales: {{correo}}",
            "Teléfono: {{telefono}}",
          ],
        },
        {
          tipo: "pendiente",
          texto:
            "Completar razón social, NIT, dirección, correo y teléfono. Designar la persona o el área que atenderá consultas y reclamos sobre datos personales (Decreto 1377 de 2013, art. 13).",
        },
      ],
    },
    {
      id: "datos-que-tratamos",
      titulo: "Qué datos tratamos",
      bloques: [
        {
          tipo: "p",
          texto:
            "El sitio web no tiene formularios de registro, contacto ni pago, y no usa herramientas de analítica ni de publicidad. Los datos personales llegan a {{marca}} solo cuando usted decide escribirnos por WhatsApp, Instagram u otro canal.",
        },
        {
          tipo: "lista",
          items: [
            "Datos de contacto: nombre o nombre de usuario, número de celular y foto de perfil visible en la aplicación que use.",
            "Contenido de la conversación: productos consultados, tallas, cantidades y preguntas.",
            "Datos para concretar una compra: nombre completo, dirección y ciudad de entrega, soporte de pago y, cuando sea necesario para facturar o verificar la mayoría de edad, documento de identidad.",
            "Peticiones, quejas y reclamos que usted nos envíe.",
          ],
        },
        {
          tipo: "p",
          texto:
            "La lista de consulta y las preferencias del sitio se guardan solo en su navegador. {{marca}} no las recibe, salvo que usted envíe por WhatsApp o Instagram el mensaje que el sitio prepara. Más detalles en la Política de cookies y almacenamiento local.",
        },
        {
          tipo: "pendiente",
          texto:
            "Confirmar con el proveedor de alojamiento (hosting) qué registros técnicos guarda de los visitantes (por ejemplo, dirección IP, fecha y navegador), por cuánto tiempo y en qué país, e incluirlo aquí.",
        },
      ],
    },
    {
      id: "finalidades",
      titulo: "Para qué usamos los datos",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Responder consultas y confirmar disponibilidad, precio, tallas y tiempos de entrega.",
            "Gestionar pedidos, pagos, envíos, cambios, garantías y solicitudes de retracto.",
            "Comprobar, cuando sea necesario, que la persona compradora sea mayor de 18 años antes de concretar una venta.",
            "Atender peticiones, quejas y reclamos.",
            "Cumplir obligaciones legales, contables y tributarias, como la facturación.",
            "Gestionar la relación comercial con el talento vinculado y la autorización de uso de su imagen.",
          ],
        },
        {
          tipo: "p",
          texto:
            "{{marca}} no venderá ni cederá sus datos a terceros con fines comerciales, y no le enviará publicidad por WhatsApp, mensajes de texto o correo sin su autorización previa.",
        },
        {
          tipo: "pendiente",
          texto:
            "Definir si se enviarán catálogos, promociones o mensajes masivos (por ejemplo, listas de difusión). Si es así, se necesita una finalidad específica y una autorización previa y separada.",
        },
      ],
    },
    {
      id: "autorizacion",
      titulo: "Autorización",
      bloques: [
        {
          tipo: "p",
          texto:
            "Al escribirnos, usted nos entrega voluntariamente los datos de la conversación. {{marca}} le informará esta política y le solicitará su autorización a más tardar al recolectar sus datos, y en todo caso antes de pedirle datos adicionales para una compra. {{marca}} guardará prueba de esa autorización.",
        },
        {
          tipo: "p",
          texto:
            "Usted puede revocar la autorización en cualquier momento, salvo que exista un deber legal o contractual de conservar los datos.",
        },
        {
          tipo: "pendiente",
          texto:
            "Definir el mecanismo concreto para informar la política y obtener y conservar la prueba de la autorización, a más tardar al momento de recolectar los datos (Decreto 1377 de 2013, art. 5). Por ejemplo: mensaje automático de bienvenida en WhatsApp Business con enlace a esta página y respuesta afirmativa del cliente.",
        },
      ],
    },
    {
      id: "datos-sensibles-y-menores",
      titulo: "Datos sensibles y menores de edad",
      bloques: [
        {
          tipo: "p",
          texto:
            "Son datos sensibles, entre otros, los relacionados con la salud, la vida sexual y los datos biométricos (Ley 1581 de 2012, art. 5). {{marca}} no pedirá datos sensibles a sus clientes y le solicita no enviarlos por los canales de atención. Ninguna compra dependerá de que usted entregue datos sensibles.",
        },
        {
          tipo: "p",
          texto:
            "El sitio y los canales de venta son exclusivamente para personas mayores de 18 años. La ley prohíbe, como regla general, el tratamiento de datos de niñas, niños y adolescentes (Ley 1581 de 2012, art. 7), y {{marca}} no tratará datos de menores de edad. Si detecta que quien escribe es menor de edad, terminará la conversación, no le venderá y no conservará sus datos más allá de lo necesario.",
        },
        {
          tipo: "pendiente",
          texto:
            "Validar con un abogado: (1) cómo verificar la edad antes de una venta pidiendo el mínimo de datos (por ejemplo, ver el documento sin guardar copia); (2) qué hacer y a quién reportar si se detecta a un menor de edad o una situación de riesgo; (3) si las imágenes y datos del talento constituyen datos sensibles que requieren autorización expresa e informada (Decreto 1377 de 2013, art. 6).",
        },
      ],
    },
    {
      id: "derechos",
      titulo: "Sus derechos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Como titular de los datos, usted tiene derecho a (Ley 1581 de 2012, art. 8):",
        },
        {
          tipo: "lista",
          items: [
            "Conocer, actualizar y rectificar sus datos, incluidos los parciales, inexactos o cuyo tratamiento no haya autorizado.",
            "Solicitar prueba de la autorización que otorgó, salvo cuando la ley no la exija.",
            "Ser informado, si lo solicita, sobre el uso que se ha dado a sus datos.",
            "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley de protección de datos.",
            "Revocar la autorización o pedir la supresión de sus datos, en los términos de la ley.",
            "Acceder en forma gratuita a sus datos personales.",
          ],
        },
      ],
    },
    {
      id: "consultas-y-reclamos",
      titulo: "Cómo hacer consultas y reclamos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Escriba a {{correo}} o comuníquese al {{telefono}}. Indique su nombre, el canal por el que nos contactó (por ejemplo, su número de WhatsApp), qué solicita y cómo quiere recibir la respuesta. Podremos verificar su identidad antes de entregar o modificar información.",
        },
        {
          tipo: "lista",
          items: [
            "Consultas (saber qué datos tenemos y cómo los usamos): respuesta en máximo diez (10) días hábiles desde su recibo. Si no es posible, le informaremos el motivo y la fecha de respuesta, que no superará los cinco (5) días hábiles siguientes al vencimiento del primer plazo (Ley 1581 de 2012, art. 14).",
            "Reclamos (corregir, actualizar o suprimir datos, revocar la autorización o señalar un incumplimiento): respuesta en máximo quince (15) días hábiles desde el día siguiente a su recibo. Si no es posible, le informaremos el motivo y la fecha de respuesta, que no superará los ocho (8) días hábiles siguientes al vencimiento del primer plazo (Ley 1581 de 2012, art. 15).",
            "Si el reclamo está incompleto, dentro de los cinco (5) días siguientes a su recibo le pediremos que corrija lo que falte. Si pasan dos (2) meses desde esa solicitud sin que usted entregue la información, se entenderá que desistió del reclamo.",
            "Una vez recibido el reclamo completo, el dato se marcará como «reclamo en trámite» en un plazo no mayor a dos (2) días hábiles, y la marca se mantendrá hasta que el reclamo se resuelva.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Si no está conforme con la respuesta, puede acudir a la Superintendencia de Industria y Comercio (www.sic.gov.co).",
        },
        {
          tipo: "pendiente",
          texto:
            "Definir quién recibe y registra las solicitudes, cómo se controlan los plazos y cómo se verifica la identidad de quien las presenta.",
        },
      ],
    },
    {
      id: "terceros",
      titulo: "Terceros que pueden acceder a los datos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Para operar, {{marca}} usa servicios de terceros que pueden alojar o acceder a datos personales:",
        },
        {
          tipo: "lista",
          items: [
            "WhatsApp, Instagram y Facebook (Meta Platforms): las conversaciones se procesan en sus servidores, que pueden estar fuera de Colombia, y se rigen además por las políticas de privacidad de esas plataformas.",
            "Proveedor de alojamiento del sitio web.",
            "Transportadoras o servicios de mensajería, solo con los datos necesarios para entregar un pedido.",
            "Asesores contables, tributarios o jurídicos, sujetos a confidencialidad.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Cuando un tercero trate datos por cuenta de {{marca}}, se firmará un contrato que lo obligue a usarlos solo para la finalidad autorizada, a protegerlos y a mantener su confidencialidad (Decreto 1377 de 2013, arts. 24 y 25). Los datos solo se enviarán a otros países en los casos que la ley permite, por ejemplo con su autorización expresa (Ley 1581 de 2012, art. 26).",
        },
        {
          tipo: "pendiente",
          texto:
            "Un abogado debe definir: (1) si Meta actúa como responsable independiente o como encargado frente a las conversaciones de WhatsApp e Instagram, y qué autorización se requiere para la transferencia o transmisión internacional; (2) el nombre y país del proveedor de hosting y de correo; (3) los contratos con transportadoras y asesores.",
        },
      ],
    },
    {
      id: "imagen-del-talento",
      titulo: "Uso de la imagen del talento",
      bloques: [
        {
          tipo: "p",
          texto:
            "{{marca}} solo publicará fotos, videos o datos de modelos mayores de 18 años que tengan una relación comercial formal con la empresa y que hayan autorizado por escrito el uso de su imagen, con indicación de los fines, los medios y el tiempo de uso. Toda persona tiene derecho a impedir que su retrato se exponga en el comercio sin su consentimiento expreso (Ley 23 de 1982, art. 87).",
        },
        {
          tipo: "p",
          texto:
            "Antes de cualquier producción se verificarán la mayoría de edad y la identidad de cada persona. Esa prueba se guardará de forma confidencial y con acceso restringido. Los nombres legales, documentos, direcciones y teléfonos del talento no se publicarán.",
        },
        {
          tipo: "p",
          texto:
            "Solicitud de retiro: si usted aparece en un contenido de {{marca}} y no lo autorizó, revocó su autorización o considera que se publicaron datos suyos, escriba a {{correo}} con el asunto «Retiro de contenido» e indique el enlace o una descripción del contenido. Si la solicitud es verosímil, el contenido se retirará de nuestros canales mientras se revisa.",
        },
        {
          tipo: "pendiente",
          texto:
            "Definir con un abogado: el modelo de contrato y de autorización de uso de imagen (fines, territorio, plazo, remuneración y revocatoria; la Ley 23 de 1982, art. 87, prevé que quien consintió puede revocar con indemnización de perjuicios), el tiempo de conservación de las pruebas de edad e identidad, el plazo de respuesta a las solicitudes de retiro y el trámite de solicitudes presentadas por terceros.",
        },
      ],
    },
    {
      id: "seguridad-y-conservacion",
      titulo: "Seguridad y conservación",
      bloques: [
        {
          tipo: "p",
          texto:
            "{{marca}} adoptará medidas razonables para proteger los datos, entre ellas:",
        },
        {
          tipo: "lista",
          items: [
            "Acceso a las cuentas de WhatsApp, Instagram y correo solo para socios y personal autorizado, con verificación en dos pasos.",
            "Dispositivos de trabajo protegidos con contraseña o bloqueo de pantalla.",
            "Prohibición de reenviar conversaciones, comprobantes o documentos de clientes o del talento fuera de los canales de trabajo.",
            "Borrado periódico de conversaciones y archivos que ya no se necesiten.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Los datos se conservarán solo durante el tiempo razonable y necesario para la finalidad que justificó su recolección y para cumplir obligaciones legales, contables o tributarias (Decreto 1377 de 2013, art. 11).",
        },
        {
          tipo: "pendiente",
          texto:
            "Confirmar con la empresa que cada una de las medidas de seguridad listadas se aplica o se aplicará antes de publicar esta política. Quitar las que no se vayan a cumplir: la política no debe describir medidas que no existan.",
        },
        {
          tipo: "pendiente",
          texto:
            "Definir plazos de conservación por tipo de dato (conversaciones sin compra, pedidos y facturación, pruebas de edad del talento). Verificar si la empresa debe inscribir sus bases de datos en el Registro Nacional de Bases de Datos que administra la SIC (Ley 1581 de 2012, art. 25).",
        },
      ],
    },
    {
      id: "vigencia",
      titulo: "Vigencia y cambios",
      bloques: [
        {
          tipo: "p",
          texto:
            "Esta política es un borrador y todavía no ha sido aprobada. Regirá desde la fecha que indique su versión final. Los cambios importantes se informarán en este sitio antes de aplicarse.",
        },
        {
          tipo: "pendiente",
          texto:
            "Indicar la fecha de entrada en vigencia y el periodo de vigencia de las bases de datos (Decreto 1377 de 2013, art. 13). El Decreto 1377 de 2013 fue compilado en el Decreto 1074 de 2015 (capítulo 25); el abogado debe definir si las citas se hacen a la norma compilada. Un abogado debe revisar el texto completo antes de publicarlo como versión definitiva.",
        },
      ],
    },
  ],
};
