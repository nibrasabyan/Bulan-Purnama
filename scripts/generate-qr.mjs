/* Generator QR hati — jalankan dari root project: node scripts/generate-qr.mjs */
import QRCode from "qrcode";
import jsQR from "jsqr";
import pngjs from "pngjs";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const { PNG } = pngjs;

const SITE_URL = "https://nibrasabyan.github.io/Bulan-Purnama/";
const QUIET = 5; // quiet zone (modul)

// ---- siluet hati (kurva parametrik, y ke atas) ----
function heartPts(xFat, yFat) {
  const pts = [];
  for (let i = 0; i <= 72; i++) {
    const t = (i / 72) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3) * xFat;
    const y =
      (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * yFat;
    pts.push([x, y]);
  }
  return pts;
}

function pointInPoly(px, py, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function buildMatrix(ec, xFat, yFat) {
  const qr = QRCode.create(SITE_URL, { errorCorrectionLevel: ec });
  const size = qr.modules.size;
  const half = size / 2;
  // hati diregangkan mengikuti grid: lebar penuh, dagu menyentuh bawah
  const xScale = (half / 16) * xFat;
  const yScale = (half / 17) * yFat;
  const pts = heartPts(1, 1);
  const inside = (r, c) => {
    const hx = (c + 0.5 - half) / xScale;
    const hy = (half - (r + 0.5)) / yScale;
    return pointInPoly(hx, hy, pts);
  };
  const dark = new Uint8Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const reserved = qr.modules.isReserved(r, c);
      const bit = qr.modules.get(r, c);
      dark[r * size + c] = reserved ? (bit ? 1 : 0) : inside(r, c) && bit ? 1 : 0;
    }
  }
  return { size, dark };
}

function decodeTest(dark, size) {
  const dim = size + QUIET * 2;
  const data = new Uint8ClampedArray(dim * dim * 4);
  for (let r = 0; r < dim; r++) {
    for (let c = 0; c < dim; c++) {
      const rr = r - QUIET;
      const cc = c - QUIET;
      const isDark =
        rr >= 0 && rr < size && cc >= 0 && cc < size && dark[rr * size + cc] === 1;
      const v = isDark ? 20 : 255;
      const i = (r * dim + c) * 4;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
  }
  const res = jsQR(data, dim, dim);
  return res && res.data === SITE_URL;
}

const variants = [
  { ec: "H", xFat: 1.5, yFat: 1.42 },
  { ec: "H", xFat: 1.42, yFat: 1.35 },
  { ec: "H", xFat: 1.6, yFat: 1.5 },
  { ec: "Q", xFat: 1.5, yFat: 1.42 },
  { ec: "Q", xFat: 1.7, yFat: 1.6 },
  { ec: "M", xFat: 1.7, yFat: 1.6 },
];

let chosen = null;
for (const v of variants) {
  const m = buildMatrix(v.ec, v.xFat, v.yFat);
  const ok = decodeTest(m.dark, m.size);
  console.log(`EC ${v.ec} fat ${v.xFat}: decode = ${ok ? "OK" : "gagal"}`);
  if (ok) {
    chosen = { ...v, ...m };
    break;
  }
}
if (!chosen) {
  console.error("Semua varian gagal decode — periksa URL/masker");
  process.exit(1);
}

const { size, dark } = chosen;
const dim = size + QUIET * 2;

// ---- SVG (dipasang di tiket) ----
let rects = "";
for (let r = 0; r < size; r++) {
  for (let c = 0; c < size; c++) {
    if (dark[r * size + c]) {
      rects += `<rect x="${c + QUIET}" y="${r + QUIET}" width="1" height="1"/>`;
    }
  }
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" width="240" height="240" role="img" aria-label="QR code undangan">
  <rect width="${dim}" height="${dim}" rx="14" fill="#1c1017"/>
  <g fill="#ff5fa8" shape-rendering="crispEdges">${rects}</g>
</svg>`;
mkdirSync(path.join(process.cwd(), "src/assets"), { recursive: true });
writeFileSync(path.join(process.cwd(), "src/assets/qr-heart.svg"), svg);

// ---- PNG share (1200px, gaya referensi: pink di atas gelap) ----
mkdirSync(path.join(process.cwd(), "public"), { recursive: true });
const S = Math.floor(1200 / dim);
const W = dim * S;
const png = new PNG({ width: W, height: W });
for (let y = 0; y < W; y++) {
  for (let x = 0; x < W; x++) {
    const r = Math.floor(y / S) - QUIET;
    const c = Math.floor(x / S) - QUIET;
    const inGrid = r >= 0 && r < size && c >= 0 && c < size;
    const isDark = inGrid && dark[r * size + c] === 1;
    const i = (y * W + x) * 4;
    if (isDark) {
      png.data[i] = 255;
      png.data[i + 1] = 95;
      png.data[i + 2] = 168;
    } else {
      png.data[i] = 28;
      png.data[i + 1] = 16;
      png.data[i + 2] = 23;
    }
    png.data[i + 3] = 255;
  }
}
png.pack();
writeFileSync(path.join(process.cwd(), "public/qr-heart.png"), PNG.sync.write(png));

console.log(`OK — versi ${chosen.ec}, grid ${size}×${size}`);
console.log("Tergenerate: src/assets/qr-heart.svg + public/qr-heart.png");
