import fs from 'fs'
import path from 'path'
import colors from 'colors/safe'
import { getAppMainPackagePath } from './packageJson'

export default function readFile({ filePath }: { filePath: string }):string {
  try {
    return fs.readFileSync(path.join(getAppMainPackagePath(), filePath)).toString()
  } catch(error) {
    console.log(colors.red.bold('Couldn\'t read file due to:'))
    console.log(error)
    process.exit(1)
  }
}
