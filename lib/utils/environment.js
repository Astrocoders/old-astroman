// @flow
import fs from 'fs'
import { itHasPackageInItsDeps } from './packageJson.js'
import getMeteorRoot from './meteorRoot'

export function isMeteor():boolean {
  return fs.existsSync(getMeteorRoot())
}

export function isReactNative():boolean {
  return itHasPackageInItsDeps({ packageName: 'react-native' })
}

export function isReactApp():boolean {
  return (
    !isReactNative() &&
    itHasPackageInItsDeps({ packageName: 'react' })
  )
}
