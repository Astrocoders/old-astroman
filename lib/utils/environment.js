// @flow
import fs from 'fs'
import { itHasPackageInItsDeps } from './packageJson.js'

export function isMeteor():boolean {
  return fs.existsSync('app/.meteor/')
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
