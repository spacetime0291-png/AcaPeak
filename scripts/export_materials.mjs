import fs from 'fs';
import path from 'path';
import vm from 'vm';

const subtests = [
  {
    code: 'pu',
    dirName: 'pu',
    prefix: 'MATERIAL_PU_',
  },
  {
    code: 'pbm',
    dirName: 'pbm',
    prefix: 'MATERIAL_PBM_',
  },
];

let totalExported = 0;

for (const sub of subtests) {
  const pubDir = path.resolve(`public/content/utbk/${sub.code}`);
  const rootDir = path.resolve(`content/utbk/${sub.code}`);
  [pubDir, rootDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const modularDir = path.resolve(`src/data/materials/${sub.dirName}`);
  if (!fs.existsSync(modularDir)) continue;

  const files = fs.readdirSync(modularDir)
    .filter(f => f.startsWith(`${sub.code}-`) && f.endsWith('.ts'))
    .sort();

  console.log(`Exporting ${files.length} modular material files from src/data/materials/${sub.dirName}/...`);

  for (const file of files) {
    const filePath = path.join(modularDir, file);
    const tsCode = fs.readFileSync(filePath, 'utf8');
    const jsCode = tsCode
      .replace(/import\s+type\s+[^;]+;/g, '')
      .replace(/:\s*Material\b/g, '')
      .replace(/export\s+const\s+/g, 'var ');

    const context = {};
    vm.createContext(context);
    vm.runInContext(jsCode, context);

    const matNames = Object.keys(context).filter(k => k.startsWith(sub.prefix));
    for (const name of matNames) {
      const mat = context[name];
      const idShort = mat.metadata.id; // e.g. "pbm-1-1"
      const [_, ch, subNum] = mat.metadata.subchapter_num.match(/(\d+)\.(\d+)/);
      const idPadded = `${sub.code}-${ch.padStart(2, '0')}-${subNum.padStart(2, '0')}`; // e.g. "pbm-01-01"

      [pubDir, rootDir].forEach(dir => {
        fs.writeFileSync(path.join(dir, `${idShort}.json`), JSON.stringify(mat, null, 2), 'utf8');
        fs.writeFileSync(path.join(dir, `${idPadded}.json`), JSON.stringify(mat, null, 2), 'utf8');
      });
      totalExported++;

      // If PBM Bab 1, also mirror to PPU for backward/cross compatibility
      if (sub.code === 'pbm') {
        const ppuPubDir = path.resolve('public/content/utbk/ppu');
        const ppuRootDir = path.resolve('content/utbk/ppu');
        [ppuPubDir, ppuRootDir].forEach(dir => {
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        });

        const ppuMat = JSON.parse(JSON.stringify(mat));
        ppuMat.metadata.id = `ppu-${ch}-${subNum}`;
        ppuMat.metadata.subtest = 'PPU';

        const ppuIdShort = `ppu-${ch}-${subNum}`;
        const ppuIdPadded = `ppu-${ch.padStart(2, '0')}-${subNum.padStart(2, '0')}`;

        [ppuPubDir, ppuRootDir].forEach(dir => {
          fs.writeFileSync(path.join(dir, `${ppuIdShort}.json`), JSON.stringify(ppuMat, null, 2), 'utf8');
          fs.writeFileSync(path.join(dir, `${ppuIdPadded}.json`), JSON.stringify(ppuMat, null, 2), 'utf8');
        });
      }
    }
  }
}

console.log(`Successfully exported ${totalExported} materials to JSON.`);
