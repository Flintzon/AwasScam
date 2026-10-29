'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Users,
  Award,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { SiteFrame } from '../components/SiteChrome';

export default function LandingPage() {
  return (
    <SiteFrame>
      {/* =========================================================================
          SECTION 1: THE MASCOT WELCOME STAGE (HERO SECTION)
          Pusat perhatian utama: video Detektif Ciko menyapa.
         ========================================================================= */}
      <section className="relative pt-6 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Warm Ambient Backdrop Glow */}
        <div
          aria-hidden="true"
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[340px] bg-gradient-to-r from-[#FFE8D6]/60 via-[#FFE8D6]/45 to-[#FEF3C7]/40 rounded-full blur-3xl -z-10 pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Welcoming Empathic Copywriting */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left lg:translate-y-4">
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

            </div>

            {/* Right Column: MASCOT HERO CENTERPIECE (Bintang Utama Panggung) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center self-start lg:-mt-8">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[448px] -mt-2 lg:-mt-4">
                <div className="relative p-6 pt-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 translate-y-3 sm:w-72 sm:h-72 lg:h-[400px] lg:w-[400px] lg:translate-y-16">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster="/mascot_detective/homepage-orange/ciko-hop-wave-poster.png"
                      aria-label="Detektif Ciko melompat dan melambaikan tangan"
                      className="h-full w-full object-cover"
                    >
                      <source
                        src="/mascot_detective/homepage-orange/ciko-hop-wave.mp4"
                        type="video/mp4"
                      />
                      Video Detektif Ciko tidak dapat diputar di browser ini.
                    </video>
                  </div>
                </div>
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
                <span className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#FF6B00] font-black text-lg flex items-center justify-center">
                  01
                </span>
                <div className="relative aspect-[5/4] w-full">
                  <Image
                    src="/mascot_detective/homepage-orange/pose-1.png"
                    alt="Detektif Ciko menunjuk untuk memulai simulasi"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-contain"
                  />
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
                <span className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#FF6B00] font-black text-lg flex items-center justify-center">
                  02
                </span>
                <div className="relative aspect-[5/4] w-full">
                  <Image
                    src="/mascot_detective/homepage-orange/pose-2.png"
                    alt="Detektif Ciko memeriksa petunjuk dengan kaca pembesar"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-contain"
                  />
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
                <span className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#FF6B00] font-black text-lg flex items-center justify-center">
                  03
                </span>
                <div className="relative aspect-[5/4] w-full">
                  <Image
                    src="/mascot_detective/homepage-orange/pose-5.png"
                    alt="Detektif Ciko siap melindungi keluarga"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-contain"
                  />
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
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#FFFDF8] via-[#FFF7ED]/70 to-[#FFE8DB]/80 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
          {/* Jumping mascot */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#FACC15] rounded-full blur-xl opacity-40 animate-pulse-glow"
              />
              <Image
                src="/mascot_detective/homepage-orange/pose-06-melompat.png"
                alt="Detektif Ciko melompat mengajak bermain"
                width={192}
                height={192}
                className="relative z-10 w-full h-full object-contain animate-bounce-subtle"
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
              <span>Masuk ke Ruang Detektif</span>
              <ArrowRight size={22} />
            </Link>
          </div>

        </div>
      </section>
    </SiteFrame>
  );
}
