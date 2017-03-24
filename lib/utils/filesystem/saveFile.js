// @flow
import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'
import { isMeteor, isReactNative } from './environment'
import { getAppMainPackagePath } from './packageJson'
import getMeteorRoot from './meteorRoot'

export default function saveFile({ filePath, content }: { filePath: string, content: string }):void {
  console.log(colors.white(`Saving ${path.basename(filePath)}`))

  try {
    let root
    if(isMeteor()) root = getMeteorRoot()
    else if(isReactNative()) root = getAppMainPackagePath()

    fs.writeFileSync(path.join(root, filePath), content)
  } catch(error) {
    console.log(colors.red('Couldn\'t create file due to:'))
    console.log(error)
    process.exit(1)
  }
}
