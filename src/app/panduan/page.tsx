import Link from 'next/link';
import { BookOpen, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot } from '../../components/Mascot';

const tips = [
  {
    number: '01',
    title: 'Tautan dan Lampiran Asing',
    text: 'Jangan pernah memasang aplikasi dari pesan mendadak. Periksa status kiriman dengan membuka aplikasi atau situs ekspedisi sendiri.',
    example: 'Lampiran "Lihat_Foto_Paket.pdf.apk" bukan foto — file .apk adalah aplikasi Android yang bisa menyadap SMS-mu.',
  },
  {
    number: '02',
    title: 'Kode OTP dan Kerahasiaan Data',
    text: 'Kode OTP, PIN, dan kata sandi bersifat rahasia. Petugas bank yang resmi tidak akan pernah memintanya lewat telepon, pesan, atau chat.',
    example: 'Penelepon mengaku CS bank lalu mendesak membacakan kode OTP. Cukup tutup panggilannya dan telepon call center resmi.',
  },
  {
    number: '03',
    title: 'Tekanan Waktu dan Manipulasi Panik',
    text: 'Ancaman batas waktu, rasa takut kehilangan uang, atau janji keuntungan besar adalah tanda untuk berhenti — bukan alasan buru-buru menuruti.',
    example: 'Iming-iming komisi 300% dan "slot VIP" adalah umpan. Penipu mengandalkan kepanikan agar kamu tak sempat memeriksa.',
  },
  {
    number: '04',
    title: 'Verifikasi Selalu Lewat Kanal Resmi',
    text: 'Cari sendiri nomor layanan, aplikasi, atau situs resmi. Jangan pakai nomor atau tautan yang diberikan pihak yang menghubungimu.',
    example: 'Nomor call center bank berupa 5–7 digit (misalnya 1500888), bukan nomor seluler +62 8xx yang bisa dipakai siapa saja.',
  },
];

const checklist = [
  'Berhenti sebentar — jangan klik, unduh, atau transfer apa pun saat panik.',
  'Buka sendiri kanal resminya: aplikasi resmi di Play Store, website resmi berakhiran .co.id, atau hotline resmi.',
  'Jangan pernah bagikan kode OTP, PIN, atau kata sandi kepada siapa pun.',
  'Masih ragu? Tanyakan ke keluarga atau orang tepercaya sebelum mengambil keputusan.',
];

export default function Guide() {
  return (
    <SiteFrame>
      <div className="py-12 lg:py-16 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header with Investigating Mascot */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-[0_8px_30px_rgba(255,122,0,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] text-xs font-bold shadow-sm">
                <BookOpen size={15} />
                <span>PANDUAN LITERASI KELUARGA</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F1D38]">
                Periksa Dulu Sebelum Percaya
              </h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-xl">
                Latih kebiasaan sederhana: berhenti sebentar, periksa kejanggalan, lalu verifikasi lewat kanal resmi.
              </p>
            </div>

            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative">
              <Mascot
                name="03_memeriksa"
                alt="Detektif Ciko memeriksa bukti"
                width={112}
                height={112}
                animate="bounce"
              />
            </div>
          </div>

          {/* Tips Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="bg-white rounded-3xl p-6 border-2 border-[#E2E8F0] shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                    Prinsip {tip.number}
                  </span>
                  <h2 className="text-lg font-bold text-[#0F1D38]">{tip.title}</h2>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{tip.text}</p>
                </div>
                <div className="bg-[#FFF7ED] p-3 rounded-2xl border border-[#FFEDD5] text-xs text-[#9A3412]">
                  <strong>Contoh:</strong> {tip.example}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Checklist */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#BAE6FD] shadow-sm space-y-5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="text-[#0284C7]" size={24} />
              <h2 className="text-xl font-bold text-[#0F1D38]">Checklist Tindakan Cepat</h2>
            </div>
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#334155] font-medium">
                  <CheckCircle2 className="text-[#22C55E] shrink-0 mt-0.5" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                href="/kasus"
                className="btn-pill-orange text-sm font-bold inline-flex items-center gap-2"
              >
                <span>Praktikkan di Simulasi Kasus</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
