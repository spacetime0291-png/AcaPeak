export interface SmaTopic {
  id: string;
  topic_num: string;
  title: string;
  status: 'ready' | 'upcoming';
}

export interface SmaChapter {
  chapter_num: number;
  chapter_title: string;
  topics: SmaTopic[];
}

export interface SmaSubject {
  id: string;
  name: string;
  category: 'saintek' | 'soshum' | 'umum';
  grade: '10' | '11' | '12' | 'all';
  icon: string;
  color: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
  chapters: SmaChapter[];
}

export const SMA_SUBJECTS: SmaSubject[] = [
  {
    id: 'matematika-tl',
    name: 'Matematika Tingkat Lanjut',
    category: 'saintek',
    grade: '11',
    icon: 'Calculator',
    color: {
      bg: 'bg-indigo-50 hover:bg-indigo-100/80',
      text: 'text-indigo-900',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-700',
    },
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Polinomial (Suku Banyak)',
        topics: [
          { id: 'mat-tl-1.1', topic_num: '1.1', title: 'Teorema Sisa dan Teorema Faktor', status: 'ready' },
          { id: 'mat-tl-1.2', topic_num: '1.2', title: 'Operasi Aljabar Polinomial & Horner', status: 'ready' },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Matriks & Transformasi Geometri',
        topics: [
          { id: 'mat-tl-2.1', topic_num: '2.1', title: 'Determinan & Invers Matriks Ordo 3x3', status: 'upcoming' },
          { id: 'mat-tl-2.2', topic_num: '2.2', title: 'Komposisi Transformasi dengan Matriks', status: 'upcoming' },
        ],
      },
      {
        chapter_num: 3,
        chapter_title: 'Limit & Turunan Fungsi Trigonometri',
        topics: [
          { id: 'mat-tl-3.1', topic_num: '3.1', title: 'Limit Menuju Nol & Tak Hingga Trigonometri', status: 'upcoming' },
          { id: 'mat-tl-3.2', topic_num: '3.2', title: 'Aturan Rantai & Aplikasi Turunan Trigonometri', status: 'upcoming' },
        ],
      },
    ],
  },
  {
    id: 'fisika',
    name: 'Fisika',
    category: 'saintek',
    grade: 'all',
    icon: 'Atom',
    color: {
      bg: 'bg-sky-50 hover:bg-sky-100/80',
      text: 'text-sky-900',
      border: 'border-sky-200',
      badge: 'bg-sky-100 text-sky-700',
    },
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Kinematika & Dinamika Gerak',
        topics: [
          { id: 'fis-1.1', topic_num: '1.1', title: 'GLB, GLBB, dan Gerak Parabola', status: 'ready' },
          { id: 'fis-1.2', topic_num: '1.2', title: 'Hukum Newton & Analisis Gaya Gesek', status: 'ready' },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Usaha, Energi, & Momentum',
        topics: [
          { id: 'fis-2.1', topic_num: '2.1', title: 'Teorema Usaha-Energi & Hukum Kekekalan', status: 'upcoming' },
          { id: 'fis-2.2', topic_num: '2.2', title: 'Tumbukan & Impuls', status: 'upcoming' },
        ],
      },
      {
        chapter_num: 3,
        chapter_title: 'Termodinamika & Gelombang',
        topics: [
          { id: 'fis-3.1', topic_num: '3.1', title: 'Hukum Termodinamika & Siklus Carnot', status: 'upcoming' },
          { id: 'fis-3.2', topic_num: '3.2', title: 'Gelombang Bunyi & Efek Doppler', status: 'upcoming' },
        ],
      },
    ],
  },
  {
    id: 'kimia',
    name: 'Kimia',
    category: 'saintek',
    grade: 'all',
    icon: 'FlaskConical',
    color: {
      bg: 'bg-emerald-50 hover:bg-emerald-100/80',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-700',
    },
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Struktur Atom & Ikatan Kimia',
        topics: [
          { id: 'kim-1.1', topic_num: '1.1', title: 'Konfigurasi Elektron & Bilangan Kuantum', status: 'ready' },
          { id: 'kim-1.2', topic_num: '1.2', title: 'Ikatan Kovalen, Ionik, & Bentuk Molekul (VSEPR)', status: 'ready' },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Stoikiometri & Larutan Asam-Basa',
        topics: [
          { id: 'kim-2.1', topic_num: '2.1', title: 'Konsep Mol & Pereaksi Pembatas', status: 'upcoming' },
          { id: 'kim-2.2', topic_num: '2.2', title: 'Larutan Penyangga (Buffer) & Hidrolisis Garam', status: 'upcoming' },
        ],
      },
    ],
  },
  {
    id: 'biologi',
    name: 'Biologi',
    category: 'saintek',
    grade: 'all',
    icon: 'Dna',
    color: {
      bg: 'bg-teal-50 hover:bg-teal-100/80',
      text: 'text-teal-900',
      border: 'border-teal-200',
      badge: 'bg-teal-100 text-teal-700',
    },
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Biologi Sel & Metabolisme',
        topics: [
          { id: 'bio-1.1', topic_num: '1.1', title: 'Struktur Sel & Transpor Membran', status: 'ready' },
          { id: 'bio-1.2', topic_num: '1.2', title: 'Katabolisme Karbohidrat (Respirasi Aerob & Anaerob)', status: 'ready' },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Genetika & Pewarisan Sifat',
        topics: [
          { id: 'bio-2.1', topic_num: '2.1', title: 'Sintesis Protein (Transkripsi & Translasi)', status: 'upcoming' },
          { id: 'bio-2.2', topic_num: '2.2', title: 'Hukum Mendel & Pola-Pola Hereditas', status: 'upcoming' },
        ],
      },
    ],
  },
  {
    id: 'ekonomi',
    name: 'Ekonomi',
    category: 'soshum',
    grade: 'all',
    icon: 'TrendingUp',
    color: {
      bg: 'bg-amber-50 hover:bg-amber-100/80',
      text: 'text-amber-900',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-700',
    },
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Mekanisme Pasar & Elastisitas',
        topics: [
          { id: 'eko-1.1', topic_num: '1.1', title: 'Keseimbangan Permintaan & Penawaran', status: 'ready' },
          { id: 'eko-1.2', topic_num: '1.2', title: 'Elastisitas Harga & Pendapatan', status: 'ready' },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Kebijakan Fiskal & Moneter',
        topics: [
          { id: 'eko-2.1', topic_num: '2.1', title: 'Pendapatan Nasional & Indeks Harga', status: 'upcoming' },
          { id: 'eko-2.2', topic_num: '2.2', title: 'Instrumen Bank Sentral & Inflasi', status: 'upcoming' },
        ],
      },
    ],
  },
  {
    id: 'sosiologi',
    name: 'Sosiologi',
    category: 'soshum',
    grade: 'all',
    icon: 'Users',
    color: {
      bg: 'bg-rose-50 hover:bg-rose-100/80',
      text: 'text-rose-900',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-700',
    },
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Interaksi Sosial & Diferensiasi',
        topics: [
          { id: 'sos-1.1', topic_num: '1.1', title: 'Bentuk Interaksi & Lembaga Sosial', status: 'ready' },
          { id: 'sos-1.2', topic_num: '1.2', title: 'Stratifikasi & Diferensiasi Sosial', status: 'ready' },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Konflik Sosial & Perubahan Sosial',
        topics: [
          { id: 'sos-2.1', topic_num: '2.1', title: 'Resolusi Konflik & Kekerasan', status: 'upcoming' },
          { id: 'sos-2.2', topic_num: '2.2', title: 'Modernisasi, Globalisasi, & Kearifan Lokal', status: 'upcoming' },
        ],
      },
    ],
  },
  {
    id: 'geografi',
    name: 'Geografi',
    category: 'soshum',
    grade: 'all',
    icon: 'Globe',
    color: {
      bg: 'bg-purple-50 hover:bg-purple-100/80',
      text: 'text-purple-900',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-700',
    },
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Prinsip & Konsep Geografi',
        topics: [
          { id: 'geo-1.1', topic_num: '1.1', title: '4 Prinsip & 10 Konsep Esensial Geografi', status: 'ready' },
          { id: 'geo-1.2', topic_num: '1.2', title: 'Pemetaan, Penginderaan Jauh, & SIG', status: 'ready' },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Litosfer & Atmosfer',
        topics: [
          { id: 'geo-2.1', topic_num: '2.1', title: 'Tektonisme, Vulkanisme, & Seisme', status: 'upcoming' },
          { id: 'geo-2.2', topic_num: '2.2', title: 'Lapisan Atmosfer & Klasifikasi Iklim', status: 'upcoming' },
        ],
      },
    ],
  },
  {
    id: 'matematika-wajib',
    name: 'Matematika Wajib',
    category: 'umum',
    grade: 'all',
    icon: 'Binary',
    color: {
      bg: 'bg-blue-50 hover:bg-blue-100/80',
      text: 'text-blue-900',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-700',
    },
    chapters: [
      {
        chapter_num: 1,
        chapter_title: 'Eksponen, Logaritma, & Barisan',
        topics: [
          { id: 'mat-w-1.1', topic_num: '1.1', title: 'Sifat Operasi Eksponen & Logaritma', status: 'ready' },
          { id: 'mat-w-1.2', topic_num: '1.2', title: 'Barisan & Deret Aritmetika serta Geometri', status: 'ready' },
        ],
      },
      {
        chapter_num: 2,
        chapter_title: 'Fungsi Kuadrat & Statistika',
        topics: [
          { id: 'mat-w-2.1', topic_num: '2.1', title: 'Grafik Fungsi Kuadrat & Nilai Ekstrim', status: 'upcoming' },
          { id: 'mat-w-2.2', topic_num: '2.2', title: 'Ukuran Pemusatan & Penyebaran Data', status: 'upcoming' },
        ],
      },
    ],
  },
];
