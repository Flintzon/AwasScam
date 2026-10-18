'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Plane,
  PhoneCall,
  Trash2,
  Lock,
  FileCode2,
  Fish,
  Eye,
  KeyRound,
  Info,
} from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot } from '../../components/Mascot';
import { playClick, playEvidenceFound, playDramaticHit } from '../../utils/sound';

interface CalloutPin {
  id: number;
  label: string;
  detail: string;
}

export default function GuidePage() {
  // Feature 1: Asli vs Palsu comparison state
  const [compareTab, setCompareTab] = useState<'asli' | 'palsu'>('palsu');
  const [activePin, setActivePin] = useState<CalloutPin | null>(null);

  // Feature 2: Cyber dictionary accordion state
  const [openDictKey, setOpenDictKey] = useState<string | null>('phishing');

  // Feature 3: Emergency toggle state
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const PINS_PALSU: CalloutPin[] = [
    {
      id: 1,
      label: 'Nomor Pengirim Tidak Dikenal (+62 8xx)',
      detail: 'Penipu menggunakan kartu seluler prabayar biasa tanpa identitas centang hijau resmi.',
    },
    {
      id: 2,
      label: 'Ancaman Waktu Singkat & Panik',
      detail: 'Mengancam memblokir rekening atau menghanguskan paket jika tidak diklik dalam hitungan menit.',
    },
    {
      id: 3,
      label: 'Tautan Asing Berakhiran .xyz / Ekstensi .apk',
      detail: 'Bukan domain resmi .co.id atau format foto asli .jpg. Ini umpan pencuri data sensitif!',
    },
  ];

  const PINS_ASLI: CalloutPin[] = [
    {
      id: 1,
      label: 'Pengirim Terverifikasi (Sender ID Resmi)',
      detail: 'SMS resmi bank menampilkan nama instansi (misal: "BANK BCA"), bukan nomor HP biasa.',
    },
    {
      id: 2,
      label: 'Bahasa Sopan & Informatif Tanpa Ancaman',
      detail: 'Pemberitahuan resmi bersifat informasi berkala, tidak pernah memaksa transfer terburu-buru.',
    },
    {
      id: 3,
      label: 'Tidak Pernah Meminta Password atau OTP',
      detail: 'Bank resmi bersumpah tidak akan meminta nomor PIN, kode OTP, atau sandi nasabah.',
    },
  ];

  const DICT_ITEMS = [
    {
      key: 'phishing',
      term: 'Phishing',
      awamTitle: 'Umpan Pancingan Pencuri Data 🎣',
      icon: Fish,
      summary:
        'Situs web atau pesan tiruan yang menyamar sebagai instansi resmi untuk memancingmu mengetikkan nomor kartu, PIN, atau kata sandi.',
      example: 'Contoh: Website mirip bank dengan alamat "klik-bca-resmi.xyz" padahal aslinya "bca.co.id".',
    },
    {
      key: 'apk',
      term: 'File .APK',
      awamTitle: 'Aplikasi Penyusup Penguras Saldo 📱',
      icon: FileCode2,
      summary:
        'Format berkas aplikasi sistem Android. Jika dipasang dari chat, malware ini bisa membaca semua SMS masuk dan meneruskan kode OTP bank ke penipu.',
      example: 'Contoh: File bernama "Foto_Paket.pdf.apk" atau "Undangan_Nikah.apk" di WhatsApp.',
    },
    {
      key: 'otp',
      term: 'Kode OTP (One-Time Password)',
      awamTitle: 'Kunci Rahasia Brankas Keramat 🔑',
      icon: KeyRound,
      summary:
        'Kode 6 angka yang dikirim lewat SMS sebagai persetujuan transaksi uang. Siapapun yang memintanya, dia adalah pencuri saldo!',
      example: 'Contoh: Penelepon mengaku CS bank meminta membacakan 6 digit SMS pembatalan transaksi.',
    },
  ];

  const handlePinClick = (pin: CalloutPin) => {
    playClick();
    setActivePin(pin);
  };

  return (
    <SiteFrame>
      <div className="py-8 sm:py-12 bg-gradient-to-b from-[#FFFDF8] via-[#FEF7EC] to-[#FFFDF8] min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header with Mascot Pointing */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-[0_10px_35px_rgba(255,107,0,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-xs font-bold">
                <BookOpen size={15} /> BUKU SAKU DETEKTIF KELUARGA
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                Cara Cepat Mengenali Ciri Penipu!
              </h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-xl font-medium">
                Kuasai cara membedakan pesan resmi vs pesan palsu dalam 3 detik, pahami istilah siber tanpa pusing, dan ketahui langkah darurat saat terlanjur klik.
              </p>
            </div>

            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative">
              <Mascot
                name="02_menunjuk_petunjuk"
                alt="Detektif Ciko menunjuk buku saku"
                width={112}
                height={112}
                animate="bounce"
              />
            </div>
          </div>

          {/* =========================================================================
              FITUR 1: INTERACTIVE "ASLI VS PALSU" TOGGLE COMPARISON WITH CALLOUT PINS
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-[#FFE8D6] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#F1F5F9]">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                  Alat Banding Interaktif
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  Bandingkan: Pesan Penipu vs Pesan Resmi
                </h2>
              </div>

              {/* Toggle Switch */}
              <div className="flex bg-[#F1F5F9] p-1 rounded-2xl shrink-0">
                <button
                  onClick={() => {
                    playClick();
                    setCompareTab('palsu');
                    setActivePin(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    compareTab === 'palsu'
                      ? 'bg-[#EF4444] text-white shadow-md'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Contoh Penipu (Bahaya) ⚠️
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setCompareTab('asli');
                    setActivePin(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    compareTab === 'asli'
                      ? 'bg-[#10B981] text-white shadow-md'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Contoh Resmi (Aman) ✅
                </button>
              </div>
            </div>

            {/* Comparison Showcase Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Visual Simulated Bubble */}
              <div
                className={`lg:col-span-7 rounded-3xl p-6 border-2 transition-all space-y-4 ${
                  compareTab === 'palsu'
                    ? 'bg-[#FEF2F2] border-[#FCA5A5]'
                    : 'bg-[#F0FDF4] border-[#86EFAC]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span
                    className={compareTab === 'palsu' ? 'text-[#DC2626]' : 'text-[#15803D]'}
                  >
                    {compareTab === 'palsu'
                      ? 'Pengirim: +62 895-3342-9912 (Nomor Asing)'
                      : 'Pengirim: BANK RESMI (Sender ID Terverifikasi)'}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      compareTab === 'palsu'
                        ? 'bg-[#FEE2E2] text-[#B91C1C]'
                        : 'bg-[#DCFCE7] text-[#166534]'
                    }`}
                  >
                    {compareTab === 'palsu' ? 'BAHAYA' : 'AMAN'}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-black/5 text-sm text-[#0F172A] leading-relaxed space-y-2">
                  {compareTab === 'palsu' ? (
                    <p>
                      Selamat siang Bu. Paket tertahan di gudang logistik.{' '}
                      <strong className="text-[#DC2626] underline">
                        MOHON BUKA DALAM 10 MENIT
                      </strong>{' '}
                      atau paket dibatalkan. Unduh berkas resi di:{' '}
                      <span className="font-mono text-[#0284C7] bg-[#FEF3C7] px-1 rounded">
                        https://cek-resi-jnt.xyz/Lihat_Foto.pdf.apk
                      </span>
                    </p>
                  ) : (
                    <p>
                      Info Resmi Ekspedisi: Paket resi JT88192019 telah tiba di kota tujuan. Lacak status pengantaran kurir secara mandiri hanya melalui aplikasi resmi di Google Play Store atau website www.jet.co.id.
                    </p>
                  )}
                </div>

                {/* Callout Pins Buttons */}
                <div className="pt-2">
                  <p className="text-xs font-bold text-[#64748B] mb-2">
                    Sentuh lingkaran nomor di bawah untuk penjelasan detektif:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(compareTab === 'palsu' ? PINS_PALSU : PINS_ASLI).map((pin) => (
                      <button
                        key={pin.id}
                        onClick={() => handlePinClick(pin)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all ${
                          activePin?.id === pin.id
                            ? 'bg-[#0F172A] text-white border-[#0F172A] scale-105'
                            : 'bg-white text-[#334155] border-[#CBD5E1] hover:border-[#FF6B00]'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white ${
                            compareTab === 'palsu' ? 'bg-[#EF4444]' : 'bg-[#10B981]'
                          }`}
                        >
                          {pin.id}
                        </span>
                        <span>{pin.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detective Callout Explanation Box */}
              <div className="lg:col-span-5 bg-[#FAF6EE] rounded-3xl p-6 border-2 border-[#EEDCC8] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 shrink-0 bg-white rounded-2xl p-1 border border-[#EEDCC8]">
                    <Mascot
                      name="03_serius"
                      alt="Detektif Ciko fokus"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                      Analisis Detektif
                    </span>
                    <h3 className="font-bold text-base text-[#0F172A]">
                      {activePin ? activePin.label : 'Pilih Pin untuk Bedah Kasus'}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-medium">
                  {activePin
                    ? activePin.detail
                    : 'Klik salah satu tombol nomor penanda di sebelah kiri untuk melihat penjelasan mendalam mengapa bagian tersebut aman atau berbahaya.'}
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              FITUR 2: KAMUS ISTILAH SIBER BAHASA AWAM (INTERACTIVE ACCORDION TABS)
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-[#FFE8D6] shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                Kamus Saku Bahasa Awam
              </span>
              <h2 className="text-2xl font-bold text-[#0F172A] mt-0.5">
                Istilah Teknologi Dibuat Sederhana
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">
                Pahami istilah yang sering dipakai penipu tanpa perlu pusing dengan bahasa teknis yang rumit!
              </p>
            </div>

            <div className="space-y-3">
              {DICT_ITEMS.map((item) => {
                const isOpen = openDictKey === item.key;
                const Icon = item.icon;

                return (
                  <div
                    key={item.key}
                    className="rounded-2xl border-2 border-[#E2E8F0] overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => {
                        playClick();
                        setOpenDictKey(isOpen ? null : item.key);
                      }}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left bg-white hover:bg-[#FFF7ED]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center shrink-0">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                            Apa itu {item.term}?
                          </p>
                          <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                            {item.awamTitle}
                          </h3>
                        </div>
                      </div>

                      <div className="p-1 rounded-full text-[#64748B]">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 bg-white border-t border-[#F1F5F9] space-y-2 animate-pop-in">
                        <p className="text-sm text-[#334155] leading-relaxed font-medium">
                          {item.summary}
                        </p>
                        <div className="bg-[#FEF3C7] p-3 rounded-xl border border-[#FDE68A] text-xs font-bold text-[#B45309]">
                          💡 {item.example}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              FITUR 3: PANDUAN LANGKAH DARURAT (JIKA TERLANJUR KLIK)
             ========================================================================= */}
          <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FFF7ED] rounded-3xl p-6 sm:p-9 border-2 border-[#FECACA] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EF4444] text-white flex items-center justify-center shrink-0 shadow-md">
                <AlertTriangle size={24} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">
                  Protokol Darurat Penyelamatan
                </span>
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  Apa yang Harus Dilakukan Jika Terlanjur Klik File / Tautan?
                </h2>
              </div>
            </div>

            <p className="text-sm text-[#475569] font-medium leading-relaxed">
              Jangan panik! Lakukan 3 langkah cepat ini dalam 60 detik pertama untuk menghentikan penipu mencuri saldomu:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-[#FECACA] space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#EF4444] text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <Plane size={18} className="text-[#EF4444]" />
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">
                  Aktifkan Mode Pesawat (Airplane Mode)
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Putuskan koneksi internet seketika agar malware di HP tidak bisa mengirimkan data SMS ke server penipu.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-[#FECACA] space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#EF4444] text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <PhoneCall size={18} className="text-[#EF4444]" />
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">
                  Telepon Call Center Bank Resmi
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Gunakan HP lain untuk menelepon bank resmi dan minta blokir sementara akun mobile banking atau kartu debitmu.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-[#FECACA] space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#EF4444] text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <Trash2 size={18} className="text-[#EF4444]" />
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">
                  Hapus File &amp; Aplikasi Mencurigakan
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Buka Pengaturan HP -&gt; Aplikasi -&gt; cari nama file APK yang baru diunduh lalu pilih &quot;Uninstall / Hapus&quot;.
                </p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/kasus"
                className="btn-pill-orange text-sm sm:text-base py-3 px-8 font-bold inline-flex items-center gap-2 shadow-md"
              >
                <span>Uji Pengetahuanmu di Misi Kasus</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
