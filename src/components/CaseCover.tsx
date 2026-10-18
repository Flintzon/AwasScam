import type { ComponentType } from 'react';
import { GameChapter } from '../types/game';
import { FileText, Package, PhoneCall, Lock, TrendingUp, ShieldAlert, HeartHandshake } from 'lucide-react';

/* Sampul kasus = potongan bukti digital yang otentik, digambar dengan HTML/CSS.
   Bukan ilustrasi dekoratif: ini adalah bahan yang akan diperiksa pemain. */

const WA = { bg: '#101c33', bar: '#172640', bubble: '#172640', border: '#2c3d5c', text: '#f3f6fa', sub: '#9aa6bd' };

function ChatScene() {
  return (
    <div className="absolute inset-0 flex flex-col text-left" style={{ background: WA.bg }}>
      <div className="flex items-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5" style={{ background: WA.bar }}>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2c3d5c] sm:h-8 sm:w-8">
          <Package size={14} className="text-[#c5cddc]" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.68rem] font-semibold sm:text-[0.8rem]" style={{ color: WA.text }}>
            Kurir J&amp;T Express (Gudang)
          </p>
          <p className="font-mono text-[0.58rem] sm:text-[0.68rem]" style={{ color: WA.sub }}>
            +62 895-3342-9912
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 p-2.5 sm:p-3.5">
        <div className="max-w-[86%] rounded-lg rounded-tl-none px-2.5 py-2" style={{ background: WA.bubble, border: `1px solid ${WA.border}` }}>
          <p className="text-[0.6rem] leading-relaxed sm:text-[0.74rem]" style={{ color: WA.text }}>
            Selamat malam Ibu. Paket atas nama Ibu tertahan di gudang. <span className="font-bold">MOHON SEGERA DIBUKA DALAM 10 MENIT</span> atau paket dikembalikan ke penjual.
          </p>
          <div className="mt-1.5 flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: '#0d1730', border: `1px solid ${WA.border}` }}>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded bg-[#2c3d5c] sm:h-8 sm:w-8">
              <FileText size={14} className="text-[#ff751f]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[0.56rem] font-semibold sm:text-[0.68rem]" style={{ color: WA.text }}>
                Lihat_Foto_Paket.pdf.apk
              </p>
              <p className="text-[0.5rem] sm:text-[0.6rem]" style={{ color: WA.sub }}>
                8,4 MB · File instalasi
              </p>
            </div>
          </div>
          <p className="mt-1 text-right font-mono text-[0.5rem] sm:text-[0.58rem]" style={{ color: WA.sub }}>20:14</p>
        </div>
      </div>
    </div>
  );
}

function CallScene() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center" style={{ background: 'linear-gradient(180deg, #14233f 0%, #101c33 100%)' }}>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#2c3d5c] sm:h-16 sm:w-16">
        <PhoneCall size={22} className="text-[#9aa6bd] sm:size-7" />
      </span>
      <div>
        <p className="text-[0.85rem] font-bold sm:text-xl" style={{ color: WA.text }}>&ldquo;HaloBCA&rdquo;</p>
        <p className="text-[0.6rem] sm:text-[0.75rem]" style={{ color: WA.sub }}>Customer Service</p>
      </div>
      <p className="font-mono text-[0.62rem] font-semibold tracking-wide sm:text-sm" style={{ color: '#ff751f' }}>+62 821-9988-7711</p>
      <div className="mt-1 flex h-6 items-end gap-[2px] sm:h-8" aria-hidden>
        {[9, 16, 11, 20, 14, 22, 10, 17, 12, 19, 8, 15].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-[#2c3d5c] sm:w-1" style={{ height: `${h * 0.9}px` }} />
        ))}
      </div>
      <p className="font-mono text-[0.6rem] sm:text-[0.72rem]" style={{ color: WA.sub }}>00:42</p>
    </div>
  );
}

function BrowserScene() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#f3f6fa] text-left">
      <div className="flex items-center gap-2 border-b border-[#d8dde8] bg-white px-2.5 py-1.5 sm:px-3.5">
        <span className="flex shrink-0 gap-1" aria-hidden>
          <i className="block h-2 w-2 rounded-full bg-[#ff751f]" />
          <i className="block h-2 w-2 rounded-full bg-[#febc2e]" />
          <i className="block h-2 w-2 rounded-full bg-[#b6bfd2]" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded border border-[#d8dde8] bg-[#f3f6fa] px-2 py-0.5">
          <Lock size={9} className="shrink-0 text-[#ff751f]" />
          <span className="truncate font-mono text-[0.5rem] sm:text-[0.62rem]" style={{ color: '#b04a00' }}>
            https://bursakripto-vip.xyz/task-vip
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-1 rounded bg-[#ffe8db] px-1.5 py-0.5 text-[0.5rem] font-bold text-[#b04a00] sm:flex">
          <ShieldAlert size={9} /> TIDAK AMAN
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-4 py-3" style={{ background: '#172640' }}>
        <p className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#ff751f] sm:text-[0.68rem]">Platform #1 Indonesia</p>
        <p className="text-[0.9rem] font-extrabold tracking-tight text-[#ffb794] sm:text-xl" style={{ fontFamily: "'Public Sans', sans-serif" }}>
          BursaKriptoNusantara
        </p>
        <p className="rounded bg-[#ff751f] px-1.5 py-0.5 text-[0.5rem] font-bold text-[#172640] sm:text-[0.6rem]">VIP MEMBER AREA · Profit 300%</p>
        <div className="mt-1 flex h-8 items-end gap-[3px] sm:h-10" aria-hidden>
          {[30, 42, 35, 55, 48, 66, 72, 64, 80, 88, 95].map((h, i) => (
            <span key={i} className="w-[5px] rounded-t-sm bg-[#f7cbae] sm:w-2" style={{ height: `${h}%` }} />
          ))}
        </div>
        <p className="flex items-center gap-1 text-[0.5rem] text-[#9aa6bd] sm:text-[0.6rem]">
          <TrendingUp size={9} /> profit member live
        </p>
      </div>
    </div>
  );
}

function DonationScene() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white text-left">
      <div className="border-b border-[#d8dde8] bg-[#f3f6fa] px-3 py-2">
        <p className="text-[0.58rem] font-bold text-[#172640] sm:text-[0.7rem]">Linimasa Komunitas</p>
        <p className="font-mono text-[0.5rem] text-[#5d6982] sm:text-[0.6rem]">unggahan bantuan · baru saja</p>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5 bg-[#f3f6fa] p-3 sm:p-5">
        <div className="rounded-md border border-[#d8dde8] bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ffe8db] text-[#b04a00]"><HeartHandshake size={14} /></span>
            <div>
              <p className="text-[0.62rem] font-bold text-[#172640] sm:text-[0.75rem]">Bantu Korban Banjir Sekarang</p>
              <p className="text-[0.5rem] text-[#5d6982] sm:text-[0.58rem]">Akun bantuan komunitas</p>
            </div>
          </div>
          <p className="mt-2 text-[0.58rem] leading-relaxed text-[#3f4d6b] sm:text-[0.7rem]">Donasi ditutup malam ini. Transfer ke rekening pribadi dan bantu sebarkan.</p>
          <div className="mt-2 flex items-center justify-between rounded-sm bg-[#ffe8db] px-2 py-1.5">
            <span className="font-mono text-[0.5rem] text-[#b04a00] sm:text-[0.6rem]">a.n. R*** S***</span>
            <ShieldAlert size={12} className="text-[#b04a00]" />
          </div>
        </div>
        <p className="text-center font-mono text-[0.5rem] text-[#5d6982] sm:text-[0.6rem]">Periksa sebelum membagikan.</p>
      </div>
    </div>
  );
}

const SCENES: Record<GameChapter, ComponentType> = {
  1: ChatScene,
  2: CallScene,
  3: BrowserScene,
  4: DonationScene,
};

export function CaseCover({ id, className = '' }: { id: GameChapter; className?: string }) {
  const Scene = SCENES[id];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <Scene />
    </div>
  );
}
