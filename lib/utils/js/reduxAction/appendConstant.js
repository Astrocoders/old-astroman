import j from 'jscodeshift'

export default function appendConstant({ast, name, value}) {
  const newVariableDeclaration = j.variableDeclaration('const', [
    j.variableDeclarator(j.identifier(name), j.literal(value)),
  ])
  const newExport = j.exportNamedDeclaration(newVariableDeclaration, [], null)
  const exports = ast
    .find(j.ExportNamedDeclaration)

  return exports
    .at(exports.length - 1)
    .insertAfter(newExport)
}
