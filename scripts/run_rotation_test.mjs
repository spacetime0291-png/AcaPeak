import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const esbuildPath = pathToFileURL(path.join(ROOT_DIR, 'node_modules/esbuild/lib/main.js')).href;
const { build } = await import(esbuildPath);

const tmpOut = path.join(os.tmpdir(), `skolace-rotation-test-${Date.now()}.mjs`);

try {
  await build({
    entryPoints: [path.join(ROOT_DIR, 'scripts/test_rotation_engine.mjs')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: tmpOut,
    external: ['assert', 'fs', 'path'],
    logLevel: 'silent',
  });

  execFileSync(process.execPath, [tmpOut], {
    stdio: 'inherit',
    cwd: ROOT_DIR,
  });
} finally {
  try {
    const fs = await import('fs');
    if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);
  } catch {
    // ignore cleanup failure
  }
}
