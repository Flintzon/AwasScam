'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Check, Award, Compass, Sparkles } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { CASES } from '../../data/cases';
import { Mascot } from '../../components/Mascot';

export default function Progress() {
  const [done, setDone] = useState<number[] | null>(null);

  useEffect(() => {
    let items: number[] = [];
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('awas-scam-progress') || '[]');
      if (Array.isArray(saved)) items = saved.filter((item): item is number => typeof item === 'number');
    } catch {}
    const timer = setTimeout(() => setDone(items), 0);
    return () => clearTimeout(timer);
  }, []);

  const finished = done ?? [];
  const next = CASES.find((item) => !finished.includes(item.id));
  const skills = Array.from(
    new Map(
      CASES.flatMap((item) =>
        item.skills.map((skill) => [skill, { skill, caseId: item.id, caseTitle: item.title }] as const),
      ),
    ).values(),
  );

  return (
    <SiteFrame>
      <div className="py-12 lg:py-16 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-[0_8px_30px_rgba(255,122,0,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-bold shadow-sm">
                <Award size={15} />
                <span>PENCAPAIAN DETEKTIF</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F1D38]">
                Progres Investigasimu
              </h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-xl">
                Lacak kasus yang telah kamu selesaikan dan lihat kemampuan detektif yang sudah kamu kuasai.
              </p>
            </div>

            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative">
              <Mascot
                name={finished.length > 0 ? '02_senang' : '04_berpikir'}
                alt="Detektif Ciko"
                width={112}
                height={112}
                animate="bounce"
              />
            </div>
          </div>

          {/* Progress Status */}
          {done === null ? null : finished.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E2E8F0] text-center space-y-4">
              <p className="text-base sm:text-lg font-bold text-[#0F1D38]">
                Belum ada kasus yang selesai. Yuk mulai petualangan pertamamu!
              </p>
              <p className="text-sm text-[#64748B] max-w-md mx-auto">
                Selesaikan kasus pertamamu hanya dalam 3-4 menit untuk membuka lencana detektif pemula.
              </p>
              <div>
                <Link href="/kasus/paket-misterius" className="btn-pill-orange py-3 px-6 text-sm font-bold inline-flex items-center gap-2">
                  <span>Mulai Kasus 01: Paket Misterius</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider">Status Misi</span>
                  <p className="text-xl font-bold text-[#0F1D38]">
                    {finished.length} dari {CASES.length} Kasus Selesai
                  </p>
                </div>
                <span className="text-2xl font-black text-[#FF7A00] font-mono">
                  {Math.round((finished.length / CASES.length) * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 bg-[#F1F5F9] rounded-full overflow-hidden p-0.5 border border-[#E2E8F0]">
                <div
                  className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FACC15] rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((finished.length / CASES.length) * 100)}%` }}
                />
              </div>

              {next ? (
                <div className="pt-2">
                  <Link href={`/kasus/${next.slug}`} className="btn-pill-orange text-sm py-2.5 px-6 font-bold inline-flex items-center gap-2">
                    <span>Lanjutkan: {next.title}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="p-4 bg-[#F0FDF4] rounded-2xl border border-[#86EFAC] text-[#166534] font-bold text-sm flex items-center gap-2">
                  <Sparkles size={18} />
                  <span>Hebat! Kamu telah menuntaskan seluruh berkas kasus! Kamu resmi menjadi Detektif Siber Keluarga Tangguh!</span>
                </div>
              )}
            </div>
          )}

          {/* Skills Map */}
          {done !== null && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E2E8F0] shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider">Peta Keahlian</span>
                <h2 className="text-xl font-bold text-[#0F1D38] mt-0.5">Kemampuan yang Kamu Latih</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map(({ skill, caseId, caseTitle }) => {
                  const practiced = finished.includes(caseId);
                  const caseItem = CASES.find((item) => item.id === caseId);
                  return (
                    <Link
                      key={skill}
                      href={caseItem ? `/kasus/${caseItem.slug}` : '/kasus'}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        practiced
                          ? 'bg-[#F0FDF4] border-[#86EFAC]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#FF7A00]'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-sm text-[#0F1D38]">{skill}</p>
                        <p className="text-xs text-[#64748B] mt-0.5">{caseTitle}</p>
                      </div>
                      <span
                        className={`text-xs font-bold mt-3 flex items-center gap-1 ${
                          practiced ? 'text-[#166534]' : 'text-[#94A3B8]'
                        }`}
                      >
                        {practiced ? <Check size={14} className="text-[#22C55E]" /> : null}
                        {practiced ? 'Sudah Dikuasai' : 'Mulai Latihan'}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteFrame>
  );
}
