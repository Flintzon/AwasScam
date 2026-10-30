import Image from 'next/image';
import { Lightbulb } from 'lucide-react';
import { SiteFrame } from '../../components/SiteChrome';
import { Mascot, type MascotName } from '../../components/Mascot';

const GUIDE_STEPS: {
  title: string;
  description: string;
  pose: MascotName;
  alt: string;
}[] = [
  {
    title: 'Mulai Petualangan',
    description: 'Buka peta dan pilih misi pertamamu.',
    pose: '01_menyapa',
    alt: 'Detektif Ciko menyapa dan siap memulai petualangan',
  },
  {
    title: 'Cari Petunjuk',
    description: 'Periksa pesan, pengirim, dan bukti.',
    pose: '02_menunjuk_petunjuk',
    alt: 'Detektif Ciko menunjukkan petunjuk',
  },
  {
    title: 'Analisis Modus',
    description: 'Kenali tanda penipuan dari petunjuknya.',
    pose: '03_memeriksa',
    alt: 'Detektif Ciko memeriksa bukti dengan kaca pembesar',
  },
  {
    title: 'Selesaikan Kasus',
    description: 'Ambil keputusan dan lihat progresmu.',
    pose: '06_melompat',
    alt: 'Detektif Ciko melompat merayakan kasus yang selesai',
  },
];

export default function GuidePage() {
  return (
    <SiteFrame>
      <div className="min-h-screen bg-[#FFFDF8] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-9 sm:space-y-11">
          <header className="space-y-4 text-center sm:space-y-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                Panduan Penggunaan
              </h1>
              <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
                Kenali fitur dan mulai petualangan detektifmu.
              </p>
            </div>
            <Image
              src="/mascot_detective/ciko-kejar-peretas-panduan.png"
              alt="Detektif Ciko mengejar peretas"
              width={1010}
              height={525}
              priority
              sizes="(max-width: 640px) 100vw, 672px"
              className="mx-auto h-auto w-full max-w-2xl object-contain"
            />
          </header>

          <section aria-labelledby="guide-steps-title">
            <h2
              id="guide-steps-title"
              className="mb-3 text-xl font-bold text-[#0F172A] sm:mb-4 sm:text-2xl"
            >
              Cara Menggunakan Website
            </h2>
            <ol className="relative grid gap-5 before:absolute before:bottom-10 before:left-10 before:top-10 before:border-l-2 before:border-dotted before:border-[#E9A06A] sm:grid-cols-4 sm:gap-3 sm:before:bottom-auto sm:before:left-[12.5%] sm:before:right-[12.5%] sm:before:top-12 sm:before:border-l-0 sm:before:border-t-2">
              {GUIDE_STEPS.map((step) => (
                <li
                  key={step.title}
                  className="relative flex items-center gap-4 sm:flex-col sm:items-center sm:gap-3"
                >
                  <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center bg-[#FFFDF8] sm:h-24 sm:w-24">
                    <Mascot
                      name={step.pose}
                      alt={step.alt}
                      width={96}
                      height={96}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 space-y-1 sm:max-w-48 sm:text-center">
                    <h3 className="font-bold text-[#0F172A]">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[#475569]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <aside className="flex items-center gap-4 rounded-2xl bg-[#FFF1E6] px-4 py-4 sm:gap-6 sm:px-6">
            <Mascot
              name="04_berpikir"
              alt="Detektif Ciko sedang berpikir"
              width={96}
              height={96}
              className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
            />
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 font-bold text-[#0F172A]">
                <Lightbulb size={17} className="text-[#B04A00]" aria-hidden="true" />
                Tips Detektif
              </h2>
              <p className="text-sm leading-relaxed text-[#475569]">
                Berhenti sejenak, periksa pengirim dan buktinya, lalu konfirmasi
                lewat kanal resmi.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </SiteFrame>
  );
}
