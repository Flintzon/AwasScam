'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { Mascot } from '../../components/Mascot';
import { saveUserProfile, getUserProfile } from '../../utils/userState';
import { playClick, playEvidenceFound } from '../../utils/sound';

const ROLES: { id: 'Detektif Muda' | 'Orang Tua Siaga' | 'Penjaga Keluarga'; label: string; desc: string; icon: string }[] = [
  {
    id: 'Penjaga Keluarga',
    label: 'Penjaga Keluarga 🛡️',
    desc: 'Ingin melindungi orang tua, anak, dan kerabat dari kejahatan siber.',
    icon: '🛡️',
  },
  {
    id: 'Orang Tua Siaga',
    label: 'Orang Tua Siaga 👨‍👩‍👧',
    desc: 'Belajar mengenali modus kurir, perbankan, dan chat kenalan palsu.',
    icon: '👨‍👩‍👧',
  },
  {
    id: 'Detektif Muda',
    label: 'Detektif Muda ⚡',
    desc: 'Generasi muda melek teknologi yang ingin mengasah naluri kritis.',
    icon: '⚡',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const currentProfile = getUserProfile();

  const [activeTab, setActiveTab] = useState<'cepat' | 'masuk'>('cepat');
  const [nickname, setNickname] = useState(
    currentProfile.name !== 'Detektif Tamu' ? currentProfile.name : ''
  );
  const [selectedRole, setSelectedRole] = useState<'Detektif Muda' | 'Orang Tua Siaga' | 'Penjaga Keluarga'>(
    currentProfile.role || 'Penjaga Keluarga'
  );

  const isTyping = nickname.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playEvidenceFound();

    const finalName = nickname.trim() || 'Detektif Tamu';
    saveUserProfile({
      name: finalName,
      role: selectedRole,
    });

    router.push('/kasus');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDF8] via-[#FEF7EC] to-[#E0F2FE]/40 flex flex-col justify-between p-4 sm:p-6 lg:p-10">
      {/* Top Header */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#FF6B00] transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="relative h-9 w-28 sm:h-10 sm:w-32">
          <Image
            src="/logo.png"
            alt="Logo AWAS SCAM!"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Main Split-Screen Card */}
      <div className="max-w-4xl w-full mx-auto bg-white rounded-[36px] border-2 border-[#FFE8D6] shadow-[0_20px_60px_rgba(255,107,0,0.1)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left: Mascot Welcome Stage */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#FFF7ED] to-[#FEF3C7]/60 p-8 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r-2 border-[#FFE8D6] space-y-4">
            <div className="w-40 h-40 sm:w-48 sm:h-48 relative transition-all duration-300">
              <Mascot
                name={isTyping ? '02_senang' : '01_menyapa'}
                alt="Detektif Ciko"
                width={192}
                height={192}
                animate="bounce"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-[#FF6B00] border border-[#FFE8D6] shadow-sm inline-block">
                {isTyping ? 'Wah, Detektif Hebat!' : 'Sapaan Detektif Ciko 🦉'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                {isTyping ? `Halo, Kak ${nickname}!` : 'Selamat Datang, Calon Detektif!'}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] max-w-xs leading-relaxed font-medium">
                {isTyping
                  ? 'Nama yang keren! Pilih peran detektifmu dan mari kita mulai membongkar kasus!'
                  : 'Siapa nama panggilanmu? Cukup isi nama dan langsung mulai tanpa password rumit!'}
              </p>
            </div>
          </div>

          {/* Right: Friendly Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
            {/* Tab Switcher */}
            <div className="flex bg-[#F1F5F9] p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('cepat');
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'cepat'
                    ? 'bg-white text-[#FF6B00] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Mulai Cepat (Tanpa Ribet) ✨
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('masuk');
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'masuk'
                    ? 'bg-white text-[#FF6B00] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Masuk Akun Tersimpan 👤
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nickname Input */}
              <div className="space-y-1.5">
                <label htmlFor="nickname" className="block text-sm font-bold text-[#0F172A]">
                  Nama Panggilan Detektif:
                </label>
                <input
                  id="nickname"
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Misal: Budi, Ibu Sari, atau Kak Dinda"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#E2E8F0] focus:border-[#FF6B00] focus:ring-4 focus:ring-[#FFE8D6] text-base text-[#0F172A] font-semibold transition-all outline-none"
                  autoFocus
                />
                <p className="text-xs text-[#64748B]">
                  Nama ini akan dicetak di Kartu ID Detektif &amp; Sertifikatmu!
                </p>
              </div>

              {/* Role Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0F172A]">
                  Pilih Peran Detektifmu di Keluarga:
                </label>
                <div className="space-y-2">
                  {ROLES.map((role) => {
                    const isSelected = selectedRole === role.id;
                    return (
                      <div
                        key={role.id}
                        onClick={() => {
                          playClick();
                          setSelectedRole(role.id);
                        }}
                        className={`p-3 sm:p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-[#FF6B00] bg-[#FFF7ED] shadow-sm'
                            : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{role.icon}</span>
                          <div>
                            <p className="text-sm font-bold text-[#0F172A]">{role.label}</p>
                            <p className="text-xs text-[#64748B]">{role.desc}</p>
                          </div>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${
                            isSelected ? 'border-[#FF6B00] bg-[#FF6B00]' : 'border-[#CBD5E1]'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-pill-orange w-full py-4 text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <span>Masuk &amp; Mulai Investigasi</span>
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-[#64748B] font-medium pt-6">
        🔒 100% Berjalan Lokal di Perangkatmu · Tanpa Pengumpulan Password atau Data Pribadi
      </div>
    </div>
  );
}
