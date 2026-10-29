'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Sparkles,
  Lock,
  X,
  Play,
  Flame,
  Search,
} from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot } from '../../components/Mascot';
import { MISSIONS, CaseMission } from '../../data/cases';
import { getUserProfile, UserProfile } from '../../utils/userState';
import { playClick, playEvidenceFound } from '../../utils/sound';

export default function CasesAdventureMap() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedMission, setSelectedMission] = useState<CaseMission | null>(null);

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const completedSet = new Set(profile?.completedCases || []);

  const handleOpenPreview = (mission: CaseMission) => {
    playClick();
    setSelectedMission(mission);
  };

  const handleClosePreview = () => {
    playClick();
    setSelectedMission(null);
  };

  return (
    <SiteFrame>
      <div className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-[#FFFDF8] via-[#FEF7EC] to-[#FFFDF8] min-h-screen relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          {/* Personal Greeting Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-[0_10px_35px_rgba(255,107,0,0.08)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-bold shadow-sm">
                <Compass size={15} />
                <span>PETA PETUALANGAN DETEKTIF</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Halo, Detektif {profile?.name || 'Keluarga'}!
              </h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-lg leading-relaxed font-medium">
                Pilih salah satu titik misi di jalur petualangan bawah ini untuk mulai menyelidiki kejanggalan dan membongkar kedok penipu!
              </p>
            </div>

            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative">
              <Mascot
                name="05_berjalan"
                alt="Detektif Ciko memandu jalan"
                width={112}
                height={112}
                animate="bounce"
              />
            </div>
          </div>

          {/* =========================================================================
              THE WINDING ADVENTURE PATH (JALUR BERKELOK-KELOK 5 TITIK MISI)
             ========================================================================= */}
          <div className="relative py-6">
            {/* Center Winding River Trail (Desktop) */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-4 border-l-4 border-dashed border-[#FF6B00]/40 pointer-events-none hidden md:block"
            />

            <div className="space-y-12 relative">
              {MISSIONS.map((mission, idx) => {
                const isCompleted = completedSet.has(mission.slug);
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={mission.id}
                    className={`flex flex-col md:flex-row items-center gap-6 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Node Trigger Button (The Circle in the Trail) */}
                    <div className="relative z-20 flex flex-col items-center">
                      <button
                        onClick={() => handleOpenPreview(mission)}
                        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                          mission.isBoss
                            ? 'bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white border-[#FECACA] ring-4 ring-[#EF4444]/30 animate-pulse-glow'
                            : isCompleted
                            ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white border-[#A7F3D0]'
                            : 'bg-gradient-to-br from-[#FF6B00] to-[#EA580C] text-white border-[#FED7AA]'
                        }`}
                        aria-label={`Buka Misi ${mission.id}: ${mission.title}`}
                      >
                        <span className="text-xs font-black uppercase tracking-wider">
                          {mission.isBoss ? 'BOSS' : `MISI ${mission.id}`}
                        </span>
                        <span className="mt-0.5" aria-hidden="true">
                          {mission.isBoss ? (
                            <Award size={22} />
                          ) : isCompleted ? (
                            <CheckCircle2 size={22} />
                          ) : (
                            <Search size={22} />
                          )}
                        </span>
                      </button>

                      {isCompleted && (
                        <span className="mt-2 text-[10px] font-black uppercase tracking-wider bg-[#DCFCE7] text-[#15803D] px-2.5 py-0.5 rounded-full border border-[#86EFAC] shadow-sm">
                          Terbongkar!
                        </span>
                      )}
                    </div>

                    {/* Mission Info Card (Alternating Sides) */}
                    <div
                      onClick={() => handleOpenPreview(mission)}
                      className={`w-full md:w-[45%] bg-white rounded-3xl p-5 sm:p-6 border-2 cursor-pointer transition-all hover:border-[#FF6B00] shadow-[0_8px_30px_rgba(255,107,0,0.06)] hover:shadow-lg ${
                        mission.isBoss
                          ? 'border-[#FECACA] bg-[#FEF2F2]/40'
                          : isCompleted
                          ? 'border-[#86EFAC]'
                          : 'border-[#FFE8D6]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 pb-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7]">
                          {mission.category}
                        </span>
                        <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1">
                          <Zap size={14} className="fill-[#F59E0B]" /> +{mission.xpReward} XP
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-1">
                        {mission.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#475569] mt-1.5 line-clamp-2 font-medium">
                        {mission.summary}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-bold">
                        <span className="text-[#64748B] flex items-center gap-1">
                          <Clock size={13} /> {mission.duration}
                        </span>
                        <span className="text-[#FF6B00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Selidiki</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            MISSION PREVIEW MODAL / DRAWER (POP-UP PENGANTAR MASCOT 03_memeriksa.png)
           ========================================================================= */}
        {selectedMission && (
          <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
            <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 border-4 border-[#FFE8D6] shadow-2xl relative space-y-6">
              {/* Close Button */}
              <button
                onClick={handleClosePreview}
                className="absolute top-5 right-5 p-2 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                aria-label="Tutup pratinjau misi"
              >
                <X size={20} />
              </button>

              {/* Header with Investigating Mascot */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-[#FFF7ED] rounded-2xl p-1 border border-[#FFEDD5]">
                  <Mascot
                    name="03_memeriksa"
                    alt="Detektif Ciko memeriksa kasus"
                    width={80}
                    height={80}
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                    {selectedMission.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-snug">
                    {selectedMission.title}
                  </h3>
                </div>
              </div>

              {/* Case Briefing */}
              <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#EEDCC8] space-y-2 text-xs sm:text-sm">
                <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Compass size={16} className="text-[#FF6B00]" /> Sasaran Investigasi:
                </p>
                <p className="text-[#475569] leading-relaxed font-medium">
                  {selectedMission.objective}
                </p>
              </div>

              {/* Skills to practice */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Keahlian yang Dilatih:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedMission.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-bold bg-[#E0F2FE] text-[#0284C7] px-3 py-1 rounded-full"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleClosePreview}
                  className="btn-pill-white text-sm py-3 px-5 font-bold"
                >
                  Nanti Saja
                </button>
                <Link
                  href={`/kasus/${selectedMission.slug}`}
                  className="btn-pill-orange text-sm sm:text-base py-3 px-7 font-bold flex-1 justify-center inline-flex items-center gap-2 shadow-lg"
                >
                  <Play size={17} className="fill-white" />
                  <span>Mulai Selidiki Kasus Ini!</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteFrame>
  );
}
