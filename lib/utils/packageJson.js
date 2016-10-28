import fs from 'fs'
import path from 'path'
import { merge } from 'lodash'

export function getAppMainPackagePath(){
  const root = process.cwd()
  const rootWithinAnAppDir =  path.join(root, '../app') 

  if(fs.existsSync(rootWithinAnAppDir)){
    return rootWithinAnAppDir
  } else {
    return root
  }
}

export function getAppMainPackage(){
  return fs.readFileSync(path.join(getAppMainPackagePath(), 'package.json'))
}

export function itHasPackageInItsDeps({ packageName }){
  const packageJson = getAppMainPackage()

  return (new RegExp(packageName, 'ig')).test(packageJson)
}

export function updateMainPackageJson(extendedObj){
  const packageJsonObj = JSON.parse(getAppMainPackage())
  const newPackageJson = JSON.stringify(merge(packageJsonObj, extendedObj), null, 2)

  fs.writeFileSync(path.join(getAppMainPackagePath(), 'package.json'), newPackageJson)
}
