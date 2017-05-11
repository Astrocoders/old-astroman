import j from 'jscodeshift'
import appendConstantImport from './appendConstantImport'

export default function appendActionCreator({ast, constantName, actionCreatorName}) {
  appendConstantImport({
    ast,
    constantName,
  })

  appendActionCreatorFunction({
    ast,
    constantName,
    actionCreatorName,
  })

  return ast
}

function appendActionCreatorFunction({ast, constantName, actionCreatorName}) {
  const newFunction = j.functionDeclaration(j.identifier(actionCreatorName), [], j.blockStatement([
    j.returnStatement(
      j.objectExpression([
        j.property('init', j.literal('type'), j.identifier(constantName)),
      ])
    ),
  ]))
  const newExport = j.exportNamedDeclaration(newFunction, [], null)
  const exports = ast
    .find(j.ExportNamedDeclaration)

  exports
    .at(exports.length - 1)
    .insertAfter(newExport)
}
