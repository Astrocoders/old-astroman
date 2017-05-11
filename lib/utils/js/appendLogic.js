import j from 'jscodeshift'
import {some} from 'lodash/fp'
import readFile from '~/utils/filesystem/readFile'
import pathes from '~/utils/pathes'
import saveASTtoFile from './saveASTtoFile'

export default function appendLogic({name}) {
  const fileContent = readFile({filePath: pathes.rootReduxLogics})
  const newLogicElement = j.identifier(name)

  const logicsArray = j(fileContent)
    .find(j.ExportDefaultDeclaration)
    .find(j.ArrayExpression)

  const currentLogicElements = logicsArray.nodes()[0].elements

  if (
    isIdentifierAlreadyEnlisted({
      name,
      elements: currentLogicElements,
    })
  ) {
    return
  }

  saveASTtoFile({
    ast: logicsArray
      .replaceWith(j.arrayExpression([...currentLogicElements, newLogicElement])),
    filePath: pathes.rootReduxLogics,
  })
}

function isIdentifierAlreadyEnlisted({name, elements}) {
  return some(identifier => identifier.name === name, elements)
}
