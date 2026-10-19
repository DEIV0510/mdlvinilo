# MDL Vinilo Colombia — sitio web

Sitio oficial de **MDL Vinilo Colombia** (Floridablanca, Santander): colección de lencería, trajes y
piezas de temporada, talento vinculado, servicios audiovisuales y publicitarios, y contacto comercial.

- **Tecnología:** Next.js 16 (App Router) + React 19 + TypeScript + CSS Modules. Sin librerías de UI ni
  de animación; tipografías Unbounded (titulares), Fraunces (acentos en cursiva) y Archivo (texto), servidas desde el propio sitio (`next/font`).
- **Identidad:** construida a partir de los archivos originales `Logotipo dorado MDL ViNiLO!COL.png` y
  `logo.jpeg` (se conservan intactos en la raíz). Los recursos optimizados se generan con
  `npm run assets`.

---

## Ejecutar

Requisitos: Node.js 20.9 o superior (probado con Node 24).

```bash
npm install
npm run dev          # desarrollo en http://localhost:3000 (muestra contenido de EJEMPLO)
npm run build        # compilación de producción
npm start            # servidor de producción en http://localhost:3000
```

Comprobaciones:

```bash
npm run lint         # ESLint (configuración oficial de Next)
npm run typecheck    # TypeScript estricto
```

> En `npm run dev` aparecen productos, novedades y perfiles **de ejemplo** (con la etiqueta «Ejemplo»)
> y un recuadro con los datos pendientes. En `npm run build` / `npm start` **nunca** se muestran.
> Para revisar una compilación de producción con ejemplos: `MDL_DEMO=1 npm run build`.

---

## Qué completar antes de publicar

Todo se edita en **`config/sitio.ts`** (o con variables de entorno, ver `.env.example`):

| Dato | Dónde | Efecto |
|---|---|---|
| Número de WhatsApp | `NEXT_PUBLIC_WHATSAPP` o `whatsapp.numero` | Sin él, los botones de consulta abren el chat de Instagram y copian el mensaje. |
| Dominio definitivo | `NEXT_PUBLIC_SITE_URL` | Activa canonical, sitemap e imágenes para redes con URL absoluta. |
| URL oficial de Facebook | `redes.facebook.url` | Se encontró `https://www.facebook.com/MdlViniloCol/` (parece de la marca, pero está vacía): confirmar antes de pegarla. |
| Otra red oficial | `redes.otra` | Opcional. |
| Razón social, NIT, correo, teléfono, dirección | `empresa` | Se muestran en el pie y completan los textos legales. |

Las redes ya configuradas (verificadas públicamente): Instagram `@mdlvinilocol` (cuenta verificada) y
TikTok `@mdlcol`.

### Contenido

| Qué | Archivo | Notas |
|---|---|---|
| Productos | `content/productos.ts` | Fotos en `public/catalogo/` (WebP/AVIF, 4:5). Precio, tallas y disponibilidad solo si están confirmados. |
| Novedades | `content/novedades.ts` | Pueden enlazar a un producto (`productoSlug`). |
| Talento | `content/talento.ts` | Un perfil **no se publica** sin vínculo comercial, autorización de imagen y mayoría de edad verificados, ni con la autorización vencida. |
| Servicios | `content/servicios.ts` | Solo se muestran los `confirmado: true`. |
| Textos legales | `content/legal/*.ts` | **Borradores** pendientes de revisión jurídica (ver abajo). |

Cada archivo incluye un ejemplo comentado del formato.

---

## Funcionalidades

- **Pantalla de carga** breve: se retira en cuanto fuentes e imagen principal están listas (máx. 2,2 s;
  respaldo CSS a los 3 s), no se repite en la misma sesión, respeta `prefers-reduced-motion` y no
  bloquea clics ni teclado. Sin JavaScript no aparece.
- **Acceso +18 en el servidor** (`proxy.ts`): sin declaración, cualquier ruta (también las internas)
  muestra la pantalla de acceso en la misma URL. Formulario HTML (funciona sin JavaScript) →
  `app/api/edad/route.ts` guarda una cookie de sesión `HttpOnly`. «Salir» lleva a `/salida` y se
  mantiene durante la sesión. Las páginas legales son públicas. Es una **declaración**, no una
  verificación de identidad.
- **Buscadores:** Googlebot y Bingbot verificados por DNS inverso + directo (no solo por User-Agent)
  ven el contenido, como recomienda Google para sitios con acceso por edad
  (`seo.rastreadoresVerificados`).
- **Mi selección:** lista de consulta guardada en el dispositivo; se envía como un único mensaje de
  WhatsApp con productos, tallas, colores y cantidades. No simula compras ni pagos.
- **Consultas contextuales:** cada botón precarga un mensaje con el producto, la categoría, el
  servicio o el perfil correspondiente.
- **Estados honestos:** sin productos, novedades o perfiles reales, las secciones muestran invitaciones
  a consultar o a seguir las redes, nunca contenido ficticio.
- **Imágenes que fallan:** se sustituyen por una lámina tipográfica de la marca, sin saltos de diseño.
- **SEO:** metadatos por página, Open Graph/X, favicon con el monograma del logotipo, `robots.txt`,
  `sitemap.xml` (cuando hay dominio), datos estructurados solo con información verificable.
- **Seguridad:** cabeceras (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy), sin
  scripts de terceros, sin secretos en el cliente, validación de destinos de redirección y de los datos
  guardados en el navegador.

---

## Desplegar

### Opción A — Vercel (plan Pro)

1. Importar el repositorio `DEIV0510/mdlvinilo` en Vercel (framework: Next.js).
2. Variables de entorno: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP`.
3. Conectar el dominio (la marca parece tener `mdlvinilocol.com`; confirmar).

> El plan gratuito (Hobby) de Vercel es solo para uso no comercial. Su política de uso aceptable
> prohíbe contenido «obsceno»: mantener el sitio sin material explícito.

### Opción B — Servidor propio (VPS, p. ej. Hostinger VPS, Railway, Render, Fly.io)

```bash
git clone https://github.com/DEIV0510/mdlvinilo.git
cd mdlvinilo
npm ci
NEXT_PUBLIC_SITE_URL=https://tu-dominio NEXT_PUBLIC_WHATSAPP=57XXXXXXXXXX npm run build
npm start -- -p 3000      # detrás de Nginx con HTTPS; mantener vivo con PM2 o systemd
```

Para el pase de buscadores verificados, el proxy inverso debe fijar la IP real en una cabecera que el
visitante no pueda falsificar y indicarla en `MDL_CABECERA_IP` (p. ej. Nginx:
`proxy_set_header X-Real-IP $remote_addr;` y `MDL_CABECERA_IP=x-real-ip`). Sin esa variable, el pase
queda desactivado y los buscadores ven la pantalla de acceso. En Vercel no hace falta configurar nada.

> No guardes el HTML en una caché compartida (CDN/Nginx) sin tener en cuenta la cookie `mdl_edad`:
> el sitio ya responde con `Cache-Control: private` en las páginas protegidas.

> No se requiere base de datos ni claves privadas. Si en el futuro se agrega una pasarela de pagos,
> sus claves secretas deben ir solo en variables de entorno del servidor, nunca en `NEXT_PUBLIC_*`.

---

## Pendientes legales y comerciales (requieren asesoría)

Los textos de `content/legal/` son borradores y lo indican en pantalla. Antes de publicar conviene
revisar con un abogado, entre otros: datos del responsable y política de tratamiento (Ley 1581 de 2012,
Decreto 1377 de 2013), autorización de datos en conversaciones de WhatsApp/Instagram, contratos y
autorizaciones de imagen del talento (Ley 23 de 1982, art. 87), suficiencia de la declaración de edad
(Ley 679 de 2001, Ley 1336 de 2009, Decreto 1524 de 2002), derecho de retracto y prendas de uso
personal, garantías y reversión del pago (Ley 1480 de 2011), y facturación.

Restricciones de plataformas a tener en cuenta: la política de WhatsApp Business prohíbe promover
«productos y servicios para adultos» (usar WhatsApp para la tienda de lencería y valorar un canal
separado para el talento); Meta y TikTok restringen anuncios de entretenimiento para adultos; las
pasarelas colombianas (Wompi, ePayco, PayU, Bold, Mercado Pago) restringen comercios de contenido para
adultos o que enlacen a ellos.
