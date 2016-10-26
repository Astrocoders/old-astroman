import fs from 'fs'
import path from 'path'
import {
  itHasPackageInItsDeps,
  getAppMainPackagePath,
} from './utils/pathes'
import { exec } from 'child_process'

const requiredNpmDeps = [
  'codeceptjs',
]

console.log('astrocoders:easy-testing checking the suite for you')
requiredNpmDeps.forEach(packageName => {
  if(
    !itHasPackageInItsDeps({ packageName })
  ) {
    console.log(`Installing ${packageName}...`)
    const root = getAppMainPackagePath()
    console.log({ root})
    const npmInstallProc = exec(`cd ${root} && npm install --save-dev ${packageName}`)


    npmInstallProc.stdout.pipe(process.stdout)
    npmInstallProc.stderr.pipe(process.stderr)

    npmInstallProc.on('close', (code) => {
      console.log(`Installed ${packageName}, code ${code}`)
    })
  }
})

