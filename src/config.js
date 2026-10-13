// ============================================================
//  CONFIG — Semua yang mudah berubah kumpul di sini.
//  Ganti nomor WhatsApp, foto (src/assets/foto.jpg), dan semua
//  teks penting di file ini tanpa menyentuh komponen.
// ============================================================

// --- Identitas ---
export const people = {
  sender: { full: "Nibras Shiddiq Abyan", nick: "Nibras" },
  receiver: { full: "Wulan Purnamasari", nick: "Bulan" },
};

// --- Nomor WhatsApp Nibras (format internasional, tanpa "+") ---
// GANTI dengan nomor asli, contoh: "6281234567890"
export const whatsappNumber = "6281234567890";

// --- Tema warna (disinkronkan ke CSS variables oleh App) ---
export const theme = {
  primary: "#d9566f",   // rose-merah: aksen & tombol
  secondary: "#f7c8d0", // pink lembut
  background: ["#fdf4ec", "#fce9ec", "#f5e8f1"], // gradien cream-pink
  card: "#e8f5ef",      // mint pucat
  accent: "#f2b8c6",    // rose muda
};

// --- Step 1: Surat pembuka ---
export const letter = {
  label: "PERSONAL INVITATION · FOR BULAN",
  teaser: "Ada sesuatu yang spesial buat kamu",
  hint: "Ketuk untuk membuka",
};

// --- Step 3: Pesan apresiasi ---
export const message = {
  label: "for Wulan Purnamasari",
  paragraphs: [
    "Karya kecil ini aku buat khusus untukmu, sebagai bentuk apresiasi setinggi-tingginya atas semua usaha dan kerja kerasmu.",
    "Dari SPV Raja Brawijaya, Wakapel Teras Budaya, Humas Ospek Fakultas, Pengkaderan, sampai LK 1, kamu menjalani semua amanah dan tanggung jawab itu dengan sungguh-sungguh.",
    "Aku ingin mengajakmu berhenti sejenak, dan mengapresiasi dirimu sendiri atas setiap proses yang sudah kamu lewati. Kamu sudah melakukan banyak hal hebat, dan kamu layak merayakannya. 🤍",
  ],
  nextLabel: "Lanjut",
};

// --- Step 4: Ajakan ---
export const invitation = {
  caption: "Would you like to go out with me?",
  yesLabel: "Yes",
  noLabel: "No",
  noTexts: [
    "Yakin?",
    "Coba lagi deh",
    "Nggak bisa lho 😝",
    "Hehe, salah tombol 🙈",
    "Yes-nya lebih menarik kok 😉",
    "Kabur lagi, hihi 😚",
  ],
};

// --- Step 5: Kapan free ---
export const when = {
  title: "Kapan kamu free?",
  nextLabel: "Lanjut",
};

// Pilihan waktu cepat (pilih satu → mengisi jam default)
export const times = [
  { id: "pagi", label: "Pagi", hour: "09:00" },
  { id: "siang", label: "Siang", hour: "12:00" },
  { id: "sore", label: "Sore", hour: "15:30" },
  { id: "malam", label: "Malam", hour: "18:00" },
];

// --- Step 6: Rencana kita ---
export const plan = {
  label: "rencana kita",
  title: "Mau ngapain nanti?",
  customPlaceholder: "atau tulis ide kamu...",
  customButton: "Oke",
  nextLabel: "Lanjut",
};

export const activities = [
  { id: "makan", emoji: "🍜", label: "Makan" },
  { id: "nonton", emoji: "🎬", label: "Nonton bioskop" },
  { id: "ngopi", emoji: "☕", label: "Ngopi" },
  { id: "jalan", emoji: "🌳", label: "Jalan-jalan" },
  { id: "dessert", emoji: "🍰", label: "Dessert" },
  { id: "karaoke", emoji: "🎤", label: "Karaoke" },
  { id: "photobooth", emoji: "📸", label: "Photobooth" },
  { id: "belanja", emoji: "🛍️", label: "Belanja" },
  { id: "terserah", emoji: "🤍", label: "Terserah kamu aja" },
];

// --- Step 7: Dress code ---
export const dresscode = {
  label: "biar makin niat",
  title: "Dress code-nya?",
  customPlaceholder: "atau tulis sendiri...",
  noteLabel: "Ada catatan buat Nibras?",
  noteMax: 120,
  nextLabel: "Lanjut",
};

export const dressCodeOptions = [
  "Casual",
  "Semi-formal",
  "Warna senada",
  "Cozy",
  "Bebas",
];

// --- Step 8: Tiket ---
export const ticket = {
  kicker: "SIMPAN TIKETMU DI BAWAH",
  title: "Yeay, it's a date!",
  admit: "ADMIT TWO",
  name: "Date Invitation",
  labels: {
    untuk: "UNTUK",
    kapan: "KAPAN",
    acara: "ACARA",
    dressCode: "DRESS CODE",
    notes: "NOTES DARI BULAN",
    catatan: "CATATAN DARI NIBRAS",
  },
  footer: "Would you like to go out with me?",
  waButton: "Kirim ke Nibras via WhatsApp",
  resetButton: "Ulangi dari awal",
  hint: "Screenshot tiketmu ya 📸",
};

// --- Catatan dari Nibras (muncul di tiket — ganti sendiri ya) ---
export const senderNote = "Sampai ketemu ya! 🤍";
