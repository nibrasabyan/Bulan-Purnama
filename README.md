# Bulan Purnama 🤍

Website ajakan jalan dari **Nibras** untuk **Bulan** — single page interaktif, dibuat dengan React + Vite (JavaScript), CSS biasa, tanpa backend. Live di GitHub Pages:
https://nibrasabyan.github.io/Bulan-Purnama/

## Menjalankan lokal

```bash
yarn install    # atau: npm install
yarn dev        # buka http://localhost:5173
```

## Sebelum deploy — cek 3 hal dulu

1. **`src/config.js`** → ganti `whatsappNumber` (`"6281234567890"` masih placeholder) dengan nomor WhatsApp Nibras asli, format `62xxxxxxxxxx`.
2. **`src/assets/foto.jpg`** → ganti dengan foto final (pakai nama file yang sama, tanpa mengubah kode).
3. **`src/config.js`** → `senderNote` adalah catatan dari Nibras yang muncul di tiket; ganti kapan saja.

## Deploy ke GitHub Pages

```bash
yarn deploy     # atau: npm run deploy
```

`predeploy` otomatis menjalankan build (`vite build`), lalu `gh-pages` mengunggah folder `dist` ke branch `gh-pages`. Di GitHub, pastikan **Settings → Pages → Source: branch `gh-pages` (root)**.

> `base: '/Bulan-Purnama/'` di `vite.config.js` harus persis sama dengan nama repo — jangan diubah selama nama repo tidak berubah.

## Struktur

```
src/
  components/   Envelope, FlowerAnimation, Message, Invitation,
                DatePicker, ActivityPicker, DressCodePicker, Ticket
  config.js     semua teks UI, nomor WhatsApp, tema warna, daftar opsi
  styles/       CSS biasa per step (global.css = tema & font)
  App.jsx       alur 8 step + state (date, time, activities, dressCode, note, dst.)
  assets/foto.jpg
```
