import fs from 'fs';
import path from 'path';

// Sync all materials from output_materi to public/content/utbk and content/utbk
const subtestDirs = ['pu', 'ppu', 'pbm', 'pk', 'lbi', 'lbe', 'pm'];

['content/utbk', 'public/content/utbk'].forEach(baseDir => {
  subtestDirs.forEach(sub => {
    const dir = path.resolve(baseDir, sub);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
});

if (fs.existsSync('output_materi')) {
  const sourceFiles = fs.readdirSync('output_materi').filter(f => f.endsWith('.json'));
  let count = 0;
  for (const file of sourceFiles) {
    const filePath = path.join('output_materi', file);
    const content = fs.readFileSync(filePath, 'utf8');
    const prefix = file.split('-')[0].toLowerCase();

    if (!subtestDirs.includes(prefix)) continue;

    ['content/utbk', 'public/content/utbk'].forEach(baseDir => {
      const destPath = path.join(baseDir, prefix, file);
      fs.writeFileSync(destPath, content, 'utf8');
    });
    count++;
  }
  console.log(`Exported/synced ${count} material files to content/utbk/ and public/content/utbk/`);
} else {
  console.log('output_materi directory not found, keeping existing content/utbk files.');
}
