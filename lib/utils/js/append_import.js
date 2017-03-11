// @flow
import j from 'jscodeshift'
import fs from 'fs'
import path from 'path'
import createFile from '~/utils/filesystem/createFile'
import readFile from '~/utils/filesystem/readFile'
import { some } from 'lodash'

export default function appendImport({
  local,
  name,
  filePath,
}){
  const fileContent = readFile({ filePath })
  const ast = j(fileContent)
  // FIXME: `quotes: single` not working for the import path here
  const newImport = getNewImportDeclaration({ name, local })
  const moduleSpecs = ast.find(j.ImportDeclaration)

  // If already there do not proceed
  if(
    isPathBeingImported({ path: local, moduleSpecs })
  ){
    return
  }

  const newContent = modulesSpecs
    // Insert after last import
    .at(moduleSpecs.nodes().length-1)
    .insertAfter(newImport)
    .toSource({
      quotes: 'single',
      trailingComma: true,
    })

  // Save file with new content
  createFile({
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
  return some(moduleSpecs.find(j.Literal).nodes(), modulePath => modulePath.value === path)
}
