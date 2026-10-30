'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, Check } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot } from '../../components/Mascot';
import { MISSIONS } from '../../data/cases';
import { getUserProfile, UserProfile } from '../../utils/userState';

const BADGE_TITLES: Record<string, string> = {
  'mata-elang': 'Mata Elang',
  'anti-apk-master': 'Anti-APK Master',
  'pelindung-keluarga': 'Pelindung Keluarga',
  'pelindung-dana-pensiun': 'Pelindung Dana Pensiun',
};

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
    getUserProfile
  );

  const completedMissions = MISSIONS.filter((mission) =>
    profile?.completedCases.includes(mission.slug)
  );
  const progressPercent = Math.round(
    (completedMissions.length / MISSIONS.length) * 100
  );
  const earnedBadges = [...new Set(profile?.badges ?? [])];

  return (
    <SiteFrame>
      <div className="min-h-screen bg-[#FFFDF8] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
          <header className="flex items-center justify-between gap-4 sm:gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                Progres Petualangan
              </h1>
              <p className="text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
                Ringkasan kasus yang sudah kamu selesaikan.
              </p>
            </div>
            <Mascot
              name={completedMissions.length > 0 ? '06_melompat' : '01_menyapa'}
              alt={
                completedMissions.length > 0
                  ? 'Detektif Ciko merayakan pencapaian'
                  : 'Detektif Ciko menyapa detektif'
              }
              width={128}
              height={128}
              className="h-20 w-20 shrink-0 sm:h-28 sm:w-28"
            />
          </header>

          <section
            aria-label="Ringkasan progres"
            className="space-y-5 rounded-2xl border border-[#F3E4D8] bg-white p-5 sm:p-7"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#475569]">Kasus selesai</p>
                <p className="mt-1 text-3xl font-extrabold tabular-nums text-[#0F172A]">
                  {completedMissions.length}
                  <span className="ml-1.5 text-base font-semibold text-[#475569]">
                    dari {MISSIONS.length}
                  </span>
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-semibold text-[#475569]">XP terkumpul</p>
                <p className="mt-1 text-3xl font-extrabold tabular-nums text-[#B04A00]">
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
              className="h-3 overflow-hidden rounded-full bg-[#F3E4D8]"
            >
              <div
                className="h-full rounded-full bg-[#FF6B00] transition-[width]"
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
              {MISSIONS.map((mission) => {
                const isComplete = completedMissions.some((completedMission) =>
                  completedMission.slug === mission.slug
                );

                return (
                  <li
                    key={mission.slug}
                    className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4 sm:py-5"
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:flex-1 sm:gap-4">
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          isComplete
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : 'bg-[#FFF1E6] text-[#B04A00]'
                        }`}
                      >
                        {isComplete ? <Check size={17} /> : mission.id}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#0F172A]">{mission.title}</h3>
                        <p className="mt-0.5 text-sm text-[#475569]">
                          {mission.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 pl-12 sm:shrink-0 sm:pl-0">
                      <span
                        className={`text-xs font-semibold ${
                          isComplete ? 'text-[#15803D]' : 'text-[#475569]'
                        }`}
                      >
                        {isComplete ? 'Selesai' : 'Belum selesai'}
                      </span>
                      <Link
                        href={`/kasus/${mission.slug}`}
                        className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#B04A00] hover:text-[#843900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B04A00]"
                      >
                        {isComplete ? 'Main lagi' : 'Mulai'}
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="earned-badges-title">
            <h2
              id="earned-badges-title"
              className="mb-3 text-xl font-bold text-[#0F172A]"
            >
              Pencapaian
            </h2>
            {earnedBadges.length > 0 ? (
              <ul className="flex flex-wrap gap-x-6 gap-y-3 border-y border-[#F3E4D8] py-4">
                {earnedBadges.map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
                  >
                    <Award
                      size={17}
                      aria-hidden="true"
                      className="text-[#FF6B00]"
                    />
                    {BADGE_TITLES[badge] ?? badge}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-y border-[#F3E4D8] py-4 text-sm text-[#475569]">
                Belum ada pencapaian yang tercatat.
              </p>
            )}
          </section>
        </div>
      </div>
    </SiteFrame>
  );
}
