import j from 'jscodeshift'
import fs from 'fs'
import path from 'path'
import saveFile from '~/utils/filesystem/saveFile'
import readFile from '~/utils/filesystem/readFile'
import { some } from 'lodash/fp'
import saveASTtoFile from './saveASTtoFile'

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

  const modulesSize = moduleSpecs.nodes().length

  if(modulesSize > 0){
    moduleSpecs
    // Insert after last import
    .at(modulesSize - 2)
    .insertAfter(newImport)
  } else {
    ast
    .find(j.Program)
    .find(j.Node)
    .at(0)
    .insertBefore(newImport)
  }

  // Save file with new content
  saveASTtoFile({
    filePath,
    ast,
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
