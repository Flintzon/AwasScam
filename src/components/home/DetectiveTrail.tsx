'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileCode2,
  Lock,
  PhoneCall,
  Check,
  ChevronDown,
  Sparkles,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Mascot } from '../Mascot';
import { playClick, playEvidenceFound, playDramaticHit } from '../../utils/sound';

export function DetectiveTrail() {
  // Interactive inspection state for each scene
  const [inspectMode1, setInspectMode1] = useState(false);
  const [smsTab, setSmsTab] = useState<'palsu' | 'resmi'>('palsu');
  const [showSecretTip3, setShowSecretTip3] = useState(false);

  const toggleInspect1 = () => {
    if (!inspectMode1) playEvidenceFound();
    else playClick();
    setInspectMode1(!inspectMode1);
  };

  const handleSmsSwitch = (tab: 'palsu' | 'resmi') => {
    playClick();
    setSmsTab(tab);
  };

  const toggleSecretTip3 = () => {
    if (!showSecretTip3) playDramaticHit();
    else playClick();
    setShowSecretTip3(!showSecretTip3);
  };

  return (
    <section id="jalur-modus" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FFFDF9] via-[#F0F9FF] to-[#FAF6EE] overflow-hidden">
      {/* Curved SVG Wave Divider Top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#FFFDF9]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header: Storytelling Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] text-xs sm:text-sm font-bold shadow-sm">
            <Compass size={16} />
            <span>THE DETECTIVE TRAIL · ALUR JELAJAH MODUS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1D38] tracking-tight">
            3 Jalur Modus Paling Licik di Indonesia
          </h2>

          <p className="text-[#334155] text-base sm:text-lg leading-relaxed font-medium">
            Penipu sering berganti cerita, tapi pola jebakannya selalu sama. Ikuti langkah kaki{' '}
            <strong className="text-[#0F1D38]">Detektif Ciko</strong> menyusuri jejak investigasi ini!
          </p>

          {/* Walking Mascot Guide */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20">
              <Mascot
                name="05_berjalan"
                alt="Detektif Ciko sedang berjalan memandu"
                width={80}
                height={80}
                animate="bounce"
              />
            </div>
            <div className="bg-white rounded-2xl px-4 py-2 border-2 border-[#BAE6FD] shadow-sm text-left">
              <p className="text-xs font-bold text-[#0369A1]">Panduan Lapangan Detektif Ciko:</p>
              <p className="text-xs sm:text-sm text-[#475569]">
                &quot;Klik tombol di setiap meja kasus untuk membongkar trik rahasia mereka!&quot;
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MODUS 1: File APK Kurir & Undangan Pernikahan (Meja Investigasi 1)
           ========================================================================= */}
        <div className="mt-16 lg:mt-20 relative">
          {/* Milestone Step Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-9 h-9 rounded-full bg-[#FF7A00] text-white flex items-center justify-center font-bold text-base shadow-md">
              1
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
                Jebakan Paling Banyak Korban
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F1D38]">
                File .APK Berkedok Foto Paket atau Undangan Nikah
              </h3>
            </div>
          </div>

          {/* Asymmetrical Investigation Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-[0_10px_35px_rgba(255,122,0,0.08)]">
            {/* Left: Interactive Simulated Desk Artifact */}
            <div className="lg:col-span-6 bg-[#0F172A] rounded-2xl p-5 text-white border-2 border-[#334155] shadow-inner space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
                <div className="flex items-center gap-2">
                  <FileCode2 className="text-[#FF7A00]" size={18} />
                  <span className="text-xs font-mono font-bold text-[#E2E8F0]">
                    Peringatan Keamanan Android
                  </span>
                </div>
                <span className="text-[10px] bg-[#EF4444]/20 text-[#FCA5A5] px-2 py-0.5 rounded font-bold">
                  BAHAYA TINGGI
                </span>
              </div>

              {/* Fake APK Dialog */}
              <div className="bg-[#1E293B] rounded-xl p-4 border border-[#475569] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EA580C] flex items-center justify-center shrink-0">
                    <FileCode2 size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white font-mono">
                      Undangan_Pernikahan<span className="text-[#FACC15]">.apk</span>
                    </p>
                    <p className="text-xs text-[#94A3B8]">Aplikasi tidak dikenal (Unknown Source)</p>
                  </div>
                </div>

                <div className="text-xs text-[#CBD5E1] bg-[#0F172A] p-3 rounded-lg border border-[#334155] space-y-1">
                  <p className="font-semibold text-[#FCA5A5] flex items-center gap-1.5">
                    <AlertTriangle size={14} /> Izin yang diminta aplikasi ini:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#94A3B8]">
                    <li>Membaca semua SMS masuk (termasuk OTP Bank)</li>
                    <li>Mengirimkan SMS ke nomor luar negeri</li>
                    <li>Akses ke daftar kontak dan kamera</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={toggleInspect1}
                  className="btn-pill-orange text-xs sm:text-sm py-2 px-4 font-bold flex items-center gap-2"
                >
                  <Search size={14} />
                  <span>{inspectMode1 ? 'Tutup Rahasia' : 'Bongkar Cara Kerja Penipu'}</span>
                </button>
                <span className="text-xs text-[#94A3B8]">Klik tombol untuk membedah</span>
              </div>
            </div>

            {/* Right: Story & Detective Clues */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 shrink-0">
                  <Mascot
                    name={inspectMode1 ? '03_memeriksa' : '02_menunjuk_petunjuk'}
                    alt="Detektif Ciko memeriksa kasus"
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#0F1D38]">
                    Mengapa Mereka Mengirim File .APK?
                  </h4>
                  <p className="text-xs text-[#64748B]">Bukan sembarang file, ini adalah senjata pencuri saldo!</p>
                </div>
              </div>

              {inspectMode1 ? (
                <div className="bg-[#FFF7ED] p-4 rounded-2xl border-2 border-[#FFEDD5] space-y-2.5 animate-pop-in">
                  <p className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} /> Rahasia Dibalik File .APK Terbongkar!
                  </p>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    Begitu kamu menekan <strong>&quot;Pasang/Install&quot;</strong>, aplikasi jahat ini langsung berjalan di latar belakang tanpa ada icon di layar menu. Saat bank mengirimkan SMS kode OTP verifikasi penarikan uang, aplikasi tersebut <strong>meneruskannya ke Telegram penipu</strong> dan langsung menghapus SMS-nya dari HP-mu!
                  </p>
                  <div className="pt-2">
                    <span className="inline-block bg-[#FEF3C7] text-[#B45309] text-xs font-bold px-3 py-1 rounded-full border border-[#FDE68A]">
                      💡 Rumus Emas: Foto aslinya selalu .JPG atau .PNG, BUKAN .APK!
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Penipu berpura-pura menjadi kurir pengantar paket atau teman lama yang mengirim undangan pernikahan digital. Mereka memanfaatkan rasa penasaran dan kebiasaan kita langsung mengklik apa saja yang masuk di chat WhatsApp.
                </p>
              )}

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/kasus/paket-misterius"
                  className="btn-pill-orange text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Mainkan Kasus 01: Paket Misterius</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Winding Trail Decorative Connector */}
        <div className="my-10 flex justify-center">
          <svg className="w-24 h-16 text-[#FF7A00]/40" viewBox="0 0 100 60" fill="none">
            <path
              d="M50,0 C20,20 80,40 50,60"
              stroke="currentColor"
              strokeWidth="4"
              className="trail-path-animated"
            />
          </svg>
        </div>

        {/* =========================================================================
            MODUS 2: Phishing Bank & Hadiah Bodong (Meja Investigasi 2)
           ========================================================================= */}
        <div className="relative">
          {/* Milestone Step Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-9 h-9 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-base shadow-md">
              2
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Jebakan Ancaman & Iming-Iming
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F1D38]">
                SMS &apos;Rekening Dibekukan&apos; atau Gebyar Hadiah Ratusan Juta
              </h3>
            </div>
          </div>

          {/* Asymmetrical Comparison Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#BAE6FD] shadow-[0_10px_35px_rgba(2,132,199,0.08)]">
            {/* Left: Detective Story */}
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 shrink-0">
                  <Mascot
                    name="03_serius"
                    alt="Detektif Ciko fokus"
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#0F1D38]">
                    Perhatikan Tautan / Link yang Mereka Kirim!
                  </h4>
                  <p className="text-xs text-[#64748B]">Beda satu huruf saja, itu situs tiruan pencuri kata sandi.</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                Penipu membuat website yang tampilannya dibuat 100% mirip dengan bank aslimu (ada logo, warna biru/kuning khas, bahkan foto gedung). Tujuannya cuma satu: memancingmu mengetikkan nomor kartu ATM, PIN, dan kata sandi internet banking!
              </p>

              <div className="bg-[#F0F9FF] p-4 rounded-2xl border border-[#BAE6FD] space-y-2">
                <p className="text-xs font-bold text-[#0369A1] uppercase tracking-wider">
                  🔎 Ciri Utama Link Tiruan Penipu:
                </p>
                <ul className="text-xs sm:text-sm text-[#334155] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold">❌</span>
                    <span>Menggunakan akhiran domain aneh seperti <code>.xyz</code>, <code>.online</code>, atau <code>.top</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#22C55E] font-bold">✅</span>
                    <span>Website bank resmi di Indonesia selalu berakhiran <code>.co.id</code> atau <code>.id</code> terverifikasi.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href="/kasus/cs-bank-gadungan"
                  className="btn-pill-navy text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Mainkan Kasus 02: CS Bank Gadungan</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Interactive Comparison Switcher */}
            <div className="lg:col-span-6 order-1 lg:order-2 bg-[#F8FAFC] rounded-2xl p-5 border-2 border-[#E2E8F0]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
                <span className="text-xs font-bold text-[#0F1D38]">Bandingkan Tampilan SMS:</span>
                <div className="flex bg-[#E2E8F0] p-1 rounded-full text-xs font-bold">
                  <button
                    onClick={() => handleSmsSwitch('palsu')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      smsTab === 'palsu'
                        ? 'bg-[#EF4444] text-white shadow-sm'
                        : 'text-[#64748B] hover:text-[#0F1D38]'
                    }`}
                  >
                    SMS Penipu ⚠️
                  </button>
                  <button
                    onClick={() => handleSmsSwitch('resmi')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      smsTab === 'resmi'
                        ? 'bg-[#22C55E] text-white shadow-sm'
                        : 'text-[#64748B] hover:text-[#0F1D38]'
                    }`}
                  >
                    SMS Bank Resmi ✅
                  </button>
                </div>
              </div>

              {smsTab === 'palsu' ? (
                <div className="bg-white rounded-xl p-4 border-2 border-[#FCA5A5] shadow-sm space-y-3 animate-pop-in">
                  <div className="flex items-center justify-between text-xs text-[#EF4444] font-bold">
                    <span>Pengirim: +62 821-9988-1234 (Nomor HP Biasa)</span>
                    <span className="bg-[#FEE2E2] px-2 py-0.5 rounded text-[10px]">PALSU</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                    PERINGATAN: Rekening Anda terancam dinonaktifkan dalam 24 jam karena pembaruan sistem tarif. Segera perbarui data nasabah Anda di{' '}
                    <span className="text-[#0284C7] underline font-mono font-bold bg-[#FEF3C7] px-1">
                      https://bca-resmi-tarif.xyz/login
                    </span>
                  </p>
                  <div className="text-[11px] text-[#B91C1C] bg-[#FEF2F2] p-2.5 rounded-lg border border-[#FCA5A5]">
                    ⚡ <strong>Jebakan Terlihat:</strong> Domain memakai <code>.xyz</code>, pengirim nomor pribadi, dan ancaman waktu 24 jam!
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-4 border-2 border-[#86EFAC] shadow-sm space-y-3 animate-pop-in">
                  <div className="flex items-center justify-between text-xs text-[#15803D] font-bold">
                    <span>Pengirim: BANK BCA (Sender ID Resmi Tanpa Nomor HP)</span>
                    <span className="bg-[#DCFCE7] px-2 py-0.5 rounded text-[10px]">RESMI</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                    Info BCA: Jangan pernah berikan kode OTP atau PIN kepada siapapun termasuk petugas BCA. Hotline resmi Halo BCA 1500888 atau website www.bca.co.id.
                  </p>
                  <div className="text-[11px] text-[#166534] bg-[#F0FDF4] p-2.5 rounded-lg border border-[#86EFAC]">
                    🛡️ <strong>Tanda Aman:</strong> Bank resmi TIDAK PERNAH meminta verifikasi password/PIN melalui link SMS!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Winding Trail Decorative Connector */}
        <div className="my-10 flex justify-center">
          <svg className="w-24 h-16 text-[#0284C7]/40" viewBox="0 0 100 60" fill="none">
            <path
              d="M50,0 C80,20 20,40 50,60"
              stroke="currentColor"
              strokeWidth="4"
              className="trail-path-animated"
            />
          </svg>
        </div>

        {/* =========================================================================
            MODUS 3: Chat Kenalan Minta Transfer Darurat (Komik Interaktif 3)
           ========================================================================= */}
        <div className="relative">
          {/* Milestone Step Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-9 h-9 rounded-full bg-[#EAB308] text-white flex items-center justify-center font-bold text-base shadow-md">
              3
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Jebakan Mengaku Teman / Anak
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F1D38]">
                &quot;Mah/Pah, Ini Nomor Baruku... Tolong Transfer Darurat!&quot;
              </h3>
            </div>
          </div>

          {/* Interactive Comic Desk */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FEF08A] shadow-[0_10px_35px_rgba(234,179,8,0.1)] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Comic Panel 1 */}
              <div className="bg-[#FFFDF9] p-4 rounded-2xl border-2 border-[#FED7AA] space-y-2">
                <span className="text-[10px] font-bold bg-[#FFEDD5] text-[#C2410C] px-2 py-0.5 rounded-full">
                  Langkah 1: Sapaan Lembut
                </span>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Penipu memakai foto profil anak/teman yang diambil dari Instagram/Facebook, lalu menyapa:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#1E293B]">
                  &quot;Halo Mah, ini nomor baruku. Tolong save ya, HP lamaku rusak lagi dibenerin...&quot;
                </div>
              </div>

              {/* Comic Panel 2 */}
              <div className="bg-[#FFFDF9] p-4 rounded-2xl border-2 border-[#FCA5A5] space-y-2">
                <span className="text-[10px] font-bold bg-[#FEE2E2] text-[#B91C1C] px-2 py-0.5 rounded-full">
                  Langkah 2: Skenario Darurat
                </span>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Beberapa jam kemudian, ia membuat cerita panik agar korban tidak sempat berpikir:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#1E293B]">
                  &quot;Mah, aku lagi di RS/kantor polisi butuh bayar segera 2 juta. Tolong transfer ke rekening temanku dulu!&quot;
                </div>
              </div>

              {/* Comic Panel 3 */}
              <div className="bg-[#FFFDF9] p-4 rounded-2xl border-2 border-[#86EFAC] space-y-2">
                <span className="text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full">
                  Langkah 3: Solusi Detektif
                </span>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Tindakan paling ampuh yang 100% langsung menggagalkan tipu daya ini:
                </p>
                <div className="bg-[#F0FDF4] p-2.5 rounded-xl border border-[#86EFAC] text-xs font-bold text-[#166534]">
                  💡 Telepon nomor kontak lamanya atau ajak Video Call! Penipu PASTI kabur.
                </div>
              </div>
            </div>

            {/* Secret Tip Trigger */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 shrink-0">
                  <Mascot name="04_berpikir" alt="Detektif Ciko berpikir" width={48} height={48} />
                </div>
                <p className="text-xs sm:text-sm text-[#475569] font-medium">
                  Mau tahu jurus rahasia menangkis modus keluarga ini?
                </p>
              </div>

              <button
                onClick={toggleSecretTip3}
                className="btn-pill-orange text-xs sm:text-sm py-2 px-5 font-bold whitespace-nowrap"
              >
                {showSecretTip3 ? 'Sembunyikan Tips' : 'Lihat Jurus 3 Detik Detektif ⚡'}
              </button>
            </div>

            {showSecretTip3 && (
              <div className="bg-[#FEFCE8] p-5 rounded-2xl border-2 border-[#FDE047] animate-pop-in space-y-2">
                <h5 className="font-bold text-[#854D0E] text-base flex items-center gap-2">
                  <PhoneCall size={18} /> Jurus 3 Detik: Jangan Transfer Sebelum Dengar Suara Aslinya!
                </h5>
                <p className="text-xs sm:text-sm text-[#713F12] leading-relaxed">
                  Hampir semua penipu menolak diajak telepon suara langsung atau video call dengan alasan &quot;lagi meeting&quot;, &quot;mikrofon HP rusak&quot;, atau &quot;sinyal jelek&quot;. Begitu kamu memencet tombol panggilan biasa atau video call, kedok mereka langsung gugur!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetectiveTrail;
