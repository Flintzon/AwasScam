---
name: AWAS KENA TIPU!
description: "Misi Dana Pensiun — selidiki pesannya, jangan cuma dibaca; game literasi penipuan digital bergaya Editorial Digital Detective"
colors:
  ink: "#172640"
  ink-soft: "#3f4d6b"
  ink-muted: "#5d6982"
  line: "#d8dde8"
  line-strong: "#b6bfd2"
  mist: "#f3f6fa"
  paper: "#ffffff"
  accent: "#ff751f"
  accent-deep: "#b04a00"
  accent-tint: "#ffe8db"
  safe-tint: "#e3e8f1"
  artifact-whatsapp-bg: "#101c33"
  artifact-whatsapp-bar: "#172640"
  artifact-browser-dot-red: "#ff751f"
  artifact-browser-dot-yellow: "#f7cbae"
  artifact-browser-dot-green: "#b6bfd2"
typography:
  display:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 4vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  hero:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.1rem, 5.2vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
rounded:
  chip: "6px"
  tile: "7px"
  btn: "8px"
  card: "14px"
  panel: "10px"
  pill: "999px"
---

# AWAS KENA TIPU! — Sistem Desain "Editorial Digital Detective"

## Kepribadian

Ruang kerja detektif digital yang rapi, tenang, dan kredibel: kertas putih, tinta navy,
satu warna sinyal. Bukan komik, bukan dashboard keamanan — ini **publikasi investigasi**
yang bisa disentuh. Setiap layar mengajak pembaca memeriksa bukti, bukan menonton pertunjukan.
Anti-reference yang terkonfirmasi: cream/coral/detective-blue era lama, comic-neon minigame
(glow, scanline, ledakan "TERBONGKAR"), glassmorphism, gradien teks, kartu rounded seragam.

## Palet (dikunci — triad 60-30-10)

Hanya tiga warna inti: navy, light, oranye (+ tint/shade turunannya). Tidak ada
warna lain — teal, merah, kuning, hijau semuanya sudah dilebur ke triad ini.

| Peran | Nilai | Aturan |
|---|---|---|
| Light 60% | `#F3F6FA` | Background halaman, stage panggung, panel terang; `#FFFFFF` sebagai kertas netral (kartu, nav). |
| Navy 30% | `#172640` | Teks utama, tombol primer, panel gelap, **sinyal aman/resmi** (dulu teal). Soft `#3F4D6B`, muted `#5D6982` untuk teks sekunder/tersier. |
| Accent 10% | `#FF751F` | Perhatian: petunjuk, bahaya, CTA "Mulai Misi", "!" logo, node langkah, tanda kutip bukti. Di atas light bawa teks navy (kontras ~5.4:1); teks oranye di permukaan light memakai deep `#B04A00`. |
| Tints | `#FFE8DB` (aksen) / `#E3E8F1` (aman) | Latar chip & banner; selalu berpasangan dengan teks `#B04A00` / navy. |
| Garis | `#D8DDE8` / `#B6BFD2` | Pemisah tipis 1px; tidak ada border tebal dekoratif. |

Semantik: **navy = aman/struktur/resmi**, **oranye = perhatian/petunjuk/bahaya/CTA**.
Aman di atas panel gelap memakai light `#F3F6FA` (navy tak terlihat di navy).

Kolaborasi: light bg + oranye = catatan petunjuk (`.panel-tint`, tape, mark); light
tint + navy = status benar (`.chip-teal`); navy bg + light = momen penutup (`.panel-ink`).

**Gelap hanya di dalam artefak otentik**: layar WhatsApp (`#101C33`), layar panggilan,
situs scam (tint navy `#14233F` / `#1B2B4A`). Jangan pernah membuat shell UI gelap.

## Tipografi

- **Newsreader** (serif, 400–700, self-hosted `public/fonts/newsreader-latin.woff2`):
  semua `h1–h4` otomatis, angka besar. Karakter: editorial, tenang, berwibawa.
- **Public Sans** (300–800, `public/fonts/publicsans-latin.woff2`): body, tombol, chip, UI.
- **Mono sistem**: hanya data nyata — URL, kode OTP, nomor rekening, timer.
- Judul hero maks `4.6rem`, halaman `2.8rem`; measure teks 52–66ch; tracking minimal `-0.01em`
  (jangan turun ke -0.04em, serif ini cepat rapat).
- Tidak ada uppercase letter-spaced kickers. Label fungsional boleh kecil-tebal normal-case.

## Layout & Halaman

- **Nav** (`SiteChrome`): putih sticky, tinggi 62px, border-b 1px; wordmark "AWAS KENA TIPU!" +
  "!" accent, sublabel "Misi Dana Pensiun"; link aktif = teks ink + underline 2,5px accent.
  Tiga link (Kasus, Panduan, Progres) + CTA "Mulai Misi" (btn-primary sm) di kanan, desktop &
  mobile; "Tentang & Kredit" hanya di footer.
- **Homepage**: empat bagian. (1) Hero: kicker mono berkas + headline Newsreader max-w 15ch
  dengan sorotan kuning, deck, CTA "Mulai Misi"/"Kenali Permainannya", sinyal "Game interaktif";
  visual = artefak chat miring (BUKTI 01) + maskot investigating menyelidiki. (2) Cara bermain:
  alur 4 langkah berbenang merah (dashed thread) — bukan kartu seragam. (3) Berkas kasus: case 1
  featured besar + 3 baris thumbnail, seluruh baris tautan. (4) Penutup panel tinta: headline
  "Naluri itu bisa dilatih", CTA kuning, maskot completion dalam disc kuning.
- **Katalog kasus** (`/kasus`): baris editorial bergaris rambut — seluruh baris jadi tautan,
  numeral serif + `level-dots` + durasi + panah; filter level = tab underline (`aria-pressed`),
  bukan pil. Tanpa kartu grid.
- **Detail kasus** (`/kasus/[slug]`): minimal vertikal — kembali, meta (Kasus 0X · level ·
  durasi), judul, `CaseCover` 16/9 tanpa bayangan, ringkasan, satu baris "Tujuan.", satu CTA.
  Tanpa chip/panel tint/checklist kompetensi.
- Measure: body 65–75ch; section padding `py-12 lg:py-16`.

## Komponen (di `globals.css`)

- `.btn` — radius 6px, `btn-primary` (ink), `btn-teal` (alias navy), `btn-secondary` (putih+garis),
  `btn-danger` (oranye, teks navy), `btn-yellow` (oranye = CTA misi), `btn-ghost`; ukuran
  `btn-sm/lg/block`. Tanpa bayangan offset keras; hover = perubahan warna/border saja.
- `.card` — putih, border 1px `--line`, radius 6px. `.card-hover` hover = border-color saja.
- `.chip` — radius 6px, label kecil; varian `chip-ink/teal/red/yellow/outline` (teal=navy,
  red/yellow=oranye tint).
- `.meter` — bar 8px; isian navy (aman) atau oranye (bahaya) lewat inline style.
- `.icon-tile` — kotak ke radius 6px, mist bg, ikon ink (lucide).
- `.note-mascot` — maskot 56px + teks, tanpa bubble ekor.
- `.panel-tint` (aksen oranye) & `.panel-ink` (navy) radius 6px untuk aksen.
- Fokus: outline 3px navy; di dalam `.panel-dark` outline menjadi oranye agar kontras.

## Panggung Permainan (`GameExperience`)

- Stage **terang**: bg mist; header Kembali / "Kasus 0X · judul" / Ulangi; **status ringkas
  satu baris** — meter Kewaspadaan + poin + tombol Petunjuk (`aria-expanded`, membuka satu
  baris teks, bukan panel). Panggung kasus = kartu putih border radius 6px tanpa bayangan
  besar; footer = satu baris disclaimer ("Simulasi edukasi — …fiktif"), bukan poin.
- Bukti di atas (`CaseArt`), dialog tepat di bawah (`ComicDialogBox`) — tidak tumpang tindih.
- Dialog: chip speaker `chip-ink`, teks 66ch, pilihan = baris putih border 1px radius 6px
  **tanpa ikon** (label + label kedua + chevron kanan), risky = shake + ring oranye, aman = ring navy.
- Minigame (modal): shell putih di atas backdrop ink-blurred; mekanik & skor dipertahankan;
  kegelapan hanya pada artefak (chat, layar panggilan, situs scam); tanpa glow/ledakan/
  scanline/kedip; feedback sukses = tint aman (navy), gagal = tint bahaya (oranye).

## Maskot

8 pose SVG orisinal di `public/assets/mascot/` — duotone triad: jas/rambut navy `#172640`,
kulit & aksen oranye `#FF751F`, kaos `#F3F6FA`. Hanya di momen yang bermakna:
halaman hasil kasus (`completion`) dan umpan balik minigame (`success`/`alert`); tanpa
mascot di nav, panduan, progres, atau panel petunjuk.

## Do / Don't

- **Do**: mulai tiap halaman dengan satu pernyataan besar (Newsreader) + bukti nyata;
  pakai lucide untuk semua ikon; pertahankan warna otentik artefak (WhatsApp, traffic-light
  browser, emas scam di dalam sandboxnya).
- **Do**: status selalu punya teks — jangan hanya warna (a11y), fokus 3px navy (oranye di panel gelap).
- **Don't**: gradien teks, emoji sebagai ikon, angka 01/02/03 dekoratif, kartu seragam
  tanpa hierarki, bayangan offset keras `0 4px 0`, pill tombol, glassmorphism, hue di luar
  triad, teks oranye terang untuk body kecil di atas putih (pakai `#B04A00`).
