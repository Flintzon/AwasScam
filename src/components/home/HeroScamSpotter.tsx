'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Volume2,
  Check,
  Eye,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mascot, MascotName } from '../Mascot';
import { playEvidenceFound, playClick, playVictory, playBuzz } from '../../utils/sound';

interface ClueInfo {
  id: 'number' | 'urgency' | 'apk';
  title: string;
  badge: string;
  shortDesc: string;
  explanation: string;
  expression: MascotName;
}

const CLUES: Record<'number' | 'urgency' | 'apk', ClueInfo> = {
  number: {
    id: 'number',
    title: 'Nomor HP Biasa (+62 895)',
    badge: 'TANDA 1: NOMOR PRIBADI',
    shortDesc: 'Bukan nomor resmi centang hijau',
    explanation:
      'Perusahaan ekspedisi resmi (J&T, SiCepat, JNE) menggunakan WhatsApp Bisnis Terverifikasi dengan Centang Hijau, BUKAN nomor seluler prabayar pribadi!',
    expression: '05_curiga',
  },
  urgency: {
    id: 'urgency',
    title: 'Ancaman Waktu Panik (10 Menit)',
    badge: 'TANDA 2: MANIPULASI PSIKOLOGIS',
    shortDesc: 'Menakut-nakuti agar buru-buru',
    explanation:
      'Penipu sengaja memberi batas waktu 10 menit agar kamu panik dan tidak sempat bertanya ke keluarga. Kurir asli TIDAK PERNAH mengancam memusnahkan paket secepat itu!',
    expression: '03_serius',
  },
  apk: {
    id: 'apk',
    title: 'File .PDF.APK Berbahaya',
    badge: 'TANDA 3: JEBAKAN UTAMA .APK',
    shortDesc: 'Aplikasi jahat penyadap OTP',
    explanation:
      'Liat nama belakangnya: .apk! Ini bukan foto atau dokumen, melainkan aplikasi pencuri data yang bisa menyadap SMS kode OTP perbankan di HP-mu!',
    expression: '02_senang',
  },
};

export function HeroScamSpotter() {
  const [discoveredClues, setDiscoveredClues] = useState<string[]>([]);
  const [activeClueId, setActiveClueId] = useState<'number' | 'urgency' | 'apk' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentClue = activeClueId ? CLUES[activeClueId] : null;

  // Mascot dynamic expression
  let currentExpression: MascotName = '01_menyapa';
  if (isCompleted) {
    currentExpression = '02_senang';
  } else if (currentClue) {
    currentExpression = currentClue.expression;
  } else if (discoveredClues.length > 0) {
    currentExpression = '05_curiga';
  }

  const handleSpotClue = (clueId: 'number' | 'urgency' | 'apk') => {
    setActiveClueId(clueId);

    if (!discoveredClues.includes(clueId)) {
      playEvidenceFound();
      const updated = [...discoveredClues, clueId];
      setDiscoveredClues(updated);

      if (updated.length === 3) {
        setIsCompleted(true);
        playVictory();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF7A00', '#FACC15', '#38BDF8', '#4ADE80', '#FB923C'],
        });
      }
    } else {
      playClick();
    }
  };

  const handleReset = () => {
    playClick();
    setDiscoveredClues([]);
    setActiveClueId(null);
    setIsCompleted(false);
  };

  return (
    <section id="hero-spotter" className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#FFE8D6]/60 via-[#E0F2FE]/50 to-[#FEF3C7]/40 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Empathetic Copywriting & Mascot Welcome */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Friendly Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs sm:text-sm font-bold shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF7A00] animate-ping" />
              <span>Simulasi Interaktif Detektif Keluarga · 100% Gratis</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-[#0F1D38] leading-[1.15]">
              Bukan Salahmu Kalau Ragu,{' '}
              <span className="relative inline-block text-[#FF7A00]">
                Modus Penipu
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
              </span>{' '}
              Makin Mirip Aslinya!
            </h1>

            {/* Sub-copy */}
            <p className="text-lg sm:text-xl text-[#334155] leading-relaxed max-w-2xl font-medium">
              Penipu zaman sekarang sengaja mengincar kepanikan kita. Bersama{' '}
              <strong className="text-[#0F1D38] font-bold">Detektif Ciko 🦉</strong>, mari latih instingmu
              menemukan <strong className="text-[#FF7A00]">3 jebakan bahaya</strong> di layar HP sebelah kanan ini!
            </p>

            {/* Interactive Mascot Speech Bubble Card */}
            <div className="bg-white rounded-3xl p-5 border-2 border-[#FFE8D6] shadow-[0_8px_30px_rgba(255,122,0,0.1)] flex items-start gap-4 transition-all">
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative bg-[#FFF7ED] rounded-2xl p-1.5 border border-[#FFEDD5]">
                <Mascot
                  name={currentExpression}
                  alt="Detektif Ciko"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider">
                    {currentClue ? currentClue.badge : 'Sapaan Detektif Ciko'}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1]">
                    {discoveredClues.length}/3 Terbongkar 🎯
                  </span>
                </div>
                <h4 className="font-bold text-[#0F1D38] text-base sm:text-lg mt-0.5">
                  {currentClue ? currentClue.title : 'Coba Sentuh Layar HP di Kanan! 👉'}
                </h4>
                <p className="text-sm text-[#475569] mt-1 leading-relaxed">
                  {currentClue
                    ? currentClue.explanation
                    : 'Klik bagian yang menurutmu mencurigakan: nama pengirim, teks pesan yang mendesak, atau file lampirannya!'}
                </p>
              </div>
            </div>

            {/* Actions & Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/kasus/paket-misterius"
                className="btn-pill-orange text-base sm:text-lg px-7 py-3.5 inline-flex items-center gap-2.5 font-bold"
              >
                <span>Mulai Kasus 01: Paket Misterius</span>
                <ArrowRight size={20} />
              </Link>

              <a
                href="#jalur-modus"
                className="btn-pill-white text-base px-6 py-3.5 font-bold inline-flex items-center gap-2"
              >
                <span>Lihat Jalur Modus</span>
                <Sparkles size={18} className="text-[#FF7A00]" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-[#64748B] font-semibold">
              <span className="flex items-center gap-1.5 text-[#0F1D38]">
                <CheckCircle2 size={16} className="text-[#22C55E]" /> Bebas Istilah Rumit
              </span>
              <span className="flex items-center gap-1.5 text-[#0F1D38]">
                <CheckCircle2 size={16} className="text-[#22C55E]" /> Ramah Orang Tua & Lansia
              </span>
              <span className="flex items-center gap-1.5 text-[#0F1D38]">
                <CheckCircle2 size={16} className="text-[#22C55E]" /> Langsung Main di Web
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Smartphone Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              {/* Floating "Sentuh untuk Cek" Hint Pill */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 bg-[#FF7A00] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce-subtle">
                <Eye size={13} />
                <span>Klik 3 Titik Mencurigakan!</span>
              </div>

              {/* Smartphone Frame */}
              <div className="relative rounded-[42px] border-[10px] border-[#1E293B] shadow-[0_25px_60px_rgba(15,29,56,0.22)] bg-[#0B141B] overflow-hidden">
                {/* Speaker & Camera Notch */}
                <div className="h-6 bg-[#1E293B] flex items-center justify-center">
                  <div className="w-16 h-3 bg-[#0B141B] rounded-full" />
                </div>

                {/* WhatsApp Top Header Bar */}
                <div
                  onClick={() => handleSpotClue('number')}
                  className={`px-3 py-2.5 bg-[#172640] border-b border-[#2C3D5C] flex items-center gap-2.5 cursor-pointer transition-all relative ${
                    activeClueId === 'number' ? 'ring-2 ring-[#FF7A00] bg-[#1E3254]' : 'hover:bg-[#1C2E4D]'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Cek nomor pengirim"
                >
                  {/* Clue indicator pin */}
                  <span
                    className={`absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      discoveredClues.includes('number')
                        ? 'bg-[#22C55E] text-white'
                        : 'bg-[#FF7A00] text-white animate-pulse-glow'
                    }`}
                  >
                    {discoveredClues.includes('number') ? '✓' : '1'}
                  </span>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#D97706] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                    J&T
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p className="text-white text-xs font-bold truncate">Kurir Ekspedisi Paket</p>
                      <AlertTriangle size={13} className="text-[#FF7A00] shrink-0" />
                    </div>
                    <p className="text-[#94A3B8] text-[11px] font-mono">+62 895-3342-9912 (Bukan Resmi)</p>
                  </div>
                </div>

                {/* WhatsApp Chat Canvas */}
                <div className="p-3.5 space-y-3 min-h-[300px] flex flex-col justify-end bg-gradient-to-b from-[#0F172A] to-[#0B141B]">
                  {/* Scammer Chat Bubble */}
                  <div className="bg-[#172640] rounded-2xl rounded-tl-sm p-3.5 border border-[#2C3D5C] text-white shadow-md space-y-2.5">
                    {/* Hotspot 2: Urgency Text */}
                    <div
                      onClick={() => handleSpotClue('urgency')}
                      className={`p-2 rounded-xl transition-all cursor-pointer relative ${
                        activeClueId === 'urgency'
                          ? 'bg-[#FF7A00]/20 ring-2 ring-[#FF7A00]'
                          : 'hover:bg-white/5 border border-dashed border-[#FF7A00]/40'
                      }`}
                      role="button"
                      tabIndex={0}
                      aria-label="Cek teks urgensi"
                    >
                      <span
                        className={`absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          discoveredClues.includes('urgency')
                            ? 'bg-[#22C55E] text-white'
                            : 'bg-[#FF7A00] text-white animate-pulse-glow'
                        }`}
                      >
                        {discoveredClues.includes('urgency') ? '✓' : '2'}
                      </span>
                      <p className="text-xs leading-relaxed text-[#E2E8F0]">
                        Selamat siang Bu. Paket tertahan di gudang karena alamat kurang jelas.{' '}
                        <span className="font-extrabold text-[#FACC15] underline decoration-wavy decoration-[#FF7A00]">
                          MOHON SEGERA DIBUKA DALAM 10 MENIT
                        </span>{' '}
                        atau paket dikembalikan ke penjual!
                      </p>
                    </div>

                    {/* Hotspot 3: APK Attachment */}
                    <div
                      onClick={() => handleSpotClue('apk')}
                      className={`p-2.5 rounded-xl bg-[#0F172A] border transition-all cursor-pointer relative flex items-center gap-3 ${
                        activeClueId === 'apk'
                          ? 'border-[#FF7A00] ring-2 ring-[#FF7A00] bg-[#1E293B]'
                          : 'border-[#334155] hover:border-[#FF7A00]/70'
                      }`}
                      role="button"
                      tabIndex={0}
                      aria-label="Cek file APK lampiran"
                    >
                      <span
                        className={`absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          discoveredClues.includes('apk')
                            ? 'bg-[#22C55E] text-white'
                            : 'bg-[#FF7A00] text-white animate-pulse-glow'
                        }`}
                      >
                        {discoveredClues.includes('apk') ? '✓' : '3'}
                      </span>

                      <div className="w-10 h-10 rounded-lg bg-[#EA580C] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <FileCode2 size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate font-mono">
                          Lihat_Foto_Paket<span className="text-[#FF7A00]">.pdf.apk</span>
                        </p>
                        <p className="text-[11px] text-[#94A3B8]">8,4 MB · File Instalasi Android</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-1 text-[10px] text-[#94A3B8] pt-1">
                      <span>13:42</span>
                      <span className="text-[#38BDF8]">✓✓</span>
                    </div>
                  </div>

                  {/* Completion Celebration Overlay if All 3 Spotted */}
                  {isCompleted && (
                    <div className="bg-[#14532D] border border-[#22C55E] text-white p-3 rounded-2xl animate-pop-in space-y-1 text-center">
                      <p className="text-xs font-bold text-[#86EFAC] flex items-center justify-center gap-1">
                        <Check size={14} /> SEMUA 3 JEBAKAN DIBONGKAR!
                      </p>
                      <p className="text-[11px] text-white/90">
                        Hebat! Kamu berhasil menyelamatkan paket & saldo Ibu dari penyadapan OTP!
                      </p>
                    </div>
                  )}
                </div>

                {/* Smartphone Home Indicator Bar */}
                <div className="h-4 bg-[#172640] flex items-center justify-center">
                  <div className="w-24 h-1 bg-[#475569] rounded-full" />
                </div>
              </div>

              {/* Reset button if any clue clicked */}
              {discoveredClues.length > 0 && (
                <div className="mt-3 text-center">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#FF7A00] font-bold py-1 px-3 rounded-full hover:bg-white transition-colors"
                  >
                    <RotateCcw size={13} />
                    <span>Ulangi Simulasi HP</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroScamSpotter;
