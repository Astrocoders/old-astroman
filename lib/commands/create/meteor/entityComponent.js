import path from 'path'
import componentTemplate from '~/templates/component'
import saveFile from '~/utils/filesystem/saveFile'
import createDir from '~/utils/filesystem/createDir'
import pathes from '~/utils/pathes'
import { capitalize } from 'lodash/fp'

export default function createEntityComponent({ name: entityName, params: [componentName] }){
  const normalizeEntityName = capitalize(entityName)
  const entityComponentsPath = path.join(pathes.meteor.entity, normalizeEntityName, 'Components')
  const filePath = path.join(entityComponentsPath, `${componentName}.js`)

  console.log('Creating component...'.white)

  createDir({
    dirPath: entityComponentsPath,
  })

  saveFile({
    filePath,
    content: componentTemplate({ name: componentName }),
  })
}
