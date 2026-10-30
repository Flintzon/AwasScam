'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCode2,
  HelpCircle,
  RotateCcw,
  Zap,
  Eye,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SiteFrame } from '../SiteChrome';
import { Mascot, MascotName } from '../Mascot';
import { CaseMission, CaseHotspot, DecisionChoice, MISSIONS } from '../../data/cases';
import { MissionCover } from './MissionCover';
import { completeCase, getUserProfile } from '../../utils/userState';
import {
  playClick,
  playEvidenceFound,
  playBuzz,
  playVictory,
  playDramaticHit,
} from '../../utils/sound';

export function MinigameExperience({ mission }: { mission: CaseMission }) {
  const router = useRouter();

  // State
  const [foundHotspotIds, setFoundHotspotIds] = useState<string[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<CaseHotspot | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [decisionFeedback, setDecisionFeedback] = useState<DecisionChoice | null>(null);
  const [isVictory, setIsVictory] = useState(false);
  const [victoryProfile, setVictoryProfile] = useState(() => getUserProfile());
  const [finalScore, setFinalScore] = useState(0);

  // Dynamic mascot reaction
  let mascotName: MascotName = '03_memeriksa';
  let mascotSpeech = 'Periksa layar bukti di sebelah kiri dan sentuh bagian yang mencurigakan!';

  if (isVictory) {
    mascotName = '06_melompat';
    mascotSpeech = 'Luar biasa! Kasus berhasil terbongkar dengan sempurna!';
  } else if (decisionFeedback) {
    if (decisionFeedback.isCorrect) {
      mascotName = '02_senang';
      mascotSpeech = decisionFeedback.outcomeText;
    } else {
      mascotName = '04_terkejut';
      mascotSpeech = decisionFeedback.outcomeText;
    }
  } else if (showHint) {
    mascotName = '05_curiga';
    mascotSpeech = `Bocoran Detektif: ${mission.hint}`;
  } else if (activeHotspot) {
    mascotName = '02_senang';
    mascotSpeech = activeHotspot.explanation;
  } else if (foundHotspotIds.length > 0) {
    mascotName = '04_berpikir';
    mascotSpeech = `${foundHotspotIds.length} dari ${mission.evidence.hotspots.length} kejanggalan sudah ditemukan!`;
  }

  const handleSpotClick = (hotspot: CaseHotspot) => {
    setActiveHotspot(hotspot);
    setShowHint(false);

    if (!foundHotspotIds.includes(hotspot.id)) {
      playEvidenceFound();
      setFoundHotspotIds((prev) => [...prev, hotspot.id]);
    } else {
      playClick();
    }
  };

  const handleToggleHint = () => {
    playClick();
    setShowHint(!showHint);
    setActiveHotspot(null);
  };

  const evidenceScore = mission.evidence.hotspots
    .filter((hotspot) => foundHotspotIds.includes(hotspot.id))
    .reduce((total, hotspot) => total + hotspot.points, 0);
  const canDecide = foundHotspotIds.length === mission.evidence.hotspots.length;
  const gameScore = evidenceScore + 100;

  const handleChooseDecision = (choice: DecisionChoice) => {
    if (!canDecide || isVictory) return;
    setSelectedChoiceId(choice.id);
    setDecisionFeedback(choice);

    if (choice.isCorrect) {
      playVictory();
      const gameScore = evidenceScore + 100;
      setFinalScore(gameScore);
      const updated = completeCase(mission.slug, mission.xpReward, gameScore);
      setVictoryProfile(updated);
      setIsVictory(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#FACC15', '#10B981', '#0284C7'],
      });
    } else {
      playBuzz();
    }
  };

  const handleReset = () => {
    playClick();
    setFoundHotspotIds([]);
    setActiveHotspot(null);
    setShowHint(false);
    setSelectedChoiceId(null);
    setDecisionFeedback(null);
    setIsVictory(false);
  };

  // Find next mission
  const currentIdx = MISSIONS.findIndex((m) => m.slug === mission.slug);
  const nextMission = currentIdx < MISSIONS.length - 1 ? MISSIONS[currentIdx + 1] : null;

  return (
    <SiteFrame>
      <div className="py-6 sm:py-10 bg-gradient-to-b from-[#FFFDF8] via-[#FEF7EC] to-[#FFFDF8] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Navigation Bar & Mission Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#FFE8D6]">
            <Link
              href="/kasus"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#FF6B00] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Peta Kasus</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7]">
                {mission.category}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] flex items-center gap-1">
                <Zap size={13} className="fill-[#F59E0B]" /> +{mission.xpReward} XP
              </span>
            </div>
          </div>

          {/* Arena Grid: Left Evidence Screen, Right Companion Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* =========================================================================
                AREA KIRI: LAYAR BUKTI INTERAKTIF (EVIDENCE SCREEN)
               ========================================================================= */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#FFE8D6] shadow-[0_12px_40px_rgba(255,107,0,0.08)] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                      Layar Bukti Penipuan
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                      {mission.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#64748B]">Kejanggalan:</span>
                    <p className="text-sm font-black text-[#FF6B00]">
                      {foundHotspotIds.length} / {mission.evidence.hotspots.length} Ditemukan
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border-2 border-[#EEDCC8] bg-[#FAF6EE]">
                  <div className="flex items-center justify-between border-b border-[#EEDCC8] px-4 py-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">Konteks Kasus</span>
                    <span className="text-[11px] font-semibold text-[#64748B]">Simulasi edukasi</span>
                  </div>
                  <div className="relative aspect-[16/7] min-h-[150px]">
                    <MissionCover mission={mission} className="absolute inset-0 h-full w-full" />
                  </div>
                  <p className="px-4 py-3 text-xs leading-relaxed text-[#475569]">{mission.summary}</p>
                </div>

                <p className="text-xs sm:text-sm text-[#475569] font-medium">
                  <strong>Petunjuk:</strong> Klik langsung bagian mencurigakan di layar HP simulasi bawah ini!
                </p>

                <div className="grid grid-cols-3 gap-2 rounded-2xl border-2 border-[#FFE8D6] bg-[#FFF7ED] px-3 py-2 text-center text-[11px] font-bold text-[#64748B]">
                  <span
                    className={`rounded-xl py-1 ${foundHotspotIds.length > 0 && foundHotspotIds.length < mission.evidence.hotspots.length ? 'bg-[#FDE68A] text-[#92400e]' : foundHotspotIds.length === mission.evidence.hotspots.length && !decisionFeedback ? 'bg-[#10B981]/20 text-[#065F46]' : ''}`}
                  >
                    {foundHotspotIds.length > 0 ? 'Temukan' : '1. Temukan'} kejanggalan
                  </span>
                  <span
                    className={`rounded-xl py-1 ${decisionFeedback === null && foundHotspotIds.length === mission.evidence.hotspots.length ? 'bg-[#FDE68A] text-[#92400e]' : decisionFeedback ? 'bg-[#10B981]/20 text-[#065F46]' : ''}`}
                  >
                    {decisionFeedback === null && foundHotspotIds.length === mission.evidence.hotspots.length ? 'Putuskan' : '2. Putuskan'}
                  </span>
                  <span
                    className={`rounded-xl py-1 ${isVictory ? 'bg-[#10B981] text-white' : decisionFeedback ? 'bg-[#FDE68A] text-[#92400e]' : ''}`}
                  >
                    {isVictory ? 'Selesai!' : decisionFeedback ? '3. Tindak lanjut' : '3. Tindak lanjut'}
                  </span>
                </div>

                {/* Simulated Smartphone Container */}
                <div className="rounded-[36px] border-[8px] border-[#1E293B] shadow-2xl bg-[#0B141B] overflow-hidden relative">
                  {/* Speaker Notch */}
                  <div className="h-5 bg-[#1E293B] flex items-center justify-center">
                    <div className="w-14 h-2.5 bg-[#0B141B] rounded-full" />
                  </div>

                  {/* Header Bar */}
                  <div
                    onClick={() => handleSpotClick(mission.evidence.hotspots[0])}
                    className={`px-4 py-3 bg-[#172640] border-b border-[#2C3D5C] flex items-center gap-3 cursor-pointer transition-all relative ${
                      activeHotspot?.id === mission.evidence.hotspots[0].id
                        ? 'bg-[#1E3254] ring-2 ring-[#FF6B00]'
                        : 'hover:bg-[#1C2E4D]'
                    }`}
                  >
                    {/* Hotspot indicator badge */}
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        foundHotspotIds.includes(mission.evidence.hotspots[0].id)
                          ? 'bg-[#10B981] text-white'
                          : 'bg-[#FF6B00] text-white animate-pulse-glow'
                      }`}
                    >
                      {foundHotspotIds.includes(mission.evidence.hotspots[0].id) ? '✓' : '1'}
                    </span>

                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow"
                      style={{ backgroundColor: mission.evidence.avatarBg }}
                    >
                      {mission.evidence.avatarInitials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-white text-xs sm:text-sm font-bold truncate">
                        {mission.evidence.senderName}
                      </p>
                      <p className="text-[#94A3B8] text-[11px] truncate font-mono">
                        {mission.evidence.senderDetail}
                      </p>
                    </div>
                  </div>

                  {/* Message Body Canvas */}
                  <div className="p-4 sm:p-5 space-y-4 min-h-[260px] flex flex-col justify-end bg-gradient-to-b from-[#0F172A] to-[#0B141B]">
                    {/* Chat Bubble */}
                    <div className="bg-[#172640] rounded-2xl rounded-tl-sm p-4 border border-[#2C3D5C] text-white shadow-md space-y-3">
                      {/* Hotspot 2 (Urgensi / Text) */}
                      {mission.evidence.hotspots[1] && (
                        <div
                          onClick={() => handleSpotClick(mission.evidence.hotspots[1])}
                          className={`p-2.5 rounded-xl transition-all cursor-pointer relative ${
                            activeHotspot?.id === mission.evidence.hotspots[1].id
                              ? 'bg-[#FF6B00]/20 ring-2 ring-[#FF6B00]'
                              : 'hover:bg-white/5 border border-dashed border-[#FF6B00]/40'
                          }`}
                        >
                          <span
                            className={`absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              foundHotspotIds.includes(mission.evidence.hotspots[1].id)
                                ? 'bg-[#10B981] text-white'
                                : 'bg-[#FF6B00] text-white animate-pulse-glow'
                            }`}
                          >
                            {foundHotspotIds.includes(mission.evidence.hotspots[1].id) ? '✓' : '2'}
                          </span>

                          <p className="text-xs sm:text-sm leading-relaxed text-[#E2E8F0]">
                            {mission.evidence.messageText}
                          </p>
                        </div>
                      )}

                      {/* Hotspot 3 (File APK / Link Url) */}
                      {mission.evidence.hotspots[2] && (
                        <div
                          onClick={() => handleSpotClick(mission.evidence.hotspots[2])}
                          className={`p-3 rounded-xl bg-[#0F172A] border transition-all cursor-pointer relative flex items-center gap-3 ${
                            activeHotspot?.id === mission.evidence.hotspots[2].id
                              ? 'border-[#FF6B00] ring-2 ring-[#FF6B00] bg-[#1E293B]'
                              : 'border-[#334155] hover:border-[#FF6B00]'
                          }`}
                        >
                          <span
                            className={`absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              foundHotspotIds.includes(mission.evidence.hotspots[2].id)
                                ? 'bg-[#10B981] text-white'
                                : 'bg-[#FF6B00] text-white animate-pulse-glow'
                            }`}
                          >
                            {foundHotspotIds.includes(mission.evidence.hotspots[2].id) ? '✓' : '3'}
                          </span>

                          <div className="w-10 h-10 rounded-lg bg-[#EA580C] text-white flex items-center justify-center shrink-0">
                            <FileCode2 size={20} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-bold text-white font-mono truncate">
                              {mission.evidence.attachmentName || mission.evidence.linkUrl}
                            </p>
                            <p className="text-[11px] text-[#94A3B8]">
                              {mission.evidence.attachmentType || 'Tautan Website Asing'}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 text-[10px] text-[#94A3B8] pt-1">
                        <span>14:05</span>
                        <span className="text-[#38BDF8]">✓✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Home Bar */}
                  <div className="h-4 bg-[#172640] flex items-center justify-center">
                    <div className="w-20 h-1 bg-[#475569] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                AREA KANAN: MEJA PENDAMPING MASKOT & KEPUTUSAN DETEKTIF
               ========================================================================= */}
            <div className="lg:col-span-5 space-y-6">
              {/* Mascot Reaction & Speech Box */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE8D6] shadow-[0_10px_35px_rgba(255,107,0,0.08)] flex items-start gap-4">
                <div className="shrink-0 w-20 h-20 relative bg-[#FFF7ED] rounded-2xl p-1 border border-[#FFEDD5]">
                  <Mascot
                    name={mascotName}
                    alt="Detektif Ciko"
                    width={80}
                    height={80}
                    animate={isVictory ? 'bounce' : 'none'}
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                      Detektif Ciko Berkata
                    </span>
                    <button
                      onClick={handleToggleHint}
                      className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                    >
                      <HelpCircle size={13} />
                      <span>{showHint ? 'Tutup Petunjuk' : 'Minta Petunjuk'}</span>
                    </button>
                  </div>
                  <p className="text-sm text-[#0F172A] leading-relaxed font-semibold">
                    &ldquo;{mascotSpeech}&rdquo;
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#64748B]">
                      <span>Skor investigasi</span>
                      <span className="text-[#FF6B00]">{evidenceScore} / 100</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#FFE8D6]">
                      <div
                        className="h-full rounded-full bg-[#FF6B00] transition-[width] duration-500"
                        style={{ width: `${evidenceScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Detective Notes List */}
              <div className="bg-[#FAF6EE] rounded-3xl p-5 border-2 border-[#EEDCC8] space-y-3">
                <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                  <Eye size={16} className="text-[#FF6B00]" />
                  <span>Catatan Bukti yang Ditemukan:</span>
                </h3>

                {foundHotspotIds.length === 0 ? (
                  <p className="text-xs text-[#94A3B8] italic">
                    Belum ada bukti yang ditemukan. Ketuk bagian di layar HP simulasi!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {foundHotspotIds.map((id) => {
                      const spot = mission.evidence.hotspots.find((s) => s.id === id);
                      if (!spot) return null;
                      return (
                        <div
                          key={spot.id}
                          className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] text-xs text-[#334155] flex items-start gap-2 shadow-sm animate-pop-in"
                        >
                          <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-[#0F172A]">{spot.name}</p>
                            <p className="text-[11px] text-[#64748B] mt-0.5">{spot.explanation}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Decision Section */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE8D6] shadow-sm space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                    Langkah Terakhir: Ambil Keputusan
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mt-0.5">
                    {mission.decisionQuestion}
                  </h3>
                </div>

                {!canDecide && !decisionFeedback && (
                  <p className="text-xs font-bold text-[#B45309] bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-3 py-2.5">
                    Temukan semua kejanggalan dulu sebelum mengambil keputusan ({foundHotspotIds.length}/{mission.evidence.hotspots.length}).
                  </p>
                )}

                <div className={`space-y-2.5 transition-opacity duration-300 ${!canDecide ? 'opacity-45 pointer-events-none select-none' : ''}`}>
                  {mission.choices.map((choice) => {
                    const isSelected = selectedChoiceId === choice.id;
                    let style = 'border-[#E2E8F0] hover:border-[#FF6B00] hover:bg-[#FFF7ED]/60';

                    if (selectedChoiceId) {
                      if (choice.isCorrect) {
                        style = 'border-[#10B981] bg-[#F0FDF4] ring-2 ring-[#10B981]';
                      } else if (isSelected && !choice.isCorrect) {
                        style = 'border-[#EF4444] bg-[#FEF2F2] ring-2 ring-[#EF4444]';
                      } else {
                        style = 'opacity-50 border-[#E2E8F0]';
                      }
                    }

                    return (
                      <button
                        key={choice.id}
                        onClick={() => handleChooseDecision(choice)}
                        disabled={isVictory || !canDecide}
                        className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${style}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            selectedChoiceId && choice.isCorrect
                              ? 'bg-[#10B981] text-white'
                              : selectedChoiceId && isSelected && !choice.isCorrect
                              ? 'bg-[#EF4444] text-white'
                              : 'bg-[#F1F5F9] text-[#475569]'
                          }`}
                        >
                          {choice.id}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#1E293B] leading-snug">
                          {choice.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Reset / Retry button if incorrect */}
                {selectedChoiceId && !isVictory && (
                  <button
                    onClick={handleReset}
                    className="btn-pill-white text-xs w-full py-2.5 font-bold flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw size={14} />
                    <span>Coba Pilihan Lain</span>
                  </button>
                )}

                {decisionFeedback && (
                  <div
                    className={`rounded-2xl border-2 px-4 py-3 space-y-1 text-sm ${
                      decisionFeedback.isCorrect
                        ? 'border-[#86EFAC] bg-[#F0FDF4] text-[#14532d]'
                        : 'border-[#FECACA] bg-[#FEF2F2] text-[#7f1d1d]'
                    }`}
                  >
                    <p className="font-extrabold">
                      {decisionFeedback.isCorrect ? 'Keputusan Tepat!' : 'Keputusan Kurang Tepat!'}
                    </p>
                    <p className="text-xs leading-relaxed opacity-90">
                      {decisionFeedback.outcomeText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            VICTORY MODAL (LAYAR KEMENANGAN MISI WITH 06_melompat.png)
           ========================================================================= */}
        {isVictory && (
          <div className="fixed inset-0 z-50 flex flex-col bg-[#0F172A]/80 backdrop-blur-md animate-pop-in">
            <div className="flex min-h-0 flex-1 items-end justify-center sm:items-center sm:pt-8 sm:pb-0">
              <div className="relative flex w-full flex-col bg-white sm:max-w-md sm:rounded-3xl sm:border-4 sm:border-[#FFE8D6] sm:shadow-2xl sm:overflow-hidden">
                {/* Confetti glow: mobile full bleed, desktop confined card */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -top-32 left-1/2 -translate-x-1/2 w-[400px] sm:w-80 sm:h-80 bg-[#FEF3C7] rounded-full blur-3xl -z-10 sm:-z-10"
                />

                {/* Header: mascot + status */}
                <div className="flex items-start gap-3 px-4 pt-5 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
                  <div className="h-14 w-14 shrink-0 sm:h-16 sm:w-16">
                    <Mascot
                      name="06_melompat"
                      alt="Detektif Ciko melompat gembira"
                      width={56}
                      height={56}
                      animate="bounce"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pt-1 text-left">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#86EFAC] bg-[#DCFCE7] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#15803D]">
                      Misi Selesai
                    </span>
                    <h3 className="mt-2 text-lg font-black leading-tight text-[#0F172A]">
                      Hebat! Kamu Menyelamatkan Keluarga
                    </h3>
                  </div>
                </div>

                {/* Score hero */}
                <div className="mx-4 mb-4 rounded-2xl border-2 border-[#FFE8D6] bg-[#FFF7ED] px-4 py-3 sm:mx-6 sm:mb-5 sm:py-4">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wider text-[#B45309]">Skor Kasus</p>
                      <div className="mt-1 flex items-end gap-1.5">
                        <span className="text-5xl font-black leading-none tabular-nums text-[#FF6B00]">{finalScore}</span>
                        <span className="pb-2 text-base font-bold text-[#B45309]">/200</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] font-bold text-[#92400E]">Bukti ditemukan</p>
                      <p className="text-sm font-black text-[#0F172A]">{evidenceScore}<span className="text-[11px] font-bold text-[#64748B]">/100</span></p>
                      <p className="mt-1 text-[11px] font-bold text-[#15803D]">Keputusan tepat</p>
                      <p className="text-sm font-black text-[#15803D]">+100</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#FFE8D6]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FACC15]" style={{ width: `${Math.min(100, (finalScore / 200) * 100)}%` }} />
                  </div>
                </div>

                {/* Stats row */}
                <div className="mx-4 mb-4 rounded-xl border border-[#FFEDD5] bg-[#FFF7ED] px-4 py-3 sm:mx-6 sm:mb-5 sm:py-3.5">
                  <div className="grid grid-cols-3 divide-x divide-[#FED7AA] text-center">
                    <div className="px-1">
                      <p className="text-[11px] font-bold text-[#64748B]">Total XP</p>
                      <p className="mt-1 text-xl font-black text-[#FF6B00] tabular-nums">{victoryProfile.xp ?? 0}</p>
                    </div>
                    <div className="px-1">
                      <p className="text-[11px] font-bold text-[#64748B]">Rank</p>
                      <p className="mt-1 text-sm font-black leading-tight text-[#15803D]">{victoryProfile.rank ?? 'Detektif Pemula'}</p>
                    </div>
                    <div className="px-1">
                      <p className="text-[11px] font-bold text-[#64748B]">Kasus</p>
                      <p className="mt-1 text-lg font-black text-[#15803D] tabular-nums">
                        {victoryProfile.completedCases?.length ?? 0}<span className="text-sm font-bold text-[#64748B]">/{MISSIONS.length}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#FFE8D6]">
                    <div className="h-full rounded-full bg-[#FF6B00]" style={{ width: `${Math.round(((victoryProfile.completedCases?.length ?? 0) / MISSIONS.length) * 100)}%` }} />
                  </div>
                </div>

                {/* CTA buttons: full-width, 48px touch targets on mobile */}
                <div className="flex flex-col gap-3 px-4 pb-5 sm:px-6 sm:pb-6">
                  {nextMission ? (
                    <Link
                      href={`/kasus/${nextMission.slug}`}
                      className="btn-pill-orange flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-black shadow-lg"
                    >
                      <span>Lanjut ke Misi Berikutnya</span>
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <Link
                      href="/progres"
                      className="btn-pill-orange flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-black shadow-lg"
                    >
                      <span>Lihat Progres &amp; Lencana</span>
                      <Award size={16} />
                    </Link>
                  )}

                  <Link
                    href="/kasus"
                    className="btn-pill-white flex min-h-[48px] w-full items-center justify-center rounded-full py-3 text-sm font-black"
                  >
                    Peta Misi Kasus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteFrame>
  );
}
