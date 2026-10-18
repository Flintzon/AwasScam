'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Users,
  Award,
  ChevronRight,
  MessageCircle,
  Eye,
  Heart,
} from 'lucide-react';
import { SiteFrame } from '../components/SiteChrome';
import { Mascot, MascotName } from '../components/Mascot';
import { playClick, playEvidenceFound } from '../utils/sound';

export default function LandingPage() {
  // Mascot interactive greeting state
  const [speechIdx, setSpeechIdx] = useState(0);

  const SPEECHES: { text: string; pose: MascotName; label: string }[] = [
    {
      text: 'Halo Sahabat! Aku Detektif Ciko 🦉. Yuk belajar cara mudah agar kamu dan orang tuamu tak gampang tertipu di dunia maya!',
      pose: '01_menyapa',
      label: 'Detektif Ciko Menyapa',
    },
    {
      text: 'Tahukah kamu? Penipu sengaja bikin kita panik dalam 10 menit agar kita tidak sempat berpikir!',
      pose: '03_memeriksa',
      label: 'Fakta Singkat',
    },
    {
      text: 'Yuk masuk ke Ruang Detektif! Ada 5 berkas kasus seru yang siap kamu bongkar hari ini!',
      pose: '06_melompat',
      label: 'Ajak Mulai Bermain',
    },
  ];

  const currentSpeech = SPEECHES[speechIdx];

  const handleMascotClick = () => {
    playClick();
    setSpeechIdx((prev) => (prev + 1) % SPEECHES.length);
  };

  return (
    <SiteFrame>
      {/* =========================================================================
          SECTION 1: THE MASCOT WELCOME STAGE (HERO SECTION)
          Pusat perhatian utama: Maskot Burung Hantu 01_menyapa.png (NO CHAT/PHONE HERE!)
         ========================================================================= */}
      <section className="relative pt-6 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Warm Ambient Backdrop Glow */}
        <div
          aria-hidden="true"
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[340px] bg-gradient-to-r from-[#FFE8D6]/60 via-[#E0F2FE]/50 to-[#FEF3C7]/40 rounded-full blur-3xl -z-10 pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Welcoming Empathic Copywriting */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles size={16} className="text-[#FF6B00]" />
                <span>Game Edukasi Anti-Penipuan #1 untuk Keluarga Indonesia</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-[#0F172A] leading-[1.14]">
                Kenali Jebakan Penipu Online dengan Cara yang{' '}
                <span className="relative inline-block text-[#FF6B00]">
                  Seru &amp; Santai!
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#FDE68A] -z-10"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,8 Q50,0 100,8"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtitle (Max 2 sentences) */}
              <p className="text-lg sm:text-xl text-[#334155] leading-relaxed max-w-2xl font-medium mx-auto lg:mx-0">
                Belajar melindungi diri dan keluarga dari modus penipuan digital lewat petualangan detektif interaktif. Mudah dipahami siapa saja, tanpa istilah teknis yang membingungkan.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/login"
                  className="btn-pill-orange text-base sm:text-lg py-3.5 px-8 inline-flex items-center gap-2.5 font-bold shadow-lg"
                >
                  <span>Mulai Misi Sekarang — Gratis!</span>
                  <ArrowRight size={20} />
                </Link>

                <Link
                  href="/login"
                  className="btn-pill-white text-base py-3.5 px-6 font-bold inline-flex items-center gap-2"
                >
                  <span>Sudah Punya Akun? Masuk</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-3 text-xs sm:text-sm text-[#64748B] font-semibold">
                <span className="flex items-center gap-1.5 text-[#0F172A]">
                  <CheckCircle2 size={16} className="text-[#10B981]" /> 100% Gratis &amp; Tanpa Iklan
                </span>
                <span className="flex items-center gap-1.5 text-[#0F172A]">
                  <CheckCircle2 size={16} className="text-[#10B981]" /> Ramah Orang Tua &amp; Lansia
                </span>
                <span className="flex items-center gap-1.5 text-[#0F172A]">
                  <CheckCircle2 size={16} className="text-[#10B981]" /> Langsung Main di Web
                </span>
              </div>
            </div>

            {/* Right Column: MASCOT HERO CENTERPIECE (Bintang Utama Panggung) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
                {/* Floating Interactive Speech Bubble above mascot */}
                <div
                  onClick={handleMascotClick}
                  className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#FFE8D6] shadow-[0_10px_35px_rgba(255,107,0,0.12)] cursor-pointer hover:border-[#FF6B00] transition-all relative z-20 mb-4 group"
                  role="button"
                  tabIndex={0}
                  aria-label="Klik sapaan Detektif Ciko"
                >
                  <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-[#F1F5F9]">
                    <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={12} /> {currentSpeech.label}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-semibold group-hover:text-[#FF6B00]">
                      Sentuh untuk ganti 💬
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-[#0F172A] leading-relaxed">
                    &ldquo;{currentSpeech.text}&rdquo;
                  </p>
                  {/* Speech bubble pointer */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-b-2 border-r-2 border-[#FFE8D6] rotate-45" />
                </div>

                {/* Mascot Stage Platform with Decorative Badges */}
                <div
                  onClick={handleMascotClick}
                  className="relative p-6 cursor-pointer group flex items-center justify-center"
                  title="Klik aku untuk mendengarkan pesan berikutnya!"
                >
                  {/* Decorative circular pedestal */}
                  <div className="absolute inset-x-8 bottom-3 h-20 bg-gradient-to-t from-[#FED7AA] to-transparent rounded-[50%] blur-sm -z-10" />

                  {/* The Owl Mascot Image */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 transition-transform duration-300 group-hover:scale-105">
                    <Mascot
                      name={currentSpeech.pose}
                      alt="Detektif Ciko menyapa ramah"
                      width={288}
                      height={288}
                      animate="bounce"
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Floating Decorative Badges */}
                  <div className="absolute top-8 left-2 bg-white px-3 py-1.5 rounded-full border-2 border-[#BAE6FD] shadow-md flex items-center gap-1.5 text-xs font-bold text-[#0284C7] animate-float">
                    <Search size={14} />
                    <span>Naluri Kritis</span>
                  </div>

                  <div className="absolute bottom-10 right-0 bg-white px-3 py-1.5 rounded-full border-2 border-[#FDE68A] shadow-md flex items-center gap-1.5 text-xs font-bold text-[#B45309] animate-float" style={{ animationDelay: '1.5s' }}>
                    <ShieldCheck size={14} className="text-[#10B981]" />
                    <span>Bebas Tipuan</span>
                  </div>
                </div>

                {/* Hint under mascot */}
                <p className="text-center text-xs text-[#94A3B8] font-medium mt-1">
                  💡 Ketuk Detektif Ciko untuk tips berikutnya
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CUPLIKAN PERJALANAN DETEKTIF (VISUAL STORY STRIP - NO STACKED CARDS)
         ========================================================================= */}
      <section id="cara-kerja" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FEF7EC] to-[#FFFDF8]">
        {/* Organic Curved Wave Divider Top */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            className="relative block w-full h-8 sm:h-12 text-[#FFFDF8]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,0 L0,0 Z" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Heading with Mascot Pointer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-xs font-bold">
                <Sparkles size={14} /> ALUR PETUALANGAN BELAJAR
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                Bagaimana Kamu Belajar Bersama Detektif Ciko?
              </h2>
              <p className="text-[#475569] text-base max-w-xl font-medium">
                Tanpa ceramah yang membosankan! Kamu akan langsung bertindak sebagai detektif yang menyelidiki bukti nyata.
              </p>
            </div>

            {/* Mascot pointing guide */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border-2 border-[#FFE8D6] shadow-sm shrink-0">
              <div className="w-14 h-14 shrink-0">
                <Mascot
                  name="02_menunjuk_petunjuk"
                  alt="Detektif Ciko menunjuk alur"
                  width={56}
                  height={56}
                />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#FF6B00]">Detektif Ciko:</p>
                <p className="text-xs text-[#334155] font-semibold">
                  3 langkah mudah jadi ahli anti-scam! 🔎
                </p>
              </div>
            </div>
          </div>

          {/* Visual Story Strip (Horizontal Timeline Flow — bukan card bertumpuk) */}
          <div className="relative">
            {/* Connecting Dashed Trail Line across steps (Desktop) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-1/2 left-16 right-16 -translate-y-6 h-1 border-t-4 border-dashed border-[#FF6B00]/30 -z-0"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#FFE8D6] shadow-[0_8px_25px_rgba(255,107,0,0.06)] space-y-4 hover:border-[#FF6B00] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#FF6B00] font-black text-lg flex items-center justify-center">
                    01
                  </span>
                  <span className="text-xs font-bold bg-[#E0F2FE] text-[#0284C7] px-3 py-1 rounded-full">
                    Skenario Nyata
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center">
                  <MessageCircle size={26} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  Hadapi Simulasi Nyata
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed font-medium">
                  Masuki simulasi pesan WhatsApp, panggilan telepon palsu, dan SMS hadiah yang persis seperti yang sering beredar di HP warga Indonesia.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#FFE8D6] shadow-[0_8px_25px_rgba(255,107,0,0.06)] space-y-4 hover:border-[#FF6B00] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#FF6B00] font-black text-lg flex items-center justify-center">
                    02
                  </span>
                  <span className="text-xs font-bold bg-[#FEF3C7] text-[#B45309] px-3 py-1 rounded-full">
                    Bedah Bukti
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center">
                  <Eye size={26} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  Temukan Petunjuk Mencurigakan
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed font-medium">
                  Sentuh bagian janggal pada bukti: nomor HP prabayar, kata-kata yang mendesak, hingga ekstensi berbahaya seperti file <code>.apk</code>.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#FFE8D6] shadow-[0_8px_25px_rgba(255,107,0,0.06)] space-y-4 hover:border-[#FF6B00] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#FF6B00] font-black text-lg flex items-center justify-center">
                    03
                  </span>
                  <span className="text-xs font-bold bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-full">
                    Pahlawan Keluarga
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center">
                  <ShieldCheck size={26} className="text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  Jadilah Pelindung Keluarga
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed font-medium">
                  Kumpulkan lencana detektif, asah naluri kritis, dan bagikan tips keselamatan praktis ini ke grup WhatsApp keluarga tercinta!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BANNER AJAKAN MASUK (WITH 06_melompat.png) & FOOTER
         ========================================================================= */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#FFFDF8] via-[#E0F2FE]/60 to-[#BAE6FD]/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
          {/* Jumping mascot */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#FACC15] rounded-full blur-xl opacity-40 animate-pulse-glow"
              />
              <Mascot
                name="06_melompat"
                alt="Detektif Ciko melompat mengajak bermain"
                width={192}
                height={192}
                animate="bounce"
                className="relative z-10 w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Siap Menguji Ketelitianmu Hari Ini?
            </h2>
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed font-medium">
              5 berkas kasus penipuan digital sedang menunggu penyelidikanmu. Masuk ke Ruang Detektif sekarang tanpa perlu daftar yang ribet!
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="btn-pill-orange text-lg sm:text-xl py-4 px-10 inline-flex items-center gap-3 font-bold shadow-xl"
            >
              <span>Masuk ke Ruang Detektif 🚀</span>
              <ArrowRight size={22} />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-[#64748B] font-semibold">
            ✨ Cukup masukkan nama panggilan dan langsung mulai bermain!
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
