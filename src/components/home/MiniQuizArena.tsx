'use client';

import { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  AlertOctagon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mascot, MascotName } from '../Mascot';
import { playEvidenceFound, playBuzz, playClick } from '../../utils/sound';

interface QuestionItem {
  id: number;
  category: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    reason: string;
  }[];
}

const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    category: 'Skenario 1 · Tilang Elektronik (ETLE)',
    scenario:
      'Pagi hari, kamu menerima pesan WhatsApp dari nomor asing berfoto logo Korlantas Polri: "Anda terbukti melanggar batas kecepatan! Silakan klik dan buka berkas Surat_Tilang_ETLE.apk untuk melihat foto plat nomor kendaraan Anda sebelum dikenakan denda Rp 500.000."',
    question: 'Sebagai detektif yang cerdas, apa tindakan pertama yang kamu ambil?',
    options: [
      {
        id: 'A',
        text: 'Langsung buka file APK karena takut denda bertambah mahal.',
        isCorrect: false,
        reason:
          'Waduh! File .APK ini adalah virus pencuri data. Kepolisian RI tidak pernah mengirim surat tilang dalam bentuk file APK lewat chat WhatsApp pribadi!',
      },
      {
        id: 'B',
        text: 'Abaikan, blokir nomornya, dan cek tilang resmi lewat web etle-korlantas.info.',
        isCorrect: true,
        reason:
          'Luar Biasa! Tepat sekali! Surat tilang resmi selalu dikirimkan lewat pos fisik ke alamat STNK atau bisa diverifikasi mandiri lewat website resmi kepolisian.',
      },
      {
        id: 'C',
        text: 'Kirim file tersebut ke grup keluarga untuk minta tolong dibukakan.',
        isCorrect: false,
        reason:
          'Hati-hati! Mengirim file berbahaya ke keluarga bisa membuat HP anggota keluargamu ikut terinfeksi virus penyadap!',
      },
    ],
  },
  {
    id: 2,
    category: 'Skenario 2 · Telepon CS Bank Gadungan',
    scenario:
      'Seseorang menelepon dengan nada sangat panik mengaku dari Bank Pusat: "Bapak/Ibu, ada transaksi mencurigakan Rp 8.000.000 di rekening Anda! Untuk membatalkan pemotongan saldo, tolong bacakan 6 digit angka kode yang baru saja masuk ke SMS Anda sekarang juga!"',
    question: 'Apa respon paling tepat yang harus kamu berikan?',
    options: [
      {
        id: 'A',
        text: 'Segera sebutkan 6 digit kodenya agar uang tidak keburu ditarik.',
        isCorrect: false,
        reason:
          'Bahaya Besar! Kode 6 digit itu adalah kode OTP (kunci persetujuan transfer). Jika kamu sebutkan, penipulah yang baru saja berhasil menarik uangmu!',
      },
      {
        id: 'B',
        text: 'Tolak tegas, matikan telepon, lalu hubungi nomor resmi bank di balik kartu ATM.',
        isCorrect: true,
        reason:
          'Sempurna! Petugas bank resmi disumpah untuk TIDAK PERNAH meminta kode OTP, PIN, atau Password nasabah dengan alasan apapun!',
      },
      {
        id: 'C',
        text: 'Sebutkan 3 angka pertama saja karena mengira itu aman.',
        isCorrect: false,
        reason:
          'Jangan kompromi! Penipu akan terus memanipulasimu sampai mendapatkan seluruh angka. Langsung matikan telepon adalah cara paling aman!',
      },
    ],
  },
];

export function MiniQuizArena() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentQ = QUESTIONS[currentIdx];
  const selectedOption = currentQ.options.find((opt) => opt.id === selectedOptionId);

  // Dynamic mascot expression
  let mascotExp: MascotName = '04_berpikir';
  if (selectedOption) {
    mascotExp = selectedOption.isCorrect ? '02_senang' : '04_terkejut';
  }

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    const chosen = currentQ.options.find((o) => o.id === optId);

    if (chosen?.isCorrect) {
      playEvidenceFound();
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#FF7A00', '#FACC15', '#38BDF8'],
      });
    } else {
      playBuzz();
    }
  };

  const handleNextOrReset = () => {
    playClick();
    setSelectedOptionId(null);
    setCurrentIdx((prev) => (prev + 1) % QUESTIONS.length);
  };

  return (
    <section id="tes-insting" className="py-16 lg:py-24 bg-[#FEF9EF] relative overflow-hidden">
      {/* Decorative Warm Backing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs sm:text-sm font-bold shadow-sm">
            <HelpCircle size={16} />
            <span>TES INSTING DETEKTIF 10 DETIK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1D38]">
            Apakah Kamu Bisa Tertipu?
          </h2>
          <p className="text-sm sm:text-base text-[#475569]">
            Pilih tindakanmu pada skenario nyata di bawah ini. Detektif Ciko akan langsung menilai seberapa tajam nalurimu!
          </p>

          {/* Scenario Tabs Switcher */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  playClick();
                  setCurrentIdx(idx);
                  setSelectedOptionId(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currentIdx === idx
                    ? 'bg-[#FF7A00] text-white shadow-md'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#FFF7ED]'
                }`}
              >
                Kasus #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Quiz Arena Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#FFE8D6] shadow-[0_12px_40px_rgba(255,122,0,0.09)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Mascot Reaction Column */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-4 bg-[#FFFDF9] rounded-2xl border border-[#FFE8D6]">
              <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
                <Mascot
                  name={mascotExp}
                  alt="Detektif Ciko berpikir"
                  width={144}
                  height={144}
                  animate={selectedOption?.isCorrect ? 'bounce' : 'none'}
                />
              </div>

              <div className="mt-3">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider">
                  Detektif Ciko Menilai
                </span>
                <p className="text-sm font-bold text-[#0F1D38] mt-0.5">
                  {!selectedOption
                    ? 'Ayo pilih jawabanmu!'
                    : selectedOption.isCorrect
                    ? '🎉 Hebat Sekali!'
                    : '⚠️ Waduh, Hampir Saja!'}
                </p>
              </div>
            </div>

            {/* Question & Options Column */}
            <div className="lg:col-span-8 space-y-5">
              {/* Scenario Context */}
              <div className="bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] space-y-2">
                <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider">
                  {currentQ.category}
                </span>
                <p className="text-sm sm:text-base text-[#1E293B] leading-relaxed italic">
                  &quot;{currentQ.scenario}&quot;
                </p>
                <p className="text-sm sm:text-base font-bold text-[#0F1D38] pt-1">
                  👉 {currentQ.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let borderStyle = 'border-[#E2E8F0] hover:border-[#FF7A00] hover:bg-[#FFF7ED]/50';

                  if (selectedOptionId) {
                    if (opt.isCorrect) {
                      borderStyle = 'border-[#22C55E] bg-[#F0FDF4] ring-2 ring-[#22C55E]';
                    } else if (isSelected && !opt.isCorrect) {
                      borderStyle = 'border-[#EF4444] bg-[#FEF2F2] ring-2 ring-[#EF4444]';
                    } else {
                      borderStyle = 'opacity-60 border-[#E2E8F0]';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={selectedOptionId !== null}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${borderStyle}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          selectedOptionId && opt.isCorrect
                            ? 'bg-[#22C55E] text-white'
                            : selectedOptionId && isSelected && !opt.isCorrect
                            ? 'bg-[#EF4444] text-white'
                            : 'bg-[#F1F5F9] text-[#475569]'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-[#1E293B] leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation Box */}
              {selectedOption && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border-2 animate-pop-in space-y-3 ${
                    selectedOption.isCorrect
                      ? 'bg-[#F0FDF4] border-[#86EFAC]'
                      : 'bg-[#FEF2F2] border-[#FCA5A5]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedOption.isCorrect ? (
                      <CheckCircle2 className="text-[#22C55E]" size={20} />
                    ) : (
                      <AlertOctagon className="text-[#EF4444]" size={20} />
                    )}
                    <h4
                      className={`font-bold text-base ${
                        selectedOption.isCorrect ? 'text-[#166534]' : 'text-[#991B1B]'
                      }`}
                    >
                      {selectedOption.isCorrect ? 'Penjelasan Detektif:' : 'Peringatan Penting:'}
                    </h4>
                  </div>

                  <p
                    className={`text-sm leading-relaxed ${
                      selectedOption.isCorrect ? 'text-[#14532D]' : 'text-[#7F1D1D]'
                    }`}
                  >
                    {selectedOption.reason}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={handleNextOrReset}
                      className="btn-pill-orange text-xs sm:text-sm py-2 px-5 font-bold inline-flex items-center gap-2"
                    >
                      <span>
                        {currentIdx === QUESTIONS.length - 1
                          ? 'Ulangi Kasus Pertama'
                          : 'Coba Kasus Berikutnya 👉'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MiniQuizArena;
