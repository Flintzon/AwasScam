'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Share2,
  Check,
  Volume2,
  VolumeX,
  Type,
  Calendar,
  Zap,
  Flame,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot, MascotExpression } from '../../components/Mascot';
import { getUserProfile, saveUserProfile, UserProfile } from '../../utils/userState';
import { playClick, playEvidenceFound, setSoundEnabled, getSoundEnabled } from '../../utils/sound';

const AVATAR_OPTIONS: { id: MascotExpression; label: string }[] = [
  { id: '01_normal', label: 'Netral & Waspada' },
  { id: '02_senang', label: 'Ceria & Bangga' },
  { id: '03_serius', label: 'Fokus & Siaga' },
  { id: '04_terkejut', label: 'Peka Jebakan' },
  { id: '05_curiga', label: 'Mata Elang' },
  { id: '06_sedih', label: 'Penuh Empati' },
];

const BADGES_CONFIG = [
  {
    id: 'mata-elang',
    title: 'Lencana Mata Elang 🦅',
    desc: 'Mampu menemukan 3 kejanggalan di pesan WhatsApp dalam sekali periksa.',
    unlocked: true,
  },
  {
    id: 'anti-apk-master',
    title: 'Anti-APK Master 📱',
    desc: 'Berhasil membatalkan pemasangan file berbahaya .pdf.apk.',
    unlocked: true,
  },
  {
    id: 'pelindung-keluarga',
    title: 'Pelindung Keluarga 🛡️',
    desc: 'Menyelamatkan rekening Ibu dari skenario penipuan telepon darurat.',
    unlocked: true,
  },
  {
    id: 'pelindung-dana-pensiun',
    title: 'Pelindung Dana Pensiun 🏦',
    desc: 'Berhasil membedah jebakan CS bank gadungan dan investasi bodong.',
    unlocked: false,
  },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [copied, setCopied] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    const p = getUserProfile();
    setProfile(p);
    setTextSize(p.textSize || 'normal');
    setSoundActive(getSoundEnabled());
  }, []);

  const handleSelectAvatar = (avatarId: MascotExpression) => {
    playClick();
    const updated = saveUserProfile({ avatar: avatarId });
    setProfile(updated);
  };

  const handleToggleSound = () => {
    const nextVal = !soundActive;
    setSoundActive(nextVal);
    setSoundEnabled(nextVal);
    saveUserProfile({ soundEnabled: nextVal });
    if (nextVal) playEvidenceFound();
  };

  const handleToggleTextSize = () => {
    playClick();
    const nextSize = textSize === 'normal' ? 'large' : 'normal';
    setTextSize(nextSize);
    saveUserProfile({ textSize: nextSize });
  };

  const handleShareCertificate = () => {
    const certText = `🎖️ *SERTIFIKAT DETEKTIF RESMI AWAS SCAM!* 🎖️

Nama: *${profile?.name || 'Detektif Keluarga'}*
Pangkat: *${profile?.rank || 'Inspektur Anti-Scam'}*
Peran: *${profile?.role || 'Penjaga Keluarga'}*
Skor Ketelitian: *${profile?.xp || 250} XP*

Saya telah terlatih mengenali modus penipuan online (file .APK palsu, link phishing, dan telepon darurat). Yuk uji ketelitianmu juga bersama Detektif Ciko di:
https://awas-scam.id

_Bersama lindungi keluarga dari kejahatan siber!_ 🦉❤️`;

    navigator.clipboard.writeText(certText).then(() => {
      playEvidenceFound();
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    });
  };

  return (
    <SiteFrame>
      <div className={`py-8 sm:py-12 bg-gradient-to-b from-[#FFFDF8] via-[#FEF7EC] to-[#FFFDF8] min-h-screen ${textSize === 'large' ? 'text-lg' : 'text-base'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="text-center sm:text-left space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-xs font-bold">
              <Award size={15} /> IDENTITAS &amp; PENGHARGAAN
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Profil Detektif Siber
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-medium">
              Kelola kartu tanda pengenalmu, pilih avatar maskot favorit, dan bagikan sertifikat keberhasilanmu ke keluarga!
            </p>
          </div>

          {/* =========================================================================
              KARTU TANDA PENGENAL DETEKTIF (INTERACTIVE DETECTIVE ID CARD)
             ========================================================================= */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[36px] p-6 sm:p-10 text-white shadow-2xl border-4 border-[#334155] relative overflow-hidden space-y-6">
            {/* Background Seal Watermark */}
            <div
              aria-hidden="true"
              className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/5 rounded-full pointer-events-none border-8 border-white/5"
            />

            {/* Top Bar of ID Card */}
            <div className="flex items-center justify-between pb-4 border-b border-[#334155]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#FF6B00]" />
                <span className="text-xs font-black uppercase tracking-widest text-[#E2E8F0]">
                  KARTU IDENTITAS RESMI DETEKTIF SIBER
                </span>
              </div>
              <span className="text-xs font-mono font-bold bg-[#FF6B00] text-white px-3 py-1 rounded-full shadow">
                KREDENSIAL AKTIF
              </span>
            </div>

            {/* Middle Section: Avatar & Detective Bio */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Avatar Box with Gold Frame */}
              <div className="sm:col-span-4 flex flex-col items-center text-center space-y-2">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-2 border-4 border-[#FDE68A] shadow-lg overflow-hidden flex items-center justify-center">
                  <Mascot
                    name={profile?.avatar ? (profile.avatar as any) : '01_normal'}
                    alt="Avatar Pengguna"
                    width={128}
                    height={128}
                  />
                </div>
                <span className="text-[11px] font-bold text-[#FDE68A] uppercase tracking-wider">
                  Detektif Ciko Companion
                </span>
              </div>

              {/* Bio Details */}
              <div className="sm:col-span-8 space-y-3">
                <div>
                  <span className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider">
                    Nama Agen Detektif
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                    {profile?.name || 'Detektif Tamu'}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block">Pangkat Kehormatan:</span>
                    <strong className="text-[#FACC15] text-sm">{profile?.rank || 'Inspektur Anti-Scam'}</strong>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block">Peran di Keluarga:</span>
                    <strong className="text-white text-sm">{profile?.role || 'Penjaga Keluarga'}</strong>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block">Poin Ketelitian:</span>
                    <strong className="text-[#FF7A00] text-sm font-mono">{profile?.xp || 250} XP</strong>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block">Misi Terbongkar:</span>
                    <strong className="text-[#10B981] text-sm font-mono">
                      {profile?.completedCases.length || 1} Kasus
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Action to Share Certificate */}
            <div className="pt-4 border-t border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#94A3B8]">
                ID: ASCAM-ID-{new Date().getFullYear()}-009182
              </p>

              <button
                onClick={handleShareCertificate}
                className="btn-pill-orange text-xs sm:text-sm py-2.5 px-6 font-bold inline-flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Sertifikat Disalin! ❤️</span>
                  </>
                ) : (
                  <>
                    <Share2 size={16} />
                    <span>Bagikan Sertifikat ke Grup WA</span>
                  </>
                )}
              </button>
            </div>

            {/* Toast notification */}
            {copied && (
              <div className="bg-[#10B981] text-white p-3 rounded-2xl text-xs text-center font-bold animate-pop-in">
                🎉 Teks Sertifikat Detektif berhasil disalin! Silakan paste di WhatsApp keluarga.
              </div>
            )}
          </div>

          {/* =========================================================================
              GANTI AVATAR MASKOT DARI FOLDER ekspresi_wajah/
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                Personalisasi Detektif
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">
                Pilih Ekspresi Maskot Pendampingmu
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Ekspresi ini akan tampil di kartu identitas dan bar status atas aplikasi.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
              {AVATAR_OPTIONS.map((opt) => {
                const isSelected = profile?.avatar === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectAvatar(opt.id)}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'border-[#FF6B00] bg-[#FFF7ED] ring-2 ring-[#FF6B00]/40 scale-105 shadow-sm'
                        : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                    }`}
                  >
                    <div className="w-14 h-14 relative">
                      <Mascot name={opt.id} alt={opt.label} width={56} height={56} />
                    </div>
                    <span className="text-[11px] font-bold text-[#0F172A] text-center leading-tight">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] bg-[#FF6B00] text-white px-2 py-0.5 rounded-full font-bold">
                        Aktif
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              LEMARI KOLEKSI LENCANA (BADGE SHOWCASE)
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                Koleksi Prestasi
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">
                Lemari Lencana Kehormatan
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BADGES_CONFIG.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all ${
                    badge.unlocked
                      ? 'bg-[#F0FDF4] border-[#86EFAC]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-60'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                      badge.unlocked ? 'bg-[#DCFCE7]' : 'bg-[#E2E8F0]'
                    }`}
                  >
                    {badge.unlocked ? '🏅' : '🔒'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A]">{badge.title}</h4>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{badge.desc}</p>
                    <span
                      className={`text-[10px] font-bold mt-2 inline-block px-2 py-0.5 rounded-full ${
                        badge.unlocked
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#E2E8F0] text-[#64748B]'
                      }`}
                    >
                      {badge.unlocked ? 'TERBUKA' : 'KASUS BELUM SELESAI'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              PENGATURAN KENYAMANAN MATA (ACCESSIBILITY CONTROLS)
             ========================================================================= */}
          <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 border-2 border-[#EEDCC8] space-y-5">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <Sparkles size={18} className="text-[#FF6B00]" />
              <span>Pengaturan Kenyamanan Belajar &amp; Aksesibilitas</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Text Size Toggle */}
              <div className="bg-white p-4 rounded-2xl border border-[#EEDCC8] flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-[#0F172A] flex items-center gap-1.5">
                    <Type size={16} /> Ukuran Teks Baca
                  </p>
                  <p className="text-xs text-[#64748B]">Ramah mata untuk orang tua / lansia</p>
                </div>
                <button
                  onClick={handleToggleTextSize}
                  className="btn-pill-orange text-xs py-2 px-4 font-bold"
                >
                  {textSize === 'normal' ? 'Normal' : 'Besar (Lansia)'}
                </button>
              </div>

              {/* Sound Effects Toggle */}
              <div className="bg-white p-4 rounded-2xl border border-[#EEDCC8] flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-[#0F172A] flex items-center gap-1.5">
                    {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />} Efek Suara (Audio)
                  </p>
                  <p className="text-xs text-[#64748B]">Suara bel bukti &amp; efek perayaan</p>
                </div>
                <button
                  onClick={handleToggleSound}
                  className={`text-xs py-2 px-4 rounded-full font-bold transition-all ${
                    soundActive
                      ? 'btn-pill-orange'
                      : 'bg-[#E2E8F0] text-[#64748B] hover:bg-[#CBD5E1]'
                  }`}
                >
                  {soundActive ? 'Aktif 🔊' : 'Mati 🔇'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
