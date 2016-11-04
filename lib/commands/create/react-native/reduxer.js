import path from 'path'
import colors from 'colors/safe'
import fs from 'fs'
import reduxActions from '../../../templates/redux/actions'
import reduxReducer from '../../../templates/redux/reducer'
import reduxContainer from '../../../templates/redux/Container'
import createFile from '../../../utils/create_file'
import createDir from '../../../utils/create_dir'
import { getAppMainPackagePath } from '../../../utils/packageJson'
import { appendImportToFile, prependLine } from '../../../utils/js_code'

const pathes = {
  redux: 'src/redux'
}

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
    createFile({
      filePath: file.path,
      content: file.content,
    })
  })

  console.log(colors.white.bold('Updating redux\'s reducers...'))
  const reducersPath = path.join(pathes.redux, 'reducers/index.js')
  appendImportToFile({
    namespace: lowerCasedName,
    importPath: path.join(dirPath, 'reducer.js'),
    fileToModify: reducersPath,
  })
  // TODO: Create a helper to write in files without needing to put the absolute path
  fs.writeFileSync(path.join(getAppMainPackagePath(), reducersPath), prependLine({
    lineToPrepend: `  ${lowerCasedName},`,
    patternToPrepend: /\}\)/,
    fileContent: fs.readFileSync(path.join(getAppMainPackagePath(), reducersPath)).toString(),
  }))

  console.log(colors.green(`Redux files for ${name} were succesfully created.`))
}