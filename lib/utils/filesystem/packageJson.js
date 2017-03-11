// @flow
import fs from 'fs'
import path from 'path'
import { merge } from 'lodash'
import findConfig from 'find-config'

export function getAppMainPackagePath():string {
  const root = findConfig('package.json').replace('package.json', '')
  const rootWithinAnAppDir =  path.join(root, '../app') 

  if(fs.existsSync(rootWithinAnAppDir)){
    return rootWithinAnAppDir
  } else {
    return root
  }
}

export function getAppMainPackage():string {
  return fs.readFileSync(path.join(getAppMainPackagePath(), 'package.json')).toString()
}

export function itHasPackageInItsDeps({ packageName }: { packageName: string }):boolean {
  const packageJson = getAppMainPackage()

  return (new RegExp(packageName, 'ig')).test(packageJson)
}

export function updateMainPackageJson(extendedObj:Object):void {
  const packageJsonObj = JSON.parse(getAppMainPackage())
  const newPackageJson = JSON.stringify(merge(packageJsonObj, extendedObj), null, 2)

  fs.writeFileSync(path.join(getAppMainPackagePath(), 'package.json'), newPackageJson)
}
