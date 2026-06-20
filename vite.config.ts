import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Collect all HTML files dynamically in the root for multi-page build inputs
  const htmlInputs: Record<string, string> = {};
  try {
    const rootFiles = fs.readdirSync(__dirname);
    rootFiles.forEach(file => {
      if (file.endsWith('.html')) {
        const name = file.replace('.html', '');
        htmlInputs[name] = path.resolve(__dirname, file);
      }
    });
  } catch (err) {
    console.error('Error scanning HTML files:', err);
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: htmlInputs
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
