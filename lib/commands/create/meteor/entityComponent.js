import path from 'path'
import componentTemplate from '~/templates/component'
import createFile from '~/utils/create_file'
import createDir from '~/utils/create_dir'
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

  createFile({
    filePath,
    content: componentTemplate({ name: componentName }),
  })
}
