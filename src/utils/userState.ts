'use client';

export interface UserProfile {
  name: string;
  role: 'Detektif Muda' | 'Orang Tua Siaga' | 'Penjaga Keluarga';
  rank: string;
  avatar: string; // e.g. '01_normal'
  xp: number;
  streak: number;
  joinedDate: string;
  completedCases: string[];
  badges: string[];
  textSize: 'normal' | 'large';
  soundEnabled: boolean;
  scores: Record<string, number>; // best game score per case slug
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Detektif Tamu',
  role: 'Penjaga Keluarga',
  rank: 'Detektif Pemula',
  avatar: '01_normal',
  xp: 0,
  streak: 0,
  joinedDate: 'Hari Ini',
  completedCases: [],
  badges: [],
  textSize: 'normal',
  soundEnabled: true,
  scores: {},
};

const STORAGE_KEY = 'awas_scam_user_profile';

export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: Partial<UserProfile>): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const current = getUserProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for cross-component reactivity
    window.dispatchEvent(new Event('awas_scam_user_updated'));
    return updated;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function completeCase(
  caseSlug: string,
  earnedXp: number = 100,
  gameScore = 0
): UserProfile {
  const current = getUserProfile();
  const firstClear = !current.completedCases.includes(caseSlug);

  const completed = Array.from(new Set([...current.completedCases, caseSlug]));

  // Rank naik tiap 2 kasus
  let newRank = 'Detektif Pemula';
  if (completed.length >= 4) newRank = 'Detektif Ahli Madya';
  else if (completed.length >= 2) newRank = 'Inspektur Anti-Scam';

  const newBadges = [...current.badges];
  if (caseSlug === 'paket-misterius' && !newBadges.includes('anti-apk-master')) {
    newBadges.push('anti-apk-master');
  }
  if (completed.length >= 3 && !newBadges.includes('pelindung-dana-pensiun')) {
    newBadges.push('pelindung-dana-pensiun');
  }

  const updatedScores = {
    ...current.scores,
    [caseSlug]: Math.max(current.scores[caseSlug] ?? 0, gameScore),
  };

  return saveUserProfile({
    completedCases: completed,
    xp: current.xp + (firstClear ? earnedXp : 0),
    rank: newRank,
    badges: Array.from(new Set(newBadges)),
    scores: updatedScores,
  });
}
