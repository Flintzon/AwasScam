'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, ArrowLeft, HelpCircle, FileCode, Package, Search, X } from 'lucide-react';
import { RedFlag } from '../types/game';
import { Mascot } from './Mascot';
import { playBuzz, playClick, playEvidenceFound } from '../utils/sound';

interface InspectModalProps {
  redFlags: RedFlag[];
  onFoundRedFlag: (flagId: string) => void;
  onFinishInspection: () => void;
}

export const InspectModal: React.FC<InspectModalProps> = ({
  redFlags,
  onFoundRedFlag,
  onFinishInspection,
}) => {
  const [activeExplanation, setActiveExplanation] = useState<RedFlag | null>(null);
  const [missMessage, setMissMessage] = useState<string | null>(null);

  const foundCount = redFlags.filter((f) => f.isFound).length;
  const isKeyFound = redFlags.find((f) => f.id === 'flag-ext')?.isFound;

  const handleInspectTarget = (flagId: string) => {
    const flag = redFlags.find((f) => f.id === flagId);
    if (!flag) return;

    if (!flag.isFound) {
      playEvidenceFound();
      onFoundRedFlag(flagId);
    } else {
      playClick();
    }
    setActiveExplanation(flag);
    setMissMessage(null);
  };

  const handleMisclick = (msg: string) => {
    playBuzz();
    setMissMessage(msg);
    setTimeout(() => {
      setMissMessage(null);
    }, 2500);
  };

  const targetState = (flagId: string, base: string) => {
    const found = redFlags.find((f) => f.id === flagId)?.isFound;
    return found
      ? `${base} border border-[#f3f6fa] bg-[#f3f6fa]/15`
      : `${base} border border-dashed border-[#ff751f] hover:bg-[#ff751f]/10 cursor-pointer`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(14,22,38,0.6)] p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[14px] border border-[var(--line-strong)] bg-[var(--white)] shadow-[0_24px_70px_rgba(14,22,38,0.35)]">

        {/* Header inspeksi */}
        <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-3.5 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="icon-tile !bg-[var(--red-tint)] !text-[var(--red-deep)] shrink-0">
              <ShieldAlert size={20} />
            </span>
            <div className="min-w-0">
              <h2 className="text-[1.1rem] font-bold leading-tight md:text-[1.25rem]">Periksa layar chat Ibu</h2>
              <p className="truncate text-[0.8rem] text-[var(--ink-muted)]">
                Klik bagian pesan yang mencurigakan untuk mengumpulkan bukti.
              </p>
            </div>
          </div>
          <span className={`chip shrink-0 ${foundCount === redFlags.length ? 'chip-teal' : 'chip-yellow'}`}>
            Bukti {foundCount}/{redFlags.length}
          </span>
        </div>

        {/* Split view: layar chat (gelap, otentik) + panel analisis (terang) */}
        <div className="grid flex-1 grid-cols-1 gap-5 overflow-y-auto bg-[var(--mist)] p-4 md:p-6 lg:grid-cols-12">

          {/* SISI KIRI: simulasi layar WhatsApp */}
          <div className="lg:col-span-7">
            <div className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-[14px] border border-[#2c3d5c] shadow-[0_14px_40px_rgba(14,22,38,0.3)]">

              {/* WhatsApp app bar */}
              <div
                onClick={() => handleInspectTarget('flag-sender')}
                className={`flex items-center justify-between gap-3 bg-[#172640] px-4 py-3 transition-colors ${targetState('flag-sender', '')}`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2c3d5c]">
                    <Package size={18} className="text-[#c5cddc]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#f3f6fa]">
                      <span className="truncate">Kurir J&amp;T Express (Gudang)</span>
                      <span className="shrink-0 rounded border border-[#9aa6bd]/50 px-1 text-[9px] font-normal text-[#9aa6bd]">
                        Bukan Akun Resmi
                      </span>
                    </div>
                    <div className="font-mono text-xs text-[#9aa6bd]">+62 895-3342-9912</div>
                  </div>
                </div>

                {redFlags.find((f) => f.id === 'flag-sender')?.isFound && (
                  <CheckCircle2 size={19} className="shrink-0 text-[#f3f6fa]" />
                )}
              </div>

              {/* Canvas bubble chat */}
              <div
                onClick={() => handleMisclick('Area itu tidak mengandung bukti — periksa bagian lain dari pesan.')}
                className="flex min-h-[340px] flex-col justify-end space-y-4 bg-[#101c33] p-4 text-sm"
              >

                <div className="max-w-[92%] space-y-2.5 rounded-lg rounded-tl-none border border-[#2c3d5c] bg-[#172640] p-3.5 text-[#f3f6fa]">
                  <p>
                    Selamat malam Ibu. Kami dari pihak ekspedisi menginfokan bahwa paket atas nama Ibu
                    tertahan di gudang karena alamat kurang lengkap.
                  </p>

                  {/* Target: urgensi panik */}
                  <div
                    onClick={(e) => { e.stopPropagation(); handleInspectTarget('flag-urgency'); }}
                    className={targetState('flag-urgency', 'rounded-lg p-2')}
                  >
                    <p className="flex items-start gap-1.5 font-bold">
                      <span className="mt-0.5 shrink-0 text-[#ff751f]">&#9888;</span>
                      &ldquo;MOHON SEGERA DIBUKA DALAM 10 MENIT ATAU PAKET AKAN DIKEMBALIKAN KE PENJUAL!&rdquo;
                    </p>
                    <div className="mt-1 text-[10px] text-[#9aa6bd]">
                      {redFlags.find((f) => f.id === 'flag-urgency')?.isFound
                        ? 'Ditemukan: manipulasi tekanan waktu'
                        : 'Klik untuk memeriksa kalimat ini'}
                    </div>
                  </div>

                  <p className="text-xs text-[#c5cddc]">
                    Silakan unduh dan instal bukti foto resi paket di bawah ini:
                  </p>

                  {/* Target: file APK */}
                  <div
                    onClick={(e) => { e.stopPropagation(); handleInspectTarget('flag-ext'); }}
                    className={`rounded-lg p-3 transition-colors ${
                      redFlags.find((f) => f.id === 'flag-ext')?.isFound
                        ? 'border border-[#f3f6fa] bg-[#f3f6fa]/15'
                        : 'cursor-pointer border border-dashed border-[#ff751f] bg-[#0d1730] hover:bg-[#1b2b4a]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center rounded bg-[#2c3d5c] px-2 py-1.5 text-[10px] font-bold text-[#ff751f]">
                        <FileCode size={17} />
                        <span>APK</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-mono text-xs font-semibold text-[#f3f6fa]">
                          Lihat_Foto_Paket.pdf.apk
                        </div>
                        <div className="text-[11px] text-[#9aa6bd]">Ukuran: 8,4 MB • File Instalasi Android</div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded bg-[#0d1730] px-2 py-1.5 text-[11px] font-semibold">
                      {redFlags.find((f) => f.id === 'flag-ext')?.isFound ? (
                        <>
                          <CheckCircle2 size={13} className="text-[#f3f6fa]" />
                          <span className="text-[#f3f6fa]">Terverifikasi: ini file instalasi, bukan foto</span>
                        </>
                      ) : (
                        <>
                          <Search size={13} className="text-[#ff751f]" />
                          <span className="text-[#9aa6bd]">Klik file ini untuk memeriksa formatnya</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right font-mono text-[10px] text-[#9aa6bd]">20:14 WIB</div>
                </div>

                {/* Feedback saat salah klik area lain */}
                {missMessage && (
                  <div className="animate-shake flex items-center justify-center gap-2 rounded-lg border border-[#ff751f] bg-[#1b2b4a] px-3 py-2 text-center text-xs font-semibold text-[#ffb794]">
                    <X size={14} className="shrink-0" />
                    {missMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SISI KANAN: panel analisis */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-5">

            {/* Penjelasan bukti aktif */}
            <div className="card flex-1 p-5">
              <h3 className="mb-3 flex items-center gap-2 text-[0.95rem] font-bold text-[var(--ink)]">
                Catatan analisis bukti
              </h3>

              {activeExplanation ? (
                <div className="fade-slide-up space-y-3">
                  <div className="panel-tint p-3.5">
                    <span className="text-[0.75rem] font-bold text-[#b04a00]">{activeExplanation.name}</span>
                    <p className="mt-1 text-sm font-bold text-[var(--ink)]">{activeExplanation.description}</p>
                  </div>

                  <div className="rounded-[8px] border border-[var(--line)] bg-[var(--mist)] p-3.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                    <span className="mb-1 block font-bold text-[var(--ink)]">Kenapa ini bahaya?</span>
                    {activeExplanation.explanation}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--teal-deep)]">
                    <Mascot name="success" alt="" className="h-7 w-7" /> +{activeExplanation.points} poin edukasi
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center rounded-[8px] border border-dashed border-[var(--line-strong)] p-6 text-center">
                  <HelpCircle size={30} className="mb-2 text-[var(--ink-muted)]" />
                  <p className="text-sm font-medium text-[var(--ink-muted)]">
                    Klik item di layar chat (file, kalimat, atau profil kontak) untuk mengungkap
                    kejanggalan.
                  </p>
                </div>
              )}
            </div>

            {/* Checklist bukti */}
            <div className="card p-4">
              <div className="mb-2 text-[0.75rem] font-bold text-[var(--ink-soft)]">Daftar cek keamanan</div>
              <div className="space-y-2">
                {redFlags.map((flag) => (
                  <div
                    key={flag.id}
                    onClick={() => handleInspectTarget(flag.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-[8px] border px-2.5 py-2 text-xs transition-colors ${
                      flag.isFound
                        ? 'border-[#b6bfd2] bg-[var(--teal-tint)] text-[var(--teal-deep)]'
                        : 'border-[var(--line)] bg-[var(--white)] text-[var(--ink-muted)] hover:border-[var(--line-strong)]'
                    }`}
                  >
                    <span className="font-semibold">{flag.name}</span>
                    {flag.isFound ? (
                      <span className="rounded bg-[var(--teal-deep)] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        DITEMUKAN
                      </span>
                    ) : (
                      <span className="text-[10px]">Belum dicek</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol aksi */}
            <div>
              <button
                onClick={() => {
                  playClick();
                  onFinishInspection();
                }}
                disabled={!isKeyFound}
                className="btn btn-primary btn-block justify-center"
              >
                <ArrowLeft size={16} />
                {isKeyFound ? 'Konfirmasi bukti & edukasi Ibu' : 'Temukan file APK terlebih dahulu'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
