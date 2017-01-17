// @flow
import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'
import { isMeteor, isReactNative } from './environment'
import { getAppMainPackagePath } from './packageJson'
import getMeteorRoot from './meteorRoot'

export default function createFile({ filePath, content }: { filePath: string, content: string }):void {
  console.log(colors.white(`Creating ${path.basename(filePath)}`))

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

  console.log(colors.green(`Successfully created ${filePath}`))
}
