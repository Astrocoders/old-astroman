import j from 'jscodeshift' 
import readFile from '~/utils/filesystem/readFile'
import saveFile from '~/utils/filesystem/saveFile'
import pathes from '~/utils/pathes'

export default function appendReducer({ name }){
  const fileContent = readFile({ filePath: pathes.rootReduxReducers })
  const newReducerProp = j.property('init', j.identifier(name), j.identifier(name))
  newReducerProp.shorthand = true

  const reducersObject = j(fileContent)
    .find(j.ExportDefaultDeclaration)
    .find(j.ObjectExpression)
  const currentReducerProperties = reducersObject.nodes()[0].properties

  const newReducersContent = reducersObject
    .replaceWith(j.objectExpression([...currentReducerProperties, newReducerProp]))
    .toSource({
      quote: 'single',
      trailingComma: true,
    })

  saveFile({
    content: newReducersContent,
    filePath: pathes.rootReduxReducers,
  })
}
