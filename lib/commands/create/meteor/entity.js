import path from 'path'
import { capitalize } from 'lodash/fp'
import containerTemplate from '~/templates/redux/Container.js'
import reducerTemplate from '~/templates/redux/reducer'
import logicTemplate from '~/templates/logic'
import constantsTemplate from '~/templates/redux/constants'
import componentTemplate from '~/templates/component'
import saveFile from '~/utils/filesystem/saveFile'
import pathes from '~/utils/pathes'
import createDir from '~/utils/filesystem/createDir'

/*
 * Entity Structure
 * Pages/EntityName
 * _______container.js
 * _______index.js
 * _______constants.js
 * _______reducer.js
 * _______logic.js
*/
export default function entity({ name, params }: { name:string, params:Array<string> }):void {
  const entityPath:string = path.join(pathes.meteor.entity, capitalize(name))
  const files = [
    { file: 'container.js', template: containerTemplate },
    { file: 'logic.js', template: logicTemplate },
    { file: 'reducer.js', template: reducerTemplate },
    { file: 'constants.js', template: constantsTemplate },
    { file: 'index.js', template: componentTemplate },
  ]

  createDir({ dirPath: entityPath })

  console.log(`Creating ${entityPath} files...`.white)
  files.forEach(({ file, template }) => {
    saveFile({
      filePath: path.join(entityPath, file),
      content: template({ name }),
    })
  })

  console.log('Update routes')
}
