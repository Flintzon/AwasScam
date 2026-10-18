'use client';

import Image from 'next/image';

export type MascotPoseAction =
  | '01_menyapa'
  | '02_menunjuk_petunjuk'
  | '03_memeriksa'
  | '04_berpikir'
  | '05_berjalan'
  | '06_melompat'
  | 'menyapa'
  | 'menunjuk'
  | 'memeriksa'
  | 'berpikir'
  | 'berjalan'
  | 'melompat';

export type MascotExpression =
  | '01_normal'
  | '02_senang'
  | '03_serius'
  | '04_terkejut'
  | '05_curiga'
  | '06_sedih'
  | 'normal'
  | 'senang'
  | 'serius'
  | 'terkejut'
  | 'curiga'
  | 'sedih';

export type LegacyMascotPose =
  | 'main'
  | 'investigating'
  | 'alert'
  | 'thinking'
  | 'hint'
  | 'success'
  | 'completion'
  | 'avatar';

export type MascotName = MascotPoseAction | MascotExpression | LegacyMascotPose;

const POSE_ACTION_MAP: Record<string, string> = {
  '01_menyapa': '/mascot_detective/pose_aksi/01_menyapa.png',
  'menyapa': '/mascot_detective/pose_aksi/01_menyapa.png',
  '02_menunjuk_petunjuk': '/mascot_detective/pose_aksi/02_menunjuk_petunjuk.png',
  'menunjuk': '/mascot_detective/pose_aksi/02_menunjuk_petunjuk.png',
  '03_memeriksa': '/mascot_detective/pose_aksi/03_memeriksa.png',
  'memeriksa': '/mascot_detective/pose_aksi/03_memeriksa.png',
  '04_berpikir': '/mascot_detective/pose_aksi/04_berpikir.png',
  'berpikir': '/mascot_detective/pose_aksi/04_berpikir.png',
  '05_berjalan': '/mascot_detective/pose_aksi/05_berjalan.png',
  'berjalan': '/mascot_detective/pose_aksi/05_berjalan.png',
  '06_melompat': '/mascot_detective/pose_aksi/06_melompat.png',
  'melompat': '/mascot_detective/pose_aksi/06_melompat.png',

  // Legacy mappings to appropriate pose actions
  'main': '/mascot_detective/pose_aksi/01_menyapa.png',
  'investigating': '/mascot_detective/pose_aksi/03_memeriksa.png',
  'alert': '/mascot_detective/ekspresi_wajah/04_terkejut.png',
  'thinking': '/mascot_detective/pose_aksi/04_berpikir.png',
  'hint': '/mascot_detective/pose_aksi/02_menunjuk_petunjuk.png',
  'success': '/mascot_detective/pose_aksi/06_melompat.png',
  'completion': '/mascot_detective/pose_aksi/06_melompat.png',
  'avatar': '/mascot_detective/ekspresi_wajah/01_normal.png',
};

const EXPRESSION_MAP: Record<string, string> = {
  '01_normal': '/mascot_detective/ekspresi_wajah/01_normal.png',
  'normal': '/mascot_detective/ekspresi_wajah/01_normal.png',
  '02_senang': '/mascot_detective/ekspresi_wajah/02_senang.png',
  'senang': '/mascot_detective/ekspresi_wajah/02_senang.png',
  '03_serius': '/mascot_detective/ekspresi_wajah/03_serius.png',
  'serius': '/mascot_detective/ekspresi_wajah/03_serius.png',
  '04_terkejut': '/mascot_detective/ekspresi_wajah/04_terkejut.png',
  'terkejut': '/mascot_detective/ekspresi_wajah/04_terkejut.png',
  '05_curiga': '/mascot_detective/ekspresi_wajah/05_curiga.png',
  'curiga': '/mascot_detective/ekspresi_wajah/05_curiga.png',
  '06_sedih': '/mascot_detective/ekspresi_wajah/06_sedih.png',
  'sedih': '/mascot_detective/ekspresi_wajah/06_sedih.png',
};

export function resolveMascotSrc(name: string): string {
  if (EXPRESSION_MAP[name]) {
    return EXPRESSION_MAP[name];
  }
  if (POSE_ACTION_MAP[name]) {
    return POSE_ACTION_MAP[name];
  }
  return '/mascot_detective/pose_aksi/01_menyapa.png';
}

interface MascotProps {
  name: MascotName;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  animate?: 'float' | 'bounce' | 'wiggle' | 'none';
}

export function Mascot({
  name,
  alt,
  className = '',
  style,
  width = 240,
  height = 240,
  animate = 'none',
}: MascotProps) {
  const src = resolveMascotSrc(name);

  const animationClass =
    animate === 'float'
      ? 'animate-float'
      : animate === 'bounce'
      ? 'animate-bounce-subtle'
      : animate === 'wiggle'
      ? 'animate-wiggle'
      : '';

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      draggable={false}
      className={`select-none object-contain ${animationClass} ${className}`.trim()}
      style={style}
    />
  );
}

export default Mascot;
