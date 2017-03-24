import j from 'jscodeshift' 
import { some } from 'lodash/fp'
import readFile from '~/utils/filesystem/readFile'
import saveFile from '~/utils/filesystem/saveFile'
import pathes from '~/utils/pathes'

export default function appendLogic({ name }){
  const fileContent = readFile({ filePath: pathes.rootReduxLogics })
  const newLogicElement = j.identifier(name)

  const logicsArray = j(fileContent)
    .find(j.ExportDefaultDeclaration)
    .find(j.ArrayExpression)

  const currentLogicElements = logicsArray.nodes()[0].elements

  if(
    isIdentifierAlreadyEnlisted({
      name,
      elements: currentLogicElements,
    })
  ){
    return
  }

  const newLogicsContent = logicsArray
    .replaceWith(j.arrayExpression([...currentLogicElements, newLogicElement]))
    .toSource({
      quote: 'single',
      trailingComma: true,
    })

  saveFile({
    content: newLogicsContent,
    filePath: pathes.rootReduxLogics,
  })
}

function isIdentifierAlreadyEnlisted({ name, elements }){
  return some(identifier => identifier.name === name, elements)
}
