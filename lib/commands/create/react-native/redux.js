import path from 'path'
import reduxConstants from '~/templates/redux/constants'
import reduxActions from '~/templates/redux/actions'
import reduxReducer from '~/templates/redux/reducer'
import reduxContainer from '~/templates/redux/Container'
import reduxLogic from '~/templates/redux/logic'
import saveFile from '~/utils/filesystem/saveFile'
import createDir from '~/utils/filesystem/createDir'
import appendImport from '~/utils/js/appendImport'
import appendReducer from '~/utils/js/appendReducer'
import appendLogic from '~/utils/js/appendLogic'
import pathes from '~/utils/pathes'

export default function redux({ name }){
  const reduxEntityPath = path.join(pathes.redux, `${name}`)
  const lowerCasedName = name.toLowerCase()

  createDir({
    dirPath: reduxEntityPath,
  })

  const reduxFiles = [
    {path: path.join(reduxEntityPath, 'actions.js'), content: reduxActions()},
    {path: path.join(reduxEntityPath, 'constants.js'), content: reduxConstants({ name: lowerCasedName })},
    {path: path.join(reduxEntityPath, 'reducer.js'), content: reduxReducer({ name: lowerCasedName })},
    {path: path.join(reduxEntityPath, 'Container.js'), content: reduxContainer({ name: lowerCasedName })},
    {path: path.join(reduxEntityPath, 'logic.js'), content: reduxLogic()},
  ]

  reduxFiles.forEach(file => {
    saveFile({
      filePath: file.path,
      content: file.content,
    })
  })

  console.log('Updating main reducers and logics...'.white)

  // Update main reducer
  appendImport({
    name: lowerCasedName,
    local: `./${name}/reducer`,
    filePath: pathes.rootReduxReducers,
  })

  // Update main logics
  appendImport({
    name: lowerCasedName,
    local: `./${name}/logic`,
    filePath: pathes.rootReduxLogics,
  })

  appendReducer({
    name: lowerCasedName,
  })

  appendLogic({
    name: lowerCasedName,
  })

  console.log(`\nRedux files for ${name} were succesfully created.`.green.bold)
}
