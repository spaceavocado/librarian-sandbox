import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import preprocess from 'svelte-preprocess'
import svelte from 'rollup-plugin-svelte'
import html from 'rollup-plugin-html2'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import path from 'path'
import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy'

const input = './src/index.ts'
const output = 'dist'
const port = 8000
const production = process.env.NODE_ENV === 'production'

const plugins = [
  svelte({
    include: 'src/**/*.svelte',
    preprocess: preprocess({
      scss: {
        includePaths: [path.resolve(__dirname, 'src/scss')],
        prependData: '@import "abstracts";',
        sourceMap: !production,
      },
    }),
    emitCss: true,
  }),
  scss({ outputStyle: 'compressed' }),
  css({ output: 'bundle.css' }),
  typescript({ sourceMap: !production }),
  resolve({
    browser: true,
    dedupe: ['svelte'],
  }),
  commonjs(),
  html({
    template: 'src/public/index.html',
    fileName: 'index.html',
  }),
  copy({
    targets: [
      { src: ['src/public/fonts', 'src/public/icons'], dest: 'dist/assets' },
    ],
  }),
  ...(production
    ? [terser()]
    : [
        serve({
          contentBase: output,
          historyApiFallback: true,
          port,
        }),
        livereload({ watch: output }),
      ]),
]

export default {
  input,
  output: {
    name: 'bundle',
    file: `${output}/bundle.js`,
    sourcemap: !production,
    format: 'iife',
  },
  plugins,
}
