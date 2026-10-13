import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // WAJIB: base harus persis sama dengan nama repo GitHub Pages
  // (huruf besar/kecil sama) supaya aset terbaca di
  // https://nibrasabyan.github.io/Bulan-Purnama/
  base: "/Bulan-Purnama/",
});
