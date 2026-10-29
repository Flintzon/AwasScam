'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
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

export default function ProgressPage() {
  const profile = useSyncExternalStore(
    subscribeToProfile,
    getProfileSnapshot,
    () => null
  );

  const completedMissions = MISSIONS.filter((mission) =>
    profile?.completedCases.includes(mission.slug)
  );
  const progressPercent = Math.round(
    (completedMissions.length / MISSIONS.length) * 100
  );

  return (
    <SiteFrame>
      <div className="min-h-screen bg-[#FFFDF8] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
              Progres Petualangan
            </h1>
            <p className="text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
              Ringkasan kasus yang sudah kamu selesaikan.
            </p>
          </header>

          <section
            aria-label="Ringkasan progres"
            className="space-y-5 rounded-2xl border border-[#F3E4D8] bg-white p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Kasus selesai</p>
                <p className="mt-1 text-2xl font-extrabold text-[#0F172A]">
                  {completedMissions.length}
                  <span className="ml-1.5 text-base font-semibold text-[#64748B]">
                    dari {MISSIONS.length}
                  </span>
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-medium text-[#64748B]">XP terkumpul</p>
                <p className="mt-1 text-2xl font-extrabold text-[#D95B00]">
                  {profile?.xp ?? 0} XP
                </p>
              </div>
            </div>
            <div
              role="progressbar"
              aria-label="Progres penyelesaian kasus"
              aria-valuemin={0}
              aria-valuemax={MISSIONS.length}
              aria-valuenow={completedMissions.length}
              className="h-2 overflow-hidden rounded-full bg-[#F3E4D8]"
            >
              <div
                className="h-full rounded-full bg-[#E96817] transition-[width]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </section>

          <section aria-labelledby="mission-activity-title">
            <h2
              id="mission-activity-title"
              className="mb-2 text-xl font-bold text-[#0F172A]"
            >
              Aktivitas Kasus
            </h2>
            <ul className="divide-y divide-[#F3E4D8] border-y border-[#F3E4D8]">
              {MISSIONS.map((mission, index) => {
                const isComplete = completedMissions.some(
                  (completedMission) => completedMission.slug === mission.slug
                );

                return (
                  <li
                    key={mission.slug}
                    className="flex items-center gap-3 py-4 sm:gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        isComplete
                          ? 'bg-[#FFF1E6] text-[#D95B00]'
                          : 'bg-[#F5F5F4] text-[#64748B]'
                      }`}
                    >
                      {isComplete ? <Check size={16} /> : index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[#0F172A]">{mission.title}</h3>
                      <p className="mt-0.5 text-sm text-[#64748B]">
                        {mission.subtitle}
                      </p>
                    </div>
                    {isComplete ? (
                      <span className="shrink-0 text-xs font-semibold text-[#15803D]">
                        Selesai
                      </span>
                    ) : (
                      <Link
                        href={`/kasus/${mission.slug}`}
                        className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#D95B00] hover:text-[#A84300] sm:text-sm"
                      >
                        Mulai
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </SiteFrame>
  );
}
