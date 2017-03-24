import path from 'path'
import colors from 'colors/safe'
import fs from 'fs'
import reduxActions from '~/templates/redux/constants'
import reduxReducer from '~/templates/redux/reducer'
import reduxContainer from '~/templates/redux/Container'
import saveFile from '~/utils/filesystem/saveFile'
import createDir from '~/utils/filesystem/createDir'
import { getAppMainPackagePath } from '~/utils/filesystem/packageJson'
import { prependLine } from '~/utils/js/js_code'
import appendImport from '~/utils/js/appendImport'
import appendReducer from '~/utils/js/appendReducer'
import pathes from '~/utils/pathes'

export default function component({ name }: { name:string }):void {
  const dirPath = path.join(pathes.redux, `${name}`)
  const lowerCasedName = name.toLowerCase()

  createDir({
    dirPath,
  })

  const reduxFiles = [
    {path: path.join(dirPath, 'actions.js'), content: reduxActions({ name: lowerCasedName })},
    {path: path.join(dirPath, 'reducer.js'), content: reduxReducer({ name: lowerCasedName })},
    {path: path.join(dirPath, 'Container.js'), content: reduxContainer({ name: lowerCasedName })},
  ]

  reduxFiles.forEach(file => {
    saveFile({
      filePath: file.path,
      content: file.content,
    })
  })

  console.log(colors.white('Updating redux\'s reducers...'))
  const reducersPath = path.join(pathes.redux, 'reducers/index.js')
  appendImport({
    name: lowerCasedName,
    local: path.join(dirPath, 'reducer.js').replace('src/redux', '..'),
    filePath: reducersPath,
  })
  // TODO: Create a helper to write in files without needing to put the absolute path

  const absoluteReducersPath = path.join(getAppMainPackagePath(), reducersPath)
  fs.writeFileSync(absoluteReducersPath, appendReducer({
    name: lowerCasedName,
    fileContent: fs.readFileSync(absoluteReducersPath).toString(),
  }))

  console.log(colors.green.bold(`\nRedux files for ${name} were succesfully created.`))
}
