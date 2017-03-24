// @flow
import j from 'jscodeshift'
import fs from 'fs'
import path from 'path'
import saveFile from '~/utils/filesystem/saveFile'
import readFile from '~/utils/filesystem/readFile'
import { some } from 'lodash/fp'

export default function appendImport({
  local,
  name,
  filePath,
}){
  const fileContent = readFile({ filePath })
  const ast = j(fileContent)
  const newImport = getNewImportDeclaration({ name, local })
  const moduleSpecs = ast.find(j.ImportDeclaration)

  // If already there do not proceed
  if(
    isPathBeingImported({ path: local, moduleSpecs })
  ){
    return
  }

  const newContent = moduleSpecs
    // Insert after last import
    .at(moduleSpecs.nodes().length-2)
    .insertAfter(newImport)
    .toSource({
      quote: 'single',
      trailingComma: true,
    })

  // Save file with new content
  saveFile({
    content: newContent,
    filePath,
  })
}

function getNewImportDeclaration({
  name,
  local,
}){
  return j.importDeclaration([
    j.importDefaultSpecifier(j.identifier(name)),
  ], j.literal(local))
}

function isPathBeingImported({ path, moduleSpecs }){
  return some(modulePath => modulePath.value === path, moduleSpecs.find(j.Literal).nodes())
}
