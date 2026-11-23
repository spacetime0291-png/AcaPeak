/**
 * TypeScript Interfaces for Rangkuman Padat per Bab (Cheat Sheet 1 Teori = 1 Contoh)
 */

export interface RangkumanButir {
  judul: string;
  teori_singkat: string;
  contoh: string;
  // Aliases for backward compatibility
  judul_poin?: string;
  penjelasan_singkat?: string;
  contoh_penerapan?: string;
}

export interface RangkumanKelompok {
  nama_kelompok: string;
  butir: RangkumanButir[];
}

export interface RangkumanSubbab {
  kode_subbab: string;
  judul_subbab: string;
  klasifikasi_materi?: 'INTI' | 'PENGAYAAN' | string;
  inti_subbab: string;
  mode_tampilan?: 'katalog_kaidah' | 'katalog_rumus_sifat' | 'katalog_sinyal_pola' | string;
  label_kolom: {
    kolom_1: string;
    kolom_2: string;
  };
  kelompok: RangkumanKelompok[];
  // Backwards compatibility alias
  konsep_inti_markdown?: string;
}

export interface RangkumanBabData {
  kode_bab: string;
  subtes: string;
  bab: string;
  estimasi_menit_review: number;
  daftar_subbab: RangkumanSubbab[];
  jumlah_subbab?: number;
  batch_model?: string;
}

export interface RangkumanIndexSubbabItem {
  kode_subbab: string;
  judul_subbab: string;
  klasifikasi_materi?: string;
  mode_tampilan?: string;
}

export interface RangkumanIndexBabItem {
  kode_bab: string;
  bab: string;
  nama_bab?: string; // alias
  subtes: string;
  subtes_code: string;
  estimasi_menit_review: number;
  jumlah_subbab: number;
  total_butir: number;
  subbab: RangkumanIndexSubbabItem[];
  daftar_subbab: RangkumanIndexSubbabItem[]; // alias
}

export interface RangkumanIndexSubtes {
  subtes_id: string;
  subtes: string;
  daftar_bab: RangkumanIndexBabItem[];
}

export interface RangkumanIndexData {
  total_bab: number;
  total_subbab: number;
  total_butir: number;
  daftar_subtes: RangkumanIndexSubtes[];
}
