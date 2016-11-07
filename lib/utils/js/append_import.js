// @flow
import j from 'jscodeshift'
import fs from 'fs'
import path from 'path'
import createFile from '../create_file'
import readFile from '../read_file'
import { some } from 'lodash'

export default function appendImport({
  local,
  name,
  filePath,
}: {
  local:string,
  name:string,
  filePath: string,
}):void {
  const fileContent = readFile({ filePath })
  const ast = j(fileContent)
  // FIXME: `quotes: single` not working for the import path here
  const newImport = j.importDeclaration([
    j.importDefaultSpecifier(j.identifier(name)),
  ], j.literal(local))
  const modulesSpecs = ast.find(j.ImportDeclaration)

  // If already there no need to proceed
  if(
    some(modulesSpecs.find(j.Literal).nodes(), path => path.value === local)
  ){
    return
  }

  const newContent = modulesSpecs
    .at(modulesSpecs.nodes().length-1)
    .insertAfter(newImport)
    .toSource({
      quotes: 'single',
      trailingComma: true,
    })

  createFile({
    content: newContent,
    filePath,
  })
}
