// @flow
import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'
import _ from 'lodash'
import {
  getAppMainPackagePath,
} from '~/utils/filesystem/packageJson'
import appendImport from '~/utils/js/appendImport'
import createDir from '~/utils/filesystem/createDir'
import createFile from '~/utils/filesystem/createFile'
import { appendScene } from '~/utils/js/js_code'
import pathes from '~/utils/pathes'

import componentTmpl from '~/templates/component'
import sceneEntryTmpl from '~/templates/scene'

export default function scene({ name }) {
  const sceneDirPath = path.join(pathes.scenes, name)
  const sceneFilePath = path.join(sceneDirPath, `index.js`)

  createDir({ dirPath: sceneDirPath })
  createFile({
    filePath: sceneFilePath,
    content: componentTmpl({name}),
  })

  const rootScenesPath = path.join(getAppMainPackagePath(), pathes.rootScenes)
  const rootScenes = fs.readFileSync(path.join(getAppMainPackagePath(), pathes.rootScenes)).toString()
  const newScenes = _(rootScenes)
    .thru(fileContent => (
      appendImport({
        namespace: name,
        path: path.join('./', name),
        fileContent,
      })
    ))
    .thru(fileContent => (
      appendScene({
        name,
        fileContent,
      })
    ))

  console.log(colors.white.bold(`Updating app scenes`))
  try {
    fs.writeFileSync(rootScenesPath, newScenes)
  } catch(error){
    console.log(colors.red.bold(`Couldn't create ${filePath} due to:`))
    console.log(error)
    process.exit(1)
  } 
  console.log(colors.green.bold('Success'))
  console.log(colors.white(`\nDone. Now go to ${filePath.replace(process.cwd(), '')} and start rocking!`))
}
