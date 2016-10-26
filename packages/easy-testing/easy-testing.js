import fs from 'fs'
import path from 'path'
import {
  itHasPackageInItsDeps,
  getAppMainPackagePath,
  updateMainPackageJson,
} from './utils/pathes'
import { exec } from 'child_process'

const requiredNpmDeps = [
  {
    name: 'codeceptjs',
    onInstalled(){
      console.log('[astrocoders:easy-testing] Adding codecept scripts')
      updateMainPackageJson({
        scripts: {
          'test:acceptance': 'codeceptjs run --steps',
        },
      })
      console.log('[astrocoders:easy-testing] Added codecept scripts')
    },
  }
]

console.log('astrocoders:easy-testing checking the suite for you')
requiredNpmDeps.forEach(pack => {
  if(
    !itHasPackageInItsDeps({ packageName: pack.name })
  ) {
    console.log(`Installing ${pack.name}...`)

    const root = getAppMainPackagePath()
    const npmInstallProc = exec(`cd ${root} && npm install --save-dev ${pack.name}`)

    npmInstallProc.stdout.pipe(process.stdout)
    npmInstallProc.stderr.pipe(process.stderr)

    npmInstallProc.on('close', pack.onInstalled)
  }
})

