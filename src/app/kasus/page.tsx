'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Clock3,
  Lock,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot } from '../../components/Mascot';
import { MISSIONS } from '../../data/cases';
import { getUserProfile, UserProfile } from '../../utils/userState';

let cachedProfile: UserProfile | null = null;
let profileLoaded = false;

function getProfileSnapshot() {
  if (typeof window === 'undefined') return null;
  if (!profileLoaded) {
    cachedProfile = getUserProfile();
    profileLoaded = true;
  }
  return cachedProfile;
}

function subscribeToProfile(onChange: () => void) {
  const refreshProfile = () => {
    cachedProfile = getUserProfile();
    profileLoaded = true;
    onChange();
  };

  window.addEventListener('awas_scam_user_updated', refreshProfile);
  window.addEventListener('storage', refreshProfile);

  return () => {
    window.removeEventListener('awas_scam_user_updated', refreshProfile);
    window.removeEventListener('storage', refreshProfile);
  };
}

export default function CasesAdventureMap() {
  const profile = useSyncExternalStore(
    subscribeToProfile,
    getProfileSnapshot,
    getUserProfile
  );
  const completedCases = new Set(profile?.completedCases ?? []);

  return (
    <SiteFrame>
      <div className="min-h-screen bg-[#FFFDF8] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-7 sm:space-y-9">
          <header className="flex items-center justify-between gap-4 sm:gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                Pilih Kasus
              </h1>
              <p className="text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
                Pilih kasus untuk membuka simulasinya.
              </p>
            </div>
            <Mascot
              name="03_memeriksa"
              alt="Detektif Ciko memeriksa daftar kasus"
              width={128}
              height={128}
              className="h-20 w-20 shrink-0 sm:h-28 sm:w-28"
            />
          </header>

          <section aria-labelledby="case-list-title">
            <h2 id="case-list-title" className="sr-only">
              Daftar kasus
            </h2>
            <ol className="divide-y divide-[#F3E4D8] border-y border-[#F3E4D8]">
              {MISSIONS.map((mission, index) => {
                const isComplete = completedCases.has(mission.slug);
                const isLocked = index > 0 && !completedCases.has(MISSIONS[index - 1].slug);

                return (
                  <li key={mission.slug}>
                    {isLocked ? (
                      <div className="flex cursor-not-allowed items-center gap-3 rounded-xl px-2 py-5 opacity-55 sm:gap-5 sm:py-6">
                        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E3E8F1] text-[#64748B]">
                          <Lock size={16} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-bold text-[#172640]">{mission.title}</span>
                            <span className="rounded-sm bg-[#E3E8F1] px-1.5 py-0.5 text-[0.65rem] font-bold text-[#475569]">TERKUNCI</span>
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-[#3F4D6B]">Selesaikan kasus sebelumnya untuk membuka misi ini.</span>
                        </span>
                      </div>
                    ) : (
                    <Link
                      href={`/kasus/${mission.slug}`}
                      className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-5 transition-colors hover:bg-[#FFF8F1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B04A00] active:bg-[#FFF1E6] sm:gap-5 sm:py-6"
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          isComplete
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : 'bg-[#FFE8DB] text-[#B04A00]'
                        }`}
                      >
                        {isComplete ? <Check size={17} /> : index + 1}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-bold text-[#172640] group-hover:text-[#B04A00]">
                            {mission.title}
                          </span>
                          {mission.isBoss && (
                            <span className="rounded-sm bg-[#FFE8DB] px-1.5 py-0.5 text-[0.65rem] font-bold text-[#B04A00]">
                              KASUS UTAMA
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-[#3F4D6B]">
                          {mission.summary}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#5D6982]">
                          <span>{mission.category}</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 size={13} aria-hidden="true" />
                            {mission.duration}
                          </span>
                          <span>{mission.difficulty}</span>
                          <span
                            className={`inline-flex items-center gap-1 font-semibold ${
                              isComplete ? 'text-[#15803D]' : 'text-[#5D6982]'
                            }`}
                          >
                            {isComplete && <Check size={13} aria-hidden="true" />}
                            {isComplete ? 'Selesai' : 'Belum selesai'}
                          </span>
                        </span>
                      </span>

                      <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-[#B04A00] sm:gap-2 sm:text-sm">
                        <span className="whitespace-nowrap">
                          {isComplete ? 'Main lagi' : 'Mainkan'}
                        </span>
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                    )}
                  </li>
                );
              })}

              <li>
                <div
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center gap-3 py-5 opacity-80 sm:gap-5 sm:py-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E3E8F1] text-[#172640]"
                  >
                    <PhoneCall size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-bold text-[#172640]">TELPON AI</span>
                      <span className="inline-flex items-center gap-1 rounded-sm bg-[#E3E8F1] px-1.5 py-0.5 text-[0.65rem] font-bold text-[#172640]">
                        <Sparkles size={12} aria-hidden="true" />
                        SEGERA HADIR
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#3F4D6B]">
                      Fitur khusus berbasis AI.
                    </span>
                  </span>
                </div>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </SiteFrame>
  );
}
