import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// The hero picture comes from Tollgate's own diagrams, so the site and the README
// show the same picture. TOLLGATE_DIR is a checkout of tollgate-ai/tollgate. By
// default it sits next to this repository, in ../tollgate.
const tollgate = resolve(process.env.TOLLGATE_DIR ?? fileURLToPath(new URL('../tollgate', import.meta.url)))
const diagrams = resolve(tollgate, 'docs/diagrams')

// The site is served at https://tollgate-ai.github.io/.
export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@diagrams': diagrams,
    },
  },
  server: { fs: { allow: ['.', diagrams] } },
})
