import Link from 'next/link';
import { Heart, ShieldCheck, Sparkles, ArrowRight, BookOpen, Users, Compass } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot } from '../../components/Mascot';

export default function AboutPage() {
  return (
    <SiteFrame>
      <div className="py-12 lg:py-16 bg-gradient-to-b from-[#FFFDF8] via-[#FEF7EC] to-[#FFFDF8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Card with Mascot Menyapa */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-[#FFE8D6] shadow-[0_10px_35px_rgba(255,107,0,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-bold shadow-sm">
                <Heart size={15} />
                <span>MISI SOSIAL KITA BERSAMA</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                Belajar Waspada Tanpa Dibuat Takut
              </h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-lg leading-relaxed font-medium">
                AWAS SCAM! dirancang untuk memutus rantai korban penipuan digital di Indonesia lewat simulasi interaktif yang ramah, menghibur, dan mudah dipahami seluruh anggota keluarga.
              </p>
            </div>

            <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 relative">
              <Mascot
                name="01_menyapa"
                alt="Detektif Ciko menyapa"
                width={128}
                height={128}
                animate="bounce"
              />
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
              Mengapa Kami Membangun Platform AWAS SCAM?
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-medium">
              Banyak orang tua, lansia, dan bahkan generasi muda menjadi korban penipuan siber bukan karena mereka kurang pintar, melainkan karena pelaku kejahatan mengeksploitasi rasa panik, kasih sayang terhadap keluarga, dan keterbatasan istilah teknologi yang rumit.
            </p>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-medium">
              Edukasi keamanan siber yang ada seringkali kaku dan menakutkan. Lewat karakter <strong>Detektif Ciko si burung hantu bijak</strong>, kami menyederhanakan teknik investigasi menjadi sebuah permainan petualangan yang menyenangkan untuk dimainkan bersama di ruang keluarga.
            </p>
          </div>

          {/* Core Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl p-5 border-2 border-[#BAE6FD] space-y-2">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-bold text-base text-[#0F172A]">100% Gratis &amp; Terbuka</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Didedikasikan untuk literasi publik masyarakat Indonesia tanpa dipungut biaya sepeser pun.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 border-2 border-[#86EFAC] space-y-2">
              <span className="text-2xl">🔒</span>
              <h3 className="font-bold text-base text-[#0F172A]">Bebas Pelacak Iklan</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Seluruh progres permainan tersimpan aman di browser perangkatmu tanpa pengumpulan data pribadi.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 border-2 border-[#FDE68A] space-y-2">
              <span className="text-2xl">👨‍👩‍👧</span>
              <h3 className="font-bold text-base text-[#0F172A]">Ramah Segala Usia</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Dirancang khusus dengan font yang mudah dibaca oleh mata orang tua dan nenek kakek tercinta.
              </p>
            </div>
          </div>

          {/* Credits */}
          <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 border-2 border-[#EEDCC8] space-y-3">
            <h3 className="font-bold text-base text-[#0F172A]">Kredit &amp; Lisensi Terbuka:</h3>
            <ul className="text-xs sm:text-sm text-[#64748B] space-y-1.5 list-disc list-inside">
              <li>Maskot Detektif Ciko &amp; Ilustrasi: Hak Cipta AWAS SCAM! Educational Initiative.</li>
              <li>Tipografi: Google Fonts (Fredoka, Plus Jakarta Sans, Nunito) — SIL Open Font License.</li>
              <li>Ikon Antarmuka: Lucide Icons — ISC License.</li>
              <li>Sintesis Efek Suara: Web Audio API Oscillator (Bebas file eksternal &amp; ringan).</li>
            </ul>
          </div>

          {/* Action CTA */}
          <div className="text-center pt-2">
            <Link
              href="/kasus"
              className="btn-pill-orange text-base sm:text-lg py-3.5 px-8 font-bold inline-flex items-center gap-2 shadow-lg"
            >
              <span>Mulai Petualangan Detektif</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
