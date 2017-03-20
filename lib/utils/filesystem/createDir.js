import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'
import { getRootPath } from '~/utils/filesystem/environment'

export default function createDir({ dirPath }) {
  try {
    const fullPath = path.join(getRootPath(), dirPath)
    console.log(colors.white('Creating dir', dirPath))
    if(fs.existsSync(fullPath)) { return }

    fs.mkdirSync(fullPath)
  } catch(error) {
    // not a problem!
    if(error.code === 'EEXIST') return
    console.log(colors.red.bold('Couldn\'t create directory due to:'))
    console.log(error)
    process.exit(1)
  }
}
