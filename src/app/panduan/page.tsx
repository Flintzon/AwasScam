import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Compass, IdCard, Trophy } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';

const GUIDE_MASCOT_SRC =
  '/mascot_detective/maskot/Owl_scratching_head_guide.gif';

function GuideMascot() {
  return (
    <div aria-hidden="true" className="w-28 shrink-0 sm:w-36">
      <Image
        src={GUIDE_MASCOT_SRC}
        alt=""
        width={400}
        height={225}
        unoptimized
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

const GUIDE_STEPS = [
  {
    title: 'Mulai Petualangan',
    description: 'Pilih tombol Mulai Petualangan untuk membuka peta kasus.',
  },
  {
    title: 'Pilih kasus yang tersedia',
    description: 'Pilih misi di peta, baca pratinjaunya, lalu mulai penyelidikan.',
  },
  {
    title: 'Periksa petunjuk dan bukti',
    description: 'Amati bukti dalam simulasi, gunakan petunjuk bila perlu, lalu tentukan keputusanmu.',
  },
  {
    title: 'Selesaikan kasus dan lihat progres',
    description: 'Keputusan yang benar menandai misi selesai. Periksa progres dan lencana yang kamu kumpulkan.',
  },
];

const GUIDE_FEATURES = [
  {
    title: 'Peta Misi Kasus',
    description: 'Pilih kasus dan mulai penyelidikan.',
    href: '/kasus',
    icon: Compass,
  },
  {
    title: 'Panduan Penggunaan',
    description: 'Lihat kembali langkah memakai website.',
    href: '/panduan',
    icon: BookOpen,
  },
  {
    title: 'Progres & Pencapaian',
    description: 'Pantau kasus selesai dan lencana.',
    href: '/progres',
    icon: Trophy,
  },
  {
    title: 'Kartu ID Detektif',
    description: 'Lihat profil dan identitas detektifmu.',
    href: '/profil',
    icon: IdCard,
  },
];

export default function GuidePage() {
  return (
    <SiteFrame>
      <div className="min-h-screen bg-[#FFFDF8] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-9 sm:space-y-11">
          <div className="flex items-center justify-start gap-4">
            <GuideMascot />
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                Panduan Penggunaan
              </h1>
              <p className="max-w-2xl text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
                Kenali fitur dan mulai petualangan detektifmu.
              </p>
            </div>
          </div>

          <section aria-labelledby="guide-steps-title">
            <h2
              id="guide-steps-title"
              className="mb-4 text-xl font-bold text-[#0F172A] sm:text-2xl"
            >
              Cara Menggunakan Website
            </h2>
            <ol className="divide-y divide-[#F3E4D8] rounded-2xl border border-[#F3E4D8] bg-white px-4 sm:px-6">
              {GUIDE_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4 py-4 sm:gap-5 sm:py-5">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF1E6] text-sm font-extrabold text-[#D95B00]"
                  >
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#0F172A]">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[#475569]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="guide-features-title">
            <h2
              id="guide-features-title"
              className="mb-4 text-xl font-bold text-[#0F172A] sm:text-2xl"
            >
              Mengenal Fitur
            </h2>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {GUIDE_FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li key={feature.title} className="border-t border-[#F3E4D8]">
                    <Link
                      href={feature.href}
                      aria-current={feature.href === '/panduan' ? 'page' : undefined}
                      className="group flex items-start gap-3 py-4"
                    >
                      <Icon
                        aria-hidden="true"
                        size={19}
                        className="mt-0.5 shrink-0 text-[#E96817]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-[#0F172A] group-hover:text-[#D95B00]">
                          {feature.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-[#475569]">
                          {feature.description}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        size={16}
                        className="mt-1 shrink-0 text-[#D95B00] transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

        </div>
      </div>
    </SiteFrame>
  );
}
