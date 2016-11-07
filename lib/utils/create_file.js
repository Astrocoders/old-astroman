import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'
import { getAppMainPackagePath } from './packageJson'

export default function createFile({ filePath, content }: { filePath: string, content: string }):void {
  console.log(colors.white(`Creating ${path.basename(filePath)}`))

  try {
    fs.writeFileSync(path.join(getAppMainPackagePath(), filePath), content)
  } catch(error) {
    console.log(colors.red('Couldn\'t create file due to:'))
    console.log(error)
    process.exit(1)
  }

  console.log(colors.green(`Successfully created ${filePath}`))
}
