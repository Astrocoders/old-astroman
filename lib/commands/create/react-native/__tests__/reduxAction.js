import { stripIndents } from 'common-tags'
import reduxAction from '../reduxAction'

const mockedActionsFile = stripIndents`
import { FOO } from './constants'
export function foo(){
  return {
    type: FOO,
  }
}
`

const mockedReducerFile = stripIndents`
import { FOO } from './constants'

export default function mocked(state, {type, payload}){
  switch(type){
    case FOO: return {...state}
    default: return {...state}
  }
}
`

const mockedConstantsFile = `export const FOO = 'mocked/FOO'`

jest.mock('~/utils/js/saveASTtoFile', () => jest.fn())
jest.mock('~/utils/filesystem/readFile', () => (
  jest.fn()
    .mockImplementation(({ filePath }) => {
      if(filePath.includes('action')) return mockedActionsFile
      if(filePath.includes('reducer')) return mockedReducerFile
      if(filePath.includes('constants')) return mockedConstantsFile
    })
))

describe('reduxActions', () => {
  const definition = 'Mocked/BAR'
  const saveASTtoFile = require('~/utils/js/saveASTtoFile')

  beforeAll(() => {
    reduxAction({ name: definition })
  })

  test('it should properly change the constants file', () => {
    const constantsChangeCall = saveASTtoFile.mock.calls[0][0]

    expect(constantsChangeCall).toBeDefined()
    expect({
      filePath: constantsChangeCall.filePath,
      ast: constantsChangeCall.ast.toSource({})
    }).toMatchSnapshot()
  })

  test('it should properly change the actions file', () => {
    const actionsChangeCall = saveASTtoFile.mock.calls[1][0]

    expect(actionsChangeCall).toBeDefined()
    expect({
      filePath: actionsChangeCall.filePath,
      ast: actionsChangeCall.ast.toSource({})
    }).toMatchSnapshot()
  })

  test('it should properly change the reducers file', () => {
    const reducersChangeCall = saveASTtoFile.mock.calls[2][0]

    expect(reducersChangeCall).toBeDefined()
    expect({
      filePath: reducersChangeCall.filePath,
      ast: reducersChangeCall.ast.toSource({})
    }).toMatchSnapshot()
  })
})

