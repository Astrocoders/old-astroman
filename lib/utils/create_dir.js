import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'
import { getRootPath } from '~/utils/environment'

export default function createDir({ dirPath }: { dirPath: string }):void {
  try {
    fs.mkdirSync(path.join(getRootPath(), dirPath))
  } catch(error) {
    // not a problem!
    if(error.code === 'EEXIST') return
    console.log(colors.red.bold('Couldn\'t create directory due to:'))
    console.log(error)
    process.exit(1)
  }
}
