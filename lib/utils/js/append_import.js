// @flow
import j from 'jscodeshift'
import fs from 'fs'
import path from 'path'
import createFile from '../create_file'
import readFile from '../read_file'

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
  const newImport = j.importDeclaration([
    j.importDefaultSpecifier(j.identifier(name)),
  ], j.literal(local))
  const modulesSpecs = j(fileContent).find(j.ImportDeclaration)

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
