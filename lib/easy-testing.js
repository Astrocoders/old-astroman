import fs from 'fs'
import path from 'path'
import {
  itHasPackageInItsDeps,
  getAppMainPackagePath,
  updateMainPackageJson,
} from './utils/pathes'
import { exec } from 'child_process'

if(process.EASY_SETUP !== 1){
  console.log('[astrocoders:easy-testing] Not initialized')
  return
}

const requiredNpmDeps = [
  /* testing */
  {  name: 'codeceptjs' },
  { name: 'jest' },
  /* jest needs babel to parse meteor files */
  { name: 'babel-core' },
  { name: 'babel-preset-es2015' },
  { name: 'babel-plugin-transform-object-rest-spread' },
  /* linting */
  { name: 'eslint' },
  { name: 'babel-eslint' },
  { name: 'eslint-config-airbnb' },
  { name: 'eslint-plugin-import' },
  { name: 'eslint-plugin-jsx-a11y' },
  { name: 'eslint-plugin-react' },
]

console.log('astrocoders:easy-testing checking the suite for you')
Promise.all(
  requiredNpmDeps.map(pack => {
    return new Promise((resolve, reject) => {
      if(
        !itHasPackageInItsDeps({ packageName: pack.name })
      ) {
        console.log(`Installing ${pack.name}...`)

        const root = getAppMainPackagePath()
        const npmInstallProc = exec(`cd ${root} && npm install --save-dev ${pack.name}`)

        npmInstallProc.stdout.pipe(process.stdout)
        npmInstallProc.stderr.pipe(process.stderr)

        npmInstallProc.on('close', () => {
          pack.onInstalled && pack.onInstalled()
          resolve()
        })
      }
    })
  })
).then(() => {
  updateMainPackageJson({
    scripts: {
      'test:acceptance': 'codeceptjs run --steps',
      'test:unit': 'jest',
      'test:coverage': 'jest --coverage',
      'test:unit:watch': 'jest --watch',
    },

    jest: {
      browser: true,
      collectCoverageFrom: [
        'imports/**/*.js',
      ],
      coverageDirectory: './coverage',
      rootDir: retifyPathIfWithinApp('./'),
    },

    babel: {
      presets: ['es2015'],
      plugins: ['transform-object-rest-spread'],
    },

    eslintConfig: {
      extends: ['airbnb'],
      rules: {
        'semi': [1, 'never'],
        'space-before-function-paren': [1, 'never'],
        'no-underscore-dangle': 0,
        'keyword-spacing': 0,
        'space-before-blocks': 0
      },
      parser: "babel-eslint"
    },
  })
})

function retifyPathIfWithinApp(path){
  const appPath = getAppMainPackagePath()
  const needsCdApp = (/\/app\//g).test(appPath)

  return needsCdApp ? path.resolve('app/', path) : path
}
