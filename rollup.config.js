import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import buble from '@rollup/plugin-buble'

function buildBanner(type) {
  return [
    '/*!',
    ` * ${pkg.name} ${type} ${pkg.version}`,
    ` * (c) 2020 - ${new Date().getFullYear()} jackness`,
    ' * Released under the MIT License.',
    ' */'
  ].join('\n')
}

const IS_PUBLISH = process.env.NODE_ENV === 'production'

const config = {
  input: './src/index.ts',
  output: [],
  plugins: [
    // replace({
    //   __workerScript__: () => {
    //     // return 'sb'
    //     return fs.readFileSync('./output/index.js').toString()
    //   }
    // }),
    nodeResolve({ jsnext: true }),
    commonjs({
      include: 'node_modules/**'
    }),
    json(),
    typescript({
      typescript: require('typescript')
    }),
    buble()
  ],
  external: ['indexdb-storage']
}

export default [
  {
    input: './src/worker.ts',
    output: [
      {
        file: './output/worker.js',
        format: 'commonjs',
        exports: 'named',
        sourcemap: false
      }
    ],
    plugins: config.plugins.concat([
      terser({
        compress: {
          passes: 2
        }
      })
    ])
  },
  {
    input: config.input,
    output: [
      {
        file: './output/index.js',
        format: 'cjs',
        banner: buildBanner('cjs'),
        exports: 'named',
        sourcemap: false
      }
    ],
    plugins: config.plugins.concat([
      IS_PUBLISH &&
        terser({
          compress: {
            passes: 2
          }
        })
    ]),
    external: config.external
  },
  {
    input: config.input,
    output: [
      {
        file: './output/index.esm.js',
        format: 'esm',
        banner: buildBanner('esm'),
        sourcemap: false
      }
    ],
    plugins: config.plugins,
    external: config.external
  }
]
