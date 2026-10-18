'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Compass,
  BookOpen,
  Award,
  Sparkles,
  Flame,
  ShieldCheck,
  ChevronRight,
  Heart,
  LogOut,
  User,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { Mascot } from './Mascot';
import { getUserProfile, UserProfile, saveUserProfile } from '../utils/userState';

export function SiteHeader() {
  const path = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(getUserProfile());
    const handler = () => setProfile(getUserProfile());
    window.addEventListener('awas_scam_user_updated', handler);
    return () => window.removeEventListener('awas_scam_user_updated', handler);
  }, []);

  const isGuestMode = path === '/' || path === '/login';

  const handleLogout = () => {
    // Reset to guest defaults
    saveUserProfile({ name: 'Detektif Tamu' });
    router.push('/');
  };

  // 1. GUEST MODE NAVBAR (Khusus di Landing Page / & /login)
  if (isGuestMode) {
    return (
      <header className="sticky top-3 z-50 px-3 sm:px-6 w-full max-w-5xl mx-auto transition-all">
        <div className="bg-white/95 backdrop-blur-md border-2 border-[#FFE8D6] rounded-full shadow-[0_8px_30px_rgba(255,122,0,0.12)] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="relative h-9 w-28 sm:h-10 sm:w-32 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Logo AWAS SCAM!"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Quick guest links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-[#334155]">
            <a href="#tentang-misi" className="hover:text-[#FF6B00] transition-colors">
              Tentang Misi
            </a>
            <a href="#cara-kerja" className="hover:text-[#FF6B00] transition-colors">
              Cara Kerja
            </a>
            <Link href="/panduan" className="hover:text-[#FF6B00] transition-colors">
              Panduan Singkat
            </Link>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-bold px-3.5 py-2 rounded-full text-[#0F172A] hover:bg-[#FFF7ED] hover:text-[#FF6B00] transition-all"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="btn-pill-orange text-xs sm:text-sm py-2 px-4 sm:px-5 inline-flex items-center gap-1.5 font-bold shadow-md"
            >
              <span>Mulai Petualangan</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // 2. APP MODE NAVBAR (Saat berada di /kasus, /panduan, /progres, /profil)
  const appNavLinks = [
    { href: '/kasus', label: 'Misi Kasus', icon: Compass },
    { href: '/panduan', label: 'Buku Panduan', icon: BookOpen },
    { href: '/progres', label: 'Progresku', icon: Award },
    { href: '/profil', label: 'Profil Detektif', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#FFE8D6] shadow-[0_4px_20px_rgba(255,122,0,0.06)] px-4 sm:px-8 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/kasus" className="flex items-center gap-2 group shrink-0">
          <div className="relative h-9 w-28 sm:h-10 sm:w-32 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Logo AWAS SCAM!"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <span className="hidden xl:inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
            Ruang Detektif
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Navigasi Aplikasi">
          {appNavLinks.map((link) => {
            const Icon = link.icon;
            const isCurrent =
              link.href === '/kasus'
                ? path === '/kasus' || path.startsWith('/kasus/')
                : path === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  isCurrent
                    ? 'bg-[#FFE8D6] text-[#FF6B00] shadow-sm'
                    : 'text-[#334155] hover:bg-[#FFF7ED] hover:text-[#FF6B00]'
                }`}
              >
                <Icon size={17} className={isCurrent ? 'text-[#FF6B00]' : 'text-[#64748B]'} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Status Indicators (XP, Streak, Profile Avatar) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* XP Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] px-3 py-1 rounded-full text-xs font-bold">
            <Zap size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
            <span>{profile?.xp ?? 150} XP</span>
          </div>

          {/* Streak Flame */}
          <div className="hidden sm:flex items-center gap-1 bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] px-2.5 py-1 rounded-full text-xs font-bold">
            <Flame size={14} className="fill-[#EF4444] text-[#EF4444]" />
            <span>{profile?.streak ?? 3} Hari</span>
          </div>

          {/* User Avatar with Link to /profil */}
          <Link
            href="/profil"
            className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] hover:border-[#FF6B00] transition-colors group"
            title="Buka Profil Detektif"
          >
            <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-[#FDE68A] overflow-hidden flex items-center justify-center shrink-0">
              <Mascot
                name={profile?.avatar ? (profile.avatar as any) : '01_normal'}
                alt="Avatar Pengguna"
                width={30}
                height={30}
              />
            </div>
            <span className="hidden md:inline-block text-xs font-bold text-[#0F172A] group-hover:text-[#FF6B00] max-w-[100px] truncate">
              {profile?.name || 'Detektif'}
            </span>
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEE2E2] transition-colors"
            title="Keluar ke Halaman Awal"
            aria-label="Keluar"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

// MOBILE BOTTOM NAVIGATION BAR FOR APP MODE
export function MobileBottomNav() {
  const path = usePathname();
  const isGuestMode = path === '/' || path === '/login';

  if (isGuestMode) return null;

  const links = [
    { href: '/kasus', label: 'Kasus', icon: Compass },
    { href: '/panduan', label: 'Panduan', icon: BookOpen },
    { href: '/progres', label: 'Progres', icon: Award },
    { href: '/profil', label: 'Profil', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-[#FFE8D6] shadow-[0_-5px_20px_rgba(255,122,0,0.08)] px-2 py-1.5 flex items-center justify-around">
      {links.map((link) => {
        const Icon = link.icon;
        const isCurrent =
          link.href === '/kasus'
            ? path === '/kasus' || path.startsWith('/kasus/')
            : path === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              isCurrent ? 'text-[#FF6B00] font-bold' : 'text-[#64748B]'
            }`}
          >
            <Icon size={20} className={isCurrent ? 'stroke-[2.5]' : ''} />
            <span className="text-[11px] mt-0.5">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-[#FDE68A]/60 bg-gradient-to-b from-[#FFFDF8] to-[#FEF7EC] pt-12 pb-16 lg:pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#E2E8F0]">
          {/* Logo & Vision */}
          <div className="md:col-span-2 space-y-3">
            <div className="relative h-11 w-36">
              <Image
                src="/logo.png"
                alt="Logo AWAS SCAM!"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-[#475569] text-sm leading-relaxed max-w-md font-medium">
              Platform edukasi interaktif dan gamifikasi keamanan digital publik yang ramah pengguna awam di Indonesia. Kenali berbagai modus kejahatan siber secara santai, cerdas, dan menyenangkan bersama Detektif Ciko.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
              <ShieldCheck size={16} className="text-[#10B981]" />
              <span>100% Edukasi Terbuka · Berjalan di Browser · Ramah Seluruh Keluarga</span>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h4 className="font-bold text-[#0F172A] text-base mb-3 font-heading">
              Petualangan Detektif
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-[#475569]">
              <li>
                <Link href="/kasus" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF6B00]" />
                  Peta Misi Kasus
                </Link>
              </li>
              <li>
                <Link href="/panduan" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF6B00]" />
                  Buku Saku Anti-Tipu
                </Link>
              </li>
              <li>
                <Link href="/progres" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF6B00]" />
                  Progres & Pencapaian
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF6B00]" />
                  Kartu ID Detektif
                </Link>
              </li>
            </ul>
          </div>

          {/* Info & Legal */}
          <div>
            <h4 className="font-bold text-[#0F172A] text-base mb-3 font-heading">
              Tentang & Bantuan
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-[#475569]">
              <li>
                <Link href="/tentang" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF6B00]" />
                  Misi Sosial Kami
                </Link>
              </li>
              <li>
                <a
                  href="https://cekrekening.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 text-[#0284C7]"
                >
                  <ChevronRight size={14} className="text-[#0284C7]" />
                  Cek Rekening Kominfo
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF6B00]" />
                  Masuk / Ganti Profil
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} AWAS SCAM! — Inisiatif Literasi Digital Ramah Keluarga Indonesia.</p>
          <div className="flex items-center gap-1.5">
            <span>Dibuat dengan</span>
            <Heart size={14} className="text-[#EF4444] fill-[#EF4444]" />
            <span>untuk melindungi masyarakat dari kejahatan siber.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF8] text-[#0F172A] selection:bg-[#FED7AA]">
      <SiteHeader />
      <main className="flex-1 w-full pb-14 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
