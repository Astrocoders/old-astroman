import fs from 'fs'
import path from 'path'
import { isMeteor, isReactNative, isAstroPlugin } from './environment'
import { getAppMainPackagePath } from './packageJson'
import getMeteorRoot from './meteorRoot'

export default function saveFile({ filePath, content }){
  console.log(`Saving ${filePath}`.white)

  try {
    let root
    if(isMeteor()) root = getMeteorRoot()
    else if(isReactNative() || isAstroPlugin()) root = getAppMainPackagePath()

    fs.writeFileSync(path.join(root, filePath), content)
  } catch(error) {
    console.log('Couldn\'t create file due to:'.red)
    console.log(error)
    process.exit(1)
  }
}
