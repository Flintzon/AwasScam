'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Compass,
  BookOpen,
  Award,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Heart,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { Mascot } from './Mascot';

const NAV_LINKS = [
  { href: '/kasus', label: 'Simulasi Kasus', icon: Compass, badge: '4 Kasus' },
  { href: '/#jalur-modus', label: 'Jalur Modus', icon: Sparkles },
  { href: '/#tes-insting', label: 'Tes Insting', icon: HelpCircle },
  { href: '/#kamus-saku', label: 'Kamus Saku', icon: BookOpen },
  { href: '/panduan', label: 'Panduan', icon: BookOpen },
  { href: '/progres', label: 'Progres', icon: Award },
];

export function SiteHeader() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6 w-full max-w-6xl mx-auto transition-all">
      <div className="bg-white/95 backdrop-blur-md border-2 border-[#FFE8D6] rounded-full shadow-[0_8px_30px_rgba(255,122,0,0.12)] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Kembali ke Beranda AWAS SCAM!"
        >
          <div className="relative h-10 w-28 sm:h-11 sm:w-32 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Logo AWAS SCAM!"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <span className="hidden xl:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
            Edisi Keluarga 🇮🇩
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Navigasi Utama">
          {NAV_LINKS.slice(0, 4).map((link) => {
            const Icon = link.icon;
            const isKasus = link.href === '/kasus' && (path.startsWith('/kasus') || path.startsWith('/main'));
            const isCurrent = path === link.href || isKasus;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.92rem] font-bold transition-all ${
                  isCurrent
                    ? 'bg-[#E0F2FE] text-[#0369A1] shadow-sm'
                    : 'text-[#334155] hover:bg-[#FFF7ED] hover:text-[#FF7A00]'
                }`}
              >
                <Icon size={16} className={isCurrent ? 'text-[#0284C7]' : 'text-[#64748B]'} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/kasus/paket-misterius"
            className="btn-pill-orange text-sm sm:text-base py-2 px-4 sm:px-5 inline-flex items-center gap-2 font-bold"
          >
            <span>Mulai Misi</span>
            <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-[#E2E8F0] text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white rounded-3xl border-2 border-[#FFE8D6] shadow-[0_15px_40px_rgba(255,122,0,0.18)] p-5 animate-pop-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] p-1 flex items-center justify-center border border-[#FDE68A]">
                <Mascot name="senang" alt="Detektif Ciko" width={34} height={34} />
              </div>
              <div>
                <p className="font-bold text-sm text-[#0F1D38]">Detektif Ciko</p>
                <p className="text-xs text-[#64748B]">Mau belajar apa hari ini?</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-3 space-y-1.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-[0.95rem] font-bold text-[#1E293B] hover:bg-[#FFF7ED] hover:text-[#FF7A00] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#FF7A00] flex items-center justify-center">
                      <Icon size={17} />
                    </span>
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-xs bg-[#FEF3C7] text-[#B45309] font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
            <Link
              href="/kasus/paket-misterius"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-pill-orange w-full justify-center text-center font-bold"
            >
              Mulai Petualangan Misi 1 🚀
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-[#FDE68A]/60 bg-gradient-to-b from-[#FFFDF9] to-[#FEF9EF] pt-14 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Friendly Advice Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE4C4] shadow-[0_8px_30px_rgba(255,122,0,0.08)] mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative">
              <Mascot
                name="02_senang"
                alt="Detektif Ciko tersenyum ramah"
                width={96}
                height={96}
                animate="bounce"
              />
            </div>
            <div>
              <span className="badge-friendly bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] text-xs">
                Pesan Hangat Detektif Ciko 🦉
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F1D38] mt-1">
                Keluarga yang Melek Digital, Bebas dari Tipu Daya!
              </h3>
              <p className="text-[#475569] text-sm sm:text-base mt-1.5 max-w-xl">
                Penipu mengincar rasa panik dan kelengahan kita. Bagikan tips di website ini ke WhatsApp keluarga, grup bapak-bapak, dan ibu-ibu pengajian tercinta.
              </p>
            </div>
          </div>
          <Link
            href="/kasus/paket-misterius"
            className="btn-pill-orange shrink-0 px-6 py-3 text-base font-bold whitespace-nowrap"
          >
            Latih Nalurimu Sekarang ✨
          </Link>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E2E8F0]">
          {/* Logo & Vision */}
          <div className="md:col-span-2 space-y-3">
            <div className="relative h-12 w-36">
              <Image
                src="/logo.png"
                alt="Logo AWAS SCAM!"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-[#475569] text-sm leading-relaxed max-w-md">
              Platform edukasi interaktif dan gamifikasi keamanan digital publik yang ramah pengguna awam di Indonesia. Belajar mengenali berbagai modus scam dengan cara yang asyik, santai, dan tanpa beban.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0F1D38]">
              <ShieldCheck size={16} className="text-[#22C55E]" />
              <span>100% Gratis · Berjalan di Peramban · Tanpa Pasang Aplikasi Luar</span>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h4 className="font-bold text-[#0F1D38] text-base mb-3 font-heading">
              Jelajahi Misi
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-[#475569]">
              <li>
                <Link href="/kasus" className="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF7A00]" />
                  Daftar Berkas Kasus
                </Link>
              </li>
              <li>
                <Link href="/kasus/paket-misterius" className="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF7A00]" />
                  Kasus 01: Paket Kurir APK
                </Link>
              </li>
              <li>
                <Link href="/kasus/cs-bank-gadungan" className="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF7A00]" />
                  Kasus 02: Panggilan CS Bank
                </Link>
              </li>
              <li>
                <Link href="/kasus/freelance-kripto" className="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF7A00]" />
                  Kasus 03: Tawaran Freelance & Kripto
                </Link>
              </li>
            </ul>
          </div>

          {/* Literacy & Guide */}
          <div>
            <h4 className="font-bold text-[#0F1D38] text-base mb-3 font-heading">
              Edukasi & Bantuan
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-[#475569]">
              <li>
                <Link href="/panduan" className="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF7A00]" />
                  Panduan Literasi Keamanan
                </Link>
              </li>
              <li>
                <Link href="/progres" className="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF7A00]" />
                  Pencapaian & Lencana
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#FF7A00]" />
                  Tentang Inisiatif Ini
                </Link>
              </li>
              <li>
                <a
                  href="https://cekrekening.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5 text-xs text-[#0284C7]"
                >
                  <ExternalLink size={13} />
                  Cek Rekening Resmi Kominfo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Heart */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} AWAS SCAM! — Inisiatif Literasi Digital Ramah Keluarga.</p>
          <div className="flex items-center gap-1.5">
            <span>Dibuat dengan</span>
            <Heart size={14} className="text-[#EF4444] fill-[#EF4444]" />
            <span>untuk melindungi masyarakat Indonesia dari kejahatan siber.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] selection:bg-[#FED7AA]">
      <SiteHeader />
      <main className="flex-1 w-full">{children}</main>
      <SiteFooter />
    </div>
  );
}
