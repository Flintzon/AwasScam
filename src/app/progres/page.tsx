'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Flame,
  Check,
  RotateCcw,
  Sparkles,
  Users,
  Compass,
} from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot } from '../../components/Mascot';
import { MISSIONS } from '../../data/cases';
import { getUserProfile, UserProfile } from '../../utils/userState';

export default function ProgressPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const completedList = profile?.completedCases || [];
  const totalMissions = MISSIONS.length;
  const progressPercent = Math.min(
    100,
    Math.round((completedList.length / totalMissions) * 100)
  );

  let awarenessLevel = 'Waspada Dasar';
  let badgeColor = 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]';
  if (progressPercent >= 80) {
    awarenessLevel = 'Siaga Tinggi (Ahli)';
    badgeColor = 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]';
  } else if (progressPercent >= 40) {
    awarenessLevel = 'Waspada Menengah';
    badgeColor = 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]';
  }

  const SKILLS_BREAKDOWN = [
    {
      name: 'Kenali Ekstensi Malware APK',
      category: 'Keamanan Berkas',
      score: completedList.includes('paket-misterius') || completedList.includes('undangan-pernikahan-apk') ? 95 : 30,
    },
    {
      name: 'Deteksi Tautan Phishing Palsu',
      category: 'Domain & Web',
      score: completedList.includes('cs-bank-gadungan') ? 90 : 25,
    },
    {
      name: 'Verifikasi Panggilan Telepon Panik',
      category: 'Social Engineering',
      score: completedList.includes('mama-minta-transfer') ? 92 : 20,
    },
    {
      name: 'Analisis Skema Deposit / Task Scam',
      category: 'Investasi & Keuangan',
      score: completedList.includes('freelance-kripto') ? 98 : 15,
    },
  ];

  const LEADERBOARD = [
    { rank: 1, name: 'Ibu Ratna (Bandung)', badge: 'Inspektur Teladan', xp: 620 },
    { rank: 2, name: profile?.name || 'Kamu', badge: profile?.rank || 'Detektif Pemula', xp: profile?.xp || 150, isUser: true },
    { rank: 3, name: 'Pak Hendro (Surabaya)', badge: 'Penjaga Keluarga', xp: 340 },
    { rank: 4, name: 'Kak Fajar (Jakarta)', badge: 'Mata Elang', xp: 280 },
  ];

  return (
    <SiteFrame>
      <div className="py-8 sm:py-12 bg-gradient-to-b from-[#FFFDF8] via-[#FEF7EC] to-[#FFFDF8] min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* =========================================================================
              BANNER RINGKASAN SEMANGAT & METERAN KEWASPADAAN DIGITAL
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-[#FFE8D6] shadow-[0_10px_35px_rgba(255,107,0,0.08)] space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-bold shadow-sm">
                  <Award size={15} />
                  <span>REKAPITULASI DETEKTIF SIBER</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                  Tingkat Kewaspadaan: {progressPercent}%
                </h1>
                <p className="text-sm sm:text-base text-[#475569] max-w-lg font-medium">
                  {progressPercent >= 80
                    ? 'Luar biasa! Naluri kritismu sangat tajam. Kamu sudah siap menjadi benteng pertahanan bagi seluruh keluarga!'
                    : 'Terus tingkatkan penyelidikanmu untuk membuka semua lencana dan mengamankan keluarga dari kejahatan online!'}
                </p>
                <div className="pt-1">
                  <span className={`text-xs font-bold px-3.5 py-1 rounded-full border ${badgeColor}`}>
                    Status: {awarenessLevel} 🛡️
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 relative">
                <Mascot
                  name={progressPercent >= 50 ? '02_senang' : '05_berjalan'}
                  alt="Detektif Ciko"
                  width={128}
                  height={128}
                  animate="bounce"
                />
              </div>
            </div>

            {/* Visual Awareness Meter */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between text-xs font-bold text-[#64748B]">
                <span>Kemajuan Belajar</span>
                <span>{completedList.length} dari {totalMissions} Kasus Terbongkar</span>
              </div>
              <div className="w-full h-4 bg-[#F1F5F9] rounded-full overflow-hidden p-0.5 border border-[#E2E8F0]">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B00] via-[#FACC15] to-[#10B981] rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              JEJAK KASUS YANG TELAH DIBONGKAR (VISUAL TIMELINE)
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-[#FFE8D6] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                  Jejak Investigasi Lapangan
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A] mt-0.5">
                  Status 5 Berkas Kasus
                </h2>
              </div>
              <Link
                href="/kasus"
                className="btn-pill-orange text-xs sm:text-sm py-2 px-4 font-bold inline-flex items-center gap-1.5"
              >
                <span>Peta Kasus</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {MISSIONS.map((mission) => {
                const isDone = completedList.includes(mission.slug);

                return (
                  <div
                    key={mission.id}
                    className={`p-4 sm:p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                      isDone
                        ? 'bg-[#F0FDF4] border-[#86EFAC]'
                        : 'bg-white border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isDone
                            ? 'bg-[#10B981] text-white'
                            : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}
                      >
                        {isDone ? '✓' : mission.id}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-[#0F172A]">{mission.title}</h3>
                          {mission.isBoss && (
                            <span className="text-[10px] bg-[#FEE2E2] text-[#DC2626] font-bold px-2 py-0.5 rounded-full">
                              BOSS
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">{mission.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <span
                        className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                          isDone
                            ? 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]'
                            : 'bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]'
                        }`}
                      >
                        {isDone ? 'TERBONGKAR! ✅' : 'BELUM DISELIDIKI'}
                      </span>

                      <Link
                        href={`/kasus/${mission.slug}`}
                        className={`text-xs font-bold py-1.5 px-3 rounded-full border transition-all ${
                          isDone
                            ? 'bg-white text-[#0F172A] border-[#CBD5E1] hover:border-[#FF6B00]'
                            : 'btn-pill-orange py-1.5 px-4 text-xs'
                        }`}
                      >
                        {isDone ? 'Main Lagi' : 'Mulai Kasus'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              RADAR KEAHLIAN & PAPAN PERINGKAT KOMUNITAS
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Skills Progress */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider">
                  Kekuatan Analisis
                </span>
                <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">
                  Radar Keahlian Detektif
                </h3>
              </div>

              <div className="space-y-4">
                {SKILLS_BREAKDOWN.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#0F172A]">{skill.name}</span>
                      <span className="text-[#FF6B00]">{skill.score}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF6B00] rounded-full transition-all duration-500"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Leaderboard */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                    Komunitas Detektif
                  </span>
                  <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">
                    Peringkat Teladan
                  </h3>
                </div>
                <Users size={18} className="text-[#64748B]" />
              </div>

              <div className="space-y-2.5">
                {LEADERBOARD.map((user) => (
                  <div
                    key={user.rank}
                    className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                      user.isUser
                        ? 'bg-[#FFF7ED] border-[#FF6B00] font-bold'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center font-bold text-[#64748B]">
                        {user.rank}
                      </span>
                      <div>
                        <p className="text-[#0F172A] font-bold">{user.name}</p>
                        <p className="text-[11px] text-[#64748B]">{user.badge}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#FF6B00]">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
