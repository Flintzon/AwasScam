import {
  FileCode2,
  Link2,
  Lock,
  MessageCircle,
  PhoneCall,
  Smartphone,
} from 'lucide-react';
import type { CaseMission } from '../../data/cases';

/* Cover kasus dibangun dari data mission sendiri (pengirim, teks, lampiran/tautan),
   agar tiap kasus terlihat beda dengan situasi aslinya, bukan stok ilustrasi. */

const NAVY = { bg: '#0B141B', bar: '#172640', bubble: '#172640', border: '#2C3D5C', text: '#F3F6FA', sub: '#9AA6BD' };

function Avatar({ mission }: { mission: CaseMission }) {
  return (
    <span
      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.55rem] font-black text-white sm:h-9 sm:w-9 sm:text-[0.65rem]"
      style={{ backgroundColor: mission.evidence.avatarBg }}
    >
      {mission.evidence.avatarInitials}
    </span>
  );
}

function Row({ children, bg = NAVY.bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: bg }}>
      {children}
    </div>
  );
}

function WhatsappScene({ mission }: { mission: CaseMission }) {
  return (
    <Row bg={NAVY.bg}>
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: NAVY.bar }}>
        <Avatar mission={mission} />
        <div className="min-w-0">
          <p className="truncate text-[0.65rem] font-semibold sm:text-[0.72rem]" style={{ color: NAVY.text }}>
            {mission.evidence.senderName}
          </p>
          <p className="truncate font-mono text-[0.55rem] sm:text-[0.62rem]" style={{ color: NAVY.sub }}>
            {mission.evidence.senderDetail}
          </p>
        </div>
        <MessageCircle size={12} className="ml-auto shrink-0" style={{ color: NAVY.sub }} />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2 px-3 py-3 sm:px-4">
        <div className="max-w-[85%] rounded-lg rounded-tl-none px-2.5 py-2" style={{ background: NAVY.bubble, border: `1px solid ${NAVY.border}` }}>
          <p className="line-clamp-3 text-[0.58rem] leading-relaxed sm:text-[0.7rem]" style={{ color: NAVY.text }}>
            {mission.evidence.messageText}
          </p>
          {mission.evidence.hasAttachment && (
            <div className="mt-2 flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: '#0D1730', border: `1px solid ${NAVY.border}` }}>
              <FileCode2 size={13} className="shrink-0 text-[#FF6B00]" />
              <p className="min-w-0 truncate font-mono text-[0.55rem] font-semibold sm:text-[0.65rem]" style={{ color: NAVY.text }}>
                {mission.evidence.attachmentName}
              </p>
            </div>
          )}
          {mission.evidence.linkUrl && (
            <div className="mt-2 flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: '#0D1730', border: `1px solid ${NAVY.border}` }}>
              <Link2 size={13} className="shrink-0 text-[#FF6B00]" />
              <p className="min-w-0 truncate font-mono text-[0.55rem] sm:text-[0.65rem]" style={{ color: NAVY.text }}>
                {mission.evidence.linkUrl}
              </p>
            </div>
          )}
        </div>
      </div>
    </Row>
  );
}

function SmsScene({ mission }: { mission: CaseMission }) {
  return (
    <Row bg="linear-gradient(180deg, #14233F 0%, #0B141B 100%)">
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: NAVY.bar }}>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: NAVY.border }}>
          <Smartphone size={13} style={{ color: NAVY.sub }} />
        </span>
        <p className="truncate font-mono text-[0.62rem] font-bold sm:text-[0.7rem]" style={{ color: NAVY.text }}>
          {mission.evidence.senderName}
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center px-3 py-3 sm:px-4">
        <div className="rounded-xl px-3 py-2.5" style={{ background: NAVY.bubble, border: `1px solid ${NAVY.border}` }}>
          <p className="line-clamp-4 text-[0.6rem] leading-relaxed sm:text-[0.72rem]" style={{ color: NAVY.text }}>
            {mission.evidence.messageText}
          </p>
          <p className="mt-1.5 text-right font-mono text-[0.5rem] sm:text-[0.56rem]" style={{ color: NAVY.sub }}>
            {mission.evidence.senderDetail}
          </p>
        </div>
      </div>
    </Row>
  );
}

function CallScene({ mission }: { mission: CaseMission }) {
  return (
    <Row bg="linear-gradient(180deg, #14233F 0%, #0B141B 100%)">
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
        <Avatar mission={mission} />
        <div>
          <p className="text-[0.8rem] font-bold sm:text-[0.9rem]" style={{ color: NAVY.text }}>
            {mission.evidence.senderName}
          </p>
          <p className="font-mono text-[0.55rem] sm:text-[0.62rem]" style={{ color: NAVY.sub }}>
            {mission.evidence.senderDetail}
          </p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full" style={{ background: NAVY.border }}>
          <PhoneCall size={14} style={{ color: '#FF6B00' }} />
        </span>
      </div>
    </Row>
  );
}

function BrowserScene({ mission }: { mission: CaseMission }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#F3F6FA]">
      <div className="flex items-center gap-2 border-b border-[#D8DDE8] bg-white px-2.5 py-1.5">
        <span className="flex shrink-0 gap-1" aria-hidden>
          <i className="block h-2 w-2 rounded-full bg-[#FF7A00]" />
          <i className="block h-2 w-2 rounded-full bg-[#FACC15]" />
          <i className="block h-2 w-2 rounded-full bg-[#94A3B8]" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded border border-[#D8DDE8] bg-[#F3F6FA] px-2 py-0.5">
          <Lock size={9} className="shrink-0 text-[#FF7A00]" />
          <span className="truncate font-mono text-[0.52rem] sm:text-[0.6rem]" style={{ color: '#B04A00' }}>
            {mission.evidence.linkUrl ?? mission.evidence.senderName}
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-1 rounded bg-[#FFE8DB] px-1.5 py-0.5 text-[0.5rem] font-bold text-[#B04A00] sm:flex">
          TIDAK AMAN
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-4 py-3" style={{ background: NAVY.bar }}>
        <p className="text-[0.55rem] font-bold uppercase tracking-[0.16em] text-[#FF6B00]">{mission.category}</p>
        <p className="line-clamp-2 text-center text-[0.78rem] font-extrabold leading-tight text-[#FFB794] sm:text-[0.9rem]">
          {mission.title}
        </p>
        <p className="text-[0.52rem] text-[#9AA6BD] sm:text-[0.6rem]">Jangan buru-buru ikuti instruksinya.</p>
      </div>
    </div>
  );
}

const SCENES: Record<CaseMission['evidence']['type'], (props: { mission: CaseMission }) => React.ReactElement> = {
  whatsapp: WhatsappScene,
  sms: SmsScene,
  call: CallScene,
  browser: BrowserScene,
};

export function MissionCover({ mission, className = '' }: { mission: CaseMission; className?: string }) {
  const Scene = SCENES[mission.evidence.type] ?? WhatsappScene;
  return (
    <div className={`relative overflow-hidden bg-[#0B141B] ${className}`.trim()} aria-hidden>
      <Scene mission={mission} />
    </div>
  );
}

export default MissionCover;