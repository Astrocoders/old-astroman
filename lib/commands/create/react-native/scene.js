// @flow
import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'
import _ from 'lodash'
import {
  getAppMainPackagePath,
} from '../../../utils/packageJson'
import {
  appendImport,
  appendScene,
} from '../../../utils/js_code'
import pathes from '../../../utils/pathes'

import componentTmpl from '../../../templates/component'
import sceneEntryTmpl from '../../../templates/scene'

export default function scene({ name }: { name: string }):void {
  const filePath = path.resolve(getAppMainPackagePath(), pathes.scenes, `${name}.js`)

  console.log(colors.white.bold(`Creating scene ${name}...`))
  try {
    fs.writeFileSync(filePath, componentTmpl({name}))
  } catch(error){
    console.log(colors.red.bold(`Couldn't create ${filePath} due to:`))
    console.log(error)
    process.exit(1)
  } 
  console.log(colors.green.bold('Success'))

  const rootScenesPath = path.resolve(getAppMainPackagePath(), pathes.rootScenes)
  const rootScenes = fs.readFileSync(path.resolve(getAppMainPackagePath(), pathes.rootScenes)).toString()
  const newScenes = _(rootScenes)
    .thru(fileContent => (
      appendImport({
        namespace: name,
        path: path.resolve('/', pathes.scenes, name),
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
