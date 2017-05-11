import j from 'jscodeshift'
import {some} from 'lodash/fp'
import readFile from '~/utils/filesystem/readFile'
import pathes from '~/utils/pathes'
import saveASTtoFile from './saveASTtoFile'

export default function appendReducer({name}) {
  const fileContent = readFile({filePath: pathes.rootReduxReducers})
  const newReducerProp = j.property('init', j.identifier(name), j.identifier(name))
  newReducerProp.shorthand = true

  const reducersObject = j(fileContent)
    .find(j.ExportDefaultDeclaration)
    .find(j.ObjectExpression)

  const currentReducerProperties = reducersObject.nodes()[0].properties

  if (isAlreadyExported(currentReducerProperties, name)) {
    return
  }

  reducersObject
    .replaceWith(j.objectExpression([...currentReducerProperties, newReducerProp]))

  saveASTtoFile({
    ast: reducersObject,
    filePath: pathes.rootReduxReducers,
  })
}

function isAlreadyExported(reducerProperties, currentOne) {
  return some(prop => prop.key.name === currentOne, reducerProperties)
}
