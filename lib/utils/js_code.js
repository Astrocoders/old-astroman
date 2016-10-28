import _ from 'lodash'
import sceneEntryTmpl from '../templates/scene'
import importTmpl from '../templates/import'

export function prependLine({
  lineToAppend,
  patternToPrepend,
  fileContent,
}){
  const lines = fileContent.split('\n')
  const lastLineWithPattern = _.findLastIndex(lines, line => patternToPrepend.test(line))

  return [
    ...lines.slice(0, lastLineWithPattern),
    lineToAppend,
    ...lines.slice(lastLineWithPattern, lines.length),
  ].join('\n')
}

export function appendLine({
  lineToAppend,
  patternToAppendAfter,
  fileContent,
}){
  const lines = fileContent.split('\n')
  const lastLineWithPattern = _.findLastIndex(lines, line => patternToAppendAfter.test(line))+1

  return [
    ...lines.slice(0, lastLineWithPattern),
    lineToAppend,
    ...lines.slice(lastLineWithPattern, lines.length),
  ].join('\n')
}

export function appendImport({ namespace, path, fileContent }){
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
export function appendChildToReactComponent({ parentName, childDef, fileContent }){
  // force tabbing, increment spacing in front of each line
  const tabbed = childDef.split('\n').map(line => `    ${line}`).join('\n')
  return prependLine({
    lineToAppend: tabbed,
    fileContent,
    patternToPrepend: RegExp(`</${parentName}>`, 'g'),
  })
}

export function appendScene({ name, fileContent }){
  return appendChildToReactComponent({
    childDef: sceneEntryTmpl({ name }),
    parentName: 'Scene',
    fileContent,
  })
}
