import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析第三方依赖
import replace from '@rollup/plugin-replace'
import vue from '@vitejs/plugin-vue' // 处理vue文件
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild' // ts -> js
// import vueMacros from 'unplugin-vue-macros/rollup'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)

const projRoot = resolve(__dirnameNew, '..', '..') // 根目录
const pkgRoot = resolve(projRoot, 'packages') // 包目录
const epRoot = resolve(pkgRoot, 'components') // 组件目录
const buildOutput = resolve(projRoot, 'dist') // 产物目录

export async function buildFull() {
  const bundle = await rollup({
    input: resolve(epRoot, 'index.ts'),
    plugins: [
      nodeResolve({
        extensions: ['.ts'],
      }),
      replace({
        'process.env.NODE_ENV': 'production',
        'preventAssignment': true,
      }),
      vue(),
      esbuild(),
    ],
    external: ['vue'],
  })

  bundle.write({
    format: 'umd',
    file: resolve(buildOutput, 'umd', 'index.js') /** umd产物目录 */,
    name: 'nosc',
    globals: {
      vue: 'Vue',
    },
  })
}
buildFull()

export async function buildModules() {
  const bundle = await rollup({
    input: resolve(epRoot, 'index.ts'),
    plugins: [
      nodeResolve({
        extensions: ['.ts'],
      }),
      replace({
        'process.env.NODE_ENV': 'production',
        'preventAssignment': true,
      }),
      vue(),
      esbuild(),
    ],
    external: ['vue'],
  })

  bundle.write({
    format: 'esm',
    file: resolve(buildOutput, 'esm', 'index.js') /** esm产物目录 */,
    name: 'nosc',
    globals: {
      vue: 'Vue',
    },
  })
}
buildModules()
