// @flow
import _ from 'lodash'
import sceneEntryTmpl from '~/templates/scene'
import importTmpl from '~/templates/import'
import fs from 'fs'
import path from 'path'
import { getAppMainPackagePath } from '~/utils/filesystem/packageJson'

export function prependLine({
  lineToPrepend,
  patternToPrepend,
  fileContent,
}: {
  lineToPrepend: string,
  patternToPrepend: RegExp,
  fileContent: string,
}):string {
  if(fileContent.indexOf(lineToPrepend) !== -1){
    // included exists
    return fileContent
  }
  const lines = fileContent.split('\n')
  const lastLineWithPattern = _.findLastIndex(lines, line => patternToPrepend.test(line))

  return [
    ...lines.slice(0, lastLineWithPattern),
    lineToPrepend,
    ...lines.slice(lastLineWithPattern, lines.length),
  ].join('\n')
}

export function appendLine({
  lineToAppend,
  patternToAppendAfter,
  fileContent,
}: {
  lineToAppend: string,
  patternToAppendAfter: RegExp,
  fileContent: string,
}):string {
  if(fileContent.indexOf(lineToAppend) !== -1){
    // included exists
    return fileContent
  }

  const lines = fileContent.split('\n')
  const lastLineWithPattern = _.findLastIndex(lines, line => patternToAppendAfter.test(line))+1

  return [
    ...lines.slice(0, lastLineWithPattern),
    lineToAppend,
    ...lines.slice(lastLineWithPattern, lines.length),
  ].join('\n')
}

export function appendImportToFile({
  namespace,
  importPath,
  fileToModify,
}: {
  namespace: string,
  importPath: string,
  fileToModify: string,
}){
  const resolvedPath = path.join(getAppMainPackagePath(), fileToModify)
  const fileContent = fs.readFileSync(resolvedPath).toString()

  fs.writeFileSync(resolvedPath, appendImport({
    namespace,
    path: importPath.replace('src/', '~/'),
    fileContent,
  }))
}

// Not the best way of doing this but gonna use this for now
export function appendChildToReactComponent({
  parentName,
  childDef,
  fileContent,
}: {
  parentName: string,
  childDef: string,
  fileContent: string,
}):string {
  // force tabbing, increment spacing in front of each line
  const tabbed = childDef.split('\n').map(line => `    ${line}`).join('\n')
  return prependLine({
    lineToPrepend: tabbed,
    fileContent,
    patternToPrepend: RegExp(`</${parentName}>`, 'g'),
  })
}

export function appendScene({
  name,
  fileContent,
}){
  return appendChildToReactComponent({
    childDef: sceneEntryTmpl({ name }),
    parentName: 'Scene',
    fileContent,
  })
}
