import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Vite plugin to ensure Static Site Generation (SSG) pre-rendering automatically executes
 * whenever `vite build` runs (whether invoked via CLI, Cloudflare Pages/Workers, or npm scripts).
 */
function ssgPrerenderPlugin(): Plugin {
  let isSsrBuild = false;

  return {
    name: 'vite-plugin-ssg-prerender',
    apply: 'build',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    async closeBundle() {
      // Avoid executing recursively during SSR server build
      if (isSsrBuild || process.env.VITE_SSG_BUILDING === 'true') {
        return;
      }

      console.log('\n======================================================');
      console.log('⚡ [SSG Plugin] Client bundle complete. Triggering SSG...');
      console.log('======================================================');

      const root = process.cwd();

      // 1. Export materials to JSON (syncs to public/content/utbk/)
      execSync('node scripts/export_materials.mjs', { stdio: 'inherit', cwd: root });

      // 2. Build SSR server bundle
      console.log('\n⚡ [SSG Plugin] Building SSR Server Bundle...');
      execSync('npx vite build --ssr src/entry-server.tsx --outDir dist/server', {
        stdio: 'inherit',
        cwd: root,
        env: {
          ...process.env,
          VITE_SSG_BUILDING: 'true',
        },
      });

      // 3. Run Native SSG Pre-rendering (updates dist/index.html & generates 118 static pages)
      console.log('\n⚡ [SSG Plugin] Running Pre-rendering...');
      execSync('node scripts/prerender.mjs', { stdio: 'inherit', cwd: root });

      // 4. Generate SEO Sitemap & robots.txt
      console.log('\n⚡ [SSG Plugin] Generating SEO files...');
      execSync('node scripts/generate_seo_files.mjs', { stdio: 'inherit', cwd: root });

      // 5. Verification: Check dist/index.html content
      const distIndex = path.join(root, 'dist/index.html');
      if (fs.existsSync(distIndex)) {
        const html = fs.readFileSync(distIndex, 'utf8');
        if (!html.includes('<div id="root"><div')) {
          throw new Error('SSG Verification Failed: dist/index.html is missing pre-rendered React root content!');
        }
        console.log(`\n🎉 [SSG Plugin] dist/index.html verified! Size: ${(html.length / 1024).toFixed(1)} KB (Fully Pre-rendered)\n`);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    ssgPrerenderPlugin(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
