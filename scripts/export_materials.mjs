import fs from 'fs';
import path from 'path';
import vm from 'vm';

const pubPuDir = path.resolve('public/content/utbk/pu');
const rootPuDir = path.resolve('content/utbk/pu');
[pubPuDir, rootPuDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const tsCode = fs.readFileSync('src/data/materials/puMaterials.ts', 'utf8');
const jsCode = tsCode
  .replace(/import\s+type\s+[^;]+;/g, '')
  .replace(/:\s*Material\b/g, '')
  .replace(/export\s+const\s+/g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(jsCode, context);

const matNames = Object.keys(context).filter(k => k.startsWith('MATERIAL_PU_'));
console.log(`Exporting ${matNames.length} materials from puMaterials.ts...`);

for (const name of matNames) {
  const mat = context[name];
  const idShort = mat.metadata.id; // e.g. "pu-1-1"
  const [_, ch, sub] = mat.metadata.subchapter_num.match(/(\d+)\.(\d+)/);
  const idPadded = `pu-${ch.padStart(2, '0')}-${sub.padStart(2, '0')}`; // e.g. "pu-01-01"

  [pubPuDir, rootPuDir].forEach(dir => {
    fs.writeFileSync(path.join(dir, `${idShort}.json`), JSON.stringify(mat, null, 2), 'utf8');
    fs.writeFileSync(path.join(dir, `${idPadded}.json`), JSON.stringify(mat, null, 2), 'utf8');
  });
}

console.log('Successfully exported all PU materials to JSON.');
