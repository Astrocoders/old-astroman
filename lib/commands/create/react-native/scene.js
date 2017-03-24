// @flow
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {
  getRootPath,
} from '~/utils/filesystem/environment'
import appendImport from '~/utils/js/appendImport'
import createDir from '~/utils/filesystem/createDir'
import saveFile from '~/utils/filesystem/saveFile'
import { appendScene } from '~/utils/js/js_code'
import pathes from '~/utils/pathes'

import componentTmpl from '~/templates/component'
import sceneEntryTmpl from '~/templates/scene'

export default function scene({ name }) {
  const sceneDirPath = path.join(pathes.scenes, name)
  const sceneFilePath = path.join(sceneDirPath, `index.js`)

  createDir({ dirPath: sceneDirPath })
  saveFile({
    filePath: sceneFilePath,
    content: componentTmpl({name}),
  })

  appendImport({
    name,
    local: `./${name}`,
    filePath: pathes.rootScenes,
  })

  saveFile({
    filePath: pathes.rootScenes,
    content: appendScene({ name })
  })

  console.log('Success'.green)
  console.log('\nDone.'.white.bold, `Now go to ${sceneDirPath} and start rocking!`.white)
}
