/**
 * Genera los recursos de marca optimizados a partir de los archivos
 * originales de la carpeta raíz (no los modifica):
 *   - "Logotipo dorado MDL ViNiLO!COL.png" (recorte con transparencia)
 *
 * Salidas:
 *   assets/brand/logo-mdl-vinilo.webp   maestro recortado para next/image
 *   app/icon.png, app/favicon.ico        favicon (monograma MDL del logo)
 *   app/apple-icon.png                   180×180, logo completo sobre negro
 *   public/brand/icon-192.png, icon-512.png  iconos del manifest
 *   app/opengraph-image.jpg, app/twitter-image.jpg  1200×630
 *
 * Uso: npm run assets
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SRC = "Logotipo dorado MDL ViNiLO!COL.png";
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };

await mkdir("assets/brand", { recursive: true });
await mkdir("public/brand", { recursive: true });

// 1. Maestro recortado: elimina el margen transparente (alpha > 8 empieza en
//    x=36, y=9) conservando 12 px de aire para el brillo exterior.
const meta = await sharp(SRC).metadata();
const trim = { left: 24, top: 0, width: meta.width - 24 - 0, height: meta.height };
await sharp(SRC)
  .extract(trim)
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile("assets/brand/logo-mdl-vinilo.webp");

// 2. Monograma "MDL" del propio logotipo para tamaños de favicon.
//    Las letras con su contorno negro ocupan x≈410–1075, y≈290–570.
const mdl = await sharp(SRC)
  .extract({ left: 400, top: 280, width: 680, height: 290 })
  .flatten({ background: "#000000" })
  .toBuffer();

async function monogram(size) {
  const inner = Math.round(size * 0.92);
  const letters = await sharp(mdl).resize({ width: inner }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BLACK } })
    .composite([{ input: letters, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// 3. Logo completo sobre negro (iconos grandes).
async function fullLogoSquare(size, pad = 0.08) {
  const inner = Math.round(size * (1 - pad * 2));
  const logo = await sharp(SRC)
    .extract({ left: 30, top: 5, width: 1390, height: 1098 })
    .resize({ width: inner })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BLACK } })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await writeFile("app/icon.png", await monogram(64));
await writeFile("app/apple-icon.png", await fullLogoSquare(180, 0.06));
await writeFile("public/brand/icon-192.png", await fullLogoSquare(192, 0.06));
await writeFile("public/brand/icon-512.png", await fullLogoSquare(512, 0.06));

// 4. favicon.ico con PNG embebidos (16, 32, 48) — formato ICO estándar.
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((s) => monogram(s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);
let offset = 6 + 16 * icoSizes.length;
const entries = icoSizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
await writeFile("app/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));

// 5. Imagen para redes (Open Graph / X): logo sobre negro con halo dorado
//    tenue y filete dorado fino.
const W = 1200;
const H = 630;
const glow = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="55%">
      <stop offset="0" stop-color="#E8A818" stop-opacity="0.22"/>
      <stop offset="0.55" stop-color="#7a5208" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#000"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#C8901A" stroke-opacity="0.55" stroke-width="1.5"/>
</svg>`);
const ogLogo = await sharp(SRC)
  .extract({ left: 30, top: 5, width: 1390, height: 1098 })
  .resize({ height: 500 })
  .toBuffer();
const og = await sharp(glow)
  .composite([{ input: ogLogo, gravity: "center" }])
  .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toBuffer();
await writeFile("app/opengraph-image.jpg", og);
await writeFile("app/twitter-image.jpg", og);

console.log("Recursos de marca generados.");
