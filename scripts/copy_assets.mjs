import fs from 'fs';
import path from 'path';

const distAssets = path.resolve('dist/assets');
const rootAssets = path.resolve('assets');

if (!fs.existsSync(rootAssets)) {
  fs.mkdirSync(rootAssets, { recursive: true });
}

// Copy all files from dist/assets to root assets
const files = fs.readdirSync(distAssets);
for (const file of files) {
  const src = path.join(distAssets, file);
  const dest = path.join(rootAssets, file);
  fs.copyFileSync(src, dest);
}

// Ensure .nojekyll exists in root and dist
fs.writeFileSync('.nojekyll', '', 'utf8');
if (fs.existsSync('dist')) {
  fs.writeFileSync('dist/.nojekyll', '', 'utf8');
}

console.log(`Copied ${files.length} production assets to ./assets/ and created .nojekyll`);
