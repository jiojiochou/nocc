import path from 'node:path'
import { fileURLToPath } from 'node:url'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'

const inputPath = path.resolve(fileURLToPath(import.meta.url), './packages/components/index.ts')

/** @type {import("rollup").RollupOptions} */
export default {
  input: inputPath,
  // external: [], 不打包到产物里的npm包
  output: [
    {
      file: 'dist/esm.js',
      format: 'esm',
    },
    {
      file: 'dist/cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/umd.js',
      name: 'nosc',
      format: 'umd',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    replace({
      'process.env.NODE_ENV': 'production',
    }),
  ],
}
