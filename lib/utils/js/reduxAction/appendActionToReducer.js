import j from 'jscodeshift'
import appendConstantImport from './appendConstantImport'

export default function appendActionToReducer({ ast, constantName }){
  appendConstantImport({ ast, constantName })

  const switchCase = j.switchCase(j.identifier(constantName), [
    j.returnStatement(j.identifier('state')),
  ])

  return ast
  	.find(j.SwitchCase, node => node.test === null)
  	.insertBefore(switchCase)
}
