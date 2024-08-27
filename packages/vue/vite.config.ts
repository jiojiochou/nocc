import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const r = (p: string) => resolve(__dirname, p)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      cleanVueFileName: true,
      exclude: ['src/test/**'],
    }),
  ],

  resolve: {
    alias: {
      '@': r('./src'),
    },
  },

  build: {
    lib: {
      name: 'nosc-ui',
      fileName: 'index',
      entry: resolve(__dirname, 'src/index.ts'),
    },
  },
})
