import mkdirp from 'mkdirp'
import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'
import {getRootPath} from '~/utils/filesystem/environment'

export default function createDir({dirPath}) {
  try {
    const fullPath = path.join(getRootPath(), dirPath)
    console.log(colors.white('Creating dir', dirPath))
    if (fs.existsSync(fullPath)) {
      return
    }

    mkdirp.sync(fullPath)
  } catch (err) {
    // Not a problem!
    if (err.code === 'EEXIST') {
      return
    }
    console.log(colors.red.bold('Couldn\'t create directory due to:'))
    console.log(err)
    process.exit(1)
  }
}
