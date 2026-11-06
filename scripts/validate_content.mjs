import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'public', 'content');

console.log('🔍 Menjalankan UTBK Exam-Pattern Content Validator...\n');

function getAllJsonFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllJsonFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const jsonFiles = getAllJsonFiles(contentDir);

if (jsonFiles.length === 0) {
  console.log('ℹ️  Belum ada file materi .json di public/content/.');
  process.exit(0);
}

let totalErrors = 0;
let totalFilesChecked = 0;

function validateSvgString(svgCode, label, errors) {
  if (typeof svgCode !== 'string') {
    errors.push(`${label}: svg_code harus bertipe string.`);
    return;
  }
  const trimmed = svgCode.trim();
  if (!trimmed.startsWith('<svg') || !trimmed.endsWith('</svg>')) {
    errors.push(`${label}: Format tag <svg>...</svg> tidak valid.`);
  }
  if (!trimmed.includes('viewBox=')) {
    errors.push(`${label}: Tag <svg> wajib memiliki atribut viewBox.`);
  }
}

for (const filePath of jsonFiles) {
  totalFilesChecked++;
  const relativePath = path.relative(rootDir, filePath);
  const errors = [];

  // 1. JSON Syntax Check
  let data;
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error(`❌ [${relativePath}] JSON Syntax Error: ${err.message}`);
    totalErrors++;
    continue;
  }

  // 2. Metadata Check
  if (!data.metadata || typeof data.metadata !== 'object') {
    errors.push('Field `metadata` wajib ada dan berupa object.');
  } else {
    const requiredMeta = [
      'id',
      'subtest',
      'chapter_num',
      'chapter_title',
      'subchapter_num',
      'subchapter_title',
      'title',
      'required_question_variations',
      'requires_svg',
      'updated_at',
    ];
    for (const field of requiredMeta) {
      if (data.metadata[field] === undefined || data.metadata[field] === null) {
        errors.push(`Metadata: field '${field}' wajib diisi.`);
      }
    }

    if (
      Array.isArray(data.metadata.required_question_variations) &&
      data.metadata.required_question_variations.length === 0
    ) {
      errors.push("Metadata: 'required_question_variations' tidak boleh array kosong.");
    }
  }

  // 3. Content Check (Tactical UTBK Playbook Standard)
  if (!data.content || typeof data.content !== 'object') {
    errors.push('Field `content` wajib ada dan berupa object.');
  } else {
    const requiredContent = [
      'exam_blueprint_markdown',
      'visualizations_svg',
      'distractor_traps',
    ];
    for (const field of requiredContent) {
      if (!data.content[field]) {
        errors.push(`Content: field '${field}' wajib diisi.`);
      }
    }

    if (Array.isArray(data.content.distractor_traps) && data.content.distractor_traps.length === 0) {
      errors.push("Content: 'distractor_traps' minimal harus memiliki 1 poin jebakan pengecoh.");
    }

    // SVG validation in content
    if (Array.isArray(data.content.visualizations_svg)) {
      data.content.visualizations_svg.forEach((svgItem, idx) => {
        const itemLabel = `Content.visualizations_svg[${idx}] (id: ${svgItem.id || 'tanpa-id'})`;
        if (!svgItem.id || !svgItem.title) {
          errors.push(`${itemLabel}: wajib memiliki field 'id' dan 'title'.`);
        }
        validateSvgString(svgItem.svg_code, itemLabel, errors);
      });
    }

    if (data.metadata?.requires_svg) {
      if (
        !Array.isArray(data.content.visualizations_svg) ||
        data.content.visualizations_svg.length === 0
      ) {
        errors.push("Metadata menetapkan 'requires_svg: true', tetapi 'visualizations_svg' kosong.");
      }
    }
  }

  // 4. Worked Examples Check (UTBK Question Variations)
  if (!Array.isArray(data.worked_examples)) {
    errors.push("Field 'worked_examples' wajib berupa array.");
  } else {
    if (data.worked_examples.length < 3) {
      errors.push(
        `Field 'worked_examples' wajib memiliki minimal 3 variasi soal (saat ini hanya ada ${data.worked_examples.length}).`
      );
    }

    data.worked_examples.forEach((example, idx) => {
      const exLabel = `worked_examples[${idx}] (${example.example_id || idx})`;
      const requiredExampleFields = [
        'example_id',
        'variation_name',
        'difficulty',
        'question_type',
        'question_markdown',
        'options',
        'correct_answer',
        'conceptual_solution_markdown',
        'quick_trick_markdown',
        'why_others_are_wrong_markdown',
      ];

      for (const field of requiredExampleFields) {
        if (!example[field]) {
          errors.push(`${exLabel}: field '${field}' wajib diisi.`);
        }
      }

      // Check options
      if (Array.isArray(example.options)) {
        if (example.options.length < 4 || example.options.length > 5) {
          errors.push(`${exLabel}: opsi jawaban harus berjumlah 4 atau 5 opsi (A-D atau A-E).`);
        }
        const optionKeys = example.options.map((o) => o.key);
        if (!optionKeys.includes(example.correct_answer)) {
          errors.push(
            `${exLabel}: correct_answer '${example.correct_answer}' tidak ditemukan di daftar options.`
          );
        }
      } else {
        errors.push(`${exLabel}: 'options' wajib berupa array.`);
      }

      // Check svg_illustration in example if present
      if (example.svg_illustration) {
        validateSvgString(
          example.svg_illustration.svg_code,
          `${exLabel}.svg_illustration`,
          errors
        );
      }
    });
  }

  // Report results for this file
  if (errors.length > 0) {
    console.error(`❌ [${relativePath}] Ditemukan ${errors.length} masalah:`);
    errors.forEach((err) => console.error(`   - ${err}`));
    totalErrors += errors.length;
  } else {
    console.log(`✅ [${relativePath}] Valid! (${data.worked_examples.length} variasi soal terverifikasi)`);
  }
}

console.log('\n----------------------------------------');
if (totalErrors > 0) {
  console.error(`💥 Validasi gagal dengan total ${totalErrors} error pada ${totalFilesChecked} file.`);
  process.exit(1);
} else {
  console.log(`✨ Seluruh materi (${totalFilesChecked} file) tervalidasi 100% dengan standar Playbook UTBK!`);
  process.exit(0);
}
