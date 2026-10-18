import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Compass,
  Users,
  CheckCircle,
} from 'lucide-react';
import { SiteFrame } from '../components/SiteChrome';
import { Mascot } from '../components/Mascot';
import { HeroScamSpotter } from '../components/home/HeroScamSpotter';
import { DetectiveTrail } from '../components/home/DetectiveTrail';
import { MiniQuizArena } from '../components/home/MiniQuizArena';
import { FamilyCheatsheet } from '../components/home/FamilyCheatsheet';

export default function Home() {
  return (
    <SiteFrame>
      {/* 1. HERO SECTION: INTERACTIVE SCAM SPOTTER */}
      <HeroScamSpotter />

      {/* 2. THE DETECTIVE TRAIL: 3 JALUR MODUS TANPA KARTU KAKU */}
      <DetectiveTrail />

      {/* 3. MINI-QUIZ / TES INSTING 10 DETIK */}
      <MiniQuizArena />

      {/* 4. KAMUS SAKU ANTI-TIPU (PAPAN BULETIN KELUARGA) */}
      <FamilyCheatsheet />

      {/* 5. CALL-TO-ACTION PENUTUP DENGAN MASKOT MELOMPAT GEMBIRA */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#FFFDF9] via-[#FEF3C7]/40 to-[#FFE8D6]/60 relative overflow-hidden">
        {/* Decorative Background Sunburst Elements */}
        <div
          aria-hidden="true"
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-t from-[#FF7A00]/15 to-transparent rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          {/* Jumping Mascot Celebration */}
          <div className="flex justify-center">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56">
              {/* Golden circular glow behind mascot */}
              <div
                aria-hidden="true"
                className="absolute inset-2 bg-gradient-to-b from-[#FDE047] to-[#F59E0B] rounded-full blur-xl opacity-40 animate-pulse-glow"
              />
              <Mascot
                name="06_melompat"
                alt="Detektif Ciko melompat gembira mengajak bermain"
                width={224}
                height={224}
                animate="bounce"
                className="relative z-10 w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles size={16} />
              <span>SIAPKAN NALURIMU · JADILAH DETEKTIF KELUARGA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#0F1D38] tracking-tight">
              Lindungi Diri dan Orang Tersayang dari Tipu Daya Online!
            </h2>

            <p className="text-base sm:text-lg text-[#334155] leading-relaxed font-medium">
              Teori saja tidak cukup untuk menghentikan penipuan siber. Mainkan langsung 4 kasus investigasi interaktif yang dirancang khusus dari skenario nyata di Indonesia.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/kasus/paket-misterius"
              className="btn-pill-orange text-base sm:text-lg py-4 px-8 font-bold inline-flex items-center gap-3 shadow-lg"
            >
              <span>Mulai Kasus 01: Paket Misterius 🚀</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/kasus"
              className="btn-pill-white text-base sm:text-lg py-4 px-8 font-bold inline-flex items-center gap-2.5 shadow-sm"
            >
              <Compass size={20} className="text-[#FF7A00]" />
              <span>Lihat Semua 4 Berkas Kasus</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-[#64748B]">
            <span className="flex items-center gap-2 text-[#0F1D38]">
              <CheckCircle size={17} className="text-[#22C55E]" /> 100% Gratis & Edukatif
            </span>
            <span className="flex items-center gap-2 text-[#0F1D38]">
              <CheckCircle size={17} className="text-[#22C55E]" /> Langsung di Browser
            </span>
            <span className="flex items-center gap-2 text-[#0F1D38]">
              <CheckCircle size={17} className="text-[#22C55E]" /> Tanpa Registrasi / Akun
            </span>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
