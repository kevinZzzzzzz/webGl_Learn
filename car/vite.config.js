// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // ✅ 对于 Vercel，一定是根路径 `/`
  build: {
    outDir: 'dist',
  },
});
