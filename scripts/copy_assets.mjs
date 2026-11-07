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
  // Create 404.html for GitHub Pages SPA client-side routing fallback
  if (fs.existsSync('dist/index.html')) {
    fs.copyFileSync('dist/index.html', 'dist/404.html');
    fs.copyFileSync('dist/index.html', '404.html');
  }
}

// Copy public/content to root content if exists
const publicContent = path.resolve('public/content');
const rootContent = path.resolve('content');
if (fs.existsSync(publicContent)) {
  fs.cpSync(publicContent, rootContent, { recursive: true });
}

console.log(`Copied ${files.length} production assets to ./assets/, created 404.html, mirrored content, and created .nojekyll`);
