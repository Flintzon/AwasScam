import Link from 'next/link';
import { Heart, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot } from '../../components/Mascot';

export default function About() {
  return (
    <SiteFrame>
      <div className="py-12 lg:py-16 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header with Mascot */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-[0_8px_30px_rgba(255,122,0,0.08)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-bold shadow-sm">
                <Heart size={15} />
                <span>MISI KITA BERSAMA</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F1D38]">
                Belajar Waspada Tanpa Dibuat Takut
              </h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-lg leading-relaxed">
                AWAS SCAM! dirancang untuk memutus rantai korban penipuan online di Indonesia lewat simulasi interaktif yang ramah, menghibur, dan mendidik.
              </p>
            </div>

            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative">
              <Mascot
                name="01_menyapa"
                alt="Detektif Ciko menyapa"
                width={112}
                height={112}
                animate="bounce"
              />
            </div>
          </div>

          {/* Core Philosophy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E2E8F0] shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#0F1D38]">Mengapa Kami Membangun AWAS SCAM?</h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Banyak orang tua, lansia, dan bahkan generasi muda menjadi korban penipuan digital bukan karena mereka ceroboh, tetapi karena penipu memanfaatkan rasa panik dan kasih sayang terhadap keluarga.
            </p>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Edukasi keamanan siber seringkali menggunakan istilah teknis yang menakutkan dan sulit dipahami masyarakat biasa. Melalui tokoh <strong>Detektif Ciko si burung hantu bijak</strong>, kami menyederhanakan konsep keamanan digital agar bisa dipelajari santai oleh siapa saja di ruang keluarga.
            </p>
          </div>

          {/* Privacy & Guarantee */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#BAE6FD] shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="text-[#0284C7]" size={22} />
              <h2 className="text-xl font-bold text-[#0F1D38]">100% Aman, Gratis, dan Tanpa Pelacak</h2>
            </div>
            <ul className="space-y-2 text-sm text-[#475569]">
              <li>• Semua skenario, nama tokoh, dan nomor telepon fiktif untuk edukasi.</li>
              <li>• Progres tersimpan secara lokal di browser perangkatmu.</li>
              <li>• Tanpa formulir pendaftaran, tanpa iklan, dan tanpa pengumpulan data pribadi.</li>
            </ul>
          </div>

          <div className="text-center pt-4">
            <Link href="/kasus" className="btn-pill-orange text-base py-3 px-8 font-bold inline-flex items-center gap-2">
              <span>Mulai Petualangan Detektif</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
