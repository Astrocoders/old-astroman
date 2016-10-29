// @flow
import _ from 'lodash'
import sceneEntryTmpl from '../templates/scene'
import importTmpl from '../templates/import'

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

export function appendImport({
  namespace,
  path,
  fileContent,
}: {
  namespace: string,
  path: string,
  fileContent: string,
}):string {
  return appendLine({
    lineToAppend: importTmpl({
      namespace,
      path,
    }),
    fileContent,
    patternToAppendAfter: /^import/,
  })
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
}: {
  name: string,
  fileContent: string,
}):string {
  return appendChildToReactComponent({
    childDef: sceneEntryTmpl({ name }),
    parentName: 'Scene',
    fileContent,
  })
}
