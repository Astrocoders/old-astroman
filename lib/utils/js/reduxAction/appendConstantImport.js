import j from 'jscodeshift'

const CONSTANTS_IMPORTED_FROM = './constants'

export default function appendConstantImport({ast, constantName}) {
  const newImportSpecifier = j.importSpecifier(j.identifier(constantName), j.identifier(constantName))
  const importeds = ast
    .find(j.ImportDeclaration, node => node.source.value === CONSTANTS_IMPORTED_FROM)
    .find(j.ImportSpecifier)

  importeds
    .at(importeds.nodes().length - 1)
    .insertAfter(newImportSpecifier)
}
