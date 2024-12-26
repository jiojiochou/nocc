import path from 'node:path'
import { fileURLToPath } from 'node:url' // 将文件URL转换为文件路径
import commonjs from '@rollup/plugin-commonjs' // 将CommonJS模块转换为ES6，以便Rollup可以处理
import resolve from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import replace from '@rollup/plugin-replace' // 替换代码中的变量
import typescript from '@rollup/plugin-typescript' // 将 TypeScript 代码转换为 JavaScript
import vue from '@vitejs/plugin-vue' // 支持在 Rollup 中使用 Vue 组件

const inputPath = path.resolve(fileURLToPath(import.meta.url), '../packages/components/index.ts')

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
