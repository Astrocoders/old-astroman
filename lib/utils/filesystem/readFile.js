import fs from 'fs'
import path from 'path'
import colors from 'colors/safe'
import {getAppMainPackagePath} from './packageJson'

// Read a project file from project root path perspective
export default function readFile({filePath}) {
  try {
    return fs.readFileSync(path.join(getAppMainPackagePath(), filePath)).toString()
  } catch (err) {
    console.log(colors.red.bold('Couldn\'t read file due to:'))
    console.log(err)
    process.exit(1)
  }
}
