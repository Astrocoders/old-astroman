import fs from 'fs'
import { itHasPackageInItsDeps } from './packageJson.js'

export function isMeteor(){
  return fs.existsSync('app/.meteor/')
}

export function isReactNative(){
  return itHasPackageInItsDeps({ packageName: 'react-native' })
}

export function isReactApp(){
  return (
    !isReactNative() &&
    itHasPackageInItsDeps({ packageName: 'react' })
  )
}
