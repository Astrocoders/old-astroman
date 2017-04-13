import reduxAction from '../reduxAction'

const mockedActionsFile = `import { FOO } from './constants'
export function foo(){
  return {
    type: FOO,
  }
}
`

const mockedReducerFile = `import { FOO } from './constants'

export default function mocked(state, {type, payload}){
  switch(type){
    case FOO: return {...state}
  }
}
`

const mockedConstantsFile = `export const FOO = 'mocked/FOO'`

jest.mock('~/utils/js/saveASTtoFile', () => jest.fn())
jest.mock('~/utils/filesystem/readFile', () => (
  jest.fn()
    .mockReturnValueOnce(mockedReducerFile)
    .mockReturnValueOnce(mockedActionsFile)
    .mockReturnValueOnce(mockedConstantsFile)
))

describe('reduxActions', () => {
  const saveASTtoFile = require('saveASTtoFile')
  before(() => {
    const definition = 'Mocked/BAR'
    reduxAction({ name: definition })
  })

  test('it should properly change the constants file', () => {
    const saveASTtoFile = require('saveASTtoFile')

    const constantsChangeCall = saveASTtoFile.mock.calls[0]

    expect(constantsChangeCall).toMatchSnapshot()
  })

  test('it should properly change the actions file', () => {
    const saveASTtoFile = require('saveASTtoFile')

    const actionsChangeCall = saveASTtoFile.mock.calls[1]

    expect(actionsChangeCall).toMatchSnapshot()
  })

  test('it should properly change the constants file', () => {
    const saveASTtoFile = require('saveASTtoFile')

    const reducersChangeCall = saveASTtoFile.mock.calls[2]

    expect(reducersChangeCall).toMatchSnapshot()
  })
})

