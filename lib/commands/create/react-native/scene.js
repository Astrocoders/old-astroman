import path from 'path'
import colors from 'colors/safe'
import appendImport from '~/utils/js/appendImport'
import createDir from '~/utils/filesystem/createDir'
import saveFile from '~/utils/filesystem/saveFile'
import {appendScene} from '~/utils/js/jsCode'
import pathes from '~/utils/pathes'

import componentTmpl from '~/templates/component'
import componentTestTmpl from '~/templates/componentTest'

export default function scene({name: definition}) {
  const entity = path.dirname(definition)
  const name = path.basename(definition)
  const sceneFilePath = path.join(pathes.scenes, `${definition}.js`)
  const sceneDirPath = path.join(pathes.scenes, entity)
  const sceneTestsDirPath = path.join(sceneDirPath, '__tests__')
  const sceneTestFilePath = path.join(sceneTestsDirPath, `${name}.js`)

  createDir({dirPath: sceneDirPath})
  createDir({dirPath: sceneTestsDirPath})
  saveFile({
    filePath: sceneFilePath,
    content: componentTmpl({name}),
  })
  saveFile({
    filePath: sceneTestFilePath,
    content: componentTestTmpl({name}),
  })

  appendImport({
    name,
    local: `./${definition}`,
    filePath: pathes.rootScenes,
  })

  saveFile({
    filePath: pathes.rootScenes,
    content: appendScene({name}),
  })

  console.log(colors.green('Success'))
  console.log(colors.white.bold('\nDone.'), colors.white(`Now go to ${sceneDirPath} and start rocking!`))
}
