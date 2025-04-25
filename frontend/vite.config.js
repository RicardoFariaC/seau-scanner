import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        scan: resolve(__dirname, 'src/scan/index.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true
  },
});
