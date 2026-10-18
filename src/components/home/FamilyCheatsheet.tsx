'use client';

import { useState } from 'react';
import {
  BookOpen,
  Copy,
  Check,
  Share2,
  ShieldAlert,
  KeyRound,
  Clock,
  Sparkles,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { Mascot } from '../Mascot';
import { playClick, playEvidenceFound } from '../../utils/sound';

const GOLDEN_RULES = [
  {
    number: '01',
    pinColor: 'bg-[#EF4444]',
    tag: 'ATURAN EKSTENSI FILE',
    title: 'Ekstensi .APK di Chat = 100% JEBAKAN!',
    desc: 'Kurir paket, kepolisian, kantor pajak, dan bank resmi TIDAK PERNAH mengirim aplikasi lewat chat WhatsApp. Foto paket asli selalu .JPG/.PNG. Dokumen asli selalu .PDF murni.',
    highlight: '💡 Bila ada file berakhiran .apk di chat, JANGAN DIKLIK SAMA SEKALI!',
    icon: ShieldAlert,
  },
  {
    number: '02',
    pinColor: 'bg-[#FF7A00]',
    tag: 'ATURAN KODE RAHASIA',
    title: 'Kode OTP & PIN adalah Kunci Brankas Keramat',
    desc: 'Siapapun yang meminta kode angka yang dikirim lewat SMS ke HP-mu—meskipun mengaku polisi, staf bank, atau kasir minimarket—dia adalah PENIPU yang ingin kuras saldo rekeningmu.',
    highlight: '💡 Petugas bank asli BERSUMPAH tidak akan pernah meminta kode OTP nasabah.',
    icon: KeyRound,
  },
  {
    number: '03',
    pinColor: 'bg-[#0284C7]',
    tag: 'ATURAN PSIKOLOGIS',
    title: 'Terapkan Aturan 5 Menit Saat Panik',
    desc: 'Semua penipu sengaja menakut-nakuti atau mengiming-imingi hadiah besar agar kamu terburu-buru. Begitu merasa panik, tarik napas, minum air putih, dan hubungi keluarga terdekat.',
    highlight: '💡 Tunda 5 menit, telepon nomor resmi, tanyakan pendapat orang lain.',
    icon: Clock,
  },
];

export function FamilyCheatsheet() {
  const [copied, setCopied] = useState(false);

  const handleCopyWhatsApp = () => {
    const textToCopy = `🦉 *PENGINGAT RESMI KELUARGA: 3 ATURAN EMAS ANTI-KENA TIPU!* 🦉

Halo keluarga tercinta! Yuk luangkan 1 menit baca tips keselamatan digital ini biar kita sekeluarga aman dari penipuan online:

1️⃣ *Pantang Klik File .APK di WA*
Kurir paket, bank, dan polisi TIDAK PERNAH kirim aplikasi lewat chat. Foto paket itu .JPG/.PNG, BUKAN .APK!

2️⃣ *Kode OTP / SMS Rahasia Suci*
Jangan pernah berikan 6 angka kode SMS ke siapapun, meski penelepon mengaku pegawai bank atau aparat!

3️⃣ *Aturan 5 Menit Saat Panik*
Kalau ada yang menakut-nakuti atau menawarkan hadiah, jangan langsung respon. Tarik napas, telepon nomor keluarga yang tersimpan.

Belajar simulasi kasusnya secara gratis bersama Detektif Ciko di:
https://awas-scam.id

_Sayangi keluarga, bagikan pesan ini! ❤️_`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      playEvidenceFound();
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    });
  };

  return (
    <section id="kamus-saku" className="py-16 lg:py-24 bg-[#FFFDF9] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Mascot Pointing */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] text-xs sm:text-sm font-bold shadow-sm">
              <BookOpen size={16} />
              <span>KAMUS SAKU DETEKTIF KELUARGA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1D38]">
              3 Aturan Emas Anti-Kena Tipu
            </h2>
            <p className="text-sm sm:text-base text-[#475569] max-w-xl">
              Cukup ingat 3 aturan praktis ini dalam keseharian. Sangat mudah dipahami oleh ibu-ibu, bapak-bapak, nenek, kakek, maupun anak-anak!
            </p>
          </div>

          {/* Mascot Pointing to WhatsApp Share */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border-2 border-[#FFE8D6] shadow-sm shrink-0">
            <div className="w-14 h-14 shrink-0">
              <Mascot
                name="02_menunjuk_petunjuk"
                alt="Detektif Ciko menunjuk tips"
                width={56}
                height={56}
              />
            </div>
            <div>
              <p className="text-xs font-bold text-[#FF7A00]">Pesan dari Detektif Ciko:</p>
              <p className="text-xs text-[#334155] font-medium">
                &quot;Salin tips ini ke grup WA keluargamu ya!&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Detective Bulletin Board (Papan Pengingat Magnet Kulkas) */}
        <div className="bg-[#FAF6EE] rounded-[36px] p-6 sm:p-10 border-4 border-[#EEDCC8] shadow-[0_15px_45px_rgba(15,29,56,0.06)] relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOLDEN_RULES.map((rule) => {
              const Icon = rule.icon;
              return (
                <div
                  key={rule.number}
                  className="bg-white rounded-3xl p-6 border-2 border-[#EEDCC8] shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {/* Pushpin Badge */}
                  <div className="absolute -top-3 left-6 flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${rule.pinColor} border-2 border-white shadow`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                      {rule.tag}
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#CBD5E1] font-mono">
                        {rule.number}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#FFF7ED] text-[#FF7A00] flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="font-bold text-lg text-[#0F1D38] leading-snug">
                      {rule.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
                    <p className="text-xs font-bold text-[#B45309] bg-[#FEF3C7] p-2 rounded-xl">
                      {rule.highlight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Share to WhatsApp Action */}
          <div className="mt-8 pt-6 border-t-2 border-[#EEDCC8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0F1D38]">
              <MessageCircle size={18} className="text-[#22C55E]" />
              <span>Bagikan panduan ini ke WhatsApp orang tua dan keluarga tercinta</span>
            </div>

            <button
              onClick={handleCopyWhatsApp}
              className="btn-pill-orange text-sm font-bold py-2.5 px-6 inline-flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
            >
              {copied ? (
                <>
                  <Check size={18} className="text-white" />
                  <span>Teks Berhasil Disalin! ❤️</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Salin Ringkasan untuk Grup WA</span>
                </>
              )}
            </button>
          </div>

          {/* Animated Copy Success Notification Banner */}
          {copied && (
            <div className="mt-4 bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] p-3 rounded-2xl text-xs sm:text-sm text-center font-bold animate-pop-in">
              🎉 Teks berhasil disalin ke clipboard! Silakan buka aplikasi WhatsApp dan paste di grup keluarga.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FamilyCheatsheet;
