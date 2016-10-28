import fs from 'fs'
import colors from 'colors'
import path from 'path'
import _ from 'lodash'
import {
  getAppMainPackagePath,
} from '../../utils/packageJson'
import {
  appendImport,
  appendScene,
} from '../../utils/js_code'

import componentTmpl from '../../templates/component'
import sceneEntryTmpl from '../../templates/scene'

const pathes = {
  scenes: 'src/Routes/',
  rootRouter: 'src/AppRouteRouter.js',
  rootScenes: 'src/Scenes.js',
}

export default function scene({ name }){
  const filePath = path.resolve(getAppMainPackagePath(), pathes.scenes, `${name}.js`)

  console.log(`Creating scene ${name}...`.white.bold)
  try {
    fs.writeFileSync(filePath, componentTmpl({name}))
  } catch(error){
    console.log(`Couldn't create ${filePath} due to:`.red.bold)
    console.log(error)
    process.exit(1)
  } 
  console.log('Success'.green.bold)

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

  console.log(`Updating app scenes`.white.bold)
  try {
    fs.writeFileSync(rootScenesPath, newScenes)
  } catch(error){
    console.log(`Couldn't create ${filePath} due to:`.red.bold)
    console.log(error)
    process.exit(1)
  } 
  console.log('Success'.green.bold)
  console.log(`\nDone. Now go to ${filePath.replace(process.cwd(), '')} and start rocking!`.white)
}
