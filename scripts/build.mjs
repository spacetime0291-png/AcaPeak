import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const UTBK_SUBTESTS = ['pu', 'ppu', 'pbm', 'pk', 'lbi', 'lbe', 'pm'];

function run(cmd, desc) {
  console.log(`\n======================================================`);
  console.log(`▶ Step: ${desc}`);
  console.log(`$ ${cmd}`);
  console.log(`======================================================`);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT_DIR });
}

function syncDirIfNeeded(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return 0;
  fs.mkdirSync(destDir, { recursive: true });
  let synced = 0;

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      synced += syncDirIfNeeded(srcPath, destPath);
    } else if (entry.name.endsWith('.json')) {
      const srcContent = fs.readFileSync(srcPath, 'utf8');
      const needsWrite =
        !fs.existsSync(destPath) || fs.readFileSync(destPath, 'utf8') !== srcContent;
      if (needsWrite) {
        fs.writeFileSync(destPath, srcContent, 'utf8');
        synced++;
      }
    }
  }
  return synced;
}

function validateAndSyncContent() {
  console.log(`\n======================================================`);
  console.log('▶ Step: Validate & Sync Production Content (content/ -> public/content/)');
  console.log(`======================================================`);

  // 1. Light sync from content/utbk & content/rangkuman -> public/content/
  const syncedUtbk = syncDirIfNeeded(
    path.join(ROOT_DIR, 'content/utbk'),
    path.join(ROOT_DIR, 'public/content/utbk')
  );
  const syncedRangkuman = syncDirIfNeeded(
    path.join(ROOT_DIR, 'content/rangkuman'),
    path.join(ROOT_DIR, 'public/content/rangkuman')
  );

  // 2. Validate 106 UTBK material files
  let utbkCount = 0;
  for (const sub of UTBK_SUBTESTS) {
    const dir = path.join(ROOT_DIR, 'public/content/utbk', sub);
    if (fs.existsSync(dir)) {
      utbkCount += fs.readdirSync(dir).filter((f) => f.endsWith('.json')).length;
    }
  }
  if (utbkCount !== 106) {
    throw new Error(`Expected 106 UTBK material JSONs in public/content/utbk/, found ${utbkCount}`);
  }

  // 3. Validate 27 Rangkuman bab files + index.json
  const rangkumanDir = path.join(ROOT_DIR, 'public/content/rangkuman');
  const rangkumanIndex = path.join(rangkumanDir, 'index.json');
  if (!fs.existsSync(rangkumanIndex)) {
    throw new Error('Missing public/content/rangkuman/index.json');
  }
  const rangkumanBabs = fs
    .readdirSync(rangkumanDir)
    .filter((f) => f.endsWith('.json') && !f.startsWith('index'));
  if (rangkumanBabs.length !== 27) {
    throw new Error(`Expected 27 Rangkuman bab JSONs in public/content/rangkuman/, found ${rangkumanBabs.length}`);
  }

  // 4. Validate 106 Drilling bank files (4,240 questions) + index.json
  const drillingIndex = path.join(ROOT_DIR, 'public/content/drilling/index.json');
  if (!fs.existsSync(drillingIndex)) {
    throw new Error('Missing public/content/drilling/index.json');
  }
  let drillingFiles = 0;
  let drillingQuestions = 0;
  for (const sub of UTBK_SUBTESTS) {
    const dir = path.join(ROOT_DIR, 'public/content/drilling', sub);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    drillingFiles += files.length;
    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
      drillingQuestions += Array.isArray(data.questions) ? data.questions.length : 0;
    }
  }
  if (drillingFiles !== 106 || drillingQuestions !== 4240) {
    throw new Error(
      `Expected 106 drilling banks (4,240 questions) in public/content/drilling/, found ${drillingFiles} files (${drillingQuestions} questions)`
    );
  }

  console.log(
    `✅ Content verified: ${utbkCount} UTBK materials, ${rangkumanBabs.length} Rangkuman (+ index.json), ${drillingFiles} Drilling banks (${drillingQuestions} questions).`
  );
  if (syncedUtbk > 0 || syncedRangkuman > 0) {
    console.log(`🔄 Synced ${syncedUtbk} UTBK and ${syncedRangkuman} Rangkuman files to public/content/.`);
  }
}

try {
  // 1. Validate & sync content/ -> public/content/
  validateAndSyncContent();

  // 2. Type check
  run('npx tsc -b', 'TypeScript Type Verification');

  // 3. Vite Build (Client Bundle + Integrated SSG Prerendering Plugin)
  run('npx vite build', 'Vite Client Bundle & Native SSG Pre-rendering');

  // 4. Verification: Ensure dist/index.html is NOT empty
  const distIndex = path.join(ROOT_DIR, 'dist/index.html');
  if (!fs.existsSync(distIndex)) {
    throw new Error('Verification failed: dist/index.html was not generated!');
  }
  const html = fs.readFileSync(distIndex, 'utf8');
  if (!html.includes('<div id="root"><div')) {
    throw new Error('Verification failed: dist/index.html root container is EMPTY (<div id="root"></div>)!');
  }

  console.log('\n🎉 ======================================================');
  console.log('✅ SSG + CSR Build completed and verified successfully!');
  console.log(`✅ dist/index.html size: ${(html.length / 1024).toFixed(1)} KB (Fully Pre-rendered)`);
  console.log('======================================================\n');
} catch (err) {
  console.error('\n❌ Build failed:', err.message);
  process.exit(1);
}
