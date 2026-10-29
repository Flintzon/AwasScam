'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileCode2,
  HelpCircle,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Zap,
  Check,
  Eye,
  PhoneCall,
  Clock,
  Compass,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SiteFrame } from '../SiteChrome';
import { Mascot, MascotName } from '../Mascot';
import { CaseMission, CaseHotspot, DecisionChoice, MISSIONS } from '../../data/cases';
import { completeCase } from '../../utils/userState';
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

  const handleChooseDecision = (choice: DecisionChoice) => {
    setSelectedChoiceId(choice.id);
    setDecisionFeedback(choice);

    if (choice.isCorrect) {
      playVictory();
      setIsVictory(true);
      completeCase(mission.slug, mission.xpReward);
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

                <p className="text-xs sm:text-sm text-[#475569] font-medium">
                  <strong>Petunjuk:</strong> Klik langsung bagian mencurigakan di layar HP simulasi bawah ini!
                </p>

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

                <div className="space-y-2.5">
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
                        disabled={isVictory}
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
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            VICTORY MODAL (LAYAR KEMENANGAN MISI WITH 06_melompat.png)
           ========================================================================= */}
        {isVictory && (
          <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
            <div className="bg-white rounded-[36px] max-w-lg w-full p-6 sm:p-8 border-4 border-[#FFE8D6] shadow-2xl text-center space-y-6 relative overflow-hidden">
              {/* Confetti Glow Background */}
              <div
                aria-hidden="true"
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FEF3C7] rounded-full blur-2xl -z-10"
              />

              <div className="flex justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
                  <Mascot
                    name="06_melompat"
                    alt="Detektif Ciko melompat gembira"
                    width={160}
                    height={160}
                    animate="bounce"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                  MISI SELESAI DENGAN SUKSES!
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                  Hebat! Kamu Menyelamatkan Keluarga!
                </h3>
                <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed font-medium">
                  {decisionFeedback?.outcomeText}
                </p>
              </div>

              <div className="bg-[#FFF7ED] p-4 rounded-2xl border border-[#FFEDD5] flex items-center justify-around text-center">
                <div>
                  <span className="text-xs font-bold text-[#64748B]">Bonus Hadiah:</span>
                  <p className="text-xl font-black text-[#FF6B00]">+{mission.xpReward} XP</p>
                </div>
                <div className="w-px h-8 bg-[#FED7AA]" />
                <div>
                  <span className="text-xs font-bold text-[#64748B]">Status Misi:</span>
                  <p className="text-xl font-black text-[#10B981]">TERBONGKAR</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                {nextMission ? (
                  <Link
                    href={`/kasus/${nextMission.slug}`}
                    className="btn-pill-orange w-full py-3.5 text-base font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Lanjut ke Misi Berikutnya</span>
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <Link
                    href="/progres"
                    className="btn-pill-orange w-full py-3.5 text-base font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Lihat Progres &amp; Lencana</span>
                    <Award size={18} />
                  </Link>
                )}

                <Link
                  href="/kasus"
                  className="btn-pill-white w-full sm:w-auto py-3.5 px-6 text-sm font-bold whitespace-nowrap"
                >
                  Peta Misi Kasus
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteFrame>
  );
}
