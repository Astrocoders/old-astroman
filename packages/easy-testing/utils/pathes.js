import fs from 'fs'
import path from 'path'

const base = '.meteor/local/build/programs/server'

export function getAppMainPackagePath(){
  const root = process.cwd().replace(base, '')
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
