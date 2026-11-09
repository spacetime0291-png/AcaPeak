import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src/data/materials');
const puDir = path.join(srcDir, 'pu');
if (!fs.existsSync(puDir)) {
  fs.mkdirSync(puDir, { recursive: true });
}

const content = fs.readFileSync(path.join(srcDir, 'puMaterials.ts'), 'utf8');
const lines = content.split('\n');

const matIndices = [];
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(/^export const (MATERIAL_PU_(\d+)_(\d+)):/);
  if (match) {
    matIndices.push({
      name: match[1],
      ch: match[2],
      sub: match[3],
      lineIndex: i
    });
  }
}

const exportStatements = [];

for (let i = 0; i < matIndices.length; i++) {
  const cur = matIndices[i];
  const next = matIndices[i + 1];
  const startLine = cur.lineIndex;
  const endLine = next ? next.lineIndex : lines.length;

  const matLines = lines.slice(startLine, endLine);
  while (matLines.length > 0 && matLines[matLines.length - 1].trim() === '') {
    matLines.pop();
  }

  const fileName = `pu-${cur.ch.padStart(2, '0')}-${cur.sub.padStart(2, '0')}.ts`;
  const fileContent = `import type { Material } from '../../../types/material';\n\n` + matLines.join('\n') + '\n';

  const targetPath = path.join(puDir, fileName);
  fs.writeFileSync(targetPath, fileContent, 'utf8');
  console.log(`Created ${fileName} (${matLines.length} lines)`);
  exportStatements.push(`export * from './pu-${cur.ch.padStart(2, '0')}-${cur.sub.padStart(2, '0')}';`);
}

// Write index.ts in src/data/materials/pu/
fs.writeFileSync(path.join(puDir, 'index.ts'), exportStatements.join('\n') + '\n', 'utf8');
console.log('Created src/data/materials/pu/index.ts');

// Replace puMaterials.ts with clean barrel export
const barrelContent = `/**
 * PU Materials Barrel Export
 * Each subchapter is modularized into its own file inside ./pu/ for safety and maintainability.
 */
export * from './pu';
`;
fs.writeFileSync(path.join(srcDir, 'puMaterials.ts'), barrelContent, 'utf8');
console.log('Updated src/data/materials/puMaterials.ts to re-export from ./pu');
