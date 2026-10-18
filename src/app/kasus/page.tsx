'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Clock, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { CASES, type CaseInfo } from '../../data/cases';
import { Mascot } from '../../components/Mascot';

const FILTERS = ['Semua', 'Pemula', 'Menengah', 'Tantangan'] as const;
const LEVEL: Record<CaseInfo['difficulty'], { label: string; color: string; badge: string }> = {
  Pemula: { label: 'Tingkat Pemula', color: 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]', badge: 'Mudah' },
  Menengah: { label: 'Tingkat Menengah', color: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]', badge: 'Sedang' },
  Tantangan: { label: 'Tingkat Tantangan', color: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]', badge: 'Lanjutan' },
};

export default function CasesPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Semua');
  const shown = filter === 'Semua' ? CASES : CASES.filter((item) => item.difficulty === filter);

  return (
    <SiteFrame>
      <div className="py-12 lg:py-16 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header with Mascot Pointing */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FFE8D6] shadow-[0_8px_30px_rgba(255,122,0,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-xs font-bold shadow-sm">
                <Compass size={15} />
                <span>MEJA INVESTIGASI DETEKTIF</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F1D38]">
                Pilih Berkas Kasus yang Ingin Kamu Bongkar
              </h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-xl">
                Setiap kasus diambil dari skenario penipuan digital nyata di Indonesia. Selidiki barang bukti, temukan tanda bahaya, dan ambil keputusan yang menyelamatkan!
              </p>
            </div>

            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative">
              <Mascot
                name="02_menunjuk_petunjuk"
                alt="Detektif Ciko menunjuk berkas kasus"
                width={112}
                height={112}
                animate="bounce"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#64748B] flex items-center gap-1.5 mr-1">
              <Filter size={14} /> Filter:
            </span>
            {FILTERS.map((name) => (
              <button
                key={name}
                onClick={() => setFilter(name)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === name
                    ? 'bg-[#FF7A00] text-white shadow-md'
                    : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#FFF7ED]'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Cases List */}
          <div className="space-y-4">
            {shown.map((item) => {
              const lvl = LEVEL[item.difficulty];
              return (
                <Link
                  key={item.slug}
                  href={`/kasus/${item.slug}`}
                  className="group block bg-white rounded-3xl p-6 border-2 border-[#E2E8F0] hover:border-[#FF7A00] shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#FF7A00] flex items-center justify-center font-extrabold text-xl shrink-0 group-hover:scale-110 transition-transform">
                        {String(item.id).padStart(2, '0')}
                      </span>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${lvl.color}`}>
                            {item.difficulty}
                          </span>
                          <span className="text-xs text-[#64748B] flex items-center gap-1 font-medium">
                            <Clock size={13} /> {item.duration}
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-[#0F1D38] group-hover:text-[#FF7A00] transition-colors">
                          {item.title}
                        </h2>

                        <p className="text-sm text-[#475569] max-w-2xl leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="self-end sm:self-center shrink-0">
                      <span className="btn-pill-orange text-xs sm:text-sm py-2 px-4 font-bold inline-flex items-center gap-1.5 group-hover:bg-[#EA6C00]">
                        <span>Buka Kasus</span>
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
