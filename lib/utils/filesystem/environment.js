import fs from 'fs'
import { memoize } from 'lodash/fp'
import {
  itHasPackageInItsDeps,
  getAppMainPackage,
  getAppMainPackagePath,
} from './packageJson.js'
import getMeteorRoot from './meteorRoot'

export function isMeteor() {
  return fs.existsSync(getMeteorRoot())
}

export function isReactNative() {
  return itHasPackageInItsDeps({ packageName: 'react-native' })
}

export function isAstroPlugin() {
  return JSON.parse(getAppMainPackage()).name.includes('astro-')
}

export function isReactApp() {
  return (
    !isReactNative() &&
    itHasPackageInItsDeps({ packageName: 'react' })
  )
}

export const getRootPath = memoize(function getRootPath() {
  if(isMeteor()) return getMeteorRoot()
  else if(isReactNative()) return getAppMainPackagePath()
})
