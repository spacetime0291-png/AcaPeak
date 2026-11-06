import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const trackerPath = path.join(rootDir, 'data', 'curriculum_tracker.json');

const lbeItems = [
  // ==========================================
  // BAB 1: MACRO-SKILLS & GLOBAL COMPREHENSION (PEMAHAMAN MAKRO WACANA)
  // ==========================================
  // 1.1. Topic, Main Idea, and Best Title
  {
    id: "lbe-1.1.1",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.1",
    subchapter_title: "Topic, Main Idea, and Best Title",
    title: "Identifying the Topic / Subject Matter of the Passage",
    micro_syllabus_scope: [
      "Menentukan frasa benda (noun phrase) yang menjadi payung pembahasan seluruh paragraf (What is the passage mainly about?).",
      "Menghindari jebakan opsi yang terlalu sempit (too specific/supporting detail) atau terlalu luas (too general/beyond the scope)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.1.1.json"
  },
  {
    id: "lbe-1.1.2",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.1",
    subchapter_title: "Topic, Main Idea, and Best Title",
    title: "Main Idea of the Passage vs Main Idea of a Specific Paragraph",
    micro_syllabus_scope: [
      "Teknik membaca kalimat pertama (topic sentence) dan kalimat terakhir (concluding sentence) dari setiap paragraf.",
      "Mengidentifikasi pergeseran gagasan jika terdapat kata hubung pertentangan di kalimat kedua (However, Yet, Nevertheless, In contrast)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.1.2.json"
  },
  {
    id: "lbe-1.1.3",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.1",
    subchapter_title: "Topic, Main Idea, and Best Title",
    title: "Determining the Best Title",
    micro_syllabus_scope: [
      "Syarat judul akademik yang tepat: singkat, mencerminkan topik utama + fokus sudut pandang penulis, dan tidak bersifat sensasional di luar isi teks."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.1.3.json"
  },

  // 1.2. Author's Purpose and Primary Objective
  {
    id: "lbe-1.2.1",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.2",
    subchapter_title: "Author's Purpose and Primary Objective",
    title: "Overall Purpose of the Text",
    micro_syllabus_scope: [
      "Membedakan kata kerja tujuan (to inform, to explain, to describe, to compare, to argue/persuade, to criticize, to refute/challenge a view, to warn, to propose a solution)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.2.1.json"
  },
  {
    id: "lbe-1.2.2",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.2",
    subchapter_title: "Author's Purpose and Primary Objective",
    title: "Rhetorical Function of Specific Sentences or Paragraphs",
    micro_syllabus_scope: [
      "Menjawab pertanyaan tipe: Why does the author mention X in paragraph 2?",
      "Fungsi retoris: memberikan contoh konkret (to provide an illustration), mendukung klaim sebelumnya (to support the argument), menyajikan bukti empiris, atau menunjukkan pengecualian (to point out an exception)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.2.2.json"
  },

  // 1.3. Text Organization, Coherence, and Paragraph Transition
  {
    id: "lbe-1.3.1",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.3",
    subchapter_title: "Text Organization, Coherence, and Paragraph Transition",
    title: "Preceding and Following Paragraphs",
    micro_syllabus_scope: [
      "Preceding Paragraph (What did the paragraph preceding the passage most likely discuss?): menganalisis kalimat pertama Paragraf 1 dan mencari konsep pengantar sebelum masuk ke topik kalimat pertama tersebut.",
      "Following Paragraph (What will the paragraph following the passage most likely discuss?): menganalisis kalimat terakhir dari paragraf paling akhir sebagai jembatan menuju topik selanjutnya."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.3.1.json"
  },
  {
    id: "lbe-1.3.2",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.3",
    subchapter_title: "Text Organization, Coherence, and Paragraph Transition",
    title: "Organizational Patterns of Paragraphs",
    micro_syllabus_scope: [
      "Mengenali pola penyusunan ide: Chronological Order (urutan waktu), Cause and Effect (sebab-akibat), Problem and Solution, Comparison and Contrast, Classification/Listing, serta Claim and Counterclaim."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.3.2.json"
  },
  {
    id: "lbe-1.3.3",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.3",
    subchapter_title: "Text Organization, Coherence, and Paragraph Transition",
    title: "Sentence Insertion and Coherence",
    micro_syllabus_scope: [
      "Menentukan posisi paling logis untuk menyisipkan kalimat baru ke dalam paragraf berdasarkan petunjuk pronoun, transition words, dan alur gagasan."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.3.3.json"
  },

  // 1.4. Summary and Synthesis of the Passage
  {
    id: "lbe-1.4.1",
    subtest: "LBE",
    chapter_num: 1,
    chapter_title: "Macro-Skills & Global Comprehension (Pemahaman Makro Wacana)",
    subchapter_num: "1.4",
    subchapter_title: "Summary and Synthesis of the Passage",
    title: "Selecting the Best Summary",
    micro_syllabus_scope: [
      "Menyusun ringkasan komprehensif yang merangkum poin inti Paragraf 1, 2, 3, dst. secara proporsional.",
      "Mengeliminasi opsi yang hanya menyalin satu detail minor atau menyertakan opini pribadi yang tidak ada di teks."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-1.4.1.json"
  },

  // ==========================================
  // BAB 2: MICRO-SKILLS, DETAILS, & LEXICAL PRECISION (PEMAHAMAN DETAIL & BAHASA)
  // ==========================================
  // 2.1. Stated and Unstated Details (Informasi Tersurat)
  {
    id: "lbe-2.1.1",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.1",
    subchapter_title: "Stated and Unstated Details (Informasi Tersurat)",
    title: "Stated Detail Questions (Positive Factual Information)",
    micro_syllabus_scope: [
      "Teknik keyword scanning (mencari nama, tanggal, istilah ilmiah, lokasi) lalu membaca 1 kalimat sebelum dan sesudah kata kunci tersebut.",
      "Mencocokkan informasi di dalam teks dengan opsi jawaban yang menggunakan sinonim atau struktur kalimat berbeda."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.1.1.json"
  },
  {
    id: "lbe-2.1.2",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.1",
    subchapter_title: "Stated and Unstated Details (Informasi Tersurat)",
    title: "Unstated Detail / Negative Factual Questions (NOT / EXCEPT / FALSE)",
    micro_syllabus_scope: [
      "Menemukan 1 pernyataan yang salah atau tidak disebutkan di dalam teks di antara 4 pernyataan yang benar.",
      "Mewaspadai distorsi kuantitas (all, never, only, completely, most, less vs more) dan pembalikan subjek-objek."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.1.2.json"
  },
  {
    id: "lbe-2.1.3",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.1",
    subchapter_title: "Stated and Unstated Details (Informasi Tersurat)",
    title: "Who, Where, and When Identification",
    micro_syllabus_scope: [
      "Mengelompokkan pernyataan berdasarkan tokoh/peneliti yang mengemukakannya di dalam teks."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.1.3.json"
  },

  // 2.2. Restatement and Paraphrasing (Kalimat Sama Makna)
  {
    id: "lbe-2.2.1",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.2",
    subchapter_title: "Restatement and Paraphrasing (Kalimat Sama Makna)",
    title: "Deconstructing Complex Academic Sentences",
    micro_syllabus_scope: [
      "Membedah struktur kalimat panjang yang memuat relative clauses (which, that, who), participle phrases (V-ing / V3), dan subordinate clauses menjadi Core Subject + Core Verb + Core Object."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.2.1.json"
  },
  {
    id: "lbe-2.2.2",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.2",
    subchapter_title: "Restatement and Paraphrasing (Kalimat Sama Makna)",
    title: "Identifying Equivalent Logical Relations in Restatement",
    micro_syllabus_scope: [
      "Mengubah bentuk Active ↔ Passive, Cause ↔ Effect (because of A, B happens ≡ A leads to B), Conditional/Unless (unless A ≡ if not A), dan Concessive (although/despite) tanpa mengubah makna esensial kalimat asli."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.2.2.json"
  },

  // 2.3. Vocabulary in Context and Idiomatic Expressions
  {
    id: "lbe-2.3.1",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.3",
    subchapter_title: "Vocabulary in Context and Idiomatic Expressions",
    title: "Structural and Contextual Clues",
    micro_syllabus_scope: [
      "Definition/Explanation Clues: petunjuk makna melalui koma aposisi, tanda pisah (—), atau kata or, that is, namely, i.e., such as.",
      "Contrast/Antonym Clues: petunjuk makna melalui kata pertentangan (unlike, whereas, while, however, instead of, rather than).",
      "Cause-and-Effect & Parallelism Clues: menebak arti kata sukar dari konsekuensi kalimat atau kesejajaran kata sifat/kerja di sekitarnya."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.3.1.json"
  },
  {
    id: "lbe-2.3.2",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.3",
    subchapter_title: "Vocabulary in Context and Idiomatic Expressions",
    title: "Polysemy (Multiple-Meaning Words in Academic Context)",
    micro_syllabus_scope: [
      "Menentukan makna kata umum yang memiliki arti khusus dalam teks ilmiah (misal: kata address, state, table, reservations, novel, sound, current, plant, faculty, yield, discipline)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.3.2.json"
  },
  {
    id: "lbe-2.3.3",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.3",
    subchapter_title: "Vocabulary in Context and Idiomatic Expressions",
    title: "Word Formation (Affixation & Roots)",
    micro_syllabus_scope: [
      "Menganalisis prefiks negatif/arah (un-, in-, dis-, mis-, counter-, over-, under-, sub-, inter-) dan sufiks penanda kelas kata (-tion, -ment, -ity, -ive, -ous, -al, -ize, -ify)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.3.3.json"
  },

  // 2.4. Referents (Pronoun and Demonstrative Reference)
  {
    id: "lbe-2.4.1",
    subtest: "LBE",
    chapter_num: 2,
    chapter_title: "Micro-Skills, Details, & Lexical Precision (Pemahaman Detail & Bahasa)",
    subchapter_num: "2.4",
    subchapter_title: "Referents (Pronoun and Demonstrative Reference)",
    title: "Tracking Backward and Forward References",
    micro_syllabus_scope: [
      "Menentukan acuan kata ganti subjek/objek/posesif (it, its, they, them, their, this, that, these, those, such, one, ones, the former, the latter, which).",
      "Uji kesesuaian jumlah (singular vs plural) dan uji substitusi langsung ke dalam kalimat untuk memastikan kelogisan makna."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-2.4.1.json"
  },

  // ==========================================
  // BAB 3: CRITICAL READING, INFERENCE, & PRAGMATICS (PENALARAN KRITIS)
  // ==========================================
  // 3.1. Inference, Implication, and Prediction
  {
    id: "lbe-3.1.1",
    subtest: "LBE",
    chapter_num: 3,
    chapter_title: "Critical Reading, Inference, & Pragmatics (Penalaran Kritis)",
    subchapter_num: "3.1",
    subchapter_title: "Inference, Implication, and Prediction",
    title: "Drawing Logical Inferences (It can be inferred / implied / concluded that...)",
    micro_syllabus_scope: [
      "Menarik kesimpulan yang pasti terdukung oleh fakta teks (bukan spekulasi liar di luar teks).",
      "Menggabungkan dua premis faktual di dalam bacaan untuk menghasilkan satu deduksi logis (termasuk inferensi kuantitatif/perbandingan proporsi)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-3.1.1.json"
  },
  {
    id: "lbe-3.1.2",
    subtest: "LBE",
    chapter_num: 3,
    chapter_title: "Critical Reading, Inference, & Pragmatics (Penalaran Kritis)",
    subchapter_num: "3.1",
    subchapter_title: "Inference, Implication, and Prediction",
    title: "Hypothetical and Predictive Questions",
    micro_syllabus_scope: [
      "Memprediksi dampak yang akan terjadi jika suatu kondisi di dalam teks diubah (What would happen if X were removed?)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-3.1.2.json"
  },

  // 3.2. Author's Tone, Attitude, and Stance
  {
    id: "lbe-3.2.1",
    subtest: "LBE",
    chapter_num: 3,
    chapter_title: "Critical Reading, Inference, & Pragmatics (Penalaran Kritis)",
    subchapter_num: "3.2",
    subchapter_title: "Author's Tone, Attitude, and Stance",
    title: "Classification of Author's Tone and Attitude",
    micro_syllabus_scope: [
      "Neutral / Objective Tone: informative, objective, neutral, detached, matter-of-fact, analytical, explanatory (khas artikel ensiklopedia/sains murni).",
      "Positive / Supportive Tone: optimistic, enthusiastic, appreciative, admiring, supportive, hopeful, encouraging.",
      "Negative / Critical Tone: critical, skeptical, pessimistic, concerned, alarmed, disapproving, cautious, cynical, ironic, sarcastic."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-3.2.1.json"
  },
  {
    id: "lbe-3.2.2",
    subtest: "LBE",
    chapter_num: 3,
    chapter_title: "Critical Reading, Inference, & Pragmatics (Penalaran Kritis)",
    subchapter_num: "3.2",
    subchapter_title: "Author's Tone, Attitude, and Stance",
    title: "Identifying Lexical Indicators of Attitude",
    micro_syllabus_scope: [
      "Mendeteksi kata sifat, adverbia, dan modalitas yang menunjukkan emosi/keberpihakan penulis (unfortunately, alarmingly, remarkably, promising, dubious, mere, allegedly)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-3.2.2.json"
  },

  // 3.3. Fact vs Opinion, Assumptions, and Target Audience
  {
    id: "lbe-3.3.1",
    subtest: "LBE",
    chapter_num: 3,
    chapter_title: "Critical Reading, Inference, & Pragmatics (Penalaran Kritis)",
    subchapter_num: "3.3",
    subchapter_title: "Fact vs Opinion, Assumptions, and Target Audience",
    title: "Distinguishing Fact from Opinion in English Texts",
    micro_syllabus_scope: [
      "Membedakan pernyataan empiris yang dapat dibuktikan (verifiable data, historical dates, research findings) vs klaim subjektif (value judgments, predictions, modal verbs should/ought to/might)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-3.3.1.json"
  },
  {
    id: "lbe-3.3.2",
    subtest: "LBE",
    chapter_num: 3,
    chapter_title: "Critical Reading, Inference, & Pragmatics (Penalaran Kritis)",
    subchapter_num: "3.3",
    subchapter_title: "Fact vs Opinion, Assumptions, and Target Audience",
    title: "Identifying Unstated Assumptions",
    micro_syllabus_scope: [
      "Menemukan asumsi dasar yang harus benar agar argumen penulis di dalam teks menjadi valid."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-3.3.2.json"
  },
  {
    id: "lbe-3.3.3",
    subtest: "LBE",
    chapter_num: 3,
    chapter_title: "Critical Reading, Inference, & Pragmatics (Penalaran Kritis)",
    subchapter_num: "3.3",
    subchapter_title: "Fact vs Opinion, Assumptions, and Target Audience",
    title: "Determining Source of the Text, Field of Study, and Target Audience",
    micro_syllabus_scope: [
      "Memprediksi dari mana kutipan teks berasal (scientific journal, newspaper editorial, textbook, travel blog, medical brochure) dan siapa target pembacanya."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-3.3.3.json"
  },

  // ==========================================
  // BAB 4: MULTI-TEXT SYNTHESIS, FORUM THREADS, & INFOGRAPHICS (FORMAT KHUSUS SNBT)
  // ==========================================
  // 4.1. Online Discussion Threads / Opinion Forums (Format Khas LBE SNBT)
  {
    id: "lbe-4.1.1",
    subtest: "LBE",
    chapter_num: 4,
    chapter_title: "Multi-Text Synthesis, Forum Threads, & Infographics (Format Khusus SNBT)",
    subchapter_num: "4.1",
    subchapter_title: "Online Discussion Threads / Opinion Forums (Format Khas LBE SNBT)",
    title: "Mapping Commenters' Stances (Pro, Contra, Neutral, Conditional)",
    micro_syllabus_scope: [
      "Mengidentifikasi posisi masing-masing akun/komentator (misal: Post 1 to Post 6) terhadap topik pertanyaan utama di awal thread.",
      "Menentukan siapa yang setuju penuh, setuju dengan syarat, menolak/tidak setuju, atau memberikan solusi alternatif."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-4.1.1.json"
  },
  {
    id: "lbe-4.1.2",
    subtest: "LBE",
    chapter_num: 4,
    chapter_title: "Multi-Text Synthesis, Forum Threads, & Infographics (Format Khusus SNBT)",
    subchapter_num: "4.1",
    subchapter_title: "Online Discussion Threads / Opinion Forums (Format Khas LBE SNBT)",
    title: "Analyzing Interactions Between Commenters",
    micro_syllabus_scope: [
      "Menentukan akun mana yang merespons, mendukung, menyanggah, atau memberikan bukti tambahan terhadap opini akun lainnya (Who directly contradicts X's opinion?)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-4.1.2.json"
  },
  {
    id: "lbe-4.1.3",
    subtest: "LBE",
    chapter_num: 4,
    chapter_title: "Multi-Text Synthesis, Forum Threads, & Infographics (Format Khusus SNBT)",
    subchapter_num: "4.1",
    subchapter_title: "Online Discussion Threads / Opinion Forums (Format Khas LBE SNBT)",
    title: "Evaluating Relevance and Tone of Posts",
    micro_syllabus_scope: [
      "Menentukan komentar siapa yang paling relevan, paling objektif/berbasis data, paling emosional/subjektif, atau justru off-topic (tidak menjawab pertanyaan pemantik)."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-4.1.3.json"
  },
  {
    id: "lbe-4.1.4",
    subtest: "LBE",
    chapter_num: 4,
    chapter_title: "Multi-Text Synthesis, Forum Threads, & Infographics (Format Khusus SNBT)",
    subchapter_num: "4.1",
    subchapter_title: "Online Discussion Threads / Opinion Forums (Format Khas LBE SNBT)",
    title: "Synthesizing the Thread Discussion",
    micro_syllabus_scope: [
      "Menarik benang merah atau kesimpulan akhir dari keseluruhan diskusi di dalam forum thread."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-4.1.4.json"
  },

  // 4.2. Paired Passages (Text 1 and Text 2 Comparison)
  {
    id: "lbe-4.2.1",
    subtest: "LBE",
    chapter_num: 4,
    chapter_title: "Multi-Text Synthesis, Forum Threads, & Infographics (Format Khusus SNBT)",
    subchapter_num: "4.2",
    subchapter_title: "Paired Passages (Text 1 and Text 2 Comparison)",
    title: "Identifying the Relationship Between Two Texts",
    micro_syllabus_scope: [
      "Pola hubungan Teks 1 dan Teks 2: Cause and Effect, General Theory and Specific Case Study, Problem and Solution, Supporting View and Opposing View, atau Complementary Perspectives."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-4.2.1.json"
  },
  {
    id: "lbe-4.2.2",
    subtest: "LBE",
    chapter_num: 4,
    chapter_title: "Multi-Text Synthesis, Forum Threads, & Infographics (Format Khusus SNBT)",
    subchapter_num: "4.2",
    subchapter_title: "Paired Passages (Text 1 and Text 2 Comparison)",
    title: "Cross-Text Synthesis and Shared Ideas",
    micro_syllabus_scope: [
      "Menemukan klaim yang disepakati oleh kedua penulis (Both passages agree that...) vs klaim yang hanya ada di salah satu teks.",
      "Memprediksi bagaimana penulis Teks 1 akan merespons argumen di Teks 2."
    ],
    requires_svg: false,
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-4.2.2.json"
  },

  // 4.3. Multimodal Texts (Tables, Charts, Diagrams, and Infographics in English)
  {
    id: "lbe-4.3.1",
    subtest: "LBE",
    chapter_num: 4,
    chapter_title: "Multi-Text Synthesis, Forum Threads, & Infographics (Format Khusus SNBT)",
    subchapter_num: "4.3",
    subchapter_title: "Multimodal Texts (Tables, Charts, Diagrams, and Infographics in English)",
    title: "Integrating Visual Data with Reading Passages",
    micro_syllabus_scope: [
      "Membaca tren grafik (upward trend, downward trend, fluctuation, plateau, peak, sharpest decline) dan mencocokkannya dengan klaim di dalam paragraf bahasa Inggris.",
      "Menarik kesimpulan akurat yang menggabungkan informasi teks dan angka pada tabel/infografis."
    ],
    requires_svg: true, // Visual data: chart / infographic in English
    material_status: "pending",
    output_path: "/content/utbk/lbe/lbe-4.3.1.json"
  }
];

// Read existing tracker data
let trackerData = { items: [] };
if (fs.existsSync(trackerPath)) {
  try {
    const raw = fs.readFileSync(trackerPath, 'utf8');
    trackerData = JSON.parse(raw);
    if (!Array.isArray(trackerData.items)) {
      trackerData.items = [];
    }
  } catch (err) {
    console.warn('Gagal membaca tracker.');
    trackerData = { items: [] };
  }
}

// Preserve existing items not belonging to LBE, and merge LBE items
const nonLbeItems = trackerData.items.filter(item => item.subtest !== 'LBE');
const mergedItems = [...nonLbeItems, ...lbeItems];

trackerData.items = mergedItems;

fs.writeFileSync(trackerPath, JSON.stringify(trackerData, null, 2), 'utf8');

// Summary statistics calculation
const chapters = new Set(lbeItems.map(item => item.chapter_num));
const subchapters = new Set(lbeItems.map(item => `${item.chapter_num}.${item.subchapter_num}`));
const totalSubMaterials = lbeItems.length;
const requiresSvgCount = lbeItems.filter(item => item.requires_svg).length;

console.log(`✅ Berhasil memproses subtes LBE!`);
console.log(`- Jumlah Bab: ${chapters.size}`);
console.log(`- Jumlah Sub-bab: ${subchapters.size}`);
console.log(`- Total Sub-materi: ${totalSubMaterials}`);
console.log(`- Sub-materi memerlukan SVG: ${requiresSvgCount}`);
console.log(`- Total seluruh item di tracker sekarang: ${trackerData.items.length}`);
