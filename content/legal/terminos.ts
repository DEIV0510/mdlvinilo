import type { DocumentoLegal } from "./types";

/**
 * BORRADOR. Texto provisional preparado sin asesoría jurídica.
 * Debe revisarlo un abogado antes de publicarse como versión definitiva.
 */
export const documento: DocumentoLegal = {
  slug: "terminos",
  titulo: "Términos y condiciones de uso y de venta",
  resumen:
    "Condiciones para usar el sitio, solo para mayores de 18 años, y para las compras que se acuerdan por WhatsApp o Instagram. Borrador pendiente de revisión jurídica.",
  estado: "borrador",
  actualizado: "2026-10-18",
  secciones: [
    {
      id: "objeto",
      titulo: "Objeto y quiénes somos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Este documento es un borrador pendiente de revisión jurídica. Establece las condiciones para usar el sitio web de {{marca}} y para las compras que se acuerden por sus canales de mensajería.",
        },
        {
          tipo: "p",
          texto:
            "{{marca}} es una marca de {{razonSocial}}, NIT {{nit}}, con domicilio en {{direccion}}, {{ciudad}}. Contacto: {{correo}} · {{telefono}}.",
        },
        {
          tipo: "p",
          texto:
            "El sitio presenta un catálogo de lencería femenina, disfraces, prendas de temporada y colecciones, y los servicios de producción audiovisual y promoción comercial de la empresa, incluida la promoción de modelos mayores de edad vinculadas a ella. Al usar el sitio, usted acepta estos términos. Si no está de acuerdo, no lo use.",
        },
        {
          tipo: "pendiente",
          texto:
            "Completar los datos de identificación de la empresa: razón social, NIT, dirección, teléfono y correo (Ley 1480 de 2011, art. 50, literal a).",
        },
      ],
    },
    {
      id: "mayores-de-18",
      titulo: "Acceso solo para mayores de 18 años",
      bloques: [
        {
          tipo: "p",
          texto:
            "El sitio contiene material dirigido exclusivamente a personas mayores de 18 años. Al entrar, usted declara ser mayor de edad. Esa declaración no es una verificación de identidad y es responsabilidad de quien la hace.",
        },
        {
          tipo: "p",
          texto:
            "{{marca}} podrá pedir que se acredite la mayoría de edad antes de confirmar cualquier venta o entrega, y no venderá si no se acredita. Si comparte su dispositivo con menores de edad, le recomendamos usar herramientas de control parental o de bloqueo de contenido.",
        },
        {
          tipo: "p",
          texto:
            "{{marca}} no publicará ni enlazará contenido que involucre a menores de edad y rechaza toda forma de explotación sexual de niñas, niños y adolescentes (Ley 679 de 2001, arts. 7 y 8; Ley 1336 de 2009). Si conoce un caso, denúncielo:",
        },
        {
          tipo: "lista",
          items: [
            "Línea 141 del ICBF: gratuita, de alcance nacional.",
            "Te Protejo Colombia: www.teprotejocolombia.org (reporte en línea, confidencial y anónimo; también se llega desde www.teprotejo.org eligiendo Colombia).",
          ],
        },
        {
          tipo: "pendiente",
          texto:
            "Un abogado debe revisar: (1) si el aviso de edad por autodeclaración es suficiente para el tipo de contenido que se publicará o si se requiere un mecanismo más robusto; (2) las obligaciones que puedan aplicar a la empresa según la Ley 679 de 2001, la Ley 1336 de 2009 y el Decreto 1524 de 2002 (por ejemplo, informar sobre esas normas en el sitio y ofrecer enlaces de denuncia).",
        },
      ],
    },
    {
      id: "catalogo-y-compra",
      titulo: "Catálogo y proceso de compra",
      bloques: [
        {
          tipo: "p",
          texto:
            "Las fotos y descripciones del catálogo buscan mostrar los productos tal como son; los colores pueden verse algo distintos según la pantalla. Cuando un producto muestra precio, ese es el precio anunciado, con impuestos incluidos, y es el que usted pagará por el producto (Ley 1480 de 2011, art. 26). Si aparece como «Precio a consultar», {{marca}} le informará el precio total por escrito en la conversación antes de la compra. Tallas y existencias se confirman en la conversación.",
        },
        {
          tipo: "p",
          texto:
            "El sitio no recibe pagos. Agregar productos a la lista de consulta o enviar un mensaje por WhatsApp o Instagram es una consulta, no una compra terminada. La compra se acuerda así:",
        },
        {
          tipo: "lista",
          items: [
            "Usted envía su consulta con los productos y tallas de interés.",
            "{{marca}} le confirma disponibilidad, precio total, costo de envío, medio de pago y tiempo de entrega.",
            "Usted acepta expresamente ese resumen del pedido.",
            "Usted paga por el medio acordado y {{marca}} le confirma el recibo del pedido y del pago.",
          ],
        },
        {
          tipo: "p",
          texto:
            "La ley reconoce efectos jurídicos a los acuerdos celebrados mediante mensajes de datos, como los de WhatsApp (Ley 527 de 1999, arts. 5 y 14). Le recomendamos guardar la conversación como soporte de su compra.",
        },
        {
          tipo: "pendiente",
          texto:
            "Definir el procedimiento de compra por WhatsApp: formato del resumen del pedido, aceptación expresa, posibilidad de cancelar antes de pagar, acuse de recibo y conservación de la prueba de la transacción (Ley 1480 de 2011, art. 50, literales d y e).",
        },
      ],
    },
    {
      id: "precios-pagos-envios",
      titulo: "Precios, pagos y envíos",
      bloques: [
        {
          tipo: "p",
          texto:
            "Los precios se expresan en pesos colombianos. El precio que {{marca}} confirme en la conversación será el precio total a pagar, con impuestos incluidos, y el costo de envío se informará por separado (Ley 1480 de 2011, art. 50, literal c).",
        },
        {
          tipo: "pendiente",
          texto:
            "Definir: régimen tributario y si la empresa es responsable del IVA; facturación electrónica; medios de pago aceptados (transferencia, pasarela de pagos, contraentrega u otros) y sus costos.",
        },
        {
          tipo: "p",
          texto:
            "Antes de la compra, {{marca}} informará la cobertura, el costo y el plazo de entrega. Si no se pacta un plazo, la ley fija un máximo de treinta (30) días calendario contados desde el día siguiente a su pedido; si la entrega se demora más o el producto no está disponible, usted podrá terminar el contrato y obtener la devolución de lo pagado (Ley 1480 de 2011, art. 50, literal h).",
        },
        {
          tipo: "pendiente",
          texto:
            "Definir zonas de envío, transportadoras, costos, tiempos, empaque discreto, entregas personales en {{ciudad}} y responsabilidad por pérdida o daño durante el transporte.",
        },
      ],
    },
    {
      id: "garantia-retracto-cambios",
      titulo: "Garantía, retracto, cambios y devoluciones",
      bloques: [
        {
          tipo: "p",
          texto:
            "Garantía legal: {{marca}} responderá por la calidad, idoneidad, seguridad y buen estado de los productos que venda (Ley 1480 de 2011, art. 7). Si no se indica otro término, la garantía de un producto nuevo es de un año contado desde la entrega (art. 8). Para hacerla efectiva, escriba a {{correo}} con su soporte de compra.",
        },
        {
          tipo: "p",
          texto:
            "Derecho de retracto: en las ventas a distancia, el consumidor puede retractarse dentro de los cinco (5) días hábiles siguientes a la entrega, salvo las excepciones de ley, entre ellas los bienes de uso personal y los confeccionados o personalizados según sus especificaciones. Los costos de transporte para devolver el producto corren por cuenta del consumidor. Si el retracto procede, se devolverá la totalidad de lo pagado, sin descuentos ni retenciones (Ley 1480 de 2011, art. 47).",
        },
        {
          tipo: "pendiente",
          texto:
            "Un abogado debe decidir si la lencería, los disfraces y otras prendas íntimas son «bienes de uso personal» excluidos del retracto, cómo se informará esa exclusión antes de la compra y el plazo de devolución del dinero cuando el retracto proceda. La Ley 2439 de 2024 (art. 3) modificó el plazo de devolución del artículo 47 para el comercio electrónico y las fuentes consultadas muestran versiones distintas: confirmar el texto vigente.",
        },
        {
          tipo: "p",
          texto:
            "Reversión del pago: si paga con tarjeta de crédito o débito u otro instrumento de pago electrónico, podrá pedir la reversión en casos de fraude, operación no solicitada, producto no recibido, distinto al pedido o defectuoso. Para ello, dentro de los cinco (5) días hábiles siguientes a conocer el hecho, debe presentar la queja ante {{marca}}, devolver el producto cuando proceda e informar la reclamación al emisor del medio de pago (Ley 1480 de 2011, art. 51).",
        },
        {
          tipo: "pendiente",
          texto:
            "Confirmar en qué casos aplica la reversión según los medios de pago que se habiliten. Definir la política voluntaria de cambios por talla, color o gusto: plazos y condiciones de higiene (prenda sin uso, con etiquetas y en su empaque). Esa política no puede limitar la garantía legal.",
        },
      ],
    },
    {
      id: "propiedad-intelectual",
      titulo: "Propiedad intelectual",
      bloques: [
        {
          tipo: "p",
          texto:
            "El nombre y el logotipo de {{marca}}, las fotografías, los videos, los textos y el diseño del sitio pertenecen a {{razonSocial}} o a quienes le otorgaron licencia, y están protegidos por las normas de derecho de autor (Ley 23 de 1982) y de propiedad industrial.",
        },
        {
          tipo: "p",
          texto: "Sin autorización escrita de {{marca}} está prohibido:",
        },
        {
          tipo: "lista",
          items: [
            "Descargar, copiar, grabar la pantalla o capturar el contenido para redistribuirlo.",
            "Publicarlo en otros sitios, redes, grupos o plataformas, con o sin ánimo de lucro.",
            "Editarlo, recortarlo, quitarle marcas de agua o crear montajes, incluidos los generados con inteligencia artificial.",
            "Usar el nombre o la imagen de {{marca}} o de su talento para suplantarlos o promocionar otros productos.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Puede compartir los enlaces del sitio. Para reportar un uso no autorizado, escriba a {{correo}}.",
        },
        {
          tipo: "pendiente",
          texto:
            "Verificar que la empresa sea titular o licenciataria de los derechos patrimoniales sobre fotos y videos (contratos con fotógrafos, editores y talento) y evaluar el registro de la marca ante la SIC.",
        },
      ],
    },
    {
      id: "talento-vinculado",
      titulo: "Talento vinculado",
      bloques: [
        {
          tipo: "p",
          texto:
            "{{marca}} solo promocionará en el sitio a modelos mayores de 18 años que tengan una relación comercial formal con la empresa y que hayan autorizado por escrito el uso de su imagen.",
        },
        {
          tipo: "p",
          texto:
            "El sitio no es un directorio abierto. Las consultas comerciales sobre el talento (campañas, colaboraciones o promoción) se atienden solo por los canales oficiales de {{marca}}. Del talento solo se publicarán el nombre artístico, la imagen y los datos que cada persona haya autorizado; {{marca}} no publicará nombres legales, documentos, direcciones, teléfonos ni otros datos privados del talento, y no los compartirá con los usuarios.",
        },
        {
          tipo: "p",
          texto:
            "Está prohibido acosar al talento, intentar identificarlo o ubicarlo, o difundir datos sobre su vida privada. Si usted aparece en un contenido sin haberlo autorizado, siga el procedimiento de retiro de la Política de tratamiento de datos personales.",
        },
        {
          tipo: "pendiente",
          texto:
            "Revisar con un abogado el contrato con el talento (autorización de imagen, verificación de edad, remuneración y retiro de contenido) y delimitar por escrito que la promoción del talento se limita a la publicidad de contenido y productos de la empresa.",
        },
      ],
    },
    {
      id: "conducta-prohibida",
      titulo: "Conducta prohibida",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Usar el sitio siendo menor de 18 años o permitir que un menor de edad lo use.",
            "Hacer pedidos falsos, suplantar a otra persona o entregar datos falsos.",
            "Intentar evadir el aviso de edad, vulnerar la seguridad del sitio, introducir código malicioso o extraer contenido de forma automatizada.",
            "Enviar a nuestros canales contenido ilegal, amenazante o que involucre a menores de edad.",
            "Acosar o amenazar al personal o al talento de {{marca}}.",
            "Usar el sitio para fines contrarios a la ley colombiana.",
          ],
        },
        {
          tipo: "p",
          texto:
            "{{marca}} podrá bloquear a quien incurra en estas conductas, suspender la atención o la venta y, cuando corresponda, informar a las autoridades.",
        },
      ],
    },
    {
      id: "enlaces-y-responsabilidad",
      titulo: "Enlaces a terceros y responsabilidad",
      bloques: [
        {
          tipo: "p",
          texto:
            "El sitio incluye enlaces a WhatsApp, Instagram, TikTok y Facebook. Al abrirlos, usted sale del sitio y aplican los términos y políticas de privacidad de esas plataformas, que {{marca}} no controla.",
        },
        {
          tipo: "p",
          texto:
            "{{marca}} procurará que el sitio funcione de forma continua y que la información sea correcta, pero puede haber interrupciones por mantenimiento, fallas técnicas o causas ajenas a la empresa. {{marca}} no responde por fallas del dispositivo o la conexión del usuario, ni por el uso indebido que terceros hagan del contenido.",
        },
        {
          tipo: "p",
          texto:
            "Nada de lo dispuesto en estos términos limita los derechos que la ley reconoce a los consumidores, en especial los del Estatuto del Consumidor (Ley 1480 de 2011).",
        },
        {
          tipo: "pendiente",
          texto:
            "Un abogado debe revisar esta sección para evitar cláusulas que puedan considerarse abusivas frente al consumidor.",
        },
      ],
    },
    {
      id: "ley-aplicable-y-contacto",
      titulo: "Ley aplicable, cambios y contacto",
      bloques: [
        {
          tipo: "p",
          texto:
            "Estos términos se rigen por las leyes de la República de Colombia. Como consumidor, usted puede acudir a la Superintendencia de Industria y Comercio (www.sic.gov.co) o a los jueces competentes.",
        },
        {
          tipo: "p",
          texto:
            "{{marca}} podrá actualizar estos términos; la versión publicada indicará la fecha de su última actualización. Cada compra se rige por los términos vigentes cuando se acordó.",
        },
        {
          tipo: "lista",
          items: [
            "Correo: {{correo}}",
            "Teléfono: {{telefono}}",
            "Dirección: {{direccion}}, {{ciudad}}",
          ],
        },
        {
          tipo: "pendiente",
          texto:
            "Incluir en el sitio un enlace visible a la página de la SIC (Ley 1480 de 2011, art. 50, parágrafo) y definir el canal de peticiones, quejas y reclamos con número de radicado (art. 50, literal g).",
        },
      ],
    },
  ],
};
