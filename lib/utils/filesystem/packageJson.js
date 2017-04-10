// 
import fs from 'fs'
import path from 'path'
import { merge } from 'lodash'
import findConfig from 'find-config'

// Get get path of project's main package.json
export function getAppMainPackagePath() {
  // TODO: Check if in Meteor app strucutres it'll fetch the package.json
  // which is sibling of app/ and not the one within app/.
  const root = path.dirname(findConfig('package.json'))

  // Meteor applications are within an app directory, so we need to walk up
  // to get the real root
  const rootWithinAnAppDir = path.join(root, '../app') 

  if(fs.existsSync( path.resolve(root, '.meteor/.finished-upgraders') )){
    return rootWithinAnAppDir
  } else {
    return root
  }
}

export function getAppMainPackage() {
  return fs.readFileSync(path.join(getAppMainPackagePath(), 'package.json')).toString()
}

// Check if a package is being listed in package.json
export function itHasPackageInItsDeps({ packageName }) {
  const packageJson = getAppMainPackage()

  return (new RegExp(packageName, 'ig')).test(packageJson)
}

// Update project's main package.json file with a passed in project
export function updateMainPackageJson(extendedObj) {
  const packageJsonObj = JSON.parse(getAppMainPackage())
  const newPackageJson = JSON.stringify(merge(packageJsonObj, extendedObj), null, 2)

  fs.writeFileSync(path.join(getAppMainPackagePath(), 'package.json'), newPackageJson)
}
