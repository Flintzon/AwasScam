'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronRight, Heart, ShieldCheck } from 'lucide-react';

export function SiteHeader() {
  const path = usePathname();
  const navLinkClass =
    'rounded-full px-1.5 py-2 transition-colors sm:px-4';

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6 w-full max-w-5xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md border-2 border-[#FFE8D6] rounded-full shadow-[0_8px_30px_rgba(255,122,0,0.12)] px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center shrink-0 group focus:outline-none">
          <div className="relative h-9 w-20 sm:h-10 sm:w-32 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Logo AWAS SCAM!"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav
          className="flex items-center gap-0.5 text-xs font-bold sm:gap-4 sm:text-sm"
          aria-label="Navigasi utama"
        >
          <Link
            href="/panduan"
            aria-current={path === '/panduan' ? 'page' : undefined}
            className={`${navLinkClass} ${
              path === '/panduan'
                ? 'bg-[#FFF1E6] text-[#B04A00]'
                : 'text-[#334155] hover:bg-[#FFF7ED] hover:text-[#FF6B00]'
            }`}
          >
            Panduan
          </Link>
          <Link
            href="/progres"
            aria-current={path === '/progres' ? 'page' : undefined}
            className={`${navLinkClass} ${
              path === '/progres'
                ? 'bg-[#FFF1E6] text-[#B04A00]'
                : 'text-[#334155] hover:bg-[#FFF7ED] hover:text-[#FF6B00]'
            }`}
          >
            Progres
          </Link>
          <Link
            href="/kasus"
            aria-current={path === '/kasus' ? 'page' : undefined}
            className="btn-pill-orange !px-2 !py-1 !text-xs sm:!px-5 sm:!py-2.5 sm:!text-sm inline-flex items-center gap-1 sm:gap-1.5 font-bold shadow-md whitespace-nowrap"
          >
            <span className="sm:hidden">Mulai</span>
            <span className="hidden sm:inline">Mulai Petualangan</span>
            <ChevronRight size={16} className="hidden sm:block" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-[#FDE68A]/60 bg-gradient-to-b from-[#FFFDF8] to-[#FEF7EC] pt-12 pb-10 px-4 sm:px-6 lg:px-8">
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
      <main className="flex-1 w-full">{children}</main>
      <SiteFooter />
    </div>
  );
}
