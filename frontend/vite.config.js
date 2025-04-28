import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        scan: resolve(__dirname, 'scan.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true
  },
});
