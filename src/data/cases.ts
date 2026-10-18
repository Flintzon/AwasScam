export interface CaseHotspot {
  id: string;
  targetArea: string;
  name: string;
  explanation: string;
  points: number;
}

export interface DecisionChoice {
  id: string;
  label: string;
  isCorrect: boolean;
  outcomeText: string;
  feedbackTitle: string;
}

export interface CaseMission {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  objective: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  duration: string;
  category: string;
  isBoss?: boolean;
  xpReward: number;
  skills: string[];
  hint: string;
  evidence: {
    type: 'whatsapp' | 'sms' | 'call' | 'browser';
    senderName: string;
    senderDetail: string;
    avatarInitials: string;
    avatarBg: string;
    messageText: string;
    hasAttachment?: boolean;
    attachmentName?: string;
    attachmentSize?: string;
    attachmentType?: string;
    linkUrl?: string;
    hotspots: CaseHotspot[];
  };
  decisionQuestion: string;
  choices: DecisionChoice[];
}

export const MISSIONS: CaseMission[] = [
  {
    id: 1,
    slug: 'paket-misterius',
    title: 'Misteri Kurir Paket File .APK',
    subtitle: 'Kasus 01 · Resi Ekspedisi Palsu',
    summary: 'Pesan kurir mendesak meminta Ibu memasang file APK untuk melihat foto resi dalam 10 menit.',
    objective: 'Temukan 3 kejanggalan fatal di pesan WhatsApp kurir dan batalkan pemasangan file berbahaya.',
    difficulty: 'Mudah',
    duration: '3–4 menit',
    category: 'Malware APK',
    xpReward: 100,
    skills: ['Membaca Ekstensi File', 'Mengenali Tekanan Waktu', 'Verifikasi WhatsApp Bisnis'],
    hint: 'Perhatikan baik-baik nama pengirim, kata-kata yang menakut-nakuti, dan format ujung nama filenya!',
    evidence: {
      type: 'whatsapp',
      senderName: 'Kurir J&T Gudang Pusat',
      senderDetail: '+62 895-3342-9912 (Akun Pribadi)',
      avatarInitials: 'J&T',
      avatarBg: '#EA580C',
      messageText:
        'Selamat siang Ibu. Paket tertahan di gudang karena alamat kurang jelas. MOHON SEGERA DIBUKA DALAM 10 MENIT atau paket dibakar/dikembalikan ke penjual!',
      hasAttachment: true,
      attachmentName: 'Lihat_Foto_Paket.pdf.apk',
      attachmentSize: '8,4 MB',
      attachmentType: 'File Instalasi Android (.apk)',
      hotspots: [
        {
          id: 'spot-sender',
          name: 'Nomor Pengirim Pribadi (+62 895)',
          targetArea: 'Nomor Kontak Pengirim',
          explanation:
            'Ekspedisi resmi menggunakan akun WhatsApp Bisnis Terverifikasi dengan Centang Hijau, bukan nomor prabayar biasa 0895!',
          points: 30,
        },
        {
          id: 'spot-urgency',
          name: 'Ancaman Waktu Panik (10 Menit)',
          targetArea: 'Teks Urgensi Batas Waktu',
          explanation:
            'Penipu sengaja membuatmu terburu-buru agar tidak sempat berpikir jernih atau bertanya ke keluarga.',
          points: 35,
        },
        {
          id: 'spot-apk',
          name: 'Ekstensi Ganda (.pdf.apk)',
          targetArea: 'Nama File Lampiran',
          explanation:
            'File berakhiran .apk adalah aplikasi Android pencuri SMS OTP perbankan! Foto asli selalu .jpg atau .png.',
          points: 35,
        },
      ],
    },
    decisionQuestion: 'Setelah menemukan bukti kejanggalan, apa tindakan terbaikmu untuk Ibu?',
    choices: [
      {
        id: 'A',
        label: 'Tolak & Hapus pesan, lalu lacak nomor resi mandiri di aplikasi/web resmi J&T.',
        isCorrect: true,
        feedbackTitle: 'Keputusan Sempurna!',
        outcomeText:
          'Luar biasa! Saldo tabungan Ibu aman. Nomor resi resmi selalu bisa dilacak langsung melalui aplikasi resmi tanpa perlu mengunduh file sembarangan.',
      },
      {
        id: 'B',
        label: 'Unduh dulu filenya untuk memastikan isinya benar-benar foto atau bukan.',
        isCorrect: false,
        feedbackTitle: 'Waduh, Sangat Berbahaya!',
        outcomeText:
          'Jangan pernah mengunduh file .apk! Begitu dipasang, malware langsung menyusup dan menyadap kode OTP bank di HP.',
      },
      {
        id: 'C',
        label: 'Balas chat kurir dengan mengirimkan foto KTP Ibu untuk verifikasi ulang.',
        isCorrect: false,
        feedbackTitle: 'Bahaya Pencurian Identitas!',
        outcomeText:
          'Jangan pernah memberikan data pribadi sensitif seperti KTP kepada nomor yang belum diverifikasi.',
      },
    ],
  },
  {
    id: 2,
    slug: 'undangan-pernikahan-apk',
    title: 'Undangan Pernikahan Digital Palsu',
    subtitle: 'Kasus 02 · Social Engineering Kerabat',
    summary: 'Nomor baru mengaku teman lama mengirimkan undangan nikah berbentuk file Surat_Undangan.apk.',
    objective: 'Bongkar penyamaran aplikasi jahat yang bersembunyi di balik acara syukuran keluarga.',
    difficulty: 'Mudah',
    duration: '3–5 menit',
    category: 'Malware APK',
    xpReward: 100,
    skills: ['Cek Identitas Pengirim', 'Waspada Lampiran APK', 'Verifikasi Panggilan Telepon'],
    hint: 'Undangan digital asli biasanya berupa tautan website atau gambar, bukan file aplikasi Android!',
    evidence: {
      type: 'whatsapp',
      senderName: 'Teman Kuliah (Rangga)',
      senderDetail: '+62 812-9081-4433 (Nomor Baru)',
      avatarInitials: 'RN',
      avatarBg: '#0284C7',
      messageText:
        'Halo sobat! Maaf pakai nomor baru ya. Insya Allah minggu depan aku mau nikahan nih. Mohon doa restunya, surat undangannya aku kirim di bawah ya. Wajib hadir!',
      hasAttachment: true,
      attachmentName: 'Surat_Undangan_Digital_Rangga.apk',
      attachmentSize: '6,2 MB',
      attachmentType: 'Aplikasi Android (.apk)',
      hotspots: [
        {
          id: 'spot-unknown',
          name: 'Mengaku Teman dari Nomor Baru',
          targetArea: 'Profil Pengirim Asing',
          explanation:
            'Penipu sering mengambil foto teman dari media sosial untuk meyakinkan korban agar percaya.',
          points: 30,
        },
        {
          id: 'spot-format',
          name: 'Format Undangan Berkas .APK',
          targetArea: 'Nama File Undangan',
          explanation:
            'Tidak ada orang yang menyebarkan undangan nikah dalam bentuk program aplikasi (.apk). Ini murni virus trojan!',
          points: 40,
        },
        {
          id: 'spot-pressure',
          name: 'Memancing Rasa Penasaran',
          targetArea: 'Teks Ajakan Wajib Hadir',
          explanation:
            'Memanfaatkan kedekatan sosial dan rasa sungkan agar korban buru-buru mengklik tanpa curiga.',
          points: 30,
        },
      ],
    },
    decisionQuestion: 'Temanmu mengirim file APK tersebut. Apa langkah pertamamu?',
    choices: [
      {
        id: 'A',
        label: 'Telepon langsung nomor lama Rangga yang tersimpan di kontakmu untuk konfirmasi.',
        isCorrect: true,
        feedbackTitle: 'Naluri Detektif Cerdas!',
        outcomeText:
          'Tepat sekali! Saat ditelepon, Rangga asli kaget karena dia tidak menikah minggu depan. Nomor tersebut murni penipu!',
      },
      {
        id: 'B',
        label: 'Buka dan pasang aplikasinya karena tidak enak menolak undangan teman.',
        isCorrect: false,
        feedbackTitle: 'Terperangkap Rasa Sungkan!',
        outcomeText:
          'Penipu mengandalkan rasa sungkanmu. Begitu diinstall, aplikasi akan menguras kontak dan saldo mobile banking!',
      },
      {
        id: 'C',
        label: 'Teruskan undangan tersebut ke grup WhatsApp reuni kampus.',
        isCorrect: false,
        feedbackTitle: 'Penyebaran Virus!',
        outcomeText:
          'Meneruskan file berbahaya akan membahayakan teman-teman sekelas lainnya. Selalu verifikasi sebelum menyebarkan.',
      },
    ],
  },
  {
    id: 3,
    slug: 'mama-minta-transfer',
    title: 'Telepon Panik: "Transfer Darurat Anak"',
    subtitle: 'Kasus 03 · Penipuan Mengatasnamakan Kerabat',
    summary: 'Pesan panik mengatasnamakan anak yang mengaku ditahan di kantor polisi dan butuh transfer segera.',
    objective: 'Patahkan skenario manipulasi emosi keluarga dengan trik verifikasi 3 detik.',
    difficulty: 'Sedang',
    duration: '4–5 menit',
    category: 'Impersonation Scam',
    xpReward: 120,
    skills: ['Kontrol Emosi Panik', 'Verifikasi Multi-Kanal', 'Cek Rekening Penerima'],
    hint: 'Bila ada keluarga meminta transfer ke rekening orang lain secara darurat, selalu minta Video Call!',
    evidence: {
      type: 'whatsapp',
      senderName: 'Anak Tertua (Dimas)',
      senderDetail: '+62 878-1122-8899 (Nomor Darurat)',
      avatarInitials: 'DM',
      avatarBg: '#7C3AED',
      messageText:
        'Mah, ini Dimas pinjam HP teman. HP Dimas disita polisi karena ada razia di jalan. Tolong transfer 2 juta sekarang juga ke rekening Bripka Joko (Bank BCA 8820-192-111) biar Dimas bisa pulang! Jangan telepon ke sini lagi diperiksa!',
      hotspots: [
        {
          id: 'spot-rekening',
          name: 'Rekening Atas Nama Pribadi Asing',
          targetArea: 'Nomor Rekening Tujuan',
          explanation:
            'Aparat kepolisian resmi TIDAK PERNAH meminta uang tebusan tilang atau uang damai ke rekening perorangan.',
          points: 35,
        },
        {
          id: 'spot-larangan-telpon',
          name: 'Larangan Melakukan Panggilan Telepon',
          targetArea: 'Instruksi "Jangan Telepon"',
          explanation:
            'Penipu takut suaranya ketahuan berbeda dengan anak aslimu, sehingga melarang korban menelepon.',
          points: 35,
        },
        {
          id: 'spot-drama-panik',
          name: 'Cerita Ekstrem Menimbulkan Syok',
          targetArea: 'Klaim Razia & Penahanan Polisi',
          explanation:
            'Membuat orang tua panik agar insting perlindungan mengalahkan logika pemeriksa fakta.',
          points: 30,
        },
      ],
    },
    decisionQuestion: 'Anakmu dikabarkan ditahan polisi dan minta uang segera. Apa tindakanmu?',
    choices: [
      {
        id: 'A',
        label: 'Tarik napas, abaikan ancaman, lalu hubungi nomor anakmu atau telepon teman dekatnya.',
        isCorrect: true,
        feedbackTitle: 'Ketenangan Menyelamatkan!',
        outcomeText:
          'Hebat! Ternyata Dimas anakmu sedang aman di kampus dan HP-nya aktif. Skenario penipu langsung runtuh!',
      },
      {
        id: 'B',
        label: 'Langsung transfer 2 juta ke rekening Bripka Joko demi keselamatan anak.',
        isCorrect: false,
        feedbackTitle: 'Uang Melayang Sia-Sia!',
        outcomeText:
          'Uang 2 juta langsung ditarik penipu dari ATM dan nomor WhatsApp palsu tersebut langsung memblokir nomor Ibu.',
      },
      {
        id: 'C',
        label: 'Marah-marah di chat dan mentransfer setengahnya dulu (1 juta).',
        isCorrect: false,
        feedbackTitle: 'Tetap Mengalami Kerugian!',
        outcomeText:
          'Penipu tidak peduli berapa jumlahnya, setiap rupiah yang kamu kirimkan akan hilang tanpa ada anak yang tertahan.',
      },
    ],
  },
  {
    id: 4,
    slug: 'cs-bank-gadungan',
    title: 'Jebakan Undian Berhadiah & Link Bank Palsu',
    subtitle: 'Kasus 04 · Phishing Rekening & OTP',
    summary: 'SMS mengabarkan rekening akan dibekukan kecuali memverifikasi data di tautan website mencurigakan.',
    objective: 'Identifikasi tanda domain palsu (.xyz) dan tolak pembacaan kode OTP kepada siapa pun.',
    difficulty: 'Sedang',
    duration: '4–5 menit',
    category: 'Phishing Bank',
    xpReward: 120,
    skills: ['Membaca Domain Website', 'Melindungi Kode OTP', 'Mengenali Ancaman Blokir'],
    hint: 'Bank resmi selalu menggunakan domain .co.id dan tidak pernah meminta verifikasi password lewat SMS!',
    evidence: {
      type: 'sms',
      senderName: '+62 821-4455-8900',
      senderDetail: 'SMS dari Nomor Ponsel Biasa',
      avatarInitials: 'BCA',
      avatarBg: '#0369A1',
      messageText:
        'PERINGATAN: Rekening Anda terindikasi transaksi mencurigakan dan akan DIBLOKIR dalam 24 jam. Segera verifikasi data kartu ATM Anda melalui tautan resmi: https://bca-tarif-verifikasi.xyz/login untuk pembatalan denda.',
      linkUrl: 'https://bca-tarif-verifikasi.xyz/login',
      hotspots: [
        {
          id: 'spot-sms-number',
          name: 'SMS Dikirim dari Nomor HP Pribadi',
          targetArea: 'Nomor Pengirim SMS',
          explanation:
            'Bank resmi mengirimkan SMS broadcast menggunakan Sender ID Masking (misal: "BANK BCA"), bukan nomor +62 8xx.',
          points: 30,
        },
        {
          id: 'spot-domain-xyz',
          name: 'Ekstensi Domain Palsu (.xyz)',
          targetArea: 'Tautan URL Website',
          explanation:
            'Bank di Indonesia selalu menggunakan domain berakhiran .co.id (misal: bca.co.id), bukan .xyz atau .online!',
          points: 40,
        },
        {
          id: 'spot-ancaman-blokir',
          name: 'Ancaman Pemblokiran Sepihak',
          targetArea: 'Kalimat Batas Waktu 24 Jam',
          explanation:
            'Bank tidak akan memblokir rekening secara mendadak hanya karena nasabah tidak mengklik link SMS.',
          points: 30,
        },
      ],
    },
    decisionQuestion: 'Mendapat SMS ancaman blokir dan link verifikasi, apa responmu?',
    choices: [
      {
        id: 'A',
        label: 'Abaikan link, lalu telepon Customer Service resmi bank di nomor 1500888 (atau nomor di belakang kartu ATM).',
        isCorrect: true,
        feedbackTitle: 'Tepat & Sesuai Prosedur!',
        outcomeText:
          'CS bank resmi mengonfirmasi rekeningmu aman dan memastikan SMS tersebut adalah modus phishing massal.',
      },
      {
        id: 'B',
        label: 'Klik link tersebut dan masukkan nomor kartu ATM serta PIN agar tidak diblokir.',
        isCorrect: false,
        feedbackTitle: 'Data Kartu ATM Tercuri!',
        outcomeText:
          'Situs palsu tersebut langsung merekam nomor kartu, tanggal expired, dan PIN ATM untuk menguras isi rekening.',
      },
      {
        id: 'C',
        label: 'Balas SMS tersebut menanyakan nama lengkap petugas yang mengirimkan.',
        isCorrect: false,
        feedbackTitle: 'Membalas Penipu!',
        outcomeText:
          'Membalas SMS penipu menandakan nomormu aktif dan akan membuatmu menjadi target penipuan telepon berikutnya.',
      },
    ],
  },
  {
    id: 5,
    slug: 'freelance-kripto',
    title: 'Tawaran Kerja Paruh Waktu & Investasi Bodong',
    subtitle: 'Kasus 05 (Boss Level) · Jebakan Task Scam & Deposit',
    summary: 'Tawaran kerja online klik video YouTube dengan gaji 500 ribu/hari yang berujung permintaan deposit uang.',
    objective: 'Bongkar pola Task Scam (Skema Ponzi tugas online) sebelum terjebak mentransfer tabungan.',
    difficulty: 'Sulit',
    duration: '5–6 menit',
    category: 'Task Scam & Investasi Bodong',
    isBoss: true,
    xpReward: 180,
    skills: ['Mengenali Skema Ponzi', 'Kritis Terhadap Gaji Tidak Masuk Akal', 'Menolak Permintaan Deposit'],
    hint: 'Pekerjaan asli memberikan gaji kepada karyawan, BUKAN meminta karyawan menyetor uang deposit terlebih dahulu!',
    evidence: {
      type: 'whatsapp',
      senderName: 'HRD Global Media Talent',
      senderDetail: '+1 (555) 019-2834 (Nomor Luar Negeri)',
      avatarInitials: 'HR',
      avatarBg: '#059669',
      messageText:
        'Halo Kak! Kami dari Agensi Mitra YouTube membuka lowongan kerja freelance like & subscribe video. Komisi Rp 50.000 per 3 video, potensi Rp 500.000 - 2.000.000 per hari! Untuk mengambil tugas VIP berpenghasilan besar, silakan transfer deposit jaminan kerja Rp 1.500.000 ke akun bendahara kami.',
      hotspots: [
        {
          id: 'spot-unrealistic-pay',
          name: 'Penghasilan Tidak Masuk Akal',
          targetArea: 'Janji Gaji 2 Juta per Hari',
          explanation:
            'Hanya dengan like video tidak mungkin dibayar ratusan ribu rupiah. Ini umpan untuk menjerat korban.',
          points: 30,
        },
        {
          id: 'spot-deposit-scam',
          name: 'Syarat Membayar Uang Deposit Jaminan',
          targetArea: 'Permintaan Transfer 1,5 Juta',
          explanation:
            'Ciri utama penipuan lowongan kerja: pencari kerja malah disuruh mentransfer uang kepada perekrut!',
          points: 40,
        },
        {
          id: 'spot-overseas-number',
          name: 'Nomor Luar Negeri Mencurigakan (+1 USA)',
          targetArea: 'Kode Negara Pengirim',
          explanation:
            'Penipu menggunakan nomor virtual luar negeri untuk menghindari pelacakan aparat penegak hukum Indonesia.',
          points: 30,
        },
      ],
    },
    decisionQuestion: 'HRD tersebut meminta deposit 1,5 juta untuk membuka misi berpenghasilan besar. Responmu?',
    choices: [
      {
        id: 'A',
        label: 'Tolak mentah-mentah, laporkan nomor sebagai spam ke WhatsApp, dan blokir seketika.',
        isCorrect: true,
        feedbackTitle: 'Juara Detektif Sejati!',
        outcomeText:
          'Sempurna! Kamu baru saja mengalahkan Boss Level! Ribuan orang telah rugi puluhan juta rupiah karena skema deposit tugas ini.',
      },
      {
        id: 'B',
        label: 'Transfer deposit 1,5 juta karena mengira uang akan dikembalikan bersama gaji besar.',
        isCorrect: false,
        feedbackTitle: 'Terperosok Jebakan Deposit!',
        outcomeText:
          'Uang deposit 1,5 juta tidak pernah kembali. Penipu akan terus meminta deposit berikutnya hingga tabunganmu terkuras habis.',
      },
      {
        id: 'C',
        label: 'Kirim nomor rekeningmu dan minta agar uang deposit dipotong langsung dari gajimu nanti.',
        isCorrect: false,
        feedbackTitle: 'Memberikan Informasi Keuangan!',
        outcomeText:
          'Penipu akan menolak dan terus mendesak transfer uang tunai karena mereka tidak pernah berniat menggajimu.',
      },
    ],
  },
];

export const getMissionBySlug = (slug: string) => MISSIONS.find((m) => m.slug === slug);
export const getMissionById = (id: number) => MISSIONS.find((m) => m.id === id);

// Backward compatibility alias for any existing imports
export const CASES = MISSIONS;
export const getCaseBySlug = getMissionBySlug;
export const getCaseById = getMissionById;
export type CaseInfo = CaseMission;
