import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

function run(cmd, desc) {
  console.log(`\n======================================================`);
  console.log(`▶ Step: ${desc}`);
  console.log(`$ ${cmd}`);
  console.log(`======================================================`);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT_DIR });
}

try {
  // 1. Export modular materials to JSON
  run('node scripts/export_materials.mjs', 'Export & Sync Materials to JSON');

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
