/**
 * TypeScript Interfaces for Rangkuman Padat per Bab (Cheat Sheet Pass-5)
 */

export interface RangkumanButir {
  judul?: string;
  judul_poin?: string;
  teori_singkat?: string;
  penjelasan_singkat?: string;
  contoh?: string;
  contoh_penerapan?: string;
}

export interface RangkumanKelompok {
  nama_kelompok: string;
  butir: RangkumanButir[];
}

export interface RangkumanSubbab {
  kode_subbab: string;
  judul_subbab: string;
  klasifikasi_materi?: string;
  konsep_inti_markdown?: string;
  inti_subbab?: string;
  mode_tampilan?: 'katalog_kaidah' | 'katalog_rumus_sifat' | 'katalog_sinyal_pola' | string;
  label_kolom?: {
    kolom_1: string;
    kolom_2: string;
  };
  kelompok: RangkumanKelompok[];
}

export interface RangkumanBabData {
  kode_bab: string;
  subtes: string;
  bab: string;
  batch_model?: string;
  estimasi_menit_review?: number;
  jumlah_subbab?: number;
  daftar_subbab: RangkumanSubbab[];
}

export interface RangkumanIndexItem {
  kode_bab: string;
  nama_bab: string;
  batch_model?: string;
  jumlah_subbab?: number;
  daftar_subbab: Array<{
    kode_subbab: string;
    judul_subbab: string;
    klasifikasi_materi?: string;
    mode_tampilan?: string;
  }>;
}

export interface RangkumanIndexSubtes {
  subtes: string;
  daftar_bab: RangkumanIndexItem[];
}

export interface RangkumanIndexData {
  total_bab: number;
  daftar_subtes: RangkumanIndexSubtes[];
}
